<script lang="ts">
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants.ts";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import {
	getStoredTheme,
	setTheme,
} from "@utils/setting-utils.ts";
import { onMount } from "svelte";
import type { LIGHT_DARK_MODE } from "@/types/config.ts";

let mode: LIGHT_DARK_MODE = $state(AUTO_MODE);
let activeMode: typeof LIGHT_MODE | typeof DARK_MODE = $state(LIGHT_MODE);

function syncActiveMode() {
	if (mode === DARK_MODE) {
		activeMode = DARK_MODE;
		return;
	}

	if (mode === LIGHT_MODE) {
		activeMode = LIGHT_MODE;
		return;
	}

	activeMode = document.documentElement.classList.contains("dark")
		? DARK_MODE
		: LIGHT_MODE;
}

onMount(() => {
	mode = getStoredTheme();
	syncActiveMode();

	const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
	const changeThemeWhenSchemeChanged: Parameters<
		typeof darkModePreference.addEventListener<"change">
	>[1] = () => {
		setTheme(mode);
		syncActiveMode();
	};

	darkModePreference.addEventListener("change", changeThemeWhenSchemeChanged);
	return () => {
		darkModePreference.removeEventListener(
			"change",
			changeThemeWhenSchemeChanged,
		);
	};
});

function switchScheme(
	newMode: typeof LIGHT_MODE | typeof DARK_MODE,
) {
	mode = newMode;
	setTheme(newMode);
	syncActiveMode();
}
</script>

<div
	class="theme-switch"
	role="group"
	aria-label="Light and dark mode switch"
	data-mode={activeMode}
>
	<div class="theme-switch__track" aria-hidden="true">
		<div class="theme-switch__track-side theme-switch__track-side--light">
			<Icon icon="material-symbols:light-mode-rounded" class="theme-switch__track-icon" />
		</div>
		<div class="theme-switch__track-side theme-switch__track-side--dark">
			<Icon icon="material-symbols:dark-mode-rounded" class="theme-switch__track-icon" />
		</div>
	</div>

	<div class="theme-switch__thumb" aria-hidden="true">
		<div class="theme-switch__thumb-sheen"></div>
	</div>

	<button
		type="button"
		class="theme-switch__option"
		class:is-active={activeMode === LIGHT_MODE}
		aria-label={i18n(I18nKey.lightMode)}
		aria-pressed={activeMode === LIGHT_MODE}
		onclick={() => switchScheme(LIGHT_MODE)}
	/>

	<button
		type="button"
		class="theme-switch__option"
		class:is-active={activeMode === DARK_MODE}
		aria-label={i18n(I18nKey.darkMode)}
		aria-pressed={activeMode === DARK_MODE}
		onclick={() => switchScheme(DARK_MODE)}
	/>
</div>

<style>
	.theme-switch {
		position: relative;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		align-items: center;
		width: 6.4rem;
		height: 3rem;
		padding: 0.24rem;
		border: 1px solid color-mix(in oklab, var(--card-border) 72%, transparent);
		border-radius: 999px;
		background:
			linear-gradient(
				180deg,
				color-mix(in oklab, var(--page-bg) 88%, white 12%),
				color-mix(in oklab, var(--page-bg) 74%, var(--card-bg) 26%)
			);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.74),
			inset 0 -1px 0 rgba(96, 68, 53, 0.1),
			inset 0 0 0 1px rgba(255, 255, 255, 0.12),
			0 14px 34px -26px var(--card-shadow);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		overflow: hidden;
		transition:
			background 0.4s ease,
			border-color 0.4s ease,
			box-shadow 0.4s ease;
	}

	.theme-switch__track {
		position: absolute;
		inset: 0.24rem;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		align-items: center;
		border-radius: inherit;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0)),
			linear-gradient(90deg, rgba(188, 154, 122, 0.08), rgba(72, 87, 125, 0.08));
		box-shadow:
			inset 0 1px 1px rgba(255, 255, 255, 0.24),
			inset 0 -1px 2px rgba(92, 66, 48, 0.08);
	}

	.theme-switch__track-side {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.theme-switch__track-icon {
		font-size: 1rem;
		opacity: 0.72;
		backface-visibility: hidden;
		transform: translateZ(0);
		transition:
			opacity 0.22s ease,
			color 0.22s ease;
	}

	.theme-switch__thumb {
		position: absolute;
		top: 0.24rem;
		left: 0.24rem;
		width: calc(50% - 0.24rem);
		height: calc(100% - 0.48rem);
		border-radius: 999px;
		background: linear-gradient(
			180deg,
			rgba(255, 252, 248, 0.99),
			rgba(243, 232, 217, 0.97)
		);
		box-shadow:
			0 11px 22px -16px rgba(73, 46, 33, 0.5),
			0 3px 6px rgba(73, 46, 33, 0.08),
			inset 0 1px 0 rgba(255, 255, 255, 0.95),
			inset 0 -1px 0 rgba(128, 94, 71, 0.1);
		transition:
			transform 0.44s cubic-bezier(0.22, 1, 0.36, 1),
			background 0.32s ease,
			box-shadow 0.32s ease;
		will-change: transform;
	}

	.theme-switch[data-mode="dark"] .theme-switch__thumb {
		transform: translateX(calc(100% + 0.08rem));
		background: linear-gradient(
			180deg,
			rgba(104, 111, 130, 0.98),
			rgba(68, 73, 88, 0.98)
		);
		box-shadow:
			0 10px 18px -14px rgba(0, 0, 0, 0.56),
			0 2px 4px rgba(0, 0, 0, 0.12),
			inset 0 1px 0 rgba(255, 255, 255, 0.12),
			inset 0 -1px 0 rgba(0, 0, 0, 0.22);
	}

	.theme-switch__thumb-sheen {
		position: absolute;
		inset: 0.22rem;
		border-radius: inherit;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.46), rgba(255, 255, 255, 0)),
			radial-gradient(circle at 30% 24%, rgba(255, 255, 255, 0.4), transparent 48%);
		opacity: 0.88;
	}

	.theme-switch__option {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		border-radius: 999px;
		color: rgba(27, 21, 18, 0.52);
		transition:
			transform 0.22s ease,
			opacity 0.22s ease;
	}

	.theme-switch__option:hover {
		transform: translateY(-0.5px);
	}

	:global(:root.dark) .theme-switch {
		border-color: color-mix(in oklab, var(--card-border) 82%, transparent);
		background:
			linear-gradient(
				180deg,
				color-mix(in oklab, var(--page-bg) 66%, rgba(255, 255, 255, 0.04) 34%),
				color-mix(in oklab, var(--page-bg) 82%, rgba(0, 0, 0, 0.18) 18%)
			);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.05),
			inset 0 -1px 0 rgba(0, 0, 0, 0.28),
			inset 0 0 0 1px rgba(255, 255, 255, 0.03),
			0 14px 34px -26px rgba(0, 0, 0, 0.46);
	}

	:global(:root.dark) .theme-switch__track {
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0)),
			linear-gradient(90deg, rgba(128, 114, 84, 0.06), rgba(93, 109, 150, 0.14));
		box-shadow:
			inset 0 1px 1px rgba(255, 255, 255, 0.05),
			inset 0 -1px 2px rgba(0, 0, 0, 0.22);
	}

	:global(:root.dark) .theme-switch__track-icon {
		opacity: 0.56;
	}

	.theme-switch[data-mode="light"] .theme-switch__track-side--light .theme-switch__track-icon {
		opacity: 0.96;
		color: rgba(120, 81, 36, 0.96);
	}

	.theme-switch[data-mode="dark"] .theme-switch__track-side--dark .theme-switch__track-icon {
		opacity: 0.96;
		color: rgba(241, 245, 255, 0.96);
	}

	@media (prefers-reduced-motion: reduce) {
		.theme-switch,
		.theme-switch__thumb,
		.theme-switch__track-icon,
		.theme-switch__option {
			transition-duration: 0.01ms;
		}
	}
</style>
