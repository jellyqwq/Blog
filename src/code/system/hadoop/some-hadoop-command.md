---
title: Some hadoop commands
icon: page
order: 1
author: Jelly
date: 2022-12-15
category:
  - Hadoop
tag:
  - Hadoop
sticky: false
star: false
---

### Hadoop相关命令的使用

<!-- more -->

hadoop系统可继承一定的Linux系统命令, 以命令 `ls` 为例, 在hadoop系统中则需使用 `hadoop dfs -ls`.

特别的, hadoop有一对专门用于上传下载的命令, `hadoop dfs -put` 和 `hadoop dfs -get`.

创建一个 `speech.txt` 文件, 其内容为
```
There is no mountain we cannot climb
There is no summit we cannot reach
There is no challenge we cannot meet
There is no victory we cannot have
We will not bend
We will not break
We will not yield
We will never give in
We will never give up
And we will never ever back down
```

我将其放在了hadoop目录下 `~/hadoop/speech.txt`

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/12/8cd77591-a5f1-4dab-b76d-b343bd80edfb.png)

将其传到hadoop系统的根目录下 `/`
```sh
hdfs dfs -put speech.txt /
```

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/12/a0bcc1e1-086f-4b10-aeba-0cff3fa23377.png)

使用hadoop官方示例 `hadoop-mapreduce-examples-*.*.*.jar` 统计 `speech.txt` 的单词数量
```
hadoop jar ~/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.2.4.jar wordcount /speech.txt /speechCount
```

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/12/d4a7448d-188a-4c80-ab34-a29bfed1ea3e.png)

查看统计结果
```sh
hdfs dfs -cat /speechCount/part-r-00000
```

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/12/d2ae5a28-01a9-455e-bad5-04f96c8494c2.png)

### webUI

我这里使用了docker的端口映射, 将9870端口映射到了我的windows宿主机上的19870端口.

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2022/12/9571978e-178a-4be9-a98d-83446d539736.png)