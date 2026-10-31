// TabBar.jsx
import React from 'react';
import { Lock } from 'lucide-react';

/** tabs: [{ key, label, badge?, locked? }] — badge undefined = none, null = "N/A". */
export default function TabBar({ tabs, active, onChange, onLockedClick }) {
  return (
    <nav id="report-tabs" className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur print:hidden">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6">
        <div role="tablist" className="flex min-w-max gap-1 py-2">
          {tabs.map((t) => {
            const on = active === t.key
            const isLocked = t.locked

            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={on}
                onClick={() => isLocked ? onLockedClick() : onChange(t.key)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isLocked 
                    ? 'cursor-not-allowed opacity-60 bg-slate-50 text-slate-400 hover:bg-slate-100'
                    : on 
                      ? 'bg-indigo-600 text-white shadow' 
                      : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isLocked && <Lock className="h-3.5 w-3.5" />}
                {t.label}
                {t.badge !== undefined && (
                  <span className={`rounded-md px-1.5 text-xs ${on && !isLocked ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {t.badge ?? 'N/A'}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}