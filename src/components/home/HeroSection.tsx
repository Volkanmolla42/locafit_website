"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
          }
        );

        gsap.fromTo(
          titleRef.current,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.5,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.8,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.2,
            ease: "power3.out",
          }
        );

        // Paralaks efekti
        gsap.to(".parallax-bg", {
          y: (_i, el) =>
            (1 - parseFloat(el.getAttribute("data-speed"))) *
            ScrollTrigger.maxScroll(window),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    };

    initGSAP();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative  min-h-screen flex py-16 overflow-hidden bg-linear-to-br from-pink-50 to-pink-100 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Dekoratif arka plan elementleri */}
      <div className="absolute parallax-bg inset-0 overflow-hidden">
        <div className="absolute parallax-bg -top-20 -right-20 w-96 h-96 bg-pink-200/70 dark:bg-pink-500/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute parallax-bg -bottom-20 -left-20 w-96 h-96 bg-pink-300/70 dark:bg-pink-600/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute parallax-bg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/50 dark:bg-pink-500/10 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Ana içerik */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="hero-content ">
          <div className="relative inline-block mb-4">
            <Image
              src="/lotus.png"
              alt="Loca Fit Logo"
              width={80}
              height={80}
              className="hero-flower mx-auto"
            />
          </div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-pink-300 dark:from-pink-400 dark:to-pink-300 mb-6 leading-tight tracking-tighter"
          >
            Loca Fit Studio
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Sağlıklı başlangıç için profesyonel eğitmenlerimizle tanışın ve
            hedeflerinize ulaşın.
          </p>

          <div ref={ctaRef} className="mt-10">
            <Link
              href="/iletisim"
              className="appointment-btn inline-block bg-pink-500 hover:bg-pink-600 dark:bg-pink-500/80 dark:hover:bg-pink-500 text-white px-6 py-4 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl group"
            >
              Hemen Başla <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Dekoratif alt elementler */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="currentColor"
            className="w-full text-white dark:text-gray-900"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
