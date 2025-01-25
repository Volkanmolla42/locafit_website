'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const images = [
  {
    src: '/gallery/studio-1.jpg',
    alt: 'Modern EMS Stüdyosu',
    category: 'stüdyo'
  },
  {
    src: '/gallery/training-1.jpg',
    alt: 'EMS Antrenmanı',
    category: 'antrenman'
  },
  {
    src: '/gallery/pilates-1.jpg',
    alt: 'Pilates Seansı',
    category: 'pilates'
  },
  {
    src: '/gallery/yoga-1.jpg',
    alt: 'Yoga Dersi',
    category: 'yoga'
  },
  {
    src: '/gallery/studio-2.jpg',
    alt: 'Stüdyo Ekipmanları',
    category: 'stüdyo'
  },
  {
    src: '/gallery/training-2.jpg',
    alt: 'Kişisel Antrenman',
    category: 'antrenman'
  }
];

const categories = ['tümü', 'stüdyo', 'antrenman', 'pilates', 'yoga'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('tümü');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = selectedCategory === 'tümü'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Galeri
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stüdyomuzdan kareler ve mutlu müşterilerimizin başarı hikayeleri
          </p>
        </motion.div>

        {/* Kategori Filtreleri */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white shadow-lg dark:bg-pink-600'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Galeri Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden bg-pink-100 dark:bg-gray-800">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onClick={() => setSelectedImage(image.src)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 dark:group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-medium">
                    {image.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 dark:bg-opacity-95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full h-auto"
            >
              <Image
                src={selectedImage}
                alt="Büyük görüntü"
                width={1200}
                height={800}
                className="rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white text-xl hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
