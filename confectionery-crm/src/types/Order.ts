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
  orderDate: string;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  reminder?: Reminder;
  orderTotal: number; // calculado automaticamente
  createdAt: string;
  updatedAt?: string;
}
