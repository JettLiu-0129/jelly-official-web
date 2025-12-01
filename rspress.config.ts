import * as path from "node:path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "Jelly - Your All-in-One Translator",
  description: "Jelly Translate",
  icon: "/AppIcon.png",
  logo: {
    light: "/AppIcon.png",
    dark: "/AppIcon.png",
  },
  logoText: "Jelly",
  lang: "zh",
  locales: [
    // {
    //   lang: "en",
    //   label: "English",
    // },
    {
      lang: "zh",
      label: "简体中文",
    },
  ],
  themeConfig: {
    lastUpdated: true,
    socialLinks: [
      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>`,
        },
        mode: "link",
        content: "/about/contact",
      },
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/Jellyfish-Studio",
      },
    ],
    locales: [
      // {
      //   lang: "en",
      //   outlineTitle: "ON THIS PAGE",
      //   label: "en",
      // },
      {
        lang: "zh",
        outlineTitle: "大纲",
        label: "zh",
      },
    ],
  },
  globalStyles: path.join(__dirname, "src/global.css"),
  builderConfig: {
    html: {
      template: "./src/template.html",
      tags: [
        {
          tag: "script",
          // 通过 window.RSPRESS_THEME 变量来指定默认的主题模式,可选值为 'dark' 和 'light'
          // 通过template.html自定义模板来解决SSG打包出来默认不为dark问题
          children: "window.RSPRESS_THEME = 'dark';",
          head: true,
        },
      ],
    },
  },
  ssg: {
    strict: true,
  },
});
