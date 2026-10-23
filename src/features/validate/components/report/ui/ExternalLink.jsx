import React from 'react'

export default function ExternalLink({ href, children, className = '' }) {
  if (!href) return null
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`text-indigo-600 hover:underline ${className}`}>
      {children} ↗
    </a>
  )
}
