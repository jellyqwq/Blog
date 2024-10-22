import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as t,c as d,f as e,b as n,d as s,a}from"./app-XoEOURcT.js";const l={},r=n("h1",{id:"ensp实训项目命令",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#ensp实训项目命令","aria-hidden":"true"},"#"),s(" ENSP实训项目命令")],-1),c=n("h1",{id:"_1-设备相关配置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-设备相关配置","aria-hidden":"true"},"#"),s(" 1. 设备相关配置")],-1),u=n("p",null,"目标拓扑图",-1),v=a('<h2 id="_1-1-pc-电脑" tabindex="-1"><a class="header-anchor" href="#_1-1-pc-电脑" aria-hidden="true">#</a> 1.1 PC 电脑</h2><table><thead><tr><th>电脑名称</th><th>所属部门</th><th>IP 配置</th><th>vlan</th><th>网关</th></tr></thead><tbody><tr><td>PC1</td><td>客户部</td><td>192.168.10.100/24</td><td>10</td><td>192.168.10.1</td></tr><tr><td>PC2</td><td>市场部</td><td>192.168.20.201/24</td><td>20</td><td>192.168.20.1</td></tr><tr><td>PC3</td><td>客户部</td><td>192.168.10.101/24</td><td>10</td><td>192.168.10.1</td></tr><tr><td>PC4</td><td>财务部</td><td>192.168.30.150/24</td><td>30</td><td>192.168.30.1</td></tr><tr><td>PC5</td><td>财务部</td><td>192.168.30.151/24</td><td>30</td><td>192.168.30.1</td></tr><tr><td>PC6</td><td>市场部</td><td>192.168.20.200/24</td><td>20</td><td>192.168.20.1</td></tr></tbody></table><h2 id="_1-2-交换机" tabindex="-1"><a class="header-anchor" href="#_1-2-交换机" aria-hidden="true">#</a> 1.2 交换机</h2><table><thead><tr><th>型号</th><th>接口</th><th>IP 配置</th></tr></thead><tbody><tr><td>AR2220(AR1)</td><td>(in)g3/0/0<br>(out)g4/0/0</td><td>192.168.40.2/24(in)<br>10.10.10.1/8(out)</td></tr><tr><td>AR1220(AR3 外网)</td><td>(in)g0/0/1<br>(out)g0/0/0</td><td>64.1.1.10/24(in)<br>6.1.1.1/24(out)</td></tr></tbody></table><h2 id="_1-3-防火墙" tabindex="-1"><a class="header-anchor" href="#_1-3-防火墙" aria-hidden="true">#</a> 1.3 防火墙</h2><table><thead><tr><th>型号</th><th>接口</th><th>IP</th><th>区域</th></tr></thead><tbody><tr><td>USG6000V</td><td>G1/0/1<br>G1/0/2<br>G1/0/3</td><td>10.10.10.2/8<br>172.16.10.1/24<br>64.1.1.1/24</td><td>(trust)<br>(dmz)<br>(untrust)</td></tr></tbody></table><h2 id="_1-4-服务器" tabindex="-1"><a class="header-anchor" href="#_1-4-服务器" aria-hidden="true">#</a> 1.4 服务器</h2><table><thead><tr><th>PC 型号</th><th>IP</th><th>网关</th><th>区域</th></tr></thead><tbody><tr><td>Server(1)</td><td>172.16.10.2/24</td><td>172.16.10.1</td><td>非军事区</td></tr><tr><td>Server(2)</td><td>6.1.1.6/24</td><td>6.1.1.1</td><td>外网</td></tr></tbody></table><p><strong>对路由器 AR2220 右键点击“设置”进行端口配置，添加两个 1GEC。</strong>(需要在路由器关机状态下进行)</p>',9),p=a(`<h1 id="_2-交换机lsw1配置" tabindex="-1"><a class="header-anchor" href="#_2-交换机lsw1配置" aria-hidden="true">#</a> 2. 交换机LSW1配置</h1><p>进入系统视图, 关闭信息中心提醒, 交换机改名为 Lsw01, 批量创建 vlan</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sys
un <span class="token keyword">in</span> en
sysname Lsw01
vlan batch <span class="token number">10</span> <span class="token number">20</span> <span class="token number">30</span> <span class="token number">40</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置地址池 3000、3001、3002、3003、3004，阻止特定源 IP 地址的网络向特定目的 IP 地址的网络发送 ICMP 数据包。即拒绝从 192.168.30.0/24 网络到 64.0.0.0/8 网络的所有 ping 请求和 ping 应答。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>acl number <span class="token number">3000</span>
rule <span class="token number">5</span> deny icmp <span class="token builtin class-name">source</span> <span class="token number">192.168</span>.30.0 <span class="token number">0.0</span>.0.255 destination <span class="token number">64.0</span>.0.0 <span class="token number">0.255</span>.255.255
acl number <span class="token number">3001</span>
rule <span class="token number">10</span> deny <span class="token function">ip</span> <span class="token builtin class-name">source</span> <span class="token number">192.168</span>.30.0 <span class="token number">0.0</span>.0.255
rule <span class="token number">15</span> deny <span class="token function">ip</span> <span class="token builtin class-name">source</span> <span class="token number">192.168</span>.20.0 <span class="token number">0.0</span>.0.255
acl number <span class="token number">3002</span>
rule <span class="token number">10</span> deny <span class="token function">ip</span> <span class="token builtin class-name">source</span> <span class="token number">192.168</span>.30.0 <span class="token number">0.0</span>.0.255
rule <span class="token number">15</span> deny <span class="token function">ip</span> <span class="token builtin class-name">source</span> <span class="token number">192.168</span>.10.0 <span class="token number">0.0</span>.0.255
acl number <span class="token number">3003</span>
rule <span class="token number">10</span> deny <span class="token function">ip</span> <span class="token builtin class-name">source</span> <span class="token number">192.168</span>.10.0 <span class="token number">0.0</span>.0.255 destination <span class="token number">64.0</span>.0.0 <span class="token number">0.255</span>.255.255
acl number <span class="token number">3004</span>
rule <span class="token number">5</span> deny <span class="token function">ip</span> <span class="token builtin class-name">source</span> <span class="token number">192.168</span>.30.0 <span class="token number">0.0</span>.0.255 destination <span class="token number">6.1</span>.1.0 <span class="token number">0.255</span>.255.255
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为交换机上的 VLAN10、VLAN20、VLAN30、VLAN40 接口配置一个具有 IP 地址的路由接口，使其能够进行本地网络内部的通信以及与其他网络之间的通信。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>interface vlanif <span class="token number">10</span>
<span class="token function">ip</span> address <span class="token number">192.168</span>.10.1 <span class="token number">255.255</span>.255.0
interface vlanif <span class="token number">20</span>
<span class="token function">ip</span> address <span class="token number">192.168</span>.20.1 <span class="token number">255.255</span>.255.0
interface vlanif <span class="token number">30</span>
<span class="token function">ip</span> address <span class="token number">192.168</span>.30.1 <span class="token number">255.255</span>.255.0
interface vlanif <span class="token number">40</span>
<span class="token function">ip</span> address <span class="token number">192.168</span>.40.1 <span class="token number">255.255</span>.255.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将交换机上的端口分配到创建的 VLAN 中并设置接口为 access，实现不同 VLAN 之间的隔离和管理，同时，应用名为 ACL 300x 的流量过滤器，以控制流量的出向行为。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>interface Ethernet0/0/1
port link-type access
port default vlan <span class="token number">10</span>
traffic-filter outbound acl <span class="token number">3001</span>
interface Ethernet0/0/2
port link-type access
port default vlan <span class="token number">20</span>
traffic-filter outbound acl <span class="token number">3002</span>
interface Ethernet0/0/3
port link-type access
port default vlan <span class="token number">10</span>
traffic-filter outbound acl <span class="token number">3001</span>
interface Ethernet0/0/4
port link-type access
port default vlan <span class="token number">30</span>
traffic-filter outbound acl <span class="token number">3000</span>
traffic-filter outbound acl <span class="token number">3003</span>
interface Ethernet0/0/5
port link-type access
port default vlan <span class="token number">30</span>
traffic-filter outbound acl <span class="token number">3000</span>
traffic-filter outbound acl <span class="token number">3003</span>
interface Ethernet0/0/6
port link-type access
port default vlan <span class="token number">20</span>
traffic-filter outbound acl <span class="token number">3002</span>
interface GigabitEthernet0/0/1
port link-type access
port default vlan <span class="token number">40</span>
traffic-filter outbound acl <span class="token number">3004</span>
q
<span class="token function">ip</span> route-static <span class="token number">0.0</span>.0.0 <span class="token number">0.0</span>.0.0 <span class="token number">192.168</span>.40.2
<span class="token function">ip</span> route-static <span class="token number">10.0</span>.0.0 <span class="token number">255.0</span>.0.0 <span class="token number">192.168</span>.40.2
q
save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3-路由器ar1配置" tabindex="-1"><a class="header-anchor" href="#_3-路由器ar1配置" aria-hidden="true">#</a> 3. 路由器AR1配置</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sys
un <span class="token keyword">in</span> en
sysname AR_01
vlan batch <span class="token number">40</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给路由器接口配置相应的 IP 地址，使其能够参与到相应子网内的网络通信中。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>interface GigabitEthernet3/0/0
<span class="token function">ip</span> address <span class="token number">192.168</span>.40.2 <span class="token number">255.255</span>.255.0
interface GigabitEthernet4/0/0
<span class="token function">ip</span> address <span class="token number">10.10</span>.10.1 <span class="token number">255.0</span>.0.0
q
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在路由器 AR_01 上启用了 RIP 协议，并配置 RIP 进程编号为 1 的相关参数。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rip <span class="token number">1</span>
version <span class="token number">2</span>
network <span class="token number">192.168</span>.40.0
network <span class="token number">10.0</span>.0.0
q
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>指定路由器处理不同目的地地址的数据包转发。在路由器 AR_01 上配置两条静态路由，一条是默认路由，另一条是针对特定目的地网络 192.168.0.0/16 的路由。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ip route-static 0.0.0.0 0.0.0.0 10.10.10.2
ip route-static 192.168.0.0 255.255.0.0 192.168.40.1
q
save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_4-防火墙usg6000v配置" tabindex="-1"><a class="header-anchor" href="#_4-防火墙usg6000v配置" aria-hidden="true">#</a> 4. 防火墙USG6000V配置</h1><p>防火墙原始命令和密码</p><blockquote><p>Username:admin</p></blockquote><blockquote><p>Password:Admin@123</p></blockquote><p>进入防火墙并关闭日志提示</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sys
un in en
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>设置防火墙的动作和策略，以及对IPS和URI解码的相关配置，并在最后进入并退出了默认的VPN实例配置模式。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ip vpn-instance default
ipv4-family
q
q
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在相应接口的配置模式下，取消相应接口的关闭状态，使其可以传输数据包。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>interface GigabitEthernet1/0/1
undo shutdown
ip address 10.10.10.2 255.0.0.0
service-manage ping permit
interface GigabitEthernet1/0/2
undo shutdown
ip address 172.16.10.1 255.255.255.0
interface GigabitEthernet1/0/3
undo shutdown
ip address 64.1.1.1 255.255.255.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为不同的接口分配不同的安全区域，并设置这些安全区域的优先级，该命令操作有利于在防火墙中进行策略制定和流量控制。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>interface Virtual-if0
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置两条静态路由，一条默认路由和一条针对特定目的地网络的路由，并设置两条安全策略规则，允许特定区域的流量通过到达目标区域。</p><p>指定&quot;trust&quot; 安全区域作为源区域</p><p>指定&quot;untrust&quot; 安全区域作为目的区域</p><p>允许来自&quot;trust&quot; 区域的流量到达 &quot;untrust&quot; 区域</p><p>配置名为 &quot;fwq&quot;的安全策略规则</p><p>指定&quot;trust&quot; 安全区域作为源区域</p><p>指定&quot;dmz&quot; 安全区域作为目的区域</p><p>允许来自&quot;trust&quot; 区域的流量到达 &quot;dmz&quot; 区域</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ip route-static 0.0.0.0 0.0.0.0 64.1.1.10
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置NAT策略规则，指定来自 &quot;trust&quot; 区域到 &quot;untrust&quot; 区域的流量进行源地址转换，即使用简单IP地址转换的方式。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>nat-policy
rule name shangwang
source-zone trust
destination-zone untrust
action source-nat easy-ip
q
q
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_5-路由器ar3配置" tabindex="-1"><a class="header-anchor" href="#_5-路由器ar3配置" aria-hidden="true">#</a> 5. 路由器AR3配置</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sys
un in en
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>为接口配置相应的IP地址</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>interface GigabitEthernet0/0/0
ip address 6.1.1.1 255.255.255.0 
interface GigabitEthernet0/0/1
ip address 64.1.1.10 255.255.255.0 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置默认路由，并指定一个出口接口作为默认路由。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ip route-static 0.0.0.0 0.0.0.0 6.1.1.6
ip route-static 0.0.0.0 0.0.0.0 Ethernet0/0/0
q
save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,46);function o(b,m){return t(),d("div",null,[r,c,u,e(" ![1712830290001](image/command/1712830290001.png) "),v,e(" ![1712828196706](image/command/1712828196706.png) "),p])}const f=i(l,[["render",o],["__file","ENSP-topo-practice.html.vue"]]);export{f as default};
