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
} from "../lib/brandMark.ts";

/** The mark drawn in the theme's ink (currentColor) with the glyph cut in the panel color, so it
 *  follows every palette the way Fileloom's mark does; decorative, the name sits beside it.
 *  var() works in the style property, not in SVG presentation attributes. */
export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox={`0 0 ${MARK_VIEWBOX} ${MARK_VIEWBOX}`} aria-hidden="true" focusable="false">
      <rect width={MARK_VIEWBOX} height={MARK_VIEWBOX} rx={MARK_CORNER} fill="currentColor" />
      <g style={{ fill: "var(--bg-panel)" }}>
        {MARK_SOLID_TILES.map(({ x, y }) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={MARK_TILE} height={MARK_TILE} rx={MARK_TILE_CORNER} />
        ))}
        <rect x={MARK_PROMPT_CURSOR.x} y={MARK_PROMPT_CURSOR.y} width={MARK_PROMPT_CURSOR.width} height={MARK_PROMPT_CURSOR.height} rx={MARK_PROMPT_CURSOR.corner} />
      </g>
      <g fill="none" style={{ stroke: "var(--bg-panel)" }} strokeWidth={MARK_STROKE} strokeLinecap="round" strokeLinejoin="round">
        <rect x={MARK_PANE.x} y={MARK_PANE.y} width={MARK_PANE.size} height={MARK_PANE.size} rx={MARK_PANE.corner} />
        <path d={MARK_PROMPT_CHEVRON} />
      </g>
    </svg>
  );
}
