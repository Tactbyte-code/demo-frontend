'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ReportHeader from './header/ReportHeader'
import { Notice, TabBar } from './ui'
import { TABS } from './config/tabs'
import { scrollToSection } from '@/lib/scrollToSection'

export default function ReportView({ report }) {
  const [active, setActive] = useState('overview')

  const tab = TABS.find((t) => t.key === active) ?? TABS[0]
  const hasData = !tab.param || report.parameters?.[tab.param]

  const openFromHeader = (key) => {
    setActive(key)
    scrollToSection('report-tabs')
  }

  const tabs = TABS.map((t) => ({
    key: t.key,
    label: t.label,
    badge: t.param ? report.parameters?.[t.param]?.score ?? null : undefined,
  }))

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Back Button */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <Link
          href="/dashboard/validate-idea"
          className="group inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
        >
          <div className='bg-background rounded-full p-1 mr-2 transition-transform group-hover:-translate-x-1'>
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back
        </Link>
      </div>

      <ReportHeader report={report} onSelectTab={openFromHeader} />

      <div id="report-tabs">
        <TabBar tabs={tabs} active={tab.key} onChange={setActive} />
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {hasData ? (
          <tab.Component report={report} />
        ) : (
          <Notice tone="slate" title="No data">This parameter is not part of the report.</Notice>
        )}
        <p className="mt-10 rounded-xl border border-slate-200 bg-white p-4 text-center text-xs text-slate-500">
          {report.disclaimer}
        </p>
      </main>
    </div>
  )
}