# Guwa-3L Blog

基于 Fuwari 主题重构的 Astro 博客，采用**领域驱动三层架构**。

- **Guwa** = 瓜子（Gua Zi）+ 开发者 ID GTLX
- **3L** = Three-Layer Architecture（三层架构）

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
│       └── images/
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
│   │   └── posts/
│   │       └── [...slug].astro # 文章详情页
│   │
│   ├── features/              # 功能模块（Features）
│   │   ├── layout/            # 核心布局
│   │   │   ├── Layout.astro
│   │   │   ├── MainGridLayout.astro
│   │   │   └── components/
│   │   │       ├── Footer.astro
│   │   │       └── Navbar.astro
│   │   │
│   │   ├── posts/             # 文章模块
│   │   │   ├── PostPage.astro
│   │   │   ├── PostCard.astro
│   │   │   └── PostMeta.astro
│   │   │
│   │   ├── archive/           # 归档模块
│   │   │   └── ArchivePanel.svelte
│   │   │
│   │   └── widgets/           # 侧边栏小部件
│   │       ├── SideBar.astro
│   │       ├── Profile.astro
│   │       ├── Categories.astro
│   │       ├── Tags.astro
│   │       ├── TOC.astro
│   │       ├── Search.svelte
│   │       ├── DisplaySettings.svelte
│   │       └── NavMenuPanel.astro
│   │
│   ├── shared/                # 共享层（Shared）
│   │   ├── components/
│   │   │   ├── control/       # 控制组件
│   │   │   │   ├── Pagination.astro
│   │   │   │   ├── ButtonLink.astro
│   │   │   │   ├── ButtonTag.astro
│   │   │   │   └── BackToTop.astro
│   │   │   ├── misc/          # 杂项组件
│   │   │   │   ├── Markdown.astro
│   │   │   │   ├── ImageWrapper.astro
│   │   │   │   ├── License.astro
│   │   │   │   └── ConfigCarrier.astro
│   │   │   ├── GlobalStyles.astro
│   │   │   └── LightDarkSwitch.svelte
│   │   │
│   │   ├── utils/             # 工具函数
│   │   │   ├── content-utils.ts
│   │   │   ├── date-utils.ts
│   │   │   ├── setting-utils.ts
│   │   │   └── url-utils.ts
│   │   │
│   │   ├── constants/         # 常量
│   │   │   ├── constants.ts
│   │   │   ├── icon.ts
│   │   │   └── link-presets.ts
│   │   │
│   │   ├── types/             # 类型定义
│   │   │   └── config.ts
│   │   │
│   │   └── styles/            # 样式
│   │       ├── main.css
│   │       ├── variables.styl
│   │       ├── markdown.css
│   │       └── ...
│   │
│   ├── plugins/               # Markdown 插件
│   │   ├── expressive-code/
│   │   ├── remark-*.mjs
│   │   └── rehype-*.mjs
│   │
│   ├── i18n/                  # 国际化
│   │   ├── languages/
│   │   │   ├── en.ts
│   │   │   ├── zh_CN.ts
│   │   │   └── ...
│   │   ├── i18nKey.ts
│   │   └── translation.ts
│   │
│   └── assets/                # 主题资源
│       └── images/
│
├── public/                    # 静态资源
│   └── favicon/
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
    src: "assets/images/banner.png",  // 相对于 /src 目录
    position: "center",  // 'top', 'center', 'bottom'
}
```
