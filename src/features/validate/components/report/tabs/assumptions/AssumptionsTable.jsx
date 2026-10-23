import React from 'react'
import { Card, DataTable, LabelPill, Pill, SectionHeader } from '@/features/validate/components/report/ui'
import { formatByUnit, titleCase } from '@/features/validate/components/report/lib/format'
import { paramShort } from '@/features/validate/components/report/config/parameters'

const COLUMNS = [
  { key: 'name', label: 'Assumption', className: 'font-medium text-slate-800' },
  { key: 'value', label: 'Value', align: 'right', className: 'font-semibold text-slate-900', render: (a) => formatByUnit(a.value, a.unit) },
  { key: 'unit', label: 'Unit', className: 'text-slate-500', render: (a) => (a.unit ? titleCase(a.unit) : '—') },
  { key: 'label', label: 'Basis', render: (a) => <LabelPill value={a.label} /> },
  {
    key: 'affects',
    label: 'Affects',
    render: (a) => (
      <div className="flex flex-wrap gap-1">
        {(a.affects ?? []).map((x) => (
          <Pill key={x}>{paramShort(x)}</Pill>
        ))}
      </div>
    ),
  },
  { key: 'editable', label: 'Editable', render: (a) => (a.editable ? <Pill tone="bg-emerald-50 text-emerald-700 ring-emerald-200">Yes</Pill> : <Pill>No</Pill>) },
]

export default function AssumptionsTable({ items }) {
  return (
    <Card>
      <SectionHeader title="Assumptions" sub="Values that drive the estimates; each can be edited and re-run" />
      <DataTable columns={COLUMNS} rows={items} minWidth={720} />
    </Card>
  )
}
