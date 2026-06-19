import type { Client } from '../../types/Client'
import './ClientCard.css'

interface ClientCardProps {
  client: Client
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <article className="client-card">
      <div>
        <h3>{client.name}</h3>
        <p>{client.address}</p>
      </div>

      <a href={`tel:${client.phone}`} className="client-card__phone">
        {client.phone}
      </a>
    </article>
  )
}
