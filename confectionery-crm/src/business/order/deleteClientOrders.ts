import { deleteOrder, getOrders } from "../../services/orderStorage";

export function deleteOrdersByClient(clientId: string) {
  const clientOrders = getOrders().filter(
    (order) => order.clientId === clientId,
  );

  clientOrders.forEach((order) => {
    deleteOrder(order.id);
  });
}
