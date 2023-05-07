---
title: Xbox Live登录失败的解决办法
icon: page
order: 1
author: Jelly
date: 2022-08-15
category:
  - Batchfile
tag:
  - Xbox
sticky: false
star: false
---

在steam登录时会遇到Xbox Live登录没反应的问题, 这是因为Xbox Live服务默认是手动开启, 默认关闭的, 只要把这个服务设置成自动启动就好了

关于Windows下的服务修改可以看微软的[官方文档](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/sc-config), 给出了如下命令
```sh
sc.exe [<servername>] config [<servicename>] [type= {own | share | kernel | filesys | rec | adapt | interact type= {own | share}}] [start= {boot | system | auto | demand | disabled | delayed-auto}] [error= {normal | severe | critical | ignore}] [binpath= <binarypathname>] [group= <loadordergroup>] [tag= {yes | no}] [depend= <dependencies>] [obj= {<accountname> | <objectname>}] [displayname= <displayname>] [password= <password>]
```

通过`win+R`打开`cmd`后, 输入`services.msc`打开服务, 找到`Xbox Live 游戏保存`后查看属性发现其被设置为手动打开, 这个手动并不是指Xbox Live给你用的时候打开, 你不开他就不会启动. 所以要设置为自动

`Xbox Live 游戏保存`查看属性可以得知其`servicename((本地)服务名称)`为`XblGameSave`

用命令`sc qc XblGameSave`查看得到
```sh
C:\Users\admin>sc qc XblGameSave
[SC] QueryServiceConfig 成功

SERVICE_NAME: XblGameSave
        TYPE               : 20  WIN32_SHARE_PROCESS
        START_TYPE         : 3   DEMAND_START
        ERROR_CONTROL      : 1   NORMAL
        BINARY_PATH_NAME   : C:\WINDOWS\system32\svchost.exe -k netsvcs -p
        LOAD_ORDER_GROUP   :
        TAG                : 0
        DISPLAY_NAME       : Xbox Live 游戏保存
        DEPENDENCIES       : UserManager
                           : XblAuthManager
        SERVICE_START_NAME : LocalSystem
```

不难看出, `START_TYPE`为`DEMAND_START`, 因此需要改下, 如果手动修改的话只是临时的, 再次启动就恢复原样了, 所以需要用`config`关键字来永久设置

通过命令`sc config XblGameSave start= auto`即可将游戏保存服务设置为自启动. 

然后把上面这个命令写到.bat文件里, 方便好朋友修改电脑上的这项服务, 由于重新设置后并不会立刻启动该服务, 还需要借助命令`sc start XblGameSave`来立刻启动该服务.

实测发现要想他在一个文件内完成启动加设置, 需要运行两遍, 且需要管理员权限, 所以bat文件为
```sh
sc start XblGameSave
sc config XblGameSave start= auto
sc start XblGameSave
sc config XblGameSave start= auto
```