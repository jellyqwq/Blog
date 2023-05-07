---
title: Change docker contianers port mapping by config file for Windows
icon: page
order: 1
author: Jelly
date: 2022-12-15
category:
  - Docker
tag:
  - Docker
sticky: false
star: false
---

...

<!-- more -->

## Abstract

对于一个已经生成的容器而言, 暂时没有通过docker命令对其自身的端口进行映射的操作, 所以要借助修改配置文件来设置端口映射.

## Introduction

在进行该操作前, 需要将docker关闭, 否则修改将不生效

在Windows下的docker, 使用的 *WSL2(Windows Subsystem for Linux)* 来运行docker. 在docker协助下安装完WSL后可以通过访问 `\\wsl$` 来访问WSL的目录. 这个目录就是WSL的根目录了.

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/12/image.png)

具体的容器目录在: `\\wsl$\docker-desktop-data\data\docker\containers`

在上述目录中可以看到所有的Containers

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/12/df229045-6a2e-48b3-8ad7-75400bc5dff2.png)

选择一个容器, 可以看到有 `config.v2.json` 和 `hostconfig.json` 两个配置文件

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/12/dd11bf5c-0033-4bf4-8053-65f4c7a29016.png)

分别修改两个配置文件, 使容器的9870端口映射到宿主机(Windows)的19870上.

为配置文件 `hostconfig.json` 修改 *PortBingings* 参数
```json
"PortBindings": {
    "9870/tcp": [
        {
            "HostIp": "",
            "HostPort": "19870"
        }
    ]
}
```

配置文件 `config.v2.json` 修改 *Config.ExposedPorts*, 如果在容器初始化的时候没有指定端口, 该值将不存在, 需要手动添加
```json
"ExposedPorts": {
    "9870/tcp": {}
},
```

## References
1. <https://stackoverflow.com/questions/42250222/where-is-docker-image-location-in-windows-10>
2. <https://blog.csdn.net/liu865033503/article/details/100120113>
3. <https://blog.csdn.net/keyiis_sh/article/details/124192764>