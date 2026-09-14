import { Terminal } from 'lucide-react'

interface EmptyStateProps {
  onSelect: (username: string) => void
}

// Perfis variados (global e BR) para demonstrar o dashboard
const SUGGESTED_USERS = ['torvalds', 'sindresorhus', 'gaearon', 'yyx990803', 'filipedeschamps', 'diego3g']

/** Estado inicial: terminal decorativo + sugestões de perfis para explorar */
export function EmptyState({ onSelect }: EmptyStateProps) {
  return (
    <section className="animate-rise" style={{ animationDelay: '180ms' }}>
      {/* Janela de terminal orientando a primeira busca */}
      <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-edge bg-surface shadow-xl shadow-black/10">
        <div className="flex items-center gap-2 border-b border-edge bg-elevated/60 px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="size-3 rounded-full bg-[#28c840]" aria-hidden="true" />
          <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-muted">
            <Terminal className="size-3.5" aria-hidden="true" />
            githubview
          </span>
        </div>

        <div className="space-y-2 p-5 font-mono text-sm">
          <p className="text-ink">
            <span className="text-accent">$</span> githubview search{' '}
            <span className="text-muted">&lt;usuário&gt;</span>
          </p>
          <p className="text-muted"># Digite um @usuário na busca acima para</p>
          <p className="text-muted"># visualizar o dashboard completo do perfil</p>
          <p className="text-ink">
            <span className="text-accent">$</span>
            <span
              className="ml-2 inline-block h-4 w-2.5 translate-y-0.5 animate-blink bg-accent"
              aria-hidden="true"
            />
          </p>
        </div>
      </div>

      {/* Orientação + atalhos */}
      <div className="mt-8 text-center">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink">
          Busque um perfil para começar
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          Estatísticas, linguagens e repositórios de qualquer desenvolvedor, em poucos segundos.
          Experimente:
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {SUGGESTED_USERS.map((username) => (
            <button
              key={username}
              type="button"
              onClick={() => onSelect(username)}
              className="rounded-full border border-edge bg-surface px-3.5 py-1.5 font-mono text-xs text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
            >
              @{username}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
