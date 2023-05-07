---
title: docker install phpmyadmin
icon: page
order: 1
author: Jelly
date: 2022-12-20
category:
  - Docker
tag:
  - Docker
  - phpmyadmin
  - mysql
sticky: false
star: false
---

...

<!-- more -->

## 第一种方法

### 创建mysql

创建一个名字为 `nahida` , IP为 `192.168.60.20` , 内部网络为 `misaka`, 将 `3006` 端口映射到宿主机的 `11027` 端口, 其root用户密码为 `123456` 的MySQL数据库容器.

```sh
docker run -itd --name nahida --net misaka --ip 192.168.60.20 -p 11027:3006 -e MYSQL_ROOT_PASSWORD=123456 mysql:latest
```

### 创建phpmyadmin

创建一个IP为 `192.168.60.21`, 内部网络为 `misaka`, 将该容器的 `80` 端口映射给宿主机的 `11028` 端口, 指定数据库为上述的 `nahida`, 名字为 `phpnahida` 的phpmyadmin服务容器.

```sh
docker run -itd -p 11028:80 --net misaka --ip 192.168.60.21 -e PMA_HOST=192.168.60.20 -e PMA_PORT=3306 --name phpnahida phpmyadmin:latest
```

## 第二种方法

对第一种方式的简化版

### MySQL

```sh
docker run -d --name nahida -p 11027:3006 -e MYSQL_ROOT_PASSWORD=123456 mysql:latest
```

### phpmyadmin

--link 相比第一种方式的好处在于不用指定MySQL的IP

```sh
docker run -d -p 11028:80 --link nahida:db -e PMA_PORT=3306 --name phpnahida phpmyadmin:latest
```

## Reference
1. https://learnku.com/articles/53392