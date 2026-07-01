// Cabecalho com titulo do sistema e status atual.
export function Header() {
  return (
    <header className="flex flex-col items-start justify-between gap-5 border-b border-[#e7ddd5] pb-6 md:flex-row md:items-center">
      <div>
        <p className="mb-1 mt-0 text-[13px] font-bold uppercase text-[--color-brand-500]">
          Sistema de registros
        </p>
        <h1 className="m-0 text-[28px] leading-tight text-[--color-brand-900]">
          Doceria Hesel
        </h1>
      </div>

      <div className="inline-flex min-h-9 items-center gap-2 whitespace-nowrap rounded-lg border border-[#e7ddd5] bg-[#fffaf6] px-3 text-sm font-semibold text-[#5f514a]">
        <span className="size-2 rounded-full bg-[#3f9b63]" aria-hidden="true" />
        <span>Em desenvolvimento</span>
      </div>
    </header>
  );
}
