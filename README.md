# Herdloom

Herdloom is a browser and phone client for [herdr](https://github.com/herdrdev/herdr), restyled with the Fileloom design system. Chat with your coding agents, answer their prompts, and use the live herdr terminals from any browser or your phone.

Herdloom is a fork of [herdr web ui](https://github.com/devswha/herdr-web-ui) by devswha.

## install

```bash
curl -fsSL https://beefiker.github.io/herdloom/install.sh | sh
```

Linux (x64, arm64) or macOS. Installs missing herdr 0.9.0+, Bun 1.4+ and Node 18+ for your user, then installs Herdloom as a herdr plugin. With the default listen address and Tailscale running, it also prints a tailnet address and QR code for your phone.

Already have the prerequisites? Install just the plugin:

```bash
herdr plugin install beefiker/herdloom
```

With herdr running, open **[localhost:7317](http://localhost:7317)**. The server listens on `127.0.0.1` by default; see the [user guide](docs/guide.md) for phone setup, access and safety, and configuration. Coding agents helping with an install should follow [INSTALL.md](INSTALL.md).

## development

```bash
git clone https://github.com/beefiker/herdloom.git
cd herdloom
bun install

bun run server      # API + WebSocket on :7317
bun run dev         # Vite on :5173; run in a second terminal
```

```bash
bun run typecheck
bun run test:unit   # no herdr needed
bun test           # isolated herdr test session
bun run test:ui    # browser regression checks
```

See [DESIGN.md](DESIGN.md) for UI conventions.

## credits and license

Based on [herdr web ui](https://github.com/devswha/herdr-web-ui) by devswha. Built on [herdr](https://github.com/herdrdev/herdr), [xterm.js](https://xtermjs.org), [React](https://react.dev), [Bun](https://bun.sh) and [Lucide](https://lucide.dev).

[MIT](LICENSE). Copyright © 2026 devswha; Herdloom modifications © 2026 beefiker.
