import { getCloudflareContext } from '@opennextjs/cloudflare'

/**
 * Get the raw D1 database binding.
 * Works in both local preview and production.
 */
export function getD1Database(): D1Database | null {
  try {
    const { env } = getCloudflareContext()
    if (env?.DB) {
      return env.DB as D1Database
    }
  } catch {
    // Fallback for local dev / build time
  }
  return null
}