import type { OrderItem } from "../../../types/OrderItem";

export function calculateOrderTotal(items: OrderItem[]) {
  return items.reduce((acc, item) => acc + item.total, 0);
}
