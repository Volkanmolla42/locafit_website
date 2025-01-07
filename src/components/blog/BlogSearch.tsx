import { useState } from 'react'

export function BlogSearch() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search functionality will be implemented
    console.log('Searching for:', searchTerm)
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Blog da Ara</h3>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Blog'da Ara..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          🔍
        </button>
      </form>
    </div>
  )
}
