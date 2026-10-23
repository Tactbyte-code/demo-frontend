import React from 'react'
import { Card, DataTable, LabelPill, SectionHeader, SourceChips } from '@/features/validate/components/report/ui'
import { fmtMoney } from '@/features/validate/components/report/lib/format'

export default function CostTable({ title, rows = [], currency }) {
  const columns = [
    {
      key: 'item',
      label: 'Item',
      className: 'font-medium text-slate-800',
      render: (r) => (
        <>
          {r.item}
          {r.source_ids?.length > 0 && (
            <div className="mt-1 font-normal">
              <SourceChips ids={r.source_ids} />
            </div>
          )}
        </>
      ),
    },
    { key: 'low', label: 'Low', align: 'right', className: 'text-slate-600', render: (r) => fmtMoney(r.low, currency) },
    { key: 'base', label: 'Base', align: 'right', className: 'font-semibold text-slate-900', render: (r) => fmtMoney(r.base, currency) },
    { key: 'high', label: 'High', align: 'right', className: 'text-slate-600', render: (r) => fmtMoney(r.high, currency) },
    { key: 'label', label: 'Basis', render: (r) => <LabelPill value={r.label} /> },
  ]
  return (
    <Card>
      <SectionHeader title={title} />
      <DataTable columns={columns} rows={rows} />
    </Card>
  )
}
