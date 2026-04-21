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

/** Guides til mad & vin-hubben (hub + “mad” i tags). "bedste-*" og viden-sider hører ikke hjemme her. */
export function listMadOgVinHubGuides(): GuideFrontmatter[] {
  return listGuides().filter(
    (g) =>
      !g.slug.startsWith("bedste-") &&
      !isVidenGuide(g.slug) &&
      (g.hub === "mad-og-vin" || (g.tags || []).some((t) => t.toLowerCase().includes("mad"))),
  );
}

/** Guides til /bedste-vine-hubben: hub eller slug starter med "bedste-". */
export function listBedsteVineHubGuides(): GuideFrontmatter[] {
  return listGuides().filter((g) => g.hub === "bedste-vine" || g.slug.startsWith("bedste-"));
}

/** Slugs der hører til /vin-viden-hubben (hvor længe / hvor mange / hvad er / sådan). */
const VIDEN_SLUG_PREFIXES: readonly string[] = [
  "hvor-laenge-holder-",
  "hvor-mange-",
  "hvor-meget-vin-",
  "hvad-er-",
  "sadan-dekanterer-",
  "sadan-serverer-",
  "sadan-smager-",
];

const VIDEN_EXTRA_SLUGS = new Set<string>(["kan-vin-blive-daarlig"]);

function isVidenGuide(slug: string): boolean {
  return VIDEN_EXTRA_SLUGS.has(slug) || VIDEN_SLUG_PREFIXES.some((p) => slug.startsWith(p));
}

export function listVinVidenHubGuides(): GuideFrontmatter[] {
  return listGuides().filter(
    (g) =>
      g.hub === "vin-viden" ||
      VIDEN_EXTRA_SLUGS.has(g.slug) ||
      VIDEN_SLUG_PREFIXES.some((p) => g.slug.startsWith(p)),
  );
}

/** Druer og vinregioner hører til andre hubber — ikke sæson + vin som emne. */
function isGrapeOrRegionGuide(slug: string): boolean {
  return slug.startsWith("vinregion-") || slug.endsWith("-druen");
}

/**
 * Hvis en guide har ét af disse ord i tags (case-insensitive), vises den under /saeson.
 * Tilføj fx "fastelavn" eller "forår" i frontmatter på nye sæsonartikler.
 */
const SAESON_TAG_HINTS: readonly string[] = [
  "jul",
  "julemad",
  "julefrokost",
  "nytår",
  "nytårsmenu",
  "påske",
  "sæson",
  "sommer",
  "vinter",
  "efterår",
  "forår",
  "terrasse",
  "hygge",
  "fest",
  "grill",
  "fastelavn",
  "mortens",
  "kransekage",
  "sankt hans",
  "konfirmation",
  "studenter",
  "haveselskab",
  "mors dag",
  "fars dag",
  "bryllup",
];

function guideMatchesSaesonTags(tags: string[] | undefined): boolean {
  const haystack = (tags || []).map((t) => t.toLowerCase()).join("\n");
  return SAESON_TAG_HINTS.some((hint) => haystack.includes(hint));
}

/**
 * Danske klassikere og praktiske sider uden sæson-tags — stadig oplagt under “sæson og vin”.
 */
const SAESON_EXTRA_SLUGS = new Set<string>([
  "komplet-guide-til-vin-og-mad",
  "opbevaring-af-vin-temperatur-og-aabnet-flaske",
  "vin-til-stegt-flaesk",
  "vin-til-frikadeller",
  "vin-til-smorrebrod",
  "vin-til-kartoffelmad",
  "vin-til-svinekoed",
  "vin-til-ost-og-ostebord",
  "vin-til-vildt",
  "vin-til-gryderet",
  "vin-til-suppe",
  "vin-til-torsk",
  "vin-til-laks",
  "vin-til-rejer",
  "vin-til-muslinger",
  "vin-til-kalkun",
  "vin-til-tapas",
  "vin-til-paella",
  "gavevin-sadan-vaelger-du-den-rigtige-flaske",
  "alkoholsvag-og-alkoholfri-vin",
]);

/** Guides til sæson-hubben: hub, sæson-tags, eller udvalgte “højtid + hverdag”-sider. */
export function listSaesonHubGuides(): GuideFrontmatter[] {
  return listGuides()
    .filter((g) => {
      if (isGrapeOrRegionGuide(g.slug)) return false;
      if (g.slug.startsWith("bedste-")) return false;
      if (isVidenGuide(g.slug)) return false;
      if (g.hub === "saeson") return true;
      if (SAESON_EXTRA_SLUGS.has(g.slug)) return true;
      return guideMatchesSaesonTags(g.tags);
    })
    .sort((a, b) => (a.updated < b.updated ? 1 : -1));
}

/**
 * Tags der matcher “humør & stemning” (lejlighed, selskab, bobler, weekend).
 */
const HUMOER_TAG_HINTS: readonly string[] = [
  "humør",
  "stemning",
  "hygge",
  "fest",
  "cocktails",
  "spritz",
  "gave",
  "weekend",
  "romantik",
  "bobler",
];

function guideMatchesHumoerTags(tags: string[] | undefined): boolean {
  const haystack = (tags || []).map((t) => t.toLowerCase()).join("\n");
  return HUMOER_TAG_HINTS.some((hint) => haystack.includes(hint));
}

/** Ekstra slugs: sommer/terrasse, grill og indkøb — typisk valgt ud fra stemning såvel som ret. */
const HUMOER_EXTRA_SLUGS = new Set<string>([
  "komplet-guide-til-vin-og-mad",
  "vin-til-sommer",
  "rosevin-til-mad-og-sommer",
  "bobler-champagne-cava-prosecco-og-cremant",
  "vin-til-nytaar-og-nytaarsmenu",
  "vin-til-brunch",
  "alkoholsvag-og-alkoholfri-vin",
  "koeb-vin-online-sadan-holder-du-styr-paa-det",
  "naturvin-hvad-er-det",
  "vin-til-grill-og-bbq",
  "vin-til-tapas",
]);

/** Guides til humør-hubben: hub, passende tags eller kuraterede “stemning”-emner. */
export function listHumoerHubGuides(): GuideFrontmatter[] {
  return listGuides()
    .filter((g) => {
      if (isGrapeOrRegionGuide(g.slug)) return false;
      if (g.slug.startsWith("bedste-")) return false;
      if (isVidenGuide(g.slug)) return false;
      if (g.hub === "humoer-og-vin") return true;
      if (HUMOER_EXTRA_SLUGS.has(g.slug)) return true;
      return guideMatchesHumoerTags(g.tags);
    })
    .sort((a, b) => (a.updated < b.updated ? 1 : -1));
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
