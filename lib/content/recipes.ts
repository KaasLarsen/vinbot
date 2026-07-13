import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import { guideMdxComponents } from "@/lib/content/guide-mdx-components";
import type { RecipeDoc, RecipeFrontmatter, RecipeMeta } from "@/lib/content/recipe-types";

const RECIPES_DIR = path.join(process.cwd(), "content", "recipes");

function listMdxFiles(): string[] {
  if (!fs.existsSync(RECIPES_DIR)) return [];
  return fs
    .readdirSync(RECIPES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => path.join(RECIPES_DIR, f));
}

function fileFallbackDate(filePath: string): string {
  const stat = fs.statSync(filePath);
  return stat.mtime.toISOString().slice(0, 10);
}

function parseRecipeFile(filePath: string): RecipeDoc {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as RecipeFrontmatter;
  const fallbackDate = fileFallbackDate(filePath);
  return {
    ...fm,
    fallbackDate,
    content: content.trim(),
  };
}

let cachedRecipes: RecipeDoc[] | null = null;

export function getAllRecipes(): RecipeDoc[] {
  if (cachedRecipes) return cachedRecipes;
  cachedRecipes = listMdxFiles()
    .map(parseRecipeFile)
    .sort((a, b) => a.title.localeCompare(b.title, "da"));
  return cachedRecipes;
}

export function getRecipeBySlug(slug: string): RecipeDoc | null {
  return getAllRecipes().find((r) => r.slug === slug) ?? null;
}

export function getAllRecipeSlugs(): string[] {
  return getAllRecipes().map((r) => r.slug);
}

export function getRecipeMetaList(): RecipeMeta[] {
  return getAllRecipes().map(({ content: _c, ...meta }) => meta);
}

export async function getRecipe(slug: string) {
  const doc = getRecipeBySlug(slug);
  if (!doc) return null;

  const rt = readingTime(doc.content);
  const wordCount = rt.words;

  const { content } = await compileMDX({
    source: doc.content,
    options: { parseFrontmatter: false },
    components: guideMdxComponents,
  });

  return {
    frontmatter: doc as RecipeFrontmatter & { fallbackDate: string },
    content,
    readingMinutes: Math.max(1, Math.round(rt.minutes)),
    wordCount,
  };
}
