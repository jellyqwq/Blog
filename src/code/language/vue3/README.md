---
title: Vue3学习笔记
icon: page
order: 1
author: Jelly
date: 2022-12-05
category:
  - Vue3
tag:
  - Vue3
  - Typescript
sticky: false
star: false
article: false
---

懵

<!-- more -->

昨天学习了 Typecript 想找个项目实战下, 打算用 Vue3 来练练手. 

一天下来, 给我感觉是
* Typescript => 会
* Vue3 => 看得明白
* Typecript + Vue3 => 懵了

在反复看 vue3 的文档教程后, 似乎是这么开始ts vue3的
1. 初始化项目, 这一步使用命令 `npm init vue@3` 进行创建, 要选择typescript支持
2. 然后切换到项目下, 使用 `npm install` 下载相关依赖
3. 基于模板开始更改vue组件
4. `npm run dev | build`开始测试或编译

对于一个 vue 文件来看, 分为三个部分
1. `<script setup lang="ts"></script>` 
2. `<template></template>`
3. `<style scoped></style>`

特别的, 对于第一步中的写法, 在引用ts文件时要写成 `<script lang="ts" src=""></script>` 的形式

对象有两种状态: 
1. Object
2. undefined