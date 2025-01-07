import Link from 'next/link'

const categories = [
  { name: 'EMS', count: 5 },
  { name: 'Beslenme', count: 8 },
  { name: 'Fitness', count: 12 },
  { name: 'Sağlıklı Yaşam', count: 6 },
  { name: 'Motivasyon', count: 4 },
]

export function BlogCategories() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Kategoriler</h3>
      <ul className="space-y-2">
        {categories.map(category => (
          <li key={category.name}>
            <Link
              href={`/blog/category/${category.name.toLowerCase()}`}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>{category.name}</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-sm text-gray-600">
                {category.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
