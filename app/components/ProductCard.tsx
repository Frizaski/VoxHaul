'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HiHeart, HiOutlineHeart, HiX, HiStar } from 'react-icons/hi'
import { HiMapPin } from 'react-icons/hi2'
import { FaCartShopping } from 'react-icons/fa6'
import { useState } from 'react'
import AlertModal, { AlertType } from './AlertModal'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import type { Product } from '../types/product'

const PRODUCT_SIZES = ['S', 'M', 'L', 'XL', 'XXL']

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(product.id)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [alertType, setAlertType] = useState<AlertType>(null)

  const closeCartModal = () => {
    setIsCartModalOpen(false)
    setSelectedSize(null)
    setQuantity(1)
  }

  const confirmCart = () => {
    if (!selectedSize) {
      setAlertType('oops')
      return
    }
    addToCart(product, selectedSize, quantity)
    closeCartModal()
    setAlertType('success')
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col">
        {/* Gambar Produk */}
        <Link href={`/product/${product.id}`} className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden block">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Konten Card */}
        <div className="p-4 flex flex-col flex-1">
          {/* Brand */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
            {product.brand}
          </p>

          {/* Nama Produk */}
          <Link href={`/product/${product.id}`} className="hover:text-gray-600 transition-colors">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* Lokasi & Rating */}
          <div className="flex items-center gap-3 mb-3">
            {product.location && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <HiMapPin className="text-gray-400 shrink-0" />
                {product.location}
              </span>
            )}
            {product.rating !== undefined && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <HiStar className="text-yellow-400 shrink-0" />
                {product.rating.toFixed(1)}
              </span>
            )}
          </div>

          {/* Harga */}
          <div className="mb-4 mt-auto">
            <span className="text-lg font-bold text-gray-900">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
          </div>

          {/* Aksi: Favorit + Keranjang saja (Beli Sekarang hanya di detail page) */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite(product)}
              aria-label={favorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
              className="shrink-0 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition duration-200"
              suppressHydrationWarning
            >
              {favorite ? (
                <HiHeart className="w-5 h-5 text-red-500" />
              ) : (
                <HiOutlineHeart className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsCartModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 border bg-black border-black rounded-lg px-3 py-2 hover:bg-gray-900 transition duration-200 text-sm font-medium text-white"
              suppressHydrationWarning
            >
              <FaCartShopping className="w-4 h-4" />
              Keranjang
            </button>
          </div>
        </div>
      </div>

      {/* Modal Pilih Ukuran & Jumlah untuk Keranjang */}
      {isCartModalOpen && (
        <div
          className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 p-4"
          onClick={closeCartModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`cart-modal-title-${product.id}`}
            className="relative w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeCartModal}
              aria-label="Tutup"
              className="absolute right-5 top-5 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-black"
              suppressHydrationWarning
            >
              <HiX className="h-6 w-6" />
            </button>

            <h2
              id={`cart-modal-title-${product.id}`}
              className="pr-8 text-xl font-bold text-gray-900"
            >
              {product.name}
            </h2>

            {/* Pilih Ukuran */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-900 mb-3">Pilih Ukuran</p>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || PRODUCT_SIZES).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 h-11 px-4 rounded-xl border font-medium text-sm transition-colors ${selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 bg-white text-gray-900 hover:border-black'
                      }`}
                    suppressHydrationWarning
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Jumlah */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-900 mb-3">Jumlah</p>
              <div className="inline-flex items-center border border-gray-200 rounded-xl">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity === 1}
                  className="w-11 h-11 flex items-center justify-center text-xl hover:bg-gray-50 transition-colors disabled:opacity-40"
                  suppressHydrationWarning
                >
                  &minus;
                </button>
                <span className="w-11 text-center font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-xl hover:bg-gray-50 transition-colors"
                  suppressHydrationWarning
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={confirmCart}
                className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800 transition-colors"
                suppressHydrationWarning
              >
                Masukkan Keranjang
              </button>
            </div>
          </div>
        </div>
      )}

      <AlertModal type={alertType} onClose={() => setAlertType(null)} />
    </>
  )
}
