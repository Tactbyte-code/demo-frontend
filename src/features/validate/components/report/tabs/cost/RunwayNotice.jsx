import React from 'react'
import { Notice } from '@/features/validate/components/report/ui'

export default function RunwayNotice({ months, note }) {
  return (
    <Notice tone="slate" title="Runway">
      {months != null ? `${months} months. ` : ''}
      {note ?? (months == null ? 'Not calculated.' : '')}
    </Notice>
  )
}
