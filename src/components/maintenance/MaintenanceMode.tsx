'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaTools, FaClock, FaHeart } from 'react-icons/fa';
import { IoSparkles, IoBody } from 'react-icons/io5';

const MaintenanceMode: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900 flex items-center justify-center z-[9999] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-rose-300 to-purple-300 rounded-full blur-3xl"
        />
      </div>

      {/* Floating icons */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-20, 20, -20] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-20 left-1/4 text-pink-300/30 dark:text-pink-400/20"
      >
        <IoBody className="w-8 h-8" />
      </motion.div>
      
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [20, -20, 20] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-1/4 text-purple-300/30 dark:text-purple-400/20"
      >
        <IoSparkles className="w-6 h-6" />
      </motion.div>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-15, 15, -15] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-1/3 right-20 text-rose-300/30 dark:text-rose-400/20"
      >
        <FaHeart className="w-5 h-5" />
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-soft max-w-lg w-full mx-4 text-center border border-white/20 dark:border-gray-700/50"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 150 }}
          className="relative w-20 h-20 mx-auto mb-8"
        >
          <Image
            src="/lotus.png"
            alt="Loca Fit Logo"
            fill
            className="object-contain filter drop-shadow-lg"
            sizes="80px"
            priority
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="absolute -inset-2 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-xl"
          />
        </motion.div>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gradient font-playfair mb-2">
            Loca Fit Studio
          </h1>
          <p className="text-sm text-pink-500/70 dark:text-pink-400/70 uppercase tracking-wider font-medium">
            Wellness & Fitness
          </p>
        </motion.div>

        {/* Status Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mb-6"
        >
          <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-glow">
            <FaTools className="w-8 h-8 text-white" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-amber-400/50 to-orange-500/50 rounded-full blur-md"
            />
          </div>
        </motion.div>
        
        {/* Main Message */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Site Geçici Olarak
          <span className="block text-gradient">Bakım Modunda</span>
        </motion.h2>
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
        >
          Sitemiz şu anda iyileştirmeler ve güncellemeler için bakım modundadır. 
          Daha iyi bir deneyim sunmak için çalışıyoruz!
        </motion.p>

        {/* Status Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <div className="flex items-center justify-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl border border-gray-200/50 dark:border-gray-600/30">
            <FaClock className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Geçici Durum</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl border border-gray-200/50 dark:border-gray-600/30">
            <IoSparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Yenilikler Geliyor</span>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="space-y-4"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Acil durumlar için bizimle iletişime geçebilirsiniz:
          </p>
          
          <motion.a
            href="https://wa.me/905418849944?text=Web%20sitesi%20hakkında%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 hover-lift"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp className="w-5 h-5" />
            WhatsApp ile İletişim
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-600/30"
        >
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © 2024 Loca Fit Studio - Kadınlara Özel Fitness & Wellness
          </p>
        </motion.div>
      </motion.div>

      {/* Loading animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-pink-500 rounded-full"
          />
          <span className="text-sm">Hazırlanıyor...</span>
        </div>
      </motion.div>
    </div>
  );
};

export default MaintenanceMode; 