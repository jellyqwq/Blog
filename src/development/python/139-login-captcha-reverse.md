---
title: 逆向 139 邮箱登录流程：验证码识别与登录模拟
icon: page
order: 1
author: Jelly
date: 2026-05-26
category:
  - 编程开发
tag:
  - Python
  - 逆向
  - OCR
sticky: false
star: false
---

# 逆向 139 邮箱登录流程：验证码识别与登录模拟

前段时间有个需求：需要模拟登录中国移动的 139 邮箱（mail.10086.cn），把整个登录链路自动化。本来以为就是普通的表单提交 + 短信验证码，结果一抓包发现没那么简单。这篇文章记录一下过程中踩的坑和几个值得注意的细节。

## 登录流程概览

先看整个登录链路的全貌。从浏览器抓包发现，一次完整的短信登录走的是这个顺序：

1. **预热 Cookie** — 先访问首页，拿到基础 Cookie 和 `cguid`
2. **获取验证码图片** — 图形验证码不是传统的输入框，而是一张带文字的图，需要**点击图片上对应的文字**来校验
3. **校验验证码** — 把点击坐标和其他信息组合成一个加密的 `verifyCode`，发到 `login:checkNewPictureCode`
4. **发送短信验证码** — 校验通过后调 `login:sendSmsCode`，拿到 `UUIDToken`
5. **执行登录** — 带着所有 Cookie 和密码摘要 POST 到 `Login/Login.ashx`，从重定向链接里提取 `sid`
6. **获取用户数据** — 用 `sid` 调 `user:getMainData`

流程本身不复杂，但每个环节都有点小坑。

## 验证码：不是输入文字，是点击坐标

这个是第一个反直觉的地方。139 的图形验证码是点选式的——服务端返回一张图片，图片上有几个文字，你需要告诉服务端每个文字在图片上的**坐标**，而不是文字本身。

也就是说，OCR 的任务不是"认出图片上有什么字"，而是"找到一个指定文字在图片上的 **x, y 坐标**"。

实现上我用的是 PaddleOCR。识别完拿到每个字的包围框后，取框的中心点作为点击坐标。这里有两个小细节：

- **多字框拆分**：有时候 PaddleOCR 会把几个字识别成一个框（比如"你好"被当成一个整体）。我按框的长轴方向做了等分切割，保证每个独立字符都有一个坐标。
- **固定文字过滤**：验证码图片上有一个固定的"139邮箱"水印文字，如果不排除掉，OCR 识别到它就会干扰字符到坐标的映射。直接加了个忽略列表跳过。

```python
IGNORED_TEXTS = {"139邮箱"}
```

简单直接。

## verifyCode：双重 URL 编码 + MD5

验证码校验时，需要构造一个 `verifyCode` 参数。这个参数的构造方式稍有不慎就会对不上。

本质上是一个 JSON：

```json
{"k": "目标文字", "p": [{"x": 100, "y": 200}, ...], "c": "md5值"}
```

- `k` 是服务端告诉你要点哪个字（从 agentid 里解码出来）
- `p` 是每个字的坐标
- `c` 是 `md5(agentid 的前半段 + 所有坐标 x+y 的和)`

这个 JSON 构造好后，做**两次** URL 编码——`encodeURIComponent(encodeURIComponent(json))`。少编一次就校验不过。

## RSA 加密：cryptography 不行就 openssl

`sendSmsCode` 的时候需要传一个 `loginName`，是手机号用 RSA 公钥加密后的 Base64。公钥是从服务端返回的，硬编码在了脚本里做 fallback。

这个加密本来用 Python 的 `cryptography` 库就行，一行代码的事情。但我考虑到不一定每个运行环境都有这个库，所以加了一个后备方案——如果 `cryptography` 没装，就用系统自带的 `openssl pkeyutl` 子进程来算。

```python
try:
    from cryptography.hazmat.primitives.asymmetric import padding
    ...
except ImportError:
    # 回退到 openssl pkeyutl
    subprocess.run(["openssl", "pkeyutl", "-encrypt", ...])
```

不算优雅，但够用。

## 密码为什么要哈希

抓到 `Login.ashx` 的密码传参时，发现它不是直接传明文密码，而是 `SHA1("fetion.com.cn:" + 明文密码)`。这是服务端前端 js 里做的处理，带上域名字符串再哈希，防止中间人抓着哈希值去别的平台撞库。

这个逻辑如果不扒 js 根本不会知道——抓包看到的是 40 位的十六进制字符串，很容易误以为是单纯的 SHA1(密码)，结果就是对不上。

## Cookie 管理

139 的 Cookie 处理算是流程里最繁琐的部分。有几个点值得注意：

- `agentid` 是从验证码接口的 `Set-Cookie` 响应头里拿的，值是 `uuid&URL编码的中文目标文字`。前面的 uuid 部分要放回 Cookie 里发给后续请求，后面的中文要 URL 解码出来作为 OCR 的目标文字。
- `sendSmsCode` 返回的 `UUIDToken` 需要合并到 Cookie 里再带给 `Login.ashx`，这个不算明显——响应头里能看到 `Set-Cookie: UUIDToken=xxx`，但如果你只看了响应 body 就会漏掉。
- `Login.ashx` 的重定向链里 Cookie 会逐步追加（`CookieJar` 自动处理），但最终的 `sid` 是从最后一个重定向 URL 的 query string 里提取的，不是从 Cookie 里拿。

## 调试技巧

因为每一步都有可能出错——验证码识别不准、cookie 丢失、参数编错了——每一步的请求和响应都保存到了 `tmp/` 下的时间戳目录里。

```text
tmp/
  captcha_1710156123_4567/
    verifyCodeImg.jpg
    response_headers.txt
  check_verify_1710156125_8912/
    check_response_body.txt
    check_response_headers.txt
  send_sms_1710156130_3456/
    send_sms_request_body.xml
    send_sms_response_body.txt
    send_sms_response_headers.txt
  ...
```

这样出问题的时候不需要重新抓包，直接从文件里翻上一步的输入输出就行。这个习惯在逆向这种多层协议交互的场景下特别有用。

## 总结

整个过程说起来不难——就是模拟一个浏览器登录流程。但实际做起来，每个环节的细节都挺容易卡住的：验证码是点选式不是输入式、verifyCode 要双重编码、密码要带前缀再 SHA1、Cookie 散落在多个响应的 header 和 body 里需要手动收集。好在把这些点都理顺之后，PaddleOCR 的识别率也足够用（加上失败重试和自动换验证码），整个流程能稳定跑通。

如果有类似需求的朋友，建议先别急着写代码，先花半小时把浏览器 DevTools 的 Network 面板从头到尾过一遍，把每一步的请求体、响应头、Cookie 变化都看清楚，后面写起来会顺很多。
