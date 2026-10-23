import React from 'react'
import { Card, LabelPill, Pill, SectionHeader } from '@/features/validate/components/report/ui'
import { HBarList } from '@/features/validate/components/report/charts'
import { fmtMoney, fmtSigned, titleCase } from '@/features/validate/components/report/lib/format'
import { CHART } from '@/features/validate/components/report/lib/tones'

export default function CrossCheckCard({ tam, check }) {
  if (!check) return null
  return (
    <Card>
      <SectionHeader
        title="Cross-check"
        sub="Independent estimate to sanity-check the bottom-up TAM"
        right={<Pill tone="bg-amber-50 text-amber-700 ring-amber-200">{fmtSigned(check.divergence_pct)} divergence</Pill>}
      />
      <HBarList
        labelWidth="w-28"
        rows={[
          { label: 'Bottom-up TAM', value: tam?.value ?? 0, display: fmtMoney(tam?.value, tam?.currency), color: CHART.indigo },
          { label: titleCase(check.method), value: check.value, display: fmtMoney(check.value, check.currency), color: CHART.sky },
        ]}
        max={Math.max(tam?.value ?? 0, check.value)}
      />
      <div className="mt-4 flex items-start gap-2">
        <LabelPill value={check.label} />
        <span className="text-sm text-slate-600">{check.note}</span>
      </div>
    </Card>
  )
}
