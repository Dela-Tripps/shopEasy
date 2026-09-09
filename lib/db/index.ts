import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

export function getDb(env: any) {
  if (env?.DB) {
    return drizzle(env.DB, { schema })
  }
  console.warn('No D1 binding found')
  return drizzle({} as any, { schema })
}

// ✅ Export a helper to get raw D1 binding for server actions
export function getD1(env: any) {
  return env?.DB || (process.env as any).DB
}

export type Db = ReturnType<typeof getDb>