import { NextRequest, NextResponse } from 'next/server'
import { getD1Database } from '@/lib/db'


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Changed to Promise
) {
  try {
    const { id } = await params // ✅ Await the params
    const db = getD1Database()
    if (!db) {
      console.log('Mock deleting product:', id)
      return NextResponse.json({ success: true })
    }

    await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run()
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}