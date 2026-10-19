import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    {
      text: "文章",
      icon: "note",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "项目",
      icon: "code",
      prefix: "projects/",
      children: "structure",
    },
    {
      text: "关于",
      icon: "info",
      prefix: "about/",
      children: "structure",
    },
  ],
});
