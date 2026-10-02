import { useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Check, Columns2, Copy, Maximize2, MousePointerClick, Pencil, Rows2, X } from "lucide-react";

import "./PaneMenu.css";

import { useMachineApi } from "../lib/machineContext.tsx";
import { useT } from "../lib/i18n.ts";

export interface PaneMenuProps {
  paneId: string;
  /** the label the pane carries itself; "" while herdr names it after what runs in it */
  label: string;
  /** what the menu's heading calls the pane */
  title: string;
  /** where the right-click landed, in viewport pixels */
  at: { x: number; y: number };
  /** text selected where the click landed, offered as Copy */
  selection: string | null;
  /** an unmodified right-click on the grid goes to the pane's mouse-reporting app */
  rightClickToPane: boolean;
  onRightClickChange: (toPane: boolean) => void;
  onCopy: (text: string) => void;
  /** the pane a split made: the app selects it */
  onSplit: (paneId: string) => void;
  /** an outcome or a failure worth a word, for the terminal's status pill */
  onNote: (note: string) => void;
  onDismiss: () => void;
}

const ITEM_SELECTOR = "[role^='menuitem']";
/** Space kept between the menu and the window's edges. */
const EDGE = 8;

function reasonText(reason: unknown): string {
  return reason instanceof Error ? reason.message : String(reason);
}

/**
 * herdr's pane menu, opened by a right-click on the pane: rename, split, zoom, where
 * right-clicks go, close. Each runs herdr's own pane command, so the TUI and every other
 * client see it too.
 */
export function PaneMenu({ paneId, label, title, at, selection, rightClickToPane, onRightClickChange, onCopy, onSplit, onNote, onDismiss }: PaneMenuProps) {
  const t = useT();
  const { closePane, renamePane, setPaneRightClick, splitPane, zoomPane } = useMachineApi();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [place, setPlace] = useState<{ left: number; top: number } | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(label);
  const [armed, setArmed] = useState(false);
  const titleId = useId();

  // focus goes back where it was (the terminal's input, usually) once the menu is gone
  useEffect(() => {
    const opener = document.activeElement;
    return () => {
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

  // measured before paint: a click near the right or bottom edge opens the menu toward the inside
  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (menu === null) return;
    const { width, height } = menu.getBoundingClientRect();
    setPlace({
      left: at.x + width + EDGE > window.innerWidth ? Math.max(EDGE, at.x - width) : at.x,
      top: at.y + height + EDGE > window.innerHeight ? Math.max(EDGE, at.y - height) : at.y,
    });
  }, [at.x, at.y]);

  // a hidden element takes no focus: the first item gets it once the menu shows
  const placed = place !== null;
  useLayoutEffect(() => {
    if (placed) menuRef.current?.querySelector<HTMLElement>(ITEM_SELECTOR)?.focus({ preventScroll: true });
  }, [placed]);

  // a press elsewhere, a scroll, a resize or leaving the window closes it, as a native menu does
  useEffect(() => {
    if (renaming) return;
    const outside = (event: Event): void => {
      if (!(event.target instanceof Node) || !menuRef.current?.contains(event.target)) onDismiss();
    };
    document.addEventListener("pointerdown", outside, true);
    document.addEventListener("scroll", outside, true);
    window.addEventListener("resize", onDismiss);
    window.addEventListener("blur", onDismiss);
    return () => {
      document.removeEventListener("pointerdown", outside, true);
      document.removeEventListener("scroll", outside, true);
      window.removeEventListener("resize", onDismiss);
      window.removeEventListener("blur", onDismiss);
    };
  }, [onDismiss, renaming]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Escape" || event.key === "Tab") {
      event.preventDefault();
      event.stopPropagation();
      onDismiss();
      return;
    }
    const items = [...(menuRef.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? [])];
    const current = items.findIndex((item) => item === document.activeElement);
    const next = event.key === "ArrowDown" ? current + 1
      : event.key === "ArrowUp" ? current - 1
      : event.key === "Home" ? 0
      : event.key === "End" ? items.length - 1
      : null;
    if (next === null || items.length === 0) return;
    event.preventDefault();
    event.stopPropagation();
    items[(next + items.length) % items.length]?.focus();
  };

  // the menu closes at once; herdr's answer arrives after it
  const run = (action: () => Promise<void>): void => {
    onDismiss();
    void action();
  };

  const split = (direction: "right" | "down"): void => run(async () => {
    try {
      onSplit(await splitPane(paneId, direction));
    } catch (reason) {
      onNote(t("Split failed: {reason}", { reason: reasonText(reason) }));
    }
  });

  const zoom = (): void => run(async () => {
    try {
      const result = await zoomPane(paneId);
      onNote(!result.changed ? t("This pane is alone in its tab: nothing to zoom") : t(result.zoomed ? "Zoomed in herdr" : "Zoom off in herdr"));
    } catch (reason) {
      onNote(t("Zoom failed: {reason}", { reason: reasonText(reason) }));
    }
  });

  const toggleRightClick = (): void => run(async () => {
    const toPane = !rightClickToPane;
    try {
      await setPaneRightClick(paneId, toPane ? "pane" : "herdr");
      onRightClickChange(toPane);
      onNote(t(toPane ? "Right-clicks go to the app in this pane when it reads the mouse. Alt/⌥+right-click opens this menu." : "Right-clicks open the pane menu again"));
    } catch (reason) {
      onNote(t("Couldn't change where right-clicks go: {reason}", { reason: reasonText(reason) }));
    }
  });

  const close = (): void => {
    // a second press closes, as the sidebar's close button asks for
    if (!armed) {
      setArmed(true);
      return;
    }
    run(async () => {
      try {
        await closePane(paneId);
        // herdr can hand a closed pane's id to a new pane, which starts with its menu
        onRightClickChange(false);
      } catch (reason) {
        onNote(t("Close failed: {reason}", { reason: reasonText(reason) }));
      }
    });
  };

  const rename = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const next = name.trim();
    onDismiss();
    if (next === label) return;
    void renamePane(paneId, next).catch((reason: unknown) => onNote(t("Rename failed: {reason}", { reason: reasonText(reason) })));
  };

  if (renaming) {
    return createPortal(
      <div className="modal-scrim" onMouseDown={(event) => event.target === event.currentTarget && onDismiss()}>
        <form className="modal pane-rename-modal" role="dialog" aria-modal="true" aria-labelledby={titleId} onSubmit={rename}
          onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); onDismiss(); } }}>
          <header className="modal-header">
            <h2 className="modal-title" id={titleId}>{t("Rename pane")}</h2>
          </header>
          <div className="modal-body">
            <label className="field">
              <span className="field-label">{t("Pane name")}</span>
              <input className="input" autoFocus autoComplete="off" value={name} placeholder={title} onFocus={(event) => event.currentTarget.select()} onChange={(event) => setName(event.target.value)} />
              <span className="field-hint">{t("Leave it empty and herdr names the pane after what runs in it")}</span>
            </label>
          </div>
          <footer className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onDismiss}>{t("Cancel")}</button>
            <button type="submit" className="btn btn-primary">{t("Rename")}</button>
          </footer>
        </form>
      </div>,
      document.body,
    );
  }

  // in the body: an ancestor's transform or overflow can neither move nor clip it
  return createPortal(
    <div
      ref={menuRef}
      className="menu pane-menu"
      role="menu"
      aria-label={t("Pane menu")}
      style={{ left: place?.left ?? at.x, top: place?.top ?? at.y, visibility: place === null ? "hidden" : undefined }}
      onKeyDown={onKeyDown}
      onContextMenu={(event) => event.preventDefault()}
    >
      <div className="menu-heading pane-menu-title" title={title}>{title}</div>
      {selection !== null && <>
        <button type="button" role="menuitem" className="menu-item" onClick={() => { onCopy(selection); onDismiss(); }}>
          <Copy aria-hidden="true" /><span className="menu-item-main">{t("Copy")}</span>
        </button>
        <div className="pane-menu-separator" role="separator" />
      </>}
      <button type="button" role="menuitem" className="menu-item" onClick={() => setRenaming(true)}>
        <Pencil aria-hidden="true" /><span className="menu-item-main">{t("Rename pane")}</span>
      </button>
      <button type="button" role="menuitem" className="menu-item" onClick={() => split("right")}>
        <Columns2 aria-hidden="true" /><span className="menu-item-main">{t("Split right")}</span>
      </button>
      <button type="button" role="menuitem" className="menu-item" onClick={() => split("down")}>
        <Rows2 aria-hidden="true" /><span className="menu-item-main">{t("Split down")}</span>
      </button>
      <button type="button" role="menuitem" className="menu-item" onClick={zoom}>
        <Maximize2 aria-hidden="true" /><span className="menu-item-main">{t("Zoom")}</span>
      </button>
      <div className="pane-menu-separator" role="separator" />
      <button type="button" role="menuitemcheckbox" aria-checked={rightClickToPane} className="menu-item" onClick={toggleRightClick}>
        <MousePointerClick aria-hidden="true" /><span className="menu-item-main">{t("Send right-clicks to pane")}</span>
        {rightClickToPane && <Check className="pane-menu-check" aria-hidden="true" />}
      </button>
      <div className="pane-menu-separator" role="separator" />
      <button type="button" role="menuitem" className={`menu-item pane-menu-close${armed ? " is-armed" : ""}`} onClick={close}>
        <X aria-hidden="true" /><span className="menu-item-main">{t(armed ? "Click again to close" : "Close pane")}</span>
      </button>
    </div>,
    document.body,
  );
}
