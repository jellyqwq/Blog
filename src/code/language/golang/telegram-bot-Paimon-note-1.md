---
title: Paimon bot 1
icon: page
order: 1
author: Jelly
date: 2022-11-15
category:
  - Golang
tag:
  - Golang
  - Bot
sticky: false
star: false
---

这是一个telegram疫情查询内联键盘的开发笔记

<!-- more -->

### 前言

一开始使用卫健委官网的数据，写正则表达式来匹配，但后来发现出现了412错误，似乎，爬虫在无cookie的情况下访问该网站会先返回412错误同时设置3个cookie，然后返回错误的同时也返回了一个带有`<Script>`标签的DOM文档，这个script标签会请求的JavaScript文件来生成并设置一个cookie，但这个JavaScript文件相当混乱，并不是一般所见的js文件；在尝试使用412错误所返回的三个cookie去请求也不行，因此另寻它法，使用了某讯的[api](https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=localCityNCOVDataList,diseaseh5Shelf)，国外疫情[api](https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoforeignList)。

### API分析
`https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=<localCityNCOVDataList|diseaseh5Shelf|provinceCompare|nowConfirmStatis>`

|modules|作用|
|--|--|
|localCityNCOVDataList|本土疫情城市列表及其详情|
|diseaseh5Shelf|更加详细的数据|
|provinceCompare|是|
|nowConfirmStatis|当前确诊状态|
|FAutoCountryConfirmAdd|各国新增|
|WomWorld|世界统计|
|WomAboard|外国数据|
|FAutoforeignList|外国更具体的数据|

`https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?adCode={地区代码}&limit={要多少条数据,一条代表一天}`

### 功能实现
设计了一个`coronavirus`模块，调用该模块的`MainHandle()`函数可以返回一个`*Core`类型的变量，该变量存储了格式化好的`ProvinceInlineKeyborad`以及`AreaInlineKeyboard`，后者是根据是province来查询对应的键盘的。

## 设计标准

### CallbackQuery(回调查询)
这部分分为两种回调，在省份页面为`virus-页码-地区`，在地区页面回调`virus-page-查询地区-父级键盘页码`

省份页面的第一页的第一个是全国总览按钮，地区页面的第一页的第一个是返回省份页面的按钮，第一页的第二个是该省份的总览按钮。

### 中国总览数据
```
国内总览
2022-11-15 17:31:01
累计确诊病例：8771347
 └ 现有确诊病例：8377147
 └ 新增确诊：19129
 └ 现有本土确诊：13935
 └ 新增本土确诊：1710
重症病例：35
累计治愈：364831
累计死亡：29370
 └ 新增死亡：50
现有本土无症状：105362
 └ 新增本土无症状：16233

2022-11-15 17:03:31
高风险地区：8721
中风险地区：51
```

### 地区总览数据
```
广东总览
2022-11-16 08:53:50
累计确诊病例：18395
 └ 现有确诊病例： 5581
  └ 新增确诊：211
   └ 新增本土确诊：195
   └ 新增境外输入确诊：16
累计治愈：12806
累计死亡：8
 └ 新增死亡：0
现有本土无症状：32921
 └ 新增本土无症状： 6215

高风险地区：205
中风险地区：0
```

### 地区具体数据
```
广州
2022-11-16 13:09:22
现有确诊病例： 7135
 └ 新增确诊：158
新增本土无症状：3138

高风险地区：98
中风险地区：0
```


