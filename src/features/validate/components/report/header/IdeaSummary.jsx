import React from 'react'
import { Pill } from '@/features/validate/components/report/ui'
import { titleCase } from '@/features/validate/components/report/lib/format'

const Field = ({ label, children }) => (
    <div className="rounded-xl bg-slate-50 p-4 shadow-[0_8px_28px_rgba(15,23,42,0.20)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(15,23,42,0.25)]">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {label}
        </p>
        <p className="mt-1 text-sm text-slate-800">{children}</p>
    </div>
);

export default function IdeaSummary({ idea }) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{idea.idea}</h1>
      {/* <p className="mt-2 max-w-2xl text-slate-600">{idea.description}</p> */}
      <div className="mt-4 flex flex-wrap gap-2">
        {/* <Pill tone="bg-indigo-50 text-indigo-700 ring-indigo-200">{idea.industry}</Pill> */}
        {/* <Pill>Stage: {titleCase(idea.stage)}</Pill> */}
        {/* <Pill>{idea.location}, {idea.country_iso2}</Pill>
        <Pill>{titleCase(idea.business_type)}</Pill> */}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Field label="Target segment">{idea.target_segment}</Field>
        <Field label="Problem">{idea.problem_statement}</Field>
      </div>
    </div>
  )
}
