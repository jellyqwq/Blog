---
title: 宝塔面板部署Genshinhelper
icon: page
order: 1
author: Jelly
date: 2021-12-04
category:
  - 部署
tag:
  - 宝塔
  - Genshin
sticky: false
star: false
---

# 宝塔部署Ginshinhelper

首先找到宝塔面板中的软件商店，在里面搜索并下载Python项目管理器，打开首页显示，这步应该是默认的，也是为了操作方便，如果没有，可以通过下在软件商店的已安装列找到Python项目管理器打开首页显示设置。

然后在首页找到Python项目管理器打开，然后在版本管理中选择一个版本安装，至此，python运行环境就装好了，具体使用方法稍后面会讲到。

----

接下来介绍下核心的工具

作者：[银弹](https://www.yindan.me/tutorial/genshin-impact-helper.html)

项目介绍：[genshinhelper](https://pypi.org/project/genshinhelper/)

本次使用项目：[https://gitlab.com/y1ndan/genshin-checkin-helper](https://gitlab.com/y1ndan/genshin-checkin-helper)

将这个项目通过宝塔面板下载到服务器上，然后使用打开Python管理器，具体操作如下：

- 项目名称：自定
- 路径：/xxx/genshin-checkin-helper-main
- Python版本：选择下载好的python版本
- 框架和启动方式：python
- 启动文件/文件夹：/xxx/genshin-checkin-helper-main/genshincheckinhelper/main.py
- 是否安装模块依赖：勾选，如果添加项目时提醒没有找到依赖包可取消勾选，添加项目后运行，在Python项目管理器中查看当前项目运行的日志，会因为缺少模块而报错，只需将缺失模块名称复制，在Python项目管理器-项目管理-刚刚创建的项目-模块中粘贴要添加的模块，多运行几次，应该会缺几个包，每次报错会提示一个包
- 开机启动：自定

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/8/e7507c8a282bb7f8fa2fefd053b90f55f590986abc18a1319f214516a628f56a.png)

接着就要配置/xxx/genshin-checkin-helper-main/genshincheckinhelper/config下的config.json文件，具体配置方式参考——项目介绍，其中

- “RANDOM\_SLEEP\_SECS_RANGE”: “0-300” 在开始签到后0~300秒内任意时刻进行签到操作
- “CHECK_IN_TIME”: “06:00” 每日6：00开始签到

这两项操作设置好后在Python管理器中查看运行，运行正常即可

## 关于在计划任务中运行python脚本

在Python文件管理器中创建项目以提供python运行环境

```sh
source project_path/project_name/venv/bin/activate
python3 python shell path
deactivate
```
