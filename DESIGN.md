# Herdloom Design System

Extracted from the shipped client (`src/styles.css`, `src/components/*`), not invented. The machine
copy of every token is the `:root` block in `src/styles.css`; every table below mirrors it value for
value. When a component needs a value that is not here, add it to both first.

## 1. Atmosphere & Identity

Herdloom wears the Fileloom design system: quiet tonal surfaces separated by hairlines, a chat-app
clarity over the terminal, and almost no color in the chrome. Ink is the one chrome color: the
selection rail, the terminal cursor and the user's own action (Send, New session, primary buttons)
are near-white on graphite in dark and near-black on paper in light. Keyboard focus is Fileloom's
blue ring (`--focus`), so where the keyboard is never reads as what is selected. Agent states carry
the remaining saturated colors.

Lift is the signature. The one surface that rises above the chrome is the raised panel
(`--bg-raised` with `--shadow-raise`): the selected pane row, the chosen segmented option, a pressed
icon button and the user's own chat turns. Everything else stays flat and tonal, so a long thread
never turns into a wall of color. Aurora adds a faint violet and cyan light behind the header and
sidebar (`--canvas-glow`); Loom and Geist keep the canvas flat.

Dark is the default, light follows the same hierarchy, and comfortable or compact density changes
scale without changing information architecture. Loom (Fileloom's paper and ink) is the default
palette and the look before settings load; Geist and Aurora are opt-in palettes (Settings →
Appearance → Colors).

## 2. Color

### Palette (Loom)

The base blocks are Loom: `:root` (dark) and `[data-theme="light"]`. Only tokens overridden by
`[data-theme="light"]` have a light value. Both columns are literal CSS.

| Role | Token | Dark | Light |
|------|-------|------|-------|
| Surface/base | `--bg` | `#111312` | `#f2f2ef` |
| Surface/panel | `--bg-panel` | `#171918` | `#fbfbfa` |
| Surface/elevated | `--bg-elevated` | `#1f2220` | `#f0f0ed` |
| Surface/hover | `--bg-hover` | `#282b29` | `#e8e9e5` |
| Surface/input | `--bg-input` | `#141615` | `#ffffff` |
| Surface/raised | `--bg-raised` | `#232624` | `#ffffff` |
| Border | `--border` | `#2a2d2b` | `#e2e3df` |
| Border/strong | `--border-strong` | `#3a3e3a` | `#cdd0ca` |
| Text/primary | `--text` | `#d9ddd6` | `#2b2d2a` |
| Text/dim | `--text-dim` | `#a3a8a1` | `#5e615b` |
| Text/strong | `--text-strong` | `#f1f3ef` | `#20211f` |
| Accent | `--accent` | `#eceee9` | `#20211f` |
| Accent/tint | `--accent-tint` | `rgba(236, 238, 233, 0.08)` | `rgba(32, 33, 31, 0.06)` |
| Primary | `--primary` | `#eceee9` | `#20211f` |
| Primary/hover | `--primary-hover` | `#ffffff` | `#3a3c38` |
| Primary/text | `--primary-text` | `#171918` | `#fbfbfa` |
| Primary/tint | `--primary-tint` | `rgba(236, 238, 233, 0.1)` | `rgba(32, 33, 31, 0.08)` |
| Focus | `--focus` | `#9bbaff` | `#275dc2` |
| Status/idle | `--status-idle` | `#a3a8a1` | `#5e615b` |
| Status/working | `--status-working` | `#9bbaff` | `#2754ad` |
| Status/blocked | `--status-blocked` | `#ffaaa2` | `#a8302f` |
| Status/done | `--status-done` | `#a3d9a5` | `#2b6236` |
| Working/tint | `--status-working-tint` | `rgba(155, 186, 255, 0.13)` | `rgba(39, 84, 173, 0.1)` |
| Blocked/tint | `--status-blocked-tint` | `rgba(255, 170, 162, 0.13)` | `rgba(168, 48, 47, 0.1)` |
| Done/tint | `--status-done-tint` | `rgba(163, 217, 165, 0.13)` | `rgba(43, 98, 54, 0.1)` |
| Danger/tint | `--danger-tint` | `rgba(255, 170, 162, 0.12)` | `rgba(168, 48, 47, 0.08)` |
| Danger/text | `--danger-text` | `#ffd6d1` | `#8f2726` |
| Overlay/scrim | `--scrim` | `rgba(6, 8, 7, 0.55)` | `rgba(29, 39, 26, 0.24)` |
| Drawer shadow | `--shadow-drawer` | `0 0 48px rgba(0, 0, 0, 0.5)` | `0 0 48px rgba(29, 39, 26, 0.16)` |
| Popover shadow | `--shadow-pop` | `0 24px 64px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.25), 0 0 0 1px var(--border)` | `0 24px 60px rgba(29, 39, 26, 0.14), 0 4px 12px rgba(29, 39, 26, 0.06), 0 0 0 1px var(--border)` |
| Card shadow | `--shadow-card` | `0 1px 2px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.22)` | `0 1px 2px rgba(29, 39, 26, 0.05), 0 12px 35px rgba(29, 39, 26, 0.05)` |
| Raise shadow | `--shadow-raise` | `0 1px 2px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.04)` | `0 1px 3px rgba(29, 39, 26, 0.1), 0 0 0 1px rgba(29, 39, 26, 0.04)` |
| Canvas glow | `--canvas-glow` | `none` | — |

### Geist and Aurora palettes

`settings.palette` (`loom` default, `geist`, `aurora`) is written as `data-palette`. The two opt-in
palettes override Loom in `[data-theme][data-palette]` blocks of `src/styles.css`; a — means the
token keeps its Loom value for that theme. A stored palette value Herdloom does not know (such as
upstream's `amber`, `report` or `charcoal`) falls back to Loom.

- **Geist** mirrors Fileloom's classic Dark app theme: a near-black canvas, zinc text and Vercel
  blue for the user's action. Agent states use purple (working), red and green, never blue. It has
  slightly crisper corners (see Radii).
- **Aurora** mirrors Fileloom's premium theme: midnight navy surfaces, a violet action, cyan for
  selection and focus, and a faint aurora light behind the shell. Agent states keep to lavender,
  rose and mint, none of them cyan. Light keeps the hues on lavender paper.

| Token | Geist dark | Geist light | Aurora dark | Aurora light |
|-------|------------|-------------|-------------|--------------|
| `--bg` | `#0a0a0a` | `#f4f4f5` | `#0b1020` | `#f1f2fa` |
| `--bg-panel` | `#111111` | `#ffffff` | `#111827` | `#fbfbff` |
| `--bg-elevated` | `#1a1a1a` | `#f7f7f8` | `#16213a` | `#eef0fa` |
| `--bg-hover` | `#222222` | `#ededef` | `#1e2b49` | `#e6e9f6` |
| `--bg-input` | `#0d0d0d` | `#ffffff` | `#0e1528` | `#ffffff` |
| `--bg-raised` | `#1f1f1f` | `#ffffff` | `#1b2744` | `#ffffff` |
| `--border` | `#27272a` | `#e4e4e7` | `#27324a` | `#dfe3f3` |
| `--border-strong` | `#3f3f46` | `#d4d4d8` | `#3b4d73` | `#c5cbe6` |
| `--text` | `#e4e4e7` | `#18181b` | `#dbe3ff` | `#1e2440` |
| `--text-dim` | `#a1a1aa` | `#52525b` | `#9aaedc` | `#505a80` |
| `--text-strong` | `#f5f5f5` | `#111111` | `#f8fafc` | `#0b1020` |
| `--accent` | `#3291ff` | `#0062d6` | `#38bdf8` | `#0e6e8c` |
| `--accent-tint` | `rgba(0, 112, 243, 0.16)` | `rgba(0, 112, 243, 0.08)` | `rgba(56, 189, 248, 0.14)` | `rgba(14, 110, 140, 0.08)` |
| `--primary` | `#0070f3` | `#0070f3` | `#8b5cf6` | `#6d3fe6` |
| `--primary-hover` | `#1a7ffa` | `#0062d6` | `#9d74f8` | `#5b2fd4` |
| `--primary-text` | `#ffffff` | `#ffffff` | `#ffffff` | `#ffffff` |
| `--primary-tint` | `rgba(0, 112, 243, 0.18)` | `rgba(0, 112, 243, 0.1)` | `rgba(139, 92, 246, 0.22)` | `rgba(109, 63, 230, 0.1)` |
| `--focus` | `#3291ff` | `#0070f3` | `#38bdf8` | `#0e7fa3` |
| `--status-idle` | `#a1a1aa` | `#52525b` | `#9aaedc` | `#505a80` |
| `--status-working` | `#b9a2fb` | `#6d28d9` | `#c4b5fd` | `#6a35d0` |
| `--status-blocked` | `#ff7a7f` | `#b41c24` | `#fda4af` | `#b4183d` |
| `--status-done` | `#4fd69c` | `#0f6a40` | `#6ee7b7` | `#03644a` |
| `--status-working-tint` | `rgba(139, 92, 246, 0.16)` | `rgba(109, 40, 217, 0.09)` | `rgba(167, 139, 250, 0.16)` | `rgba(124, 58, 237, 0.09)` |
| `--status-blocked-tint` | `rgba(255, 99, 105, 0.14)` | `rgba(196, 35, 43, 0.09)` | `rgba(251, 113, 133, 0.14)` | `rgba(190, 18, 60, 0.08)` |
| `--status-done-tint` | `rgba(62, 207, 142, 0.13)` | `rgba(18, 117, 72, 0.09)` | `rgba(52, 211, 153, 0.13)` | `rgba(4, 120, 87, 0.09)` |
| `--danger-tint` | `rgba(255, 99, 105, 0.12)` | `rgba(196, 35, 43, 0.08)` | `rgba(251, 113, 133, 0.12)` | `rgba(190, 18, 60, 0.07)` |
| `--danger-text` | `#ffd5d7` | `#a01c23` | `#ffd6dc` | `#9f1239` |

Overlays and the canvas glow:

| Token | Geist dark | Geist light | Aurora dark | Aurora light |
|-------|------------|-------------|-------------|--------------|
| `--scrim` | `rgba(0, 0, 0, 0.6)` | `rgba(17, 17, 17, 0.3)` | `rgba(2, 6, 23, 0.7)` | `rgba(11, 16, 32, 0.28)` |
| `--shadow-drawer` | — | — | `0 0 48px rgba(2, 6, 23, 0.7)` | `0 0 48px rgba(30, 36, 64, 0.16)` |
| `--shadow-pop` | — | — | `0 24px 64px rgba(2, 6, 23, 0.65), 0 0 0 1px var(--border), 0 0 48px rgba(6, 182, 212, 0.06)` | `0 24px 60px rgba(30, 36, 64, 0.14), 0 4px 12px rgba(30, 36, 64, 0.06), 0 0 0 1px var(--border)` |
| `--shadow-card` | `0 1px 2px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(0, 0, 0, 0.3)` | — | `0 1px 2px rgba(2, 6, 23, 0.5), 0 10px 30px rgba(2, 6, 23, 0.4)` | `0 1px 2px rgba(30, 36, 64, 0.05), 0 12px 35px rgba(30, 36, 64, 0.06)` |
| `--shadow-raise` | — | — | `0 1px 2px rgba(2, 6, 23, 0.6), inset 0 1px 0 rgba(199, 210, 254, 0.06)` | `0 1px 3px rgba(30, 36, 64, 0.1), 0 0 0 1px rgba(30, 36, 64, 0.04)` |
| `--canvas-glow` | — | — | `radial-gradient(60% 50% at 0% 0%, rgba(139, 92, 246, 0.12), transparent 70%), radial-gradient(50% 40% at 100% 0%, rgba(6, 182, 212, 0.08), transparent 70%)` | `radial-gradient(60% 50% at 0% 0%, rgba(139, 92, 246, 0.07), transparent 70%), radial-gradient(50% 40% at 100% 0%, rgba(6, 182, 212, 0.06), transparent 70%)` |

### Terminal theme

xterm.js reads a JavaScript theme, so `src/lib/settings.ts` `terminalTheme()` (`TERMINAL_THEMES`)
mirrors these four CSS tokens verbatim for each resolved theme and palette (`settings.test.ts`
checks the match). The xterm keys are `background`, `foreground`, `cursor` and
`selectionBackground`.

| Palette | Theme | `--term-bg` | `--term-fg` | `--term-cursor` | `--term-selection` |
|---|---|---|---|---|---|
| Loom | Dark | `#171918` | `#dfe2dc` | `#eceee9` | `#2f3d55` |
| Loom | Light | `#fbfbfa` | `#2b2d2a` | `#20211f` | `#d6e2f7` |
| Geist | Dark | `#111111` | `#e4e4e7` | `#3291ff` | `#10345f` |
| Geist | Light | `#ffffff` | `#18181b` | `#0070f3` | `#cfe3ff` |
| Aurora | Dark | `#111827` | `#dbe3ff` | `#38bdf8` | `#27406b` |
| Aurora | Light | `#fbfbff` | `#1e2440` | `#0e6e8c` | `#d9e4fb` |

The PWA `<meta name="theme-color">` (`THEME_COLOR`) follows `--bg-panel` for the same pairs.

### Rules
- Ink is the one chrome color. In Loom, accent (selected, informational) and primary (the user's
  action: Send, New session, primary buttons) are both ink. Geist and Aurora keep the same split:
  accent marks (Geist blue, Aurora cyan) and primary acts (Vercel blue, Aurora violet). Agent
  states never take the palette's accent hue.
- Focus is its own token, `--focus`, never `--accent`: Fileloom's blue in Loom and Geist, cyan in
  Aurora.
- Agent state is always written as a label as well as colored. Unknown uses dim text and a dashed
  edge rather than inventing a fifth state color.
- Tints are named tokens; components do not introduce ad hoc translucent state colors.
- `theme: "system"` follows `prefers-color-scheme`; `src/lib/settings.ts` writes the resolved
  `data-theme`, `color-scheme`, and matching PWA `<meta name="theme-color">`.

## 3. Typography

Geist and Geist Mono are bundled as `Geist Variable` and `Geist Mono Variable` from
`@fontsource-variable/geist` and `@fontsource-variable/geist-mono` (imported in `src/main.tsx`),
split by unicode-range so a browser fetches only the scripts on screen. Hangul and other scripts
fall through to the system fonts and Pretendard in `--font-ui`.

### Scale

| Level | Token | Comfortable | Compact | Typical use |
|-------|-------|-------------|---------|-------------|
| Micro | `--fs-2xs` | `11px` | `10px` | Badges, hints, kbd, field labels, menu headings |
| Meta | `--fs-xs` | `12px` | `11px` | Subtitles |
| Small | `--fs-sm` | `13px` | `12px` | Controls, row titles, sidebar brandline |
| Body | `--fs-md` | `14px` | `13px` | Body and dialog copy |
| Large | `--fs-lg` | `16px` | `15px` | Header title and brand |
| Display | `--fs-xl` | `18px` | `17px` | Modal title, Markdown h1 |
| Input | `--fs-input` | `16px` | `16px` | Mobile-safe text input |

| Token | Value | Usage |
|-------|-------|-------|
| `--font-ui` | `"Geist Variable", -apple-system, BlinkMacSystemFont, "Pretendard Variable", Pretendard, "Segoe UI", Roboto, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif` | Chrome and chat prose |
| `--font-mono` | `"Symbols Nerd Font Mono", "Geist Mono Variable", ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, "D2Coding", monospace` | Paths, keys, terminal-adjacent metadata |
| `--lh-tight` | `1.2` | Titles |
| `--lh-base` | `1.5` comfortable / `1.45` compact | Body copy |
| `--fw-regular` | `400` | Body |
| `--fw-medium` | `500` | Controls |
| `--fw-semibold` | `600` | Labels, titles, the chosen option |
| `--fw-bold` | `650` | Brand |
| `--tracking-tight` | `-0.02em` | Primary and modal titles |
| `--tracking-display` | `-0.035em` | Brand name (header and sidebar brandline) |
| `--tracking-caps` | `0.06em` | Uppercase operational labels |
| `--tracking-overline` | `0.12em` | Field labels and menu headings (uppercase overlines) |

### Settings
- `theme`: `dark`, `light`, or `system`; default `dark`.
- `palette`: `loom`, `geist` or `aurora`; default `loom`.
- `density`: `comfortable` or `compact`; default `comfortable`.
- Terminal font size is independent: default `13px`, clamped to `10–22px`.
- Terminal and chat font families are comma-separated lists, default empty. They go in front of the
  terminal's built-in fonts (after the bundled Symbols Nerd Font Mono, which only draws icons) and of
  `--font-ui` in the chat's prose (as `--font-chat`), never in place of them; code in the chat keeps
  `--font-mono`. At most 200 characters, with `;`, `{`, `}`, `<`,
  `>`, `\` and control characters stripped and names with spaces quoted.
- Composer Enter behavior and folded thinking visibility are preferences, not typography tokens.
- All settings share one sanitized `localStorage["herdr-web-ui:settings"]` record.

## 4. Spacing & Layout

### Base unit

All spacing derives from a 4px base.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `4px` | Tight icon and control gaps |
| `--space-2` | `8px` | Row and menu gaps |
| `--space-3` | `12px` | Control padding |
| `--space-4` | `16px` | Section and modal padding |
| `--space-5` | `20px` | Wide modal padding |
| `--space-6` | `24px` | Card breathing room |
| `--space-8` | `32px` | Large separation |

### Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Chips and inner controls |
| `--radius-md` | `9px` | Buttons, inputs, selected rows |
| `--radius-lg` | `12px` | Menus and chat surfaces |
| `--radius-xl` | `18px` | Modals, composer and the user's chat turn |
| `--radius-pill` | `999px` | Pills and dots |

The Geist palette (`[data-palette="geist"]`, either theme) is slightly crisper: `--radius-sm/md/lg/xl`
= `5/7/10/14px`. Loom and Aurora use the values above.

### Sizes

Comfortable values are `:root`; the final column is the complete compact override set.

| Token | Comfortable | Compact | Usage |
|-------|-------------|---------|-------|
| `--header-h` | `56px` | `46px` | App header |
| `--sidebar-w` | `320px` | `300px` | Sidebar/drawer |
| `--control-h` | `36px` | `32px` | Buttons and fields |
| `--touch-target` | `44px` | — | Coarse-pointer minimum |
| `--keybar-h` | `48px` | — | Terminal key bar |
| `--row-h` | `56px` | `44px` | Roster and palette rows |
| `--chip-h` | `20px` | `18px` | Badge/pill height |
| `--icon-size` | `18px` | — | Standard icon |
| `--mark-size` | `26px` | — | Header brand mark |
| `--avatar-size` | `32px` | `26px` | Roster mark box |
| `--dot-size` | `7px` | — | Connection dot |
| `--rail-w` | `3px` | — | Selected-row rail |
| `--hairline` | `1px` | — | Borders |
| `--content-w` | `820px` | — | Chat/settings content |
| `--palette-w` | `640px` | — | Command palette |
| `--palette-top` | `12vh` | — | Palette top offset |

### Focus and layers

| Token | Value | Usage |
|-------|-------|-------|
| `--ring` | `2px solid var(--focus)` | Global `:focus-visible` outline |
| `--ring-offset` | `2px` | Outline offset |
| `--z-banner` | `5` | Terminal banners |
| `--z-popover` | `10` | Composer completions |
| `--z-scrim` | `15` | Mobile drawer scrim |
| `--z-drawer` | `20` | Mobile drawer |
| `--z-modal` | `30` | Dialog and palette scrims |
| `--z-droplet` | `40` | In-app alert, over dialogs |

### In-app alert

One set for both themes: the card is island black wherever it shows.

| Token | Value | Usage |
|-------|-------|-------|
| `--droplet-bg` | `#000` | Drop, anchor and card |
| `--droplet-text` | `#f5f5f7` | Pane name |
| `--droplet-text-dim` | `rgba(245, 245, 247, 0.62)` | Ended detail, blank mark |
| `--droplet-blocked` | `#ff8a80` | Needs-input detail and dot |
| `--droplet-done` | `#9fd47a` | Finished detail and dot |
| `--droplet-mark-bg` | `rgba(255, 255, 255, 0.1)` | Agent mark disc |
| `--droplet-ring` | `rgba(255, 255, 255, 0.1)` | Card hairline |
| `--droplet-shadow` | `rgba(0, 0, 0, 0.35)` | Drop shadow under the liquid |

### Shell
- `.app` is a full-viewport column: `.app-header` over `.app-body`; the body is sidebar plus
  `.terminal-host`. While a phone's soft keyboard is up (`data-keyboard`), `--app-height` follows
  `visualViewport` so the keyboard does not cover input; otherwise the shell is `100dvh`, because an
  iPhone home screen app reports a visual viewport shorter than the screen without a keyboard.
- Header anatomy, left to right: mobile drawer toggle / desktop sidebar toggle; flexible context
  title plus PC/workspace/cwd subtitle; segmented Chat/Terminal switch; the connection chip (herdr
  version in its tooltip) and meta actions for palette, notifications, settings and lock. Theme
  lives in Settings and the palette; the herdr version also sits in the sidebar footer.
- The sidebar is fixed-width on desktop and a `<=768px` drawer. The desktop collapse removes its
  column; the drawer uses a scrim and keeps safe-area insets. On touch, a mostly horizontal swipe in
  from the left `24px` edge opens the drawer and a swipe to the left closes it (`56px` of travel).
- The terminal stack contains a positioned terminal surface, then composer or key bar. The xterm
  mount stays alive under the chat lens; changing views never creates a second connection.
- At `<=480px`, labels shed in priority order: version, brand name, context subtitle, connection
  text and desktop-only control labels. Icons and selected context remain.

## 5. Components

### Button (`.btn`, `.icon-button`)
- `.btn` is a medium text control. Variants: neutral, `.btn-primary`, `.btn-danger`, `.btn-ghost`.
  Primary uses `--primary`; danger uses danger tint plus blocked border; ghost removes fill/edge.
- `.icon-button` is a square unlabeled visual control with mandatory `aria-label`; `.is-outlined`
  adds the border. Both families use `--control-h`, `--radius-md`, focus ring, hover and disabled.
- Coarse pointers grow controls to `--touch-target`.

### Segmented control (`.segmented`)
- Fileloom's switch: the group is a soft elevated, bordered track (`3px` padding, `--radius-md`
  + 2px). The one `aria-pressed="true"` option is lifted onto `--bg-raised` with `--shadow-raise`,
  strong text and `--fw-semibold`; the rest stay quiet and take strong text on hover.
- Used for Chat/Terminal, theme and density. It is not a generic tab list.

### Keyboard hint (`.kbd`)
- An inline mono keycap: `18px` high, strong bottom edge, `--radius-sm`, `--fs-2xs`.
- `Mod` resolves to `⌘` on Apple platforms and `Ctrl` elsewhere.

### Modal (`.modal*`)
- `.modal-scrim` centers an `aria-modal` dialog at `--z-modal` and blurs what is behind it
  (`backdrop-filter: blur(6px) saturate(120%)` over `--scrim`); `.modal` is a capped scrollable
  column with header, body and footer and `--shadow-pop`. The title is `--fs-xl` with
  `--tracking-tight` and `--lh-tight`.
- At `<=640px`, it becomes a bottom sheet with top `--radius-xl` corners and safe-area padding.
- Escape, explicit close and scrim click close dialogs; first meaningful control receives focus.

### Field (`.field`, `.input`, `.select`)
- Stacked uppercase overline label (`--fs-2xs`, `--fw-semibold`, `--tracking-overline`), optional
  hint and `--bg-input` field. Desktop fields use `--fs-sm`;
  small-screen fields retain `--fs-input` to avoid focus zoom.
- Focus names the edge with `--focus`; errors use blocked/danger tokens and `role="alert"`.

### Menu / popover (`.menu*`)
- Bordered `--radius-lg` surface with `--shadow-pop`; rows use `--control-h`, `--radius-md`, icon,
  ellipsized main label and optional hint.
- Hover or `aria-selected` uses `--bg-hover`. Headings are dim uppercase micro overlines
  (`--tracking-overline`).

### Pane menu (`.pane-menu`)
- herdr's pane menu as a `.menu` at the pointer, portaled to the body at `--z-modal` and flipped
  inward near the window's edges; 32px rows. The heading is the pane's name as written (no overline
  case). Items: Copy (only with a selection), Rename pane, Split right, Split down, Zoom, the
  `menuitemcheckbox` Send right-clicks to pane (a check when on) and Close pane in
  `--status-blocked`, which arms on the first press (`--danger-tint`, "Click again to close").
- `role="menu"`; the first item takes focus, arrows/Home/End move with wrap, Escape and Tab close,
  and focus returns to what had it. A press outside, a scroll, a resize or leaving the window closes it.
- Rename opens a small `.modal` (`420px`) with the name field. Outcomes and failures use the
  terminal's transient banner pill.

### Badge (`.badge`)
- Agent states read **READY**, **RUN**, **INPUT**, **DONE**; unknown reads **—**.
- Idle is elevated/dim; working, blocked and done use their own tint and text. RUN carries a small
  breathing dot before the word; the word itself never fades.
- The written label and unknown dashed edge keep color from being the only signal.

### Pill (`.pill`)
- Mono metadata at `--chip-h`. The herdr version is a sidebar-footer pill; offline is the one header pill and uses danger tokens.

### Sidebar roster row and footer
- Top bar: **New session** only, the sidebar's one primary action: a full-width solid `--primary`
  button with `--primary-text` and `--fw-semibold`. Search lives in the command palette, not the roster.
- Appearance's **Sidebar grouping** is **By workspace** by default, preserving the original
  workspace headers, folds and merged single-pane rows. **By folder** opts into the grouping below.
  The choice applies immediately and persists in the browser's existing Settings record. Workspace
  and folder fold keys remain independent when switching modes; original workspace keys are retained.
- In folder mode, within each PC, panes with the same full cwd share a folder group, including panes from
  different workspaces. Trailing separators and Windows slash styles are normalized; case and
  symlinks are not resolved. Unknown cwd stays with its workspace rather than merging unrelated sessions.
- Every folder has a caret, folder glyph, basename, full-path subtitle and pane count, even for
  one pane. Its indented contents use the existing spacing and border tokens. Folder folds are
  remembered per PC and path; opening a pane unfolds its folder, but status updates do not.
- Folder order follows the first workspace in server order; workspace handles still reorder
  workspaces, not filesystem directories. Workspace names and rename actions remain inside the group.
- A workspace header shows drag handle, number, editable label, roll-up status and rename action.
  Drag/drop reorders; `Alt+↑/↓` on the handle is the keyboard equivalent.
- Every pane row is two lines: agent/shell mark, then the editable title alone on line one (full
  width), and the status chip followed by workspace and cwd on line two. Mark boxes are neutral;
  the selected row is lifted onto `--bg-raised` with `--shadow-raise` and gets the ink `--accent`
  rail (`--rail-w`, outside the rounded box) and a mark box on `--bg-panel` edged with the accent
  mixed into `--border`. Row actions rename or arm a
  3-second, second-click close. Inline server failures stay beside their row.
- A PC group header is caret, monitor, name, “This PC” for the local machine and a state dot
  (done = connected, working pulse = connecting/reconnecting, blocked = error). Connected says
  nothing more; every other state is written under the name, with the server's error clamped to
  two lines and complete in the tooltip.
- Single-pane workspaces merge their workspace handle into the pane row.
- Footer holds the contextual **Install app** action, Settings with the plan meters beside it,
  and the brandline: the 18px mark and **Herdloom** in `--text-strong`, `--fs-sm`, `--fw-bold`,
  `--tracking-display`, then the herdr version in dim mono `--fs-2xs`.

### Plan meters (`.usage*`)
- Beside Settings, one button holding up to four chips (three and `+N` past that), one per
  account in the user's order: provider mark, mono `--fs-2xs` percent of the limit closest to
  running out (used, or left when Settings says so), and a 2px bar on a `--border-strong` track
  filled to that percent. From 80% used the percent and bar take `--status-blocked`; ink stays
  chrome. A chip whose numbers are stale or missing dims. An account hidden in Settings is
  left out of the strip and the popover; with every account hidden, neither shows.
- The button opens a popover above the footer (`--shadow-pop`, `--radius-lg`), as wide as the
  footer and scrolling past the sidebar's top bar: per account its mark, name and plan pill with
  the email or login right-aligned and ellipsized, then one row per limit (label, reset time, right-aligned percent) over a 4px bar. A problem
  note is dim, red for an expired sign-in or a failed request.

### New session dialog
- Agent select comes from `GET /api/agents`; shell-only is always available. Directory defaults to
  the selected pane cwd and name is an optional workspace label.
- Submit calls `POST /api/workspace/create`; the server performs `workspace.create` and, when an
  agent was chosen, `agent.start` in its root pane. Pending and partial agent-start failure are
  explicit before the created pane opens.

### Header context and connection
- A selected pane shows agent mark + title over workspace + cwd. With no selection, the brand fills
  the context slot.
- The segmented Chat/Terminal view switch lives in the header. There is no floating view-toggle pill.
- Connection is one quiet chip: a dot plus the written live/reconnecting/disconnected state;
  reconnecting pulses the dot. On phones the chip keeps only its dot.

### Chat turn (`.chat-turn`)
- The chat lens is a centered `--content-w` transcript over the still-attached terminal surface.
  Structured Claude/omp transcripts fall back to ANSI-stripped pane scrollback when unavailable.
- The register is Codex / gajae-code-app: a quiet document. User turns are right-aligned neutral
  cards (`--bg-raised` with `--shadow-raise`, hairline edge, `--radius-xl` with a `--radius-sm` tail
  corner, ≤80% wide,
  no avatar or name) and open a new exchange with a hairline above. Assistant turns have no header: the answer is plain prose; a meta row (MD / TXT
  copy, time) fades in on hover (always visible on coarse pointers).
- Markdown supports headings, lists, links, quotes, tables, inline/fenced code and code-copy actions.
  Code blocks never scroll inside: one longer than 30 lines opens at its first 20 behind **Show all N lines**.
  Thinking renders as a folded block only when **Show thinking** is enabled.
- Auto-follow stops when the reader scrolls up; later output raises a **New messages** pill.

### Work block (`.work-block`, `.work-row`)
- One per assistant turn: a `▸ Worked for 7s · 1 edit · 2 commands` header (duration = next turn's
  timestamp minus this one's; "Working…" in `--status-working` behind a breathing dot while the agent runs) over
  one-line rows `▸ [icon] name / summary` in mono, indented under the header; mid-work narration
  sits between rows as dim, one-step-smaller prose. The newest turn opens by default, older ones
  fold. A row expands to the typed input (command, diff, file, checklist, raw) and an Output pane.

### Prompt card (`.prompt-card`)
- Appears in chat while the agent is blocked and the visible pane contains a supported Claude, omp,
  omo or codex question, approval or plan menu.
- A form of several questions (omo) shows a row of step chips (`.prompt-card-steps`) under the
  header: a chip per question, pill-shaped, mono number or a check once answered (`--accent`), the
  one asked now with an `--accent` border, `--accent-tint` fill and a `--primary` number. The title
  then reads `Question 1 of 2`; the review after the last question keeps the chips, all checked.
- Single options submit immediately; multi-select exposes checks plus Submit; supported custom input
  has its own labelled field. The prompt content hash rejects a stale answer with `prompt_changed`.
- Options are full-width rows (`.prompt-card-option`): the menu's number in mono, the label, its
  description under it in `--text-dim`. No option is filled as a default; a checked or typed pick
  gets `--accent-tint` + an `--accent` border. A `(Recommended)` suffix renders as a tag.
- `POST /api/pane/prompt/answer` translates the chosen answer into the agent's navigation keys and
  sends them through herdr `pane.send_keys` / text input. The card never fabricates a chat reply.

### Composer (`.composer`)
- Chat mode is ONE surface: the stack, the transcript and the composer region all sit on `--bg`,
  and the composer column equals the transcript column (`--content-w`, same `--space-4` gutter).
  The only card is the input box: `--bg-raised`, hairline border, `--radius-xl`, `--shadow-card`;
  focus gives it a soft focus-blue edge (border `--focus` mixed 55% into `--border`, plus a 3px
  halo of `--focus` at 14%), with no inner outline. Above it the agent/status line and the
  completion popover; inside, ONE row — attach control | auto-growing textarea | Send / Queue /
  Stop — with the controls bottom-aligned so they stay beside the last line as the box grows;
  the image strip is its own row above that line.
- The status line ends, on fine pointers, with `/` commands and `@` files keycaps (plus `Mod+Enter`
  sends when **Enter sends** is off); the placeholder is just `Message <agent>…`.
- `/` completions come from `GET /api/pane/commands` and group built-in, user and project commands;
  `@` completions query `GET /api/pane/files`. Arrow keys navigate, Enter/Tab accepts, Escape closes.
- Paste, picker or drag/drop accepts up to four png/jpeg/gif/webp files per action. Each gets a local
  preview, uploads through `POST /api/pane/image`, and inserts a removable editable `@path` mention.
- While a phone's keyboard is up, a tap on the transcript or a drag down it (`32px`) puts the
  keyboard away. Each only blurs the field, so the draft stays.
- On a touch screen, picking a pane (drawer, palette, notification) or switching its lens never
  raises the keyboard: the user reads first, and a tap on the message box or the grid raises it.
  A desktop's picked pane takes typing at once.
- Enter sends and Shift+Enter breaks by default; with **Enter sends** off, Mod+Enter sends. IME Enter
  is ignored. While working, Stop sends Escape and Queue stores the next message.

### Voice input
- A mic button sits beside Attach in the composer and beside Send in the terminal input line; it
  fills with `--accent` while recording. Dictated text is inserted at the caret, never sent.
- The recording pill shows Cancel, a **Recording** label, the level bars, a mono timer and Done.
  Accent only; `--danger` stays for errors.

### Command palette
- `Mod+Shift+K` opens a top-offset `--palette-w` dialog searching panes and actions. Recent panes
  lead an empty query; arrows cycle, Enter activates and Escape closes.
- Actions cover new session, lens/sidebar/theme, settings, notifications, lock and refresh, with
  `.kbd` hints where a global shortcut exists.

### Settings dialog
- Appearance: Dark / Light / System, Colors, Comfortable / Compact, terminal font `10–22px`,
  terminal font family.
- Colors is Fileloom's theme picker (`.palette-picker`, three 96px columns): per palette a small
  page previewing its canvas, raised surface, text, action and selection colors, then its name
  (**Loom**, **Geist**, **Aurora**) and a round tick. The chosen card's preview takes a
  `--text-strong` ring, its name `--fw-semibold`, and its tick fills with `--primary` and shows ✓.
  The preview hexes in `SettingsDialog.css` mirror the palette blocks of `src/styles.css`.
- Composer: Enter sends. Chat: Show thinking, chat font size and family. Shortcuts: the complete
  platform-resolved table.
- A font family is a text field saved when it is left, on Enter or when the dialog closes, not
  per keystroke.
- Install reflects installed, promptable or browser-instructions state; About links the repository
  (beefiker/herdloom) and credits herdr web ui.
- Subscription usage: the on switch with one description, then (when on) Used / Remaining and one
  hairline card of accounts (`.usage-accounts`, `--radius-md`): an uppercase `--bg-elevated` header
  with **Nearest limit first** at its right once the user has ordered, then one 38px row per account
  (mark, name, dim ellipsized email, then 28px move-up, move-down and eye controls in fixed columns;
  a move that cannot happen keeps its column but is not shown). A hidden account's row fades and
  its eye closes; it stays listed so it can be shown again.

### Terminal host, key bar and drawer
- xterm has `scrollback: 0`; wheel/touch gestures reach herdr's alternate-screen scrollback. The
  mount clips its own gutter and hides the unused xterm scrollbar.
- Terminal banners stack top-right for ended, reconnecting, observe and held-draft review states.
- The mobile key bar is Esc, Tab, one-shot Ctrl, arrows and `^C`; it never steals xterm focus.
- The mobile drawer slides over a scrim. Closed visibility removes its controls from the tab order.

### In-app alert
- While the app is on screen, a pane that needs input, finishes a turn (by the device's Finished
  choice) or ends drops a card from the top edge: a black drop falls from above the safe area,
  spreads into the card, and its text shows. It hangs from `env(safe-area-inset-top)` only, so a
  Dynamic Island, a notch and a desktop window take the same path; no device is guessed.
- One at a time; a newer one folds the current one away first. Tap opens the pane; a drag or flick
  up puts it away; it leaves by itself 3.6s after its text shows, and waits while touched.
- Not for the pane already open, and not while the app is hidden (system notifications cover that).
- Reduced motion: it fades in and out where it rests, without falling or spreading.

### Token gate
- A centered password card replaces the entire shell while authentication is required. It has a real
  label, autofocused field, primary Unlock button and linked alert text.
- Success mounts the shell; Lock unsubscribes push, deletes auth and returns to the gate.

### Role (no control surface)
- `interact` types and resizes; `observe` does neither. The server enforces both and the WS protocol
  carries `role` / `role-ack`.
- The app connects as `interact` and exposes no role switch. An observe acknowledgement still gates
  local input, adopts server geometry and displays the view-only banner.

## 6. Motion & Interaction

### Timing

| Type | Token | Value | Usage |
|------|-------|-------|-------|
| Micro | `--dur-fast` | `120ms` | Hover, active, toggle and control state |
| Standard | `--dur-base` | `200ms` | Drawer slide; reserved dialog timing token |
| Pulse | `--dur-pulse` | `1600ms` | Working and reconnecting dots (trough opacity 0.35; text never pulses) |
| Easing | `--ease-out` | `cubic-bezier(0.2, 0, 0, 1)` | Finite transitions |
| Pulse easing | `--ease-pulse` | `steps(2, jump-none)` | Endless working and reconnecting dots; avoids drawing every display refresh |
| Spring easing | `--ease-spring` | `cubic-bezier(0.32, 0.72, 0, 1)` | Voice recording pill enter (180ms, scale 0.96->1 + opacity, from the mic button) and exit (120ms) |

### Rules
- Only state changes move: hover/press, the drawer, settings switches, working and reconnecting.
- Dialogs and their scrims snap open and closed; they have no entrance or exit animation. On mobile,
  their static layout changes to a bottom sheet.
- The voice recording waveform is the one surface allowed to draw every frame: only while
  recording, driven by the live microphone level, transform-only (`scaleY` on 7 bars). The pill is
  a state change, not a dialog, so the snap rule above does not apply to it.
- `prefers-reduced-motion: reduce` removes pulses, drawer/control transitions, smooth chat scrolling
  and settings toggle motion. State remains legible without animation.
- Under reduced motion the voice pill swaps its bars for one level bar updated at 4 Hz and drops
  the ring and the morph; the **Recording** label and the timer stay.

## 7. Depth & Surface

### Strategy

**Tonal shift + hairline, with shadow reserved for overlays and the raised panel.** Resting shell
surfaces have no shadow; the one lifted surface is `--bg-raised` with `--shadow-raise`.

| Type | Value | Usage |
|------|-------|-------|
| Hairline | `var(--hairline) solid var(--border)` | Shell, fields, controls |
| Strong edge | `var(--border-strong)` | Hover/focus separation |
| Dashed edge | `var(--hairline) dashed var(--border)` | Unknown/empty states |
| Tonal lift | `--bg-elevated` on `--bg-panel` | Chips, tracks |
| Raised panel | `--bg-raised` + `--shadow-raise` | Selected row, chosen segment, pressed icon button, user's chat turn |
| Tinted lift | Named tint over an opaque surface | Primary and agent states |
| Drawer shadow | `--shadow-drawer` | Mobile drawer |
| Overlay shadow | `--shadow-pop` | Menus, palette and modal cards |
| Card shadow | `--shadow-card` | The composer's input box — the one resting card in chat mode |
| Canvas glow | `--canvas-glow` under `--bg-panel` | Header and sidebar (Aurora only; `none` elsewhere) |

## 8. Brand

### Mark
- Fileloom's icon grammar: an ink tile with `256/1024` rounded corners carrying a 2×2 grid of
  `228` tiles (`76` corners). Three are solid (top left, bottom left, bottom right); the top-right
  one is drawn as an outlined pane (`28` stroke) holding a `>_` prompt, where Fileloom's outline is
  a page with a folded corner.
- One geometry on a 1024 grid, in `src/lib/brandMark.ts`, serves the in-app mark and every
  exported icon.
- `BrandMark.tsx` draws the tile in `currentColor` (`--text-strong`) with the glyph in
  `--bg-panel`, so it follows every palette and theme; it is decorative (`aria-hidden`), the name
  sits beside it. The header shows it at `--mark-size` beside **Herdloom** (`--fs-lg`,
  `--fw-bold`, `--tracking-display`); the sidebar brandline shows it at 18px.

### Icons
- `bun scripts/generate-brand.ts` rasterises the mark with resvg (`@resvg/resvg-js`): the exported
  `docs/brand/herdloom-mark.svg`, white glyph on black for the app icons (rounded) and maskable /
  Apple touch icons (full bleed), the cropped white-on-transparent notification badge, the favicons
  and the 1280 × 640 social preview on Fileloom paper. See `docs/brand/README.md`.

## 9. Accessibility Constraints & Accepted Debt

### Constraints
- WCAG 2.2 AA is the target; do not document numeric contrast without measuring both shipped themes
  and every actual backing surface.
- Global `:focus-visible` uses `--ring`; interactive controls remain keyboard reachable except the
  touch key bar, which intentionally preserves terminal focus and has hardware-key equivalents.
- Icon-only controls carry `aria-label`; toggles expose `aria-pressed` or `role="switch"`; selected
  pane exposes `aria-current`; dialogs expose `role="dialog"` and `aria-modal`.
- Status, loading and composer progress use `role="status"`; failures use `role="alert"`. Agent state
  is text plus color, and unknown adds a dashed edge.
- Touch targets grow to `--touch-target`; fields stay `--fs-input` where mobile zoom is a risk.
- `prefers-reduced-motion` is honored. Lucide/inline SVG decoration is hidden from assistive tech.
- Global shortcuts use the convention **Mod+Shift+key**: Mod is Command on Apple platforms and Ctrl
  elsewhere. The settings table is the discoverable source of the complete mapping.
- `document.title` is `<pane title> · Herdloom` while selected, otherwise `Herdloom`.

### Accepted debt

| Item | Location | Why accepted | Exit |
|------|----------|--------------|------|
| Terminal content accessibility relies on xterm defaults | `PaneTerminal.tsx` | Screen-reader mode changes terminal DOM and input behavior | Decide with herdr TUI owners |
| Drawer has no focus trap | `.sidebar.is-open` | Closed state leaves the tab order, but open-state trapping is not implemented | Add a shared focus utility |
| Modal focus is initialized, not fully trapped | Dialog components | Escape/scrim/close work; tab containment is not shared | Add the same focus utility |
| Terminal colors exist in CSS and JavaScript | `styles.css`, `settings.ts` | xterm consumes a JS theme | Keep `terminalTheme()` verbatim with `--term-*` |
