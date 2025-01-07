'use client'

import { useApp, appActions } from '@/context/AppContext'
import { useEffect } from 'react'

export function Notifications() {
  const { state, dispatch } = useApp()

  useEffect(() => {
    // Otomatik notification kaldırma
    const timeouts = state.notifications.map(notification => {
      return setTimeout(() => {
        dispatch(appActions.removeNotification(notification.id))
      }, 5000) // 5 saniye sonra otomatik kaybolur
    })

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [state.notifications, dispatch])

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {state.notifications.map(notification => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 ${
            notification.type === 'success'
              ? 'bg-green-500 text-white'
              : notification.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
        >
          <div className="flex justify-between items-start">
            <p className="text-sm">{notification.message}</p>
            <button
              onClick={() => dispatch(appActions.removeNotification(notification.id))}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
