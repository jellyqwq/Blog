---
title: Go的基本配置
icon: page
order: 1
author: Jelly
date: 2022-08-23
category:
  - Golang
tag:
  - Golang
sticky: false
star: false
---

### 2022/8/23

去官网下载安装go, 然后在vscode中安装Go插件, 根据提示把其他包给下好

bot: [https://github.com/go-telegram-bot-api/telegram-bot-api](https://github.com/go-telegram-bot-api/telegram-bot-api)

bot文档: [https://go-telegram-bot-api.dev](https://go-telegram-bot-api.dev)

#### 知识点

Go安装后env默认
```
GO111MODULE=off
```
需要将其打开, 通过命令
```
go env -w GO111MODULE="auto/on"
```
永久设置, auto和on选一个即可, 临时设置可以使用
```
set GO111MODULE=auto/on
```
Go一个目录作为一个module, 在当前目录中使用命令

```
go mod init moduleName
```
moduleName 可以用example.com/xxx/abcd, 即使填github的仓库也不会与仓库进行交互的

为了能在本地使用这个module, 需要使用命令
```
go mod edit -replace example.com/xxx/abcd=../abcd
```
最后用
```
go mod tidy
```
来将所有依赖的包进行下载导入

---
### telegram webhook

这个需要https, 上传的证书用pem后缀的, 也可以使用自签名证书, 参考[openssl](https://www.openssl.org/), 用如下python脚本完成设置
```py
import requests, json

ip = ''
port = ''
bot_token = ''

f = open('certificate.pem', 'r')
data = {
    'url': f'https://{ip}:{port}/{bot_token}',
    'certificate': f,
    'ip_address':  f'{ip}',
    'allowed_updates': json.dumps(['message', 'edited_message', 'channel_post', 'edited_channel_post', 'inline_query', 'chosen_inline_result', 'callback_query', 'shipping_query', 'pre_checkout_query', 'poll', 'poll_answer', 'my_chat_member', 'chat_member', 'chat_join_request'])
}
response = requests.post(f'https://api.telegram.org/bot{bot_token}/setWebhook', data=data).json()
print(response)
f.close()

response = requests.post(f'https://api.telegram.org/bot{bot_token}/getWebhookInfo').json()
print(response)
```

