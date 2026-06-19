'use client'

import Link from 'next/link'
import { HiOutlineHeart } from 'react-icons/hi'
import ProductCard from '../components/ProductCard'
import { useFavorites } from '../context/FavoritesContext'

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <main className="min-h-[60vh] max-w-7xl mx-auto px-4 py-10 md:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Produk Favorit</h1>
        <p className="mt-2 text-gray-600">
          Produk yang kamu sukai akan muncul di halaman ini.
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:max-w-5xl">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <HiOutlineHeart className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Belum ada produk favorit
          </h2>
          <p className="mt-2 text-gray-600">
            Tekan tombol hati pada produk yang kamu sukai.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-black px-5 py-2.5 font-semibold text-white hover:bg-gray-800"
          >
            Lihat katalog
          </Link>
        </div>
      )}
    </main>
  )
}
