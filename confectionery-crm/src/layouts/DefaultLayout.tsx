// Layout principal com menu lateral e area de conteudo.
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  ClipboardList,
  ShoppingBag,
  UserPlus,
  Users,
} from "lucide-react";
import { Header } from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";

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
  const location = useLocation();
  return (
    <div className="flex min-h-screen w-full flex-col bg-brand-100 text-brand-900 md:flex-row">
      <aside className="flex w-full flex-col gap-6 bg-[#752b08] p-4 text-white md:min-h-screen md:w-80 md:flex-[0_0_320px] md:gap-10 md:px-4 md:py-6">
        <div className="flex items-center gap-3 px-2 text-left">
          <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white/20 text-white">
            <ShoppingBag size={22} strokeWidth={2.3} />
          </span>
          <div>
            <strong className="block text-[17px] leading-tight">Doceria</strong>
            <span className="mt-0.5 block text-sm text-orange-100/80">
              Sistema de Gestão
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
                    ? "flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-white/25 px-5 text-white no-underline shadow-sm transition-colors duration-150 hover:bg-white/30 md:justify-start"
                    : "flex min-h-14 items-center justify-center gap-3 rounded-2xl px-5 text-orange-100/85 no-underline transition-colors duration-150 hover:bg-white/10 hover:text-white md:justify-start"
                }
              >
                <Icon size={21} aria-hidden="true" />
                <span className="text-[16px] font-semibold">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <span className="mt-auto hidden border-t border-white/20 px-2 pt-5 text-sm text-orange-100/70 md:block">
          © 2026 Doceria
        </span>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col text-left">
        <Header />
        <section className="flex min-h-0 flex-1 overflow-hidden px-5 py-8 md:px-12 md:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
