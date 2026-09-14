import { AlertTriangle, ArrowLeft, Hourglass, RefreshCw, UserX } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { GithubApiError } from '../../services/github'

interface ErrorStateProps {
  error: GithubApiError
  username: string
  onRetry: () => void
}

interface ErrorVisual {
  icon: LucideIcon
  tileClass: string
  title: string
  description: string
}

/** Mapeia o status HTTP para uma experiência de erro específica */
function getErrorVisual(error: GithubApiError, username: string): ErrorVisual {
  if (error.status === 404) {
    return {
      icon: UserX,
      tileClass: 'border-red-500/25 bg-red-500/10 text-red-400',
      title: 'Usuário não encontrado',
      description: `Não encontramos nenhum perfil chamado "@${username}". Verifique a grafia e tente novamente.`,
    }
  }

  if (error.status === 403 || error.status === 429) {
    return {
      icon: Hourglass,
      tileClass: 'border-[#e3b341]/25 bg-[#e3b341]/10 text-[#e3b341]',
      title: 'Limite da API atingido',
      description:
        'A API pública do GitHub permite 60 requisições por hora por IP. Aguarde alguns minutos e tente de novo.',
    }
  }

  return {
    icon: AlertTriangle,
    tileClass: 'border-red-500/25 bg-red-500/10 text-red-400',
    title: 'Algo deu errado',
    description: error.message,
  }
}

/** Estado de erro: 404, rate limit ou falha genérica, com retry */
export function ErrorState({ error, username, onRetry }: ErrorStateProps) {
  const visual = getErrorVisual(error, username)
  const Icon = visual.icon

  return (
    <section
      role="alert"
      className="animate-rise mx-auto max-w-lg rounded-3xl border border-edge bg-surface p-8 text-center shadow-xl shadow-black/5 sm:p-10"
    >
      <div className={`mx-auto grid size-16 place-items-center rounded-2xl border ${visual.tileClass}`}>
        <Icon className="size-8" aria-hidden="true" />
      </div>

      <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink">
        {visual.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{visual.description}</p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-canvas transition-all duration-200 hover:bg-accent-strong active:scale-[0.98]"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          Tentar novamente
        </button>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-edge bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-200 hover:border-accent/50 hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Nova busca
        </Link>
      </div>
    </section>
  )
}
