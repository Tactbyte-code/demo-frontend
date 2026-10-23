import React from 'react'
import { Card, ExternalLink, IntensityDots, Pill, SectionHeader } from '@/features/validate/components/report/ui'
import { titleCase } from '@/features/validate/components/report/lib/format'

export default function TopEvidence({ items }) {
  if (!items?.length) return null
  return (
    <Card>
      <SectionHeader title="Top evidence" sub="Highest-signal quotes from real users" />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((e, i) => (
          <figure key={i} className="rounded-xl bg-slate-50 p-4">
            <blockquote className="text-sm italic text-slate-700">“{e.excerpt}”</blockquote>
            <figcaption className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <Pill>{titleCase(e.source)}</Pill>
              <span className="flex items-center gap-1 text-slate-500">
                Intensity <IntensityDots n={e.intensity} />
              </span>
              <Pill tone="bg-amber-50 text-amber-700 ring-amber-200">Workaround: {e.workaround}</Pill>
              <Pill tone="bg-emerald-50 text-emerald-700 ring-emerald-200">Payment: {e.payment_signal}</Pill>
              <ExternalLink href={e.url}>View</ExternalLink>
            </figcaption>
          </figure>
        ))}
      </div>
    </Card>
  )
}
