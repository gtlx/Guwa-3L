import type { NavBarConfig } from "../../src/shared/types/config";
import { LinkPreset } from "../../src/shared/types/config";

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "友链",
			url: "/links/",
			external: false,
		},
	],
};
