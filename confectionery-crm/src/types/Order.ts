import type { OrderItem } from "./OrderItem";
import type { Reminder } from "./Reminder";

export type PaymentMethod =
  | "cash"
  | "credit_card"
  | "debit_card"
  | "pix"
  | "bank_transfer"
  | "other";

export interface Order {
  id: string;
  clientId: string;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  reminder?: Reminder;
  orderTotal: number; // calculado automaticamente
  createdAt: string;
  updatedAt?: string;
}

export type CreateOrderInput = Omit<Order, "id" | "createdAt" | "updatedAt">;
