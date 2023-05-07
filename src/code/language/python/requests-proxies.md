---
title: Python代理设置
icon: page
order: 1
author: Jelly
date: 2021-12-06
category:
  - Python
tag:
  - Proxy
sticky: false
star: false
---
## Python代理设置

requests中代理的写法, 要注意的是proxies字典的value要为字符串

```py
proxies = {
    "http":"host:port",
    "https":"host:port"
}
```

#### 栗子

使用ip为127.0.0.1, 端口为6868的代理向https://www.mihoyo.com发送一个get请求的写法

```py
import requests

proxies = {
    "http":"127.0.0.1:6868",
    "https":"127.0.0.1:6868"
}
requests.get('https://www.mihoyo.com', proxies=proxies)
```

设置代理也可以解决requests.exceptions.SSLError的问题