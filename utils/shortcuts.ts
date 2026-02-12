export interface ProtectedShortcut {
  id: string
  key: string
  modifiers: { ctrl?: boolean; alt?: boolean; shift?: boolean; meta?: boolean }
  label: string
  category: "navigation" | "editing" | "browser"
  defaultEnabled: boolean
}

export const protectedShortcuts: ProtectedShortcut[] = [
  { id: "ctrl-f", key: "f", modifiers: { ctrl: true }, label: "Find", category: "browser", defaultEnabled: true },
  { id: "ctrl-g", key: "g", modifiers: { ctrl: true }, label: "Find Next", category: "browser", defaultEnabled: true },
  { id: "ctrl-c", key: "c", modifiers: { ctrl: true }, label: "Copy", category: "editing", defaultEnabled: true },
  { id: "ctrl-v", key: "v", modifiers: { ctrl: true }, label: "Paste", category: "editing", defaultEnabled: true },
  { id: "ctrl-x", key: "x", modifiers: { ctrl: true }, label: "Cut", category: "editing", defaultEnabled: true },
  { id: "ctrl-a", key: "a", modifiers: { ctrl: true }, label: "Select All", category: "editing", defaultEnabled: true },
  { id: "ctrl-z", key: "z", modifiers: { ctrl: true }, label: "Undo", category: "editing", defaultEnabled: true },
  { id: "ctrl-y", key: "y", modifiers: { ctrl: true }, label: "Redo", category: "editing", defaultEnabled: true },
  { id: "alt-left", key: "ArrowLeft", modifiers: { alt: true }, label: "Back", category: "navigation", defaultEnabled: true },
  { id: "alt-right", key: "ArrowRight", modifiers: { alt: true }, label: "Forward", category: "navigation", defaultEnabled: true },
  { id: "ctrl-s", key: "s", modifiers: { ctrl: true }, label: "Save Page", category: "browser", defaultEnabled: true },
  { id: "ctrl-p", key: "p", modifiers: { ctrl: true }, label: "Print", category: "browser", defaultEnabled: true },
  { id: "ctrl-w", key: "w", modifiers: { ctrl: true }, label: "Close Tab", category: "browser", defaultEnabled: true },
  { id: "ctrl-t", key: "t", modifiers: { ctrl: true }, label: "New Tab", category: "browser", defaultEnabled: true },
  { id: "ctrl-n", key: "n", modifiers: { ctrl: true }, label: "New Window", category: "browser", defaultEnabled: true },
  { id: "ctrl-r", key: "r", modifiers: { ctrl: true }, label: "Reload", category: "browser", defaultEnabled: true },
  { id: "ctrl-l", key: "l", modifiers: { ctrl: true }, label: "Address Bar", category: "browser", defaultEnabled: true },
  { id: "ctrl-d", key: "d", modifiers: { ctrl: true }, label: "Bookmark", category: "browser", defaultEnabled: true },
  { id: "ctrl-h", key: "h", modifiers: { ctrl: true }, label: "History", category: "browser", defaultEnabled: true },
  { id: "ctrl-j", key: "j", modifiers: { ctrl: true }, label: "Downloads", category: "browser", defaultEnabled: true },
  { id: "f5", key: "F5", modifiers: {}, label: "Refresh", category: "browser", defaultEnabled: true },
  { id: "f11", key: "F11", modifiers: {}, label: "Fullscreen", category: "browser", defaultEnabled: true },
  { id: "f12", key: "F12", modifiers: {}, label: "DevTools", category: "browser", defaultEnabled: true },
  { id: "ctrl-shift-i", key: "i", modifiers: { ctrl: true, shift: true }, label: "DevTools (Inspect)", category: "browser", defaultEnabled: true },
  { id: "ctrl-shift-j", key: "j", modifiers: { ctrl: true, shift: true }, label: "DevTools (Console)", category: "browser", defaultEnabled: true },
  { id: "ctrl-shift-c", key: "c", modifiers: { ctrl: true, shift: true }, label: "DevTools (Element)", category: "browser", defaultEnabled: true },
  { id: "ctrl-1", key: "1", modifiers: { ctrl: true }, label: "Tab 1", category: "browser", defaultEnabled: true },
  { id: "ctrl-2", key: "2", modifiers: { ctrl: true }, label: "Tab 2", category: "browser", defaultEnabled: true },
  { id: "ctrl-3", key: "3", modifiers: { ctrl: true }, label: "Tab 3", category: "browser", defaultEnabled: true },
  { id: "ctrl-4", key: "4", modifiers: { ctrl: true }, label: "Tab 4", category: "browser", defaultEnabled: true },
  { id: "ctrl-5", key: "5", modifiers: { ctrl: true }, label: "Tab 5", category: "browser", defaultEnabled: true },
  { id: "ctrl-6", key: "6", modifiers: { ctrl: true }, label: "Tab 6", category: "browser", defaultEnabled: true },
  { id: "ctrl-7", key: "7", modifiers: { ctrl: true }, label: "Tab 7", category: "browser", defaultEnabled: true },
  { id: "ctrl-8", key: "8", modifiers: { ctrl: true }, label: "Tab 8", category: "browser", defaultEnabled: true },
  { id: "ctrl-9", key: "9", modifiers: { ctrl: true }, label: "Last Tab", category: "browser", defaultEnabled: true },
  { id: "ctrl-tab", key: "Tab", modifiers: { ctrl: true }, label: "Next Tab", category: "browser", defaultEnabled: true },
  { id: "ctrl-shift-tab", key: "Tab", modifiers: { ctrl: true, shift: true }, label: "Previous Tab", category: "browser", defaultEnabled: true },
  { id: "ctrl-shift-t", key: "t", modifiers: { ctrl: true, shift: true }, label: "Reopen Tab", category: "browser", defaultEnabled: true },
  { id: "ctrl-shift-n", key: "n", modifiers: { ctrl: true, shift: true }, label: "Incognito Window", category: "browser", defaultEnabled: true },
  { id: "ctrl-plus", key: "+", modifiers: { ctrl: true }, label: "Zoom In", category: "browser", defaultEnabled: true },
  { id: "ctrl-equal", key: "=", modifiers: { ctrl: true }, label: "Zoom In", category: "browser", defaultEnabled: true },
  { id: "ctrl-minus", key: "-", modifiers: { ctrl: true }, label: "Zoom Out", category: "browser", defaultEnabled: true },
  { id: "ctrl-0", key: "0", modifiers: { ctrl: true }, label: "Reset Zoom", category: "browser", defaultEnabled: true },
  { id: "ctrl-shift-b", key: "b", modifiers: { ctrl: true, shift: true }, label: "Bookmarks Bar", category: "browser", defaultEnabled: true },
  { id: "ctrl-shift-delete", key: "Delete", modifiers: { ctrl: true, shift: true }, label: "Clear Data", category: "browser", defaultEnabled: true },
  { id: "ctrl-u", key: "u", modifiers: { ctrl: true }, label: "View Source", category: "browser", defaultEnabled: true },
  { id: "ctrl-e", key: "e", modifiers: { ctrl: true }, label: "Search Bar", category: "browser", defaultEnabled: true },
  { id: "ctrl-k", key: "k", modifiers: { ctrl: true }, label: "Search Bar", category: "browser", defaultEnabled: true },
  { id: "alt-d", key: "d", modifiers: { alt: true }, label: "Address Bar", category: "browser", defaultEnabled: true },
  { id: "alt-home", key: "Home", modifiers: { alt: true }, label: "Home Page", category: "navigation", defaultEnabled: true },
  { id: "alt-f4", key: "F4", modifiers: { alt: true }, label: "Close Window", category: "browser", defaultEnabled: true },
  { id: "escape", key: "Escape", modifiers: {}, label: "Escape", category: "browser", defaultEnabled: true },
  { id: "ctrl-b", key: "b", modifiers: { ctrl: true }, label: "Bookmarks", category: "browser", defaultEnabled: false },
  { id: "ctrl-i", key: "i", modifiers: { ctrl: true }, label: "Page Info", category: "browser", defaultEnabled: false },
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
