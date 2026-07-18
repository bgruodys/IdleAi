/** Compact SI-ish formatting for masses and rates. */

const UNITS: ReadonlyArray<{ threshold: number; suffix: string; divisor: number }> = [
  { threshold: 1e12, suffix: 'Tt', divisor: 1e12 },
  { threshold: 1e9, suffix: 'Gt', divisor: 1e9 },
  { threshold: 1e6, suffix: 'kt', divisor: 1e6 },
  { threshold: 1e3, suffix: 't', divisor: 1e3 },
]

export function formatMassKg(kg: number): string {
  const abs = Math.abs(kg)
  for (const unit of UNITS) {
    if (abs >= unit.threshold) {
      return `${(kg / unit.divisor).toFixed(2)} ${unit.suffix}`
    }
  }
  if (abs >= 10) {
    return `${kg.toFixed(1)} kg`
  }
  return `${kg.toFixed(2)} kg`
}

export function formatRateKgPerS(rate: number): string {
  return `${formatMassKg(rate)}/s`
}

export function formatPercent(fraction: number): string {
  return `${(fraction * 100).toFixed(1)}%`
}
