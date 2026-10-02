/**
 * Assembles the website into _site/ for GitHub Pages (.github/workflows/pages.yml) and for a local
 * look (`bun run build:site`, then serve _site/ under /herdloom/ or at its root).
 *
 * The page is site/index.html, one self-contained file in the Fileloom design. Its pictures are
 * site/shots/*.webp: screenshots of the demo below in each palette and mode, committed already
 * optimised (`bun scripts/site-shots.ts` makes them again from a built _site). Its fonts are the
 * bundled Geist and Geist Mono, copied from node_modules. `{{version}}`, `{{stars}}` and
 * `{{agents}}` in the page are filled in here: package.json, the GitHub API, and the app's own
 * agent marks (src/components/AgentMark.tsx) rendered to static SVG.
 *
 * demo/ is the app itself, built by Vite with relative asset paths into demo/app/, loaded behind
 * site/demo/transport.ts (bundled to demo-transport.js and injected before the app's scripts) so it
 * runs on the fixtures in site/demo/ instead of a server; site/demo/index.html frames it with a
 * banner. Building it needs node_modules (`bun install`).
 */
import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { AgentMark } from "../src/components/AgentMark.tsx";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "_site");

const copies: Array<[from: string, to: string]> = [
  ["site/index.html", "index.html"],
  // the one-line installer: curl -fsSL https://beefiker.github.io/herdloom/install.sh | sh
  ["install.sh", "install.sh"],
  ["public/favicon.ico", "favicon.ico"],
  ["public/favicon.png", "favicon.png"],
  ["public/apple-touch-icon.png", "apple-touch-icon.png"],
  ["public/social-preview.png", "assets/social-preview.png"],
  ["node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2", "assets/fonts/geist.woff2"],
  ["node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2", "assets/fonts/geist-mono.woff2"],
];

/** The agents the page names, in its order, with the names people know them by. */
const agents: Array<{ id: string; name: string }> = [
  { id: "claude", name: "Claude Code" },
  { id: "codex", name: "Codex" },
  { id: "omp", name: "omp" },
  { id: "pi", name: "pi" },
  { id: "omo", name: "omo" },
  { id: "gjc", name: "gjc" },
];

async function run(cmd: string[]): Promise<boolean> {
  const proc = Bun.spawn(cmd, { stdout: "ignore", stderr: "pipe" });
  const code = await proc.exited;
  if (code !== 0) console.warn(`${cmd[0]} failed (${code}): ${await new Response(proc.stderr).text()}`.trim());
  return code === 0;
}

// size guard: the screenshots are committed, so they must stay small
const SHOT_CAP = 256 * 1024;
const shots = join(root, "site/shots");
for (const file of readdirSync(shots)) {
  const size = statSync(join(shots, file)).size;
  if (size > SHOT_CAP) throw new Error(`site/shots/${file} is ${(size / 1024).toFixed(0)} KB, over its ${SHOT_CAP / 1024} KB cap`);
}

rmSync(out, { recursive: true, force: true });
for (const [from, to] of copies) {
  const target = join(out, to);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(join(root, from), target);
}
cpSync(shots, join(out, "shots"), { recursive: true });
writeFileSync(join(out, ".nojekyll"), "");

// the page's figures: the release it is built from, the repository's stars as of the build, the agents
let page = readFileSync(join(out, "index.html"), "utf8");
const version = (JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as { version: string }).version;
page = page.replaceAll("{{version}}", version);
const repo = await fetch("https://api.github.com/repos/beefiker/herdloom", { headers: { accept: "application/vnd.github+json" } }).catch(() => null);
const repoBody: unknown = repo?.ok ? await repo.json() : null;
const stars = repoBody && typeof repoBody === "object" && "stargazers_count" in repoBody && typeof repoBody.stargazers_count === "number" ? repoBody.stargazers_count : null;
if (stars === null) console.warn(`GitHub star count unavailable (${repo ? `HTTP ${repo.status}` : "no connection"}): the page shows a dash`);
page = page.replaceAll("{{stars}}", stars === null ? "—" : stars.toLocaleString("en-US"));
page = page.replace("{{agents}}", agents.map(({ id, name }) =>
  `<span class="agent"><span class="mark" aria-hidden="true">${renderToStaticMarkup(createElement(AgentMark, { agent: id, size: 28 }))}</span>${name}</span>`).join(""));
if (/\{\{\w+\}\}/.test(page)) throw new Error(`site/index.html has a placeholder the build does not fill: ${/\{\{\w+\}\}/.exec(page)![0]}`);
writeFileSync(join(out, "index.html"), page);

// the demo: the real client, relative paths, the transport in front of it
const demoApp = join(out, "demo", "app");
if (!(await run([join(root, "node_modules/.bin/vite"), "build", "--base", "./", "--outDir", demoApp, "--emptyOutDir", "--logLevel", "warn"]))) throw new Error("vite build for the demo failed");

const bundle = await Bun.build({
  entrypoints: [join(root, "site/demo/transport.ts")],
  outdir: demoApp,
  naming: "demo-transport.js",
  target: "browser",
  minify: true,
  define: { __APP_VERSION__: JSON.stringify(version) },
});
if (!bundle.success) throw new Error(`demo transport bundle failed:\n${bundle.logs.map(String).join("\n")}`);
const appPage = join(demoApp, "index.html");
let html = readFileSync(appPage, "utf8");
// Vite leaves the PWA links root-absolute; on Pages the root is another site. The manifest goes:
// the demo is not an app to install (its scope and start_url name a root that is not it).
html = html.replace(/\s*<link rel="manifest"[^>]*>/, "");
html = html.replace(/(href|src)="\/(?!\/)/g, '$1="./');
html = html.replace(/<meta name="viewport"/, '<meta name="robots" content="noindex" />\n    <meta name="viewport"');
if (!/<script type="module"/.test(html)) throw new Error("the built app has no module script to load the demo transport before");
html = html.replace(/<script type="module"/, '<script src="./demo-transport.js"></script>\n    <script type="module"');
writeFileSync(appPage, html);
// the brand mark is <img src="/icons/…"> in the client (src/App.tsx, AccessGate.tsx): root-absolute,
// which is right for the app at its own origin and wrong under demo/app/
for (const script of new Bun.Glob("assets/*.js").scanSync({ cwd: demoApp })) {
  const file = join(demoApp, script);
  writeFileSync(file, readFileSync(file, "utf8").replaceAll('"/icons/', '"./icons/'));
}
copyFileSync(join(root, "site/demo/index.html"), join(out, "demo", "index.html"));
if (!existsSync(join(out, "demo", "index.html"))) throw new Error("the demo frame is missing");

const files = new Bun.Glob("**/*").scanSync({ cwd: out, dot: true });
let bytes = 0;
for (const file of files) bytes += Bun.file(join(out, file)).size;
console.log(`_site: ${(bytes / 1024 / 1024).toFixed(1)} MB`);
