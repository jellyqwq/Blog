---
title: Linux ls命令在某个目录下无反应
icon: page
author: Jelly
date: 2023-12-29
category:
  - Linux
tag:
  - Linux
  - 运维
sticky: false
star: false
---

首先可以看下内核

```sh
dmesg
```

这里发现的是里面挂载了一个nfs目录, 但是该nfs目录已经失效, 也就是访问的时候timeout了, 所以没能成功访问

查看下nfs挂载点
```sh
mount -t nfs4
```

只要将该目录取消挂载即可, 这里挂载的nfs目录为 `~/Alist/Ayaka`

```sh
umount -l ~/Alist/Ayaka
```
