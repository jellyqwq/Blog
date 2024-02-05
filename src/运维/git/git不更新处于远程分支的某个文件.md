---
title: git不更新处于远程分支的某个文件
icon: page
order: 1
author: Jelly
date: 2024-02-05
category:
  - git
tag:
  - git
sticky: false
star: false
---

# 前言
最初起源于项目里的`docker-compose.yml`文件, github先上传了一份脱敏的`docker-compose.yml`, 然后我本地调试也需要用到这个同名的文件, 我会在其中填写token等环境变量来运行项目, 如果每次上传github都不选择这个文件的改动就对强迫症非常不友好, 或者用这个文件的别名, 使用`docker compose up --conf xxx.yml`来跑. 

这个问题可以用git来解决, 在把`docker-compose.yml`模板上传到github上后, 运行**下述代码**可以让git忽略本地对此文件的修改的变化.
```bash
git --update-index --assume-unchanged docker-compose.yml
```

要让git重新跟踪文件变化, 只要将`--assume-unchanged`改成`--no-assume-unchanged`即可
```bash
git --update-index --no-assume-unchanged docker-compose.yml
```

# 参考文献
<https://stackoverflow.com/questions/9794931/keep-file-in-a-git-repo-but-dont-track-changes>