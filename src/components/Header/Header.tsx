import { Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Theme } from '../../hooks/useTheme'
import { GithubMark } from '../GithubMark/GithubMark'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

/** Barra superior fixa: logo + alternador de tema (dark/light) */
export function Header({ theme, onToggleTheme }: HeaderProps) {
  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-3" aria-label="Voltar para a página inicial">
          <span className="grid size-9 place-items-center rounded-xl bg-accent text-canvas shadow-lg shadow-accent/25 transition-transform duration-300 group-hover:-rotate-6">
            <GithubMark className="size-5" />
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-ink">
            gh<span className="text-accent">//</span>view
          </span>
        </Link>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
          className="grid size-10 place-items-center rounded-xl border border-edge bg-surface text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="relative block size-5">
            <Sun
              aria-hidden="true"
              className={`absolute inset-0 size-5 transition-all duration-500 ${
                isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
              }`}
            />
            <Moon
              aria-hidden="true"
              className={`absolute inset-0 size-5 transition-all duration-500 ${
                isDark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
            />
          </span>
        </button>
      </div>
    </header>
  )
}
