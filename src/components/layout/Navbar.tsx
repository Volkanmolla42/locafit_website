"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/galeri", label: "Galeri" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar background and height animation on scroll
      gsap.to(headerRef.current, {
        scrollTrigger: {
          start: "top top",
          end: "+=100",
          scrub: true,
        },
        backgroundColor: "rgba(255,255,255,0.8)",
        height: "64px", // Smaller height when scrolled
        ease: "power2.out",
      });

      // Logo size animation on scroll
      gsap.to(".logo-container", {
        scrollTrigger: {
          start: "top top",
          end: "+=100",
          scrub: true,
        },
        scale: 0.85,
        ease: "power2.out",
      });

      // Initial animations
      gsap.from(".nav-item", {
        y: -20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from(logoRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed w-full z-50 transition-all duration-300 bg-pink-50/90 backdrop-blur-md border-b border-pink-100 shadow-sm"
    >
      <nav ref={navRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 transition-all duration-300">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 relative logo-container group"
            ref={logoRef}
          >
            <div className="flex items-center space-x-2">
              <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/lotus.png"
                  alt="Locafit Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 48px, 56px"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent font-playfair whitespace-nowrap transition-all duration-300 group-hover:from-rose-500 group-hover:to-purple-500">
                  Loca Fit
                  <span className="text-xs md:text-sm text-pink-500/70 tracking-[0.2em] md:tracking-[0.3em] uppercase ml-2 transition-colors duration-300 group-hover:text-pink-600">
                    Studio
                  </span>
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="nav-item px-1"
              >
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:text-pink-600 group ${
                    pathname === item.href
                      ? "text-pink-600"
                      : "text-pink-700/70 hover:text-pink-800"
                  }`}
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-rose-300 to-pink-300 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </div>
            ))}
            <Link
              href="/randevularim"
              className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-400 to-pink-400 text-white font-medium text-sm transition-all duration-300 hover:from-rose-500 hover:to-pink-500 hover:shadow-lg hover:shadow-pink-200 transform hover:-translate-y-0.5"
            >
              Randevularım
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-pink-700/70 hover:text-pink-800 hover:bg-pink-100/50 transition-all duration-300"
          >
            <span className="sr-only">Open menu</span>
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-pink-50/95 backdrop-blur-md shadow-lg border-b border-pink-100 p-4 md:hidden"
            >
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 text-base ${
                      pathname === item.href
                        ? "text-pink-600"
                        : "text-pink-700/70 hover:text-pink-800"
                    } transition-colors duration-200`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/randevularim"
                  className="mt-2 block px-4 py-2 text-base text-center bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-lg hover:from-rose-500 hover:to-pink-500 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Randevularım
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
