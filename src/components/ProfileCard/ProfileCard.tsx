import { Building2, CalendarDays, ExternalLink, Link2, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import type { GithubUser } from '../../types/github'
import { formatFullDate } from '../../utils/format'
import { GithubMark } from '../GithubMark/GithubMark'

interface ProfileCardProps {
  user: GithubUser
}

/** Item de metadado do perfil (ícone + conteúdo) */
function MetaItem({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted">
      <Icon className="size-4 shrink-0 text-accent/80" aria-hidden="true" />
      {children}
    </span>
  )
}

/** Card principal do perfil: avatar, identidade, metadados e CTA */
export function ProfileCard({ user }: ProfileCardProps) {
  // Normaliza a URL do blog: a API pode retornar sem protocolo
  const blogUrl = user.blog
    ? /^https?:\/\//i.test(user.blog)
      ? user.blog
      : `https://${user.blog}`
    : null
  const blogLabel = user.blog ? user.blog.replace(/^https?:\/\//i, '').replace(/\/$/, '') : null

  return (
    <section className="animate-rise overflow-hidden rounded-3xl border border-edge bg-surface shadow-xl shadow-black/5">
      <div
        className="h-1.5 w-full bg-gradient-to-r from-accent via-emerald-400 to-accent/40"
        aria-hidden="true"
      />

      <div className="grid gap-7 p-6 sm:p-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-9">
        {/* Avatar com brilho suave */}
        <div className="relative mx-auto md:mx-0">
          <div className="absolute -inset-3 rounded-[2rem] bg-accent/15 blur-2xl" aria-hidden="true" />
          <img
            src={user.avatar_url}
            alt={`Avatar de ${user.login}`}
            width={160}
            height={160}
            className="relative size-32 rounded-3xl border border-edge object-cover shadow-2xl sm:size-40"
          />
          <span
            className="absolute -bottom-2.5 -right-2.5 grid size-9 place-items-center rounded-full border-4 border-surface bg-accent text-canvas"
            aria-hidden="true"
          >
            <GithubMark className="size-4" />
          </span>
        </div>

        {/* Identidade e metadados */}
        <div className="min-w-0 text-center md:text-left">
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-3">
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {user.name ?? user.login}
            </h1>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-base text-accent transition-opacity hover:opacity-75"
            >
              @{user.login}
            </a>
          </div>

          {user.bio && <p className="mt-3 max-w-2xl leading-relaxed text-muted">{user.bio}</p>}

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 md:justify-start">
            {user.company && <MetaItem icon={Building2}>{user.company}</MetaItem>}
            {user.location && <MetaItem icon={MapPin}>{user.location}</MetaItem>}
            {blogUrl && blogLabel && (
              <MetaItem icon={Link2}>
                <a
                  href={blogUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline-offset-4 transition-opacity hover:underline hover:opacity-75"
                >
                  {blogLabel}
                </a>
              </MetaItem>
            )}
            <MetaItem icon={CalendarDays}>Entrou em {formatFullDate(user.created_at)}</MetaItem>
          </div>

          <div className="mt-7 flex flex-wrap justify-center md:justify-start">
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-canvas transition-all duration-200 hover:bg-accent-strong hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98]"
            >
              Ver perfil no GitHub
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
