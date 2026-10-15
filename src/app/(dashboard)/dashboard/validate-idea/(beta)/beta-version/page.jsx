'use client'

import React, { useState } from 'react'
// Put your JSON export in this file (export const reportData = {...}) and adjust the path if needed
import { reportData as R } from '@/utils/data'

/* ----------------------------- helpers ----------------------------- */

const sourceMap = Object.fromEntries((R.sources || []).map((s) => [s.id, s]))

const trimNum = (x) => Number(x.toFixed(2)).toLocaleString('en-IN')
const fmtNum = (n) => (n == null ? '—' : new Intl.NumberFormat('en-IN').format(n))

const fmtMoney = (v, cur = 'INR') => {
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

const fmtBig = (v, cur) => {
  // e.g. 54,000,000,000 INR -> ₹5,400 Cr (₹54B)
  if (v == null) return '—'
  const main = fmtMoney(v, cur)
  if (cur === 'INR' && Math.abs(v) >= 1e9) return `${main} (₹${trimNum(v / 1e9)}B)`
  return main
}

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

const titleCase = (s) =>
  String(s ?? '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

const scoreTone = (s) => {
  if (s == null) return { text: 'text-slate-400', bg: 'bg-slate-300', ring: '#cbd5e1', soft: 'bg-slate-100 text-slate-600 ring-slate-200' }
  if (s >= 75) return { text: 'text-emerald-600', bg: 'bg-emerald-500', ring: '#10b981', soft: 'bg-emerald-50 text-emerald-700 ring-emerald-200' }
  if (s >= 55) return { text: 'text-indigo-600', bg: 'bg-indigo-500', ring: '#6366f1', soft: 'bg-indigo-50 text-indigo-700 ring-indigo-200' }
  if (s >= 40) return { text: 'text-amber-600', bg: 'bg-amber-500', ring: '#f59e0b', soft: 'bg-amber-50 text-amber-700 ring-amber-200' }
  return { text: 'text-rose-600', bg: 'bg-rose-500', ring: '#f43f5e', soft: 'bg-rose-50 text-rose-700 ring-rose-200' }
}

const ratingTone = (r) =>
  ({
    strong: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    moderate: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    weak: 'bg-rose-50 text-rose-700 ring-rose-200',
  }[r] || 'bg-slate-100 text-slate-600 ring-slate-200')

const confTone = (c) =>
  ({
    high: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    medium: 'bg-amber-50 text-amber-700 ring-amber-200',
    low: 'bg-rose-50 text-rose-700 ring-rose-200',
  }[c] || 'bg-slate-100 text-slate-600 ring-slate-200')

const labelTone = (l) =>
  ({
    sourced: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    estimated: 'bg-sky-50 text-sky-700 ring-sky-200',
    assumed: 'bg-amber-50 text-amber-700 ring-amber-200',
  }[l] || 'bg-slate-100 text-slate-600 ring-slate-200')

/* ------------------------- small UI primitives ------------------------- */

const Card = ({ className = '', children }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</div>
)

const H = ({ children, sub, right }) => (
  <div className="mb-4 flex items-start justify-between gap-3">
    <div>
      <h3 className="text-base font-semibold text-slate-900">{children}</h3>
      {sub && <p className="mt-0.5 text-sm text-slate-500">{sub}</p>}
    </div>
    {right}
  </div>
)

const Pill = ({ tone = 'bg-slate-100 text-slate-600 ring-slate-200', children, className = '' }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${tone} ${className}`}>
    {children}
  </span>
)

const ConfPill = ({ c }) => (c ? <Pill tone={confTone(c)}>{titleCase(c)} confidence</Pill> : null)
const LabelPill = ({ l }) => (l ? <Pill tone={labelTone(l)}>{titleCase(l)}</Pill> : null)

const Bar = ({ value = 0, max = 1, color = 'bg-indigo-500', h = 'h-2' }) => (
  <div className={`w-full overflow-hidden rounded-full bg-slate-100 ${h}`}>
    <div className={`${h} rounded-full ${color}`} style={{ width: `${Math.max(0, Math.min(100, (value / max) * 100))}%` }} />
  </div>
)

const Stat = ({ label, value, sub, tone = 'text-slate-900' }) => (
  <div className="rounded-xl bg-slate-50 p-4">
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
    <p className={`mt-1 text-2xl font-semibold ${tone}`}>{value}</p>
    {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
  </div>
)

const Notice = ({ tone = 'amber', title, children }) => {
  const t = {
    amber: 'border-amber-200 bg-amber-50 text-amber-900',
    slate: 'border-slate-200 bg-slate-50 text-slate-700',
    rose: 'border-rose-200 bg-rose-50 text-rose-900',
  }[tone]
  return (
    <div className={`rounded-xl border p-4 text-sm ${t}`}>
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div>{children}</div>
    </div>
  )
}

const Caveats = ({ items }) =>
  items?.length ? (
    <Notice tone="slate" title="Caveats">
      <ul className="list-disc space-y-1 pl-5">
        {items.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </Notice>
  ) : null

const SourceChips = ({ ids }) =>
  ids?.length ? (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-xs text-slate-400">Sources:</span>
      {ids.map((id) => {
        const s = sourceMap[id]
        if (!s) return null
        return (
          <a
            key={id}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="max-w-[220px] truncate rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200"
            title={s.name}
          >
            {s.name}
          </a>
        )
      })}
    </div>
  ) : null

const ScoreRing = ({ score, size = 160, stroke = 12, children }) => {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const tone = scoreTone(score)
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone.ring}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * (score || 0)) / 100}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

const RangeBar = ({ low, base, high, fmt }) => {
  const span = high - low || 1
  const pos = ((base - low) / span) * 100
  return (
    <div>
      <div className="relative h-2 rounded-full bg-slate-200">
        <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-indigo-200" />
        <div className="absolute -top-1 h-4 w-1.5 rounded bg-indigo-600" style={{ left: `calc(${pos}% - 3px)` }} />
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-slate-500">
        <span>Low {fmt(low)}</span>
        <span className="font-semibold text-indigo-700">Base {fmt(base)}</span>
        <span>High {fmt(high)}</span>
      </div>
    </div>
  )
}

const TrendChart = ({ series, color = '#6366f1' }) => {
  const w = 320
  const h = 120
  const pad = 24
  const vals = series.map((p) => p.value)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const span = max - min || 1
  const pts = series.map((p, i) => {
    const x = pad + (i * (w - pad * 2)) / (series.length - 1 || 1)
    const y = h - pad - ((p.value - min) / span) * (h - pad * 2)
    return { x, y, ...p }
  })
  const line = pts.map((p) => `${p.x},${p.y}`).join(' ')
  const area = `${pad},${h - pad} ${line} ${pts[pts.length - 1].x},${h - pad}`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <polygon points={area} fill={color} opacity="0.1" />
      <polyline points={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="white" stroke={color} strokeWidth="2" />
          <text x={p.x} y={p.y - 9} textAnchor="middle" className="fill-slate-600 text-[10px] font-medium">
            {p.value}
          </text>
          <text x={p.x} y={h - 6} textAnchor="middle" className="fill-slate-400 text-[9px]">
            {p.period}
          </text>
        </g>
      ))}
    </svg>
  )
}

const Dots = ({ n, max = 5 }) => (
  <span className="inline-flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <span key={i} className={`h-2 w-2 rounded-full ${i < n ? 'bg-rose-500' : 'bg-slate-200'}`} />
    ))}
  </span>
)

const THead = ({ cols }) => (
  <thead>
    <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
      {cols.map((c, i) => (
        <th key={i} className={`py-2 pr-3 font-medium ${i > 0 && c.right ? 'text-right' : ''}`}>
          {c.label ?? c}
        </th>
      ))}
    </tr>
  </thead>
)

/* ------------------------------- tabs ------------------------------- */

function OverviewTab() {
  const o = R.overall
  const n = R.narrative
  return (
    <div className="space-y-6">
      <Card>
        <H sub="Executive summary">What this report says</H>
        <p className="leading-relaxed text-slate-700">{n.executive_summary}</p>
        <div className="mt-4">
          <SourceChips ids={n.citations} />
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-emerald-200 bg-emerald-50/40">
          <H>Strengths</H>
          <ul className="space-y-2">
            {o.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="mt-0.5 text-emerald-600">✔</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-rose-200 bg-rose-50/40">
          <H>Risks</H>
          <ul className="space-y-2">
            {o.risks.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="mt-0.5 text-rose-600">▲</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <H sub="Weighted contribution of each parameter to the overall score">Score breakdown</H>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <THead
              cols={[
                'Parameter',
                { label: 'Weight', right: true },
                { label: 'Effective', right: true },
                'Score',
                'Rating',
                'Confidence',
                { label: 'Contribution', right: true },
              ]}
            />
            <tbody>
              {o.score_breakdown.map((p) => {
                const tone = scoreTone(p.score)
                return (
                  <tr key={p.parameter} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-3 font-medium text-slate-800">{p.label}</td>
                    <td className="py-3 pr-3 text-right text-slate-600">{(p.weight * 100).toFixed(0)}%</td>
                    <td className="py-3 pr-3 text-right text-slate-600">{(p.effective_weight * 100).toFixed(1)}%</td>
                    <td className="w-48 py-3 pr-3">
                      {p.score != null ? (
                        <div className="flex items-center gap-2">
                          <Bar value={p.score} max={100} color={tone.bg} />
                          <span className={`w-9 text-right text-sm font-semibold ${tone.text}`}>{p.score}</span>
                        </div>
                      ) : (
                        <Pill>No data</Pill>
                      )}
                    </td>
                    <td className="py-3 pr-3">
                      {p.rating ? <Pill tone={ratingTone(p.rating)}>{titleCase(p.rating)}</Pill> : <Pill>{titleCase(p.status)}</Pill>}
                    </td>
                    <td className="py-3 pr-3">
                      {p.confidence ? <Pill tone={confTone(p.confidence)}>{titleCase(p.confidence)}</Pill> : '—'}
                    </td>
                    <td className="py-3 text-right font-semibold text-slate-800">{p.contribution ?? '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Parameters without sufficient data are excluded and their weight is redistributed across the rest.
        </p>
      </Card>

      <Card>
        <H sub="Summary of key parameters">Highlights by section</H>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(n.sections).map(([k, v]) => (
            <div key={k} className="rounded-xl bg-slate-50 p-4">
              <p className="mb-1 text-sm font-semibold capitalize text-slate-800">{titleCase(k)}</p>
              <p className="mb-3 text-sm text-slate-600">{v.summary}</p>
              <SourceChips ids={v.source_ids} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <H>Recommended next steps</H>
        <ol className="space-y-3">
          {n.next_steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-sm text-slate-700">{s}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  )
}

function PainTab() {
  const p = R.parameters.pain
  const stages = [
    ['Collected', p.counts.collected],
    ['After de-duplication', p.counts.after_dedupe],
    ['After filtering', p.counts.after_filter],
    ['Relevant', p.counts.relevant],
  ]
  const srcMax = Math.max(...Object.values(p.counts.by_source))
  const compLabels = {
    volume: 'Volume',
    intensity: 'Intensity',
    breadth: 'Breadth',
    payment: 'Payment signal',
    gap: 'Solution gap',
  }
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Pain score" value={p.score} sub={p.band} tone={scoreTone(p.score).text} />
        <Stat label="Confidence" value={titleCase(p.confidence)} />
        <Stat label="Effective sample" value={p.effective_sample} sub="weighted evidence size" />
        <Stat label="Relevant posts" value={p.counts.relevant} sub={`of ${p.counts.collected} collected`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <H sub="0 to 1 scale">Score components</H>
          <div className="space-y-4">
            {Object.entries(p.components).map(([k, v]) => (
              <div key={k}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-700">{compLabels[k] || titleCase(k)}</span>
                  <span className="font-semibold text-slate-900">{v.toFixed(2)}</span>
                </div>
                <Bar value={v} color={v >= 0.7 ? 'bg-emerald-500' : v >= 0.5 ? 'bg-indigo-500' : 'bg-amber-500'} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <H sub="How raw posts were narrowed down">Evidence funnel</H>
          <div className="space-y-3">
            {stages.map(([l, v], i) => (
              <div key={l}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-700">{l}</span>
                  <span className="font-semibold">{v}</span>
                </div>
                <Bar value={v} max={p.counts.collected} color={['bg-slate-400', 'bg-sky-500', 'bg-indigo-500', 'bg-emerald-500'][i]} h="h-3" />
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-slate-100 pt-4">
            <p className="mb-3 text-sm font-medium text-slate-800">Posts by source</p>
            <div className="space-y-2">
              {Object.entries(p.counts.by_source).map(([k, v]) => (
                <div key={k} className="flex items-center gap-3 text-sm">
                  <span className="w-32 shrink-0 text-slate-600">{titleCase(k)}</span>
                  <Bar value={v} max={srcMax} color="bg-violet-500" />
                  <span className="w-8 text-right font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <H sub="Recurring themes found in relevant posts">Pain themes</H>
        <div className="space-y-4">
          {p.themes.map((t, i) => (
            <div key={i} className="rounded-xl border border-slate-100 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="max-w-xl font-medium text-slate-800">{t.label}</p>
                <Pill tone="bg-indigo-50 text-indigo-700 ring-indigo-200">{t.post_count} posts</Pill>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-xs text-slate-500">Avg intensity</span>
                <div className="w-40">
                  <Bar value={t.avg_intensity} max={5} color="bg-rose-500" />
                </div>
                <span className="text-sm font-semibold text-slate-800">{t.avg_intensity}/5</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {t.example_urls.map((u, j) => (
                  <a key={j} href={u} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:underline">
                    Example post ↗
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <H sub="Highest-signal quotes from real users">Top evidence</H>
        <div className="grid gap-4 md:grid-cols-2">
          {p.top_evidence.map((e, i) => (
            <figure key={i} className="rounded-xl bg-slate-50 p-4">
              <blockquote className="text-sm italic text-slate-700">“{e.excerpt}”</blockquote>
              <figcaption className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <Pill>{titleCase(e.source)}</Pill>
                <span className="flex items-center gap-1 text-slate-500">
                  Intensity <Dots n={e.intensity} />
                </span>
                <Pill tone="bg-amber-50 text-amber-700 ring-amber-200">Workaround: {e.workaround}</Pill>
                <Pill tone="bg-emerald-50 text-emerald-700 ring-emerald-200">Payment: {e.payment_signal}</Pill>
                <a href={e.url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                  View ↗
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </Card>

      <Caveats items={p.caveats} />
    </div>
  )
}

function MarketTab() {
  const m = R.parameters.market
  const levels = [
    { key: 'tam', name: 'TAM', desc: 'Total addressable market', d: m.tam, w: 'w-full', c: 'bg-indigo-600' },
    { key: 'sam', name: 'SAM', desc: 'Serviceable addressable market', d: m.sam, w: 'w-[85%]', c: 'bg-violet-600' },
    { key: 'som', name: 'SOM', desc: `Obtainable market (${m.som.horizon_years} years)`, d: m.som, w: 'w-[70%]', c: 'bg-fuchsia-600' },
  ]
  const users = { tam: m.tam.inputs[0].value, sam: m.sam.serviceable_users, som: m.som.obtainable_users }
  const compLabels = { size_adequacy: 'Size adequacy', growth: 'Growth', data_agreement: 'Data agreement' }
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Market score" value={m.score} tone={scoreTone(m.score).text} />
        <Stat label="Confidence" value={titleCase(m.confidence)} />
        <Stat label="CAGR" value={`${m.growth.cagr_pct}%`} sub={m.growth.horizon} />
        <Stat label="Top-down divergence" value={`${m.cross_check.divergence_pct}%`} sub="vs bottom-up TAM" tone="text-amber-600" />
      </div>

      <div className="grid gap-6">
        {levels.map((l) => (
          <Card key={l.key}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-md px-2 py-0.5 text-xs font-bold text-white ${l.c}`}>{l.name}</span>
                  <p className="text-sm text-slate-500">{l.desc}</p>
                </div>
                <p className="mt-2 text-3xl font-bold text-slate-900">{fmtBig(l.d.value, l.d.currency)}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {fmtNum(users[l.key])} {l.key === 'tam' ? 'addressable' : l.key === 'sam' ? 'serviceable' : 'obtainable'} users
                </p>
              </div>
              <div className="flex gap-2">
                <LabelPill l={l.d.label} />
                <Pill>{titleCase(l.d.method)}</Pill>
              </div>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className={`h-3 rounded-full ${l.c} ${l.w}`} />
            </div>
            <div className="mt-5">
              <RangeBar low={l.d.range.low} base={l.d.range.base} high={l.d.range.high} fmt={(v) => fmtMoney(v, l.d.currency)} />
            </div>
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Formula</p>
              <p className="mt-1 font-mono text-sm text-slate-800">{l.d.formula}</p>
              <div className="mt-3 space-y-2">
                {l.d.inputs.map((inp, i) => (
                  <div key={i} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="text-slate-600">{titleCase(inp.name)}</span>
                    <span className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">
                        {inp.unit === 'ratio' ? `${inp.value * 100}%` : fmtNum(inp.value)}{' '}
                        <span className="font-normal text-slate-500">{inp.unit !== 'ratio' ? inp.unit : ''}</span>
                      </span>
                      <LabelPill l={inp.label} />
                    </span>
                  </div>
                ))}
              </div>
              {l.d.inputs.some((i) => i.source_ids?.length) && (
                <div className="mt-3">
                  <SourceChips ids={[...new Set(l.d.inputs.flatMap((i) => i.source_ids || []))]} />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <H sub="Independent estimate to sanity-check the bottom-up TAM">Cross-check</H>
          <div className="grid grid-cols-2 gap-4">
            <Stat label="Bottom-up TAM" value={fmtMoney(m.tam.value, m.tam.currency)} />
            <Stat label="Top-down" value={fmtMoney(m.cross_check.value, m.cross_check.currency)} sub={titleCase(m.cross_check.method)} />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <LabelPill l={m.cross_check.label} />
            <span className="text-sm text-slate-600">{m.cross_check.note}</span>
          </div>
        </Card>

        <Card>
          <H sub="Growth outlook">Market growth</H>
          <div className="flex items-end gap-3">
            <p className="text-4xl font-bold text-emerald-600">{m.growth.cagr_pct}%</p>
            <p className="pb-1 text-sm text-slate-500">CAGR · {m.growth.horizon}</p>
          </div>
          <p className="mt-3 text-sm text-slate-600">{m.growth.basis}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <LabelPill l={m.growth.label} />
            <ConfPill c={m.growth.confidence} />
          </div>
          <div className="mt-3">
            <SourceChips ids={m.growth.source_ids} />
          </div>
        </Card>
      </div>

      <Card>
        <H sub="0 to 1 scale">Score components</H>
        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(m.components).map(([k, v]) => (
            <div key={k}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-slate-700">{compLabels[k] || titleCase(k)}</span>
                <span className="font-semibold">{v.toFixed(2)}</span>
              </div>
              <Bar value={v} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function DemandTab() {
  const d = R.parameters.demand
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Demand score" value={d.score} tone={scoreTone(d.score).text} />
        <Stat label="Confidence" value={titleCase(d.confidence)} />
        <Stat label="Signals tracked" value={d.signals.length} />
      </div>

      {!d.search_interest.available && (
        <Notice tone="slate" title="Search interest unavailable">
          {d.search_interest.reason}
        </Notice>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {d.signals.map((s, i) => (
          <Card key={i}>
            <H
              right={
                <Pill tone={s.direction === 'rising' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-rose-50 text-rose-700 ring-rose-200'}>
                  {s.direction === 'rising' ? '▲' : '▼'} {s.change_pct > 0 ? '+' : ''}
                  {s.change_pct}%
                </Pill>
              }
            >
              {s.name}
            </H>
            <TrendChart series={s.series} color={s.direction === 'rising' ? '#10b981' : '#f43f5e'} />
            <div className="mt-3">
              <SourceChips ids={s.source_ids} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CompetitionTab() {
  const c = R.parameters.competition
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Score" value={c.score} tone={scoreTone(c.score).text} />
        <Stat label="Confidence" value={titleCase(c.confidence)} />
        <Stat label="Saturation" value={titleCase(c.saturation)} tone="text-rose-600" />
        <Stat label="Incumbent strength" value={titleCase(c.incumbent_strength)} />
        <Stat label="Competitors" value={`${c.counts.direct} + ${c.counts.indirect}`} sub="direct + indirect" />
      </div>

      <Card>
        <H sub={`${c.counts.direct} direct competitors identified; ${c.direct_competitors.length} profiled`}>Direct competitors</H>
        <div className="grid gap-4 lg:grid-cols-3">
          {c.direct_competitors.map((x, i) => (
            <div key={i} className="flex flex-col rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-2">
                <a href={x.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-700 hover:underline">
                  {x.name} ↗
                </a>
                <ConfPill c={x.confidence} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{x.offering}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill>{titleCase(x.pricing_model)}</Pill>
                <Pill tone="bg-indigo-50 text-indigo-700 ring-indigo-200">
                  {x.price_from
                    ? x.price_from.amount === 0
                      ? 'Free tier'
                      : `From ${fmtMoney(x.price_from.amount, x.price_from.currency)}/${x.price_from.period}`
                    : 'Price varies'}
                </Pill>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Target: <span className="text-slate-700">{x.target_segment}</span>
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-emerald-600">Strengths</p>
                  <ul className="list-disc space-y-0.5 pl-4 text-slate-600">
                    {x.strengths.map((s, j) => (
                      <li key={j}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-rose-600">Weaknesses</p>
                  <ul className="list-disc space-y-0.5 pl-4 text-slate-600">
                    {x.weaknesses.map((s, j) => (
                      <li key={j}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
                <span>Funding: {x.funding ?? 'Not available'}</span>
                <span>Revenue: {x.revenue ?? 'Not available'}</span>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3 text-xs text-slate-400">
                <a href={x.evidence_url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                  Pricing evidence ↗
                </a>
                <span>Retrieved {fmtDate(x.retrieved_at)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <H sub="What users do today instead">Indirect alternatives</H>
          <div className="flex flex-wrap gap-2">
            {c.indirect_alternatives.map((a, i) => (
              <Pill key={i} className="!px-3 !py-1 !text-sm">
                {a}
              </Pill>
            ))}
          </div>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/40">
          <H sub="Where you can stand out">Differentiation gaps</H>
          <ul className="space-y-2">
            {c.differentiation_gaps.map((g, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="text-emerald-600">★</span>
                {g}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {c.physical_density == null && (
        <Notice tone="slate">Physical competitor density does not apply to this digital business.</Notice>
      )}
      <Caveats items={c.caveats} />
    </div>
  )
}

function UnitEconomicsTab() {
  const u = R.parameters.unit_economics
  const { pricing_benchmarks: pb, model: m, derived: d } = u
  const modelMax = Math.max(...Object.values(pb.models))
  const cur = m.currency
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Score" value={u.score} tone={scoreTone(u.score).text} />
        <Stat label="Confidence" value={titleCase(u.confidence)} />
        <Stat label="LTV : CAC" value={`${d.ltv_cac_ratio}x`} sub="3x or above is generally healthy" tone="text-emerald-600" />
      </div>

      <Card>
        <H sub="Calculated from the assumed model below" right={<LabelPill l="assumed" />}>Derived metrics</H>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Lifetime value" value={fmtMoney(d.ltv, d.currency)} />
          <Stat label="LTV : CAC" value={`${d.ltv_cac_ratio}x`} />
          <Stat label="CAC payback" value={`${d.cac_payback_months} mo`} />
          <Stat label="Break-even users" value={fmtNum(d.break_even_paying_users)} sub="paying users" />
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <H sub="Editable inputs" right={<LabelPill l={m.label} />}>Unit economics model</H>
          <dl className="divide-y divide-slate-100 text-sm">
            {[
              ['ARPU (monthly)', fmtMoney(m.arpu_monthly, cur)],
              ['Gross margin', `${m.gross_margin_pct}%`],
              ['Monthly churn', `${m.monthly_churn_pct}%`],
              ['Customer acquisition cost', fmtMoney(m.cac, cur)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-3">
                <dt className="text-slate-600">{k}</dt>
                <dd className="font-semibold text-slate-900">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card>
          <H sub={`${pb.sample_size} competitor price points`} right={<LabelPill l={pb.label} />}>
            Pricing benchmarks
          </H>
          <div className="mb-4 grid grid-cols-3 gap-3">
            <Stat label="Min" value={fmtMoney(pb.monthly_price.min, pb.monthly_price.currency)} />
            <Stat label="Median" value={fmtMoney(pb.monthly_price.median, pb.monthly_price.currency)} tone="text-indigo-600" />
            <Stat label="Max" value={fmtMoney(pb.monthly_price.max, pb.monthly_price.currency)} />
          </div>
          <p className="mb-2 text-sm font-medium text-slate-800">Pricing models in the market</p>
          <div className="space-y-2">
            {Object.entries(pb.models).map(([k, v]) => (
              <div key={k} className="flex items-center gap-3 text-sm">
                <span className="w-28 text-slate-600">{titleCase(k)}</span>
                <Bar value={v} max={modelMax} color="bg-violet-500" />
                <span className="w-6 text-right font-medium">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <SourceChips ids={pb.source_ids} />
          </div>
        </Card>
      </div>
      <Caveats items={u.caveats} />
    </div>
  )
}

function CostTab() {
  const c = R.parameters.cost
  const cur = c.currency
  const Table = ({ title, rows }) => (
    <Card>
      <H>{title}</H>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <THead cols={['Item', { label: 'Low', right: true }, { label: 'Base', right: true }, { label: 'High', right: true }, 'Basis']} />
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0 align-top">
                <td className="py-3 pr-3 font-medium text-slate-800">
                  {r.item}
                  {r.source_ids?.length > 0 && (
                    <div className="mt-1">
                      <SourceChips ids={r.source_ids} />
                    </div>
                  )}
                </td>
                <td className="py-3 pr-3 text-right text-slate-600">{fmtMoney(r.low, cur)}</td>
                <td className="py-3 pr-3 text-right font-semibold text-slate-900">{fmtMoney(r.base, cur)}</td>
                <td className="py-3 pr-3 text-right text-slate-600">{fmtMoney(r.high, cur)}</td>
                <td className="py-3">
                  <LabelPill l={r.label} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
  const oneTimeBase = c.one_time.reduce((a, b) => a + b.base, 0)
  const monthlyBase = c.monthly.reduce((a, b) => a + b.base, 0)
  const colors = ['bg-indigo-500', 'bg-violet-500', 'bg-fuchsia-500', 'bg-sky-500']
  const Split = ({ rows, total }) => (
    <div>
      <div className="flex h-3 overflow-hidden rounded-full">
        {rows.map((r, i) => (
          <div key={i} className={colors[i % 4]} style={{ width: `${(r.base / total) * 100}%` }} title={r.item} />
        ))}
      </div>
      <div className="mt-3 grid gap-1.5 text-xs text-slate-600 sm:grid-cols-2">
        {rows.map((r, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${colors[i % 4]}`} />
            {r.item} · {((r.base / total) * 100).toFixed(0)}%
          </span>
        ))}
      </div>
    </div>
  )
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Stat label="Cost score" value={c.score} tone={scoreTone(c.score).text} />
        <Stat label="Confidence" value={titleCase(c.confidence)} />
      </div>

      <Card>
        <H sub="Low / base / high scenarios">Cost totals</H>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ['One-time costs', c.totals.one_time],
            ['Monthly burn', c.totals.monthly_burn],
            ['First 12 months', c.totals.first_12_months],
          ].map(([l, t]) => (
            <div key={l} className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{l}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{fmtMoney(t.base, cur)}</p>
              <div className="mt-3">
                <RangeBar low={t.low} base={t.base} high={t.high} fmt={(v) => fmtMoney(v, cur)} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Notice tone="slate" title="Runway">
            {c.runway_months ?? 'Not calculated'}. {c.runway_note}
          </Notice>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <H sub="Share of base one-time cost">One-time split</H>
          <Split rows={c.one_time} total={oneTimeBase} />
        </Card>
        <Card>
          <H sub="Share of base monthly burn">Monthly split</H>
          <Split rows={c.monthly} total={monthlyBase} />
        </Card>
      </div>

      <Table title="One-time costs" rows={c.one_time} />
      <Table title="Monthly costs" rows={c.monthly} />
    </div>
  )
}

function RegulatoryTab() {
  const r = R.parameters.regulatory
  const appliesUI = (a) =>
    a === true
      ? { t: 'Applies', c: 'bg-rose-50 text-rose-700 ring-rose-200' }
      : a === false
      ? { t: 'Not required', c: 'bg-emerald-50 text-emerald-700 ring-emerald-200' }
      : { t: 'Conditional', c: 'bg-amber-50 text-amber-700 ring-amber-200' }
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Score" value={r.score} tone={scoreTone(r.score).text} />
        <Stat label="Confidence" value={titleCase(r.confidence)} />
        <Stat label="Complexity" value={titleCase(r.complexity)} />
      </div>
      {r.legal_review_recommended && (
        <Notice tone="amber" title="Legal review recommended">
          Confirm these requirements with a qualified professional before launch.
        </Notice>
      )}
      <Card>
        <H sub="Whether each obligation applies to this idea">Requirements checklist</H>
        <div className="divide-y divide-slate-100">
          {r.requirements.map((q, i) => {
            const ui = appliesUI(q.applies)
            return (
              <div key={i} className="flex flex-wrap items-start justify-between gap-3 py-4">
                <div className="max-w-2xl">
                  <p className="font-medium text-slate-800">{q.item}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{q.note}</p>
                </div>
                <Pill tone={ui.c}>{ui.t}</Pill>
              </div>
            )
          })}
        </div>
        <div className="mt-3">
          <SourceChips ids={r.source_ids} />
        </div>
      </Card>
    </div>
  )
}

function FundingTab() {
  const f = R.parameters.survival_funding
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Stat label="Status" value={titleCase(f.status)} tone="text-slate-500" />
        <Stat label="Score" value={f.score ?? 'N/A'} sub="excluded from the overall score" tone="text-slate-400" />
      </div>
      <Notice tone="amber" title="Not enough data">
        {f.reason}
      </Notice>
      <Card>
        <H sub="For context only; not scored">Reference benchmarks</H>
        <div className="grid gap-4 md:grid-cols-2">
          {f.reference_benchmarks.map((b, i) => (
            <div key={i} className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-800">{b.metric}</p>
                <Pill>{b.region}</Pill>
              </div>
              <p className="mt-2 text-3xl font-bold text-slate-900">{b.value_pct}%</p>
              <div className="mt-2">
                <Bar value={b.value_pct} max={100} color="bg-slate-500" />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <LabelPill l={b.label} />
                {b.reference_only && <Pill>Reference only</Pill>}
              </div>
              <div className="mt-3">
                <SourceChips ids={b.source_ids} />
              </div>
            </div>
          ))}
        </div>
        {f.funding_activity == null && <p className="mt-4 text-sm text-slate-500">Funding activity data is not available.</p>}
      </Card>
    </div>
  )
}

function MacroTab() {
  const m = R.parameters.macro
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Score" value={m.score} tone={scoreTone(m.score).text} />
        <Stat label="Confidence" value={titleCase(m.confidence)} />
        <Stat label="Outlook" value={titleCase(m.outlook)} tone="text-emerald-600" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {m.indicators.map((i, k) => (
          <Card key={k}>
            <p className="text-sm text-slate-500">{i.name}</p>
            <p className="mt-2 text-4xl font-bold text-slate-900">{i.value}%</p>
            <div className="mt-2">
              <Bar value={i.value} max={100} color="bg-sky-500" />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <Pill>{i.year}</Pill>
              <LabelPill l={i.label} />
              <span className="font-mono">{i.indicator_code}</span>
            </div>
            <div className="mt-3">
              <SourceChips ids={i.source_ids} />
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <H>Timing notes</H>
        <ul className="space-y-2">
          {m.timing_notes.map((t, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-700">
              <span className="text-indigo-600">●</span>
              {t}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

function AssumptionsTab() {
  return (
    <Card>
      <H sub="Values that drive the estimates; each can be edited and re-run">Assumptions</H>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <THead cols={['Assumption', { label: 'Value', right: true }, 'Unit', 'Basis', 'Affects', 'Editable']} />
          <tbody>
            {R.assumptions.map((a) => (
              <tr key={a.id} className="border-b border-slate-100 last:border-0">
                <td className="py-3 pr-3 font-medium text-slate-800">{a.name}</td>
                <td className="py-3 pr-3 text-right font-semibold text-slate-900">
                  {typeof a.value === 'number' ? fmtNum(a.value) : a.value}
                </td>
                <td className="py-3 pr-3 text-slate-500">{a.unit ?? '—'}</td>
                <td className="py-3 pr-3">
                  <LabelPill l={a.label} />
                </td>
                <td className="py-3 pr-3">
                  <div className="flex flex-wrap gap-1">
                    {a.affects.map((x) => (
                      <Pill key={x}>{titleCase(x)}</Pill>
                    ))}
                  </div>
                </td>
                <td className="py-3">{a.editable ? <Pill tone="bg-emerald-50 text-emerald-700 ring-emerald-200">Yes</Pill> : <Pill>No</Pill>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function DataTab() {
  const q = R.data_quality
  const g = R.generation
  const total = Object.values(q.value_labels).reduce((a, b) => a + b, 0)
  const lc = { sourced: 'bg-emerald-500', estimated: 'bg-sky-500', assumed: 'bg-amber-500' }
  return (
    <div className="space-y-6">
      <Card>
        <H sub="How trustworthy each number in this report is">Data quality</H>
        <div className="flex h-4 overflow-hidden rounded-full">
          {Object.entries(q.value_labels).map(([k, v]) => (
            <div key={k} className={lc[k]} style={{ width: `${(v / total) * 100}%` }} title={`${k}: ${v}`} />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
          {Object.entries(q.value_labels).map(([k, v]) => (
            <span key={k} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${lc[k]}`} />
              {titleCase(k)} · {v}
            </span>
          ))}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Parameters scored" value={q.parameters_scored} />
          <Stat label="Insufficient data" value={q.parameters_insufficient.map(titleCase).join(', ')} />
          <Stat label="Evidence used" value={`${q.evidence_items_used} / ${q.evidence_items_total}`} />
          <Stat label="Oldest data year" value={q.oldest_data_year} />
        </div>
        <div className="mt-5">
          <Caveats items={q.limitations} />
        </div>
      </Card>

      <Card>
        <H sub="Every source used in this report">Sources</H>
        <div className="grid gap-3 md:grid-cols-2">
          {R.sources.map((s) => (
            <div key={s.id} className="rounded-xl border border-slate-200 p-4">
              <a href={s.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-indigo-700 hover:underline">
                {s.name} ↗
              </a>
              <div className="mt-2 flex flex-wrap gap-2">
                <Pill>{titleCase(s.type)}</Pill>
                <Pill>{s.license}</Pill>
                <Pill>Retrieved {fmtDate(s.retrieved_at)}</Pill>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="text-xs text-slate-400">Used for:</span>
                {s.used_for.map((u) => (
                  <span key={u} className="rounded bg-indigo-50 px-1.5 text-xs text-indigo-700">
                    {titleCase(u)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <H sub="How this report was produced">Generation details</H>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Pipeline" value={`v${g.pipeline_version}`} />
          <Stat label="Model" value={g.llm_model} sub={titleCase(g.llm_provider)} />
          <Stat label="Duration" value={`${g.duration_seconds}s`} />
          <Stat
            label="LLM calls"
            value={Object.values(g.llm_calls).reduce((a, b) => a + b, 0)}
            sub={Object.entries(g.llm_calls)
              .map(([k, v]) => `${v} ${k.replace(/_/g, ' ')}`)
              .join(' · ')}
          />
        </div>
      </Card>
    </div>
  )
}

/* ------------------------------- page ------------------------------- */

const TABS = [
  { key: 'overview', label: 'Overview', C: OverviewTab },
  { key: 'pain', label: 'Pain Points', C: PainTab, p: 'pain' },
  { key: 'market', label: 'Market', C: MarketTab, p: 'market' },
  { key: 'demand', label: 'Demand', C: DemandTab, p: 'demand' },
  { key: 'competition', label: 'Competition', C: CompetitionTab, p: 'competition' },
  { key: 'unit_economics', label: 'Unit Economics', C: UnitEconomicsTab, p: 'unit_economics' },
  { key: 'cost', label: 'Cost', C: CostTab, p: 'cost' },
  { key: 'regulatory', label: 'Regulatory', C: RegulatoryTab, p: 'regulatory' },
  { key: 'survival_funding', label: 'Funding', C: FundingTab, p: 'survival_funding' },
  { key: 'macro', label: 'Macro', C: MacroTab, p: 'macro' },
  { key: 'assumptions', label: 'Assumptions', C: AssumptionsTab },
  { key: 'data', label: 'Data & Sources', C: DataTab },
]

const page = () => {
  const [active, setActive] = useState('overview')
  const { idea, overall } = R
  const tone = scoreTone(overall.viability_score)
  const ActiveTab = TABS.find((t) => t.key === active).C
  const scoredParams = overall.score_breakdown.filter((p) => p.score != null)
  const best = scoredParams.reduce((a, b) => (b.score > a.score ? b : a))
  const worst = scoredParams.reduce((a, b) => (b.score < a.score ? b : a))

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Pill tone="bg-emerald-50 text-emerald-700 ring-emerald-200">{titleCase(R.status)}</Pill>
            <span>Generated {fmtDate(R.generated_at)}</span>
            <span>·</span>
            <span>Idea validation report</span>
          </div>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{idea.title}</h1>
              <p className="mt-2 max-w-2xl text-slate-600">{idea.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Pill tone="bg-indigo-50 text-indigo-700 ring-indigo-200">{idea.industry}</Pill>
                <Pill>Stage: {titleCase(idea.stage)}</Pill>
                <Pill>
                  {idea.location}, {idea.country_iso2}
                </Pill>
                <Pill>{titleCase(idea.business_type)}</Pill>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Target segment</p>
                  <p className="mt-1 text-sm text-slate-800">{idea.target_segment}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Problem</p>
                  <p className="mt-1 text-sm text-slate-800">{idea.problem_statement}</p>
                </div>
              </div>

              {/* parameter snapshot */}
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">Parameter snapshot</p>
                  {/* <p className="text-xs text-slate-400">Click a tile to open its tab</p> */}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {overall.score_breakdown.map((p) => {
                    const t = scoreTone(p.score)
                    return (
                      <button
                        key={p.parameter}
                        onClick={() => setActive(p.parameter)}
                        className="rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-indigo-300 hover:shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-medium leading-snug text-slate-600">{p.label}</p>
                          <span className={`text-lg font-bold leading-none ${t.text}`}>{p.score ?? 'N/A'}</span>
                        </div>
                        <div className="mt-2">
                          <Bar value={p.score ?? 0} max={100} color={t.bg} h="h-1.5" />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                          <span>Weight {(p.effective_weight * 100).toFixed(0)}%</span>
                          {p.rating ? (
                            <Pill tone={ratingTone(p.rating)} className="!px-2 !py-0 !text-[10px]">
                              {titleCase(p.rating)}
                            </Pill>
                          ) : (
                            <Pill className="!px-2 !py-0 !text-[10px]">No data</Pill>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* score card */}
            <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:w-72">
              <ScoreRing score={overall.viability_score}>
                <span className={`text-5xl font-bold ${tone.text}`}>{overall.viability_score}</span>
                <span className="text-xs text-slate-500">out of 100</span>
              </ScoreRing>
              <Pill tone={tone.soft} className="mt-4 !px-4 !py-1 !text-sm">
                {overall.band}
              </Pill>
              <div className="mt-2">
                <ConfPill c={overall.confidence} />
              </div>
              <div className="mt-4 flex w-full gap-1">
                {[...overall.band_scale].reverse().map((b) => (
                  <div key={b.label} className="flex-1 text-center">
                    <div className={`h-1.5 rounded-full ${b.label === overall.band ? scoreTone(b.min + 1).bg : 'bg-slate-200'}`} />
                    <p className={`mt-1 text-[10px] ${b.label === overall.band ? 'font-semibold text-slate-800' : 'text-slate-400'}`}>
                      {b.label}
                    </p>
                    <p className="text-[9px] text-slate-400">{b.min}+</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-[11px] text-slate-400">{overall.scale}</p>

              {/* bottom block fills remaining height */}
              <div className="mt-auto w-full space-y-3 pt-5">
                <div className="rounded-xl bg-emerald-50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700">Strongest area</p>
                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-800">{best.label}</p>
                    <span className="text-sm font-bold text-emerald-700">{best.score}</span>
                  </div>
                </div>
                <div className="rounded-xl bg-rose-50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-rose-700">Weakest area</p>
                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-800">{worst.label}</p>
                    <span className="text-sm font-bold text-rose-700">{worst.score}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xl font-bold text-slate-900">
                      {R.data_quality.parameters_scored}/{overall.score_breakdown.length}
                    </p>
                    <p className="text-[10px] text-slate-500">parameters scored</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xl font-bold text-slate-900">{R.data_quality.evidence_items_used}</p>
                    <p className="text-[10px] text-slate-500">evidence items used</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border-l-4 border-indigo-500 bg-indigo-50 p-4 text-sm text-indigo-950">
            <span className="font-semibold">Verdict: </span>
            {overall.verdict}
          </div>
        </div>
      </header>

      {/* tabs */}
      <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6">
          <div className="flex min-w-max gap-1 py-2">
            {TABS.map((t) => {
              const s = t.p ? R.parameters[t.p].score : null
              const on = active === t.key
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
                    on ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t.label}
                  {t.p && (
                    <span
                      className={`rounded-md px-1.5 text-xs ${on ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      {s ?? 'N/A'}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ActiveTab />

        <p className="mt-10 rounded-xl border border-slate-200 bg-white p-4 text-center text-xs text-slate-500">
          {R.disclaimer}
        </p>
      </main>
    </div>
  )
}

export default page