import type { ProfileConfig } from "../../src/shared/types/config";

export const profileConfig: ProfileConfig = {
	avatar: "/images/demo-avatar.png", // 头像路径（/ 开头 = public 目录）
	name: "GTLX", // 显示名称
	bio: "瓜子的小站。——这里存放着 ", // 个人简介
	links: [
		// 社交链接，注释掉或删除即可隐藏
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/gtlx",
		},
	],
};
