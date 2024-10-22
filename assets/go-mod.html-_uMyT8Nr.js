import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as i,c,b as s,d as n,e as t,a as e}from"./app-XoEOURcT.js";const l={},r=s("h3",{id:"_2022-8-23",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_2022-8-23","aria-hidden":"true"},"#"),n(" 2022/8/23")],-1),u=s("p",null,"去官网下载安装go, 然后在vscode中安装Go插件, 根据提示把其他包给下好",-1),d={href:"https://github.com/go-telegram-bot-api/telegram-bot-api",target:"_blank",rel:"noopener noreferrer"},k={href:"https://go-telegram-bot-api.dev",target:"_blank",rel:"noopener noreferrer"},g=e(`<h4 id="知识点" tabindex="-1"><a class="header-anchor" href="#知识点" aria-hidden="true">#</a> 知识点</h4><p>Go安装后env默认</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GO111MODULE=off
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要将其打开, 通过命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go env -w GO111MODULE=&quot;auto/on&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>永久设置, auto和on选一个即可, 临时设置可以使用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>set GO111MODULE=auto/on
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Go一个目录作为一个module, 在当前目录中使用命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go mod init moduleName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,9),m={href:"http://xn--example-hc5kp88abx7f.com/xxx/abcd",target:"_blank",rel:"noopener noreferrer"},v=e(`<p>为了能在本地使用这个module, 需要使用命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go mod edit -replace example.com/xxx/abcd=../abcd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go mod tidy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>来将所有依赖的包进行下载导入</p><hr><h3 id="telegram-webhook" tabindex="-1"><a class="header-anchor" href="#telegram-webhook" aria-hidden="true">#</a> telegram webhook</h3>`,7),b={href:"https://www.openssl.org/",target:"_blank",rel:"noopener noreferrer"},h=e(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> requests<span class="token punctuation">,</span> json

ip <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
port <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
bot_token <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>

f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;certificate.pem&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">)</span>
data <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;url&#39;</span><span class="token punctuation">:</span> <span class="token string-interpolation"><span class="token string">f&#39;https://</span><span class="token interpolation"><span class="token punctuation">{</span>ip<span class="token punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token punctuation">{</span>port<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>bot_token<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">,</span>
    <span class="token string">&#39;certificate&#39;</span><span class="token punctuation">:</span> f<span class="token punctuation">,</span>
    <span class="token string">&#39;ip_address&#39;</span><span class="token punctuation">:</span>  <span class="token string-interpolation"><span class="token string">f&#39;</span><span class="token interpolation"><span class="token punctuation">{</span>ip<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">,</span>
    <span class="token string">&#39;allowed_updates&#39;</span><span class="token punctuation">:</span> json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;message&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;edited_message&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;channel_post&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;edited_channel_post&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;inline_query&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;chosen_inline_result&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;callback_query&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;shipping_query&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;pre_checkout_query&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;poll&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;poll_answer&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;my_chat_member&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;chat_member&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;chat_join_request&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
response <span class="token operator">=</span> requests<span class="token punctuation">.</span>post<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;https://api.telegram.org/bot</span><span class="token interpolation"><span class="token punctuation">{</span>bot_token<span class="token punctuation">}</span></span><span class="token string">/setWebhook&#39;</span></span><span class="token punctuation">,</span> data<span class="token operator">=</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
f<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

response <span class="token operator">=</span> requests<span class="token punctuation">.</span>post<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;https://api.telegram.org/bot</span><span class="token interpolation"><span class="token punctuation">{</span>bot_token<span class="token punctuation">}</span></span><span class="token string">/getWebhookInfo&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function _(x,f){const a=o("ExternalLinkIcon");return i(),c("div",null,[r,u,s("p",null,[n("bot: "),s("a",d,[n("https://github.com/go-telegram-bot-api/telegram-bot-api"),t(a)])]),s("p",null,[n("bot文档: "),s("a",k,[n("https://go-telegram-bot-api.dev"),t(a)])]),g,s("p",null,[n("moduleName "),s("a",m,[n("可以用example.com/xxx/abcd"),t(a)]),n(", 即使填github的仓库也不会与仓库进行交互的")]),v,s("p",null,[n("这个需要https, 上传的证书用pem后缀的, 也可以使用自签名证书, 参考"),s("a",b,[n("openssl"),t(a)]),n(", 用如下python脚本完成设置")]),h])}const q=p(l,[["render",_],["__file","go-mod.html.vue"]]);export{q as default};