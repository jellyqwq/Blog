import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as s,o as t,c as r,f as l,b as i,d as e,e as n,a as c}from"./app-XoEOURcT.js";const o={},v=i("p",null,"这是一个telegram疫情查询内联键盘的开发笔记",-1),u=i("h3",{id:"前言",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),e(" 前言")],-1),m=i("code",null,"<Script>",-1),h={href:"https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=localCityNCOVDataList,diseaseh5Shelf",target:"_blank",rel:"noopener noreferrer"},b={href:"https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoforeignList",target:"_blank",rel:"noopener noreferrer"},p=c(`<h3 id="api分析" tabindex="-1"><a class="header-anchor" href="#api分析" aria-hidden="true">#</a> API分析</h3><p><code>https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=&lt;localCityNCOVDataList|diseaseh5Shelf|provinceCompare|nowConfirmStatis&gt;</code></p><table><thead><tr><th>modules</th><th>作用</th></tr></thead><tbody><tr><td>localCityNCOVDataList</td><td>本土疫情城市列表及其详情</td></tr><tr><td>diseaseh5Shelf</td><td>更加详细的数据</td></tr><tr><td>provinceCompare</td><td>是</td></tr><tr><td>nowConfirmStatis</td><td>当前确诊状态</td></tr><tr><td>FAutoCountryConfirmAdd</td><td>各国新增</td></tr><tr><td>WomWorld</td><td>世界统计</td></tr><tr><td>WomAboard</td><td>外国数据</td></tr><tr><td>FAutoforeignList</td><td>外国更具体的数据</td></tr></tbody></table><p><code>https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?adCode={地区代码}&amp;limit={要多少条数据,一条代表一天}</code></p><h3 id="功能实现" tabindex="-1"><a class="header-anchor" href="#功能实现" aria-hidden="true">#</a> 功能实现</h3><p>设计了一个<code>coronavirus</code>模块，调用该模块的<code>MainHandle()</code>函数可以返回一个<code>*Core</code>类型的变量，该变量存储了格式化好的<code>ProvinceInlineKeyborad</code>以及<code>AreaInlineKeyboard</code>，后者是根据是province来查询对应的键盘的。</p><h2 id="设计标准" tabindex="-1"><a class="header-anchor" href="#设计标准" aria-hidden="true">#</a> 设计标准</h2><h3 id="callbackquery-回调查询" tabindex="-1"><a class="header-anchor" href="#callbackquery-回调查询" aria-hidden="true">#</a> CallbackQuery(回调查询)</h3><p>这部分分为两种回调，在省份页面为<code>virus-页码-地区</code>，在地区页面回调<code>virus-page-查询地区-父级键盘页码</code></p><p>省份页面的第一页的第一个是全国总览按钮，地区页面的第一页的第一个是返回省份页面的按钮，第一页的第二个是该省份的总览按钮。</p><h3 id="中国总览数据" tabindex="-1"><a class="header-anchor" href="#中国总览数据" aria-hidden="true">#</a> 中国总览数据</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>国内总览
2022-11-15 17:31:01
累计确诊病例：8771347
 └ 现有确诊病例：8377147
 └ 新增确诊：19129
 └ 现有本土确诊：13935
 └ 新增本土确诊：1710
重症病例：35
累计治愈：364831
累计死亡：29370
 └ 新增死亡：50
现有本土无症状：105362
 └ 新增本土无症状：16233

2022-11-15 17:03:31
高风险地区：8721
中风险地区：51
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="地区总览数据" tabindex="-1"><a class="header-anchor" href="#地区总览数据" aria-hidden="true">#</a> 地区总览数据</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>广东总览
2022-11-16 08:53:50
累计确诊病例：18395
 └ 现有确诊病例： 5581
  └ 新增确诊：211
   └ 新增本土确诊：195
   └ 新增境外输入确诊：16
累计治愈：12806
累计死亡：8
 └ 新增死亡：0
现有本土无症状：32921
 └ 新增本土无症状： 6215

高风险地区：205
中风险地区：0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="地区具体数据" tabindex="-1"><a class="header-anchor" href="#地区具体数据" aria-hidden="true">#</a> 地区具体数据</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>广州
2022-11-16 13:09:22
现有确诊病例： 7135
 └ 新增确诊：158
新增本土无症状：3138

高风险地区：98
中风险地区：0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16);function f(_,x){const d=s("ExternalLinkIcon");return t(),r("div",null,[v,l(" more "),u,i("p",null,[e("一开始使用卫健委官网的数据，写正则表达式来匹配，但后来发现出现了412错误，似乎，爬虫在无cookie的情况下访问该网站会先返回412错误同时设置3个cookie，然后返回错误的同时也返回了一个带有"),m,e("标签的DOM文档，这个script标签会请求的JavaScript文件来生成并设置一个cookie，但这个JavaScript文件相当混乱，并不是一般所见的js文件；在尝试使用412错误所返回的三个cookie去请求也不行，因此另寻它法，使用了某讯的"),i("a",h,[e("api"),n(d)]),e("，国外疫情"),i("a",b,[e("api"),n(d)]),e("。")]),p])}const C=a(o,[["render",f],["__file","telegram-bot-Paimon-note-1.html.vue"]]);export{C as default};
