// Cartao com os dados resumidos de um cliente.
import type { Client } from "../../types/Client";
import { useMemo, useState } from "react";
import { getOrders } from "../../services/orderStorage";
import { OrderCard } from "../OrderCard";
import { Pencil, Trash2 } from "lucide-react";

interface ClientCardProps {
  client: Client;

  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export function ClientCard({ client, onDelete, onEdit }: ClientCardProps) {
  const [expanded, setExpanded] = useState(false);

  const orders = useMemo(() => {
    return getOrders().filter((order) => order.clientId === client.id);
  }, [client.id]);

  return (
    <div className="rounded-lg border border-[#e7ddd5] bg-[#fffaf6]">
      <article className="flex items-center justify-between p-4">
        <div>
          <h3 className="mb-1 mt-0 text-[17px] text-[#2a211d]">
            {client.name}
          </h3>
          <p className="m-0 text-sm text-[#77675f]">{client.address}</p>
        </div>

        <a
          href={`tel:${client.phone}`}
          className="whitespace-nowrap text-sm font-bold text-[#8d493a] no-underline"
        >
          {client.phone}
        </a>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(client)}
            className="rounded-md bg-amber-500 p-2 text-white hover:bg-amber-600"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(client)}
            className="rounded-md bg-red-600 p-2 text-white hover:bg-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#77675f]">
            {orders.length} pedido(s)
          </span>

          {orders.length > 0 && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-sm font-bold text-[#8d493a]"
            >
              {expanded ? "Ocultar pedidos" : "Ver pedidos"}
            </button>
          )}
        </div>
      </article>

      {expanded && <OrderCard orders={orders} />}
    </div>
  );
}
