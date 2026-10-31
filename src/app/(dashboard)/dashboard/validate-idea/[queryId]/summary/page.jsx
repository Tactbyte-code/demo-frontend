'use client'

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReportPage from '@/features/validate/components/report/ReportPage';
import { useCreditStore } from '@/store/useCreditStore';

export default function Page() {
  const { queryId } = useParams();
  const router = useRouter();
  const setLoadingCredits = useCreditStore((state) => state.setLoadingCredits);

  // always navigate to the validate idea page on browser back
  useEffect(() => {
    // Set loading to true as soon as the component mounts
    setLoadingCredits(true);

    // 1. Push a dummy state into the history stack when the page loads
    // This ensures there is a specific state to "pop" when the back button is clicked
    if (!window.history.state || !window.history.state.backTrap) {
      window.history.pushState({ backTrap: true }, '', window.location.href)
    }

    const handleBackButton = () => {
      // 2. When the user clicks the browser back button, intercept it and route to the dashboard
      router.replace('/dashboard/validate-idea')
    }

    window.addEventListener('popstate', handleBackButton)

    return () => {
      window.removeEventListener('popstate', handleBackButton)
    }
  }, [router, setLoadingCredits])

  return <ReportPage queryId={queryId} />
}