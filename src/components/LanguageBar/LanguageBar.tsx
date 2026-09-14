import { useEffect, useState } from 'react'
import type { LanguageStats } from '../../types/github'

interface LanguageBarProps {
  language: LanguageStats
  index?: number
}

/** Linha de linguagem: nome, barra de progresso animada e percentual */
export function LanguageBar({ language, index = 0 }: LanguageBarProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Dispara a transição de largura após a montagem (stagger por índice)
    const timeout = window.setTimeout(() => setWidth(language.percentage), 150 + index * 90)
    return () => window.clearTimeout(timeout)
  }, [language.percentage, index])

  const percentageLabel = `${language.percentage.toFixed(1).replace('.', ',')}%`

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-ink">
          <span
            className="size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: language.color }}
            aria-hidden="true"
          />
          <span className="truncate">{language.name}</span>
        </span>
        <span className="font-mono text-xs tabular-nums text-muted">{percentageLabel}</span>
      </div>

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-elevated"
        role="progressbar"
        aria-valuenow={language.percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${language.name}: ${percentageLabel}`}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            backgroundColor: language.color,
            boxShadow: `0 0 12px ${language.color}55`,
            transition: 'width 900ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  )
}
