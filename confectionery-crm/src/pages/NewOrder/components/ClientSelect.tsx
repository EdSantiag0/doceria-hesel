interface Client {
  id: string;
  name: string;
}

interface ClientSelectProps {
  clients: Client[];
  value: string;
  onChange: (clientId: string) => void;
  error?: string;
}

export function ClientSelect({
  clients,
  value,
  onChange,
  error,
}: ClientSelectProps) {
  return (
    <fieldset>
      <legend>Cliente</legend>

      <select
        id="clientId"
        name="clientId"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Selecione um cliente</option>
        {clients
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
      </select>
      {error && <small className="text-red-600">{error}</small>}

      {clients.length === 0 && (
        <small>
          Nenhum cliente cadastrado. Cadastre um cliente antes de criar um
          pedido.
        </small>
      )}
    </fieldset>
  );
}
