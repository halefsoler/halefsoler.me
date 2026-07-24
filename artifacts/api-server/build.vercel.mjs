// Bundles the Express API into a single self-contained CommonJS file at
// /api/index.js (repo root) so Vercel can deploy it as a serverless function
// with zero external dependencies.
//
// Run after any API change:  node artifacts/api-server/build.vercel.mjs
// Then commit the regenerated api/index.js.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";

const artifactDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(artifactDir, "..", "..");

await esbuild({
  entryPoints: [path.resolve(artifactDir, "src/vercel.ts")],
  platform: "node",
  target: "node20",
  bundle: true,
  format: "cjs",
  outfile: path.resolve(repoRoot, "api/index.js"),
  logLevel: "info",
  // Force the production branch of the logger (no pino-pretty transport /
  // worker threads, which don't work in serverless).
  define: { "process.env.NODE_ENV": '"production"' },
  external: ["*.node", "pg-native"],
});
