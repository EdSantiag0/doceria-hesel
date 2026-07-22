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

export function deleteOrdersByClient(clientId: string) {
  const orders = readOrders();

  const updatedOrders = orders.filter((order) => order.clientId !== clientId);

  saveOrders(updatedOrders);
}

export function completeOrderReminder(orderId: string) {
  const orders = readOrders();

  const updatedOrders = orders.map((order) => {
    if (order.id !== orderId || !order.reminder) {
      return order;
    }

    return {
      ...order,
      reminder: {
        ...order.reminder,
        isCompleted: true,
      },
      updatedAt: new Date().toISOString(),
    };
  });

  saveOrders(updatedOrders);
}
