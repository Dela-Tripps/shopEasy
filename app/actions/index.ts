'use server'

import { revalidatePath } from 'next/cache'
import { getD1Database } from '@/lib/db'
import { Product } from '@/types'

// Get all published products
export async function getProducts(): Promise<Product[]> {
  try {
    const db = getD1Database()
    if (!db) {
      console.warn('D1 not available – returning empty array')
      return []
    }

    const { results } = await db
      .prepare('SELECT * FROM products WHERE is_published = 1 ORDER BY created_at DESC')
      .all()

    return (results || []) as Product[]
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Get single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const db = getD1Database()
    if (!db) {
      return null
    }

    const result = await db
      .prepare('SELECT * FROM products WHERE slug = ?')
      .bind(slug)
      .first()

    return (result as Product) || null
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
}

// Add to cart (placeholder – replace with KV or DB logic)
export async function addToCart(productId: string, quantity: number) {
  // For now, just revalidate the cart page
  revalidatePath('/cart')
}

// Remove from cart
export async function removeFromCart(productId: string) {
  revalidatePath('/cart')
}

// Get cart contents (placeholder)
export async function getCart() {
  return { items: [], total: 0 }
}