<script lang="ts">
import { onMount } from "svelte";

import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";
import { getPostUrlBySlug } from "../utils/url-utils";

export let tags: string[];
export let categories: string[];
export let sortedPosts: Post[] = [];

const params = new URLSearchParams(window.location.search);
tags = params.has("tag") ? params.getAll("tag") : [];
categories = params.has("category") ? params.getAll("category") : [];
const uncategorized = params.get("uncategorized");

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

let groups: Group[] = [];

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

onMount(async () => {
	let filteredPosts: Post[] = sortedPosts;

	if (tags.length > 0) {
		filteredPosts = filteredPosts.filter(
			(post) =>
				Array.isArray(post.data.tags) &&
				post.data.tags.some((tag) => tags.includes(tag)),
		);
	}

	if (categories.length > 0) {
		filteredPosts = filteredPosts.filter(
			(post) => post.data.category && categories.includes(post.data.category),
		);
	}

	if (uncategorized) {
		filteredPosts = filteredPosts.filter((post) => !post.data.category);
	}

	const grouped = filteredPosts.reduce(
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

	const groupedPostsArray = Object.keys(grouped).map((yearStr) => ({
		year: Number.parseInt(yearStr, 10),
		months: Object.keys(grouped[Number.parseInt(yearStr, 10)])
			.map((monthStr) => ({
				month: Number.parseInt(monthStr, 10),
				posts: grouped[Number.parseInt(yearStr, 10)][Number.parseInt(monthStr, 10)],
			}))
			.sort((a, b) => b.month - a.month),
	}));

	groupedPostsArray.sort((a, b) => b.year - a.year);

	groups = groupedPostsArray;
});
</script>

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
                            <!-- date -->
                            <div class="w-[15%] md:w-[10%] transition text-sm text-right text-50">
                                {formatDate(post.data.published)}
                            </div>

                            <!-- dot and line -->
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

                            <!-- post title -->
                            <div
                                    class="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold
                         group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)]
                         text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden"
                            >
                                {post.data.title}
                            </div>

                            <!-- tag list -->
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
