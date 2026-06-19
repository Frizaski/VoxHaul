'use client'

import { useState, useMemo } from 'react'
import FilterSidebar, { FilterState } from './FilterSidebar'
import ProductCard from './ProductCard'
import type { Product } from '../types/product'

interface SearchResultsClientProps {
  initialProducts: Product[]
  searchQuery: string
}

const DEFAULT_FILTERS: FilterState = {
  priceMin: 0,
  priceMax: 700000,
  locations: [],
  minRating: 0,
}

export default function SearchResultsClient({
  initialProducts,
  searchQuery,
}: SearchResultsClientProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  // Terapkan filter sidebar ke produk hasil pencarian dari server
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      // Filter harga
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false
      // Filter lokasi
      if (filters.locations.length > 0 && (!p.location || !filters.locations.includes(p.location))) return false
      // Filter rating
      if (filters.minRating > 0 && (p.rating === undefined || p.rating < filters.minRating)) return false
      return true
    })
  }, [initialProducts, filters])

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar filter — hanya muncul saat ada kata kunci search */}
      <FilterSidebar onFilterChange={setFilters} />

      {/* Grid hasil pencarian */}
      <section className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Hasil Pencarian: &quot;{searchQuery}&quot;
          </h2>
          <span className="text-sm text-gray-400">
            {filteredProducts.length} produk ditemukan
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-gray-400 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-lg font-medium">Tidak ada produk yang sesuai filter</p>
            <p className="text-sm mt-2">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}
      </section>
    </div>
  )
}
