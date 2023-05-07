---
title: B站每日自动化
icon: page
order: 1
author: Jelly
date: 2022-01-23
category:
  - auto-task
tag:
  - auto-task
  - Python
sticky: false
star: false
---

# bili2233

bili2233这个系列将记录我写bilibili小工具的一些日常。

本次开发参考了GitHub上的[bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)项目，得益于这个项目对b站的API的收集，让制作过程省去不少麻烦。

写这篇文章前,项目已经初步实现了直播签到、每日任务检测、每日分享、投币以及推送，但——整个过程都写在一个文件里，维护起来不太方便，我打算把功能分类写到相应的模块的类里面。

现在先从登录模块的制作开始，这里b站提供了扫码登录、密码登录和手机验证码登录，这都不是关键，关键在于获取通过这些方式后的一串固定的登录密钥。

一开始以为[http://passport.bilibili.com/qrcode/getLoginUrl](http://passport.bilibili.com/qrcode/getLoginUrl)返回json数据中的url可以直接访问到二维码图片，然而实际访问这个url会进行一个跳转，跳转到另外的一个链接[https://d.bilibili.com/download_app.html?bsource=app_bili](https://d.bilibili.com/download_app.html?bsource=app_bili)，跳转过程出现了一个一闪而过的界面，但是什么没有二维码，我觉得这是重定向，于是在网上找了好久的禁止重定向的方法，山穷水尽时，我才想到能不能用那个我以为生成二维码的链接的URL去生成二维码，于是我用草料二维码对那个网址生成了一下并用b站扫码测试，结果可行，那么接下来就只需要解决用URL生成一个信息为URL的二维码就行了。

总结一下，响应数据的链接https://passport.bilibili.com/qrcode/h5/login?oauthKey=766347b20bda5fd4b372b7cd34925e68并不是一张图片URL，登陆需要扫的正是这整个链接URL本身所生成的二维码。

知道了问题就可以解决了，Python第三方qrcode，可以解决二维码的生成问题。

关于[二维码的生成原理](https://coolshell.cn/articles/10590.html)。

现在，利用qrcode把二维码生成出来了，但是又遇到一个问题，如何实现扫码后登录成功就自己把图片关掉，一开始直接用的qrcode的img对象进行show()，但是发现关起来不简单，于是我打算使用tkinter组件来实现，不过我发现tkinter的mainloop相当于一个while循环，也正是因为这个循环，二维码才能够作为窗口悬挂出来，想要继续跑下面对登录状态的检测就不行了，这么看来，只能是用双线程来实现。

其实我也查到了一个可以在mainloop中运行函数的after方法，但是并不太适合，after的第一个参数是以毫秒为单位的延时，第二个是延时后执行的函数。

经过一下午加一晚上的时间，把验证码扫完成功了会自行关掉的功能做出来了，尽可能使用python自带的模块。

关于悬挂图片并能继续运行后面的代码：

我选用了threading模块来创建一个用于跑tkinter的线程，这样就不影响我的主线程的循环检测，然后，我将创建的tkinter对象root声明为全局变量，这样我可以在主线程中控制tkinter的结束，我在主线程中使用了destroy方法对root对象进行关闭，但是这个时候会出现程序假死的问题，我猜测是因为多线程产生的问题，destroy将root窗口关闭，但是tkinter线程还在并且处于阻塞状态，将程序卡住，我便想从如何终止这个子线程来看看能不能解决问题，于是找到两种方法

1. threading的event事件
2. 用python的错误处理机制来终止线程

因为第二种的有更现成的运用，所以我用了第二种，但实际上第一种对线程的终止是更友好的。第二种就是用网上千篇一律找不到作者的代码片段——两个函数

```py
def _async_raise(tid, exctype):
    """raises the exception, performs cleanup if needed"""
    tid = ctypes.c_long(tid)
    if not inspect.isclass(exctype):
        exctype = type(exctype)
    res = ctypes.pythonapi.PyThreadState_SetAsyncExc(tid, ctypes.py_object(exctype))
    if res == 0:
        raise ValueError("invalid thread id")
    elif res != 1:
        ctypes.pythonapi.PyThreadState_SetAsyncExc(tid, None)
        raise SystemError("PyThreadState_SetAsyncExc failed")

def stop_thread(thread):
    _async_raise(thread.ident, SystemExit)
```

一般可以配合下面的代码使用

```py
all_threads = threading.enumerate() # 查看当前程序的线程
for thread in all_threads:
    if t.name == '创建线程时的线程名':
        stop_thread(thread)
```

通过上述代码就解决root.destroy()导致的程序进入假死的问题。

后面我加上了一个提取登录信息的函数，可直接将接下来登录要用的参数返回。

今天把扫码验证的cookie和config.json文件结合，终于明白了扫码和短信是真的不适合用来做每日登录，需要复杂的人机交互，当下只有密码登录可以解决每日登录的问题，也就是说，现在理论上除了每日登录之外的所有功能都可以长时间无人干涉地运行。
