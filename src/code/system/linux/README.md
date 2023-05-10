---
title: Linux笔记
icon: page
order: 1
author: Jelly
date: 2022-12-15
category:
  - Linux
tag:
  - Linux
sticky: false
star: false
article: false
---

### 如何在vi/vim中搜索相应的东西
在命令模式下使用 `/` 加上要搜索定位的的内容, 然后回车, 使用键盘 `N` 键可以进行循环查看.

### vi, vim中文乱码
在当前用户home目录下创建 `.vimrc` 文件并添加以下内容即可

```
:set encoding=utf-8
```