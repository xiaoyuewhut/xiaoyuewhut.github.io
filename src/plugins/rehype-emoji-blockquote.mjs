import { visit } from "unist-util-visit";

const EMOJI_PREFIX =
	/^\s*(?:[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{27BF}])(?:\uFE0F|\u{1F3FB}|\u{1F3FC}|\u{1F3FD}|\u{1F3FE}|\u{1F3FF})?/u;

function nodeText(node) {
	if (!node) return "";
	if (node.type === "text") return node.value ?? "";
	if (!Array.isArray(node.children)) return "";
	return node.children.map(nodeText).join("");
}

export function rehypeEmojiBlockquote() {
	return (tree) => {
		visit(tree, "element", (node) => {
			if (node.tagName !== "blockquote") return;

			const text = nodeText(node);
			if (!EMOJI_PREFIX.test(text)) return;

			const properties = node.properties || (node.properties = {});
			const className = properties.className;
			const classes = Array.isArray(className)
				? className
				: typeof className === "string"
					? className.split(/\s+/u).filter(Boolean)
					: [];

			if (!classes.includes("emoji-callout")) {
				classes.push("emoji-callout");
			}
			properties.className = classes;
		});
	};
}
