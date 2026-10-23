import React from 'react'

/** rows/cols: [{ key, label }]; isOn(rowKey, colKey) -> boolean */
export default function Heatmap({ rows, cols, isOn, onClass = 'bg-indigo-500' }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr>
            <th />
            {cols.map((c) => (
              <th key={c.key} className="px-1 pb-2 font-medium text-slate-500">
                <span className="mx-auto block h-24 rotate-180 [writing-mode:vertical-rl]">{c.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-t border-slate-100">
              <td className="max-w-[260px] py-1.5 pr-3 text-slate-700">{r.label}</td>
              {cols.map((c) => (
                <td key={c.key} className="p-1">
                  <div className={`mx-auto h-5 w-5 rounded ${isOn(r.key, c.key) ? onClass : 'bg-slate-100'}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
