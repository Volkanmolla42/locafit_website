'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OptimizedImage from '@/components/common/OptimizedImage'

// Örnek galeri verileri
const galleryItems = [
  {
    id: 1,
    title: 'EMS Stüdyo',
    category: 'stüdyo',
    image: '/images/gallery/studio-1.webp',
    description: 'Modern EMS ekipmanlarımız ile profesyonel antrenman deneyimi'
  },
  {
    id: 2,
    title: 'Kişisel Antrenman',
    category: 'antrenman',
    image: '/ems-photo.webp',
    description: 'Uzman eğitmenler eşliğinde kişiye özel antrenman programları'
  },
  {
    id: 3,
    title: 'Fitness Alanı',
    category: 'stüdyo',
    image: '/images/gallery/studio-1.webp',
    description: 'Geniş ve ferah fitness alanımız'
  },
  {
    id: 4,
    title: 'Grup Dersi',
    category: 'antrenman',
    image: '/ems-photo.webp',
    description: 'Motivasyonu yüksek grup dersleri'
  },
  {
    id: 5,
    title: 'Dinlenme Alanı',
    category: 'stüdyo',
    image: '/images/gallery/studio-1.webp',
    description: 'Konforlu dinlenme alanımız'
  },
  {
    id: 6,
    title: 'EMS Antrenmanı',
    category: 'antrenman',
    image: '/ems-photo.webp',
    description: '20 dakikada maksimum verim'
  }
]

const categories = [
  { id: 'all', label: 'Tümü' },
  { id: 'stüdyo', label: 'Stüdyo' },
  { id: 'antrenman', label: 'Antrenman' }
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-serif text-primary mb-4">
            Galeri
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stüdyomuzdan kareler ve mutlu müşterilerimizin başarı hikayeleri
          </p>
        </motion.div>

        {/* Kategori Filtreleme */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300
                ${activeCategory === category.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Galeri Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]"
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(item.id)}
              >
                <div className="relative h-64">
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="relative h-[600px]">
                  <OptimizedImage
                    src={galleryItems.find(item => item.id === selectedImage)?.image || ''}
                    alt={galleryItems.find(item => item.id === selectedImage)?.title || ''}
                    width={800}
                    height={600}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-serif text-primary mb-2">
                    {galleryItems.find(item => item.id === selectedImage)?.title}
                  </h3>
                  <p className="text-gray-600">
                    {galleryItems.find(item => item.id === selectedImage)?.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
