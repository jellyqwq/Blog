---
title: VS Code 粘贴图片到 VuePress public 目录
icon: page
order: 1
author: Jelly
date: 2026-05-14
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

# VS Code 粘贴图片到 VuePress public 目录

这次想解决的问题很简单：写 Markdown 的时候直接粘贴图片，让图片文件跟着博客仓库一起提交到 GitHub，不再额外准备图床。

我的博客是 VuePress，静态资源放在：

```text
src/.vuepress/public
```

所以理想状态是，图片保存到：

```text
src/.vuepress/public/images/文章目录/文章名/图片名.png
```

Markdown 里插入的路径则保持为：

```md
![图片](/images/文章目录/文章名/图片名.png)
```

这样本地写作、GitHub 提交、VuePress 构建后的访问路径都能统一起来。

## 误判

一开始以为是 Markdown All in One 在处理粘贴图片，因为这个插件名字实在太像会管 Markdown 图片。

后来卸载 Markdown All in One 以后，所见即所得编辑器还能继续用，粘贴图片也还能写入目录，才确认它不是关键角色。

真正接管 Markdown 所见即所得编辑和粘贴图片的是 Office Viewer，也就是 `vscode-office`。它内部使用了 Vditor 作为编辑器，所以看到 Vditor 仓库时也很容易以为问题在 Vditor。

实际链路是：

```text
Office Viewer / vscode-office -> 内嵌 Vditor -> 处理粘贴图片 -> 写入本地文件
```

Vditor 负责编辑器和上传入口，但把图片写入哪个本地路径，是外层 VS Code 扩展 `vscode-office` 做的。

## 只改配置的边界

`vscode-office` 提供了这两个配置：

```json
{
  "vscode-office.pasterImgPath": "${workspaceDir}/src/.vuepress/public/images/${relativeDir}/${fileName}/${now}.png",
  "vscode-office.workspacePathAsImageBasePath": true
}
```

其中 `workspaceDir`、`fileName`、`now` 是插件原本支持的变量。

但是我想要的路径里还有一段“文章相对 `src` 的目录”，例如：

```text
src/life/journal/2026-05-07.md
```

对应图片目录应该是：

```text
src/.vuepress/public/images/life/journal/2026-05-07/
```

也就是需要一个类似 `${relativeDir}` 的变量。

问题就在这里：`vscode-office` 原生不支持这个变量。只改 `.vscode/settings.json`，没有办法动态拿到文章所在目录。

## 本地补丁

最后是在本机安装的扩展文件里补了逻辑：

```text
~/.vscode/extensions/cweijan.vscode-office-3.5.4/out/extension.js
```

补丁做了三件事：

1. 根据当前 Markdown 文件计算相对 `src` 的目录。
2. 支持在 `vscode-office.pasterImgPath` 里使用 `${relativeDir}`。
3. 插入 Markdown 时，把真实文件路径转换成 VuePress 能识别的 `/images/...` 路径。

最终写入效果类似：

```text
src/.vuepress/public/images/life/journal/2026-05-07/1778721352216.png
```

Markdown 中保存为：

```md
![1778721352216](/images/life/journal/2026-05-07/1778721352216.png)
```

这样提交到 GitHub 后，图片仍然在仓库里，VuePress 构建时也能正常访问。

## 本地预览问题

图片路径保存成 `/images/...` 后，VuePress 网站可以识别，但 Office Viewer 的本地 WebView 不知道 `/images` 应该对应：

```text
src/.vuepress/public/images
```

于是出现了一个新问题：图片文件已经存对了，Markdown 路径也对了，但本地所见即所得编辑器里看不到图片。

这个问题不能通过改 Markdown 路径解决。因为如果把 Markdown 改成本机绝对路径，网站构建就不干净了。

最后的做法是继续补 Office Viewer 的 WebView 显示逻辑：

```text
~/.vscode/extensions/cweijan.vscode-office-3.5.4/resource/vditor/index.js
~/.vscode/extensions/cweijan.vscode-office-3.5.4/resource/vditor/util.js
```

让它只在本地预览时把：

```text
/images/...
```

临时映射到：

```text
src/.vuepress/public/images/...
```

Markdown 文件里的内容不变，仍然保持网站友好的 `/images/...`。

## 最终配置

项目里的 `.vscode/settings.json` 保留这些配置：

```json
{
  "editor.pasteAs.enabled": true,
  "markdown.editor.filePaste.enabled": "always",
  "markdown.editor.filePaste.copyIntoWorkspace": "mediaFiles",
  "markdown.copyFiles.overwriteBehavior": "nameIncrementally",
  "markdown.updateLinksOnFileMove.enabled": "prompt",
  "vscode-office.pasterImgPath": "${workspaceDir}/src/.vuepress/public/images/${relativeDir}/${fileName}/${now}.png",
  "vscode-office.workspacePathAsImageBasePath": true
}
```

真正对 Office Viewer 生效的是后两项。

前几项是 VS Code 原生 Markdown 粘贴配置，保留着不冲突，但在 Office Viewer 接管粘贴时不是主流程。

## 注意事项

这是一个本机扩展补丁，不是 `vscode-office` 官方能力。

如果以后出现下面几种情况，可能需要重新补：

1. VS Code 扩展更新。
2. 重新安装 Office Viewer。
3. 换了一台电脑。
4. `~/.vscode/extensions/cweijan.vscode-office-版本号/` 目录变化。

每次改完扩展文件后，都需要在 VS Code 里执行：

```text
Developer: Reload Window
```

也就是：

```text
Cmd + Shift + P -> Developer: Reload Window
```

否则扩展代码不会立刻重新加载。

## 复盘

这次真正有用的判断是：先确认到底是谁在处理粘贴。

Markdown All in One 只是一个容易被误伤的名字；Vditor 是编辑器内核；真正决定图片保存路径的是 Office Viewer 外层扩展。

想让图片路径同时满足三件事：

1. 图片文件进入 Git 仓库。
2. VuePress 构建后能访问。
3. VS Code 本地所见即所得能预览。

就不能只盯着 Markdown 链接本身，还要同时处理“保存路径”和“本地预览路径映射”这两层。

最终比较顺手的状态是：

```text
文章路径: src/life/journal/2026-05-07.md
图片文件: src/.vuepress/public/images/life/journal/2026-05-07/xxx.png
文章引用: /images/life/journal/2026-05-07/xxx.png
```

这算是折腾了一圈之后比较干净的平衡点。
