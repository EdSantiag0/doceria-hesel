// Cartão de dados do pedido, é apresentado na aba Clientes
import { Trash2 } from "lucide-react";
import type { Order } from "../../types/Order";

interface OrderCardProps {
  orders: Order[];

  onDeleteOrder: (orderId: string) => void;
}

export function OrderCard({ orders, onDeleteOrder }: OrderCardProps) {
  return (
    <div className="border-t border-[#e7ddd5] p-4">
      {orders.map((order) => (
        <div key={order.id} className="mb-4 rounded-lg border p-3 last:mb-0">
          <div className="mb-2 flex items-center justify-between">
            <strong>Pedido</strong>

            <button
              type="button"
              onClick={() => onDeleteOrder(order.id)}
              className="mt-2 rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <ul className="mt-2">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.quantity}x {item.product} — R$ {item.total.toFixed(2)}
              </li>
            ))}
          </ul>

          <p className="mt-2">
            <strong>Total:</strong>{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(order.orderTotal)}
          </p>

          <p>
            <strong>Pagamento:</strong> {order.paymentMethod}
          </p>

          {order.reminder && (
            <p>
              <strong>Lembrete:</strong> {order.reminder.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
