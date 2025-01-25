'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import Loading from './loading';

function NotFoundContent() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Sayfa Bulunamadı</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Ana Sayfaya Dön
        </Link>
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
