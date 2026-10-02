# Project artwork

Herdloom's mark follows Fileloom's icon grammar: an ink tile with rounded corners carrying a
2×2 grid of rounded tiles, three solid and one drawn as an outlined pane with a `>_` prompt. The
master geometry lives in [`src/lib/brandMark.ts`](../../src/lib/brandMark.ts) on a 1024 grid; the
in-app mark (`src/components/BrandMark.tsx`) and every exported icon are drawn from it.
[`herdloom-mark.svg`](herdloom-mark.svg) is the exported master (white glyph on a black tile).

Run `bun scripts/generate-brand.ts` to regenerate `docs/brand/herdloom-mark.svg`, the app icons
(`public/icons/icon-192.png`, `icon-512.png` and their full-bleed maskable variants), the
notification badge (`public/icons/badge-96.png`), the Apple touch icon, `public/favicon.png`,
`public/favicon.ico` and the social preview. The script rasterises with resvg
(`@resvg/resvg-js`, a dev dependency), so no browser, ImageMagick or FFmpeg is needed. Maskable
icons keep the grid inside the centre safe zone.

The [social preview](../../public/social-preview.png) is a 1280 × 640 PNG: the mark and the name
in ink on Fileloom paper. The website uses `public/social-preview.png` for its Open Graph image.
GitHub's repository preview is a separate setting: open
[repository settings](https://github.com/beefiker/herdloom/settings), then
**Social preview → Edit → Upload an image** and select that file.
See [GitHub's instructions](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview).

`icon-source.png` is the upstream herdr web ui artwork (a ram, terminal prompt, browser window
and pointer). The app and its icons no longer use it; only the upstream marketing tooling under
`scripts/film`, `scripts/readme-media` and `site/` still reads it.
