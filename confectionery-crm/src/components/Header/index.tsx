// Cabecalho com titulo do sistema e status atual.
export function Header() {
  return (
    <header className="flex min-h-[92px] flex-col items-start justify-center gap-1 border-b border-[#eadfd3] bg-white px-5 shadow-[0_2px_5px_rgb(91_61_52_/_0.05)] md:px-12">
      <div>
        <h1 className="m-0 text-[22px] font-bold leading-tight text-[#6f2706]">
          Registro de Clientes
        </h1>
        <p className="mb-0 mt-1 text-sm text-[#b14b18]">
          Cadastre e gerencie seus clientes
        </p>
      </div>
    </header>
  );
}
