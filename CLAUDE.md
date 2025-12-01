# Jelly 官网项目

## 项目概述

Jelly 官网是一个基于 Rspress 的静态文档网站，用于展示 Jelly 翻译工具的产品信息、使用文档和插件市场。

**Jelly 简介:**

- 一款 macOS 翻译工具
- 核心功能: 划词翻译、截屏翻译
- 通过 Mac App Store 分发

## 技术栈

- **框架**: Rspress
- **语言**: TypeScript
- **UI**: React 18
- **内容**: 大多数 MDX (轻度定制，包含一些轻量级组件) + 少数自定义 React 页面 (重度定制，如首页等)
- **Node**: >= 20.0

## 项目结构

```
jelly-official-web/
├── docs                # 路由入口，MDX页面和React页面入口都配置在这里
├── i18n.json           # 国际化文案配置
├── src/
   ├── components/      # React 组件，以及对应的scss文件
   └── global.css       # 全局样式覆盖文件
└── rspress.config.ts   # Rspress 配置
```

## 开发文档

开发时如需查阅 rspress 文档，无需上网搜索，我已经拷贝到了仓库中。路径是`rspress-docs/zh`

## 开发规范

1. **MDX 文件命名**: 使用 kebab-case (如 `quick-start.md`)
2. **React、SCSS 文件命名**: 使用 PascalCase (如 `QuickStart.tsx`)
3. **静态资源**: 放在 `docs/public/` 目录

### 组件开发规范

- **组件存放位置**: 所有 React 组件及其对应的样式文件必须统一放在 `src/components/` 目录下
- **组件文件结构**: 每个组件应该有独立的文件夹，文件夹名使用 PascalCase 命名
  - 组件文件命名为 `index.tsx`
  - 样式文件命名为 `index.module.scss`（使用 CSS Modules 避免全局样式污染）
  - 示例结构：
    ```
    src/components/
      └── Kbd/
          ├── index.tsx
          └── index.module.scss
    ```
- **CSS Modules 使用规范**:

  - 必须使用 `.module.scss` 后缀
  - 类名使用 camelCase 命名（如 `.kbdSymbol`、`.shortcutSeparator`）
  - 在组件中通过 `import styles from './index.module.scss'` 引入
  - 使用 `styles.className` 的方式应用样式
  - **暗色模式样式**: 只应用于暗色模式的样式必须写在对应类内部，使用 `:global(html.dark) &` 语法

    ```scss
    .myClass {
      background: white;

      // 暗色模式样式
      :global(html.dark) & {
        background: black;
      }
    }
    ```

### 侧边栏配置

`_meta.json`是用于配置 Rspress 顶导、侧边栏的文件。

若不关心顺序，且文件夹内没有目录，则无需配置 `_meta.json`。否则需要配置 `_meta.json`。

`zh/`、`en/`根目录下的 `_meta.json` 用于配置顶导，其余级别目录下的 `_meta.json` 用于配置侧边栏。

### 设计风格

- **设计风格**: 简约、现代，符合 Rspress 默认风格

### 国际化 (i18n)

- **支持语言**: 简体中文 (zh)、英文 (en)
- **默认语言**: 简体中文
- **实现方案**: Rspress 内置 i18n 功能
- **新增文案 Key**: 非文档页面支持通过 key 来消费文案，位置：`i18n.json`。
- **文案 Key 消费**

```tsx
import { useI18n } from "rspress/runtime";

const t = useI18n<typeof import("i18n")>();

// 使用
const slogan = t("slogan");
```

### 导航结构

**顶部导航栏配置:**

- 中文: `docs/zh/_meta.json`
- 英文: `docs/en/_meta.json`

## 常用命令

```bash
# 开发
pnpm dev

# 构建
pnpm build
```
