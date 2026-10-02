/**
 * Herdloom's mark in Fileloom's icon grammar (fileloom/design/4892-app-icon.svg): an ink tile
 * with rounded 256/1024 corners carrying a 2×2 grid of rounded tiles - three solid, one drawn
 * as an outline. Fileloom's outlined tile is a page with a folded corner; Herdloom's is a pane
 * with a `>_` prompt. One geometry on a 1024 grid serves the in-app mark (BrandMark.tsx) and
 * the exported icons (scripts/generate-brand.ts).
 */
export const MARK_VIEWBOX = 1024;
export const MARK_CORNER = 256;
export const MARK_STROKE = 28;

/** solid tiles: top-left, bottom-left, bottom-right */
export const MARK_SOLID_TILES = [
  { x: 246, y: 246 },
  { x: 246, y: 550 },
  { x: 550, y: 550 },
] as const;
export const MARK_TILE = 228;
export const MARK_TILE_CORNER = 76;

/** the outlined pane, top right, inset by half the stroke so its outer edge meets the grid */
export const MARK_PANE = { x: 564, y: 260, size: 200, corner: 62 } as const;
/** the prompt inside it: a chevron and the cursor */
export const MARK_PROMPT_CHEVRON = "M612 318 L656 360 L612 402";
export const MARK_PROMPT_CURSOR = { x: 672, y: 388, width: 52, height: 28, corner: 14 } as const;
