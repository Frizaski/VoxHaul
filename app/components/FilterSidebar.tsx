'use client'

import { useState, useCallback } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { HiStar } from 'react-icons/hi2'

// Kota-kota yang tersedia di data produk
const LOCATIONS = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Medan', 'Semarang']

export interface FilterState {
  priceMin: number
  priceMax: number
  locations: string[]
  minRating: number
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void
}

const PRICE_ABSOLUTE_MIN = 0
const PRICE_ABSOLUTE_MAX = 700000

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    priceMin: PRICE_ABSOLUTE_MIN,
    priceMax: PRICE_ABSOLUTE_MAX,
    locations: [],
    minRating: 0,
  })

  const [expanded, setExpanded] = useState({
    price: true,
    location: true,
    rating: true,
  })

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const updateFilters = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters)
      onFilterChange(newFilters)
    },
    [onFilterChange]
  )



  // Toggle lokasi
  const toggleLocation = (loc: string) => {
    const newLocs = filters.locations.includes(loc)
      ? filters.locations.filter((l) => l !== loc)
      : [...filters.locations, loc]
    updateFilters({ ...filters, locations: newLocs })
  }

  // Set rating minimum
  const setMinRating = (rating: number) => {
    const newRating = filters.minRating === rating ? 0 : rating
    updateFilters({ ...filters, minRating: newRating })
  }

  // Reset semua
  const resetFilters = () => {
    const reset: FilterState = {
      priceMin: PRICE_ABSOLUTE_MIN,
      priceMax: PRICE_ABSOLUTE_MAX,
      locations: [],
      minRating: 0,
    }
    setFilters(reset)
    onFilterChange(reset)
  }

  const isActive =
    filters.priceMin > PRICE_ABSOLUTE_MIN ||
    filters.priceMax < PRICE_ABSOLUTE_MAX ||
    filters.locations.length > 0 ||
    filters.minRating > 0

  return (
    <aside className="w-full md:w-60 bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-fit sticky top-20 shrink-0">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-900">Filter</h2>
        {isActive && (
          <button
            onClick={resetFilters}
            className="text-xs text-gray-400 hover:text-black transition-colors underline underline-offset-2"
          >
            Reset
          </button>
        )}
      </div>

      {/* ── HARGA ── */}
      <div className="mb-5 border-b border-gray-100 pb-5">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-gray-800">Harga</span>
          <HiChevronDown
            className={`text-gray-400 transition-transform ${expanded.price ? 'rotate-0' : '-rotate-90'}`}
          />
        </button>

        {expanded.price && (
          <div className="space-y-4">
            {/* Input Manual */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">Rp</span>
                <input
                  type="number"
                  min={PRICE_ABSOLUTE_MIN}
                  max={PRICE_ABSOLUTE_MAX}
                  value={filters.priceMin === PRICE_ABSOLUTE_MIN ? '' : filters.priceMin}
                  placeholder="Min"
                  onChange={(e) => updateFilters({ ...filters, priceMin: Number(e.target.value) || PRICE_ABSOLUTE_MIN })}
                  className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-200 rounded-md outline-none focus:border-black transition-colors"
                />
              </div>
              <span className="text-gray-400 text-sm">-</span>
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">Rp</span>
                <input
                  type="number"
                  min={PRICE_ABSOLUTE_MIN}
                  max={PRICE_ABSOLUTE_MAX}
                  value={filters.priceMax === PRICE_ABSOLUTE_MAX ? '' : filters.priceMax}
                  placeholder="Max"
                  onChange={(e) => updateFilters({ ...filters, priceMax: Number(e.target.value) || PRICE_ABSOLUTE_MAX })}
                  className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-200 rounded-md outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            {/* Pilihan Cepat */}
            <div className="space-y-1.5 mt-3">
              <button
                onClick={() => updateFilters({ ...filters, priceMin: 0, priceMax: 100000 })}
                className="block text-sm text-gray-600 hover:text-orange-500 w-full text-left"
              >
                Di bawah Rp 100rb
              </button>
              <button
                onClick={() => updateFilters({ ...filters, priceMin: 100000, priceMax: 300000 })}
                className="block text-sm text-gray-600 hover:text-orange-500 w-full text-left"
              >
                Rp 100rb - Rp 300rb
              </button>
              <button
                onClick={() => updateFilters({ ...filters, priceMin: 300000, priceMax: 500000 })}
                className="block text-sm text-gray-600 hover:text-orange-500 w-full text-left"
              >
                Rp 300rb - Rp 500rb
              </button>
              <button
                onClick={() => updateFilters({ ...filters, priceMin: 500000, priceMax: PRICE_ABSOLUTE_MAX })}
                className="block text-sm text-gray-600 hover:text-orange-500 w-full text-left"
              >
                Di atas Rp 500rb
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── LOKASI ── */}
      <div className="mb-5 border-b border-gray-100 pb-5">
        <button
          onClick={() => toggleSection('location')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-gray-800">Lokasi Penjual</span>
          <HiChevronDown
            className={`text-gray-400 transition-transform ${expanded.location ? 'rotate-0' : '-rotate-90'}`}
          />
        </button>

        {expanded.location && (
          <div className="space-y-2">
            {LOCATIONS.map((loc) => (
              <label key={loc} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.locations.includes(loc)}
                  onChange={() => toggleLocation(loc)}
                  className="w-4 h-4 rounded accent-black cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {loc}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ── RATING ── */}
      <div className="mb-2">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-gray-800">Rating Minimum</span>
          <HiChevronDown
            className={`text-gray-400 transition-transform ${expanded.rating ? 'rotate-0' : '-rotate-90'}`}
          />
        </button>

        {expanded.rating && (
          <div className="space-y-1.5">
            {[4, 4.5, 4.8].map((r) => (
              <button
                key={r}
                onClick={() => setMinRating(r)}
                className={`flex items-center gap-1.5 w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${
                  filters.minRating === r
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <HiStar className={`shrink-0 ${filters.minRating === r ? 'text-yellow-400' : 'text-yellow-400'}`} />
                <span>{r}+</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

export default FilterSidebar
