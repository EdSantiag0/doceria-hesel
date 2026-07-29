// Cartão de dados do pedido, é apresentado na aba Clientes
import { Pencil, Trash2 } from "lucide-react";
import type { Order } from "../../types/Order";
import { paymentMethodLabel } from "../../utils/format/formatpaymentMethod";
import { formatCurrency } from "../../utils/format/formatCurrency";

interface OrderCardProps {
  order: Order;

  onEditOrder: (order: Order) => void;
  onDeleteOrder: (orderId: string) => void;
}

export function OrderCard({
  order,
  onEditOrder,
  onDeleteOrder,
}: OrderCardProps) {
  return (
    <div className="rounded-lg border border-[#e7ddd5] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <strong>Pedido</strong>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEditOrder(order)}
            className="rounded bg-amber-500 p-2 text-white hover:bg-amber-600"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDeleteOrder(order.id)}
            className="rounded bg-red-600 p-2 text-white hover:bg-red-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <ul className="space-y-1">
        {order.items.map((item) => (
          <li key={item.id}>
            {item.quantity}x {item.product} — {formatCurrency(item.total)}
          </li>
        ))}
      </ul>

      <p className="mt-3">
        <strong>Total:</strong> {formatCurrency(order.orderTotal)}
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
