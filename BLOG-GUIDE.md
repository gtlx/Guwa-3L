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

## 归档页

归档页（`/archive/`）会自动读取所有文章，按年份分组展示。

- 点击侧边栏或文章中的**标签**/**分类**会跳转到 `?tag=xxx` 或 `?category=xxx` 进行筛选
- 未分类的文章会显示在 `?uncategorized=true` 下
- 归档页是客户端渲染（Svelte），筛选逻辑在 `src/features/archive/ArchivePanel.svelte`

无需手动配置，写好文章后自动出现在归档中。

## 常用命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建静态站点
pnpm preview      # 预览构建结果
```

## 注意事项

- 文章文件头 `draft: true` 时不会显示在正式构建中（dev 模式仍可见）
- 封面图文件不存在时，页面不会报错，只是不显示图片
- 默认头像图片路径 `assets/images/demo-avatar.png`，可以替换为自己的头像
