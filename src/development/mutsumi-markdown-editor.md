---
title: 写了一个 VS Code 所见即所得 Markdown 编辑器
icon: page
order: 1
author: Jelly
date: 2026-05-27
category:
  - 编程开发
tag:
  - VS Code
  - Markdown
  - VuePress
  - Vditor
sticky: false
star: false
---

# 写了一个 VS Code 所见即所得 Markdown 编辑器

之前在 [VS Code 粘贴图片到 VuePress public 目录](/development/vscode-office-vuepress-image-paste.html) 里，我通过直接改 `vscode-office` 扩展的本地文件来解决了粘贴图片的问题。方案能用，但有个很烦人的隐患：每次扩展更新或者换电脑，补丁就没了，得重新来一遍。

忍了一段时间之后决定：不如自己写一个 VS Code 扩展，把想要的功能正经做进去。

于是就有了 Mutsumi Markdown Editor — 一个基于 Vditor 的 VS Code 所见即所得 Markdown 编辑器，专门为 VuePress 博客写作场景设计。

## 选型

VS Code 给扩展提供了 `CustomTextEditorProvider` 接口，可以完全接管某个文件类型的编辑界面。本质上是开一个 WebView，在里面跑任意前端代码，然后通过 `postMessage` 和扩展后端通信。

编辑器内核选了 Vditor。之前用 `vscode-office` 的时候已经熟悉了它的 API 和行为，而且它本身就支持所见即所得、上传回调、大纲、导出这些能力，不需要从零搭。

整个扩展就两个 TypeScript 源文件加两个前端文件：

```text
src/
  extension.ts              # 入口，注册 provider 和命令
  markdownEditorProvider.ts  # 核心：WebView 管理、图片保存、导出
media/
  editor.js   # WebView 前端：Vditor 初始化、主题跟随、表格操作
  editor.css  # 少量样式修补
```

## 图片粘贴：从硬编码补丁到可配置模板路径

这是整个扩展最核心的功能，也是当初写它的直接原因。

在 `vscode-office` 里，`pasterImgPath` 不支持 `${relativeDir}`（当前文章相对于 `src` 的路径），所以我不得不改扩展的 `extension.js` 来补这个变量。自己写扩展就没这个限制了。

现在的做法是提供一套模板变量，用户可以自由组合：

```json
{
  "mutsumiMarkdown.imagePathTemplate": "${publicDir}/${imageRoot}/${relativeDir}/${fileName}/${timestamp}.${ext}"
}
```

支持的变量包括 `${workspaceDir}`、`${publicDir}`、`${imageRoot}`、`${contentRoot}`、`${relativeDir}`、`${fileName}`、`${relativePath}`、`${timestamp}`、`${ext}`、`${originalName}`、`${imageName}`。

实际保存时，后端拿到当前文档路径，算出它相对 `contentRoot` 的目录和文件名，把这些值填入模板，然后写入文件。Markdown 里插入的链接也可以单独用 `markdownImagePathTemplate` 控制，不写的话就自动从 `publicDir` 推导。

扩展后端负责的事：

```text
WebView: 用户粘贴图片 → FileReader 读成 dataUrl → postMessage 给后端
后端: 解析 dataUrl → 计算路径 → mkdir + writeFile → 返回 Markdown 链接
WebView: 收到链接 → editor.insertMD("![alt](link)")
```

## 本地预览图片：两层路径的映射问题

和之前 `vscode-office` 时代一样，图片保存到 public 目录后，Markdown 里是 `/images/...` 这种网站路径。但 WebView 不知道 `/images` 应该映射到工作区的 `src/.vuepress/public/images`。

解决思路是在 WebView 初始化时，把 public 目录的本地文件路径作为 `publicBaseUri` 传给前端：

```typescript
// 后端初始化时
webview.postMessage({
  type: "init",
  publicBaseUri: webview.asWebviewUri(vscode.Uri.file(publicDirPath)).toString(),
  ...
});
```

前端收到后，在渲染图片时做一次映射：

```javascript
// 找到所有 src 是 /images/... 的 img 标签
// 把 src 临时替换成 publicBaseUri + /images/...
// 同时保留原始 src 到 data-mutsumi-original-src
```

这样 Markdown 文件里保持干净的 `/images/...`，但本地预览能看到图。而且 `getValue()` 取 Markdown 的时候，会先临时把 src 还原成原始路径再序列化，不会把映射后的路径写回文件。

## 主题跟随

WebView 默认是白色背景，如果不做处理，VS Code 切换成暗色主题后编辑器会很刺眼。

做法是监听 `document.body` 的 class 变化（`vscode-dark` / `vscode-high-contrast`）来判断当前主题，然后往 WebView 里注入一段 CSS，用 VS Code 的 CSS 变量（`--vscode-editor-background`、`--vscode-editor-foreground` 等）覆盖 Vditor 的默认颜色。

```javascript
function applyEditorTheme() {
  const isDark = document.body.classList.contains("vscode-dark") ||
                 document.body.classList.contains("vscode-high-contrast");
  // 读取 VS Code CSS 变量，注入自定义样式
  // 调用 editor.setTheme(isDark ? "dark" : "classic")
}
```

工具栏图标颜色也同步跟过去，在暗色主题下不会黑成一团。这里有个坑：Vditor 的图标是通过 SVG `<use>` 引用的，颜色受 `fill: currentColor` 控制，所以改图标的 `color` 就行，不需要替换图标文件。

## 表格编辑

Vditor 所见即所得模式自带的表格功能不太顺手。内置的 toolbar 按钮在 Custom Editor 的 WebView 里有时候点不出来，而且没有键盘快捷键来操作。

我自己补了一套表格操作的快捷键，注册为 VS Code 命令：

| 操作 | 快捷键 |
|------|--------|
| 上方插入行 | `Cmd + Shift + F` |
| 下方插入行 | `Cmd + =` |
| 左侧插入列 | `Cmd + Shift + G` |
| 右侧插入列 | `Cmd + Shift + =` |
| 删除行 | `Cmd + -` |
| 删除列 | `Cmd + Shift + -` |
| 左对齐 | `Cmd + Shift + L` |
| 居中 | `Cmd + Shift + C` |
| 右对齐 | `Cmd + Shift + R` |

实现方式是直接在 DOM 上操作表格元素——`insertRow`、`deleteRow`、`insertAdjacentElement`，操作完再通知后端把更新后的 Markdown 写回文档。

另外还补了一个 popover：点击表格单元格时弹出一个浮动工具栏，包含所有表格操作按钮。这个东西原本 `vscode-office` 里是能用的，但自己做 Custom Editor 后需要自己画。其实就是几个带图标的 button，定位在表格上方。

## 导出：HTML 和 PDF

Vditor 自带导出功能，但它的实现是开新窗口然后调浏览器打印。在 WebView 里这个流程不适用。

我改成在扩展后端处理导出：
- **Markdown**：直接把当前文本写到 `.export.md` 文件
- **HTML**：用 `editor.getHTML()` 拿到渲染后的 HTML，把本地图片内联成 Base64，包一层完整 HTML 结构（带 Vditor 样式和代码高亮主题），写到 `.html`
- **PDF**：HTML 准备好后，用 Puppeteer 启动 Chrome headless 渲染成 PDF

PDF 导出有几个细节：
- 自动查找本机的 Chrome / Chromium / Edge，也支持手动配置路径
- 需要等页面完全加载，包括图片和 ABC 乐谱渲染完再打印
- 页边距可配，默认 A4 大小

另外 Vditor 支持 `abc` 代码块（ABC 音乐记号），导出的 HTML/PDF 里会把它渲染成五线谱。这个需要在导出的 HTML 里额外内联 `abcjs` 的 JS 代码和一个渲染脚本。

## 大纲状态持久化

Vditor 自带大纲面板，但开关状态的记忆是存在 `localStorage` 里的，在 WebView 中这个存储不可靠。

实现方式是把状态通过 `postMessage` 同步到扩展后端的 `workspaceState`，每次打开时再读回来：

```typescript
// 大纲开关变化时
case "outlineState":
  await this.context.workspaceState.update(outlineStateKey, message.enabled);
  return;

// 初始化时
const outlineEnabled = this.context.workspaceState.get(outlineStateKey, outlineDefaultOpen);
```

这样不同 workspace 之间的大纲状态互不干扰，重启 VS Code 也能记住。

## 打包和发布

用 `@vscode/vsce` 打包成 VSIX，发布到 GitHub Release。推送带版本号的 tag 时 GitHub Actions 自动打包上传：

```bash
git tag v0.0.9
git push origin main --tags
```

tag 版本必须和 `package.json` 里的 `version` 一致。

## 和之前方案的对比

之前 patching `vscode-office` 的做法可以当速效方案用，但如果长期需要这个功能，自己写扩展有几件事是更踏实的：

- 变量模板想加什么加什么，不用猜扩展文件里哪段逻辑在干什么
- 扩展更新不会覆盖你的逻辑
- 换电脑只需要装自己的扩展，不用重新补丁
- CI/CD 流程可控

坏处是得自己维护。好在实际代码量不大，两个 TS 源文件加起来 1000 行出头，前端 JS 约 1000 行，属于那种写完不太需要频繁改的代码。

## 复盘

这次有个体会：当你要的只是一个具体功能（粘贴图片到正确目录）时，改现有扩展是最快拿到结果的办法。但如果这个功能是你每天都在用的，而改的东西又不受版本控制，它就迟早会让你烦。

从"给别人的扩展打补丁"到"自己写一个"，中间差的其实不是技术，是一个决心：是不是真的愿意花几个小时把一个事情做干净。

这个扩展目前我自己在用，也发布到了 VS Code Marketplace (`jellyqwq.mutsumi-markdown-editor`)。如果你也用 VuePress 写博客、希望粘贴图片时自动归位到 public 目录，可以试试看。
