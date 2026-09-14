import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration, useParams } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { useTheme } from './hooks/useTheme'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProfilePage } from './pages/ProfilePage'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

function ProfilePageKeyed() {
  const { username = '' } = useParams<{ username: string }>()
  return <ProfilePage key={username} />
}

function Layout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative min-h-dvh font-sans">
      <div className="dot-grid pointer-events-none fixed inset-0" aria-hidden="true" />
      <div className="hero-glow pointer-events-none fixed inset-0" aria-hidden="true" />

      <Header theme={theme} onToggleTheme={toggleTheme} />

      <div className="relative">
        <ScrollRestoration />
        <Outlet />
      </div>

      <footer className="relative border-t border-edge py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center sm:px-6">
          <p className="text-sm text-muted">
            Dados fornecidos pela{' '}
            <a
              href="https://docs.github.com/pt/rest"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline-offset-4 transition-opacity hover:underline hover:opacity-80"
            >
              API pública do GitHub
            </a>
          </p>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Warley Almeida · Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ':username', element: <ProfilePageKeyed /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
