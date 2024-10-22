import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o,c,f as d,b as n,d as s,e as i,a}from"./app-XoEOURcT.js";const r={},p=n("p",null,"因为VMware装在电脑上会影响虚拟网卡的创建, 于是我尝试使用docker来代替VMware来完成课堂任务",-1),u=a(`<p>拉取一个<a href="ttps://hub.docker.com">镜像</a>到本地</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull centos:centos7

<span class="token comment"># docker pull image_name:tag</span>
<span class="token comment"># 或者使用 docker pull image_name 来获取最新版本</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),v={id:"user-defined-bridge-networks",tabindex:"-1"},m=n("a",{class:"header-anchor",href:"#user-defined-bridge-networks","aria-hidden":"true"},"#",-1),k={href:"https://docs.docker.com/network/network-tutorial-standalone/#use-user-defined-bridge-networks",target:"_blank",rel:"noopener noreferrer"},b=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 指定一个网段, 用于设置容器的静态ip</span>
<span class="token function">docker</span> network create <span class="token parameter variable">--subnet</span><span class="token operator">=</span><span class="token number">192.168</span>.60.0/8 <span class="token parameter variable">--gateway</span> <span class="token number">192.168</span>.60.0 misaka

<span class="token comment"># 查看docker网络列表</span>
<span class="token function">docker</span> network <span class="token function">ls</span>

<span class="token comment"># 删除指定的网络</span>
<span class="token function">docker</span> network <span class="token function">rm</span> misaka
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dns" tabindex="-1"><a class="header-anchor" href="#dns" aria-hidden="true">#</a> DNS</h3><p>找到宿主机中 /etc/docker/daemon.json(Linux) 或 C:\\Users\\用户名\\.docker\\daemon.json(Windows) 添加dns配置, 配置完后一定要对docker进行重启, 不然新创建的容器读取不到更新的配置. 我在window下用vscode对daemon.json编辑后发现新创建的容器不受配置文件的影响, 后来我在docker内置的daemon.json配置的页面里有一个apply&amp;restart的按钮, 我才意识到改完配置后要重启docker</p><p><strong>注意</strong>: 这个daemon.json设置的dns不会显示在容器的 /etc/resolv.conf 文件中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>常用的DNS
119.29.29.29 腾讯
223.5.5.5 阿里
114.114.114.114

1.1.1.1 cloudflare
8.8.8.8 谷歌
9.9.9.9 IBM
208.67.222.222 思科

# 配置 - 添加dns
{
    &quot;dns&quot;: [&quot;119.29.29.29&quot;, &quot;223.5.5.5&quot;, &quot;114.114.114.114&quot;, &quot;1.1.1.1&quot;, &quot;8.8.8.8&quot;]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运行容器" tabindex="-1"><a class="header-anchor" href="#运行容器" aria-hidden="true">#</a> 运行容器</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">-v</span> /d/Desktop/docker_src/package:/root/package <span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token parameter variable">--name</span> misaka0 <span class="token parameter variable">--hostname</span> misaka0 <span class="token parameter variable">--net</span> misaka <span class="token parameter variable">--ip</span> <span class="token number">192.168</span>.60.10 --add-host misaka1:192.168.60.11 centos:centos7 /usr/sbin/init

<span class="token comment"># [-it] 以交互模式运行启动容器</span>
<span class="token comment"># [-v 宿主机目录:容器目录] 挂载宿主机目录到容器目录, </span>
<span class="token comment"># [-d] 后台运行容器</span>
<span class="token comment"># [-p 宿主机端口:容器端口]  端口映射</span>
<span class="token comment"># [--privileged=true] 为了使用systemd,需要开启并从/usr/sbin/init启动容器, 让0号进程为init, 通常情况下不使用privileged和/usr/sbin/init, 官方也不推荐使用privileged</span>
<span class="token comment"># [--hostname hostname] 设定hostname;</span>
<span class="token comment"># [--net] 指定网络模式 (默认bridge)</span>
<span class="token comment"># [--ip] 指定IP</span>
<span class="token comment"># [--add-host] 指定往/etc/hosts添加的host</span>
<span class="token comment"># [--dns nameserver] 指定容器dns</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="其他命令" tabindex="-1"><a class="header-anchor" href="#其他命令" aria-hidden="true">#</a> 其他命令</h3><p>宿主机</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入容器</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token punctuation">[</span>container_name <span class="token operator">|</span> container_id<span class="token punctuation">]</span> /bin/bash

<span class="token comment"># 停止容器</span>
<span class="token function">docker</span> container stop container1 container2 <span class="token punctuation">..</span>.

<span class="token comment"># 删除容器</span>
<span class="token function">docker</span> container <span class="token function">rm</span> container1 container2 <span class="token punctuation">..</span>.

<span class="token comment"># 重启容器</span>
<span class="token function">docker</span> container restart container1 container2 <span class="token punctuation">..</span>.

<span class="token comment"># 启动容器</span>
<span class="token function">docker</span> container start container1 container2 <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>容器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看容器dns</span>
<span class="token function">cat</span> etc/resolv.conf

<span class="token comment"># 查看网络上的设备对应的ip</span>
<span class="token function">cat</span> /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="目标" tabindex="-1"><a class="header-anchor" href="#目标" aria-hidden="true">#</a> 目标</h3>`,14),h=n("li",null,"创建misaka网络",-1),g=n("li",null,"将misaka0, misaka1连接misaka网络",-1),f={href:"http://baidu.com",target:"_blank",rel:"noopener noreferrer"},q=n("li",null,"安装java和zookeeper",-1),_=a(`<h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3><table><thead><tr><th>container name</th><th>ip</th><th>hostname</th></tr></thead><tbody><tr><td>misaka0</td><td>192.168.60.10</td><td>misaka0</td></tr><tr><td>misaka1</td><td>192.168.60.11</td><td>misaka1</td></tr><tr><td>misaka2</td><td>192.168.60.12</td><td>misaka2</td></tr></tbody></table><hr><h3 id="require-package" tabindex="-1"><a class="header-anchor" href="#require-package" aria-hidden="true">#</a> require package</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> update
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> net-tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="ssh服务" tabindex="-1"><a class="header-anchor" href="#ssh服务" aria-hidden="true">#</a> ssh服务</h3><p>安装ssh服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> openssh-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改/etc/ssh/sshd_config文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/^#Port 22/Port 22/g&quot;</span> /etc/ssh/sshd_config
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/^#ListenAddress 0.0.0.0/ListenAddress 0.0.0.0/g&quot;</span> /etc/ssh/sshd_config
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/^#ListenAddress ::/ListenAddress ::/g&quot;</span> /etc/ssh/sshd_config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>端口放行和ssh服务的启动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> firewalld
firewall-cmd <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">22</span>/tcp
systemctl restart firewalld

systemctl <span class="token builtin class-name">enable</span> sshd.service
systemctl restart sshd.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成密钥</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">expect</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;
    spawn &quot;</span>ssh-keygen <span class="token parameter variable">-t</span> rsa<span class="token string">&quot;;
    expect {
            <span class="token entity" title="\\&quot;">\\&quot;</span>Are you sure you want to continue connecting (yes/no)?<span class="token entity" title="\\&quot;">\\&quot;</span> {send <span class="token entity" title="\\&quot;">\\&quot;</span>yes<span class="token entity" title="\\r">\\r</span><span class="token entity" title="\\&quot;">\\&quot;</span>; exp_continue}
            }
        &quot;</span>
<span class="token function">expect</span> <span class="token string">&quot;Enter file in which to save the key (/root/.ssh/id_rsa):&quot;</span> <span class="token punctuation">{</span>send <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>&quot;</span><span class="token punctuation">}</span>
<span class="token function">expect</span> <span class="token string">&quot;Enter passphrase (empty for no passphrase):&quot;</span> <span class="token punctuation">{</span>send <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>&quot;</span><span class="token punctuation">}</span>
<span class="token function">expect</span> <span class="token string">&quot;Enter same passphrase again:&quot;</span> <span class="token punctuation">{</span>send <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>&quot;</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传输密钥</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">ip</span> <span class="token keyword">in</span> misaka0 misaka1 misaka2
<span class="token keyword">do</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">\${ip}</span> <span class="token operator">!=</span> <span class="token environment constant">$HOSTNAME</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
        ssh-copy-id <span class="token variable">\${ip}</span>
        <span class="token function">expect</span> <span class="token string">&quot;(yes/no)?&quot;</span>
        send <span class="token string">&quot;yes<span class="token entity" title="\\n">\\n</span>&quot;</span>
        <span class="token function">expect</span> <span class="token string">&quot;password:&quot;</span>
        send <span class="token string">&quot;123456<span class="token entity" title="\\n">\\n</span>&quot;</span>
    <span class="token keyword">fi</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改密码</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;123456&quot;</span> <span class="token operator">|</span> <span class="token function">passwd</span> <span class="token parameter variable">--stdin</span> root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,19);function y(x,w){const e=l("ExternalLinkIcon");return o(),c("div",null,[p,d(" more "),u,n("h3",v,[m,s(),n("a",k,[s("user defined bridge networks"),i(e)])]),b,n("ol",null,[h,g,n("li",null,[s("成功ping "),n("a",f,[s("baidu.com"),i(e)])]),q]),_])}const L=t(r,[["render",y],["__file","docker-install-centos7.html.vue"]]);export{L as default};
