// Cartão de dados do pedido, é apresentado na aba Clientes
import { Trash2 } from "lucide-react";
import type { Order } from "../../types/Order";
import { paymentMethodLabel } from "../../utils/paymentMethodLabel";

interface OrderCardProps {
  order: Order;

  onDeleteOrder: (orderId: string) => void;
}

export function OrderCard({ order, onDeleteOrder }: OrderCardProps) {
  return (
    <div className="rounded-lg border border-[#e7ddd5] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <strong>Pedido</strong>

        <button
          type="button"
          onClick={() => onDeleteOrder(order.id)}
          className="rounded bg-red-600 p-2 text-white hover:bg-red-700"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <ul className="space-y-1">
        {order.items.map((item) => (
          <li key={item.id}>
            {item.quantity}x {item.product} —{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.total)}
          </li>
        ))}
      </ul>

      <p className="mt-3">
        <strong>Total:</strong>{" "}
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(order.orderTotal)}
      </p>

      <p>
        <strong>Pagamento:</strong> {paymentMethodLabel(order.paymentMethod)}
      </p>

      {order.reminder && (
        <p>
          <strong>Lembrete:</strong> {order.reminder.description}
        </p>
      )}
    </div>
  );
}
