import { definePlugin } from "@expressive-code/core";
import type { Element } from "hast";

function getClassNames(node: Element) {
	const className = node.properties?.className;
	return Array.isArray(className) ? className : [];
}

function findChild(node: Element, tagName: string) {
	return node.children?.find(
		(child): child is Element => child.type === "element" && child.tagName === tagName
	);
}

function getOrCreateHeaderActions(header: Element) {
	const existing = nodeChildren(header).find(
		(child): child is Element =>
			child.type === "element" &&
			child.tagName === "div" &&
			getClassNames(child).includes("header-actions")
	);

	if (existing) {
		return existing;
	}

	const actions = {
		type: "element" as const,
		tagName: "div",
		properties: {
			className: ["header-actions"],
		},
		children: [],
	} as Element;

	nodeChildren(header).push(actions);
	return actions;
}

function nodeChildren(node: Element) {
	if (!node.children) {
		node.children = [];
	}
	return node.children;
}

export function pluginLanguageBadge() {
	return definePlugin({
		name: "Language Badge",
		hooks: {
			postprocessRenderedBlock: ({ codeBlock, renderData }) => {
				const language = codeBlock.language;
				const frame = renderData.blockAst;

				if (!language || frame.type !== "element" || frame.tagName !== "figure") {
					return;
				}

				const header = findChild(frame, "figcaption");
				if (!header) {
					return;
				}

				const actions = getOrCreateHeaderActions(header);
				nodeChildren(actions).unshift({
					type: "element",
					tagName: "span",
					properties: {
						className: ["code-lang-badge"],
					},
					children: [
						{
							type: "text",
							value: language,
						},
					],
				});
			},
		},
	});
}
