"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoSparkles, IoBody, IoHeart } from "react-icons/io5";
import { FaArrowRight, FaPlay } from "react-icons/fa";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".hero-flower",
          {
            rotate: -30,
            scale: 0.8,
            opacity: 0,
          },
          {
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 2,
            ease: "elastic.out(1, 0.5)",
          }
        );

        gsap.fromTo(
          titleRef.current,
          {
            y: 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.6,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.9,
            ease: "power3.out",
          }
        );

        // Enhanced parallax effect
        gsap.to(".parallax-bg", {

          y: (i, el) =>
            (1 - parseFloat(el.getAttribute("data-speed") || "0.5")) *
            ScrollTrigger.maxScroll(window),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        // Floating animations for decorative elements
        gsap.to(".floating-icon", {
          y: "random(-20, 20)",
          rotation: "random(-10, 10)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: {
            amount: 1.5,
            from: "random"
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    };

    initGSAP();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex py-20 overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900"
    >
      {/* Enhanced background elements */}
      <div className="absolute parallax-bg inset-0 overflow-hidden" data-speed="0.5">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-pink-400/60 to-rose-400/60 dark:from-pink-500/30 dark:to-rose-500/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-400/50 to-pink-400/50 dark:from-purple-500/25 dark:to-pink-500/25 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-rose-300/40 to-purple-300/40 dark:from-rose-500/20 dark:to-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000"
        />
      </div>

      {/* Floating decorative icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="floating-icon absolute top-1/4 left-1/4 text-pink-300/40 dark:text-pink-400/30"
        >
          <IoSparkles className="w-8 h-8" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="floating-icon absolute top-1/3 right-1/4 text-purple-300/40 dark:text-purple-400/30"
        >
          <IoBody className="w-10 h-10" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="floating-icon absolute bottom-1/3 left-1/6 text-rose-300/40 dark:text-rose-400/30"
        >
          <IoHeart className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-content max-w-5xl mx-auto"
        >
          {/* Logo with enhanced animation */}
          <motion.div
            variants={itemVariants}
            className="relative inline-block mb-8"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 0.5, type: "spring", stiffness: 100 }}
                className="relative z-10"
              >
                <Image
                  src="/lotus.png"
                  alt="Loca Fit Logo"
                  width={100}
                  height={100}
                  className="hero-flower mx-auto filter drop-shadow-2xl"
                />
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-2xl scale-150"
              />
            </div>
          </motion.div>

          {/* Enhanced title */}
          <motion.h1
            ref={titleRef}
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tighter"
          >
            <span className="block text-gradient font-playfair">
              Loca Fit
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-medium text-gray-700 dark:text-gray-300 mt-2">
              Studio
            </span>
          </motion.h1>

          {/* Enhanced subtitle */}
          <motion.div
            ref={subtitleRef}
            variants={itemVariants}
            className="max-w-3xl mx-auto mb-10"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-4">
              Kadınlara özel profesyonel{" "}
              <span className="text-gradient font-semibold">EMS antrenman</span> ve{" "}
              <span className="text-gradient font-semibold">kişisel fitness</span> deneyimi
            </p>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
              Uzman eğitmenlerimiz eşliğinde sağlıklı yaşam hedeflerinize ulaşın
            </p>
          </motion.div>

          {/* Enhanced CTA buttons */}
          <motion.div
            ref={ctaRef}
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/iletisim"
                className="btn-primary inline-flex items-center gap-3 text-lg font-semibold px-8 py-4 hover-lift group"
              >
                Hemen Başla
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <FaArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/galeri"
                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full border-2 border-pink-300 dark:border-pink-500 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300 hover-lift group"
              >
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center group-hover:bg-pink-200 dark:group-hover:bg-pink-800/50 transition-colors">
                  <FaPlay className="w-4 h-4 ml-0.5" />
                </div>
                Stüdyoyu Gez
              </Link>
            </motion.div>
          </motion.div>

          {/* Statistics or highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">100+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Mutlu Üye</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">3+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Yıl Deneyim</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Başarılı Antrenman</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <motion.svg
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            className="text-white dark:text-gray-900"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </motion.svg>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-pink-400 dark:border-pink-500 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1 h-3 bg-pink-400 dark:bg-pink-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
