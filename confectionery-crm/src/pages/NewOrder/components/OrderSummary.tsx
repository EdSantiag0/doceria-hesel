import type { OrderItem } from "../../../types/OrderItem";
import { Trash2 } from "lucide-react";

interface OrderSummaryProps {
  items: OrderItem[];
  onRemoveItem: (id: string) => void;
  orderTotal: number;
}

export function OrderSummary({
  items,
  onRemoveItem,
  orderTotal,
}: OrderSummaryProps) {
  return (
    <fieldset>
      <legend>Resumo do Pedido</legend>
      {items.length === 0 ? (
        <small>Nenhum item adicionado ao pedido.</small>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded border p-2"
            >
              <div>
                <strong>{item.product}</strong>

                <br />
              </div>

              <div className="flex items-center gap-4">
                <strong>R$ {item.total.toFixed(2)}</strong>

                <button type="button" onClick={() => onRemoveItem(item.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center justify-between">
        <span>Total do Pedido:</span>

        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(orderTotal)}
        </strong>
      </div>
    </fieldset>
  );
}
