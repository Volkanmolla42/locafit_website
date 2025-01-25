'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import Loading from './loading';

function NotFoundContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center p-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg dark:shadow-gray-900/50 border border-pink-200 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <h1 className="text-7xl font-light mb-6 bg-gradient-to-r from-pink-400 to-purple-500 dark:from-pink-500 dark:to-purple-600 text-transparent bg-clip-text">404</h1>
          <p className="text-2xl mb-8 font-light text-gray-600 dark:text-gray-400">Üzgünüz, aradığınız sayfayı bulamadık 💝</p>
          <Link 
            href="/" 
            className="inline-block px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-pink-400 to-purple-500 dark:from-pink-500 dark:to-purple-600 rounded-full hover:from-pink-500 hover:to-purple-600 dark:hover:from-pink-600 dark:hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-gray-900/50"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<Loading />}>
      <NotFoundContent />
    </Suspense>
  );
}
