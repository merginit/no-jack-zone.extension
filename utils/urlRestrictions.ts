const FORBIDDEN_SCHEMES = [
  "chrome:",
  "chrome-untrusted:",
  "chrome-search:",
  "chrome-signin:",
  "chrome-error:",
  "chrome-native:",
  "about:",
  "view-source:",
  "devtools:",
  "data:",
  "blob:",
  "javascript:",
  "edge:",
  "brave:",
  "opera:",
  "vivaldi:",
]

const PROTECTED_DOMAINS = [
  "chromewebstore.google.com",
  "chrome.google.com",
  "addons.mozilla.org",
  "microsoftedge.microsoft.com",
]

const EXTENSION_PROTOCOLS = [
  "chrome-extension:",
  "moz-extension:",
  "extension:",
]

/**
 * Checks if a URL is restricted for Chrome Extensions (Manifest V3).
 * Restricted URLs include browser internals, web stores, and other extension pages.
 */
export function isRestrictedUrl(url: string | undefined): boolean {
  if (!url) return true

  try {
    const urlObj = new URL(url)
    const { protocol, hostname } = urlObj

    if (FORBIDDEN_SCHEMES.includes(protocol)) return true

    if (PROTECTED_DOMAINS.some((d) => hostname === d || hostname.endsWith(`.${d}`))) {
      return true
    }

    if (EXTENSION_PROTOCOLS.includes(protocol)) {
      if (typeof chrome !== "undefined" && chrome.runtime?.id) {
        return hostname !== chrome.runtime.id
      }
      return true
    }

    if (protocol === "file:") return true

    return false
  } catch {
    return true
  }
}
