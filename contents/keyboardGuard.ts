import type { PlasmoCSConfig } from "plasmo"

import { getSettings, isDomainWhitelisted } from "~utils/storage"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  run_at: "document_start",
}

async function syncConfig() {
  const settings = await getSettings()
  const isWhitelisted = await isDomainWhitelisted(window.location.hostname)
  
  window.dispatchEvent(new CustomEvent("nojack:config", {
    detail: {
      enabled: settings.enabled,
      enabledShortcuts: settings.enabledShortcuts,
      isWhitelisted
    }
  }))
}

syncConfig()

chrome.storage.onChanged.addListener(() => {
  syncConfig()
})

window.addEventListener("nojack:blocked", (event: CustomEvent) => {
  const { shortcutId, domain } = event.detail
  chrome.runtime.sendMessage({
    type: "SHORTCUT_PROTECTED",
    payload: { shortcutId, domain }
  })
})
