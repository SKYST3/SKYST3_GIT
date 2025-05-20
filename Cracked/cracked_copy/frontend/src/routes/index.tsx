// src/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Info from './pages/Info'
import Main from './pages/Main'
import Grave from './pages/Grave'
import AppLayout from './layouts/Default'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/info', element: <Info /> },
  { path: '/main', element: <Main /> },
  { path: '/grave', element: <Grave /> }
])

export default function Router() {
  return (
    <AppLayout>
      <RouterProvider router={router} />
    </AppLayout>
  )
}