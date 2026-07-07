export interface OrderItem {
  id: string;
  quantity: number;
  product: string;
  unitValue: number;
  total: number;
}

export type CreateOrderItemInput = Omit<OrderItem, "id" | "total">;
