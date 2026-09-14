import { History, X } from 'lucide-react'

interface RecentSearchesProps {
  items: string[]
  onSelect: (username: string) => void
  onRemove: (username: string) => void
  onClear: () => void
}

/** Chips com as últimas buscas realizadas (persistidas no localStorage) */
export function RecentSearches({ items, onSelect, onRemove, onClear }: RecentSearchesProps) {
  if (items.length === 0) return null

  return (
    <div
      className="animate-rise flex flex-wrap items-center justify-center gap-2"
      style={{ animationDelay: '120ms' }}
    >
      <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <History className="size-3.5" aria-hidden="true" />
        Recentes
      </span>

      {items.map((username) => (
        <span
          key={username}
          className="inline-flex items-center gap-0.5 overflow-hidden rounded-full border border-edge bg-surface font-mono text-xs transition-colors duration-200 hover:border-accent/50"
        >
          <button
            type="button"
            onClick={() => onSelect(username)}
            className="px-3 py-1.5 text-ink transition-colors duration-200 hover:text-accent"
          >
            @{username}
          </button>
          <button
            type="button"
            onClick={() => onRemove(username)}
            aria-label={`Remover ${username} do histórico`}
            className="pr-2 text-muted transition-colors duration-200 hover:text-red-400"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClear}
        className="text-xs text-muted underline-offset-4 transition-colors duration-200 hover:text-ink hover:underline"
      >
        limpar
      </button>
    </div>
  )
}
