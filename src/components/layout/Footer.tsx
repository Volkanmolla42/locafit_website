"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
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
import { ThemeToggle } from "../theme-toggle";
export const footerContent = {
  description: "Kadınlara özel profesyonel EMS ve kişisel antrenman stüdyosu. Size özel programlar ve profesyonel eğitmenlerle hedeflerinize ulaşın.",
  socialLinks: [
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: FaWhatsapp, href: "https://wa.me/905418849944", label: "WhatsApp" },
  ],
  contactInfo: [
    { icon: FaPhone, label: "Telefon", value: "0541 884 9944", href: "tel:05418849944" },
    { icon: FaEnvelope, label: "Email", value: "vm@gmail.com", href: "mailto:vm@gmail.com" },
    { icon: FaMapMarkerAlt, label: "Adres", value: "İstanbul, Türkiye", href:"#" },
  ],
  workingHours: [
    { day: "Pazar hariç her gün", hours: "10:00 - 20:00" },
    { day: "Pazar", hours: "Kapalı" },
  ],
  contactTitle: "İletişim",
  hoursTitle: "Çalışma Saatleri",
  copyright: "Loca Fit Studio. Tüm hakları saklıdır.",
  designerLabel: "Designed by Volkan Molla",
  designerLink: "https://portfolio-volkanmolla42s-projects.vercel.app/en#about"
}

// Reusable contact item component
const ContactItem = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: IconType;
  label: string;
  value: string;
  href?: string;
}) => {
  const Content = () => (
    <>
      <Icon
        className="w-5 h-5 text-pink-400 dark:text-pink-300 group-hover:text-pink-500 dark:group-hover:text-pink-400 shrink-0"
        aria-hidden="true"
      />
      <div>
        <span className="font-medium block text-sm">{label}</span>
        <span className="text-sm">{value}</span>
      </div>
    </>
  );

  return href ? (
    <a
      href={href}
      className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors group"
    >
      <Content />
    </a>
  ) : (
    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
      <Content />
    </div>
  );
};

// Reusable working hours component
const ScheduleItem = ({ day, hours }: { day: string; hours: string }) => (
  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
    <FaClock
      className="w-5 h-5 text-pink-400 dark:text-pink-300 shrink-0"
      aria-hidden="true"
    />
    <div>
      <span className="font-medium block text-sm">{day}</span>
      <span className="text-sm">{hours}</span>
    </div>
  </div>
);

export default function Footer() {
  return (
    <footer className="relative" role="contentinfo">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-8 left-1/4 w-64 h-64 bg-gradient-to-br from-rose-200/20 to-purple-200/20 dark:from-rose-900/20 dark:to-purple-900/20 rounded-full blur-3xl -translate-x-1/2"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-8 right-1/4 w-64 h-64 bg-gradient-to-bl from-pink-200/20 to-purple-200/20 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full blur-3xl translate-x-1/2"
        />
      </div>

      <div className="relative border-t-2 border-pink-400 dark:border-pink-600 bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactFormSection />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-12"
          >
            {/* Brand Section */}
            <section aria-labelledby="brand-heading">
              <Link 
                href="/" 
                className="flex items-center gap-2 group"
                aria-label="Go to homepage"
              >
                <div className="relative w-12 h-12 transition-transform group-hover:scale-105">
                  <Image
                    src="/lotus.png"
                    alt="Loca Fit Studio Logo"
                    fill
                    className="object-contain"
                    sizes="48px"
                    priority
                  />
                </div>
                <h2 id="brand-heading">
                  <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 dark:from-rose-300 dark:via-pink-300 dark:to-purple-300 bg-clip-text text-transparent font-playfair">
                    Loca Fit
                    <span className="text-xs text-pink-500/70 dark:text-pink-400/70 tracking-[0.2em] uppercase ml-2">
                      Studio
                    </span>
                  </span>
                </h2>
              </Link>
              
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                {footerContent.description}
              </p>
              
              <nav aria-label="Social media links" className="mt-6">
                <ul className="flex gap-4">
                  {footerContent.socialLinks.map((social) => (
                    <li key={social.label}>
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-400 hover:text-pink-500 dark:text-pink-300 dark:hover:text-pink-400 transition-colors"
                        aria-label={`Visit our ${social.label} page`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="w-6 h-6" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>
            </section>

            {/* Contact Section */}
            <section aria-labelledby="contact-heading">
              <h3 id="contact-heading" className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-playfair">
                {footerContent.contactTitle}
              </h3>
              <address className="mt-4 space-y-4 not-italic">
                {footerContent.contactInfo.map((contact) => (
                  <ContactItem key={contact.label} {...contact} />
                ))}
              </address>
            </section>

            {/* Hours Section */}
            <section aria-labelledby="hours-heading">
              <h3 id="hours-heading" className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-playfair">
                {footerContent.hoursTitle}
              </h3>
              <div className="mt-4 space-y-4">
                {footerContent.workingHours.map((schedule) => (
                  <ScheduleItem key={schedule.day} {...schedule} />
                ))}
              </div>
            </section>
          </motion.div>

          {/* Copyright Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-6 border-t border-gray-100 dark:border-gray-800 mt-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div>
                &copy; {new Date().getFullYear()} {footerContent.copyright}
              </div>
              
              <div className="flex items-center gap-4">
                <Link
                  href={footerContent.designerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-serif italic hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                >
                  {footerContent.designerLabel}
                </Link>
                
                <ThemeToggle 
                  
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}