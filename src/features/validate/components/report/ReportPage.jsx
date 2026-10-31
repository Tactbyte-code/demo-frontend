'use client'

import React, { useEffect } from 'react';
import { ReportProvider } from './context/ReportContext';
import ReportView from './ReportView';
import { ErrorState, LoadingState, StatusState } from './states';
import { useGetSummary } from '../../hooks/useGetSummary';
import { useCreditStore } from '@/store/useCreditStore';

export default function ReportPage({ queryId }) {
  const { data: summary, isPending, isError, error, refetch } = useGetSummary(queryId);
  const getCredits = useCreditStore((state) => state.getCredits);

  useEffect(() => {
    // Fetch updated balance once the summary is successfully fetched.
    // getCredits(true) automatically sets loadingCredits to false when it finishes.
    if (summary && !isPending) {
      getCredits(true).catch(console.error);
    }
  }, [summary, isPending, getCredits]);

  if (isPending) return <LoadingState />
  if (isError) return <ErrorState error={error} />
  if (!summary) return <ErrorState>The report came back empty.</ErrorState>
  if (summary.status && summary.status !== 'COMPLETED') return <StatusState status={summary.status} />

  return (
    <ReportProvider report={summary}>
      <ReportView report={summary} queryId={queryId} onRefetch={refetch} />
    </ReportProvider>
  )
}