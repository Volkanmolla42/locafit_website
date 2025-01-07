'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const validateForm = () => {
    let isValid = true
    const errors = {
      name: '',
      phone: '',
      message: ''
    }

    // İsim validasyonu
    if (formData.name.trim().length < 2) {
      errors.name = 'İsim en az 2 karakter olmalıdır'
      isValid = false
    }

    // Telefon validasyonu
    const phoneRegex = /^[0-9]{10}$/ // 5XX XXX XX XX formatı
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Geçerli bir telefon numarası giriniz (5XX XXX XX XX)'
      isValid = false
    }

    // Mesaj validasyonu
    if (formData.message.trim().length < 10) {
      errors.message = 'Mesaj en az 10 karakter olmalıdır'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length === 0) return ''
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`
    if (numbers.length <= 8) return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 8)} ${numbers.slice(8, 10)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.replace(/\D/g, '') // Sadece rakamları gönder
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu')
      }

      setSuccess(true)
      setFormData({ name: '', phone: '', message: '' })
      setFormErrors({ name: '', phone: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      // Telefon numarası formatlaması
      setFormData(prev => ({
        ...prev,
        [name]: formatPhoneNumber(value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }

    // Yazarken hata mesajını temizle
    setFormErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    gsap.registerPlugin(ScrollTrigger)

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
  }, [isClient])

  return (
    <main className="min-h-screen bg-background" data-scroll-container>
      {/* Hero Section */}
      <div data-scroll-section>
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
            <Link
              href="/randevu"
              className="inline-block bg-primary hover:bg-primary-light text-white font-medium py-3 px-8 rounded-full transition-all duration-300 appointment-btn pulse"
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
            </Link>
          </div>
        </section>
      </div>

      {/* Hizmetler Section */}
      <div data-scroll-section>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-12">
              Hizmetlerimiz
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-primary/5 p-8 rounded-lg">
                <h3 className="text-2xl font-serif text-primary mb-4">EMS Training</h3>
                <p className="text-gray-700">
                  20 dakikalık EMS antrenmanı ile 2 saatlik geleneksel fitness antrenmanına eşdeğer sonuçlar elde edin.
                </p>
              </div>
              <div className="bg-primary/5 p-8 rounded-lg">
                <h3 className="text-2xl font-serif text-primary mb-4">Kişisel Antrenman</h3>
                <p className="text-gray-700">
                  Uzman eğitmenlerimiz eşliğinde hedefinize özel hazırlanmış antrenman programları.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Neden Biz Section */}
      <div data-scroll-section>
        <section className="py-20 px-4 bg-primary/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-12">
              Neden Loca Fit Studio?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 feature-item bg-white rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-primary mb-2">Hızlı Sonuç</h3>
                <p className="text-gray-700">20 dakikalık EMS antrenmanı ile klasik 2 saatlik antrenman etkisi</p>
              </div>
              <div className="text-center p-6 feature-item bg-white rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-primary mb-2">Güvenli Antrenman</h3>
                <p className="text-gray-700">Eklemlere binen yükü minimize eden teknoloji</p>
              </div>
              <div className="text-center p-6 feature-item bg-white rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-primary mb-2">Uzman Kadro</h3>
                <p className="text-gray-700">Deneyimli ve profesyonel eğitmenler eşliğinde antrenman</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* EMS Bilgi Section */}
      <div data-scroll-section>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="ems-content">
                <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
                  EMS Teknolojisi Nedir?
                </h2>
                <p className="text-gray-700 mb-4">
                  EMS (Elektro Muscle Stimulation), kas gruplarını elektrik akımları ile uyararak çalıştıran modern bir antrenman teknolojisidir.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Tüm vücudu aynı anda çalıştırır
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Yağ yakımını hızlandırır
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Selülit görünümünü azaltır
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Sıkılaşma ve şekillendirme sağlar
                  </li>
                </ul>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden ems-image">
                <Image
                  src="/ems-photo.webp"
                  alt="EMS Training"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* İletişim Form Section */}
      <div data-scroll-section>
        <section className="py-20 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-12">
              Bize Ulaşın
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-lg contact-form">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                      Adınız
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="5XX XXX XX XX"
                      className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black mb-1">
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                      formErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                  )}
                </div>
                {error && (
                  <div className="text-red-500 text-sm">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="text-green-500 text-sm">
                    Mesajınız başarıyla gönderildi!
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-50 glow"
                  >
                    {loading ? 'Gönderiliyor...' : 'Gönder'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
