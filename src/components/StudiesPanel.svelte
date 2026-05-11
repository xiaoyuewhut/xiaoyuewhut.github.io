<script lang="ts">
	import { onMount } from "svelte";

	import { getPostUrlBySlug } from "../utils/url-utils";

	interface StudyPost {
		slug: string;
		title: string;
		description: string;
	}

	interface StudySection {
		id: string;
		name: string;
		url: string;
		count: number;
		posts: StudyPost[];
	}

	export let sections: StudySection[] = [];

	let activeIndex = 0;

	$: activeSection = sections[activeIndex] ?? null;

	function syncFromHash() {
		const hash = window.location.hash.replace(/^#/, "");
		if (!hash) {
			activeIndex = 0;
			return;
		}

		const nextIndex = sections.findIndex((section) => section.id === hash);
		if (nextIndex >= 0) {
			activeIndex = nextIndex;
		}
	}

	function activateSection(index: number) {
		activeIndex = index;
		const section = sections[index];
		if (!section) return;
		window.history.replaceState(null, "", `#${section.id}`);
	}

	onMount(() => {
		syncFromHash();
		window.addEventListener("hashchange", syncFromHash);
		return () => window.removeEventListener("hashchange", syncFromHash);
	});
</script>

<div class="card-base studies-shell px-4 py-4 md:px-5 md:py-5">
	<div class="studies-layout">
		<aside class="studies-sidebar">
			<div class="studies-sidebar__inner">
				<div class="studies-kicker">Topic Index</div>
				<h1 class="mt-2 text-2xl md:text-3xl font-bold text-90">专题</h1>

				<nav class="mt-5 studies-nav" aria-label="专题目录">
					{#each sections as section, index}
						<button
							type="button"
							class:studies-nav__item={true}
							class:is-active={index === activeIndex}
							on:click={() => activateSection(index)}
						>
							<span class="studies-nav__label">{section.name}</span>
							<span class="studies-nav__count">{section.count}</span>
						</button>
					{/each}
				</nav>
			</div>
		</aside>

		<section class="studies-main">
			{#if activeSection}
				<div class="studies-main__header">
					<div class="studies-main__title-row">
						<div class="min-w-0">
							<div class="studies-main__eyebrow">Current Topic</div>
							<div class="mt-2 flex flex-wrap items-end gap-x-4 gap-y-2">
								<h2 class="text-2xl md:text-3xl font-bold text-90">{activeSection.name}</h2>
								<div class="text-sm text-50">{activeSection.count} 篇笔记</div>
							</div>
						</div>

						<a href={activeSection.url} class="studies-main__jump btn-regular rounded-lg px-4 h-10 whitespace-nowrap active:scale-95">
							进入时间线
						</a>
					</div>
				</div>

				<div class="studies-posts">
					{#if activeSection.posts.length > 0}
						{#each activeSection.posts as post}
							<a href={getPostUrlBySlug(post.slug)} class="studies-post">
								<div class="studies-post__body">
									<div class="studies-post__title">{post.title}</div>
									{#if post.description}
										<div class="studies-post__description">{post.description}</div>
									{/if}
								</div>
							</a>
						{/each}
					{:else}
						<div class="studies-empty">
							<div class="studies-empty__title">这个专题还没有文章</div>
						<div class="studies-empty__description">
								后面补充内容后，这里会自动出现对应文章。
						</div>
					</div>
				{/if}
			</div>
			{/if}
		</section>
	</div>
</div>

<style>
	.studies-shell {
		background:
			radial-gradient(circle at top left, rgba(168, 113, 94, 0.08), transparent 24%),
			linear-gradient(180deg, rgba(255, 252, 248, 0.72), rgba(255, 255, 255, 0.3));
		transition:
			background 0.42s ease-out,
			box-shadow 0.42s ease-out;
	}

	.studies-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	.studies-sidebar__inner,
	.studies-main {
		border-radius: 1.5rem;
		border: 1px solid rgba(73, 46, 33, 0.08);
		background: rgba(255, 255, 255, 0.58);
		backdrop-filter: blur(10px);
		transition:
			background 0.38s ease-out,
			border-color 0.38s ease-out,
			box-shadow 0.42s ease-out;
	}

	.studies-sidebar__inner {
		padding: 1.2rem 1rem 1rem;
	}

	.studies-kicker,
	.studies-main__eyebrow {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: rgba(151, 83, 65, 0.72);
		transition: color 0.38s ease-out;
	}

	.studies-nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.studies-nav__item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		width: 100%;
		padding: 0.9rem 1rem;
		border-radius: 1rem;
		border: 1px solid rgba(73, 46, 33, 0.08);
		background: rgba(255, 255, 255, 0.54);
		text-align: left;
		transition:
			transform 0.18s ease,
			border-color 0.18s ease,
			background-color 0.18s ease,
			box-shadow 0.18s ease;
	}

	.studies-nav__item:hover {
		transform: translateX(4px);
		border-color: rgba(151, 83, 65, 0.22);
		background: rgba(255, 255, 255, 0.78);
	}

	.studies-nav__item.is-active {
		border-color: rgba(151, 83, 65, 0.28);
		background:
			linear-gradient(135deg, rgba(165, 103, 84, 0.16), rgba(255, 255, 255, 0.9));
		box-shadow: 0 12px 30px rgba(135, 82, 64, 0.12);
	}

	.studies-nav__label {
		font-weight: 700;
		color: rgba(27, 21, 18, 0.9);
	}

	.studies-nav__count {
		flex: none;
		min-width: 2.25rem;
		padding: 0.2rem 0.55rem;
		border-radius: 999px;
		background: rgba(73, 46, 33, 0.08);
		font-size: 0.78rem;
		text-align: center;
		color: rgba(73, 46, 33, 0.62);
		transition:
			background-color 0.38s ease-out,
			color 0.38s ease-out;
	}

	.studies-main {
		padding: 1rem;
	}

	.studies-main__header {
		padding: 0.3rem 0.2rem 1rem;
		border-bottom: 1px solid rgba(73, 46, 33, 0.08);
		transition: border-color 0.38s ease-out;
	}

	.studies-main__title-row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.studies-main__jump {
		flex: none;
		align-self: flex-start;
	}

	.studies-posts {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 0.9rem;
		margin-top: 1rem;
	}

	.studies-empty {
		min-height: 17rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1.5rem 1.35rem;
		border-radius: 0.7rem;
		border: 1px dashed rgba(98, 67, 51, 0.22);
		background: rgba(250, 244, 236, 0.72);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
		transition:
			background-color 0.38s ease-out,
			border-color 0.38s ease-out,
			box-shadow 0.42s ease-out;
	}

	.studies-empty__title {
		font-size: 1rem;
		font-weight: 700;
		color: rgba(27, 21, 18, 0.88);
		transition: color 0.38s ease-out;
	}

	.studies-empty__description {
		margin-top: 0.6rem;
		font-size: 0.92rem;
		line-height: 1.9;
		color: rgba(27, 21, 18, 0.56);
		transition: color 0.38s ease-out;
	}

	.studies-post {
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		min-height: 17rem;
		padding: 1.15rem 1.1rem 1rem 1.2rem;
		border-radius: 0.55rem;
		border: 1px solid rgba(98, 67, 51, 0.12);
		background:
			repeating-linear-gradient(
				180deg,
				rgba(158, 123, 97, 0.07) 0,
				rgba(158, 123, 97, 0.07) 1px,
				transparent 1px,
				transparent 2.15rem
			),
			rgba(250, 244, 236, 0.98);
		transition:
			transform 0.18s ease,
			border-color 0.18s ease,
			background-color 0.18s ease,
			box-shadow 0.18s ease,
			filter 0.18s ease;
		box-shadow:
			0 3px 0 rgba(134, 94, 70, 0.08),
			0 24px 42px rgba(112, 77, 57, 0.18);
	}

	.studies-post:hover {
		transform: translateY(-2px);
		border-color: rgba(151, 83, 65, 0.28);
		background:
			repeating-linear-gradient(
				180deg,
				rgba(158, 123, 97, 0.08) 0,
				rgba(158, 123, 97, 0.08) 1px,
				transparent 1px,
				transparent 2.15rem
			),
			rgba(252, 247, 240, 0.99);
		box-shadow:
			0 4px 0 rgba(134, 94, 70, 0.1),
			0 30px 50px rgba(112, 77, 57, 0.24);
		filter: saturate(1.03);
	}

	.studies-post::before {
		content: "";
		position: absolute;
		top: 1rem;
		bottom: 1rem;
		left: 1rem;
		width: 2px;
		background: linear-gradient(180deg, rgba(191, 103, 91, 0.34), rgba(191, 103, 91, 0.18));
		opacity: 0.9;
		pointer-events: none;
	}

	.studies-post__body {
		min-width: 0;
		flex: 1;
		padding: 0.2rem 0 0 1.15rem;
	}

	.studies-post__title {
		font-size: 1rem;
		font-weight: 700;
		line-height: 1.6;
		color: rgba(27, 21, 18, 0.9);
		letter-spacing: 0.01em;
	}

	.studies-post__description {
		margin-top: 0.65rem;
		font-size: 0.9rem;
		line-height: 1.92;
		color: rgba(27, 21, 18, 0.54);
		display: -webkit-box;
		-webkit-line-clamp: 6;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	@media (min-width: 768px) {
		.studies-posts {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.studies-post {
			aspect-ratio: 0.78;
		}
	}

	@media (min-width: 1024px) {
		.studies-layout {
			grid-template-columns: 17rem minmax(0, 1fr);
			align-items: start;
		}

		.studies-sidebar__inner {
			position: sticky;
			top: 5.75rem;
		}

		.studies-main {
			padding: 1.25rem;
		}

		.studies-posts {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	:global(:root.dark) .studies-shell {
		background:
			radial-gradient(circle at top left, rgba(168, 113, 94, 0.15), transparent 24%),
			linear-gradient(180deg, rgba(27, 22, 20, 0.8), rgba(23, 19, 17, 0.46));
	}

	:global(:root.dark) .studies-sidebar__inner,
	:global(:root.dark) .studies-main {
		border-color: rgba(255, 255, 255, 0.08);
		background: rgba(24, 20, 18, 0.72);
	}

	:global(:root.dark) .studies-kicker,
	:global(:root.dark) .studies-main__eyebrow {
		color: rgba(214, 146, 122, 0.72);
	}

	:global(:root.dark) .studies-nav__item {
		border-color: rgba(255, 255, 255, 0.07);
		background: rgba(255, 255, 255, 0.03);
	}

	:global(:root.dark) .studies-nav__item:hover {
		border-color: rgba(214, 146, 122, 0.22);
		background: rgba(255, 255, 255, 0.05);
	}

	:global(:root.dark) .studies-nav__item.is-active {
		border-color: rgba(214, 146, 122, 0.3);
		background: linear-gradient(135deg, rgba(165, 103, 84, 0.22), rgba(255, 255, 255, 0.06));
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
	}

	:global(:root.dark) .studies-nav__label,
	:global(:root.dark) .studies-post__title {
		color: rgba(255, 255, 255, 0.9);
	}

	:global(:root.dark) .studies-nav__count {
		background: rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.66);
	}

	:global(:root.dark) .studies-main__header {
		border-bottom-color: rgba(255, 255, 255, 0.08);
	}

	:global(:root.dark) .studies-post {
		border-color: rgba(255, 255, 255, 0.07);
		background:
			repeating-linear-gradient(
				180deg,
				rgba(217, 187, 165, 0.05) 0,
				rgba(217, 187, 165, 0.05) 1px,
				transparent 1px,
				transparent 2.15rem
			),
			rgba(41, 33, 30, 0.96);
		box-shadow:
			0 3px 0 rgba(0, 0, 0, 0.24),
			0 24px 42px rgba(0, 0, 0, 0.32);
	}

	:global(:root.dark) .studies-post:hover {
		border-color: rgba(214, 146, 122, 0.2);
		background:
			repeating-linear-gradient(
				180deg,
				rgba(217, 187, 165, 0.06) 0,
				rgba(217, 187, 165, 0.06) 1px,
				transparent 1px,
				transparent 2.15rem
			),
			rgba(46, 37, 34, 0.98);
		box-shadow:
			0 4px 0 rgba(0, 0, 0, 0.26),
			0 30px 50px rgba(0, 0, 0, 0.4);
	}

	:global(:root.dark) .studies-post::before {
		background: linear-gradient(180deg, rgba(203, 127, 107, 0.34), rgba(203, 127, 107, 0.14));
	}

	:global(:root.dark) .studies-post__meta {
		background: rgba(214, 146, 122, 0.15);
		color: rgba(229, 173, 153, 0.9);
	}

	:global(:root.dark) .studies-post__description {
		color: rgba(255, 255, 255, 0.56);
	}
</style>
