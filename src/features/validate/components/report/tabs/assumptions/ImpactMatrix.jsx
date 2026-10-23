import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { Heatmap } from '@/features/validate/components/report/charts'
import { PARAM_ORDER, paramShort } from '@/features/validate/components/report/config/parameters'

export default function ImpactMatrix({ items }) {
  const used = new Set(items.flatMap((a) => a.affects ?? []))
  const cols = PARAM_ORDER.filter((k) => used.has(k)).map((k) => ({ key: k, label: paramShort(k) }))
  return (
    <Card>
      <SectionHeader title="Impact map" sub="Which parameters change when an assumption changes" />
      <Heatmap
        rows={items.map((a, i) => ({ key: String(i), label: a.name, affects: a.affects ?? [] }))}
        cols={cols}
        isOn={(rowKey, colKey) => items[Number(rowKey)].affects?.includes(colKey)}
      />
    </Card>
  )
}
