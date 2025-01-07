import { useEffect } from 'react'
import  OptimizedImage  from '../common/OptimizedImage'

interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
  description: string
}

interface GalleryModalProps {
  image: GalleryItem
  onClose: () => void
}

export function GalleryModal({ image, onClose }: GalleryModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full mx-4 bg-white rounded-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-opacity"
          onClick={onClose}
        >
          ×
        </button>
        
        <div className="relative aspect-w-16 aspect-h-9">
          <OptimizedImage
            src={image.image}
            alt={image.title}
            width={1200}
            height={675}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
          <p className="text-gray-600">{image.description}</p>
        </div>
      </div>
    </div>
  )
}
