'use client'

import React from 'react'
import ReportHeader from './header/ReportHeader'
import { Notice, TabBar } from './ui'
import { TABS } from './config/tabs'
import useHashTab from './hooks/useHashTab'

const TAB_KEYS = TABS.map((t) => t.key)

/** The completed report: header, sticky tab bar and the active tab. */
export default function ReportView({ report }) {
  const [active, setActive] = useHashTab(TAB_KEYS, 'overview')
  const tab = TABS.find((t) => t.key === active) ?? TABS[0]
  const hasData = !tab.param || report.parameters?.[tab.param]

  const openFromHeader = (key) => {
    setActive(key)
    document.getElementById('report-tabs')?.scrollIntoView({ behavior: 'smooth' })
  }

  const tabs = TABS.map((t) => ({
    key: t.key,
    label: t.label,
    badge: t.param ? report.parameters?.[t.param]?.score ?? null : undefined,
  }))

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <ReportHeader report={report} onSelectTab={openFromHeader} />
      <TabBar tabs={tabs} active={tab.key} onChange={setActive} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {hasData ? (
          <tab.Component report={report} />
        ) : (
          <Notice tone="slate" title="No data">This parameter is not part of the report.</Notice>
        )}
        <p className="mt-10 rounded-xl border border-slate-200 bg-white p-4 text-center text-xs text-slate-500">{report.disclaimer}</p>
      </main>
    </div>
  )
}
