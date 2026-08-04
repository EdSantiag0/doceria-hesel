interface Client { id: string; name: string; }
interface ClientSelectProps { clients: Client[]; value: string; onChange: (clientId: string) => void; error?: string; }

export function ClientSelect({ clients, value, onChange, error }: ClientSelectProps) {
  return (
    <fieldset className="rounded-2xl border border-[#f1dfbd] bg-white p-6 shadow-sm">
      <legend className="px-1 text-lg font-bold text-[#6f2706]">Cliente</legend>
      <select className="mt-2 min-h-12 w-full rounded-xl border border-[#f0cf64] bg-[#fffaf0] px-4 text-[#43281c] outline-none focus:border-[#b85a18] focus:bg-white focus:shadow-[0_0_0_3px_rgba(184,90,24,0.12)]" id="clientId" name="clientId" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Selecione um cliente</option>
        {clients.sort((a, b) => a.name.localeCompare(b.name)).map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
      </select>
      {error && <small className="mt-2 block text-[13px] text-danger-dark">{error}</small>}
      {clients.length === 0 && <small className="mt-2 block text-text-muted">Nenhum cliente cadastrado. Cadastre um cliente antes de criar um pedido.</small>}
    </fieldset>
  );
}
