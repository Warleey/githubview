import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface PanelProps {
  icon: LucideIcon
  title: string
  description?: string
  aside?: ReactNode
  delay?: number
  children: ReactNode
}

/** Card de seção padrão do dashboard: ícone em destaque, título e conteúdo */
export function Panel({ icon: Icon, title, description, aside, delay = 0, children }: PanelProps) {
  return (
    <section
      className="animate-rise rounded-3xl border border-edge bg-surface p-5 shadow-xl shadow-black/5 sm:p-7"
      style={{ animationDelay: `${delay}ms` }}
    >
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight text-ink">{title}</h2>
            {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
          </div>
        </div>
        {aside}
      </header>
      {children}
    </section>
  )
}
