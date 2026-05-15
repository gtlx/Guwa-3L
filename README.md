# Guwa-3L Blog

基于 Fuwari 主题重构的 Astro 博客，采用**领域驱动三层架构**。

- **Guwa** = 瓜子（Gua Zi）+ 开发者 ID GTLX
- **3L** = Three-Layer Architecture（三层架构）

GitHub: https://github.com/gtlx/Guwa-3L

---

## 安装

```bash
# 克隆仓库
git clone https://github.com/gtlx/Guwa-3L.git
cd Guwa-3L

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

---

## 项目结构

### 三层架构概览

| 层级 | 目录 | 职责 | 日常操作频率 |
|---|---|---|---|
| **内容层** | `blog/` | 博客文章、特殊页面内容 | 高频：写文章 |
| **配置层** | `config/app/` | 站点信息、导航、主题配置 | 中频：改博客信息 |
| **代码层** | `src/` | 组件、样式、功能实现 | 低频：开发主题 |

---

### 完整目录结构

```
blog/
├── blog/                      # 内容层（Content Layer）
│   ├── posts/                 # 文章目录（日常写博客）
│   │   ├── my-first-post.md
│   │   └── guide/
│   │       └── index.md
│   ├── spec/                  # 特殊页面
│   │   └── about.md           # 关于页面内容
│   └── assets/                # 博客专属资源
│       └── images/              # 博客图片
│
├── config/                    # 配置层（Config Layer）
│   └── app/
│       ├── index.ts           # 统一导出入口
│       ├── site.ts            # 站点配置（标题、语言、主题色）
│       ├── nav.ts             # 导航栏配置
│       ├── profile.ts         # 个人资料配置
│       ├── license.ts         # 版权协议配置
│       └── expressive-code.ts # 代码高亮主题配置
│
├── src/                       # 代码层（Code Layer）
│   ├── pages/                 # 页面路由
│   │   ├── [...page].astro    # 首页分页
│   │   ├── archive.astro      # 归档页
│   │   ├── about.astro        # 关于页
│   │   ├── rss.xml.ts         # RSS 订阅
│   │   ├── robots.txt.ts      # SEO 规则
│   │   ├── category/            # 分类页面路由
│   │   │   └── [name].astro     # 分类文章列表页
│   │   └── posts/               # 文章列表路由
│   │       └── [...slug].astro  # 文章详情页
│   │
│   ├── features/              # 功能模块（Features）
│   │   ├── layout/            # 核心布局
│   │   │   ├── Layout.astro          # 根布局
│   │   │   ├── MainGridLayout.astro  # 主网格布局
│   │   │   └── components/           # 布局子组件
│   │   │       ├── Footer.astro      # 页脚
│   │   │       └── Navbar.astro      # 导航栏
│   │   │
│   │   ├── posts/             # 文章模块
│   │   │   ├── PostPage.astro    # 文章页面布局
│   │   │   ├── PostCard.astro    # 文章卡片
│   │   │   └── PostMeta.astro    # 文章元信息
│   │   │
│   │   ├── archive/           # 归档模块
│   │   │   └── ArchivePanel.svelte # 归档面板
│   │   │
│   │   └── widgets/           # 侧边栏小部件
│   │       ├── SideBar.astro          # 侧边栏框架
│   │       ├── Profile.astro          # 个人资料
│   │       ├── Categories.astro       # 分类列表
│   │       ├── Tags.astro             # 标签列表
│   │       ├── TOC.astro              # 文章目录
│   │       ├── Search.svelte          # 站内搜索
│   │       ├── DisplaySettings.svelte # 显示设置
│   │       └── NavMenuPanel.astro     # 导航菜单面板
│   │
│   ├── shared/                # 共享层（Shared）
│   │   ├── components/         # 通用组件
│   │   │   ├── control/        # 控制组件
│   │   │   │   ├── Pagination.astro   # 分页
│   │   │   │   ├── ButtonLink.astro   # 链接按钮
│   │   │   │   ├── ButtonTag.astro    # 标签按钮
│   │   │   │   └── BackToTop.astro    # 回到顶部
│   │   │   ├── misc/           # 杂项组件
│   │   │   │   ├── Markdown.astro      # Markdown 渲染
│   │   │   │   ├── ImageWrapper.astro  # 图片容器
│   │   │   │   ├── License.astro       # 版权声明
│   │   │   │   └── ConfigCarrier.astro # 配置透传
│   │   │   ├── GlobalStyles.astro    # 全局样式注入
│   │   │   └── LightDarkSwitch.svelte # 明暗切换
│   │   │
│   │   ├── utils/             # 工具函数
│   │   │   ├── content-utils.ts  # 内容工具
│   │   │   ├── date-utils.ts     # 日期工具
│   │   │   ├── setting-utils.ts  # 设置工具
│   │   │   └── url-utils.ts      # URL 工具
│   │   │
│   │   ├── constants/         # 常量
│   │   │   ├── constants.ts   # 通用常量
│   │   │   ├── icon.ts        # 图标常量
│   │   │   └── link-presets.ts # 链接预设
│   │   │
│   │   ├── types/             # 类型定义
│   │   │   └── config.ts      # 配置类型
│   │   │
│   │   └── styles/            # 样式
│   │       ├── main.css        # 主样式
│   │       ├── variables.styl  # 样式变量
│   │       ├── markdown.css    # 文章样式
│   │       └── ...             # 其他样式
│   │
│   ├── plugins/               # Markdown 插件
│   │   ├── expressive-code/     # 代码高亮配置
│   │   ├── remark-*.mjs         # Remark 插件
│   │   └── rehype-*.mjs         # Rehype 插件
│   │
│   ├── i18n/                  # 国际化
│   │   ├── languages/          # 语言包
│   │   │   ├── en.ts           # 英文
│   │   │   ├── zh_CN.ts        # 简体中文
│   │   │   └── ...             # 其他语言
│   │   ├── i18nKey.ts          # 翻译键定义
│   │   └── translation.ts      # 翻译工具
│   │
│   └── assets/                # 主题资源
│
├── public/                    # 静态资源
│   └── favicon/               # 网站图标
│
├── scripts/                   # 脚本工具
│   └── new-post.js            # 新建文章脚本
│
├── astro.config.mjs           # Astro 配置
├── tailwind.config.cjs        # Tailwind 配置
├── tsconfig.json              # TypeScript 配置
└── package.json
```

---

### 路径别名

| 别名 | 指向 | 用途 |
|---|---|---|
| `@layouts/*` | `src/features/layout/*` | 布局组件 |
| `@features/*` | `src/features/*` | 功能模块 |
| `@shared/*` | `src/shared/*` | 共享组件和工具 |
| `@components/*` | `src/shared/components/*` | 通用组件 |
| `@utils/*` | `src/shared/utils/*` | 工具函数 |
| `@constants/*` | `src/shared/constants/*` | 常量 |
| `@i18n/*` | `src/i18n/*` | 国际化 |
| `@/*` | `src/*` | 根路径 |

---

## 根目录说明

| 目录/文件 | 说明 |
|---|---|
| `public/` | 静态资源目录（**直接复制到构建输出，不经过编译**）。存放 favicon、robots.txt、图片等不需要处理的文件。构建后这些文件会在网站根目录可访问，如 `/favicon.ico` |
| `scripts/` | 工具脚本目录。`new-post.js` 是 `pnpm write` 命令使用的新建文章脚本 |
| `config/app/` | **应用配置层**（用户日常修改的配置）。包含站点标题、导航、个人资料、主题色等业务配置 |
| `astro.config.mjs` | **框架配置**（不建议修改）。Astro 核心配置，包含插件、Markdown 处理、构建配置等 |
| `svelte.config.js` | **框架配置**（不建议修改）。Svelte 组件集成配置 |
| `tailwind.config.cjs` | **框架配置**（不建议修改）。Tailwind CSS 配置 |
| `postcss.config.mjs` | **框架配置**（不建议修改）。PostCSS 处理配置 |
| `tsconfig.json` | **框架配置**（不建议修改）。TypeScript 配置（包含路径别名）|
| `pagefind.yml` | **工具配置**（可选修改）。Pagefind 站内搜索工具配置。`pnpm build` 后会自动生成搜索索引 |
| `biome.json` | **工具配置**（可选修改）。Biome 代码格式化和 lint 工具配置。用于 `pnpm format` 和 `pnpm lint` 命令 |
| `package.json` | 依赖和脚本配置 |

---

## 常用命令

| 命令 | 说明 |
|---|---|
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 启动开发服务器 `localhost:4321` |
| `pnpm build` | 构建生产版本到 `dist/` |
| `pnpm preview` | 预览生产构建 |
| `pnpm write <filename>` | 新建文章（输出到 `blog/posts/`） |

---

## 快速开始

### 1. 新建文章

```bash
pnpm write my-new-post
```

这会在 `blog/posts/` 目录创建新的 Markdown 文件。

### 2. 修改站点配置

编辑 `config/app/site.ts` 来修改站点标题、语言、主题色等。

### 3. 修改导航栏

编辑 `config/app/nav.ts` 来自定义导航链接。

### 4. 修改个人资料

编辑 `config/app/profile.ts` 修改头像、名称、简介、社交链接。

---

## 文章格式

新建的 Markdown 文件需要以下 frontmatter：

```yaml
---
title: 文章标题
published: 2026-05-13 # 默认，发布日期
updated: 2026-05-14  # 可选，更新日期
description: 文章描述  # 可选，SEO 描述
image: /images/cover.jpg  # 可选，封面图
tags: ["标签1", "标签2"]  # 可选，文章标签
category: "分类名"  # 可选，文章分类
draft: false  # 可选，是否为草稿（true 则不发布）
lang: zh_CN  # 可选，文章语言
---

文章内容...
```

---

## 技术栈

- **Astro 6** - 静态站点生成器
- **Svelte 5** - 交互式组件
- **Tailwind CSS** - 样式框架
- **TypeScript** - 类型安全
- **Pagefind** - 站内搜索
- **PhotoSwipe** - 图片查看器
- **KaTeX** - 数学公式渲染
- **Expressive Code** - 代码高亮

---

## 主题自定义

### 主题色

在 `config/app/site.ts` 中修改：

```typescript
themeColor: {
    hue: 250,  // 0-360，如红色 0、青色 200、蓝绿色 250、粉色 345
    fixed: false,
}
```

### 横幅图片

在 `config/app/site.ts` 中配置：

```typescript
banner: {
    enable: true,
    src: "/images/banner.png",  // 公开路径，放于 blog/assets/public/images/
    position: "center",  // 'top', 'center', 'bottom'
}
```
