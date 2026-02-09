import type { PlasmoCSConfig } from "plasmo"

import { matchesShortcut, protectedShortcuts } from "~utils/shortcuts"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  world: "MAIN",
  run_at: "document_start",
}

let enabledShortcutIds: string[] = []
let extensionEnabled = true
let domainWhitelisted = false

window.addEventListener("nojack:config", (event: CustomEvent) => {
  const settings = event.detail
  enabledShortcutIds = settings.enabledShortcuts || []
  extensionEnabled = settings.enabled ?? true
  domainWhitelisted = settings.isWhitelisted ?? false
})

function shouldProtect(event: KeyboardEvent): { protect: boolean; shortcutId: string | null } {
  if (!extensionEnabled || domainWhitelisted) return { protect: false, shortcutId: null }

  for (const shortcut of protectedShortcuts) {
    if (matchesShortcut(event, shortcut)) {
      // If we haven't received config yet, default to protecting everything (fail-safe)
      // OR if we have config, check if it's enabled
      if (enabledShortcutIds.length === 0 || enabledShortcutIds.includes(shortcut.id)) {
        return { protect: true, shortcutId: shortcut.id }
      }
    }
  }
  return { protect: false, shortcutId: null }
}

function handleEvent(event: KeyboardEvent) {
  const { protect, shortcutId } = shouldProtect(event)
  if (!protect) return

  const originalPreventDefault = event.preventDefault.bind(event)
  const originalStopPropagation = event.stopPropagation.bind(event)
  const originalStopImmediatePropagation = event.stopImmediatePropagation.bind(event)

  let hijackAttempted = false

  Object.defineProperties(event, {
    preventDefault: { 
      value: function() { hijackAttempted = true }, 
      writable: false, 
      configurable: true 
    },
    stopPropagation: { 
      value: function() { hijackAttempted = true }, 
      writable: false, 
      configurable: true 
    },
    stopImmediatePropagation: { 
      value: function() { hijackAttempted = true }, 
      writable: false, 
      configurable: true 
    },
    returnValue: { get: () => true, set: () => {}, configurable: true },
    cancelBubble: { get: () => false, set: () => {}, configurable: true },
    defaultPrevented: { get: () => false, configurable: true } 
  })

  setTimeout(() => {
    Object.defineProperties(event, {
      preventDefault: { value: originalPreventDefault },
      stopPropagation: { value: originalStopPropagation },
      stopImmediatePropagation: { value: originalStopImmediatePropagation },
    })

    if (hijackAttempted) {
      window.dispatchEvent(new CustomEvent("nojack:blocked", { 
        detail: { shortcutId, domain: window.location.hostname } 
      }))
    }
  }, 0)
}

;["keydown", "keyup", "keypress"].forEach(type => {
  window.addEventListener(type, handleEvent as EventListener, true)
})
