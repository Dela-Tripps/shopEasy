import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  price: integer('price').notNull(),
  compareAtPrice: integer('compare_at_price'),
  inventory: integer('inventory').notNull().default(0),
  imageUrls: text('image_urls', { mode: 'json' }).$type<string[]>().notNull().default(sql`'[]'`),
  category: text('category'),
  tags: text('tags', { mode: 'json' }).$type<string[]>().notNull().default(sql`'[]'`),
  isPublished: integer('is_published', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})