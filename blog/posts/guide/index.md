---
title: Simple Guides for Fuwari
published: 2024-04-01
description: "How to use this blog template."
image: "./cover.jpeg"
tags: ["Fuwari", "Blogging", "Customization"]
category: Guides
draft: false
---

> Cover image source: [Source](https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/208fc754-890d-4adb-9753-2c963332675d/width=2048/01651-1456859105-(colour_1.5),girl,_Blue,yellow,green,cyan,purple,red,pink,_best,8k,UHD,masterpiece,male%20focus,%201boy,gloves,%20ponytail,%20long%20hair,.jpeg)

This blog template is built with [Astro](https://astro.build/). For the things that are not mentioned in this guide, you may find the answers in the [Astro Docs](https://docs.astro.build/).

## 文章 Front-matter

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: 这是我的第一篇博客文章
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---
```

| 字段          | 说明                                                                                                                              |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `title`       | 文章标题                                                                                                                          |
| `published`   | 发布日期                                                                                                                          |
| `description` | 文章摘要，显示在首页列表                                                                                                          |
| `image`       | 文章封面图路径<br/>1. 以 `http://` 或 `https://` 开头：使用网络图片<br/>2. 以 `/` 开头：使用 `public` 目录下的图片<br/>3. 其他：相对于 markdown 文件所在目录 |
| `tags`        | 文章标签                                                                                                                          |
| `category`    | 文章分类                                                                                                                          |
| `draft`       | 是否为草稿，草稿不会显示在页面上                                                                                                  |

## 存放文章文件

文章文件应放在 `blog/posts/` 目录下，可以使用子目录来组织文章和资源。

```
blog/posts/
├── post-1.md
└── post-2/
    ├── cover.png
    └── index.md
```

## 自定义页面（关于、友链等）

创建独立页面（如关于页、友链页）：

1. 在 `blog/spec/` 下创建 markdown 文件，如 `blog/spec/links.md`
2. 在 `src/pages/` 下创建路由页面 `src/pages/links.astro`：

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
