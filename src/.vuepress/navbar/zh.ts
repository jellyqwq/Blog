import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "时间轴", icon: "time", link: "/timeline/" },
  {
    text: "V2 文档",
    icon: "note",
    link: "https://theme-hope.vuejs.press/zh/",
  },
  {
    text: "工具",
    icon: "tool",
    children: [
      {
        text: "boom",
        icon: "storage",
        link: "https://boomb.cn/",
      },
    ],
  },
]);
