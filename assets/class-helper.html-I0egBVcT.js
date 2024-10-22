import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as s,c as o,b as e,d as n,e as t,w as c,a as d}from"./app-XoEOURcT.js";const p={},u=e("p",null,"由于找到了网页版查看微信公众号的方法, 也就是在User-Agent中加入一个代表微信的字串, 所以可以直接调用学校公众号课表的接口获取数据. 所以之前的步骤通通不用, 只需要使用网页端存放openid以及推送的token即可.",-1),h={href:"https://github.com/jellyqwq/class-helper#readme",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/jellyqwq/class-helper",target:"_blank",rel:"noopener noreferrer"},f=e("hr",null,null,-1),b=e("h3",{id:"过去更新",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#过去更新","aria-hidden":"true"},"#"),n(" 过去更新")],-1),m=e("p",null,"学校下发的课程表都是图片，每次翻都非常不方便，而且经常有调换课，发的调换课的通知图片即使收藏起来也相当不便，于是我想到了可以做一个课程表推送，基于主课表对个人课表微调。",-1),g=e("p",null,[n("可以使用客户端"),e("s",null,"class-helper-client"),n("提交自己的选修课信息和调课信息")],-1),v=e("p",null,"做的过程也遇到不少麻烦，比如，腾讯的DNS没能正常给我的api域名解析，导致客户端调试时一直显示超时，但是把api域名直接改成服务器ip就没问题了",-1),q=e("p",null,"做的过程也遇到不少麻烦，比如，腾讯的DNS没能正常给我的api域名解析，导致客户端调试时一直显示超时，但是把api域名直接改成服务器ip就没问题了",-1),y=e("p",null,"整个项目主要包括了三大部分：",-1),k={href:"http://main.py",target:"_blank",rel:"noopener noreferrer"},x={href:"http://server.py",target:"_blank",rel:"noopener noreferrer"},w={href:"http://client.py",target:"_blank",rel:"noopener noreferrer"},j=e("p",null,"其中main.py和server.py是放在服务器上同一个目录下运行的",-1),S={href:"http://server.py",target:"_blank",rel:"noopener noreferrer"},B={href:"https://jingyan.baidu.com/article/b0b63dbf1b2ef54a49307054.html",target:"_blank",rel:"noopener noreferrer"},N={href:"http://main.py",target:"_blank",rel:"noopener noreferrer"},P={href:"http://client.py",target:"_blank",rel:"noopener noreferrer"},Q=d(`<figure><img src="https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/8/7113b115ba65504a56c8a966e3af3a00b9a12230f557de50b7870276647aaa97.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>双击启动start.bat后可以看到如下界面</p><figure><img src="https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/8/dec9eba32b8fec4b068b99f9afcb0cab9098dbf682e1b3d00d3209bc38a945f3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果是新用户就先创建账号，创建成功后本地会缓存登录信息文件，下次登录就不需要再手动登录，不过也没有手动登录这个选项:(</p><p>创建账号后会在当前文件夹下创建一个模板文件，名字是：学号(.json) 内容如下</p><figure><img src="https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/8/0ca5ea30397d70d17f09f3fd691949dfe0796ef52d40c6ae02819c12fe2d0ef3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>student_id：创建时所使用的学号或账号</li><li>class_name：所属班级的名称</li><li>token：pushplus推送服务里的token</li><li>info：选修课配置(字典对象) <ul><li>Wed：字典键-&gt;星期的缩写参考：Mon、Tue、Wed、Thu、Fri、Sat、Sun(字典对象) <ul><li>3：星期的下级结构是上课的时间序号(举个栗子:一节课在第5、6节上，那么他的时间序号即为6/2=3)和其对应的一个列表，因为课程都是一门课连着两节上的，所以结构就这样。(存放了多组字典对象的数组对象) <ul><li>course-name：选修课名字</li><li>course-teacher：老师姓名</li><li>course-week：上课周数的数组</li><li>course-position：上课的地点or教室</li></ul></li></ul></li></ul></li><li>class_change：调课信息(存放了多组字典对象的数组对象)</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;class_change&quot;: [
        {
            &quot;course-week&quot;: [调课前周数, 调课后周数],
            &quot;course-week-day&quot;: [调课前星期几, 调课后星期几],
            &quot;course-order&quot;: [调课前时间序号, 调课后时间序号]
        },
        {
            &quot;course-week&quot;: [调课前周数, 调课后周数, 调课后周数],
            &quot;course-week-day&quot;: [调课前星期几, 调课后星期几],
            &quot;course-order&quot;: [调课前时间序号, 调课后时间序号],
            &quot;course-position&quot;: &quot;调课后上课地点，如果有改动就填，没有改动就像上面的调课一样不用写这项&quot;
        }
    ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着就选4将配置信息提交到服务器即可</p><h3 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意</h3><p>如果当天没有课程，是不会进行推送的</p><p>pushplus需要在微信关注pushplus推送加并允许推送才能收到信息</p><p>目前只有我自己班有相关信息，因此其他班注册了也没用，需要写一份原始课表，<s>原始课表模板</s></p><h3 id="a-q" tabindex="-1"><a class="header-anchor" href="#a-q" aria-hidden="true">#</a> A&amp;Q</h3><p>为什么要手动填写？</p><p>因为学校教务系统提供的课表是图片，而且清晰度不算高，还有背景干扰，文字识别率低，固没用采用AI文字识别，同时手动填写也是为了课表信息的正确性和灵活性</p>`,16);function T(L,V){const l=r("ExternalLinkIcon"),i=r("RouterLink");return s(),o("div",null,[u,e("p",null,[n("更新详情: "),e("a",h,[n("https://github.com/jellyqwq/class-helper#readme"),t(l)])]),e("p",null,[n("项目地址: "),e("a",_,[n("https://github.com/jellyqwq/class-helper"),t(l)])]),e("p",null,[n("新文章: "),t(i,{to:"/invalid/class-helper-2.html"},{default:c(()=>[n("课表推送助手2.0")]),_:1})]),f,b,m,g,v,q,y,e("ul",null,[e("li",null,[n("每日定时运行的 "),e("a",k,[n("main.py"),t(l)])]),e("li",null,[n("提供服务flask服务端 "),e("a",x,[n("server.py"),t(l)])]),e("li",null,[n("客户端 "),e("a",w,[n("client.py"),t(l)])])]),j,e("p",null,[e("a",S,[n("server.py"),t(l)]),n(" 文件需要进行一定配置，因为用到了qq邮箱的SMTP服务，在文件里面需要填写QQ号、"),e("a",B,[n("SMTP服务授权码"),t(l)]),n("以及QQ邮箱，这个邮箱服务是为了客户端注册和重置密码用的")]),e("p",null,[e("a",N,[n("main.py"),t(l)]),n(" 默认设置了每天6点运行一次")]),e("p",null,[e("a",P,[n("client.py"),t(l)]),n(" 考虑到不是每个人电脑上都有python运行环境，我就把客户端附带了python的虚拟环境，因此启动时需要用start.bat文件启动")]),Q])}const E=a(p,[["render",T],["__file","class-helper.html.vue"]]);export{E as default};