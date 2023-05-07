---
title: 笔记缓存区
icon: page
article: false
---

用于存放还未来得及整理的笔记

<!-- more -->

## anaconda/miniconda取消默认启动base环境
临时设置
> conda deactivate

永久设置
> conda config --set auto_activate_base false

## 米游社逆向分析
米游社在手机上是一个webview应用, 通过对每日签到的分享链接可以打开其[网页版](https://webstatic.mihoyo.com/bbs/event/signin-ys/index.html?bbs_auth_required=true&act_id=e202009291139501), 但是点击签到会提示叫你区app里签, 这个页面也不是在app里看到的页面, 通过使用米游社的特定UA, 可以让他像米游社签到页面那样显示, 但是依然不能签, 因为pc浏览器没有app里的环境, 用不了jsbridge.

通过对签到页面的抓包, 发现js代码挺完整的, 它的js是webpack打包过的, webpack逆向可以看[这篇笔记](https://app.yinxiang.com/fx/970ae39c-9964-4aae-aa96-7e81fee4ef8f). 通过对前端的js分析, 发现它调用jsbridge来与app交互数据.

IOS
> window.webkit.messageHandlers.miHoYo.postMessage(u)

Android
> window.MiHoYoJSInterface.postMessage(u)

u是一个map对象, u是通过一个函数生成的
> \{method: 'getActionTicket', payload: \{action_type: 'game_role'\}, callback: 'bbs_callback_0'\}

DS方法的调用也是类似
> \{ method: 'getDS', payload: null, callback: 'bbs_callback_0' \}

## 如何通过hex来判断so文件时64位还是32位
看第5个字节是 `01` 还是 `02`, 01是32位, 02是64位

### JNI(Java Native Interface)
这是java用于和本地的so文件内代码交互的一种技术


