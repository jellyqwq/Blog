---
title: Python NCRE 2
icon: page
order: 1
author: Jelly
date: 2022-11-20
category:
  - 学习记录
tag:
  - NCRE
  - Python
sticky: false
star: false
---

Python二级错题本

<!-- more -->

## Python
看对选错, 对错混淆

python面向过程,也面向对象

函数是否return?, 对全局变量修改还是对函数内部变量的修改

python各进制表达
0b1010 二进制
0o1010 八进制
0x1010 十六进制

f.readlines() 返回一行列表,里面包括文件每行的字符串

格式化要求错误, "{:->10.2f}".format() 表示右对齐, 长度为10, 其余部分用"-"补齐, 保留两位小数 ,f:小数类型.
带千分位的话就在.2f前加",", 即"{:->10,.2f}", 这种格式化在超出指定长度时按真实长度输出

变量名写错, IDLE改了而题里没改

jieba库要求用lcut做全模式分词, 没加, cut_all=True

在程序间交换数据常用的第三方库是json🤔(不是Pandas, 但json是原生库)

序列类型是一维元素向量

字符串比大小: 按位比ASCII码大小, **ASCII递增: 空格0-9A-Za-z**

Python 字符编码可以使用 ASCII 编码和 Unicode 编码。

集合类型和映射类型都是没有顺序的数据类型,不能通过序号访问

当while循环在执行过程中产生不满足继续循环的值时也会继续完成本次循环未执行的代码

> 使用赋值语句生成元组的两种方式, **没有括号也可以**
```py
>>> animal = "cat", "dog", "tiger","rabbit"
>>> print(animal)
('cat', 'dog', 'tiger', 'rabbit')
>>> print(type(animal))
<class 'tuple'>
>>> animal = ("cat", "dog", "tiger","rabbit")
>>> print(animal)
('cat', 'dog', 'tiger', 'rabbit')
```

> 实部与实部相加,虚部与虚部相加,最后得到0j,注意当虚部为0时, j依然不能省略
```py
>>> x=4+3j
>>> y=-4-3j
>>> print(x+y)
0j
```

> for 遍历字典的时候是取 key
```py
>>> dc = {'A':1, 'B':2, 'C':3}
>>> for i in dc:
...     print(i)
...
A
B
C
```

> 当';'.join(string)中string只有一个元素(字符)时,";"不显示
```py
>>> ';'.join("82")
'8;2'
>>> ';'.join("8")
'8'
```

> 字符串对象的join(s)方法的参数s只能是字符串或包含纯字符串的列表
```py
>>> sls = ['2018', '2019', '2020']
>>> nls = [2018, 2019, 2020]
>>> nsls = ['2018', '2019', 2020]
>>> ''.join(sls)
'201820192020'
>>> ''.join(nls)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: sequence item 0: expected str instance, int found
>>> ''.join(nsls)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: sequence item 2: expected str instance, int found
```

> string.center(10,"*"), 第二个参数必须是字符
```py
>>> string = 'Nahida'
>>> string.center(10, "*")
'**Nahida**'
>>> string.center(10, *)
  File "<stdin>", line 1
    string.center(10, *)
                       ^
SyntaxError: invalid syntax
```

> dict.values()类型是dict_values
```py
>>> dic = {1:100, 2:200}
>>> dic.values()       
dict_values([100, 200])
```

### pip参数
```
Commands:
  install                     Install packages.
  download                    Download packages.
  uninstall                   Uninstall packages.
  freeze                      Output installed packages in requirements format.
  list                        List installed packages.
  show                        Show information about installed packages.
  check                       Verify installed packages have compatible dependencies.
  config                      Manage local and global configuration.
  search                      Search PyPI for packages.
  cache                       Inspect and manage pip's wheel cache.
  index                       Inspect information available from package indexes.
  wheel                       Build wheels from your requirements.
  hash                        Compute hashes of package archives.
  completion                  A helper command used for command completion.
  debug                       Show information useful for debugging.
  help                        Show help for commands.
```

### Pyinstaller
> -D 目录打包, -F单文件打包
```
-D, --onedir          Create a one-folder bundle containing an executable (default)
-F, --onefile         Create a one-file bundled executable.
```

### turtle
> setup() - 函数打开一个自定义大小和位置的画布

> shape() - 函数用于设置绘图箭头的形状

> getscreen() - 函数返回一个TurtleScreen类的绘图对象

> width() - 设置画笔宽度，当无参数输入时返回当前画笔宽度

### random
> randint(a, b)和uniform(a, b)都是 `[a,b]` 区间, 后者用于生成小数
```py
>>> import random
>>> random.seed(1202)
>>> random.randint(1, 10)
5
>>> random.uniform(1, 10)
9.740821594277111
```

### string
> string.printable 包含的字符定义如下
```py
# Some strings for ctype-style character classification
whitespace = ' \t\n\r\v\f'
ascii_lowercase = 'abcdefghijklmnopqrstuvwxyz'
ascii_uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
ascii_letters = ascii_lowercase + ascii_uppercase
digits = '0123456789'
hexdigits = digits + 'abcdef' + 'ABCDEF'
octdigits = '01234567'
punctuation = r"""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""
printable = digits + ascii_letters + punctuation + whitespace
```

> 'asdf'字符串并不连续, 所以该字符串不在printable字符串内
```py
>>> import string
>>> 'a' in string.printable
True
>>> 'asdf' in string.printable
False
>>> 'defgh' in string.printable
True
```

### 列表
> 列表可以比较
```py
>>> a = [1,2,3,4]
>>> b = [4,3,2,1]
>>> c = [1,2,4,3]
>>> d = ['1','2','3','4']
>>> a > b
False
>>> a >= b
False
>>> c > a
True
>>> a != d
True
>>> a > d
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: '>' not supported between instances of 'int' and 'str'
```

### 内置函数
> min() - 列表
```py
>>> min(["s",6,"ss",66])
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: '<' not supported between instances of 'int' and 'str'
>>> min(["s","ss"])
's'
>>> min([6,66])
6
>>> min([6,66,6])
6
```

> min() - 字典比key
```py
>>> min({3:7,10:5,1:6})
1
```

> 除法运算即使能整除也是返回小数类型的
```py
>>> 10/2
5.0
```

> round(x)：返回对x四舍五入的整数值, 实际上是对大于5的进行五入操作
```py
>>> x, y, z = 2.4, 2.5, 2.51
>>> round(x)
2
>>> round(y)
2
>>> round(z)
3
```

> sorted(): 返回一个列表
```py
>>> dd = {'chinese':200,'pe':187,'Gana':930}
>>> sorted(dd.keys())
['Gana', 'chinese', 'pe']
```

### 字符串类
> 字符串索引截取
```py
>>> s = 'HelloWorld'
>>> s[5::]
'World'
>>> s[5::-2]
'Wle'
```

> format格式化字符串时, '{{}}'输出的是'{}', 取消了格式化位
```py
>>> ls = 'ab'
>>> '{{}}{:=^4}'.format(ls)
'{}=ab='
```

### 标准库的一些函数
> time.ctime()
```py
>>> import time
>>> time.ctime()
'Tue Nov 22 20:39:14 2022'
>>> type(time.ctime())
<class 'str'>
```

### 第三方库
> 数据分析和可视化是两类
1. MXNet - 亚马逊（Amazon）选择的深度学习库
2. Keras - 开源人工神经网络库
3. Seaborn - 基于matplotlib的可视化库
4. numpy、scipy、pandas - 数据分析方向
5. matplotlib、TVTK、mayavi - 数据可视化析
6. PyQt5、wxPython、PyGTK - 开发用户界面
7. Flask、Django、Pyramid - Web 开发框架
8. TimeSide用于web的开源音频处理框架

### 文件io
文件读取方法：read、readline、readlines、seek

文件写入方法：write、writelines

Python文件打开模式: 'r'、'w'、'x'、'a'、'b'、't'、'+', 其中'r'、'w'、'x'、'a'可以和'b'、't'、'+'组合使用。'x'是写模式，新建一个文件，如果文件存在会报错；'t'是文本模式（默认）。

r+：可读可写，若文件不存在，报错

w+：可读可写，若文件不存在，创建

"\"是字符串中的转义符，所以表示路径时，使用 "\\\\" 或 "/" 或 "//" 代替 "\\"

> open打开的文件对象是可输出的
```py
>>> f = open('a.txt', 'r')
>>> print(f)
<_io.TextIOWrapper name='a.txt' mode='r' encoding='cp936'>
```

### 对象有如下一些基本特点
1. 标识唯一性
2. 分类性
3. 多态性
4. 封装性

### 字符串对象
> upper()是字符串对象的方法. len()内置函数可以获取字符串长度
```py
>>> s='upper'
>>> s.upper() 
'UPPER'
>>> len(s) 
5
```

### 其他
> for遍历一个列表的时候对列表长度修改会提前或延迟结束遍历
```py
>>> ss = [2,3,4,5,6,7]
>>> for i in ss:
...     print(max(ss))
...     ss.remove(max(ss))
... 
7
6
5
>>> ss = [-1]
>>> for n, i in enumerate(ss):
...     if n == 10:
...         print(ss)
...         break
...     print(ss)
...     ss.append(n)
...
[-1]
[-1, 0]
[-1, 0, 1]
[-1, 0, 1, 2]
[-1, 0, 1, 2, 3]
[-1, 0, 1, 2, 3, 4]
[-1, 0, 1, 2, 3, 4, 5]
[-1, 0, 1, 2, 3, 4, 5, 6]
[-1, 0, 1, 2, 3, 4, 5, 6, 7]
[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8]
[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

> 但是, 给迭代对象套一个range后, 循环次数将会被锁住, 不随列表的动态变化而变化
```py
>>> li = [2,3,4,5,6]
>>> for i in range(len(li)):
...     print(max(li), end=" ")
...     li.remove(max(li))
... else:
...     print()
... 
6 5 4 3 2
```
> [Feature] 函数中对未进行传参的默认参数的进行自修改
```py
>>> def func(x=[], y=[6,7]):
...     print('input> x:', x, 'y:', y)
...     x.append(8)
...     y.append(8)
...     print('output> x:', x, 'y:', y)
...     return (x+y)
...
>>> a,b=[1,2],[3,4]
>>> t=func(x=a)
input> x: [1, 2] y: [6, 7]
output> x: [1, 2, 8] y: [6, 7, 8]
>>> t=func(y=b)
input> x: [] y: [3, 4]
output> x: [8] y: [3, 4, 8]
>>> func()
input> x: [8] y: [6, 7, 8]
output> x: [8, 8] y: [6, 7, 8, 8]
[8, 8, 6, 7, 8, 8]
```

## 算法
冒泡排序、快速排序、简单选择排序的最坏时间复杂度是 O(n^2)。希尔排序的时间复杂度与增量序列的选取有关，最坏情况下比其他三种排序更快。

## 数据结构
双向链表不是非线性结构，是线性结构；二叉链表是树的实现方式，是非线性结构，所以链表可以是线性结构也可以是非线性结构。

在任意二叉树中，度为 0 的结点即叶子结点总是比度为 2 的结点多一个

[二叉树前序遍历、中序遍历和后序遍历](https://blog.csdn.net/heihaozi/article/details/103938367)（二叉树前中后序，前序后序定节点，中序定左右）

元素集合的线性结构

循环队列在不为空的情况下至少空一位

线性表、向量、栈、队列都属于线性结构的顺序存储。

只有一个根结点和一个叶子结点，其表述本身指定其数据类型为树形结构，因为只有两个结点，所以也不能称之为线性结构。

树作为一种应用广泛的一对多非线性数据结构，拥有两种不同的存储结构，可以用顺序存储或链式存储。

二叉树就是非线性结构

> 树用度求叶子结点数

树的总结点数为度为3的结点数+度为2的结点数+度为1的结点数+度为0的结点数,即为4+1+3+n。再根据树的总结点数为树中所有结点的度数之和再加1 ,则总结点数为3x4+2x1+ 1x3+0xn+1。3x4+2*1+1x3+1-4+1+3+n, 则n=10 ,叶子结点数为10。

## 数据库
数据库系统的三级模式包括：概念模式、外模式(子模式或用户模式)、内模式。一个概念模式可以有若干个外模式

物理数据模型又称物理模型，它是一种面向计算机物理表示的模型，此模型给出了数据模型在计算机上物理结构的表示

**层次模型**是最早发展出来的数据库模型。它的基本结构是**树型结构**，这种结构方式在现实世界中很普遍，如家族结构、行政组织机构，它们自顶向下、层次分明。

### 关系
笛卡尔积的定义是设关系R和S的元数分别是r和s，R和S的笛卡尔积是一个（r+s）元属性的集合，每一个元组的前r个分量来自R的一个元组，后s个分量来自s的一个元组。所以关系T的属性元数是3+4=7.

关系模型采用二维表来表示，简称表。在表框架中按行可以存放数据，每行数据称为元组，二维表中的元组均不相同。

中学教师和授课班级：多对多（中学教师是一个集体）

把现实世界中的客观对象抽象为某一种信息结构，这种信息结构并不依赖于具体的计算机系统，不是某一个数据库管理系统（DBMS）支持的数据模型，而是概念级的模型，称为概念模型。**概念模型与DBMS无关**

数据库设计包括概念设计、逻辑设计和建立数据库(物理结构)

### 范式
1. 每个属性不可再分
2. 先找出能识别记录的主键(1个以上) > 不能产生部分依赖
3. 非主键不产生传递依赖

每个属性都已不能再分为简单项，则它属于第一范式模式。

第二范式首先是第一范式，另外包含两部分内容，一是表必须有一个主键；二是没有包含在主键中的属性必须完全依赖于主键，而不能只依赖于主键的一部分。

第三范式首先是第二范式，另外非主键属性必须直接依赖于主键，不能存在传递依赖。

### DBMS
**数据操纵**，数据库管理系统为用户使用数据库中的数据提供方便，它一般提供查询、插入、修改以及删除数据的功能。

## 软件工程
软件在运行期间不会因为介质的磨损而老化，只可能应为适应硬件环境以及需求变化进行修改而引入错误, 导致失效率升高从而软件退化。

### 软件测试
> 软件测试的目的就是尽可能多地发现程序中的错误
1. 软件测试是为了发现错误而执行程序的过程
2. 个好的测试用例是指很可能找到迄今为止尚未发现的错误的用例
3. 一个成功的测试是发现了至今尚未发现的错误的测试
4. 动态测试是基于计算机的测试，是为了发现错误而执行程序的过程。**白盒测试**的主要方法有**逻辑覆盖测试**、**基本路径测试**等。
5. 基本路径测试的思想和步骤是，根据软件过程性描述中的控制流程确定程序的环路复杂性度量，用此度量定义基本路径集合，并由此导出一组测试用例对每一条独立执行路径进行测试。
6. 程序调试的基本步骤: **错误定位**, **回归测试**, 防止引入新错误, 修改设计代码以排除错误

**黑盒测试**方法也称为**功能测试**或**数据驱动测试**。黑盒测试是对**软件已经实现的功能**是否满足需求进行测试和验证。黑盒测试完全不考虑程序内部的逻辑结构和内部特性，只依据程序的需求和功能规格说明，检查程序的功能是否符合它的功能说明。

### 软件按功能分类
1. 应用软件 - 为解决特定领域的应用而开发的软件。
2. 系统软件
3. 支撑软件（或工具软件）

### 软件单元测试的内容
1. 模块接口测试
2. 局部数据结构测试
3. 边界条件测试
4. 模块中所有独立路径测试
5. 比较判断与控制流常常紧密相关

### 系统总体结构图
1. 结构图的深度表示控制的层数
2. 结构图是描述软件结构的图形工具
3. 原子模块是不可再进行模块拆分的模块
4. 扇入是指模块受了多少个直接上级模块的调用

### 数据流图(DFD | Data Flow Diagram)
1. 数据流图是描述数据处理过程的工具，是需求理解的逻辑模型的图形表示，它直接支持系统的功能建模。
2. 数据流图中，数据流指暂时保存的数据，它可以是数据库文件或任何形式的数据组织，**数据存储间不应该有数据流**。
3. 数据流图中除了流向数据存储或从数据存储流出的数据不必命名外，每个数据流必须要有一个合适的名字，以反映该数据流的含义。
4. 相邻两层DFD之间具有父、子关系，子图代表了父图中某个加工的详细描述，父图表示了子图间的接口。子图个数不大于父图中的处理个数。所有子图的输入、输出数据流和父图中相应处理的输入、输出数据流必须一致。

### 程序流程图 (PFD | Process Flow Diagram)
程序流程图（PFD）是一种传统的、应用广泛的软件过程设计表示工具，通常也称为程序框图，其箭头代表的是控制流

### 顺序程序
1. 顺序性
2. 封闭性
3. 可再现性

## 计算机理论
进程是指一个具有一定独立功能的程序关于某个数据集合的一次运行活动. **进程是程序的执行过程**.

一般把计算机完成一条指令所花费的时间统称为一个**指令周期**。指令周期越短，指令执行就越快。

芯片内部连接各元件的总线称为内部总线。

计算机中要使用外存储器中的信息，要现将其调入内存储器（CPU可以直接访问内存）

定点数偏移码表示：不管是正数还是负数，其补码的符号位取反即是偏移码。

常用的连续存储管理技术有**固定分区存储管理**和**可变分区存储管理**

一个完整的计算机系统应包括硬件系统和软件系统两大部分。

计算机硬件系统由运算器、存储器、控制器、输入设备和输出设备五大基本部件组成。

计算机内部使用二进制表示指令和数据。

**虚拟存储器**是对**主存的逻辑扩展**，使存储系统既具有相当于外存的容量又有接近于主存的访问速度。

通常，进程创建完成后会进入就绪状态，在运行、阻塞和就绪间迁移，进行相关的任务执行；完成相关任务后，由运行状态进入终止状态，结束进程并释放相关资源。

多道程序设计技术是指允许多个程序同时进入内存并运行。即同时把多个程序放入内存，并允许它们交替在CPU中运行，多个程序可共享系统中的各种硬、软件资源。当一个程序因I/O请求而暂停运行时，CPU便立即转去运行另一个程序。

断电后其中信息会丢失的是**RAM**，RAM就是随机存取存储器，是与CPU直接交换数据的内部存储器。它可以随时读写，而且速度很快，通常作为操作系统或其他正在运行中的程序的临时数据存储介质。RAM在计算机和数字系统中用来暂时存储程序、数据和中间结果。

文件系统就是操作系统中实现文件统一管理的一组软件、被管理的文件以及为实施文件管理所需要的一些数据结构的总称。

**SPOOLing系统**实现设备管理的**虚拟技术**，即：将独占设备改造为**共享**设备。它由专门负责I/O的常驻内存的进程以及输入井、输出井组成。

### 计算机总线
1. **控制总线**传送的是各种控制信号，有CPU至存储器、I/O接口设备的控制信号，有I/O接口送向CPU的应答信号、请求信号，因此，控制总线上的信息是**双向传输**的。
2. **数据总线**是CPU与存储器、CPU与I/O接口设备之间传送数据信息（各种指令数据信息）的总线，这些信号通过数据总线往返于CPU与存储器、CPU与I/O接口设备之间，因此，数据总线上的信息是**双向传输**的。
3. **地址总线**上传送的是CPU向存储器、I/O接口设备发出的地址信息，寻址能力是CPU特有的功能，地址总线上传送的地址信息仅由CPU发出，因此，地址总线上的信息是**单向传输**的。

### 进程的5种活动状态
1. 运行状态
> 处于运行状态的进程实际上正占据着CPU。显然，处于这种状态的进程数目不能多于CPU的数目。在单CPU的情况下，处于运行状态的进程只能有一个。
2. 就绪状态
> 这种状态下的进程已获得除CPU以外的一切所需资源，只是因为缺少CPU而不能运行，一旦获得CPU，它就立即投入运行。
3. 等待状态
> 一个进程正在等待某一事件的发生而暂时停止执行。在这种状态下，即使把CPU分配给它，该进程也不能运行，即处于等待状态，又称为阻塞状态或封锁状态。
4. 创建状态
> 进程正在创建过程中，尚不能执行。
5. 终止状态
> 进程运行结束。

### 进程3种状态转换条件
1. 于就绪状态的进程，一旦分配到CPU，就转为运行状态。
2. 处于运行状态的进程，当需要等待某个事件发生才能继续运行时，则转为等待状态（阻塞状态）；或者由于分配给它的时间片用完，就让出CPU而转为就绪状态。
3. 处于等待状态的进程，如果它等待的事件已经发生，即条件得到满足，就转为就绪状态。
