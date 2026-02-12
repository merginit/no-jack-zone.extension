import { useEffect, useState } from "react"

import "./popup.css"

import {
  formatShortcut,
  protectedShortcuts,
  type ProtectedShortcut,
} from "~utils/shortcuts"
import { getSettings, updateSettings, type NoJackSettings } from "~utils/storage"
import { isRestrictedUrl } from "~utils/urlRestrictions"

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        fill="currentColor"
        d="M10 2a5 5 0 0 0-5 5v2a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H7V7a3 3 0 0 1 5.906-.75a1 1 0 0 0 1.936-.5A5 5 0 0 0 10 2"
      />
    </svg>
  )
}

function IndexPopup() {
  const [settings, setSettings] = useState<NoJackSettings | null>(null)
  const [currentDomain, setCurrentDomain] = useState<string>("")
  const [isWhitelisted, setIsWhitelisted] = useState(false)
  const [canWhitelist, setCanWhitelist] = useState(true)

  useEffect(() => {
    loadSettings()
    getCurrentTab()
  }, [])

  async function loadSettings() {
    const s = await getSettings()
    setSettings(s)
  }

  async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (tab?.url) {
      setCanWhitelist(!isRestrictedUrl(tab.url))
      try {
        const url = new URL(tab.url)
        setCurrentDomain(url.hostname)
        const s = await getSettings()
        setIsWhitelisted(s.whitelist.includes(url.hostname))
      } catch {
        setCurrentDomain("")
        setCanWhitelist(false)
      }
    } else {
      setCanWhitelist(false)
    }
  }

  async function toggleEnabled() {
    if (!settings) return
    const updated = await updateSettings({ enabled: !settings.enabled })
    setSettings(updated)
  }

  async function toggleShortcut(id: string) {
    if (!settings) return
    const isEnabled = settings.enabledShortcuts.includes(id)
    const enabledShortcuts = isEnabled
      ? settings.enabledShortcuts.filter((s) => s !== id)
      : [...settings.enabledShortcuts, id]
    const updated = await updateSettings({ enabledShortcuts })
    setSettings(updated)
  }

  async function toggleWhitelist() {
    if (!settings || !currentDomain) return
    const newWhitelist = isWhitelisted
      ? settings.whitelist.filter((d) => d !== currentDomain)
      : [...settings.whitelist, currentDomain]
    const updated = await updateSettings({ whitelist: newWhitelist })
    setSettings(updated)
    setIsWhitelisted(!isWhitelisted)
  }

  if (!settings) {
    return <div className="popup">Loading...</div>
  }

  const groupedShortcuts = protectedShortcuts.reduce(
    (acc, s) => {
      if (!acc[s.category]) acc[s.category] = []
      acc[s.category].push(s)
      return acc
    },
    {} as Record<string, ProtectedShortcut[]>
  )

  return (
    <div className={`popup ${!settings.enabled ? "disabled" : ""}`}>
      <header className="header">
        <div className="logo-section">
          <ShieldIcon className="logo-icon" />
          <span className="title">NoJack Zone</span>
        </div>
        <div className="toggle-container">
          <input
            type="checkbox"
            className="toggle"
            checked={settings.enabled}
            onChange={toggleEnabled}
          />
        </div>
      </header>

      <div className="stats-card">
        <div className="stats-icon">
          <ShieldIcon className="stats-icon-svg" />
        </div>
        <div className="stats-content">
          <div className="stats-number">
            {settings.stats.totalBlocked.toLocaleString()}
          </div>
          <div className="stats-label">shortcuts protected</div>
        </div>
      </div>

      <section className="section">
        <div className="section-header">Protected Shortcuts</div>
        <div className="shortcuts-list">
          {Object.entries(groupedShortcuts).map(([category, shortcuts]) =>
            shortcuts.map((shortcut) => (
              <label
                key={shortcut.id}
                className={`shortcut-item ${
                  !settings.enabledShortcuts.includes(shortcut.id) ? "disabled" : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="shortcut-checkbox"
                  checked={settings.enabledShortcuts.includes(shortcut.id)}
                  onChange={() => toggleShortcut(shortcut.id)}
                />
                <span className="shortcut-key">{formatShortcut(shortcut)}</span>
                <span className="shortcut-label">{shortcut.label}</span>
                <span className={`shortcut-category ${shortcut.category}`}>
                  {shortcut.category}
                </span>
              </label>
            ))
          )}
        </div>
      </section>

      {currentDomain && canWhitelist && (
        <section className="section">
          <div className="section-header">This Site</div>
          <div className="site-card">
            <img
              src={`https://www.google.com/s2/favicons?domain=${currentDomain}&sz=32`}
              alt=""
              className="site-favicon"
            />
            <span className="site-domain">{currentDomain}</span>
            <button
              className={`whitelist-btn ${isWhitelisted ? "active" : ""}`}
              onClick={toggleWhitelist}
            >
              {isWhitelisted ? "Whitelisted" : "Whitelist"}
            </button>
          </div>
        </section>
      )}

      <footer className="footer">
        <a
          href="https://github.com/merginit/no-jack-zone.extension"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          GitHub
        </a>
        <span>v0.0.4</span>
      </footer>
    </div>
  )
}

export default IndexPopup
