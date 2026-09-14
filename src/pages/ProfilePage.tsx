import {
  ArrowLeft,
  ArrowUpRight,
  BookMarked,
  FolderGit2,
  Star,
  UserPlus,
  Users,
} from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ErrorState } from '../components/ErrorState/ErrorState'
import { LanguagesPanel } from '../components/LanguageBar/LanguagesPanel'
import { DashboardSkeleton } from '../components/Loading/DashboardSkeleton'
import { Panel } from '../components/Panel/Panel'
import { ProfileCard } from '../components/ProfileCard/ProfileCard'
import { RepoCard } from '../components/RepoCard/RepoCard'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { StatsCard } from '../components/StatsCard/StatsCard'
import { useGithubUser } from '../hooks/useGithubUser'
import { useSearchHistory } from '../hooks/useSearchHistory'
import type { DashboardData } from '../types/github'

/** Composição do dashboard em caso de sucesso */
function Dashboard({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-6">
      <ProfileCard user={data.user} />

      {/* Estatísticas com contagem animada */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatsCard
          icon={BookMarked}
          label="Repositórios"
          value={data.user.public_repos}
          variant="blue"
          index={0}
        />
        <StatsCard
          icon={Users}
          label="Seguidores"
          value={data.user.followers}
          variant="green"
          index={1}
        />
        <StatsCard
          icon={UserPlus}
          label="Seguindo"
          value={data.user.following}
          variant="purple"
          index={2}
        />
        <StatsCard icon={Star} label="Estrelas" value={data.totalStars} variant="yellow" index={3} />
      </div>

      <LanguagesPanel languages={data.languages} delay={200} />

      <Panel
        icon={FolderGit2}
        title="Repositórios recentes"
        description="Os 6 repositórios públicos atualizados mais recentemente"
        delay={300}
        aside={
          <a
            href={`${data.user.html_url}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="group/link flex items-center gap-1.5 font-mono text-xs text-muted transition-colors duration-200 hover:text-accent"
          >
            ver todos
            <ArrowUpRight
              className="size-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        }
      >
        {data.recentRepos.length === 0 ? (
          <p className="rounded-xl border border-dashed border-edge p-6 text-center text-sm text-muted">
            Este perfil ainda não possui repositórios públicos.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.recentRepos.map((repo, index) => (
              <RepoCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>
        )}
      </Panel>
    </div>
  )
}

/** Página do perfil (/username): orquestra loading, erro e sucesso */
export function ProfilePage() {
  const { username = '' } = useParams<{ username: string }>()
  const navigate = useNavigate()
  const { data, isPending, isError, error, refetch, isFetching } = useGithubUser(username)
  const { addSearch } = useSearchHistory()

  // Registra no histórico apenas perfis encontrados com sucesso
  useEffect(() => {
    if (data) addSearch(data.user.login)
  }, [data, addSearch])

  useEffect(() => {
    document.title = username ? `@${username} · GitHub Dashboard` : 'GitHub Dashboard'
  }, [username])

  const goToProfile = (nextUsername: string) =>
    navigate(`/${encodeURIComponent(nextUsername)}`)

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 sm:px-6">
      {/* Barra de contexto: voltar + buscar outro usuário sem sair do perfil */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex shrink-0 items-center gap-2 font-mono text-xs text-muted transition-colors duration-200 hover:text-accent"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          nova busca
        </button>
        <div className="sm:ml-auto sm:w-full sm:max-w-md">
          <SearchBar
            size="md"
            initialValue={username}
            loading={isFetching}
            onSearch={goToProfile}
          />
        </div>
      </div>

      {isPending ? (
        <DashboardSkeleton />
      ) : isError ? (
        <div className="pt-6">
          <ErrorState
            error={error}
            username={username}
            onRetry={() => {
              void refetch()
            }}
          />
        </div>
      ) : (
        <Dashboard key={data.user.login} data={data} />
      )}
    </main>
  )
}
