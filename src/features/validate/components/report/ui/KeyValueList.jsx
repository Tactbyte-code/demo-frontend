import React from 'react'

/** items: [[label, value]] */
export default function KeyValueList({ items }) {
  return (
    <dl className="divide-y divide-slate-100 text-sm">
      {items.map(([k, v]) => (
        <div key={k} className="flex items-center justify-between gap-4 py-3">
          <dt className="text-slate-600">{k}</dt>
          <dd className="text-right font-semibold text-slate-900">{v}</dd>
        </div>
      ))}
    </dl>
  )
}
