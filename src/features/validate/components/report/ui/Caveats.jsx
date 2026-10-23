import React from 'react'
import Notice from './Notice'

export default function Caveats({ items, title = 'Caveats' }) {
  if (!items?.length) return null
  return (
    <Notice tone="slate" title={title}>
      <ul className="list-disc space-y-1 pl-5">
        {items.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </Notice>
  )
}
