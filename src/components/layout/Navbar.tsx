'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/blog', label: 'Blog' },
  { href: '/randevu', label: 'Randevu' },
  { href: '/iletisim', label: 'İletişim' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const navRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Basitleştirilmiş header efekti
      gsap.to(headerRef.current, {
        scrollTrigger: {
          start: 'top top',
          end: '+=200',
          scrub: true
        },
        backgroundColor: 'rgba(0,0,0,0.9)',
        ease: 'none'
      })

      // Daha hafif nav animasyonu
      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out'
      })

      // Basitleştirilmiş logo animasyonu
      gsap.from(logoRef.current, {
        scale: 0.9,
        duration: 0.5,
        ease: 'power2.out'
      })
    })

    return () => ctx.revert()
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header 
      ref={headerRef} 
      className="fixed w-full z-50 transition-all duration-300 bg-black/95 backdrop-blur border-b border-white/10 " 
    >
      <nav ref={navRef} className="container mx-auto px-8 py-6 ">
        <div className="flex items-center justify-between">
          <Link href="/" className="group relative " ref={logoRef}>
            <div className="relative flex items-center space-x-4 ">
              <motion.img 
                src="/lotus-logo.svg" 
                alt="Locafit Logo" 
                className="h-16 w-16"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              />
              <div className="flex flex-col">
                <span className="text-4xl font-bold bg-gradient-to-r from-white via-primary to-purple-400 bg-clip-text text-transparent font-playfair">
                  Loca Fit
                </span>
                <span className="text-sm text-gray-400 tracking-[0.3em] uppercase mt-1">
                  Studio
                </span>
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <div key={item.href} className="nav-item group px-2 overflow-hidden">
                {item.label === 'Randevu' ? (
                  <Link
                    href={item.href}
                    className="relative px-6 py-2 bg-gradient-to-r from-primary to-purple-500 rounded-lg overflow-hidden"
                  >
                    <span className="relative z-10 text-lg text-white font-medium tracking-wide">
                      {item.label}
                    </span>
                    <div className="wave-effect absolute inset-0"></div>
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    className="relative px-4 py-2"
                  >
                    <span className="relative z-10 text-lg text-white group-hover:text-primary transition-colors duration-200 font-medium tracking-wide">
                      {item.label}
                    </span>
                    {pathname === item.href ? (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-purple-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    )}
                    <motion.div 
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500"
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                )}
              </div>
            ))}
          </div>

          <motion.button 
            className="md:hidden relative"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
          >
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-lg opacity-0 group-hover:opacity-100 blur-lg transition-all duration-200"></div>
            <div className="relative p-2">
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180, scale: 1.1 },
                  closed: { rotate: 0, scale: 1 }
                }}
                transition={{ duration: 0.3, ease: "anticipate" }}
                className="w-6 h-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen 
                      ? "M6 18L18 6M6 6l12 12" 
                      : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </motion.div>
            </div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden mt-6"
            >
              <motion.div 
                className="space-y-2 p-4 rounded-xl bg-black/95 backdrop-blur border-t border-white/10"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <Link
                      href={item.href}
                      className={`block relative overflow-hidden rounded-lg transition-all duration-200 ${
                        pathname === item.href 
                          ? 'text-primary' 
                          : 'text-white'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                      <span className="relative block p-4 text-lg font-playfair tracking-wider">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
