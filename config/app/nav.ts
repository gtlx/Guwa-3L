import type { NavBarConfig } from "../../src/shared/types/config";
import { LinkPreset } from "../../src/shared/types/config";

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{  // 友链
			name: "友人帐",
			url: "/links/",
			external: false,
		},
	  {  // 小说（下拉子分类）
			name: "小说",
			children: [
				// 子项分类名需与文章 frontmatter 中的 category 一致
				{ name: "我是好人", url: "/category/我是好人/" },
			],
		},
  	  {  // 日记
			name: "日记",
			url: "/Diary/",
			external: false,
		},   
		LinkPreset.About,
  ],
};
