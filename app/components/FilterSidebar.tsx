'use client'

import { useState, useCallback } from 'react'
import { HiChevronDown } from 'react-icons/hi'

interface FilterState {
  category: string[]
  brands: string[]
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void
}

const CATEGORIES = ['Fashion', 'Elektronik', 'Rumah Tangga', 'Beauty', 'Olahraga']
const BRANDS = ['Nike', 'Adidas', 'Puma', 'Uniqlo', 'H&M']

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  // state untuk filter
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    brands: [],
  })

  // state untuk expand/collapse section
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brands: true,
  })

  // fungsi toggle category
  const toggleCategory = useCallback((cat: string) => {
    setFilters((prev) => {
      const newCategories = prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat]

      const newFilters = { ...prev, category: newCategories }
      onFilterChange(newFilters)
      return newFilters
    })
  }, [onFilterChange])

  // fungsi toggle brand
  const toggleBrand = useCallback((brand: string) => {
    setFilters((prev) => {
      const newBrands = prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand]

      const newFilters = { ...prev, brands: newBrands }
      onFilterChange(newFilters)
      return newFilters
    })
  }, [onFilterChange])

  // fungsi toggle expand/collapse section
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Fungsi reset semua filter
  const handleResetFilters = useCallback(() => {
    const resetFilters: FilterState = {
      category: [],
      brands: [],
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }, [onFilterChange])

  return (
    <aside className="w-full md:w-64 bg-white rounded-lg shadow-md p-6 h-fit sticky top-20">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Filter</h2>

      {/* CATEGORY FILTER */}
      <div className="mb-6 border-b pb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-3 hover:text-orange-500 transition-colors"
        >
          <h3 className="font-semibold text-gray-700">Kategori</h3>
          <HiChevronDown
            className={`transition-transform ${expandedSections.category ? 'rotate-0' : '-rotate-90'}`}
          />
        </button>

        {expandedSections.category && (
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 text-orange-500 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-600 hover:text-gray-800">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* BRAND FILTER */}
      <div className="mb-6 border-b pb-6">
        <button
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full mb-3 hover:text-orange-500 transition-colors"
        >
          <h3 className="font-semibold text-gray-700">Brand</h3>
          <HiChevronDown
            className={`transition-transform ${expandedSections.brands ? 'rotate-0' : '-rotate-90'}`}
          />
        </button>

        {expandedSections.brands && (
          <div className="space-y-2">
            {BRANDS.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 text-orange-500 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-600 hover:text-gray-800">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* RESET BUTTON */}
      <button
        onClick={handleResetFilters}
        className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
      >
        Reset Filter
      </button>
    </aside>
  )
}

export default FilterSidebar
