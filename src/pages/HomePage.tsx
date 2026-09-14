import { BarChart3, Code2, Route } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState/EmptyState'
import { RecentSearches } from '../components/RecentSearches/RecentSearches'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { useSearchHistory } from '../hooks/useSearchHistory'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon: BarChart3,
    title: 'Estatísticas ao vivo',
    description: 'Repositórios, seguidores e a soma total de estrelas recebidas.',
  },
  {
    icon: Code2,
    title: 'Linguagens analisadas',
    description: 'Bytes de código agregados dos repositórios mais recentes do perfil.',
  },
  {
    icon: Route,
    title: 'URL compartilhável',
    description: 'Cada perfil ganha uma rota dinâmica própria, pronta para compartilhar.',
  },
]

/** Página inicial: hero com busca, histórico e estado vazio orientado */
export function HomePage() {
  const navigate = useNavigate()
  const { history, removeSearch, clearHistory } = useSearchHistory()

  useEffect(() => {
    document.title = 'githubview · Explore perfis do GitHub'
  }, [])

  const goToProfile = (username: string) => navigate(`/${encodeURIComponent(username)}`)

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
      {/* Hero */}
      <section className="mx-auto max-w-3xl pt-14 text-center sm:pt-20">
        <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
          API pública do GitHub · tempo real
        </span>

        <h1
          className="animate-rise mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-6xl"
          style={{ animationDelay: '60ms' }}
        >
          Qualquer perfil do GitHub, <span className="text-accent">em um dashboard.</span>
        </h1>

        <p
          className="animate-rise mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          style={{ animationDelay: '120ms' }}
        >
          Estatísticas, repositórios recentes e as linguagens mais usadas de qualquer
          desenvolvedor, direto da API do GitHub, sem cadastro.
        </p>

        <div className="animate-rise mx-auto mt-9 max-w-xl" style={{ animationDelay: '180ms' }}>
          <SearchBar size="lg" autoFocus onSearch={goToProfile} />
        </div>

        <div className="mt-5">
          <RecentSearches
            items={history}
            onSelect={goToProfile}
            onRemove={removeSearch}
            onClear={clearHistory}
          />
        </div>
      </section>

      {/* Estado vazio: terminal + sugestões */}
      <div className="mt-16 sm:mt-20">
        <EmptyState onSelect={goToProfile} />
      </div>

      {/* Diferenciais da aplicação */}
      <section className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3">
        {FEATURES.map((feature, index) => (
          <article
            key={feature.title}
            className="animate-rise rounded-2xl border border-edge bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            style={{ animationDelay: `${240 + index * 80}ms` }}
          >
            <span className="grid size-10 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
              <feature.icon className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-display text-base font-bold tracking-tight text-ink">
              {feature.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
