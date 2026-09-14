import { Code2 } from 'lucide-react'
import type { LanguageStats } from '../../types/github'
import { Panel } from '../Panel/Panel'
import { LanguageBar } from './LanguageBar'

interface LanguagesPanelProps {
  languages: LanguageStats[]
  delay?: number
}

/** Seção de linguagens: barra segmentada (estilo GitHub) + barras individuais */
export function LanguagesPanel({ languages, delay = 0 }: LanguagesPanelProps) {
  const summary = languages
    .map((language) => `${language.name} ${language.percentage}%`)
    .join(', ')

  return (
    <Panel
      icon={Code2}
      title="Linguagens mais usadas"
      description="Distribuição por bytes de código nos repositórios mais recentes"
      delay={delay}
      aside={
        languages.length > 0 ? (
          <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            top {languages.length}
          </span>
        ) : undefined
      }
    >
      {languages.length === 0 ? (
        <p className="rounded-xl border border-dashed border-edge p-6 text-center text-sm text-muted">
          Nenhuma linguagem detectada nos repositórios públicos.
        </p>
      ) : (
        <>
          {/* Barra segmentada com a proporção de cada linguagem */}
          <div
            className="flex h-2.5 w-full overflow-hidden rounded-full bg-elevated"
            role="img"
            aria-label={`Distribuição de linguagens: ${summary}`}
          >
            {languages.map((language) => (
              <span
                key={language.name}
                className="h-full"
                style={{ width: `${language.percentage}%`, backgroundColor: language.color }}
                title={`${language.name} — ${language.percentage}%`}
              />
            ))}
          </div>

          <ul className="mt-7 space-y-5">
            {languages.map((language, index) => (
              <li key={language.name}>
                <LanguageBar language={language} index={index} />
              </li>
            ))}
          </ul>
        </>
      )}
    </Panel>
  )
}
