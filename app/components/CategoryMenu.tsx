'use client'

import { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import Link from 'next/link'

interface Category {
  title: string
  href: string
}

const SHOP_ITEMS: Category[] = [
  { title: 'Semua Produk', href: '/' },
  { title: 'Pria (Men)', href: '/?gender=men' },
  { title: 'Wanita (Women)', href: '/?gender=women' },
]

const ORIGIN_ITEMS: Category[] = [
  { title: 'Brand Lokal', href: '/?origin=lokal' },
  { title: 'Brand Internasional', href: '/?origin=internasional' },
]

const CategoryMenu: React.FC = () => {
  const [expanded, setExpanded] = useState({
    shop: true,
    origin: true,
  })

  const toggle = (key: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <aside className="w-full md:w-52 bg-white shrink-0">
      <div className="space-y-1 p-4 md:p-0">

        {/* Belanja */}
        <div className="border-b border-gray-100 last:border-b-0">
          <button
            onClick={() => toggle('shop')}
            className="w-full flex items-center justify-between py-3 px-0 md:px-3 hover:bg-gray-50 transition-colors rounded"
            suppressHydrationWarning
          >
            <h3 className="font-semibold text-sm text-gray-900">Belanja</h3>
            <HiChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expanded.shop ? 'rotate-180' : ''}`}
            />
          </button>

          {expanded.shop && (
            <ul className="space-y-1 pb-3 px-0 md:px-3">
              {SHOP_ITEMS.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-gray-900 hover:font-medium transition-colors block py-1"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Asal Brand */}
        <div className="border-b border-gray-100 last:border-b-0">
          <button
            onClick={() => toggle('origin')}
            className="w-full flex items-center justify-between py-3 px-0 md:px-3 hover:bg-gray-50 transition-colors rounded"
            suppressHydrationWarning
          >
            <h3 className="font-semibold text-sm text-gray-900">Asal Brand</h3>
            <HiChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expanded.origin ? 'rotate-180' : ''}`}
            />
          </button>

          {expanded.origin && (
            <ul className="space-y-1 pb-3 px-0 md:px-3">
              {ORIGIN_ITEMS.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-gray-900 hover:font-medium transition-colors block py-1"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </aside>
  )
}

export default CategoryMenu
