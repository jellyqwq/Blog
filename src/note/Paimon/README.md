---
title: Paimon telegram bot
icon: page
order: 1
author: Jelly
date: 2022-10-26
sticky: false
article: false
---

About Paimon telegram bot architecture

<!-- more -->

## Introduction
Paimon telegram bot is a general bot. It can serach songs you like and download songs to your telegram chat. It provides a webhook to get messages that comprised of the video, image, file, etc from the QQ(cqhttp). Unfortunately, this is unsupported to send messages to QQ from telegram, because the telegram message may make my QQ account banned. For getting news about society of China, we provide some spiders to get hot word of many news websites, such like Bilibili and Weibo. 

## Features
- [ ] Message forward
    - [X] text
    - [X] image
    - [X] gif
    - [X] mp4
    - [ ] png
    - [ ] jpg
    - [ ] CQ.face
    - [ ] json card
- [X] Hot word
    - [X] Bilibili
    - [X] Weibo
- [X] music
    - [X] serach
        - [X] youtube
    - [X] transform
        - [X] y2mate

## Functions
- config
    - ReadYaml
- cqtotg
    - Post
    - VideoParse
- news
    - BiliHotWords
    - WeiboHotWords
- requests
    - Bronya
- tools
    - GetParamsOneDimension
    - IsOneDimensionSliceContainsString
    - Md5
- webapi
    - RranslateByYouDao
    - YoutubeSearch
    - countAudioSeconds
    - Y2mateByTools
    - Y2mateByCom

