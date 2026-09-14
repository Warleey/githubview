import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

/** Rota coringa para URLs que não correspondem a nenhuma página */
export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Página não encontrada · githubview'
  }, [])

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-sm font-semibold tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Esta página não existe
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        O endereço pode ter sido digitado errado. Para buscar um perfil, use o formato{' '}
        <span className="rounded-md border border-edge bg-surface px-1.5 py-0.5 font-mono text-xs text-accent">
          /usuario
        </span>
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-canvas transition-all duration-200 hover:bg-accent-strong active:scale-[0.98]"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Voltar para a busca
      </Link>
    </main>
  )
}
