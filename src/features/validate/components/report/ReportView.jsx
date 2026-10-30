'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ReportHeader from './header/ReportHeader'
import { Notice, TabBar } from './ui'
import { TABS } from './config/tabs'
import { scrollToSection } from '@/lib/scrollToSection'
import CreditPurchaseModal from '@/components/credits/CreditPurchaseModal'

export default function ReportView({ report }) {
  const [active, setActive] = useState('overview')
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  const tab = TABS.find((t) => t.key === active) ?? TABS[0]
  
  // Check the boolean flag to determine if the active tab has unlocked data
  const currentParamData = report.parameters?.[tab.param]
  const hasData = !tab.param || (currentParamData && !currentParamData.locked)

  const handleTabChange = (key, isLocked) => {
    if (isLocked) {
      setShowPurchaseModal(true)
      return
    }
    
    setActive(key)
    if (key !== active) {
        scrollToSection('report-tabs')
    }
  }

  const openFromHeader = (key) => {
    const targetTab = TABS.find((t) => t.key === key)
    const targetParamData = report.parameters?.[targetTab?.param]
    const isLocked = targetParamData?.locked === true
    
    handleTabChange(key, isLocked)
  }

  const tabs = TABS.map((t) => {
    const paramData = t.param ? report.parameters?.[t.param] : null
    const isLocked = paramData?.locked === true

    return {
      key: t.key,
      label: t.label,
      badge: paramData && !isLocked ? paramData.score ?? null : undefined,
      isLocked: isLocked, 
    }
  })

  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      <CreditPurchaseModal 
        isOpen={showPurchaseModal} 
        onClose={() => setShowPurchaseModal(false)} 
      />

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
        <TabBar 
            tabs={tabs} 
            active={tab.key} 
            onChange={(key) => {
                const clickedTab = tabs.find(t => t.key === key)
                handleTabChange(key, clickedTab?.isLocked)
            }} 
        />
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {hasData ? (
          <tab.Component report={report} />
        ) : (
          <Notice tone="slate" title="Data Unavailable">This parameter is currently locked or not part of the report.</Notice>
        )}
        <p className="mt-10 rounded-xl border border-slate-200 bg-white p-4 text-center text-xs text-slate-500">
          {report.disclaimer}
        </p>
      </main>
    </div>
  )
}