'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OptimizedImage from '@/components/common/OptimizedImage'
import { FaSearch, FaClock, FaUser } from 'react-icons/fa'

// Örnek blog verileri
const blogPosts = [
  {
    id: 1,
    title: 'EMS Antrenmanının Faydaları',
    excerpt: 'EMS antrenmanı nedir ve vücudunuza olan faydalarını keşfedin. Modern teknoloji ile geleneksel fitness\'i birleştiren bu yenilikçi antrenman metodunu yakından tanıyın.',
    image: '/images/gallery/ems-training.webp',
    category: 'EMS',
    date: '2024-01-07',
    author: 'Ayşe Yılmaz',
    readTime: '5 dk',
    featured: true
  },
  {
    id: 2,
    title: 'Doğru Beslenme Nasıl Olmalı?',
    excerpt: 'Fitness hedeflerinize ulaşmak için beslenme önerileri. Protein, karbonhidrat ve yağ dengesini nasıl kurmalısınız? İşte size özel beslenme tavsiyeleri.',
    image: '/images/gallery/nutrition.webp',
    category: 'Beslenme',
    date: '2024-01-06',
    author: 'Mehmet Demir',
    readTime: '7 dk',
    featured: false
  },
  {
    id: 3,
    title: 'Düzenli Egzersizin Zihinsel Faydaları',
    excerpt: 'Egzersizin sadece fiziksel değil, zihinsel sağlığınız üzerindeki olumlu etkileri. Stres yönetiminden odaklanmaya, spor ve mental sağlık ilişkisi.',
    image: '/images/gallery/mental-health.webp',
    category: 'Sağlık',
    date: '2024-01-05',
    author: 'Dr. Zeynep Kaya',
    readTime: '6 dk',
    featured: false
  },
  {
    id: 4,
    title: 'EMS ile Kilo Verme Rehberi',
    excerpt: 'EMS antrenmanları ile etkili kilo verme stratejileri. Metabolizmanızı hızlandırın ve yağ yakımını maksimuma çıkarın.',
    image: '/images/gallery/weight-loss.webp',
    category: 'EMS',
    date: '2024-01-04',
    author: 'Ali Yıldız',
    readTime: '8 dk',
    featured: false
  }
]

const categories = [
  { id: 'all', label: 'Tümü', count: blogPosts.length },
  { id: 'EMS', label: 'EMS', count: blogPosts.filter(post => post.category === 'EMS').length },
  { id: 'Beslenme', label: 'Beslenme', count: blogPosts.filter(post => post.category === 'Beslenme').length },
  { id: 'Sağlık', label: 'Sağlık', count: blogPosts.filter(post => post.category === 'Sağlık').length }
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPosts = blogPosts
    .filter(post => 
      (activeCategory === 'all' || post.category === activeCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    )

  const featuredPost = blogPosts.find(post => post.featured)

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif text-primary mb-4">
            Blog
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fitness, sağlık ve EMS antrenmanları hakkında en güncel bilgiler ve uzman tavsiyeleri
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-[400px]">
                  <OptimizedImage
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl font-serif text-primary mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaUser className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span>{featuredPost.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sol Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Arama */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Blog yazılarında ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Kategoriler */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-lg font-serif text-primary mb-4">Kategoriler</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all
                      ${activeCategory === category.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50'
                      }`}
                  >
                    <span>{category.label}</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Listesi */}
          <div className="lg:col-span-3">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map(post => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-48">
                      <OptimizedImage
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif text-primary mb-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FaUser className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
