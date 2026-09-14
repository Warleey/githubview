import { useEffect, useRef, useState } from 'react'

/**
 * Anima um número do valor atual até o alvo com easing (easeOutCubic),
 * usando requestAnimationFrame. Usado nos cards de estatísticas.
 */
export function useCountUp(target: number, duration = 900): number {
  const [value, setValue] = useState(0)
  const valueRef = useRef(0)

  useEffect(() => {
    const from = valueRef.current
    if (from === target) return

    let animationFrame = 0
    const startedAt = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(from + (target - from) * eased)

      valueRef.current = current
      setValue(current)

      if (progress < 1) animationFrame = requestAnimationFrame(tick)
    }

    animationFrame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  return value
}
