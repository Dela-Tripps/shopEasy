export function getD1Database(): any | null {
  if (typeof process !== 'undefined' && process.env.DB) {
    return process.env.DB
  }
  return null
}