'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HiHeart, HiOutlineHeart, HiX } from 'react-icons/hi'
import { FaCartShopping } from 'react-icons/fa6'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  const [modalMode, setModalMode] = useState<'cart' | 'buy'>('cart')
  const router = useRouter()

  const closeCartModal = () => {
    setIsCartModalOpen(false)
  }

  const confirmCart = () => {
    if (!selectedSize) {
      setAlertType('oops')
      return
    }

    addToCart(product, selectedSize, quantity)
    setIsCartModalOpen(false)
    setQuantity(1)
    setQuantity(1)
    setSelectedSize(null)
    setAlertType('success')
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      setAlertType('oops')
      return
    }
    router.push(`/checkout?id=${product.id}&size=${selectedSize}&qty=${quantity}`)
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
        {/* Image Container */}
        <Link href={`/product/${product.id}`} className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden block">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Content */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
            {product.brand}
          </p>

          {/* Product Name */}
          <Link href={`/product/${product.id}`} className="hover:text-gray-600 transition-colors">
            <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 text-sm leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="mb-4">
            <span className="text-xl font-bold text-gray-900">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
          </div>

          {/* Product Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite(product)}
              aria-label={favorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
              className="shrink-0 border border-gray-300 rounded-lg px-3 hover:bg-gray-100 transition duration-200"
              suppressHydrationWarning
            >
              {favorite ? (
                <HiHeart className="w-5 h-5 text-red-500" />
              ) : (
                <HiOutlineHeart className="w-5 h-5 text-gray-700" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setModalMode('cart')
                setIsCartModalOpen(true)
              }}
              className="shrink-0 border border-gray-300 rounded-lg px-3 hover:bg-gray-100 transition duration-200"
              suppressHydrationWarning
            >
              <FaCartShopping className="w-5 h-5 text-black" />
            </button>

            <button
              type="button"
              onClick={() => {
                setModalMode('buy')
                setIsCartModalOpen(true)
              }}
              className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-2.5 rounded-lg transition duration-200"
              suppressHydrationWarning
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>

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
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeCartModal}
              aria-label="Tutup pilihan produk"
              className="absolute right-5 top-5 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-black"
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
              <div className="flex flex-wrap gap-3">
                {(product.sizes || PRODUCT_SIZES).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] h-12 px-4 rounded border font-medium transition-colors ${selectedSize === size
                      ? 'border-black bg-black text-white border-xl'
                      : 'border-gray-300 bg-white text-gray-900 hover:border-black rounded-xl'
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
              <div className="inline-flex items-center border border-gray-300 rounded-xl">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  disabled={quantity === 1}
                  aria-label="Kurangi jumlah"
                  className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  suppressHydrationWarning
                >
                  &minus;
                </button>
                <span className="w-12 text-center font-medium">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Tambah jumlah"
                  className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-50 transition-colors"
                  suppressHydrationWarning
                >
                  +
                </button>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {modalMode === 'cart' ? (
                <button
                  type="button"
                  onClick={confirmCart}
                  className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                  suppressHydrationWarning
                >
                  Masukkan Keranjang
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800"
                  suppressHydrationWarning
                >
                  Lanjut ke Pembayaran
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <AlertModal
        type={alertType}
        onClose={() => setAlertType(null)}
      />
    </>
  )
}
