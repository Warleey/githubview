import axios from 'axios'
import type {
  DashboardData,
  GithubRepo,
  GithubUser,
  LanguagesMap,
  LanguageStats,
} from '../types/github'
import { getLanguageColor } from '../utils/languages'

const MAX_LANGUAGE_LOOKUPS = 15
const MAX_LANGUAGES_SHOWN = 6
const RECENT_REPOS_LIMIT = 6

const raw = import.meta.env.VITE_GITHUB_TOKEN as string | undefined
const token = raw && raw !== 'seu_token_aqui' ? raw : undefined

/** Instância Axios configurada para a API REST pública do GitHub */
export const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
  timeout: 12000,
})

/** Erro normalizado para simplificar o tratamento na camada de UI */
export class GithubApiError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'GithubApiError'
    this.status = status
  }
}

/** Traduz erros do Axios para mensagens amigáveis em pt-BR */
function toGithubApiError(error: unknown): GithubApiError {
  if (error instanceof GithubApiError) return error

  if (axios.isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) {
      return new GithubApiError('Nenhum perfil encontrado com esse nome de usuário.', 404)
    }
    if (status === 403 || status === 429) {
      return new GithubApiError(
        'Limite de requisições da API do GitHub atingido. Aguarde alguns minutos e tente novamente.',
        status,
      )
    }
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      return new GithubApiError('Falha de conexão. Verifique sua internet e tente novamente.')
    }
    return new GithubApiError('Não foi possível carregar os dados do GitHub.', status)
  }

  return new GithubApiError('Ocorreu um erro inesperado. Tente novamente.')
}

/** GET /users/{username} — dados do perfil */
async function getUser(username: string): Promise<GithubUser> {
  const { data } = await githubApi.get<GithubUser>(`/users/${username}`)
  return data
}

/** GET /users/{username}/repos — até 100 repositórios ordenados por atualização */
async function getUserRepositories(username: string): Promise<GithubRepo[]> {
  const { data } = await githubApi.get<GithubRepo[]>(`/users/${username}/repos`, {
    params: { sort: 'updated', per_page: 100 },
  })
  return data
}

/**
 * Agrega bytes por linguagem chamando /repos/{username}/{repo}/languages
 * em paralelo. Falhas individuais são ignoradas (allSettled) para que um
 * único repositório inacessível não derrube o dashboard inteiro.
 */
async function aggregateLanguages(username: string, repos: GithubRepo[]): Promise<LanguagesMap> {
  const targets = repos.filter((repo) => !repo.fork).slice(0, MAX_LANGUAGE_LOOKUPS)

  const results = await Promise.allSettled(
    targets.map((repo) => githubApi.get<LanguagesMap>(`/repos/${username}/${repo.name}/languages`)),
  )

  const aggregated: LanguagesMap = {}
  for (const result of results) {
    if (result.status !== 'fulfilled') continue
    for (const [language, bytes] of Object.entries(result.value.data)) {
      aggregated[language] = (aggregated[language] ?? 0) + bytes
    }
  }
  return aggregated
}

/**
 * Transforma o mapa de linguagens em estatísticas de exibição.
 * Fallback: se o endpoint de linguagens falhar por completo (rate limit),
 * usa a frequência da linguagem principal de cada repositório.
 */
function buildLanguageStats(languagesMap: LanguagesMap, repos: GithubRepo[]): LanguageStats[] {
  const source: LanguagesMap =
    Object.keys(languagesMap).length > 0
      ? languagesMap
      : repos.reduce<LanguagesMap>((acc, repo) => {
          if (repo.language) acc[repo.language] = (acc[repo.language] ?? 0) + 1
          return acc
        }, {})

  const total = Object.values(source).reduce((sum, bytes) => sum + bytes, 0)
  if (total === 0) return []

  return Object.entries(source)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Number(((bytes / total) * 100).toFixed(1)),
      color: getLanguageColor(name),
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, MAX_LANGUAGES_SHOWN)
}

/**
 * Orquestra todas as chamadas da API e devolve o agregado pronto para
 * renderização: perfil, repositórios recentes, estrelas e linguagens.
 */
export async function fetchDashboardData(username: string): Promise<DashboardData> {
  try {
    const user = await getUser(username)
    const repos = await getUserRepositories(username)
    const languagesMap = await aggregateLanguages(username, repos)

    return {
      user,
      repos,
      recentRepos: repos.slice(0, RECENT_REPOS_LIMIT),
      totalStars: repos.reduce((total, repo) => total + repo.stargazers_count, 0),
      languages: buildLanguageStats(languagesMap, repos),
    }
  } catch (error) {
    throw toGithubApiError(error)
  }
}
