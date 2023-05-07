---
title: wenku8小说收集
icon: page
order: 1
author: Jelly
date: 2022-04-11
category:
  - Python
tag:
  - Python
  - 爬虫
sticky: false
star: false
---

我是个收集党，对东西有很强的占有欲，想把喜欢的东西保存下来。

《魔女之旅》是一部我很喜欢的番剧，因为番剧，我知道了这是一系列丛书，因此我想把它从wenku网站给转移到我的GitHub上观看。

初步构想是以markdown语法写入GitHub，这样就可以直接看了。

那么，需要分为网页请求，获取所有的分目录以及所对应的网址，在对这些网址的信息，即小说的具体内容读出。

写着写着就不止于把《魔女之旅》下下来，这个文库网站说了停站，但还是有不少的小说在网站上可以通过url访问到，大概有1000套小说左右，分布在**https://www.wenku8.net/novel/2/(2000~3000)/index.htm**，所以我就顺手哦把这整个网站的所有小说下载然后写成md文件传到GitHub上，作为一个小说库，这是我搭建电子图书馆的第一个项目。

可以单本小说下载，也可以通过小说的网页序号下载。

底下注释掉的部分是用来遍历下载整个wenku8的所有小说和生成md索引的，但是用多进程很鸡肋，下着下者会出现卡死，这个问题未被解决。

项目代码:

- [main_index.py](https://github.com/jellyqwq/novel/blob/main/main_index.py)
- [novel_list.py](https://github.com/jellyqwq/novel/blob/main/novel_list.py)
- [wenku8.py](https://github.com/jellyqwq/novel/blob/main/wenku8.py)
- [wenku8_novel_list.py](https://github.com/jellyqwq/novel/blob/main/wenku8_novel_list.py)
- [wenku8_novel_list_save.py](https://github.com/jellyqwq/novel/blob/main/wenku8_novel_list_save.py)

小说链接: [https://github.com/jellyqwq/novel#novel](https://github.com/jellyqwq/novel#novel)