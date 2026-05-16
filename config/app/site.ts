import type { SiteConfig } from "../../src/shared/types/config";

export const siteConfig: SiteConfig = {
	title: "GTLX Blog", // 站点标题
	subtitle: "瓜子的小站", // 站点副标题
	lang: "zh_CN", // 语言：zh_CN | en | ja | ko 等
	themeColor: {
		hue: 250, // 主题色相 (0-360)
		fixed: false, // 是否固定色相（禁用自动变色）
	},
	banner: {
		enable: true,
		position: "center",
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	toc: {
		enable: true, // 是否启用文章目录
		depth: 2, // 目录最大标题层级 (1-3)
	},
	favicon: [], // 网站图标列表

	// footer: {
	// 	extra: '京ICP备xxxxxxx号', // 底部附加信息（备案号等）
	// },
};
