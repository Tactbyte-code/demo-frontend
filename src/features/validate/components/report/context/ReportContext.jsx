'use client'

import React, { createContext, useContext, useMemo } from 'react'

const ReportContext = createContext(null)

/** Gives every component access to the report, a source lookup and the per-parameter score breakdown. */
export function ReportProvider({ report, children }) {
  const value = useMemo(
    () => ({
      report,
      sourceMap: Object.fromEntries((report.sources || []).map((s) => [s.id, s])),
      breakdownByKey: Object.fromEntries((report.overall?.score_breakdown || []).map((p) => [p.parameter, p])),
    }),
    [report]
  )
  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
}

export function useReport() {
  const ctx = useContext(ReportContext)
  if (!ctx) throw new Error('useReport must be used inside <ReportProvider>')
  return ctx
}
