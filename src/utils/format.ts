/** Formata números em notação compacta — ex: 12,4 mil / 3,2 mi */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

/** Formata a data de criação da conta por extenso — ex: 12 de março de 2018 */
export function formatFullDate(isoDate: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate))
}

/** Formata tempo relativo — ex: "há 3 dias", "há 2 meses" */
export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate)
  const seconds = Math.round((date.getTime() - Date.now()) / 1000)

  const divisions: Array<{ amount: number; unit: Intl.RelativeTimeFormatUnit }> = [
    { amount: 60, unit: 'second' },
    { amount: 60, unit: 'minute' },
    { amount: 24, unit: 'hour' },
    { amount: 7, unit: 'day' },
    { amount: 4.34524, unit: 'week' },
    { amount: 12, unit: 'month' },
    { amount: Number.POSITIVE_INFINITY, unit: 'year' },
  ]

  const formatter = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })
  let duration = seconds

  for (const division of divisions) {
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.unit)
    }
    duration /= division.amount
  }
  return formatter.format(Math.round(duration), 'year')
}
