---
title: 课表推送助手2.0
icon: page
order: 1
author: Jelly
date: 2022-05-08
category:
  - Python
tag:
  - Python
  - 课表服务
sticky: false
star: false
---

2022年5月7日的早八，我突然想到了解决微信客户端内置浏览器可以打开网页，但在默认浏览器打不开问题的办法。

### 1.0回顾

1.0版本时我想过两种获取学校课表的办法，第一种是从学校官网获取课表及其调课信息，但是在做2.0的时我发候现，学校官网的调课信息存在滞后的问题；第二种是从学校公众号的课表里获取，但是这种方法在做1.0时我发现了其链接在电脑的浏览器上没能打开，显示请在微信客户端打开，当时我搜索的方式不对，没能找到正确的解决办法。

### 奇思妙想

今天思考着为什么微信的内置浏览器可以打开的链接为什么到默认浏览器就打不开了呢？他是怎么知道我不是用微信的客户端访问的呢？都是同一个链接访问，到默认浏览器就被重定向了。我想起请求头（Request Headers），对url请求资源肯定离不开请求头，爬虫第一课教的就是UA伪装，但讲到的大都是伪装浏览器，不让服务器检测到是爬虫的请求。但我现在觉得，UA更重要的是去模拟客户端，完成对客户端的请求。

在2.0版本中，使用了微信客户端独有的UA去请求，完成了对微信内浏览器的请求模拟，获取到了学校课表的api。

所以在2.0中，只需完成邮箱注册，并填写学号（xd）和身份识别字符串（openid）即可开启课表推送服务，在2.0中为了避免1.0在本地的跑python既不美观也难兼容的问题，决定改到web端操作，主要是不需要去填写课表了。在数据的结构处理上，1.0需要班级课表文件和个人配置文件，但在2.0将改为MongoDB数据库存储账号及其配置。暂时就想到这么个架构。

### 实践过程

首先，考虑到项目的兼容性和体量，不打算用requests模块，用原生urllib库完成网络资源的请求。这里对urllib的post请求过程封装到一个函数当中。

```py
def urllibpost(url: str | None, headers: dict | None, data: dict | None) -> dict | list:
    'A post method by urllib'
    data = urllib.parse.urlencode(data).encode('utf-8')
    try:
        req = urllib.request.Request(url=url,
                                data=data,
                                headers=headers,
                                method='POST')
    except:
        raise 'url is invalid'
    else:
        response = urllib.request.urlopen(req)
        if response.status == 200:
            return json.loads(response.read().decode('utf-8'))
        else:
            return {'error': response.status}
```

#### 请求标头和请求参数

```py
headers = {
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.9,zh-US;q=0.8,zh-CN;q=0.7,zh;q=0.6,ja-CN;q=0.5,ja;q=0.4',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Host': 'wecat.hnkjedu.cn',
    'Origin': 'http://wecat.hnkjedu.cn',
    'Pragma': 'no-cache',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 MicroMessenger/6.5.2.501 NetType/WIFI WindowsWechat',
    'X-Requested-With': 'XMLHttpRequest'
}
data = {
    'openid': '',
    'xh': '',
    'falg': 'true'
    }
```

在微信的公众号的课表当中（红色方框中）可以获取该页链接。链接具体长下面这样，这样可以拿到自己的xh（xuehao）和openid了。

> http://wecat.hnkjedu.cn/kingojw/xskb.aspx?xh=学号&openid=身份id

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/8/98fd3f8d09e0b503b7712e2fffe0c7b966dbc65d1a15b1a62446e1aa84783384.png)

#### 请求部分写法

```py
url = 'http://wecat.hnkjedu.cn/kingojw/xskbjson.aspx'
response = urllibpost(url,headers,data)
if 'error' in response:
    log.error(response['error'])
elif response[0]['courseTimeXq'] == None:
    log.error('params openid or xh is invalid')
    log.debug(response)
else:
    # 此处即json的输出
    print(response)
```

接下来就要对课表进行解析了，课表的数据结构需要从星期开始读取，一星期7天分别为Kn(n∈N+,n≤7)，那么如何计算今天是星期几呢，这里采用datetime模块中的datetime类，并通过datetime.today().isoweekday()获取当天的星期几的整型表示。

---

接着，先处理下数据库的问题，这里选择MongoDB数据库，MongoDB适合高迸发，可以提高服务端性能，也是为了后面对服务端可能进行的的go重构——咕咕，去[MongoDB](https://www.mongodb.com/)下载，python也需要安装相应的第三方包pymongo来实现对数据库的访问。

```
pip install --upgrade pymongo
```

把mongodb下好后，对于windows需要先创建数据库，这里参考了菜鸟教程的[安装](https://www.runoob.com/python3/python-mongodb.html)，我也自己总结下吧。

1. MongoDB安装后是全局作用的，不用可以装到哪个目录下
2. 安装后要添加bin文件到系统的环境变量当中
3. 在bin目录下的mongod.cfg文件当中可以指定数据库访问的端口

#### 细读后发现，当安装目录没有data和log的时候才需要进行下列操作

首先需要创建一个data目录，但是并不像教程里所讲的需要在根目录创建，在data目录中又要创建又有一个db目录（用于存放数据库的）和一个log目录（存放日志的），当mongodb的bin目录添加到环境变量当中，执行下列命令以初始化数据库，–dbpath正如字面意思，指定一个数据库目录的路径，后面的路径可以为用相对路径。

```
mongod --dbpath data\db
```

然后创建一个文件mongod.cfg，存哪都行，里面如下配置，path和dbPath都需要使用绝对路径，这里我把mongod.cfg放在了data中以方便我管理。

```
systemLog:
    destination: file
    path: D:\Desktop\class-plan\data\log\mongod.log
storage:
    dbPath: D:\Desktop\class-plan\data\db
```

然后安装MongoDB服务，mongod.exe和上面的mongod一样，添加了环境变量即可使用，通过–config参数来指定数据库配置文件的路径，这个路径需要使用绝对路径，–install参数安装服务。

```
mongod.exe --config "D:\Desktop\class-plan\data\mongod.cfg" --install
```

插入：启动/关闭/移除MongoDB服务的操作

```
net start MongoDB
net stop MongoDB
mongod.exe --remove
```

---

好，回到项目当中，添加一个验证码的生成函数，至于要不要图还有待考虑，然后还有一个[发送验证码的函数](https://github.com/jellyqwq/class-helper/blob/main/class_helper/__init__.py#L63)。

这次吸取1.0的经验，把所有需要配置的参数和个性化定制全部独立到配置文件当中，所以在2.0中多了一个[example.config.json](https://github.com/jellyqwq/class-helper/blob/main/class_helper/example.config.json)的配置文件。

接着就是重头戏——api的搭建了，我这里先罗列下要做的api及其功能

1. /user/signup  注册，将邮箱密码和用户名上传到服务器验证
2. /sendvcode 发送验证码
3. /emailexist 检查邮箱是否被注册过

创建账号的实现

```flow
email=>condition: 邮箱是否存在
error=>end: 返回error
make=>operation: 生成验证码
cache=>operation: 缓存验证码
send=>operation: 发送验证码
fill=>operation: 用户填写验证码
check=>condition: 校验是否正确
create=>operation: 创建账号

email(yes)->error
email(no, right)->make
make(right)->cache
cache(bottom)->send
send(bottom)->fill
fill(bottom)->check
check(yes)->create
check(no)->make
```

---

### web端

在web使用post请求时，发现请求不到后台的api数据，显示如下

Browser Console

```
Access to XMLHttpRequest at 'http://localhost:4443/test' from origin 'http://127.0.0.1:4443' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
POST http://localhost:4443/test net::ERR_FAILED 200
```

DOM-jQuery

```js
$(document).ready(function() {
    $("#login").click(function(e){
        e.preventDefault();

        // post
        $.post('http://localhost:4443/test',
            {
                'email': $("#email").val(),
                'pwd': $("#pwd").val()
            },
            function(data) {
                alert(data['succeed']);
                console.log(data);
            }
        )
    })
})
```

Flask-localhost:4443

```py
@app.route('/test', methods=['POST'])
def test():
    log.debug(request.content_type)
    email = request.form['email']
    log.debug(email)
    pwd = request.form['pwd']
    log.debug(pwd)
    return jsonify({'succeed': '返回成功'})
```

通过控制台的报错提示可以知道，在js发出post的跨域资源请求时返回的资源没有`Access-Control-Allow-Origin`这个头部，导致获取响应资源失败。通过查询找到了解决办法，在flask中可以通过flask.make_response(*args)来生成一个响应对象，这个对象可以设置`Response Headers`的参数，可以通过`response[key] = value`来设置，或者用response对象的相应属性来修改。

那么，我把解决的方法封装到了函数当中，如下。

```py
# 请求头的设置
def res(params):
    response = make_response(params)
    response.access_control_allow_origin = 'http://127.0.0.1:4443'
    return response
```

Flask中修改为

```py
@app.route('/test', methods=['POST'])
def test():
    log.debug(request.content_type)
    email = request.form['email']
    log.debug(email)
    pwd = request.form['pwd']
    log.debug(pwd)
    response = make_response({'succeed': '返回成功'})
    response.access_control_allow_origin = 'http://127.0.0.1:4443'
    return response
```