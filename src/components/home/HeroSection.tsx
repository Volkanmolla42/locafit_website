'use client'

import Image from 'next/image'
import { Button } from '../shared/Button'

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center px-4 hero-section overflow-hidden">
      <div className="absolute inset-0 overflow-hidden hero-bg">
        <Image
          src="/bg.avif"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 text-center hero-content">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] reveal-text">
          Loca Fit Studio
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] reveal-text">
          EMS teknolojisi ile kişiye özel fitness deneyimi
        </p>
        <Button 
          href="/randevu"
          style={{ opacity: 0, transform: 'translateY(50px)' }}
        >
          <span className="flex items-center space-x-2">
            <span>Randevu Al</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </span>
        </Button>
      </div>
    </section>
  )
}
