'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './navigationEvents.css'

NProgress.configure({
  minimum: 0.2,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
})

export function NavigationEvents() {
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
