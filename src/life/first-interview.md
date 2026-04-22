---
title: 记第一次面试
icon: page
author: Jelly
date: 2024-12-04
category:
  - 生活记录
tag:
  - 面试
  - 数据仓库
sticky: false
star: false
---

# 记第一次面试

刚刚参加完七牛云的数据仓库线上面试，腾讯会议，屏幕共享，不能用AI，可以上网Google查文档。

面试流程如下

* 介绍下自己
* 问了一道SQL题
* 根据简历提问（一个问了git的merge和rebase的区别；一个问了linux里正则表达式查询子目录的内容）PS：简历上写了个熟悉git和linux（（（
* 看了下我的博客和GitHub

SQL题如下，看我半天都敲不出问我能不能用Python来做，然后我发现自己Python也做不出来，用上Pandas都没做出来。

```
合并指标
Table A: 天猫消费表    uid: 用户 ID    month：消费月份    money_x: 消费金额

Table B: 京东消费表    uid: 用户 ID    month：消费月份    money_y: 消费金额

需求：合并上述两表生成一个新的表包含：   
 uid: 用户 ID    month：消费月份    money_x: 天猫消费金额    money_y: 京东消费金额
```

总而言之，八股毫无准备，大题一击破防，简历熟悉错觉，面试眼高手低。
