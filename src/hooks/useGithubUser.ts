import { useQuery } from '@tanstack/react-query'
import { fetchDashboardData, GithubApiError } from '../services/github'
import type { DashboardData } from '../types/github'

/**
 * Busca o agregado do perfil com TanStack Query:
 * cache por usuário (5 min), sem refetch ao focar a janela e
 * sem retry para erros definitivos (404 / rate limit).
 */
export function useGithubUser(username: string | undefined) {
  return useQuery<DashboardData, GithubApiError>({
    queryKey: ['github-user', username?.toLowerCase() ?? ''],
    queryFn: () => fetchDashboardData(username ?? ''),
    enabled: Boolean(username),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: (failureCount, error) => {
      if (error.status === 404 || error.status === 403 || error.status === 429) return false
      return failureCount < 2
    },
  })
}
