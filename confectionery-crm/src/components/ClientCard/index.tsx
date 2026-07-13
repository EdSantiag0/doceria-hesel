// Cartao com os dados resumidos de um cliente.
import type { Client } from '../../types/Client'

interface ClientCardProps {
  client: Client
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <article className="flex flex-col items-start justify-between gap-4 rounded-lg border border-[#e7ddd5] bg-[#fffaf6] p-4 sm:flex-row sm:items-center">
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
    </article>
  )
}
