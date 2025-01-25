'use client'

import { useState, useEffect } from 'react'
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import EMSInfoSection from '@/components/home/EMSInfoSection'

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      // GSAP animations
      const ctx = gsap.context(() => {
        // Appointment button animation
        gsap.to('.appointment-btn', {
          opacity: 1,
          y: 0,
          duration: .5,
          delay: 0.4,
          ease: 'power1.in'
        })

        // Hero section fade in
        gsap.from('.hero-content', {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out'
        })

        // Neden Biz items slide in
        const featureItems = document.querySelectorAll('.feature-item')
        featureItems.forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out'
          })
        })

        // EMS section slide and fade
        gsap.from('.ems-content', {
          scrollTrigger: {
            trigger: '.ems-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: -50,
          duration: 1,
          ease: 'power2.out'
        })

        gsap.from('.ems-image', {
          scrollTrigger: {
            trigger: '.ems-image',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: 50,
          duration: 1,
          ease: 'power2.out'
        })

        // Contact form fade up
        gsap.from('.contact-form', {
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power2.out'
        })
      })

      return () => ctx.revert()
    };

    initGSAP();
  }, [isClient])

  return (
    <main className="min-h-screen bg-background overflow-x-hidden" data-scroll-container>
      {/* Hero Section */}
      <div data-scroll-section>
        <HeroSection />
      </div>

      {/* Hizmetler Section */}
      <div data-scroll-section>
        <ServicesSection />
      </div>

      {/* Neden Biz Section */}
      <div data-scroll-section>
        <FeaturesSection />
      </div>

      {/* EMS Bilgi Section */}
      <div data-scroll-section>
        <EMSInfoSection />
      </div>

      
    </main>
  )
}
