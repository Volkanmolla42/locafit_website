"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-pink-50 border-t-2 border-pink-400 to-white">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-8 left-1/4 w-64 h-64 bg-gradient-to-br from-rose-200/20 to-purple-200/20 rounded-full blur-3xl transform -translate-x-1/2" />
        <div className="absolute -top-8 right-1/4 w-64 h-64 bg-gradient-to-bl from-pink-200/20 to-purple-200/20 rounded-full blur-3xl transform translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-12 h-12">
                <Image
                  src="/lotus.png"
                  alt="Locafit Logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent font-playfair">
                  Loca Fit
                  <span className="text-xs text-pink-500/70 tracking-[0.2em] uppercase ml-2">
                    Studio
                  </span>
                </span>
              </div>
            </Link>
            <p className="text-gray-600 leading-relaxed">
              Kadınlara özel profesyonel EMS ve kişisel antrenman stüdyosu
            </p>
            <div className="flex space-x-4 pt-2">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebook className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://wa.me/905418849944"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="w-6 h-6" />
              </motion.a>
            </div>
          </div>

          {/* İletişim */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 font-playfair">
              İletişim
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Telefon:</span>{" "}
                <a
                  href="tel:05418849944"
                  className="hover:text-pink-500 transition-colors"
                >
                  0541 884 9944
                </a>
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:vm@gmail.com"
                  className="hover:text-pink-500 transition-colors"
                >
                  vm@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Çalışma Saatleri */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 font-playfair">
              Çalışma Saatleri
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Pazartesi - Cumartesi:</span>
                <br />
                09:45 - 20:00
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Pazar:</span>
                <br />
                Kapalı
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-pink-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Loca Fit Studio. Tüm hakları
              saklıdır.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/gizlilik-politikasi"
                className="text-gray-500 hover:text-pink-500 text-sm transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/kullanim-kosullari"
                className="text-gray-500 hover:text-pink-500 text-sm transition-colors"
              >
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
