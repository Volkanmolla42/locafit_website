import Link from 'next/link'
import { motion } from 'framer-motion'
import OptimizedImage from '../common/OptimizedImage'
import { fadeIn } from '@/utils/animations'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  author: string
  readTime: string
}

interface BlogCardProps {
  post: BlogPost
  index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <Link href={`/blog/${post.id}`}>
        <div className="relative h-48 overflow-hidden">
          <OptimizedImage
            src={post.image}
            alt={post.title}
            width={400}
            height={200}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
          />
        </div>
        
        <motion.div 
          className="p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          
          <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-primary transition-colors">
            {post.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <motion.span 
              className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
              whileHover={{ scale: 1.05 }}
            >
              {post.category}
            </motion.span>
            <span className="text-sm text-gray-600">
              {post.author}
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  )
}
