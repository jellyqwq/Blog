---
title: torch.nn.Flatten 和 torch.flatten 的区别
icon: page
order: 1
author: Jelly
date: 2022-10-15
category:
  - AI
tag:
  - AI
sticky: false
star: false
---

torch.nn.Flatten()是一个用于对tensor降维的对象, 而torch.flatten()是一个用于对tensor降维的函数.

<!-- more -->

## torch.nn.Flatten

`torch.nn.Flatten(start_dim=1, end_dim=-1)` 有两个参数表示降维维度的范围, 默认是从第二个维度(index 1)到最后一个维度(index -1)

```py
>>> input = torch.randn(32, 1, 5, 5)
>>> # With default parameters
>>> m = nn.Flatten()
>>> output = m(input)
>>> output.size()
torch.Size([32, 25])
>>> # With non-default parameters
>>> m = nn.Flatten(0, 2)
>>> output = m(input)
>>> output.size()
torch.Size([160, 5])
```

上述定义了一个四维的tensor, 使用默认的`torch.nn.Flatten()`实例化对象是取`index 1`到`index -1`对应上述的`input`就是`1, 5, 5`, 降维大小计算是降维前的大小累乘, 因此`output`的size是`[32, 1*5*5]`, 后者不用默认参数, 使用区间`[0, 2]`, 故降维后的size是`[32*1*5, 5]`.

## torch.flatten

`torch.flatten(input: Tensor, start_dim: _int = 0, end_dim: _int = -1)`, 是一个有三个参数的函数, 第一个`input`是输入的Tensor对象, 第二和第三个是维度索引的起始和结束.

```py
>>> input = torch.randn(32, 1, 5, 5)
>>> output = torch.flatten(input) 
>>> output.size()
torch.Size([800])
```

上述示例中, 默认的`torch.flatten()`使用区间`[0, -1]`, 即降至一维, 所以输出size是`[32*1*5*5]`.

## 补充

对于一个`Tensor`对象而言, `.size()`方法和`.shape`属性都可获得该对象的`Size`.

```py
>>> input = torch.randn(32, 1, 5, 5)
>>> input.size()
torch.Size([32, 1, 5, 5])
>>> input.shape 
torch.Size([32, 1, 5, 5])
```

## 参考文献
1. <https://stackoverflow.com/questions/67460123/understanding-torch-nn-flatten>
2. <https://pytorch.org/docs/stable/generated/torch.randn.html>
3. <https://pytorch.org/docs/stable/generated/torch.nn.Flatten.html#torch.nn.Flatten>
4. <https://pytorch.org/docs/stable/generated/torch.flatten.html>