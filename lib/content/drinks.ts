import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import { guideMdxComponents } from "@/lib/content/guide-mdx-components";
import type { DrinkDoc, DrinkFrontmatter, DrinkMeta } from "@/lib/content/drink-types";

const DRINKS_DIR = path.join(process.cwd(), "content", "drinks");

function listMdxFiles(): string[] {
  if (!fs.existsSync(DRINKS_DIR)) return [];
  return fs
    .readdirSync(DRINKS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => path.join(DRINKS_DIR, f));
}

function fileFallbackDate(filePath: string): string {
  const stat = fs.statSync(filePath);
  return stat.mtime.toISOString().slice(0, 10);
}

function parseDrinkFile(filePath: string): DrinkDoc {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as DrinkFrontmatter;
  const fallbackDate = fileFallbackDate(filePath);
  return {
    ...fm,
    fallbackDate,
    content: content.trim(),
  };
}

let cachedDrinks: DrinkDoc[] | null = null;

export function getAllDrinks(): DrinkDoc[] {
  if (cachedDrinks) return cachedDrinks;
  cachedDrinks = listMdxFiles()
    .map(parseDrinkFile)
    .sort((a, b) => a.title.localeCompare(b.title, "da"));
  return cachedDrinks;
}

export function getDrinkBySlug(slug: string): DrinkDoc | null {
  return getAllDrinks().find((d) => d.slug === slug) ?? null;
}

export function getAllDrinkSlugs(): string[] {
  return getAllDrinks().map((d) => d.slug);
}

export function getDrinkMetaList(): DrinkMeta[] {
  return getAllDrinks().map(({ content: _c, ...meta }) => meta);
}

export async function getDrink(slug: string) {
  const doc = getDrinkBySlug(slug);
  if (!doc) return null;

  const rt = readingTime(doc.content);
  const wordCount = rt.words;

  const { content } = await compileMDX({
    source: doc.content,
    options: { parseFrontmatter: false },
    components: guideMdxComponents,
  });

  return {
    frontmatter: doc as DrinkFrontmatter & { fallbackDate: string },
    content,
    readingMinutes: Math.max(1, Math.round(rt.minutes)),
    wordCount,
  };
}
