/* Tailwind class tones (used by pills / bars / text) and hex colours (used by SVG charts). */

export const CHART = {
  indigo: '#6366f1',
  violet: '#8b5cf6',
  fuchsia: '#d946ef',
  sky: '#0ea5e9',
  emerald: '#10b981',
  amber: '#f59e0b',
  rose: '#f43f5e',
  slate: '#64748b',
  teal: '#14b8a6',
}

export const PALETTE = [CHART.indigo, CHART.violet, CHART.fuchsia, CHART.sky, CHART.emerald, CHART.amber, CHART.rose, CHART.slate, CHART.teal]

export const scoreTone = (s) => {
  if (s == null) return { text: 'text-slate-400', bg: 'bg-slate-300', ring: '#cbd5e1', soft: 'bg-slate-100 text-slate-600 ring-slate-200' }
  if (s >= 75) return { text: 'text-emerald-600', bg: 'bg-emerald-500', ring: CHART.emerald, soft: 'bg-emerald-50 text-emerald-700 ring-emerald-200' }
  if (s >= 55) return { text: 'text-indigo-600', bg: 'bg-indigo-500', ring: CHART.indigo, soft: 'bg-indigo-50 text-indigo-700 ring-indigo-200' }
  if (s >= 40) return { text: 'text-amber-600', bg: 'bg-amber-500', ring: CHART.amber, soft: 'bg-amber-50 text-amber-700 ring-amber-200' }
  return { text: 'text-rose-600', bg: 'bg-rose-500', ring: CHART.rose, soft: 'bg-rose-50 text-rose-700 ring-rose-200' }
}

const NEUTRAL = 'bg-slate-100 text-slate-600 ring-slate-200'

export const ratingTone = (r) =>
  ({
    strong: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    moderate: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    weak: 'bg-rose-50 text-rose-700 ring-rose-200',
  }[r] || NEUTRAL)

export const confTone = (c) =>
  ({
    high: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    medium: 'bg-amber-50 text-amber-700 ring-amber-200',
    low: 'bg-rose-50 text-rose-700 ring-rose-200',
  }[c] || NEUTRAL)

export const labelTone = (l) =>
  ({
    sourced: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    estimated: 'bg-sky-50 text-sky-700 ring-sky-200',
    assumed: 'bg-amber-50 text-amber-700 ring-amber-200',
  }[l] || NEUTRAL)

export const LABEL_HEX = { sourced: CHART.emerald, estimated: CHART.sky, assumed: CHART.amber }
export const LABEL_BG = { sourced: 'bg-emerald-500', estimated: 'bg-sky-500', assumed: 'bg-amber-500' }
