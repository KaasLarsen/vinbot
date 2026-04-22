import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const dir = "content/guides";
const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx"));
const results = [];
for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, f), "utf8");
  const { content } = matter(raw);
  const words = readingTime(content).words;
  if (words < 400) results.push({ slug: f.replace(".mdx",""), words });
}
results.sort((a,b) => b.words - a.words);
for (const r of results) console.log(`${r.words}\t${r.slug}`);
console.log(`\nTOTAL THIN: ${results.length}`);
