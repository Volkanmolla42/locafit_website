'use client'

import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './navigationEvents.css'
import Loading from '@/app/loading'

NProgress.configure({
  minimum: 0.2,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
})

function NavigationEventsContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done()
    return () => {
      NProgress.start()
    }
  }, [pathname, searchParams])

  return null
}

export function NavigationEvents() {
  return (
    <Suspense fallback={<Loading />}>
      <NavigationEventsContent />
    </Suspense>
  )
}
