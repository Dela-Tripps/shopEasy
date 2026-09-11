import { NextResponse } from 'next/server'
import { getD1Database } from '@/lib/db'
import { products as staticProducts } from '@/data/products'

export async function GET() {
  try {
    const db = getD1Database()

    // Fallback to static data if D1 isn't available
    if (!db) {
      console.log('D1 not available – returning static products')
      return NextResponse.json(staticProducts)
    }

    const { results } = await db.prepare('SELECT * FROM products').all()
    return NextResponse.json(results)
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const db = getD1Database()
    if (!db) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 500 })
    }

    const body = await request.json()
    const { name, price, description, imageUrl } = body

    const id = crypto.randomUUID()
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    await db
      .prepare(
        `INSERT INTO products (id, name, slug, price, description, image_urls, inventory, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(id, name, slug, parseInt(price), description, imageUrl ? JSON.stringify([imageUrl]) : '[]', 0, 1)
      .run()

    return NextResponse.json({ success: true, id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}