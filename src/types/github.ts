export interface GithubUser {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  company: string | null
  location: string | null
  blog: string | null
  twitter_username: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  fork: boolean
  stargazers_count: number
  forks_count: number
  watchers_count: number
  topics?: string[]
  created_at: string
  updated_at: string
  pushed_at: string
}

/** Mapa retornado pelo endpoint /languages: linguagem -> bytes de código */
export type LanguagesMap = Record<string, number>

/** Linguagem já processada para exibição no gráfico */
export interface LanguageStats {
  name: string
  bytes: number
  percentage: number
  color: string
}

/** Agregado completo montado pela camada de serviço e consumido pela UI */
export interface DashboardData {
  user: GithubUser
  repos: GithubRepo[]
  recentRepos: GithubRepo[]
  totalStars: number
  languages: LanguageStats[]
}
