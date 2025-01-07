const categories = [
  { id: 'all', name: 'Tümü' },
  { id: 'stüdyo', name: 'Stüdyo' },
  { id: 'antrenman', name: 'Antrenman' },
  { id: 'ekipman', name: 'Ekipman' },
  { id: 'etkinlik', name: 'Etkinlikler' },
]

interface GalleryFilterProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function GalleryFilter({ activeCategory, onCategoryChange }: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-2 rounded-full transition-colors ${
            activeCategory === category.id
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
