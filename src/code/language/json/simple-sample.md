---
title: json结构
icon: page
order: 1
author: Jelly
date: 2022-09-22
category:
  - JSON
tag:
  - JSON
sticky: false
star: false
---

### 基本概念
JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。 易于人阅读和编写。同时也易于机器解析和生成。 它基于JavaScript Programming Language, Standard ECMA-262 3rd Edition - December 1999的一个子集。 JSON采用完全独立于语言的文本格式，但是也使用了类似于C语言家族的习惯（包括C, C++, C#, Java, JavaScript, Perl, Python等）。 这些特性使JSON成为理想的数据交换语言。

### 结构
通用json主要由以下几种类型构成
1. 列表
2. 字典
3. 数字(十进制整形和浮点型)
4. 字符串

### 特性
1. json格式不支持注释, 因此并不适合用作配置文件
2. 字符串的声明只能使用双引号>"<

结合具体的实例看-微博热搜api->[https://weibo.com/ajax/side/hotSearch](https://weibo.com/ajax/side/hotSearch)
以下节选了realtime变量的两个, 用>//<表示对该行的解释, 实际json并不可注释
```
{
    "ok": 1,
    "data": {
        "realtime": [
            {
                "num": 1863891,
                "expand": 0,
                "star_word": 0,
                "fun_word": 1,
                "ad_info": "",
                "subject_querys": "综艺|100道光芒",
                "mid": "4815354116967729",
                "channel_type": "Entertainment",
                "label_name": "热",
                "topic_flag": 1,
                "onboard_time": 1663600291,
                "subject_label": "综艺",
                "category": "综艺",
                "raw_hot": 1863891,
                "icon_desc": "热",
                "word_scheme": "#00后发朋友圈吐槽公司被开除#",
                "icon_desc_color": "#ff9406",
                "note": "00后发朋友圈吐槽公司被开除",
                "small_icon_desc": "热",
                "small_icon_desc_color": "#ff9406",
                "flag_desc": "综艺",
                "is_hot": 1,
                "flag": 2,
                "discuss_roomid": 17654,
                "realpos": 1,
                "dynamic_fei": 1,
                "word": "00后发朋友圈吐槽公司被开除",
                "star_name": {},
                "emoticon": "",
                "rank": 0
            },
            {
                "num": 1541864,
                "star_word": 0,
                "expand": 0,
                "ad_info": "",
                "subject_querys": "",
                "channel_type": "",
                "label_name": "",
                "topic_flag": 1,
                "mid": "4815668962395475",
                "emoticon": "",
                "category": "社会新闻",
                "raw_hot": 1541864,
                "note": "牙不齐可能是因为脸小",
                "word_scheme": "#牙不齐可能是因为脸小#",
                "flag": 0,
                "subject_label": "",
                "fun_word": 0,
                "onboard_time": 1663630402,
                "word": "牙不齐可能是因为脸小",
                "star_name": {},
                "realpos": 2,
                "rank": 1   // 这里的>"rank": 1<不能写成>"rank": 1,< 如果多一个逗号是错误的, 相应的, 每一级最后一个字典|列表的后面也都不能跟逗号
            }
        ]
    }
}
```

在python中, 可以使用json模块来实现python的字典|列表与json结构的转换
```
import json
import requests

general_json = requests.get("https://weibo.com/ajax/side/hotSearch")

# general json to python struct
python_struct = json.loads(general_json)
print(python_struct)

# python_struct to general json
general_json = json.dumps(python_struct)
print(general_json)
```