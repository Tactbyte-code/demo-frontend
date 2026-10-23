import React from 'react'

export const Stack = ({ children, className = '' }) => <div className={`space-y-6 ${className}`}>{children}</div>

export const TwoCol = ({ children, className = '' }) => (
  <div className={`grid gap-6 lg:grid-cols-2 ${className}`}>{children}</div>
)

const COLS = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  5: 'sm:grid-cols-2 lg:grid-cols-5',
}
export const StatGrid = ({ cols = 4, children }) => <div className={`grid gap-4 ${COLS[cols]}`}>{children}</div>
