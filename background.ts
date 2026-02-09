import { incrementBlockCount } from "~utils/storage"

let sessionBlockCount = 0

function updateBadge(count: number) {
  const text = count > 0 ? count.toString() : ""
  chrome.action.setBadgeText({ text })
  chrome.action.setBadgeBackgroundColor({ color: "#f9017b" })
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "SHORTCUT_PROTECTED") {
    const { domain } = message.payload
    sessionBlockCount++
    updateBadge(sessionBlockCount)
    incrementBlockCount(domain)
  }
})

chrome.runtime.onInstalled.addListener(() => {
  updateBadge(0)
})

export {}
