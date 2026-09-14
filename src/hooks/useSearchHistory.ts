import { useCallback, useState } from 'react'

const STORAGE_KEY = 'githubview:recent-searches'
const MAX_ITEMS = 5

/** Lê e valida o histórico persistido no localStorage */
function loadHistory(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is string => typeof item === 'string').slice(0, MAX_ITEMS)
  } catch {
    return []
  }
}

function persistHistory(items: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // localStorage indisponível (modo privado): mantém apenas em memória
  }
}

/**
 * Histórico das últimas 5 buscas com sucesso, persistido no
 * localStorage. Mantém o mais recente primeiro e remove duplicatas.
 */
export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(loadHistory)

  const addSearch = useCallback((username: string) => {
    setHistory((prev) => {
      const next = [
        username,
        ...prev.filter((item) => item.toLowerCase() !== username.toLowerCase()),
      ].slice(0, MAX_ITEMS)
      persistHistory(next)
      return next
    })
  }, [])

  const removeSearch = useCallback((username: string) => {
    setHistory((prev) => {
      const next = prev.filter((item) => item.toLowerCase() !== username.toLowerCase())
      persistHistory(next)
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    persistHistory([])
  }, [])

  return { history, addSearch, removeSearch, clearHistory }
}
