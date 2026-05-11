import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(SCRIPT_DIR, "..");
const SOURCE_DIR = path.join(ROOT_DIR, "学习笔记");
const POSTS_DIR = path.join(ROOT_DIR, "src", "content", "posts");
const PUBLIC_NOTE_ASSETS_DIR = path.join(ROOT_DIR, "public", "note-assets");

function ensureDir(dirPath) {
  mkdirSync(dirPath, { recursive: true });
}

function collectMarkdownFiles(dirPath) {
  const results = [];

  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === ".obsidian") {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      results.push(...collectMarkdownFiles(fullPath));
      continue;
    }

    if (entry.isFile() && fullPath.endsWith(".md")) {
      results.push(fullPath);
    }
  }

  return results.sort((a, b) => a.localeCompare(b, "zh-CN"));
}

function collectAssetFiles(dirPath) {
  const results = [];

  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === ".obsidian") {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      results.push(...collectAssetFiles(fullPath));
      continue;
    }

    if (entry.isFile() && !fullPath.endsWith(".md") && entry.name !== ".DS_Store") {
      results.push(fullPath);
    }
  }

  return results;
}

function parseFrontmatter(rawText) {
  if (!rawText.startsWith("---\n")) {
    return { data: {}, body: rawText };
  }

  const endMarker = rawText.indexOf("\n---\n", 4);

  if (endMarker === -1) {
    return { data: {}, body: rawText };
  }

  const frontmatter = rawText.slice(4, endMarker);
  const body = rawText.slice(endMarker + 5);
  const data = {};
  let currentKey = null;

  for (const rawLine of frontmatter.split("\n")) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      continue;
    }

    const keyMatch = trimmed.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (keyMatch) {
      currentKey = keyMatch[1];
      let value = keyMatch[2].trim();

      if (!value) {
        data[currentKey] = [];
        continue;
      }

      value = value.replace(/^["']|["']$/g, "");
      data[currentKey] = value;
      continue;
    }

    const listMatch = trimmed.match(/^-+\s*(.*)$/);

    if (listMatch && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }

      data[currentKey].push(listMatch[1].trim().replace(/^["']|["']$/g, ""));
    }
  }

  return { data, body };
}

function firstHeading(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/^---[\s\S]*?---\n*/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[\[[^\]]+\]\]/g, " ")
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, "$2$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*`|_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerptFrom(markdown) {
  const paragraphs = markdown
    .split(/\n{2,}/)
    .filter((block) => !block.trim().startsWith("#"))
    .map((block) => stripMarkdown(block))
    .filter(Boolean);

  return (paragraphs[0] || "").slice(0, 140);
}

function removeLeadingTitleHeading(markdown, title) {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return markdown.replace(new RegExp(`^\\s*#\\s+${escapedTitle}\\s*\\n+`, "u"), "");
}

function encodePathSegments(...segments) {
  return segments.map((segment) => encodeURIComponent(segment)).join("/");
}

function toSlugSegment(value) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{Letter}\p{Number}-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildSlug(relPath) {
  const withoutExt = relPath.replace(/\.md$/i, "");
  return withoutExt
    .split(path.sep)
    .map((segment) => toSlugSegment(segment) || "note")
    .join("/");
}

function buildPostRoute(slug) {
  const segments = slug.split("/");
  return `/${encodePathSegments("posts", ...segments)}/`;
}

function resolveAssetTarget(target, noteDir, attachmentIndex) {
  const cleanTarget = target.split("#")[0].trim();
  const directPath = path.resolve(noteDir, cleanTarget);

  if (existsSync(directPath)) {
    return directPath;
  }

  const fileName = path.basename(cleanTarget);
  const matches = attachmentIndex.get(fileName) || [];
  return matches[0] || null;
}

function buildPublicAssetUrl(assetPath) {
  const relPath = path.relative(SOURCE_DIR, assetPath);
  return `/${encodePathSegments("note-assets", ...relPath.split(path.sep))}`;
}

function replaceObsidianEmbeds(markdown, context) {
  return markdown.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, option = "") => {
    const assetPath = resolveAssetTarget(target, context.noteDir, context.attachmentIndex);

    if (!assetPath) {
      return `> 图片缺失：${target}`;
    }

    const src = buildPublicAssetUrl(assetPath);
    const width = /^\d+$/.test(option.trim()) ? ` width="${option.trim()}"` : "";
    const alt = path.basename(target).replace(/\.[^.]+$/, "");
    return `<img src="${src}" alt="${alt}"${width} />`;
  });
}

function replaceObsidianLinks(markdown, noteLookup) {
  return markdown.replace(/(?<!!)\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g, (_, target, alias = "") => {
    const label = (alias || target).trim();
    const match = noteLookup.get(target.trim());

    if (!match) {
      return label;
    }

    return `[${label}](${match.route})`;
  });
}

function normalizeFenceInfo(markdown) {
  return markdown.replace(/^```([^\n]*)$/gm, (line, info) => {
    const trimmed = info.trim();
    if (!trimmed) {
      return line;
    }

    return `\`\`\`${trimmed.toLowerCase()}`;
  });
}

function yamlString(value) {
  return JSON.stringify(value ?? "");
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function inferPublishedDate(filePath, relPath, data) {
  if (typeof data.published === "string" && data.published.trim()) {
    return data.published.trim();
  }

  const basename = path.basename(relPath, ".md");
  if (/^\d{4}-\d{2}-\d{2}$/.test(basename)) {
    return basename;
  }

  return formatDate(statSync(filePath).mtime);
}

function deriveTags(relPath, data) {
  if (Array.isArray(data.tags) && data.tags.length > 0) {
    return data.tags;
  }

  const segments = relPath.split(path.sep);
  if (segments.length <= 1) {
    return ["随记"];
  }

  return [...new Set(segments.slice(0, -1))];
}

function toFrontmatter(note) {
  const lines = [
    "---",
    `title: ${yamlString(note.title)}`,
    `slug: ${yamlString(note.slug)}`,
    `published: ${note.published}`,
    `updated: ${note.updated}`,
    `description: ${yamlString(note.description)}`,
    `tags: [${note.tags.map((tag) => yamlString(tag)).join(", ")}]`,
    `category: ${yamlString(note.category)}`,
    "draft: false",
    "---",
    "",
  ];

  return lines.join("\n");
}

function main() {
  if (!existsSync(SOURCE_DIR)) {
    throw new Error(`缺少学习笔记目录：${SOURCE_DIR}`);
  }

  rmSync(POSTS_DIR, { recursive: true, force: true });
  ensureDir(POSTS_DIR);
  rmSync(PUBLIC_NOTE_ASSETS_DIR, { recursive: true, force: true });
  ensureDir(PUBLIC_NOTE_ASSETS_DIR);

  const attachmentIndex = new Map();
  for (const assetPath of collectAssetFiles(SOURCE_DIR)) {
    const fileName = path.basename(assetPath);
    const current = attachmentIndex.get(fileName) || [];
    current.push(assetPath);
    attachmentIndex.set(fileName, current);

    const outputPath = path.join(POSTS_DIR, path.relative(SOURCE_DIR, assetPath));
    const publicAssetPath = path.join(PUBLIC_NOTE_ASSETS_DIR, path.relative(SOURCE_DIR, assetPath));
    ensureDir(path.dirname(outputPath));
    ensureDir(path.dirname(publicAssetPath));
    copyFileSync(assetPath, outputPath);
    copyFileSync(assetPath, publicAssetPath);
  }

  const noteFiles = collectMarkdownFiles(SOURCE_DIR);
  const noteLookup = new Map();
  const notes = noteFiles.map((filePath) => {
    const rawText = readFileSync(filePath, "utf8");
    const relPath = path.relative(SOURCE_DIR, filePath);
    const { data, body } = parseFrontmatter(rawText);
    const title = data.title || firstHeading(body) || path.basename(filePath, ".md");
    const category = data.category || (relPath.includes(path.sep) ? relPath.split(path.sep)[0] : "随记");
    const slug = buildSlug(relPath);
    const route = buildPostRoute(slug);

    const note = {
      sourcePath: filePath,
      noteDir: path.dirname(filePath),
      relPath,
      outputPath: path.join(POSTS_DIR, relPath),
      slug,
      title,
      category,
      route,
      tags: deriveTags(relPath, data),
      body,
      description: excerptFrom(body) || title,
      published: inferPublishedDate(filePath, relPath, data),
      updated: formatDate(statSync(filePath).mtime),
    };

    noteLookup.set(path.basename(filePath, ".md"), note);
    noteLookup.set(title, note);
    return note;
  });

  for (const note of notes) {
    ensureDir(path.dirname(note.outputPath));

    const preprocessed = replaceObsidianLinks(
      replaceObsidianEmbeds(note.body, {
        noteDir: note.noteDir,
        attachmentIndex,
      }),
      noteLookup,
    );

    const frontmatter = toFrontmatter(note);
    const content = `${frontmatter}${normalizeFenceInfo(removeLeadingTitleHeading(preprocessed, note.title)).trim()}\n`;
    writeFileSync(note.outputPath, content, "utf8");
  }

  console.log(`Synced ${notes.length} notes into ${POSTS_DIR}`);
}

main();
