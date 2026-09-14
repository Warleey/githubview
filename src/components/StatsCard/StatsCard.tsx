import type { LucideIcon } from 'lucide-react'
import { useCountUp } from '../../hooks/useCountUp'
import { formatCompactNumber } from '../../utils/format'

export type StatsVariant = 'blue' | 'green' | 'purple' | 'yellow'

interface VariantStyle {
  tile: string
  hoverBorder: string
}

// Classes literais para o Tailwind gerar no build (sem concatenação dinâmica)
const VARIANT_STYLES: Record<StatsVariant, VariantStyle> = {
  blue: {
    tile: 'border-[#58a6ff]/25 bg-[#58a6ff]/10 text-[#58a6ff]',
    hoverBorder: 'hover:border-[#58a6ff]/40',
  },
  green: {
    tile: 'border-[#3fb950]/25 bg-[#3fb950]/10 text-[#3fb950]',
    hoverBorder: 'hover:border-[#3fb950]/40',
  },
  purple: {
    tile: 'border-[#bc8cff]/25 bg-[#bc8cff]/10 text-[#bc8cff]',
    hoverBorder: 'hover:border-[#bc8cff]/40',
  },
  yellow: {
    tile: 'border-[#e3b341]/25 bg-[#e3b341]/10 text-[#e3b341]',
    hoverBorder: 'hover:border-[#e3b341]/40',
  },
}

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: number
  variant: StatsVariant
  index?: number
}

/** Card de estatística com contagem animada e hover elevado */
export function StatsCard({ icon: Icon, label, value, variant, index = 0 }: StatsCardProps) {
  const displayValue = useCountUp(value)
  const styles = VARIANT_STYLES[variant]

  return (
    <article
      className={`group animate-rise rounded-2xl border border-edge bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 sm:p-5 ${styles.hoverBorder}`}
      style={{ animationDelay: `${100 + index * 80}ms` }}
    >
      <div
        className={`mb-4 grid size-10 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-110 ${styles.tile}`}
      >
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <p className="font-display text-2xl font-bold tracking-tight text-ink tabular-nums sm:text-3xl">
        {formatCompactNumber(displayValue)}
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{label}</p>
    </article>
  )
}
