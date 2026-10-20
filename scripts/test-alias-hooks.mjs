import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = process.cwd();

function resolveFile(base) {
  const candidates = [base, `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.mjs`, path.join(base, "index.ts")];
  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

/** Lader `node --test` løse `@/` og endelsesløse relative imports, som Next.js gør. */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const hit = resolveFile(path.join(root, specifier.slice(2)));
    if (hit) return nextResolve(pathToFileURL(hit).href, context);
  }

  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    try {
      return await nextResolve(specifier, context);
    } catch (err) {
      const parent = context.parentURL ? fileURLToPath(context.parentURL) : root;
      const hit = resolveFile(path.resolve(path.dirname(parent), specifier));
      if (hit) return nextResolve(pathToFileURL(hit).href, context);
      throw err;
    }
  }

  return nextResolve(specifier, context);
}
