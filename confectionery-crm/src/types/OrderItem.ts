export interface OrderItem {
  id: string
  orderId: string
  quantity: number
  product: string
  unitValue: number
}

export type CreateOrderItemInput = Omit<OrderItem, 'id' | 'orderId'>
