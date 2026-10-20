import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type { GuideFrontmatter } from "./guide-types.ts";

const guidesDir = path.join(process.cwd(), "content/guides");

export function getGuideSlugs(): string[] {
  if (!fs.existsSync(guidesDir)) return [];
  return fs
    .readdirSync(guidesDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

let cachedGuides: GuideFrontmatter[] | null = null;

/** Guides ændres kun ved deploy, så listen genbruges i processen. */
export function listGuides(): GuideFrontmatter[] {
  if (cachedGuides) return cachedGuides;
  cachedGuides = getGuideSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(guidesDir, `${slug}.mdx`), "utf8");
      const { data } = matter(raw);
      return { ...(data as GuideFrontmatter), slug };
    })
    .sort((a, b) => (a.updated < b.updated ? 1 : -1));
  return cachedGuides;
}
