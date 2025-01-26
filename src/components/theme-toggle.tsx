'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover:text-pink-500 dark:hover:text-pink-400 relative h-9 w-9">
        <div className="h-5 w-5" />
      </div>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover:text-pink-500 dark:hover:text-pink-400 relative"
      aria-label="Tema değiştir"
    >
      <div className="relative h-5 w-5 overflow-hidden">
        <motion.div
          key="sun"
          initial={{ x: 0, opacity: theme === 'light' ? 1 : 0 }}
          animate={{
            x: theme === 'dark' ? -24 : 0,
            opacity: theme === 'dark' ? 0 : 1
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute top-0 left-0"
        >
          <Sun className="h-5 w-5" />
        </motion.div>
        
        <motion.div
          key="moon"
          initial={{ x: 24, opacity: theme === 'dark' ? 1 : 0 }}
          animate={{
            x: theme === 'dark' ? 0 : 24,
            opacity: theme === 'dark' ? 1 : 0
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute top-0 left-0"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
      </div>
    </button>
  )
}