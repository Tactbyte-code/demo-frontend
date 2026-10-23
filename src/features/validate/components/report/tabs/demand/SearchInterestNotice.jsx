import React from 'react'
import { Notice } from '@/features/validate/components/report/ui'

export default function SearchInterestNotice({ searchInterest }) {
  if (!searchInterest || searchInterest.available) return null
  return (
    <Notice tone="slate" title="Search interest unavailable">
      {searchInterest.reason}
    </Notice>
  )
}
