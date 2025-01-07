'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'

interface LocomotiveScrollInstance {
  scroll: {
    instance: {
      scroll: {
        y: number;
      };
    };
  };
  instance: {
    scroll: {
      y: number;
    };
  };
  
  y: number;
  scrollTo: (target: number | string | HTMLElement, options?: { offset?: number }) => void;
  update: () => void;
  on: (event: string, callback: () => void) => void;
  destroy: () => void;
}

interface LocomotiveScrollOptions {
  el: HTMLElement;
  smooth: boolean;
  multiplier?: number;
  lerp?: number;
  smartphone?: {
    smooth: boolean;
    multiplier?: number;
  };
  tablet?: {
    smooth: boolean;
    multiplier?: number;
    breakpoint: number;
  };
}

declare global {
  interface Element {
    __locomotiveScroll?: LocomotiveScrollInstance;
  }
}

// Utility function for smooth scrolling
export const scrollToSection = (sectionId: string) => {
  const locomotiveScroll = document.querySelector('[data-scroll-container]')?.__locomotiveScroll;
  if (locomotiveScroll) {
    const targetElement = document.querySelector(sectionId) as HTMLElement;
    if (targetElement) {
      locomotiveScroll.scrollTo(targetElement, {
        offset: 0
      });
    }
  }
};

export function Animations() {
  const [isClient, setIsClient] = useState(false)
  const locomotiveScrollRef = useRef<LocomotiveScrollInstance | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    gsap.registerPlugin(ScrollTrigger)

    // Initialize Locomotive Scroll
    const scrollOptions: LocomotiveScrollOptions = {
      el: document.querySelector('[data-scroll-container]') as HTMLElement,
      smooth: true,
      multiplier: 1,
      smartphone: {
        smooth: true,
        multiplier: 1
      },
      tablet: {
        smooth: true,
        multiplier: 1,
        breakpoint: 768
      }
    }
    locomotiveScrollRef.current = new LocomotiveScroll(scrollOptions) as unknown as LocomotiveScrollInstance

    // Update ScrollTrigger when locomotive scroll updates
    locomotiveScrollRef.current.on('scroll', ScrollTrigger.update)

    // Tell ScrollTrigger to use these proxy methods for the "[data-scroll-container]" element
    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
      scrollTop(value) {
        if (locomotiveScrollRef.current) {
          return arguments.length && value !== undefined
            ? locomotiveScrollRef.current.scrollTo(value)
            : locomotiveScrollRef.current.scroll.instance.scroll.y;
        }
        return 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    })

    // GSAP animations
    const ctx = gsap.context(() => {
      // Text reveal animation for hero section
      gsap.from('.reveal-text', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
      })

      // Appointment button animation
      gsap.to('.appointment-btn', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        ease: 'back.out(1.2)'
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
            toggleActions: 'play none none reverse',
            scroller: '[data-scroll-container]'
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
          toggleActions: 'play none none reverse',
          scroller: '[data-scroll-container]'
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
          toggleActions: 'play none none reverse',
          scroller: '[data-scroll-container]'
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
          toggleActions: 'play none none reverse',
          scroller: '[data-scroll-container]'
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out'
      })

      // Parallax effect for background images
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          scroller: '[data-scroll-container]'
        }
      })
    })

    // Handle window resize
    const handleResize = () => {
      locomotiveScrollRef.current?.update()
      ScrollTrigger.update()
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      ctx.revert()
      locomotiveScrollRef.current?.destroy()
      window.removeEventListener('resize', handleResize)
    }
  }, [isClient])

  return null
}
