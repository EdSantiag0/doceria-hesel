import type { Order, CreateOrderInput } from "../types/Order";

const ORDERS_STORAGE_KEY = "doceria-hesel:orders";

function readOrders(): Order[] {
  const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);

  if (!storedOrders) {
    return [];
  }

  try {
    return JSON.parse(storedOrders) as Order[];
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function getOrders() {
  return readOrders();
}

export function createOrder(input: CreateOrderInput) {
  const now = new Date().toISOString();

  const order: Order = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: now,
  };

  const orders = readOrders();

  saveOrders([...orders, order]);

  return order;
}

export function deleteOrder(orderId: string) {
  const orders = readOrders();

  const updatedOrders = orders.filter((order) => order.id !== orderId);

  saveOrders(updatedOrders);
}

export function updateOrder(updatedOrder: Order) {
  const orders = readOrders();

  const updatedOrders = orders.map((order) =>
    order.id === updatedOrder.id
      ? {
          ...updatedOrder,
          updatedAt: new Date().toISOString(),
        }
      : order,
  );

  saveOrders(updatedOrders);

  return updatedOrder;
}
