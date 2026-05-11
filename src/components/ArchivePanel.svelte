<script lang="ts">
import { onMount } from "svelte";

import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";
import { getPostUrlBySlug } from "../utils/url-utils";

export let tags: string[];
export let categories: string[];
export let sortedPosts: Post[] = [];

interface Post {
	slug: string;
	data: {
		title: string;
		tags: string[];
		category?: string;
		published: Date;
	};
}

interface Group {
	year: number;
	months: MonthGroup[];
}

interface MonthGroup {
	month: number;
	posts: Post[];
}

interface Filters {
	tags: string[];
	categories: string[];
	uncategorized: boolean;
}

interface CalendarMonthLabel {
	label: string;
	weekIndex: number;
}

interface CalendarCell {
	key: string;
	count: number;
	level: number;
	inYear: boolean;
	title: string;
	url?: string;
}

interface CalendarYear {
	year: number;
	totalPosts: number;
	activeDays: number;
	maxCount: number;
	weeks: CalendarCell[][];
	monthLabels: CalendarMonthLabel[];
}

let groups: Group[] = [];
let calendarYears: CalendarYear[] = [];

function formatDate(date: Date) {
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	return `${month}-${day}`;
}

function formatTag(tagList: string[]) {
	return tagList.map((t) => `#${t}`).join(" ");
}

function formatMonth(month: number) {
	return `${month.toString().padStart(2, "0")} 月`;
}

function toDateKey(date: Date) {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function normalizeDate(date: Date) {
	const normalized = new Date(date);
	normalized.setHours(0, 0, 0, 0);
	return normalized;
}

function startOfWeek(date: Date) {
	const value = normalizeDate(date);
	const weekDay = (value.getDay() + 6) % 7;
	value.setDate(value.getDate() - weekDay);
	return value;
}

function endOfWeek(date: Date) {
	const value = normalizeDate(date);
	const weekDay = (value.getDay() + 6) % 7;
	value.setDate(value.getDate() + (6 - weekDay));
	return value;
}

function getContributionLevel(count: number, maxCount: number) {
	if (count <= 0) return 0;
	if (maxCount <= 1) return 1;

	const ratio = count / maxCount;
	if (ratio >= 0.85) return 4;
	if (ratio >= 0.6) return 3;
	if (ratio >= 0.35) return 2;
	return 1;
}

function buildArchiveGroups(posts: Post[]) {
	const grouped = posts.reduce(
		(acc, post) => {
			const year = post.data.published.getFullYear();
			const month = post.data.published.getMonth() + 1;

			if (!acc[year]) {
				acc[year] = {};
			}
			if (!acc[year][month]) {
				acc[year][month] = [];
			}
			acc[year][month].push(post);
			return acc;
		},
		{} as Record<number, Record<number, Post[]>>,
	);

	return Object.keys(grouped)
		.map((yearStr) => ({
			year: Number.parseInt(yearStr, 10),
			months: Object.keys(grouped[Number.parseInt(yearStr, 10)])
				.map((monthStr) => ({
					month: Number.parseInt(monthStr, 10),
					posts: grouped[Number.parseInt(yearStr, 10)][Number.parseInt(monthStr, 10)],
				}))
				.sort((a, b) => b.month - a.month),
		}))
		.sort((a, b) => b.year - a.year);
}

function buildCalendarYears(posts: Post[]) {
	const postsByYear = posts.reduce(
		(acc, post) => {
			const year = post.data.published.getFullYear();
			if (!acc[year]) {
				acc[year] = [];
			}
			acc[year].push(post);
			return acc;
		},
		{} as Record<number, Post[]>,
	);

	return Object.keys(postsByYear)
		.map((yearStr) => buildCalendarYear(Number.parseInt(yearStr, 10), postsByYear[Number.parseInt(yearStr, 10)]))
		.sort((a, b) => b.year - a.year);
}

function buildCalendarYear(year: number, posts: Post[]): CalendarYear {
	const postsByDate = new Map<string, Post[]>();

	for (const post of posts) {
		const key = toDateKey(post.data.published);
		const dayPosts = postsByDate.get(key) || [];
		dayPosts.push(post);
		postsByDate.set(key, dayPosts);
	}

	const maxCount = Math.max(0, ...Array.from(postsByDate.values(), (dayPosts) => dayPosts.length));
	const activeDays = Array.from(postsByDate.values()).filter((dayPosts) => dayPosts.length > 0).length;
	const monthLabels: CalendarMonthLabel[] = [];
	const usedMonths = new Set<number>();
	const weeks: CalendarCell[][] = [];

	const gridStart = startOfWeek(new Date(year, 0, 1));
	const gridEnd = endOfWeek(new Date(year, 11, 31));
	const cursor = new Date(gridStart);
	let weekIndex = 0;

	while (cursor <= gridEnd) {
		const week: CalendarCell[] = [];

		for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
			const current = new Date(cursor);
			const inYear = current.getFullYear() === year;

			if (inYear && current.getDate() === 1 && !usedMonths.has(current.getMonth())) {
				monthLabels.push({
					label: `${current.getMonth() + 1} 月`,
					weekIndex,
				});
				usedMonths.add(current.getMonth());
			}

			const key = toDateKey(current);
			const dayPosts = inYear ? postsByDate.get(key) || [] : [];
			const count = dayPosts.length;
			const level = inYear ? getContributionLevel(count, maxCount) : 0;
			const title = !inYear
				? ""
				: count === 0
					? `${key} · 暂无文章`
					: `${key} · ${count} 篇文章\n${dayPosts.map((post) => `• ${post.data.title}`).join("\n")}`;

			week.push({
				key,
				count,
				level,
				inYear,
				title,
				url: count === 1 ? getPostUrlBySlug(dayPosts[0].slug) : undefined,
			});

			cursor.setDate(cursor.getDate() + 1);
		}

		weeks.push(week);
		weekIndex += 1;
	}

	return {
		year,
		totalPosts: posts.length,
		activeDays,
		maxCount,
		weeks,
		monthLabels,
	};
}

function parseFilters(): Filters {
	const params = new URLSearchParams(window.location.search);

	return {
		tags: params.has("tag") ? params.getAll("tag") : [],
		categories: params.has("category") ? params.getAll("category") : [],
		uncategorized: params.get("uncategorized") !== null,
	};
}

function filterPosts(posts: Post[], filters: Filters) {
	let filteredPosts = posts;

	if (filters.tags.length > 0) {
		filteredPosts = filteredPosts.filter(
			(post) =>
				Array.isArray(post.data.tags) &&
				post.data.tags.some((tag) => filters.tags.includes(tag)),
		);
	}

	if (filters.categories.length > 0) {
		filteredPosts = filteredPosts.filter(
			(post) => post.data.category && filters.categories.includes(post.data.category),
		);
	}

	if (filters.uncategorized) {
		filteredPosts = filteredPosts.filter((post) => !post.data.category);
	}

	return filteredPosts;
}

onMount(() => {
	const filters = parseFilters();
	tags = filters.tags;
	categories = filters.categories;

	const filteredPosts = filterPosts(sortedPosts, filters);
	groups = buildArchiveGroups(filteredPosts);
	calendarYears = buildCalendarYears(filteredPosts);
});
</script>

{#if calendarYears.length > 0}
	<div class="card-base timeline-calendar-panel px-5 py-6 md:px-7 mb-6">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
				<div>
					<div class="timeline-calendar-kicker">Publishing Rhythm</div>
					<h2 class="mt-2 text-xl font-bold text-75 md:text-2xl">发布热力日历</h2>
				</div>

			<div class="timeline-calendar-legend" aria-label="热力图强度图例">
				<span>少</span>
				<i class="timeline-calendar-cell level-0"></i>
				<i class="timeline-calendar-cell level-1"></i>
				<i class="timeline-calendar-cell level-2"></i>
				<i class="timeline-calendar-cell level-3"></i>
				<i class="timeline-calendar-cell level-4"></i>
				<span>多</span>
			</div>
		</div>

		{#each calendarYears as calendar, index}
			<section class:list={["timeline-calendar-year", index > 0 && "timeline-calendar-year--stacked"]}>
				<div class="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
					<div class="flex flex-wrap items-end gap-x-4 gap-y-2">
						<div class="text-3xl font-bold tracking-tight text-75">{calendar.year}</div>
						<div class="text-sm text-50">
							{calendar.totalPosts} 篇文章 · {calendar.activeDays} 个活跃日
						</div>
					</div>

					<div class="text-xs tracking-[0.24em] text-black/36 dark:text-white/34">
						单日峰值 {calendar.maxCount} 篇
					</div>
				</div>

				<div class="timeline-calendar-scroll">
					<div class="timeline-calendar-frame" style={`--week-count: ${calendar.weeks.length};`}>
						<div class="timeline-calendar-month-row">
							<div class="timeline-calendar-axis-spacer"></div>
							<div class="timeline-calendar-month-track">
								{#each calendar.monthLabels as month}
									<span class="timeline-calendar-month-label" style={`grid-column: ${month.weekIndex + 1};`}>
										{month.label}
									</span>
								{/each}
							</div>
						</div>

						<div class="timeline-calendar-grid-row">
							<div class="timeline-calendar-weekdays" aria-hidden="true">
								<span>一</span>
								<span></span>
								<span>三</span>
								<span></span>
								<span>五</span>
								<span></span>
								<span>日</span>
							</div>

							<div class="timeline-calendar-weeks">
								{#each calendar.weeks as week}
									<div class="timeline-calendar-week">
										{#each week as cell}
											{#if cell.inYear && cell.url}
												<a
													href={cell.url}
													class={`timeline-calendar-cell level-${cell.level}`}
													title={cell.title}
													aria-label={cell.title}
												></a>
											{:else}
												<div
													class={`timeline-calendar-cell ${cell.inYear ? `level-${cell.level}` : "is-outside"}`}
													title={cell.inYear ? cell.title : ""}
													aria-hidden={!cell.inYear}
												></div>
											{/if}
										{/each}
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</section>
		{/each}
	</div>
{/if}

<div class="card-base px-8 py-6">
	{#each groups as group}
		<div>
			<div class="flex flex-row w-full items-center h-[3.75rem]">
				<div class="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">
					{group.year}
				</div>
				<div class="w-[15%] md:w-[10%]">
					<div
						class="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto
						-outline-offset-[2px] z-50 outline-3"
					></div>
				</div>
				<div class="w-[70%] md:w-[80%] transition text-left text-50">
					{group.months.reduce((count, monthGroup) => count + monthGroup.posts.length, 0)}
					{` `}
					{i18n(
						group.months.reduce((count, monthGroup) => count + monthGroup.posts.length, 0) === 1
							? I18nKey.postCount
							: I18nKey.postsCount
					)}
				</div>
			</div>

			{#each group.months as monthGroup}
				<div class="flex flex-row w-full items-center h-12 mb-1">
					<div class="w-[15%] md:w-[10%] flex justify-end">
						<div
							class="inline-flex items-center rounded-full px-3 py-1 text-xs md:text-sm font-bold
							text-[var(--primary)] bg-[var(--btn-regular-bg)] border border-[var(--line-color)]
							shadow-sm shadow-black/5 dark:shadow-black/20"
						>
							{formatMonth(monthGroup.month)}
						</div>
					</div>

					<div class="w-[15%] md:w-[10%] relative h-full flex items-center">
						<div class="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/35"></div>
						<div class="relative mx-auto h-2.5 w-2.5 rounded-full border-2 border-[var(--primary)] bg-[var(--card-bg)]"></div>
					</div>

					<div class="w-[70%] md:w-[80%] transition text-left text-sm font-medium text-50">
						{monthGroup.posts.length}
						{` `}
						{i18n(monthGroup.posts.length === 1 ? I18nKey.postCount : I18nKey.postsCount)}
					</div>
				</div>

				{#each monthGroup.posts as post}
					<a
						href={getPostUrlBySlug(post.slug)}
						aria-label={post.data.title}
						class="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]"
					>
						<div class="flex flex-row justify-start items-center h-full">
							<div class="w-[15%] md:w-[10%] transition text-sm text-right text-50">
								{formatDate(post.data.published)}
							</div>

							<div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
								<div
									class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5
									bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)]
									outline outline-4 z-50
									outline-[var(--card-bg)]
									group-hover:outline-[var(--btn-plain-bg-hover)]
									group-active:outline-[var(--btn-plain-bg-active)]"
								></div>
							</div>

							<div
								class="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold
								group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)]
								text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden"
							>
								{post.data.title}
							</div>

							<div
								class="hidden md:block md:w-[15%] text-left text-sm transition
								whitespace-nowrap overflow-ellipsis overflow-hidden text-30"
							>
								{formatTag(post.data.tags)}
							</div>
						</div>
					</a>
				{/each}
			{/each}
		</div>
	{/each}
</div>

<style>
	.timeline-calendar-panel {
		position: relative;
		overflow: hidden;
		background:
			radial-gradient(circle at top left, rgba(168, 113, 94, 0.1), transparent 28%),
			linear-gradient(180deg, rgba(255, 252, 248, 0.7), rgba(255, 255, 255, 0.28));
		transition:
			background 0.42s ease-out,
			box-shadow 0.42s ease-out;
	}

	.timeline-calendar-kicker {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--primary) 62%, transparent);
		transition: color 0.38s ease-out;
	}

	.timeline-calendar-year--stacked {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px dashed color-mix(in srgb, var(--line-color) 72%, transparent);
		transition: border-color 0.38s ease-out;
	}

	.timeline-calendar-legend {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		align-self: flex-start;
		padding: 0.55rem 0.8rem;
		border-radius: 999px;
		background: color-mix(in srgb, var(--card-bg) 84%, transparent);
		border: 1px solid color-mix(in srgb, var(--line-color) 78%, transparent);
		font-size: 0.76rem;
		color: color-mix(in srgb, var(--text-color) 52%, transparent);
		transition:
			background-color 0.38s ease-out,
			border-color 0.38s ease-out,
			color 0.38s ease-out;
	}

	.timeline-calendar-scroll {
		overflow-x: auto;
		padding-bottom: 0.35rem;
	}

	.timeline-calendar-scroll::-webkit-scrollbar {
		height: 8px;
	}

	.timeline-calendar-scroll::-webkit-scrollbar-thumb {
		border-radius: 999px;
		background: color-mix(in srgb, var(--primary) 18%, transparent);
	}

	.timeline-calendar-frame {
		--cell-size: 0.8rem;
		--cell-gap: 0.28rem;
		min-width: calc(2rem + var(--week-count) * var(--cell-size) + (var(--week-count) - 1) * var(--cell-gap));
	}

	.timeline-calendar-month-row,
	.timeline-calendar-grid-row {
		display: grid;
		grid-template-columns: 1.5rem 1fr;
		column-gap: 0.7rem;
	}

	.timeline-calendar-month-row {
		margin-bottom: 0.55rem;
	}

	.timeline-calendar-month-track,
	.timeline-calendar-weeks {
		display: grid;
		grid-template-columns: repeat(var(--week-count), var(--cell-size));
		column-gap: var(--cell-gap);
	}

	.timeline-calendar-month-label {
		font-size: 0.74rem;
		line-height: 1;
		white-space: nowrap;
		color: color-mix(in srgb, var(--text-color) 42%, transparent);
		transition: color 0.38s ease-out;
	}

	.timeline-calendar-weekdays,
	.timeline-calendar-week {
		display: grid;
		grid-template-rows: repeat(7, var(--cell-size));
		row-gap: var(--cell-gap);
	}

	.timeline-calendar-weekdays span {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 0.72rem;
		color: color-mix(in srgb, var(--text-color) 34%, transparent);
		transition: color 0.38s ease-out;
	}

	.timeline-calendar-cell {
		display: block;
		width: var(--cell-size);
		height: var(--cell-size);
		border-radius: 0.28rem;
		border: 1px solid transparent;
		transition:
			transform 0.18s ease,
			box-shadow 0.18s ease,
			background-color 0.18s ease,
			border-color 0.18s ease;
	}

	a.timeline-calendar-cell {
		cursor: pointer;
	}

	a.timeline-calendar-cell:hover,
	a.timeline-calendar-cell:focus-visible {
		transform: translateY(-1px) scale(1.08);
		box-shadow: 0 9px 20px rgba(126, 74, 60, 0.18);
		outline: none;
	}

	.timeline-calendar-cell.level-0 {
		background: rgba(147, 116, 98, 0.08);
		border-color: rgba(147, 116, 98, 0.08);
	}

	.timeline-calendar-cell.level-1 {
		background: rgba(165, 103, 84, 0.22);
		border-color: rgba(165, 103, 84, 0.2);
	}

	.timeline-calendar-cell.level-2 {
		background: rgba(165, 103, 84, 0.38);
		border-color: rgba(165, 103, 84, 0.3);
	}

	.timeline-calendar-cell.level-3 {
		background: rgba(165, 103, 84, 0.56);
		border-color: rgba(165, 103, 84, 0.44);
	}

	.timeline-calendar-cell.level-4 {
		background: rgba(165, 103, 84, 0.76);
		border-color: rgba(151, 80, 61, 0.6);
		box-shadow: inset 0 0 0 1px rgba(255, 250, 245, 0.18);
	}

	.timeline-calendar-cell.is-outside {
		background: transparent;
		border-color: transparent;
		opacity: 0.18;
	}

	:global(:root.dark) .timeline-calendar-panel {
		background:
			radial-gradient(circle at top left, rgba(166, 101, 84, 0.18), transparent 28%),
			linear-gradient(180deg, rgba(27, 22, 20, 0.8), rgba(23, 19, 17, 0.5));
	}

	:global(:root.dark) .timeline-calendar-legend {
		background: rgba(255, 255, 255, 0.04);
		border-color: rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.56);
	}

	:global(:root.dark) .timeline-calendar-kicker {
		color: rgba(214, 146, 122, 0.72);
	}

	:global(:root.dark) .timeline-calendar-year--stacked {
		border-top-color: rgba(255, 255, 255, 0.08);
	}

	:global(:root.dark) .timeline-calendar-month-label {
		color: rgba(255, 255, 255, 0.45);
	}

	:global(:root.dark) .timeline-calendar-weekdays span {
		color: rgba(255, 255, 255, 0.34);
	}

	:global(:root.dark) .timeline-calendar-cell.level-0 {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.04);
	}

	:global(:root.dark) .timeline-calendar-cell.level-1 {
		background: rgba(177, 105, 86, 0.3);
		border-color: rgba(177, 105, 86, 0.22);
	}

	:global(:root.dark) .timeline-calendar-cell.level-2 {
		background: rgba(183, 108, 87, 0.46);
		border-color: rgba(183, 108, 87, 0.34);
	}

	:global(:root.dark) .timeline-calendar-cell.level-3 {
		background: rgba(193, 114, 92, 0.62);
		border-color: rgba(193, 114, 92, 0.44);
	}

	:global(:root.dark) .timeline-calendar-cell.level-4 {
		background: rgba(204, 122, 98, 0.82);
		border-color: rgba(210, 132, 108, 0.58);
		box-shadow: inset 0 0 0 1px rgba(255, 244, 238, 0.15);
	}

	:global(:root.dark) a.timeline-calendar-cell:hover,
	:global(:root.dark) a.timeline-calendar-cell:focus-visible {
		box-shadow: 0 10px 22px rgba(0, 0, 0, 0.28);
	}

	@media (min-width: 768px) {
		.timeline-calendar-frame {
			--cell-size: 0.92rem;
			--cell-gap: 0.34rem;
		}
	}
</style>
