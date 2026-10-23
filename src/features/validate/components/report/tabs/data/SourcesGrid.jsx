import React from 'react'
import { Card, ExternalLink, Pill, SectionHeader } from '@/features/validate/components/report/ui'
import { fmtDate, titleCase } from '@/features/validate/components/report/lib/format'
import { paramShort } from '@/features/validate/components/report/config/parameters'

export default function SourcesGrid({ sources }) {
  return (
    <Card>
      <SectionHeader title="Sources" sub="Every source used in this report" />
      <div className="grid gap-3 md:grid-cols-2">
        {sources.map((s) => (
          <div key={s.id} className="rounded-xl border border-slate-200 p-4">
            <ExternalLink href={s.url} className="text-sm font-medium text-indigo-700">{s.name}</ExternalLink>
            <div className="mt-2 flex flex-wrap gap-2">
              <Pill>{titleCase(s.type)}</Pill>
              <Pill>{s.license}</Pill>
              <Pill>Retrieved {fmtDate(s.retrieved_at)}</Pill>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1">
              <span className="text-xs text-slate-400">Used for:</span>
              {(s.used_for ?? []).map((u) => (
                <span key={u} className="rounded bg-indigo-50 px-1.5 text-xs text-indigo-700">{paramShort(u)}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
