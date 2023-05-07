---
title: requests带列表的data数据提交
icon: page
order: 1
author: Jelly
date: 2022-04-08
category:
  - Python
tag:
  - Python
  - requests
sticky: false
star: false
---

### 适用情况

post请求需要提交form-data的数据，在这个form-data中有如下结构，也就是在浏览器中的payload
```py
xxx:string
xxxx:string
xdata:[{k1:v1,k2:v2,...},{k21:v21,k22:v22,...},...]
```

当我在requests中提供这个如下data是却请求失败了

```py
pdata = {
  'xxx': string,
  'xxxx': string,
  'xdata': list/dict
}
requests.post(url, data=pdata)
```

### 原因&解决办法

在使用post方法时会将pdata中的value字符串解析，但是在上述提交的from-data数据pdata中有非字符串value存在，即xdata的数据格式为list/dict，所以需要将xdata的值转化为字符串，使用dumps可以将字典转为json格式的字符串

```py
import json
pdata = {
  'xxx': string1,
  'xxxx': string2,
  'xdata': json.dumps(list/dict)
}
requests.post(url, data=pdata)
```