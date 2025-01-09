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
  { href: "/randevu", label: "Randevularım" },
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
      gsap.to(headerRef.current, {
        scrollTrigger: {
          start: "top top",
          end: "+=200",
          scrub: true,
        },
        backgroundColor: "rgba(0,0,0,0.9)",
        ease: "none",
      });

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
      className="fixed w-full z-50 transition-all duration-300 bg-black/95 backdrop-blur border-b border-white/10"
    >
      <nav ref={navRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 relative"
            ref={logoRef}
          >
            <div className="flex items-center space-x-2">
              <div className="relative w-12 h-12 md:w-14 md:h-14">
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
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-primary to-purple-400 bg-clip-text text-transparent font-playfair whitespace-nowrap">
                  Loca Fit
                  <span className="text-xs md:text-sm text-gray-400 tracking-[0.2em] md:tracking-[0.3em] uppercase ml-2">
                    Studio
                  </span>
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="nav-item px-1"
              >
                {item.label === "Randevularım" ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.href}
                      className="relative inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-primary to-purple-500 rounded-lg overflow-hidden"
                    >
                      <span className="relative z-10 text-sm lg:text-base text-white font-medium">
                        {item.label}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%", opacity: 0 }}
                        whileHover={{ x: "100%", opacity: 0.5 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </Link>
                  </motion.div>
                ) : (
                  <Link
                    href={item.href}
                    className="relative inline-flex items-center px-3 py-1.5"
                  >
                    <span className="text-sm lg:text-base text-white hover:text-primary transition-colors duration-200">
                      {item.label}
                    </span>
                    {pathname === item.href && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.4,
                        }}
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.2 }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 text-base ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-white hover:text-primary"
                    } transition-colors duration-200`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
