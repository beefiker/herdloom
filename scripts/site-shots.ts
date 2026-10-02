/**
 * Makes the website's screenshots (site/shots/*.webp) from the demo in a built _site/:
 *
 *   bun run build:site && bun scripts/site-shots.ts
 *
 * Each is the real app on the demo session, in one palette and mode, at a desktop or phone size,
 * taken by Chrome (CHROME_PATH, else Google Chrome's usual place) and encoded with cwebp.
 */
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright-core";

const root = join(import.meta.dir, "..");
const site = join(root, "_site");
const out = join(root, "site/shots");
const chrome = process.env.CHROME_PATH
  ?? (process.platform === "darwin" ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" : "/opt/google/chrome/chrome");
if (!Bun.which("cwebp")) throw new Error("cwebp is needed to encode the shots (brew install webp, apt install webp)");

type Shot = { name: string; phone?: boolean; theme: "light" | "dark"; palette?: "loom" | "geist" | "aurora"; pane?: string; prep?: string };
const DESKTOP = { width: 1440, height: 900 }, PHONE = { width: 390, height: 844 };
const PROMPT = "w1D:p1", CHAT = "w1C:p1";
const scrollToCard = "document.querySelector('.prompt-card')?.scrollIntoView({ block: 'center' })";
const openDrawer = "document.querySelector('[aria-controls=\"workspace-drawer\"]')?.click()";
const shots: Shot[] = [];
for (const theme of ["light", "dark"] as const) {
  shots.push(
    { name: `desktop-chat-${theme}`, theme },
    { name: `desktop-prompt-${theme}`, theme, pane: PROMPT },
    { name: `desktop-geist-${theme}`, theme, palette: "geist" },
    { name: `desktop-aurora-${theme}`, theme, palette: "aurora" },
    { name: `phone-chat-${theme}`, theme, phone: true },
    { name: `phone-prompt-${theme}`, theme, phone: true, pane: PROMPT, prep: scrollToCard },
    { name: `phone-sessions-${theme}`, theme, phone: true, prep: openDrawer },
  );
}

const server = Bun.serve({
  port: 0,
  hostname: "127.0.0.1",
  async fetch(request) {
    let path = decodeURIComponent(new URL(request.url).pathname);
    if (path.endsWith("/")) path += "index.html";
    const file = Bun.file(join(site, path));
    return (await file.exists()) ? new Response(file) : new Response("not found", { status: 404 });
  },
});
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const tmp = join(root, "_site-shots");
mkdirSync(tmp, { recursive: true });
mkdirSync(out, { recursive: true });
try {
  for (const shot of shots) {
    const context = await browser.newContext({ viewport: shot.phone ? PHONE : DESKTOP, deviceScaleFactor: 2, isMobile: shot.phone, hasTouch: shot.phone });
    await context.addInitScript(({ theme, palette }) => {
      localStorage.setItem("herdr-web-ui:settings", JSON.stringify({ theme, palette }));
    }, { theme: shot.theme, palette: shot.palette ?? "loom" });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:${server.port}/demo/app/?machine=local&pane=${encodeURIComponent(shot.pane ?? CHAT)}`);
    await page.locator(".view-switch button").first().click();
    await page.locator(".chat-turn").first().waitFor();
    await page.waitForTimeout(800);
    if (shot.prep) { await page.evaluate(shot.prep); await page.waitForTimeout(600); }
    const png = join(tmp, `${shot.name}.png`);
    await page.screenshot({ path: png });
    await context.close();
    const encode = Bun.spawnSync(["cwebp", "-quiet", "-q", "82", "-m", "6", png, "-o", join(out, `${shot.name}.webp`)]);
    if (encode.exitCode !== 0) throw new Error(`cwebp failed for ${shot.name}: ${encode.stderr}`);
    console.log(`site/shots/${shot.name}.webp`);
  }
} finally {
  await browser.close();
  server.stop(true);
  rmSync(tmp, { recursive: true, force: true });
}
