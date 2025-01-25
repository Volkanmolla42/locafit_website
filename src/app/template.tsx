'use client'

import { Suspense } from 'react'
import Loading from './loading'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
      >
        {children}
      </motion.div>
    </Suspense>
  )
}
