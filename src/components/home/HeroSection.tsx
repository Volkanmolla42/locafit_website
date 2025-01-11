"use client"
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface HeroSectionProps {
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
 
  subtitle = "Profesyonel eğitmenler eşliğinde kişisel hedeflerinize ulaşın.",
  ctaText = "Ücretsiz Deneme Dersi",
  onCtaClick = () => console.log('CTA clicked'),
}: HeroSectionProps) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.hero-flower',
          { 
            rotate: -30,
            scale: 0.8,
            opacity: 0
          },
          {
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)"
          }
        );

        gsap.fromTo(
          titleRef.current,
          { 
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.5,
            ease: "power3.out"
          }
        );

        gsap.fromTo(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.8,
            ease: "power3.out"
          }
        );

        gsap.fromTo(
          ctaRef.current,
          {
            y: 20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.2,
            ease: "power3.out"
          }
        );

        // Paralaks efekti
        gsap.to('.parallax-bg', {
          y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))) * ScrollTrigger.maxScroll(window),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
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
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex justify-center overflow-hidden"
    >
      {/* Ana İçerik */}
      <div className="container text-center relative z-10">
      <div className="mt-16 flex justify-center items-center space-x-4">
            <div className="w-32 h-[4px] bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
            <div className="w-3 h-3 rounded-full bg-pink-400 animate-pulse" />
            <div className="w-32 h-[4px] bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Üst Dekoratif Element */}
          
          <div className="flex justify-center items-center  hero-flower">
            <div className="relative">
              <div className="absolute inset-0 animate-spin-slow">
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <div className="w-1 h-20 bg-gradient-to-b from-transparent via-pink-300 to-transparent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <Image src="/lotus.png" width={100} height={100} alt='logo' className=" text-pink-500 transform  transition-transform duration-500" />
            </div>
          </div>

          {/* Studio İsmi */}
          <div ref={titleRef} className="relative mb-8">
            <h1 className="text-6xl font-light italic bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500 inline-block">
              Loca Fit Studio
            </h1>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          </div>

          {/* Ana Başlık */}
          <div ref={subtitleRef} className="space-y-6 mb-12">
           
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* CTA Butonu */}
          <div ref={ctaRef} className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-lg opacity-50 animate-pulse" />
            <Button
              onClick={onCtaClick}
              className="relative bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-6 text-lg
                rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                hover:from-pink-600 hover:to-rose-600"
            >
              {ctaText}
            </Button>
          </div>

          {/* Alt Dekoratif Element */}
          <div className="mt-16 flex justify-center items-center space-x-4">
            <div className="w-32 h-[4px] bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
            <div className="w-3 h-3 rounded-full bg-pink-400 animate-pulse" />
            <div className="w-32 h-[4px] bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
