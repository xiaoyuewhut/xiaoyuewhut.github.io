import {
	AUTO_MODE,
	DARK_MODE,
	DEFAULT_THEME,
	LIGHT_MODE,
} from "@constants/constants.ts";
import { expressiveCodeConfig } from "@/config";
import type { LIGHT_DARK_MODE } from "@/types/config";

const THEME_TRANSITION_MS = 320;
let themeTransitionTimer: number | undefined;

export function getDefaultHue(): number {
	const fallback = "24";
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback, 10);
}

export function isHueFixed(): boolean {
	const configCarrier = document.getElementById("config-carrier");
	return configCarrier?.dataset.hueFixed === "true";
}

export function getHue(): number {
	if (isHueFixed()) {
		return getDefaultHue();
	}
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored, 10) : getDefaultHue();
}

export function setHue(hue: number): void {
	if (isHueFixed()) {
		localStorage.removeItem("hue");
		hue = getDefaultHue();
	} else {
		localStorage.setItem("hue", String(hue));
	}
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--hue", String(hue));
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
	switch (theme) {
		case LIGHT_MODE:
			document.documentElement.classList.remove("dark");
			break;
		case DARK_MODE:
			document.documentElement.classList.add("dark");
			break;
		case AUTO_MODE:
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			break;
	}

	// Set the theme for Expressive Code
	document.documentElement.setAttribute(
		"data-theme",
		expressiveCodeConfig.theme,
	);
}

function beginThemeTransition() {
	const root = document.documentElement;
	const bodyStyles = window.getComputedStyle(document.body);

	root.style.setProperty(
		"--theme-transition-from-bg",
		bodyStyles.backgroundColor || "transparent",
	);
	root.style.setProperty(
		"--theme-transition-from-image",
		bodyStyles.backgroundImage && bodyStyles.backgroundImage !== "none"
			? bodyStyles.backgroundImage
			: "none",
	);
	root.classList.add("theme-transitioning");

	if (themeTransitionTimer) {
		window.clearTimeout(themeTransitionTimer);
	}

	themeTransitionTimer = window.setTimeout(() => {
		root.classList.remove("theme-transitioning");
	}, THEME_TRANSITION_MS);
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
	localStorage.setItem("theme", theme);

	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		applyThemeToDocument(theme);
		return;
	}

	beginThemeTransition();
	applyThemeToDocument(theme);
}

export function getStoredTheme(): LIGHT_DARK_MODE {
	return (localStorage.getItem("theme") as LIGHT_DARK_MODE) || DEFAULT_THEME;
}
