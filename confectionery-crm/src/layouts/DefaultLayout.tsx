// Layout principal com menu lateral e area de conteudo.
import { NavLink, Outlet } from "react-router-dom";
import { Bell, ClipboardList, UserPlus, Users } from "lucide-react";
import { Header } from "../components/Header";

const navigationItems = [
  {
    path: "/",
    label: "Lembretes",
    icon: Bell,
  },
  {
    path: "/clientes",
    label: "Clientes",
    icon: Users,
  },
  {
    path: "/novo-cliente",
    label: "Novo Cliente",
    icon: UserPlus,
  },
  {
    path: "/novo-pedido",
    label: "Novo Pedido",
    icon: ClipboardList,
  },
];

export function DefaultLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f8f5f2] text-[var(--color-brand-900)] md:flex-row">
      <aside className="flex w-full flex-col gap-[18px] border-b border-[#e7ddd5] bg-[var(--color-brand-50)] p-[18px] md:w-[264px] md:flex-[0_0_264px] md:gap-8 md:border-r md:border-b-0 md:px-[18px] md:py-6">
        <div className="flex items-center gap-3 text-left text-[var(--color-brand-900)]">
          <span className="inline-flex size-11 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-[16px] font-bold text-white">
            H
          </span>
          <div>
            <strong className="block text-base leading-tight">
              Doceria Hesel
            </strong>
            <span className="mt-[3px] block text-[13px] text-[var(--color-text-muted)]">
              Controle de pedidos
            </span>
          </div>
        </div>

        <nav
          className="grid grid-cols-2 gap-2 md:flex md:flex-col"
          aria-label="Menu principal"
        >
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  isActive
                    ? "flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[var(--color-brand-500)] px-3 text-white no-underline transition-colors duration-150 hover:bg-[#7b3f32] hover:text-white md:justify-start"
                    : "flex min-h-11 items-center justify-center gap-3 rounded-lg px-3 text-[var(--color-text-muted)] no-underline transition-colors duration-150 hover:bg-[#f1e7df] hover:text-[var(--color-text)] md:justify-start"
                }
              >
                <Icon size={20} aria-hidden="true" />
                <span className="text-[15px] font-semibold">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col gap-6 p-6 text-left md:p-8">
        <Header />
        <section className="flex min-h-0 flex-1">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
