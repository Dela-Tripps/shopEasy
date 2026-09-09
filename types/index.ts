export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  compareAtPrice: number | null
  inventory: number
  imageUrls: string[]
  category: string | null
  tags: string[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  maxQuantity: number
}

export interface Order {
  id: string
  userId: string | null
  email: string
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  shippingAddress: {
    street: string
    city: string
    state: string
    country: string
    zip: string
  }
  items: {
    productId: string
    name: string
    price: number
    quantity: number
    image: string
  }[]
  paystackReference: string | null
  paystackAccessCode: string | null
  createdAt: string
  updatedAt: string
}