import fs from "fs";
import path from "path";

const APP_DIR = path.join(process.cwd(), "app");

/** Mapper fra disk: alle statiske App Router-sider (uden dynamiske segmenter som [slug]). */
export function discoverStaticAppRoutes(): { pathname: string; pageFile: string }[] {
  const out: { pathname: string; pageFile: string }[] = [];

  function walk(dir: string, segments: string[]) {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const name = entry.name;
      if (name.startsWith(".") || name === "api") continue;

      const full = path.join(dir, name);

      if (entry.isDirectory()) {
        if (name.startsWith("(") && name.endsWith(")")) {
          walk(full, segments);
          continue;
        }
        if (/^\[.+]$/.test(name)) {
          continue;
        }
        walk(full, [...segments, name]);
        continue;
      }

      if (entry.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(name)) {
        const pathname = segments.length === 0 ? "/" : `/${segments.join("/")}`;
        out.push({ pathname, pageFile: full });
      }
    }
  }

  walk(APP_DIR, []);
  const seen = new Set<string>();
  return out.filter((r) => {
    if (seen.has(r.pathname)) return false;
    seen.add(r.pathname);
    return true;
  });
}

export function fileLastModified(file: string): Date {
  try {
    return fs.statSync(file).mtime;
  } catch {
    return new Date();
  }
}
