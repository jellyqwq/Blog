---
title: 域名证书签发
icon: page
author: Jelly
date: 2023-05-08
category:
  - Linux
tag:
  - Linux
  - 域名证书
  - Nginx
sticky: false
star: false
---

给域名上证书签名提高流量的安全性, 也能减少打开网站时提示不安全影响浏览体验, 但是通过常规的方式如通过小马哥家的证书签名有配额限制, 而且销毁了也不减少签发额度.

这个时候就需要用到一些其他的工具, 使用[OneinStack](https://oneinstack.com/install/)可以方便地对服务器的基础服务进行部署, 如nginx, mysql, mongodb...

如不熟悉nginx操作就不要修改其默认的安装的nginx的配置文件, 默认的nginx路径可以通过`nginx -t`命令查看, 一般在`/usr/local/nginx`

在**OneinStack**目录里找到`vhost.sh`的文件, 这个就是给域名签发证书用的, 它签发的证书有效期只有几个月, 但是它会自动续签, 这点还是比较方便的

在开始证书签发前还需要去该域名的提供商处添加你要解析的域名, 否则签发证书会失败, 添加完后要等待一段时间

在该**OneinStack**目录中执行`./vhost.sh`开始对域名签发证书

运行后会有几个选项, 选择`Use Let's Encrypt to Create SSL Certificate and Key`来开始对域名进行签名

然后要求输入待签名的域名

接着提示是否要更改该域名的网站目录, 默认目录为`/data/wwwroot/your-domain`, 不建议更改, 直接回车

> Do you want to add more domain name? \[y/n\]

一般情况填 `n` 即可

> Do you want to redirect all HTTP requests to HTTPS? \[y/n\]

一般填 `y`, 这个是对http流量的重定向, 体现在nginx的配置中

> Please enter your cert key length (default 2048):

按需更改, 一般回车

这步回车完后就是开始签发, 然后到选项

> Do you want to add hotlink protection? \[y/n\]

一般填 `n`

> Allow Rewrite rule? \[y/n\]

一般填 `y`, 接着会有如下输入

> Please input rewrite of programme: ...... (Default rewrite other): 

这里要讲究下, 填要签发的域名, 这步就相当于给当前签发域名提供了一个自定义配置的文件, 他们都会生成在 `/usr/local/nginx/rewrite` 这个目录当中, 并以上述的输入 `x` 作为文件名 `x.conf`

> Allow Nginx/Tengine/OpenResty access_log? \[y/n\]

这个各取所需, 是否让nginx保留日志, 我用的 `n`