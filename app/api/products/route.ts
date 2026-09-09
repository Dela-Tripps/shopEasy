import { NextResponse } from 'next/server'
import { getD1Database } from '@/lib/db'
// Import static products as fallback
import { products as staticProducts } from '@/data/products'

export const runtime = 'edge'

export async function GET() {
  try {
    const db = getD1Database()

    // If D1 is not available (dev mode), return static products
    if (!db) {
      console.log('D1 not available – returning static products')
      // Convert static products to match your DB schema (id, name, price, etc.)
      const fallback = staticProducts.map((p) => ({
        id: p.id.toString(),
        name: p.name,
        price: parseInt(p.price.replace('$', '')) * 100, // Convert to kobo if needed
        description: p.desc,
        image_urls: [],
        inventory: 10,
        is_published: true,
      }))
      return NextResponse.json(fallback)
    }

    // Real D1 query
    const { results } = await db.prepare('SELECT * FROM products').all()
    return NextResponse.json(results)
  } catch (error: any) {
    console.error('API error:', error)
    // Fallback to static on any error
    const fallback = staticProducts.map((p) => ({
      id: p.id.toString(),
      name: p.name,
      price: parseInt(p.price.replace('$', '')) * 100,
      description: p.desc,
      image_urls: [],
      inventory: 10,
      is_published: true,
    }))
    return NextResponse.json(fallback)
  }
}

export async function POST(request: Request) {
  try {
    const db = getD1Database()
    if (!db) {
      // In dev, just return a mock success
      const body = await request.json()
      console.log('Mock adding product:', body)
      return NextResponse.json({ id: 'mock-' + Date.now(), ...body })
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