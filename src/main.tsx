import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Geist and Geist Mono (Fileloom's UI fonts), split by unicode-range: a browser fetches only
// the scripts on screen, and Hangul falls through to the system font in --font-ui
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
// styles.css first: it holds the primitives (.btn, .input, .menu…) that component
// stylesheets override, and Vite emits CSS in import order
import "./styles.css";
import "katex/dist/katex.min.css";
import { App } from "./App.tsx";
import { SettingsProvider } from "./lib/settings.ts";
import "./lib/viewport.ts";

const container = document.getElementById("root");
if (!container) throw new Error("#root is missing from index.html");

createRoot(container).render(
  <StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </StrictMode>,
);
