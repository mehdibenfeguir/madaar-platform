export function sar(n: number, opts: { compact?: boolean } = {}): string {
  if (opts.compact && Math.abs(n) >= 1000) {
    const units = [
      { v: 1e9, s: 'B' },
      { v: 1e6, s: 'M' },
      { v: 1e3, s: 'K' },
    ]
    for (const u of units) {
      if (Math.abs(n) >= u.v) {
        return `SAR ${(n / u.v).toFixed(n % u.v === 0 ? 0 : 1)}${u.s}`
      }
    }
  }
  return `SAR ${n.toLocaleString('en-US')}`
}

export function pct(n: number): string {
  return `${n > 0 ? '+' : ''}${n}%`
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
