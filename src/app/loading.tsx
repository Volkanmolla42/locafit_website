'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-pink-100/90 dark:bg-gray-900/90 backdrop-blur-xs z-50">
      <div className="text-center">
        <motion.div
          className="w-20 h-20 relative"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: 360 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-pink-300 dark:border-pink-700 opacity-30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-pink-400 dark:border-pink-500 border-t-transparent animate-spin"></div>
          <motion.div 
            className="absolute inset-2 flex items-center justify-center"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-pink-500 dark:text-pink-400 text-2xl">♡</span>
          </motion.div>
        </motion.div>
        <p className="mt-4 text-pink-600 dark:text-pink-400 font-medium text-lg">Yükleniyor...</p>
      </div>
    </div>
  )
}
