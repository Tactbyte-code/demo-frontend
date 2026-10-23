import React from 'react'

export default function BulletList({ items, icon = '●', iconClass = 'text-indigo-600' }) {
  if (!items?.length) return null
  return (
    <ul className="space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2 text-sm text-slate-700">
          <span className={`mt-0.5 ${iconClass}`}>{icon}</span>
          {t.text}
        </li>
      ))}
    </ul>
  )
}
