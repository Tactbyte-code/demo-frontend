import React from 'react'

/**
 * columns: [{ key, label, align?: 'right', className?, render?: (row, index) => node }]
 */
export default function DataTable({ columns, rows, minWidth = 560 }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" style={{ minWidth }}>
        <thead>
          <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
            {columns.map((c) => (
              <th key={c.key} className={`py-2 pr-3 font-medium ${c.align === 'right' ? 'text-right' : ''}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-slate-100 align-top last:border-0">
              {columns.map((c) => (
                <td key={c.key} className={`py-3 pr-3 ${c.align === 'right' ? 'text-right' : ''} ${c.className ?? ''}`}>
                  {c.render ? c.render(r, i) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
