import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as c,o as t,c as p,a as n,b as a,d as e,e as i}from"./app-zUu1JOnm.js";const d={},r={id:"使用-acme-sh-docker-自动申请和部署-let-s-encrypt-https-证书",tabindex:"-1"},o=n("a",{class:"header-anchor",href:"#使用-acme-sh-docker-自动申请和部署-let-s-encrypt-https-证书","aria-hidden":"true"},"#",-1),u={href:"http://acme.sh",target:"_blank",rel:"noopener noreferrer"},v=i(`<h1 id="_1-环境说明" tabindex="-1"><a class="header-anchor" href="#_1-环境说明" aria-hidden="true">#</a> 1. 环境说明</h1><p>使用 <code>acme.sh</code> + Docker + DNS API 自动申请 Let&#39;s Encrypt SSL 证书。</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>流程：

域名
↓
DNS 服务商 API 验证
↓
acme.sh 签发证书
↓
部署证书到 Nginx
↓
Nginx reload 生效
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="_2-dns-api-配置" tabindex="-1"><a class="header-anchor" href="#_2-dns-api-配置" aria-hidden="true">#</a> 2. DNS API 配置</h1><p>根据 DNS 服务商设置 API Key。</p><p>例如：</p><h2 id="dnspod" tabindex="-1"><a class="header-anchor" href="#dnspod" aria-hidden="true">#</a> DNSPod</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">DP_Id</span><span class="token operator">=</span><span class="token string">&quot;xxxx&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">DP_Key</span><span class="token operator">=</span><span class="token string">&quot;xxxxxxxxxxxxxxxxxx&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="阿里云-dns" tabindex="-1"><a class="header-anchor" href="#阿里云-dns" aria-hidden="true">#</a> 阿里云 DNS</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">Ali_Key</span><span class="token operator">=</span><span class="token string">&quot;xxxx&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">Ali_Secret</span><span class="token operator">=</span><span class="token string">&quot;xxxxxxxxxxxxxxxxxx&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：</p><ul><li>API Key 需要具备 DNS 修改权限</li><li>用于 DNS-01 验证</li><li>可以签发泛域名证书，例如 <code>*.example.com</code></li></ul></blockquote><hr><h1 id="_3-设置默认-ca" tabindex="-1"><a class="header-anchor" href="#_3-设置默认-ca" aria-hidden="true">#</a> 3. 设置默认 CA</h1>`,14),m={href:"http://acme.sh",target:"_blank",rel:"noopener noreferrer"},b=i(`<p>执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> acme.sh acme.sh <span class="token punctuation">\\</span>
--set-default-ca <span class="token punctuation">\\</span>
<span class="token parameter variable">--server</span> letsencrypt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>检查：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> acme.sh acme.sh <span class="token parameter variable">--info</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><h1 id="_4-签发证书" tabindex="-1"><a class="header-anchor" href="#_4-签发证书" aria-hidden="true">#</a> 4. 签发证书</h1><h2 id="_4-1-dnspod-示例" tabindex="-1"><a class="header-anchor" href="#_4-1-dnspod-示例" aria-hidden="true">#</a> 4.1 DNSPod 示例</h2><p>域名：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>子域名：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>www.example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> acme.sh <span class="token punctuation">\\</span>
acme.sh <span class="token parameter variable">--issue</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> www.example.com <span class="token punctuation">\\</span>
<span class="token parameter variable">--dns</span> dns_dp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_4-2-多域名证书" tabindex="-1"><a class="header-anchor" href="#_4-2-多域名证书" aria-hidden="true">#</a> 4.2 多域名证书</h2><p>例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> acme.sh <span class="token punctuation">\\</span>
acme.sh <span class="token parameter variable">--issue</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> www.example.com <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> *.www.example.com <span class="token punctuation">\\</span>
<span class="token parameter variable">--dns</span> dns_dp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>支持：</p><ul><li>单域名</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>api.example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>泛域名</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>*.example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><h2 id="_4-3-阿里云-dns-示例" tabindex="-1"><a class="header-anchor" href="#_4-3-阿里云-dns-示例" aria-hidden="true">#</a> 4.3 阿里云 DNS 示例</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> acme.sh <span class="token punctuation">\\</span>
acme.sh <span class="token parameter variable">--issue</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--dns</span> dns_ali <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> www.example.com <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> .example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="_5-部署证书到-docker-nginx" tabindex="-1"><a class="header-anchor" href="#_5-部署证书到-docker-nginx" aria-hidden="true">#</a> 5. 部署证书到 Docker Nginx</h1><h2 id="证书目录规划" tabindex="-1"><a class="header-anchor" href="#证书目录规划" aria-hidden="true">#</a> 证书目录规划</h2><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/etc/nginx/conf.d/ssl/

├── www.example.com
│   ├── key.pem
│   ├── cert.pem
│   ├── ca.pem
│   └── full.pem
│
├── api.example.com
│
└── drive.example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="_6-deploy-hook-自动更新-nginx" tabindex="-1"><a class="header-anchor" href="#_6-deploy-hook-自动更新-nginx" aria-hidden="true">#</a> 6. Deploy Hook 自动更新 Nginx</h1><p>模板：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">DEPLOY_DOCKER_CONTAINER_LABEL</span><span class="token operator">=</span>sh.acme.autoload.service<span class="token operator">=</span>nginx <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">DEPLOY_DOCKER_CONTAINER_KEY_FILE</span><span class="token operator">=</span><span class="token string">&quot;/etc/nginx/conf.d/ssl/www.example.com/key.pem&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">DEPLOY_DOCKER_CONTAINER_CERT_FILE</span><span class="token operator">=</span><span class="token string">&quot;/etc/nginx/conf.d/ssl/www.example.com/cert.pem&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">DEPLOY_DOCKER_CONTAINER_CA_FILE</span><span class="token operator">=</span><span class="token string">&quot;/etc/nginx/conf.d/ssl/www.example.com/ca.pem&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">DEPLOY_DOCKER_CONTAINER_FULLCHAIN_FILE</span><span class="token operator">=</span><span class="token string">&quot;/etc/nginx/conf.d/ssl/www.example.com/full.pem&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">DEPLOY_DOCKER_CONTAINER_RELOAD_CMD</span><span class="token operator">=</span><span class="token string">&quot;service nginx force-reload&quot;</span> <span class="token punctuation">\\</span>
acme.sh <span class="token punctuation">\\</span>
<span class="token parameter variable">--deploy</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> www.example.com <span class="token punctuation">\\</span>
<span class="token parameter variable">--ecc</span> <span class="token punctuation">\\</span>
--deploy-hook <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="_7-查看证书" tabindex="-1"><a class="header-anchor" href="#_7-查看证书" aria-hidden="true">#</a> 7. 查看证书</h1><p>查看所有证书：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> acme.sh acme.sh <span class="token parameter variable">--list</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看指定域名：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> acme.sh <span class="token punctuation">\\</span>
acme.sh <span class="token parameter variable">--info</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> www.example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="_8-手动续期" tabindex="-1"><a class="header-anchor" href="#_8-手动续期" aria-hidden="true">#</a> 8. 手动续期</h1>`,42),k={href:"http://acme.sh",target:"_blank",rel:"noopener noreferrer"},h=i(`<p>测试：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> acme.sh <span class="token punctuation">\\</span>
acme.sh <span class="token parameter variable">--renew</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> www.example.com <span class="token punctuation">\\</span>
<span class="token parameter variable">--force</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="_9-常用排错命令" tabindex="-1"><a class="header-anchor" href="#_9-常用排错命令" aria-hidden="true">#</a> 9. 常用排错命令</h1>`,4),x={href:"http://acme.sh",target:"_blank",rel:"noopener noreferrer"},g=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> logs acme.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入容器：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> acme.sh <span class="token function">sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看 Nginx：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> logs nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>测试 Nginx 配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-t</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重载：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="_10-docker-compose-yml-参考" tabindex="-1"><a class="header-anchor" href="#_10-docker-compose-yml-参考" aria-hidden="true">#</a> 10. docker-compose.yml 参考</h1><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">nginx</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">networks</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> misaka
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> wordpress<span class="token punctuation">:</span>wordpress
      <span class="token punctuation">-</span> ariang<span class="token punctuation">:</span>ariang
      <span class="token punctuation">-</span> aria2<span class="token punctuation">:</span>aira2
      <span class="token punctuation">-</span> alist<span class="token punctuation">:</span>alist
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token datetime number">80:80</span>
      <span class="token punctuation">-</span> 443<span class="token punctuation">:</span><span class="token number">443</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ~/docker/data/var/www<span class="token punctuation">:</span>/var/www
      <span class="token punctuation">-</span> ~/docker/nginx/conf.d<span class="token punctuation">:</span>/etc/nginx/conf.d
      <span class="token punctuation">-</span> ~/docker/nginx/conf.d/ssl<span class="token punctuation">:</span>/etc/nginx/conf.d/ssl
    <span class="token comment"># 这里就是给上面 deploy hook 用的</span>
    <span class="token key atrule">labels</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> sh.acme.autoload.service=nginx

  <span class="token key atrule">acme.sh</span><span class="token punctuation">:</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> neilpang/acme.sh
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> acme.sh
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token comment"># 防止它跑完入口命令就关闭导致持续重启</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> misaka
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> Email=xxxxxxxxx@qq.com
      <span class="token punctuation">-</span> DP_Id=xxxxxx
      <span class="token punctuation">-</span> DP_Key=xxxxxxxxxxxxxxxxxxxxxxxx
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ~/docker/acme<span class="token punctuation">:</span>/acme.sh
      <span class="token punctuation">-</span> /var/run/docker.sock<span class="token punctuation">:</span>/var/run/docker.sock
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">&gt;</span><span class="token scalar string">
      sh -c &quot;/entry.sh daemon &amp;&amp;
              /acme.sh --set-default-ca --server letsencrypt --register-account $(Email)&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function _(f,w){const s=c("ExternalLinkIcon");return t(),p("div",null,[n("h1",r,[o,a(" 使用 "),n("a",u,[a("acme.sh"),e(s)]),a(" + Docker 自动申请和部署 Let's Encrypt HTTPS 证书")]),v,n("p",null,[n("a",m,[a("acme.sh"),e(s)]),a(" 默认 CA 可以切换为 Let's Encrypt。")]),b,n("p",null,[n("a",k,[a("acme.sh"),e(s)]),a(" 默认会自动续期。")]),h,n("p",null,[a("查看 "),n("a",x,[a("acme.sh"),e(s)]),a(" 日志：")]),g])}const D=l(d,[["render",_],["__file","acme-sh-docker-https-certificate.html.vue"]]);export{D as default};
