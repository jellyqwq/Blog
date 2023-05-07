---
title: torch.nn.Linear
icon: page
order: 1
author: Jelly
date: 2022-10-20
category:
  - AI
tag:
  - AI
sticky: false
star: false
---

本文讲述了torch.nn.Linear对象是怎么完成计算过程

<!-- more -->

## 简述

torch.nn.Linear是一个用于线性变换(linear transformation)的对象, 它有三个参数

in_features: 输入特征, 输入张量的最后一个维度大小, `torch.Size([N,*,in_features])`

out_features: 输出特征, 输出张量的最后一个维度大小, `torch.Size([N,*,out_features])`

bias: 偏差值, 对线性变换进行拟合

## 公式说明

在[Pytorch文档](https://pytorch.org/docs/stable/generated/torch.nn.Linear.html#torch.nn.Linear)中给到的公式是 $y=xA^T+b$

y: 每个输出层  
x: 每个输入层  
A: weight, 在Linear对象初始化时随机生成  
b: bias, 也在Linear对象初始化时随机生成

结合实例来看下

```py
>>> import torch
>>> input = torch.Tensor([
...     [1,2,3],
...     [4,5,6],
...     [7,8,9],
... ])
>>>
>>> linear = torch.nn.Linear(3, 2)
>>> linear.weight
Parameter containing:
tensor([[ 0.0234,  0.4268, -0.2368],
        [ 0.1149, -0.1424,  0.3393]], requires_grad=True)
>>> linear.bias
Parameter containing:
tensor([0.4623, 0.1044], requires_grad=True)
```

所以实际上是$y = input @ linear.weight^T + linear.bias$

```py
>>> input @ linear.weight.T + linear.bias
tensor([[0.6288, 0.9526],
        [1.2689, 1.8884],
        [1.9089, 2.8241]], grad_fn=<AddBackward0>)
>>> m(input)
tensor([[0.6288, 0.9526],
        [1.2689, 1.8884],
        [1.9089, 2.8241]], grad_fn=<AddmmBackward0>)
```

## 参考文献
1. <https://pytorch.org/docs/stable/generated/torch.nn.Linear.html#torch.nn.Linear>
2. <https://ckmarkoh.github.io/blog/2016/12/19/torch-nn-tutorial-1-nn-module/>
3. <https://ashwinhprasad.medium.com/pytorch-for-deep-learning-nn-linear-and-nn-relu-explained-77f3e1007dbb>