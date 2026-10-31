'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ReportHeader from './header/ReportHeader'
import { Notice, TabBar } from './ui'
import { TABS } from './config/tabs'
import { scrollToSection } from '@/lib/scrollToSection'
import CreditPurchaseModal from '@/components/credits/CreditPurchaseModal'
import UnlockSectionModal from '@/components/credits/UnlockSectionModal'
import { unlockParameter } from '../../api/validate.api'
import { useCreditStore } from '@/store/useCreditStore'

const SECTION_CREDITS = 22

export default function ReportView({ report, queryId, onRefetch }) {
  const [active, setActive] = useState('overview')
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [showUnlockModal, setShowUnlockModal] = useState(false)
  const pendingTabRef = useRef(null)     // the locked tab the user clicked
  const unlockedKeyRef = useRef(null)    // tab whose unlock call already succeeded (a retry never unlocks twice)

  // `getCredits` is the store's refresh function
  const { credits, getCredits } = useCreditStore()
  const balance = credits ?? 0

  const tab = TABS.find((t) => t.key === active) ?? TABS[0]

  // Check the boolean flag to determine if the active tab has unlocked data
  const currentParamData = report.parameters?.[tab.param]
  const hasData = !tab.param || (currentParamData && !currentParamData.locked)

  const pendingTab = TABS.find((t) => t.key === pendingTabRef.current)

  const handleTabChange = (key, isLocked) => {
    if (isLocked) {
      pendingTabRef.current = key
      // enough credits for one section -> confirm and unlock; otherwise -> buy credits first
      if (balance >= SECTION_CREDITS) setShowUnlockModal(true)
      else setShowPurchaseModal(true)
      return
    }

    setActive(key)
    if (key !== active) {
      scrollToSection('report-tabs')
    }
  };

  const openFromHeader = (key) => {
    const targetTab = TABS.find((t) => t.key === key)
    const targetParamData = report.parameters?.[targetTab?.param]
    const isLocked = targetParamData?.locked === true

    handleTabChange(key, isLocked)
  };

  // Unlock the section behind `tabKey`, refetch the summary and open it.
  // Throws on failure so the calling modal can show its error / Retry.
  const unlockSection = async (tabKey) => {
    const target = TABS.find((t) => t.key === tabKey)
    if (!target?.param) throw new Error('Unknown section')

    if (unlockedKeyRef.current !== tabKey) {
      await unlockParameter(queryId, target.param)   // target.param = the key inside report.parameters
      unlockedKeyRef.current = tabKey
    }

    const result = await onRefetch()
    if (result?.isError) throw result.error ?? new Error('Could not refresh the report')

    // Make a silent failure visible: the refetched report must show the section as unlocked
    if (result?.data?.parameters?.[target.param]?.locked !== false) {
      throw new Error('The section was unlocked but the report did not update. Please refresh the page.')
    }

    unlockedKeyRef.current = null
    pendingTabRef.current = null
    await getCredits(true)

    setActive(target.key)
    scrollToSection('report-tabs')
  }

  // Path A: user had enough credits and pressed "Unlock section"
  const handleUnlockConfirm = () => unlockSection(pendingTabRef.current)

  // Path B: user bought credits first; the purchase modal calls this after payment succeeds
  const handlePurchaseSuccess = () => unlockSection(pendingTabRef.current)

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

      <UnlockSectionModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        sectionLabel={pendingTab?.label}
        credits={balance}
        cost={SECTION_CREDITS}
        onUnlock={handleUnlockConfirm}
      />

      <CreditPurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onPurchaseSuccess={handlePurchaseSuccess}
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
            const clickedTab = tabs.find((t) => t.key === key)
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