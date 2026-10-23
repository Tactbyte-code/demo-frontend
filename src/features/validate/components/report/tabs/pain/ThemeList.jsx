import React from 'react'
import { Bar, ExternalLink, Pill } from '@/features/validate/components/report/ui'

export default function ThemeList({ themes }) {
  return (
    <div className="space-y-3">
      {themes.map((t, i) => (
        <div key={i} className="rounded-xl border border-slate-100 p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">{i + 1}</span>
            <p className="flex-1 font-medium text-slate-800">{t.label}</p>
            <Pill tone="bg-indigo-50 text-indigo-700 ring-indigo-200">{t.post_count} posts</Pill>
          </div>
          <div className="mt-3 flex items-center gap-3 pl-9">
            <span className="text-xs text-slate-500">Avg intensity</span>
            <div className="w-32">
              <Bar value={t.avg_intensity} max={5} color="bg-rose-500" />
            </div>
            <span className="text-sm font-semibold text-slate-800">{t.avg_intensity}/5</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-3 pl-9 text-xs">
            {(t.example_urls ?? []).map((u, j) => (
              <ExternalLink key={j} href={u}>Example post</ExternalLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
