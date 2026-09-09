// @ts-ignore
import Paystack from 'paystack'

export const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY!)

export function generateReference(): string {
  return `SHOPEASY-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
}

export async function initializeTransaction(params: {
  email: string
  amount: number
  reference: string
  callbackUrl: string
  metadata?: Record<string, any>
}) {
  const response = await paystack.transaction.initialize({
    email: params.email,
    amount: params.amount * 100,
    reference: params.reference,
    callback_url: params.callbackUrl,
    metadata: params.metadata,
  })

  return response.data
}

export async function verifyTransaction(reference: string) {
  const response = await paystack.transaction.verify({
    reference,
  })
  return response.data
}