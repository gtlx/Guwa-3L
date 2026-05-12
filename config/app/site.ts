import type { SiteConfig } from "../../src/shared/types/config";

export const siteConfig: SiteConfig = {
	title: "GTLX Blog",
	subtitle: "瓜子的小站",
	lang: "zh_CN",
	themeColor: {
		hue: 250,
		fixed: false,
	},
	banner: {
		enable: false,
		src: "assets/images/demo-banner.png",
		position: "center",
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	toc: {
		enable: true,
		depth: 2,
	},
	favicon: [],
};
