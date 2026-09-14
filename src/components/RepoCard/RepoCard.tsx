import { ArrowUpRight, BookMarked, GitFork, Star } from 'lucide-react'
import type { GithubRepo } from '../../types/github'
import { formatCompactNumber, formatRelativeTime } from '../../utils/format'
import { getLanguageColor } from '../../utils/languages'

interface RepoCardProps {
  repo: GithubRepo
  index?: number
}

/** Card de repositório: descrição, linguagem, estrelas, forks e atualização */
export function RepoCard({ repo, index = 0 }: RepoCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group animate-rise flex h-full flex-col rounded-2xl border border-edge bg-elevated/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-elevated/70 hover:shadow-xl hover:shadow-accent/5"
      style={{ animationDelay: `${200 + index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <BookMarked
            className="size-4 shrink-0 text-muted transition-colors duration-200 group-hover:text-accent"
            aria-hidden="true"
          />
          <h3 className="truncate font-mono text-sm font-semibold text-ink underline-offset-4 transition-colors duration-200 group-hover:text-accent group-hover:underline">
            {repo.name}
          </h3>
        </div>
        <ArrowUpRight
          className="size-4 shrink-0 text-muted opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>

      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
        {repo.description ?? 'Sem descrição disponível.'}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
              aria-hidden="true"
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="size-3.5" aria-hidden="true" />
          {formatCompactNumber(repo.stargazers_count)}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="size-3.5" aria-hidden="true" />
          {formatCompactNumber(repo.forks_count)}
        </span>
        <span className="w-full text-[11px] text-muted/80 sm:ml-auto sm:w-auto sm:text-right">
          atualizado {formatRelativeTime(repo.updated_at)}
        </span>
      </div>
    </a>
  )
}
