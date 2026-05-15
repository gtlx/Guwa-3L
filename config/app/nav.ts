import type { NavBarConfig } from "../../src/shared/types/config";
import { LinkPreset } from "../../src/shared/types/config";

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,  //首页
		LinkPreset.Archive, //归档
		{  // 友链
			name: "友人帐",
			url: "/links/",
			external: false,
		},
	  {  // 小说
			name: "小说",
			children: [
				{ name: "我是好人", url: "/category/我是好人/" },
			],
		},
 	  {  // 日记
			name: "日记",
			url: "/Diary/",
			external: false,
		},   
		LinkPreset.About,  //关于
  ],
};
