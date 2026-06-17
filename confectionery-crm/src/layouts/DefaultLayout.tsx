import { NavLink, Outlet } from 'react-router-dom'
import { Bell, ClipboardList, UserPlus, Users } from 'lucide-react'
import './DefaultLayout.css'

const navigationItems = [
  {
    path: '/',
    label: 'Lembretes',
    icon: Bell,
  },
  {
    path: '/clientes',
    label: 'Clientes',
    icon: Users,
  },
  {
    path: '/novo-cliente',
    label: 'Novo Cliente',
    icon: UserPlus,
  },
  {
    path: '/novo-pedido',
    label: 'Novo Pedido',
    icon: ClipboardList,
  },
]

export function DefaultLayout() {
  return (
    <div className="default-layout">
      <aside className="default-layout__sidebar">
        <div className="default-layout__brand">
          <span className="default-layout__brand-mark">DH</span>
          <div>
            <strong>Doceria Hesel</strong>
            <span>Controle de pedidos</span>
          </div>
        </div>

        <nav className="default-layout__nav" aria-label="Menu principal">
          {navigationItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'default-layout__nav-link default-layout__nav-link--active'
                    : 'default-layout__nav-link'
                }
              >
                <Icon size={20} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </aside>

      <main className="default-layout__content">
        <Outlet />
      </main>
    </div>
  )
}
