'use client'

import { ReactNode } from 'react'

export interface FeatureItemProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="text-center p-6 feature-item bg-white rounded-xl hover:shadow-lg transition-shadow duration-300">
      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 feature-icon">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-primary" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {icon}
        </svg>
      </div>
      <h3 className="text-xl font-serif text-primary mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}
