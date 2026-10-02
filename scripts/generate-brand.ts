/**
 * Export Herdloom's app icons, favicons, notification badge and social preview from the mark in
 * src/lib/brandMark.ts (Fileloom's icon grammar: black tile, white 2×2 grid). Rasterised with
 * resvg, so no browser, ImageMagick or FFmpeg is needed: `bun scripts/generate-brand.ts`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

import {
  MARK_CORNER,
  MARK_PANE,
  MARK_PROMPT_CHEVRON,
  MARK_PROMPT_CURSOR,
  MARK_SOLID_TILES,
  MARK_STROKE,
  MARK_TILE,
  MARK_TILE_CORNER,
  MARK_VIEWBOX,
} from "../src/lib/brandMark.ts";

const root = new URL("..", import.meta.url).pathname;
mkdirSync(join(root, "public/icons"), { recursive: true });

/** the 2×2 grid in one color: three tiles, the outlined pane and its prompt */
function glyph(color: string): string {
  const tiles = MARK_SOLID_TILES.map(({ x, y }) => `<rect x="${x}" y="${y}" width="${MARK_TILE}" height="${MARK_TILE}" rx="${MARK_TILE_CORNER}"/>`).join("");
  const cursor = `<rect x="${MARK_PROMPT_CURSOR.x}" y="${MARK_PROMPT_CURSOR.y}" width="${MARK_PROMPT_CURSOR.width}" height="${MARK_PROMPT_CURSOR.height}" rx="${MARK_PROMPT_CURSOR.corner}"/>`;
  const pane = `<rect x="${MARK_PANE.x}" y="${MARK_PANE.y}" width="${MARK_PANE.size}" height="${MARK_PANE.size}" rx="${MARK_PANE.corner}"/>`;
  return `<g fill="${color}">${tiles}${cursor}</g>`
    + `<g fill="none" stroke="${color}" stroke-width="${MARK_STROKE}" stroke-linecap="round" stroke-linejoin="round">${pane}<path d="${MARK_PROMPT_CHEVRON}"/></g>`;
}

/** corner: Fileloom's rounded tile for "any" icons, 0 where the platform applies its own mask */
function icon(corner: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK_VIEWBOX} ${MARK_VIEWBOX}">`
    + `<rect width="${MARK_VIEWBOX}" height="${MARK_VIEWBOX}" rx="${corner}" fill="#000"/>${glyph("#fff")}</svg>`;
}

function png(svg: string, width: number): Buffer {
  return new Resvg(svg, { fitTo: { mode: "width", value: width }, font: { loadSystemFonts: true } }).render().asPng();
}

function save(path: string, data: Buffer | string): void {
  writeFileSync(join(root, path), data);
  console.log(path);
}

const rounded = icon(MARK_CORNER);
// the grid spans 246-778 of 1024, inside the maskable safe zone (the centre 80% circle)
const fullBleed = icon(0);
save("docs/brand/herdloom-mark.svg", `${rounded}\n`);

for (const size of [192, 512]) {
  save(`public/icons/icon-${size}.png`, png(rounded, size));
  save(`public/icons/icon-maskable-${size}.png`, png(fullBleed, size));
}
// Android draws a notification's small icon from its alpha alone: white glyph on transparent,
// cropped to the grid (plus half a stroke) so it fills the badge
const crop = MARK_SOLID_TILES[0].x - MARK_STROKE;
const span = MARK_VIEWBOX - 2 * crop;
save("public/icons/badge-96.png", png(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${crop} ${crop} ${span} ${span}">${glyph("#fff")}</svg>`, 96));
// iOS rounds the home-screen icon itself
save("public/apple-touch-icon.png", png(fullBleed, 180));
save("public/favicon.png", png(rounded, 64));

// favicon.ico: one 32×32 PNG in an ICO container (6-byte header, one 16-byte directory entry)
const favicon = png(rounded, 32);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // one image
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt16LE(1, 10); // color planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(favicon.length, 14);
header.writeUInt32LE(22, 18); // image data offset
save("public/favicon.ico", Buffer.concat([header, favicon]));

// social preview: Fileloom paper with the mark and the name in ink
const markScale = 280 / MARK_VIEWBOX;
save("public/social-preview.png", png(`<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="640" viewBox="0 0 1280 640">
  <rect width="1280" height="640" fill="#f7f7f5"/>
  <g transform="translate(150 180) scale(${markScale})"><rect width="${MARK_VIEWBOX}" height="${MARK_VIEWBOX}" rx="${MARK_CORNER}" fill="#20211f"/>${glyph("#f7f7f5")}</g>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" fill="#20211f">
    <text x="510" y="300" font-size="92" font-weight="600" letter-spacing="-3">Herdloom</text>
    <text x="514" y="360" font-size="30" fill="#737570" letter-spacing="-0.4">Your herdr agents, on every screen.</text>
    <text x="516" y="430" font-size="18" fill="#737570" letter-spacing="3">CHAT  ·  TERMINAL  ·  PHONE</text>
  </g>
</svg>`, 1280));
