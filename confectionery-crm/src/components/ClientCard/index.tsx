// Cartao com os dados resumidos de um cliente.
import type { Client } from "../../types/Client";
import type { Order } from "../../types/Order";
import { useState } from "react";
import { OrderCard } from "../OrderCard";
import { Pencil, Trash2 } from "lucide-react";

interface ClientCardProps {
  client: Client;
  orders: Order[];

  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  onEditOrder: (order: Order) => void;
  onDeleteOrder: (orderId: string) => void;
}

export function ClientCard({
  client,
  orders,
  onDelete,
  onEdit,
  onEditOrder,
  onDeleteOrder,
}: ClientCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#f1dfbd] bg-white shadow-sm">
      <article className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className="mb-1 mt-0 text-[17px] font-semibold text-[#51230c]">
            {client.name}
          </h3>
          <p className="m-0 text-sm text-[#77675f]">{client.address}</p>
        </div>

        <a
          href={`tel:${client.phone}`}
          className="whitespace-nowrap text-sm font-semibold text-[#a84614] no-underline hover:underline"
        >
          {client.phone}
        </a>
        <div className="flex gap-2 sm:order-last">
          <button
            type="button"
            onClick={() => onEdit(client)}
            className="rounded-lg bg-amber-500 p-2 text-white transition hover:bg-amber-600"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(client)}
            className="rounded-lg bg-danger p-2 text-white transition hover:bg-danger-dark"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <div className="flex items-center gap-3 sm:ml-auto">
          <span className="text-sm text-[#77675f]">
            {orders.length} pedido(s)
          </span>

          {orders.length > 0 && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-sm font-semibold text-[#8d493a] hover:text-[#642305]"
            >
              {expanded ? "Ocultar pedidos" : "Ver pedidos"}
            </button>
          )}
        </div>
      </article>

      {expanded && (
        <div className="space-y-3 border-t border-[#f1dfbd] bg-[#fffdf9] p-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onEditOrder={onEditOrder}
              onDeleteOrder={onDeleteOrder}
            />
          ))}
        </div>
      )}
    </div>
  );
}
