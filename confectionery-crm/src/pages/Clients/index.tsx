import { useMemo, useState } from 'react'
import { ClientCard } from '../../components/ClientCard'
import { getClients } from '../../services/clientStorage'
import './Clients.css'

export function Clients() {
  const [search, setSearch] = useState('')
  const [clients] = useState(() => getClients())

  const filteredClients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) {
      return clients
    }

    return clients.filter((client) =>
      client.name.toLowerCase().includes(normalizedSearch),
    )
  }, [clients, search])

  return (
    <div className="clients-page">
      <div className="clients-page__heading">
        <div>
          <h2>Clientes</h2>
          <p>Consulte os clientes cadastrados e encontre pelo nome.</p>
        </div>

        <span>{clients.length} cliente(s)</span>
      </div>

      <input
        className="clients-page__search"
        type="search"
        placeholder="Pesquisar cliente pelo nome"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="clients-page__list">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))
        ) : (
          <div className="clients-page__empty">
            <strong>Nenhum cliente encontrado.</strong>
            <p>Cadastre um novo cliente ou ajuste a pesquisa.</p>
          </div>
        )}
      </div>
    </div>
  )
}
