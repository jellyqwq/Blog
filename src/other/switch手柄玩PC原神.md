---
title: switch手柄玩PC原神
icon: page
order: 1
author: Jelly
date: 2023-02-13
category:
  - Game
tag:
  - Game
  - Genshin
  - Switch
sticky: false
star: false
---

首先需要借助steam来启动原神，可以在库里添加原神游戏，默认能直接扫到，扫不到可以去原神安装目录里选择Yuanshen.exe来添加

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2023/06/1b7527fe-b21d-48aa-a6ea-ac70a34dc849.png)

有了steam后还需要一个软件，项目地址在这<https://github.com/Davidobot/BetterJoy> ，在右侧Releases中下载对应版本，下载后是个压缩包，解压后如下图

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2023/06/8d1096fd-c257-4f87-9691-6a2362143817.png)

在Drivers中选择自己电脑对应的驱动进行安装，64位的是**ViGEmBusSetup_x64.msi** ，32位的是**ViGEmBusSetup_x86.msi**

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2023/06/ccd5b118-81b0-482c-9d48-621319843882.png)

由于switch在原神按键中的XY和AB是相反的，需要用这个通过修改该软件的配置来解决，要修改**BetterJoyForCemu.exe.config**中的参数

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2023/06/d524afd5-374c-436a-a0ab-39d3a8f8a841.png)

右键用记事本打开该文件，将蓝框的值从默认的false改为true，**<font color=#FF000>保存文件</font>**

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2023/06/460c678d-6aef-4a2b-8656-7ba189523904.png)

做好上述准备后，将打开电脑蓝牙，连接手柄，（我的手柄是长按充电口旁的小点来打开蓝牙配队，其他情况还请自行搜索）。

然后先启动steam，再启动**BetterJoyForCemu.exe**，启动后可以缩小到右下角的隐藏菜单中

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2023/06/bf9f890c-21c4-4fa1-b15e-387960a9d8e7.png)

最后通过steam启动原神，在派蒙菜单中把**键盘鼠标**改为**手柄**即可使用手柄进行操作

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2023/06/af6afc07-2df2-4b4f-967c-27f9b73e816c.png)