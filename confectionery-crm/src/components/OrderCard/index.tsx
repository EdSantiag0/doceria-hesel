// Cartão de dados do pedido, é apresentado na aba Clientes
import type { Order } from "../../types/Order";

interface OrderCardProps {
  orders: Order[];
}

export function OrderCard({ orders }: OrderCardProps) {
  return (
    <div className="border-t border-[#e7ddd5] p-4">
      {orders.map((order) => (
        <div key={order.id} className="mb-4 last:mb-0">
          <strong>Pedido</strong>
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
