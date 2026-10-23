import React from 'react'
import { Stat, StatGrid } from '@/features/validate/components/report/ui'
import { fmtBig, fmtPct } from '@/features/validate/components/report/lib/format'

export default function MarketStats({ market: m }) {
  const div = m.cross_check?.divergence_pct
  return (
    <StatGrid cols={4}>
      <Stat label="TAM (base)" value={fmtBig(m.tam?.value, m.tam?.currency)} />
      <Stat label="SOM (base)" value={fmtBig(m.som?.value, m.som?.currency)} sub={`${m.som?.horizon_years}-year horizon`} />
      <Stat label="CAGR" value={fmtPct(m.growth?.cagr_pct)} sub={m.growth?.horizon} tone="text-emerald-600" />
      <Stat label="Top-down divergence" value={fmtPct(div)} sub="vs bottom-up TAM" tone="text-amber-600" />
    </StatGrid>
  )
}
