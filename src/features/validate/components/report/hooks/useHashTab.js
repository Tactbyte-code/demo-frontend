'use client'

import { useCallback, useEffect, useState } from 'react'

/** Active-tab state that is mirrored to the URL hash, so a tab can be linked to / survives refresh. */
export default function useHashTab(validKeys, fallback) {
  const [active, setActive] = useState(fallback)

  useEffect(() => {
    const fromHash = window.location.hash.replace('#', '')
    if (validKeys.includes(fromHash)) setActive(fromHash)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const select = useCallback((key) => {
    setActive(key)
    window.history.replaceState(null, '', `#${key}`)
  }, [])

  return [active, select]
}
