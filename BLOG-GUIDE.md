# 博客使用说明

## 目录结构

```
blog/                  # 博客内容
├── assets/            # 资源文件（图片等）
│   └── images/
├── posts/             # 博客文章
│   ├── post-1.md
│   └── post-2/
│       ├── cover.png
│       └── index.md
└── spec/              # 独立页面（关于、友链等）
    └── about.md
```

## 写文章

在 `blog/posts/` 下创建 `.md` 文件，文件头（frontmatter）格式：

```yaml
---
title: 文章标题
published: 2024-01-01
description: 文章摘要
image: "./cover.jpeg"   # 封面图（可选）
tags: ["标签1", "标签2"]
category: 分类
draft: false
---
```

### 文章图片路径写法

封面图 `image` 字段支持三种写法：

| 写法 | 说明 | 示例 |
|------|------|------|
| 相对路径 | 相对于 `.md` 文件所在目录 | `./cover.jpeg` |
| 绝对路径 `/` | 相对于 `public/` 目录 | `/images/cover.jpeg` |
| `http(s)://` | 网络图片 | `https://example.com/cover.jpg` |

**相对路径**是最常用方式，按文件位置决定写法：

```
blog/posts/
├── post-1.md              → image: "./cover.jpeg"     （同目录）
├── post-2/
│   ├── index.md            → image: "./cover.jpeg"     （同目录）
│   └── cover.jpeg
└── guide/
    ├── index.md
    └── cover.jpeg          → image: "../../assets/images/cover.jpeg"  (引用 assets 目录)
```

也就是说 `.md` 文件和图片在同一目录时写 `./图片名`，在不同目录时用 `../` 往上找。

### 文章内嵌图片

在文章正文中插入图片，同样使用相对于 `.md` 文件的路径：

```markdown
![图片描述](./image.png)
```

## 自定义页面（关于、友链等）

创建独立页面的步骤：

1. 在 `blog/spec/` 下新建 `.md` 文件，如 `links.md`
2. 在 `src/pages/` 下新建路由页面，如 `links.astro`：

```astro
---
import { getEntry, render } from "astro:content";
import Markdown from "@shared/components/misc/Markdown.astro";
import MainGridLayout from "@layouts/MainGridLayout.astro";

const entry = await getEntry("spec", "links");
if (!entry) throw new Error("Page not found");
const { Content } = await render(entry);
---
<MainGridLayout title="友链" description="友情链接">
    <div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32">
        <div class="card-base z-10 px-9 py-6 relative w-full">
            <Markdown class="mt-2"><Content /></Markdown>
        </div>
    </div>
</MainGridLayout>
```

3. 在 `blog/spec/links.md` 中写内容，页面会生成在 `/links/`

参考已有的 `src/pages/about.astro` 和 `blog/spec/about.md`。

## 导航栏配置

导航栏在 `config/app/nav.ts` 中配置：

```ts
links: [
    LinkPreset.Home,       // 预设 第1个：首页
    LinkPreset.Archive,    // 预设 第2个：归档
    LinkPreset.About,      // 预设 第2个：关于
    {
        name: "友链",       // 第4个 自定义链接
        url: "/links/",
        external: false,    // true = 新标签页打开
    },
],
```
- 更改排序，可以决定导航栏的显示先后顺序

- `LinkPreset.xxx` 是内置预设，可直接用
- 自定义链接用 `{ name, url, external }` 格式
- `external: true` 时链接在新标签页打开（用于外部网站）

### 导航栏下拉菜单

导航栏支持**下拉菜单**，用于在一级导航下挂分类链接：

```ts
{
    name: "小说",          // 菜单标题
    children: [            // 子分类列表
        { name: "玄幻", url: "/category/玄幻/" },
        { name: "科幻", url: "/category/科幻/" },
        { name: "武侠", url: "/category/武侠/" },
        { name: "都市", url: "/category/都市/" },
    ],
},
```

- 有 `children` 的项**不会作为链接跳转**，鼠标 hover 时展开子菜单
- 子项的 `url` 支持任意路径，指向分类页或自定义页面均可
- 桌面端 hover 展开，移动端自动显示为分组标题 + 缩进列表
- 普通链接和下拉菜单可以混合使用

## 侧边栏个人资料配置

侧边栏的用户名、说明、社交链接在 `config/app/profile.ts` 中配置：

```ts
export const profileConfig: ProfileConfig = {
	avatar: "/images/demo-avatar.png",   // 头像路径（/ 开头 = public 目录）
	name: "GTLX",                        // 用户名
	bio: "瓜子的小站。",                  // 博客说明
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",   // 图标名称（从 iconify 查找）
			url: "https://github.com/",
		},
	],
};
```

- 头像用 `/` 开头的路径代表 `publicDir`（即 `blog/assets/public/`）下的文件
- `icon` 值在 [Iconify](https://icon-sets.iconify.design/) 查找，格式如 `fa6-brands:github`

## 归档页

归档页（`/archive/`）会自动读取所有文章，按年份分组展示。

- 点击侧边栏或文章中的**标签**/**分类**会跳转到 `?tag=xxx` 或 `?category=xxx` 进行筛选
- 未分类的文章会显示在 `?uncategorized=true` 下
- 归档页是客户端渲染（Svelte），筛选逻辑在 `src/features/archive/ArchivePanel.svelte`

无需手动配置，写好文章后自动出现在归档中。

## 文章目录嵌套

`blog/posts/` 支持无限层级的文件夹嵌套，任意子目录下的 `.md` 文件都会被识别为文章：

```
blog/posts/
├── linux/
│   ├── arch/
│   │   └── 安装指南.md
│   └── nvim/
│       └── 配置技巧.md
└── yazi.md
```

这是由 `src/content.config.ts` 中的 `pattern: "**/*.{md,mdx}"` 决定的，`**` 递归匹配所有子目录。

## 页脚版权

页脚版权文字在 `src/features/layout/components/Footer.astro` 中：

```astro
&copy; <span id="copyright-year">{currentYear}</span> {profileConfig.name}. All Rights Reserved.
```

改成中文可以直接修改此行，例如：

```astro
&copy; <span id="copyright-year">{currentYear}</span> {profileConfig.name}. 保留所有权利。
```

## 常用命令

```bash
pnpm dev          # 启动开发服务器
## 搜索用的是 Pagefind，它是构建时静态索引，dev 模式下不可用。只有构建以后才可以正常搜索。
pnpm build        # 构建静态站点
pnpm preview      # 预览构建结果
```

## 部署到 Cloudflare Pages

| 字段 | 值 |
|------|-----|
| 框架预设 | None（或 Astro） |
| 根目录 | 空（默认 `/`） |
| 构建命令 | `pnpm build` |
| 构建输出目录 | `dist` |
| 环境变量 | 无需添加 |

**注意事项：**

- 私有 GitHub 仓库也可以用，Cloudflare 授权后即可读取
- 部署后需修改 `astro.config.mjs` 中的 `site` 字段为你的 Cloudflare Pages 域名（默认是 `https://fuwari.vercel.app/`），否则 RSS/Sitemap 链接不对
- 项目没有 `@astrojs/cloudflare` 适配器，走的是纯静态 SSG 输出，Cloudflare Pages 直接托管无需额外配置

## 注意事项

- 文章文件头 `draft: true` 时不会显示在正式构建中（dev 模式仍可见）
- 封面图文件不存在时，页面不会报错，只是不显示图片
- 默认头像路径 `/images/demo-avatar.png`，放于 `blog/assets/public/images/`，可替换为自己的头像

## 已知问题

### 首页横幅轮播

首页大图支持多图轮播。图片放入 `blog/assets/public/banner/` 即可自动识别，无需配置。

**尺寸建议**：
- 宽高比 **3:1 ~ 4:1**（如 1920×640 或 1600×400）
- 横向分辨率不低于 **1600px**
- 所有图片尽量保持相同尺寸，避免切换时布局跳动
- 支持格式：jpg / png / webp / avif

**交互**：
- 自动 5 秒切换
- 鼠标悬停暂停
- 左右箭头手动翻页
- 底部圆点选择指定页

**覆写配置**：如需手动指定轮播图列表（而非自动扫描目录），可在 `config/app/site.ts` 中添加：
```ts
banner: {
  enable: true,
  images: ["/banner/1.jpg", "/banner/2.jpg"],
}
```

### ImageWrapper 隐式 CSS 依赖

**问题**：`src/shared/components/misc/ImageWrapper.astro` 的 `import.meta.glob` 原使用 `"../../**"` 扫描所有文件。这有一个副作用——`src/shared/styles/` 下的 CSS 文件被 glob 顺带加载，其中的 Tailwind `@apply` 指令跨文件引用（如 `markdown.css` 引用 `main.css` 的 `.link` 类）才能正常工作。

当 glob 限定为只扫图片后，这些 CSS 不再被加载，构建报错 `The 'link' class does not exist`。

**解决**：将跨文件引用的自定义类展开内联，消除依赖。以 `markdown.css` 为例，原来：

```css
@apply relative bg-none link font-medium ...;
@apply btn-regular-dark opacity-0 ...;
```

改为展开后的 Tailwind 工具类：

```css
@apply relative bg-none transition rounded-md p-1 -m-1 ... font-medium ...;
@apply flex items-center justify-center bg-[oklch(0.45_0.01_var(--hue))] ... opacity-0 ...;
```

同时 CSS 文件在 `Layout.astro` 中显式逐条导入，不再依赖 glob 的副作用。

### Public 目录迁移

`public/` 内容移至 `blog/assets/public/`，在 `astro.config.mjs` 中配置：

```js
publicDir: "blog/assets/public",
```

无需根目录保留 `public/`，静态资源统一放在 `blog/assets/public/` 下。

### ImageWrapper 路径穿透（src/shared/blog 软链接）

**问题**：`ImageWrapper.astro` 通过 `import.meta.glob("../../**/*.{图片格式}")` 查找文章配图。因 glob 搜索根为 `src/`，而文章图片实际存放在项目根下的 `blog/posts/xxx/`，无法直接匹配。

**当前解决**：在 `src/shared/blog` 创建指向 `../../blog` 的软链接，使 `blog/posts/` 出现在 `src/` 的搜索范围内。

**待改进**：该软链接是脏数据，且 `import.meta.glob` 跟随软链接存在不可靠隐患。后续应改为将文章配图统一复制到 `publicDir`（`blog/assets/public/`）下，或改用其他图片寻址方案。目前暂未处理。
