---
title: Python多进程的简单实现
icon: page
order: 1
author: Jelly
date: 2022-04-06
category:
  - Python
tag:
  - Python
  - 网络爬虫
sticky: false
star: false
---

# multiprocessing map()多参数传递

首先从模块multiprocessing导入Pool类,实例化并调用。

```py
from multiprocessing import Pool

pool = Pool()
pool.map(function, parameter)
pool.close()
pool.join()
```

function是要需要进行多进程的函数，parameter是该函数的一个参数，但是也是唯一的一个参数，因此，当这个函数存在多个参数时，map就略显疲惫。

一开始我想到那把多个参数整合到 一个参数里，如丢到 一个列表里再传到函数里，这的确是一种方法。

但是如果还有当有一个参数是保持不变，但是也要传进去，怎么办，用上述的方法这个列表里会产生很多重复的数据，会降低效率——尽管看不出来。

现在来解决这个问题，需要从functools模块中导入partial。

```py
from functools import partial
# partical函数可以为把函数的多个参数传入
par = partial(function, *kargs)
```

同时将pool.map部分更换下。

```py
pool.map(par, iteration)
```

iteration就是function函数的第一个参数，一般是一个可迭代对象。