import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  price: real('price').notNull(),
  compareAtPrice: real('compare_at_price'),
  inventory: integer('inventory').default(0),
  imageUrls: text('image_urls', { mode: 'json' }).$type<string[]>(),
  category: text('category'),
  tags: text('tags', { mode: 'json' }).$type<string[]>(),
  isPublished: integer('is_published', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
})

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name'),
  avatar: text('avatar'),
  googleId: text('google_id').unique(),
  role: text('role').default('customer'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  email: text('email').notNull(),
  status: text('status').default('pending'),
  total: real('total').notNull(),
  shippingAddress: text('shipping_address', { mode: 'json' }).$type<{
    street: string
    city: string
    state: string
    country: string
    zip: string
  }>(),
  items: text('items', { mode: 'json' }).$type<{
    productId: string
    name: string
    price: number
    quantity: number
    image: string
  }[]>(),
  paystackReference: text('paystack_reference').unique(),
  paystackAccessCode: text('paystack_access_code'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
})

export const productsRelations = relations(products, ({ many }) => ({
  orders: many(orders),
}))

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}))

// Add these tables for the D1Adapter

export const accounts = sqliteTable('account', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
})

export const sessions = sqliteTable('session', {
  id: text('id').primaryKey(),
  sessionToken: text('session_token').notNull(),
  userId: text('user_id').references(() => users.id),
  expires: integer('expires', { mode: 'timestamp' }).notNull(),
})

export const verificationTokens = sqliteTable('verification_token', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: integer('expires', { mode: 'timestamp' }).notNull(),
})