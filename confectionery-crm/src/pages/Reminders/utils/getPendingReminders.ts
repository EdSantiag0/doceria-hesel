import { getClients } from "../../../services/clientStorage";
import { getOrders } from "../../../services/orderStorage";
import { shouldShowReminder } from "./shouldShowReminder";

export function getPendingReminders() {
  const clients = getClients();
  const orders = getOrders();

  return orders
    .filter((order) => {
      if (!order.reminder) {
        return false;
      }

      if (order.reminder.isCompleted) {
        return false;
      }

      return shouldShowReminder(order.reminder.reminderDate);
    })
    .map((order) => {
      const client = clients.find((client) => client.id === order.clientId);

      return {
        orderId: order.id,

        clientName: client?.name ?? "Cliente não encontrado",

        reminderDate: order.reminder!.reminderDate,

        description: order.reminder!.description,

        items: order.items,
      };
    })
    .sort(
      (a, b) =>
        new Date(a.reminderDate).getTime() - new Date(b.reminderDate).getTime(),
    );
}
