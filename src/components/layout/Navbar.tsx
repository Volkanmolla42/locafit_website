"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/galeri", label: "Galeri" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node)
    ) {
      setIsMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          setTheme(isDark ? "dark" : "light");
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.from(".nav-item", {
        y: -20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2,
      });

      gsap.from(logoRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-soft border-b border-pink-100/50 dark:border-gray-800/50"
          : "bg-transparent"
      }`}
    >
      <nav ref={navRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "h-16" : "h-20"
        }`}>
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 relative group"
            ref={logoRef}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className={`relative transition-all duration-500 ${
                isScrolled ? "w-10 h-10" : "w-12 h-12 md:w-14 md:h-14"
              }`}>
                <Image
                  src="/lotus.png"
                  alt="Locafit Logo"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  sizes={isScrolled ? "40px" : "(max-width: 768px) 48px, 56px"}
                  priority
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <div className={`transition-all duration-500 ${
                  isScrolled ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
                }`}>
                  <span className="font-bold text-gradient font-playfair whitespace-nowrap group-hover:scale-105 transition-transform duration-300 inline-block">
                    Loca Fit
                  </span>
                  <span className={`text-pink-500/70 dark:text-pink-400/70 tracking-wider uppercase ml-2 transition-all duration-500 ${
                    isScrolled ? "text-xs" : "text-xs md:text-sm"
                  }`}>
                    Studio
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                className="nav-item px-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    pathname === item.href
                      ? "text-white bg-gradient-primary shadow-glow"
                      : "text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/80 hover:to-rose-500/80"
                  }`}
                >
                  {item.label}
                  {pathname !== item.href && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/randevularim"
                className="ml-4 btn-primary inline-flex items-center gap-2 text-sm hover-lift"
              >
                <FaCalendarAlt className="w-4 h-4" />
                Randevularım
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Open menu</span>
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoClose className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoMenu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              ref={mobileMenuRef}
              className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl mt-4 border border-pink-100/50 dark:border-gray-800/50 shadow-soft"
            >
              <div className="p-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                        pathname === item.href
                          ? "text-white bg-gradient-primary shadow-glow"
                          : "text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/80 hover:to-rose-500/80"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
                >
                  <Link
                    href="/randevularim"
                    className="btn-primary w-full inline-flex items-center justify-center gap-2 text-base hover-lift"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaCalendarAlt className="w-4 h-4" />
                    Randevularım
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
