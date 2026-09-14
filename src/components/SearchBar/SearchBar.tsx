import { CircleAlert, Loader2, Search } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'

interface SearchBarProps {
  initialValue?: string
  loading?: boolean
  autoFocus?: boolean
  size?: 'lg' | 'md'
  onSearch: (username: string) => void
}

// Logins do GitHub: alfanuméricos e hífens, até 39 caracteres,
// sem começar/terminar com hífen.
const USERNAME_PATTERN = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/

const SIZE_STYLES = {
  lg: {
    wrapper: 'rounded-2xl p-2',
    input: 'py-3 text-base',
    button: 'rounded-xl px-4 py-3 text-sm sm:px-6',
  },
  md: {
    wrapper: 'rounded-xl p-1.5',
    input: 'py-2 text-sm',
    button: 'rounded-lg px-4 py-2 text-sm',
  },
} as const

/** Campo de busca de usuário: submete no Enter ou no botão, com validação */
export function SearchBar({
  initialValue = '',
  loading = false,
  autoFocus = false,
  size = 'md',
  onSearch,
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const styles = SIZE_STYLES[size]

  // Sincroniza com o usuário da rota ao navegar entre perfis
  useEffect(() => setValue(initialValue), [initialValue])
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Normaliza a entrada: remove espaços e o "@" caso cole @usuario
    const username = value.trim().replace(/^@+/, '')

    if (!username) {
      setError('Digite um nome de usuário para buscar.')
      inputRef.current?.focus()
      return
    }
    if (!USERNAME_PATTERN.test(username)) {
      setError('Nome de usuário inválido. Use apenas letras, números e hífens.')
      inputRef.current?.focus()
      return
    }

    setError('')
    onSearch(username)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div
        className={`flex items-center gap-2 border bg-surface shadow-xl shadow-black/5 transition-all duration-300 focus-within:border-accent/60 focus-within:ring-4 focus-within:ring-accent/15 ${
          error ? 'border-red-500/60' : 'border-edge'
        } ${styles.wrapper}`}
      >
        <Search className="ml-2 size-5 shrink-0 text-muted" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            if (error) setError('')
          }}
          placeholder="Buscar usuário do GitHub… ex: torvalds"
          aria-label="Nome de usuário do GitHub"
          aria-invalid={Boolean(error)}
          autoComplete="off"
          spellCheck={false}
          className={`w-full min-w-0 bg-transparent font-mono text-ink outline-none placeholder:font-sans placeholder:text-muted/70 ${styles.input}`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`flex shrink-0 items-center gap-2 bg-accent font-semibold text-canvas transition-all duration-200 hover:bg-accent-strong active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 ${styles.button}`}
        >
          {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          Buscar
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-2.5 flex items-center gap-1.5 pl-1 text-sm text-red-400">
          <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </form>
  )
}
