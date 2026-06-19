'use client'

import { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import Link from 'next/link'

interface Category {
  title: string
  items: string[]
}

const MENU_CATEGORIES: Category[] = [
  {
    title: 'Belanja (Shop)',
    items: ['Pria (Men)', 'Wanita (Women)'],
  },
  {
    title: 'Bantuan (Customer Care)',
    items: ['Pusat Bantuan (FAQ)', 'Lacak Pesanan', 'Pengiriman', 'Pengembalian & Penukaran (Returns & Exchanges)', 'Cara Pembayaran'],
  },
]

const CategoryMenu: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Belanja (Shop)': true,
    'Bantuan (Customer Care)': false,
  })

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle],
    }))
  }

  return (
    <aside className="w-full md:w-64 bg-white">
      <div className="space-y-4 p-4 md:p-0">
        {MENU_CATEGORIES.map((category) => (
          <div key={category.title} className="border-b border-gray-200 last:border-b-0">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.title)}
              className="w-full flex items-center justify-between py-3 px-0 md:px-3 hover:bg-gray-50 transition-colors rounded"
              suppressHydrationWarning
            >
              <h3 className="font-semibold text-sm md:text-base text-gray-900">
                {category.title}
              </h3>
              <HiChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${expandedCategories[category.title] ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {/* Category Items */}
            {expandedCategories[category.title] && (
              <ul className="space-y-2 pb-3 px-0 md:px-3">
                {category.items.map((item) => {
                  let href = '#'
                  if (item === 'Pria (Men)') href = '/?gender=men'
                  if (item === 'Wanita (Women)') href = '/?gender=women'

                  if (category.title === 'Bantuan (Customer Care)') {
                    if (item === 'Pusat Bantuan (FAQ)') href = '/help?topic=faq'
                    if (item === 'Lacak Pesanan') href = '/help?topic=tracking'
                    if (item === 'Pengiriman') href = '/help?topic=shipping'
                    if (item === 'Pengembalian & Penukaran (Returns & Exchanges)') href = '/help?topic=returns'
                    if (item === 'Cara Pembayaran') href = '/help?topic=payment'
                  }

                  return (
                    <li key={item}>
                      <Link
                        href={href}
                        className="text-sm text-gray-600 hover:text-gray-900 hover:font-medium transition-colors block py-1"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}

export default CategoryMenu
