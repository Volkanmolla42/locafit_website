"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import ContactFormSection from "../home/ContactFormSection";

const socialLinks = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FaWhatsapp, href: "https://wa.me/905418849944", label: "WhatsApp" },
];

const contactInfo = [
  {
    icon: FaPhone,
    label: "Telefon",
    value: "0541 884 9944",
    href: "tel:05418849944",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "vm@gmail.com",
    href: "mailto:vm@gmail.com",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Adres",
    value: "İstanbul, Türkiye",
    href: "https://www.google.com/maps/dir/41.0386432,40.5110784/Yenik%C3%B6y,+Loca+Cafe+%26+Restaurant,+Cumhuriyet+Cd.+No:167,+53020+Rize+Merkez%2FRize/@41.0316583,40.5074892,15z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x40667b72027f8d3f:0x2108a8ef6c0bf1d4!2m2!1d40.5200339!2d41.0247231?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D",
  },
];

const workingHours = [
  { day: "Hafta içi", hours: "09:00 - 21:00" },
  { day: "Cumartesi", hours: "10:00 - 18:00" },
  { day: "Pazar", hours: "Kapalı" },
];

export default function Footer() {
  return (
    <footer className="relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-8 left-1/4 w-64 h-64 bg-gradient-to-br from-rose-200/20 to-purple-200/20 dark:from-rose-900/20 dark:to-purple-900/20 rounded-full blur-3xl transform -translate-x-1/2" />
        <div className="absolute -top-8 right-1/4 w-64 h-64 bg-gradient-to-bl from-pink-200/20 to-purple-200/20 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full blur-3xl transform translate-x-1/2" />
      </div>

      <div className="relative border-t-2 border-pink-400 dark:border-pink-600 bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Form Section */}
          <ContactFormSection />

          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-12">
            {/* Logo and Description */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="relative w-12 h-12 transition-transform group-hover:scale-105">
                  <Image
                    src="/lotus.png"
                    alt="Locafit Logo"
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 dark:from-rose-300 dark:via-pink-300 dark:to-purple-300 bg-clip-text text-transparent font-playfair">
                    Loca Fit
                    <span className="text-xs text-pink-500/70 dark:text-pink-400/70 tracking-[0.2em] uppercase ml-2">
                      Studio
                    </span>
                  </span>
                </div>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Kadınlara özel profesyonel EMS ve kişisel antrenman stüdyosu.
                Size özel programlar ve profesyonel eğitmenlerle hedeflerinize
                ulaşın.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-500 dark:text-pink-300 dark:hover:text-pink-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* İletişim */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-playfair">
                İletişim
              </h3>
              <div className="space-y-4">
                {contactInfo.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors group"
                  >
                    <contact.icon className="w-5 h-5 text-pink-400 dark:text-pink-300 group-hover:text-pink-500 dark:group-hover:text-pink-400" />
                    <div>
                      <span className="font-medium block text-sm">
                        {contact.label}
                      </span>
                      <span className="text-sm">{contact.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Çalışma Saatleri */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-playfair">
                Çalışma Saatleri
              </h3>
              <div className="space-y-4">
                {workingHours.map((schedule) => (
                  <div
                    key={schedule.day}
                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-400"
                  >
                    <FaClock className="w-5 h-5 text-pink-400 dark:text-pink-300" />
                    <div>
                      <span className="font-medium block text-sm">
                        {schedule.day}
                      </span>
                      <span className="text-sm">{schedule.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 mt-12">
            <div className="mb-2"> {new Date().getFullYear()} Loca Fit Studio. Tüm hakları saklıdır.</div>
            <div className="text-xs mt-2">
             Designed by{" "}
              <Link
                href="https://portfolio-volkanmolla42s-projects.vercel.app/en#about"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif italic text-gray-600 dark:text-gray-400 transition-all duration-300 hover:text-pink-500 dark:hover:text-pink-400"
              >
                Volkan Molla
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
