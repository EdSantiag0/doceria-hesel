import type { OrderItem, CreateOrderItemInput } from './OrderItem'

export type PaymentMethod =
  | 'cash'
  | 'credit_card'
  | 'debit_card'
  | 'pix'
  | 'bank_transfer'
  | 'other'

export interface Order {
  id: string
  clientId: string
  items: OrderItem[]
  reminder: string
  orderDate: string
  paymentMethod: PaymentMethod
  total: number
  createdAt: string
  updatedAt?: string
}

export interface CreateOrderInput {
  clientId: string
  items: CreateOrderItemInput[]
  reminder: string
  orderDate: string
  paymentMethod: PaymentMethod
}
