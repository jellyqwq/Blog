---
title: 漫画狗漫画下载
icon: page
order: 1
author: Jelly
date: 2021-12-12
category:
  - Python
tag:
  - Python
  - 爬虫
sticky: false
star: false
---

## manga-get

我在了解galgame中接触到了一些漫画, 这些漫画大概率是不可能被做成番剧那样的视频的, 我就想找一些漫画网站看漫画, 但是有的网站弹窗太多, 页面不整洁, 加载太慢等诸多问题, 我就想直接把漫画下载到本地来看, 顺便巩固下最近学的知识。

首先我着手对dogemanga（漫画狗）这个漫画网站进行分析, 从url来看主要分为三类页面：

1. com/?=搜索内容/
2. com/m/
3. com/p/

所以可以通过解析url来确定所在的页面。

上述三个页面中内容的关系为：1-匹配结果（可能与搜索有关的漫画有关的漫画）>2-漫画所包含的（话/卷）>3-（话/卷）所含的每一页。

我把项目manga-get写成了由main.py为启动文件, request_site.py的网页请求模块, url_analysis.py的url解析模块, manga_save.py的下载模块, 以及用于存放各类漫画网站解析的manga_site包构成。

因为dogemanga网站url可以通过/?=漫画名字/获得一个网页, 也就可以实现把搜索过程放到脚本进行, 通过输入要搜索的内容, 提交请求, 获取响应网页, 解析网页元素并反馈出来, 再选择下载。

### 项目地址
[https://github.com/jellyqwq/manga-get](https://github.com/jellyqwq/manga-get)

### 更新状况
- 2021.12.18 增加了多进程下载, 提高了下载速度。不过受制于python的GIL的设计——CPU的每个核心只会同时进行一个线程的运算, 所以速度的提升受制于CPU的核心数。
- 2021.12.15 增加了q页面的漫画下载；增加大文件夹对每一话进行分类存放；下载方式修改为升序下载；增加对未下完的漫画的续下, 只需粘贴上一次未下载完成的网址即可。
- 2021.12.12 manga-get首次发布。

### 支持的网站
|域名|支持性|
|--|--|
|dogemanga.com|ok|

dogemanga网站可以选择用搜索页即url中有/?q=xxx/的下载, 也可以用com/m/xxx或者com/p/xxx类型的url下载。

现进行搜索功能的开发, 依然是利用网站的特性, (https://dogemanga.com/?q=搜索) 结果会返回一个索引页, 要对这个索引页解析, 老规矩bs4解析, 但是这次学聪明了