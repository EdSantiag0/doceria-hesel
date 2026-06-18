import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Clients } from '../pages/Clients'
import { NewClient } from '../pages/NewClient'
import { NewOrder } from '../pages/NewOrder'
import { Reminders } from '../pages/Reminders'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Reminders />,
      },
      {
        path: 'clientes',
        element: <Clients />,
      },
      {
        path: 'novo-cliente',
        element: <NewClient />,
      },
      {
        path: 'novo-pedido',
        element: <NewOrder />,
      },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
