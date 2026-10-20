import { getCloudflareContext } from '@opennextjs/cloudflare'

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