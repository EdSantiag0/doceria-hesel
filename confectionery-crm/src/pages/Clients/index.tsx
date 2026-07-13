// Pagina para listar e pesquisar clientes cadastrados.
import { useMemo, useState } from "react";
import { ClientCard } from "../../components/ClientCard";
import { getClients } from "../../services/clientStorage";

export function Clients() {
  const [search, setSearch] = useState("");
  const [clients] = useState(() => getClients());

  const filteredClients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return clients;
    }

    return clients.filter((client) =>
      client.name.toLowerCase().includes(normalizedSearch),
    );
  }, [clients, search]);

  return (
    <div className="flex w-full max-w-[840px] flex-col gap-[18px]">
      <div className="flex flex-col items-start justify-between gap-[18px] sm:flex-row">
        <div>
          <h2 className="mb-1.5 mt-0 text-2xl text-brand-900 font-bold">
            Clientes
          </h2>
          <p className="m-0 text-text-muted">
            Consulte os clientes cadastrados e encontre pelo nome.
          </p>
        </div>

        <span className="whitespace-nowrap rounded-lg border border-[--color-brand-border] bg-[--color-brand-50] px-2.5 py-1.5 text-sm font-bold text-[--color-brand-secondary]">
          {clients.length} cliente(s)
        </span>
      </div>

      <input
        className="min-h-11 w-full rounded-lg border border-[--color-brand-border] bg-white px-3 text-[--color-brand-text] outline-none focus:border-[--color-brand-primary] focus:shadow-[0_0_0_3px_rgba(141,73,58,0.14)]"
        type="search"
        placeholder="Pesquisar cliente pelo nome"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="grid gap-3">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-[--color-brand-border] bg-[--color-brand-50] p-6 text-center">
            <strong className="text-[--color-brand-text]">
              Nenhum cliente encontrado.
            </strong>
            <p className="mb-0 mt-1.5 text-text-muted">
              Cadastre um novo cliente ou ajuste a pesquisa.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
