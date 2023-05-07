---
title: 课表推送助手
icon: page
order: 1
author: Jelly
date: 2022-04-17
category:
  - Python
tag:
  - Python
  - 工具
sticky: false
star: false
---

由于找到了网页版查看微信公众号的方法, 也就是在User-Agent中加入一个代表微信的字串, 所以可以直接调用学校公众号课表的接口获取数据. 所以之前的步骤通通不用, 只需要使用网页端存放openid以及推送的token即可.

更新详情: [https://github.com/jellyqwq/class-helper#readme](https://github.com/jellyqwq/class-helper#readme)

项目地址: [https://github.com/jellyqwq/class-helper](https://github.com/jellyqwq/class-helper)

新文章: [课表推送助手2.0](./class-helper-2.md)

---

### 过去更新

学校下发的课程表都是图片，每次翻都非常不方便，而且经常有调换课，发的调换课的通知图片即使收藏起来也相当不便，于是我想到了可以做一个课程表推送，基于主课表对个人课表微调。

可以使用客户端~~class-helper-client~~提交自己的选修课信息和调课信息

做的过程也遇到不少麻烦，比如，腾讯的DNS没能正常给我的api域名解析，导致客户端调试时一直显示超时，但是把api域名直接改成服务器ip就没问题了

做的过程也遇到不少麻烦，比如，腾讯的DNS没能正常给我的api域名解析，导致客户端调试时一直显示超时，但是把api域名直接改成服务器ip就没问题了

整个项目主要包括了三大部分：

- 每日定时运行的 main.py
- 提供服务flask服务端 server.py
- 客户端 client.py

其中main.py和server.py是放在服务器上同一个目录下运行的

server.py 文件需要进行一定配置，因为用到了qq邮箱的SMTP服务，在文件里面需要填写QQ号、[SMTP服务授权码](https://jingyan.baidu.com/article/b0b63dbf1b2ef54a49307054.html)以及QQ邮箱，这个邮箱服务是为了客户端注册和重置密码用的

main.py 默认设置了每天6点运行一次

client.py 考虑到不是每个人电脑上都有python运行环境，我就把客户端附带了python的虚拟环境，因此启动时需要用start.bat文件启动

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/8/7113b115ba65504a56c8a966e3af3a00b9a12230f557de50b7870276647aaa97.png)

双击启动start.bat后可以看到如下界面

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/8/dec9eba32b8fec4b068b99f9afcb0cab9098dbf682e1b3d00d3209bc38a945f3.png)

如果是新用户就先创建账号，创建成功后本地会缓存登录信息文件，下次登录就不需要再手动登录，不过也没有手动登录这个选项:(

创建账号后会在当前文件夹下创建一个模板文件，名字是：学号(.json)  内容如下

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/8/0ca5ea30397d70d17f09f3fd691949dfe0796ef52d40c6ae02819c12fe2d0ef3.png)

- student_id：创建时所使用的学号或账号
- class_name：所属班级的名称
- token：pushplus推送服务里的token
- info：选修课配置(字典对象)
    - Wed：字典键->星期的缩写参考：Mon、Tue、Wed、Thu、Fri、Sat、Sun(字典对象)
        - 3：星期的下级结构是上课的时间序号(举个栗子:一节课在第5、6节上，那么他的时间序号即为6/2=3)和其对应的一个列表，因为课程都是一门课连着两节上的，所以结构就这样。(存放了多组字典对象的数组对象)
            - course-name：选修课名字
            - course-teacher：老师姓名
            - course-week：上课周数的数组
            - course-position：上课的地点or教室
- class_change：调课信息(存放了多组字典对象的数组对象)

```
"class_change": [
        {
            "course-week": [调课前周数, 调课后周数],
            "course-week-day": [调课前星期几, 调课后星期几],
            "course-order": [调课前时间序号, 调课后时间序号]
        },
        {
            "course-week": [调课前周数, 调课后周数, 调课后周数],
            "course-week-day": [调课前星期几, 调课后星期几],
            "course-order": [调课前时间序号, 调课后时间序号],
            "course-position": "调课后上课地点，如果有改动就填，没有改动就像上面的调课一样不用写这项"
        }
    ]
```

接着就选4将配置信息提交到服务器即可

### 注意

如果当天没有课程，是不会进行推送的

pushplus需要在微信关注pushplus推送加并允许推送才能收到信息

目前只有我自己班有相关信息，因此其他班注册了也没用，需要写一份原始课表，~~原始课表模板~~

### A&Q

为什么要手动填写？

因为学校教务系统提供的课表是图片，而且清晰度不算高，还有背景干扰，文字识别率低，固没用采用AI文字识别，同时手动填写也是为了课表信息的正确性和灵活性