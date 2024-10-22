---
title: ENSP-command-practice
icon: page
order: 1
author: Jelly
date: 2022-11-20
category:
  - Network
tag:
  - ENSP
sticky: false
star: false
---
# ENSP实训项目命令

# 1. 设备相关配置

目标拓扑图

<!-- ![1712830290001](image/command/1712830290001.png) -->

## 1.1 PC 电脑

| 电脑名称 | 所属部门 | IP 配置           | vlan | 网关         |
| -------- | -------- | ----------------- | ---- | ------------ |
| PC1      | 客户部   | 192.168.10.100/24 | 10   | 192.168.10.1 |
| PC2      | 市场部   | 192.168.20.201/24 | 20   | 192.168.20.1 |
| PC3      | 客户部   | 192.168.10.101/24 | 10   | 192.168.10.1 |
| PC4      | 财务部   | 192.168.30.150/24 | 30   | 192.168.30.1 |
| PC5      | 财务部   | 192.168.30.151/24 | 30   | 192.168.30.1 |
| PC6      | 市场部   | 192.168.20.200/24 | 20   | 192.168.20.1 |

## 1.2 交换机

| 型号             | 接口                        | IP 配置                                    |
| ---------------- | --------------------------- | ------------------------------------------ |
| AR2220(AR1)      | (in)g3/0/0<br />(out)g4/0/0 | 192.168.40.2/24(in)<br />10.10.10.1/8(out) |
| AR1220(AR3 外网) | (in)g0/0/1<br />(out)g0/0/0 | 64.1.1.10/24(in)<br />6.1.1.1/24(out)      |

## 1.3 防火墙

| 型号     | 接口                           | IP                                                | 区域                              |
| -------- | ------------------------------ | ------------------------------------------------- | --------------------------------- |
| USG6000V | G1/0/1<br />G1/0/2<br />G1/0/3 | 10.10.10.2/8<br />172.16.10.1/24<br />64.1.1.1/24 | (trust)<br />(dmz)<br />(untrust) |

## 1.4 服务器

| PC 型号   | IP             | 网关        | 区域     |
| --------- | -------------- | ----------- | -------- |
| Server(1) | 172.16.10.2/24 | 172.16.10.1 | 非军事区 |
| Server(2) | 6.1.1.6/24     | 6.1.1.1     | 外网     |

**对路由器 AR2220 右键点击“设置”进行端口配置，添加两个 1GEC。**(需要在路由器关机状态下进行)

<!-- ![1712828196706](image/command/1712828196706.png) -->

# 2. 交换机LSW1配置

进入系统视图, 关闭信息中心提醒, 交换机改名为 Lsw01, 批量创建 vlan

```bash
sys
un in en
sysname Lsw01
vlan batch 10 20 30 40
```

配置地址池 3000、3001、3002、3003、3004，阻止特定源 IP 地址的网络向特定目的 IP 地址的网络发送 ICMP 数据包。即拒绝从 192.168.30.0/24 网络到 64.0.0.0/8 网络的所有 ping 请求和 ping 应答。

```bash
acl number 3000
rule 5 deny icmp source 192.168.30.0 0.0.0.255 destination 64.0.0.0 0.255.255.255
acl number 3001
rule 10 deny ip source 192.168.30.0 0.0.0.255
rule 15 deny ip source 192.168.20.0 0.0.0.255
acl number 3002
rule 10 deny ip source 192.168.30.0 0.0.0.255
rule 15 deny ip source 192.168.10.0 0.0.0.255
acl number 3003
rule 10 deny ip source 192.168.10.0 0.0.0.255 destination 64.0.0.0 0.255.255.255
acl number 3004
rule 5 deny ip source 192.168.30.0 0.0.0.255 destination 6.1.1.0 0.255.255.255
```

为交换机上的 VLAN10、VLAN20、VLAN30、VLAN40 接口配置一个具有 IP 地址的路由接口，使其能够进行本地网络内部的通信以及与其他网络之间的通信。

```bash
interface vlanif 10
ip address 192.168.10.1 255.255.255.0
interface vlanif 20
ip address 192.168.20.1 255.255.255.0
interface vlanif 30
ip address 192.168.30.1 255.255.255.0
interface vlanif 40
ip address 192.168.40.1 255.255.255.0
```

将交换机上的端口分配到创建的 VLAN 中并设置接口为 access，实现不同 VLAN 之间的隔离和管理，同时，应用名为 ACL 300x 的流量过滤器，以控制流量的出向行为。

```bash
interface Ethernet0/0/1
port link-type access
port default vlan 10
traffic-filter outbound acl 3001
interface Ethernet0/0/2
port link-type access
port default vlan 20
traffic-filter outbound acl 3002
interface Ethernet0/0/3
port link-type access
port default vlan 10
traffic-filter outbound acl 3001
interface Ethernet0/0/4
port link-type access
port default vlan 30
traffic-filter outbound acl 3000
traffic-filter outbound acl 3003
interface Ethernet0/0/5
port link-type access
port default vlan 30
traffic-filter outbound acl 3000
traffic-filter outbound acl 3003
interface Ethernet0/0/6
port link-type access
port default vlan 20
traffic-filter outbound acl 3002
interface GigabitEthernet0/0/1
port link-type access
port default vlan 40
traffic-filter outbound acl 3004
q
ip route-static 0.0.0.0 0.0.0.0 192.168.40.2
ip route-static 10.0.0.0 255.0.0.0 192.168.40.2
q
save
```

# 3. 路由器AR1配置

```bash
sys
un in en
sysname AR_01
vlan batch 40
```

给路由器接口配置相应的 IP 地址，使其能够参与到相应子网内的网络通信中。

```bash
interface GigabitEthernet3/0/0
ip address 192.168.40.2 255.255.255.0
interface GigabitEthernet4/0/0
ip address 10.10.10.1 255.0.0.0
q
```

在路由器 AR_01 上启用了 RIP 协议，并配置 RIP 进程编号为 1 的相关参数。

```bash
rip 1
version 2
network 192.168.40.0
network 10.0.0.0
q
```

指定路由器处理不同目的地地址的数据包转发。在路由器 AR_01 上配置两条静态路由，一条是默认路由，另一条是针对特定目的地网络 192.168.0.0/16 的路由。

```
ip route-static 0.0.0.0 0.0.0.0 10.10.10.2
ip route-static 192.168.0.0 255.255.0.0 192.168.40.1
q
save
```

# 4. 防火墙USG6000V配置

防火墙原始命令和密码

> Username:admin

> Password:Admin@123

进入防火墙并关闭日志提示

```
sys
un in en
```

设置防火墙的动作和策略，以及对IPS和URI解码的相关配置，并在最后进入并退出了默认的VPN实例配置模式。

```
ip vpn-instance default
ipv4-family
q
q
```

在相应接口的配置模式下，取消相应接口的关闭状态，使其可以传输数据包。

```
interface GigabitEthernet1/0/1
undo shutdown
ip address 10.10.10.2 255.0.0.0
service-manage ping permit
interface GigabitEthernet1/0/2
undo shutdown
ip address 172.16.10.1 255.255.255.0
interface GigabitEthernet1/0/3
undo shutdown
ip address 64.1.1.1 255.255.255.0
```

为不同的接口分配不同的安全区域，并设置这些安全区域的优先级，该命令操作有利于在防火墙中进行策略制定和流量控制。

```
interface Virtual-if0
interface NULL0
firewall zone local
set priority 100
firewall zone trust
set priority 85
add interface GigabitEthernet0/0/0
add interface GigabitEthernet1/0/1
firewall zone untrust
set priority 5
add interface GigabitEthernet1/0/3
firewall zone dmz
set priority 50
add interface GigabitEthernet1/0/2
q

```

配置两条静态路由，一条默认路由和一条针对特定目的地网络的路由，并设置两条安全策略规则，允许特定区域的流量通过到达目标区域。

指定"trust" 安全区域作为源区域

指定"untrust" 安全区域作为目的区域

允许来自"trust" 区域的流量到达 "untrust" 区域

配置名为 "fwq"的安全策略规则

指定"trust" 安全区域作为源区域

指定"dmz" 安全区域作为目的区域

允许来自"trust" 区域的流量到达 "dmz" 区域

```
ip route-static 0.0.0.0 0.0.0.0 64.1.1.10
ip route-static 192.168.0.0 255.255.0.0 10.10.10.1
security-policy
rule name shangwang

source-zone trust
destination-zone untrust
action permit
rule name fwq
source-zone trust
destination-zone dmz
action permit
q
```

配置NAT策略规则，指定来自 "trust" 区域到 "untrust" 区域的流量进行源地址转换，即使用简单IP地址转换的方式。

```
nat-policy
rule name shangwang
source-zone trust
destination-zone untrust
action source-nat easy-ip
q
q
```

# 5. 路由器AR3配置

```
sys
un in en
```

为接口配置相应的IP地址

```
interface GigabitEthernet0/0/0
ip address 6.1.1.1 255.255.255.0 
interface GigabitEthernet0/0/1
ip address 64.1.1.10 255.255.255.0 
```

配置默认路由，并指定一个出口接口作为默认路由。

```
ip route-static 0.0.0.0 0.0.0.0 6.1.1.6
ip route-static 0.0.0.0 0.0.0.0 Ethernet0/0/0
q
save
```
