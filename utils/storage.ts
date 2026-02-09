import { Storage } from "@plasmohq/storage"

import { protectedShortcuts } from "./shortcuts"

export interface NoJackSettings {
  enabled: boolean
  whitelist: string[]
  enabledShortcuts: string[]
  stats: {
    totalBlocked: number
    lastBlockedDomain: string | null
  }
}

const storage = new Storage()

export const defaultSettings: NoJackSettings = {
  enabled: true,
  whitelist: [],
  enabledShortcuts: protectedShortcuts.map((s) => s.id),
  stats: {
    totalBlocked: 0,
    lastBlockedDomain: null,
  },
}

export async function getSettings(): Promise<NoJackSettings> {
  const stored = await storage.get<NoJackSettings>("settings")
  return stored ?? defaultSettings
}

export async function updateSettings(
  partial: Partial<NoJackSettings>
): Promise<NoJackSettings> {
  const current = await getSettings()
  const updated = { ...current, ...partial }
  await storage.set("settings", updated)
  return updated
}

export async function isShortcutEnabled(shortcutId: string): Promise<boolean> {
  const settings = await getSettings()
  return settings.enabled && settings.enabledShortcuts.includes(shortcutId)
}

export async function isDomainWhitelisted(domain: string): Promise<boolean> {
  const settings = await getSettings()
  return settings.whitelist.includes(domain)
}

export async function toggleWhitelist(domain: string): Promise<boolean> {
  const settings = await getSettings()
  const isWhitelisted = settings.whitelist.includes(domain)

  if (isWhitelisted) {
    await updateSettings({
      whitelist: settings.whitelist.filter((d) => d !== domain),
    })
    return false
  } else {
    await updateSettings({
      whitelist: [...settings.whitelist, domain],
    })
    return true
  }
}

export async function incrementBlockCount(domain: string): Promise<void> {
  const settings = await getSettings()
  await updateSettings({
    stats: {
      totalBlocked: settings.stats.totalBlocked + 1,
      lastBlockedDomain: domain,
    },
  })
}

export async function resetStats(): Promise<void> {
  await updateSettings({
    stats: {
      totalBlocked: 0,
      lastBlockedDomain: null,
    },
  })
}
