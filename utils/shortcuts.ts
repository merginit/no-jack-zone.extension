export interface ProtectedShortcut {
  id: string
  key: string
  modifiers: { ctrl?: boolean; alt?: boolean; shift?: boolean; meta?: boolean }
  label: string
  category: "navigation" | "editing" | "browser"
}

export const protectedShortcuts: ProtectedShortcut[] = [
  { id: "ctrl-f", key: "f", modifiers: { ctrl: true }, label: "Find", category: "browser" },
  { id: "ctrl-g", key: "g", modifiers: { ctrl: true }, label: "Find Next", category: "browser" },
  { id: "ctrl-c", key: "c", modifiers: { ctrl: true }, label: "Copy", category: "editing" },
  { id: "ctrl-v", key: "v", modifiers: { ctrl: true }, label: "Paste", category: "editing" },
  { id: "ctrl-x", key: "x", modifiers: { ctrl: true }, label: "Cut", category: "editing" },
  { id: "ctrl-a", key: "a", modifiers: { ctrl: true }, label: "Select All", category: "editing" },
  { id: "ctrl-z", key: "z", modifiers: { ctrl: true }, label: "Undo", category: "editing" },
  { id: "ctrl-y", key: "y", modifiers: { ctrl: true }, label: "Redo", category: "editing" },
  { id: "alt-left", key: "ArrowLeft", modifiers: { alt: true }, label: "Back", category: "navigation" },
  { id: "alt-right", key: "ArrowRight", modifiers: { alt: true }, label: "Forward", category: "navigation" },
  { id: "ctrl-s", key: "s", modifiers: { ctrl: true }, label: "Save Page", category: "browser" },
  { id: "ctrl-p", key: "p", modifiers: { ctrl: true }, label: "Print", category: "browser" },
  { id: "ctrl-w", key: "w", modifiers: { ctrl: true }, label: "Close Tab", category: "browser" },
  { id: "ctrl-t", key: "t", modifiers: { ctrl: true }, label: "New Tab", category: "browser" },
  { id: "ctrl-n", key: "n", modifiers: { ctrl: true }, label: "New Window", category: "browser" },
  { id: "ctrl-r", key: "r", modifiers: { ctrl: true }, label: "Reload", category: "browser" },
  { id: "ctrl-l", key: "l", modifiers: { ctrl: true }, label: "Address Bar", category: "browser" },
  { id: "ctrl-d", key: "d", modifiers: { ctrl: true }, label: "Bookmark", category: "browser" },
  { id: "ctrl-h", key: "h", modifiers: { ctrl: true }, label: "History", category: "browser" },
  { id: "ctrl-j", key: "j", modifiers: { ctrl: true }, label: "Downloads", category: "browser" },
  { id: "f5", key: "F5", modifiers: {}, label: "Refresh", category: "browser" },
  { id: "f11", key: "F11", modifiers: {}, label: "Fullscreen", category: "browser" },
  { id: "f12", key: "F12", modifiers: {}, label: "DevTools", category: "browser" },
  { id: "escape", key: "Escape", modifiers: {}, label: "Escape", category: "browser" },
]

export function matchesShortcut(
  event: KeyboardEvent,
  shortcut: ProtectedShortcut
): boolean {
  const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase()
  const ctrlMatch = !!event.ctrlKey === !!shortcut.modifiers.ctrl
  const altMatch = !!event.altKey === !!shortcut.modifiers.alt
  const shiftMatch = !!event.shiftKey === !!shortcut.modifiers.shift
  const metaMatch = !!event.metaKey === !!shortcut.modifiers.meta

  return keyMatch && ctrlMatch && altMatch && shiftMatch && metaMatch
}

export function formatShortcut(shortcut: ProtectedShortcut): string {
  const parts: string[] = []
  if (shortcut.modifiers.ctrl) parts.push("Ctrl")
  if (shortcut.modifiers.alt) parts.push("Alt")
  if (shortcut.modifiers.shift) parts.push("Shift")
  if (shortcut.modifiers.meta) parts.push("Meta")

  const keyDisplay = shortcut.key.length === 1
    ? shortcut.key.toUpperCase()
    : shortcut.key.replace("Arrow", "")

  parts.push(keyDisplay)
  return parts.join("+")
}
