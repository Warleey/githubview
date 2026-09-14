import type { HTMLAttributes } from 'react'

/**
 * Bloco base de skeleton loading com efeito shimmer.
 * Espelha qualquer formato via className.
 */
export function Skeleton({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden="true" className={`skeleton rounded-lg ${className}`} {...props} />
}
