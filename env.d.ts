interface D1Database {
  prepare(query: string): D1PreparedStatement
}

interface D1PreparedStatement {
  bind(...params: any[]): D1PreparedStatement
  all<T = any>(): Promise<{ results: T[] }>
  run(): Promise<{ success: boolean; meta?: any }>
  first<T = any>(): Promise<T>
}

declare namespace NodeJS {
  interface ProcessEnv {
    DB?: D1Database
    NEXTAUTH_URL?: string
    AUTH_SECRET?: string
    GOOGLE_CLIENT_ID?: string
    GOOGLE_CLIENT_SECRET?: string
  }
}