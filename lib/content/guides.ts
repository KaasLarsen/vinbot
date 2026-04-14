import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import readingTime from "reading-time";
import { guideMdxComponents } from "@/lib/content/guide-mdx-components";
import type { GuideFrontmatter } from "@/lib/content/guide-types";

export type { GuideFrontmatter } from "@/lib/content/guide-types";

const guidesDir = path.join(process.cwd(), "content/guides");

export function getGuideSlugs(): string[] {
  if (!fs.existsSync(guidesDir)) return [];
  return fs
    .readdirSync(guidesDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function listGuides(): GuideFrontmatter[] {
  return getGuideSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(guidesDir, `${slug}.mdx`), "utf8");
      const { data } = matter(raw);
      return { ...(data as GuideFrontmatter), slug };
    })
    .sort((a, b) => (a.updated < b.updated ? 1 : -1));
}

/** Guides til mad & vin-hubben (hub + “mad” i tags). */
export function listMadOgVinHubGuides(): GuideFrontmatter[] {
  return listGuides().filter(
    (g) => g.hub === "mad-og-vin" || (g.tags || []).some((t) => t.toLowerCase().includes("mad")),
  );
}

export function guidesByTag(tag: string): GuideFrontmatter[] {
  const t = tag.toLowerCase();
  return listGuides().filter((g) => (g.tags || []).map((x) => x.toLowerCase()).includes(t));
}

export async function getGuide(slug: string) {
  const full = path.join(guidesDir, `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, "utf8");
  const { content: body, data } = matter(raw);
  const fm = data as GuideFrontmatter;
  const rt = readingTime(body);

  const { content } = await compileMDX({
    source: body,
    options: { parseFrontmatter: false },
    components: guideMdxComponents,
  });

  return { frontmatter: fm, content, readingMinutes: Math.max(1, Math.round(rt.minutes)) };
}
