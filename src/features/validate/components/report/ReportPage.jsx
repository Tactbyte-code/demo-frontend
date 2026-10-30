'use client'

import React from 'react'
import { ReportProvider } from './context/ReportContext'
import ReportView from './ReportView'
import { ErrorState, LoadingState, StatusState } from './states'
import { useGetSummary } from '../../hooks/useGetSummary'

/** Fetches the report for `queryId` and renders it. */
export default function ReportPage({ queryId }) {
  const { data: summary, isPending, isError, error } = useGetSummary(queryId)

  if (isPending) return <LoadingState />
  if (isError) return <ErrorState error={error} />
  if (!summary) return <ErrorState>The report came back empty.</ErrorState>
  if (summary.status && summary.status !== 'COMPLETED') return <StatusState status={summary.status} />

  return (
    <ReportProvider report={summary}>
      <ReportView report={summary} />
    </ReportProvider>
  )
}
