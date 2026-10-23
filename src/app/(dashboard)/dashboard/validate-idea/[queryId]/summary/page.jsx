'use client'

import { useParams } from 'next/navigation'
import ReportPage from '@/features/validate/components/report/ReportPage'

export default function Page() {
  const { queryId } = useParams()
  return <ReportPage queryId={queryId} />
}
