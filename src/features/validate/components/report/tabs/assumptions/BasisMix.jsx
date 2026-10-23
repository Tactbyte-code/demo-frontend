import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { DonutChart } from '@/features/validate/components/report/charts'
import { LABEL_HEX } from '@/features/validate/components/report/lib/tones'
import { titleCase } from '@/features/validate/components/report/lib/format'

export default function BasisMix({ items }) {
  const counts = items.reduce((acc, a) => ({ ...acc, [a.label]: (acc[a.label] ?? 0) + 1 }), {})
  return (
    <Card>
      <SectionHeader title="Basis mix" sub="How each assumption was arrived at" />
      <DonutChart size={130} thickness={20} data={Object.entries(counts).map(([k, v]) => ({ label: titleCase(k), value: v, color: LABEL_HEX[k] ?? '#94a3b8' }))} />
    </Card>
  )
}
