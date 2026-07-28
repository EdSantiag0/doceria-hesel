import { getOrders, updateOrder } from "../../services/orderStorage";

export function completeReminder(orderId: string) {
  const order = getOrders().find((order) => order.id === orderId);

  if (!order || !order.reminder) {
    return;
  }

  updateOrder({
    ...order,
    reminder: {
      ...order.reminder,
      isCompleted: true,
    },
  });
}
