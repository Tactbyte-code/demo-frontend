export const trimNum = (x) => Number(x.toFixed(2)).toLocaleString('en-IN')
export const fmtNum = (n) => (n == null ? '—' : new Intl.NumberFormat('en-IN').format(n))

export const fmtMoney = (v, cur = 'INR') => {
  if (v == null) return '—'
  const sym = cur === 'INR' ? '₹' : cur === 'USD' ? '$' : cur + ' '
  const a = Math.abs(v)
  if (cur === 'INR') {
    if (a >= 1e7) return `${sym}${trimNum(v / 1e7)} Cr`
    if (a >= 1e5) return `${sym}${trimNum(v / 1e5)} L`
    return sym + fmtNum(v)
  }
  if (a >= 1e9) return `${sym}${trimNum(v / 1e9)}B`
  if (a >= 1e6) return `${sym}${trimNum(v / 1e6)}M`
  return sym + fmtNum(v)
}

// e.g. 54,000,000,000 INR -> ₹5,400 Cr (₹54B)
export const fmtBig = (v, cur) => {
  if (v == null) return '—'
  const main = fmtMoney(v, cur)
  if (cur === 'INR' && Math.abs(v) >= 1e9) return `${main} (₹${trimNum(v / 1e9)}B)`
  return main
}

export const fmtPct = (v, digits = 1) => (v == null ? '—' : `${Number(Number(v).toFixed(digits))}%`)
export const fmtRatio = (v) => (v == null ? '—' : `${Number((v * 100).toFixed(1))}%`)
export const fmtSigned = (v, suffix = '%') => (v == null ? '—' : `${v > 0 ? '+' : ''}${v}${suffix}`)

export const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

export const titleCase = (s) =>
  String(s ?? '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

/** Format a raw value according to the `unit` string used in the report JSON. */
export const formatByUnit = (value, unit) => {
  if (value == null) return '—'
  if (typeof value !== 'number') return String(value)
  if (unit === 'ratio') return fmtRatio(value)
  if (unit === 'percent') return `${value}%`
  const [cur, per] = String(unit ?? '').split('/')
  if (cur === 'INR' || cur === 'USD') return fmtMoney(value, cur) + (per ? ` / ${per}` : '')
  return `${fmtNum(value)}${unit ? ` ${unit}` : ''}`
}

export const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n))
