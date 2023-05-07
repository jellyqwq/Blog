---
title: Python项目打包
icon: page
order: 1
author: Jelly
date: 2022-04-08
category:
  - Python
tag:
  - Pyinstaller
  - Python
sticky: false
star: false
---

## Pyinstaller

当做一个项目需要打包时，不免会遇到将项目打包成可执行文件的问题，这个时候就要用到pyinstaller这个包了

首先要解决一个重要的问题，python文件在vscode中的项目路径和cmd打开的项目路径时不一样的，当项目中用到IO操作，或者相对路径引用时会出问题——找不到相关文件，因此需要在项目的启动文件加上

```py
os.chdir(os.path.dirname(__file__))
```

表示把当前文件所在的文件夹作为项目的启动路径。**__file__**可以获取当前执行的文件所在的绝对路径，**os.path.dirname(__file__)**可以通过文件绝对路径获取文件所在的文件夹的绝对路径，**os.chdir(path)**而则是将运行目录切换到该文件所在的文件夹下

但实践后我发现，打包后的exe文件运行目录在C盘下的一个缓存目录里，运行完后会把所生成的文件清除，这导致并不能像运行py那样在当前exe所在下生成文件，需要引入一个冻结路径，创建一个py文件在要打包的文件下

```py
-*- coding: utf-8 -*-
import sys
import os

def app_path():
    """Returns the base application path."""
    if hasattr(sys, 'frozen'):
        # Handles PyInstaller
        return os.path.dirname(sys.executable)       #使用pyinstaller打包后的exe目录
    return os.path.dirname(__file__)                 #没打包前的py目录
```

当需要IO操作时使用如下代码，其中relative_path为以exe所在文件夹为项目路径的相对路径

```py
file = frozen_dir.app_path()+'relative_path'
dirname = os.path.dirname(file)
if not os.path.exists(dirname):
    os.mkdir(dirname)
```

在打包时需要使用-D参数，如果使用-F生成单文件则无法实现exe所在目录的相对路径读写. (-D是生成可执行项目, -F是生成可执行文件)

```py
Pyinstaller -i xx.ico -D main.py
```

其中参数-i xx.ico可以为可执行文件指定图标

另外-n Name可以对可执行项目命名, -h|–help可以获取具体的使用方法