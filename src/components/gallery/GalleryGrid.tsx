import { motion } from 'framer-motion'
import OptimizedImage from '../common/OptimizedImage'
import { staggerContainer, scaleIn } from '@/utils/animations'

interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
  description: string
}

interface GalleryGridProps {
  items: GalleryItem[]
  onImageClick: (id: number) => void
}

export function GalleryGrid({ items, onImageClick }: GalleryGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={scaleIn}
          whileHover={{ scale: 1.03 }}
          className="group relative cursor-pointer overflow-hidden rounded-lg"
          onClick={() => onImageClick(item.id)}
        >
          <div className="aspect-w-4 aspect-h-3">
            <OptimizedImage
              src={item.image}
              alt={item.title}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              className="text-white text-center p-4"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}
