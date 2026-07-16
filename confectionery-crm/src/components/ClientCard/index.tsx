// Cartao com os dados resumidos de um cliente.
import type { Client } from "../../types/Client";
import { useMemo, useState } from "react";
import { getOrders } from "../../services/orderStorage";
import { OrderCard } from "../OrderCard";

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
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
