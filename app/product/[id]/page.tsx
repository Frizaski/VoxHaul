'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiHeart, HiOutlineHeart, HiChevronLeft, HiChevronRight, HiChevronDown } from 'react-icons/hi'

import { DUMMY_PRODUCTS } from '../../data/dummyProducts'
import { notFound, useRouter } from 'next/navigation'
import { useCart } from '../../context/CartContext'
import { useFavorites } from '../../context/FavoritesContext'
import AlertModal, { AlertType } from '../../components/AlertModal'
import ProductCard from '../../components/ProductCard'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = DUMMY_PRODUCTS.find((p) => p.id === parseInt(id, 10))

  if (!product) {
    return notFound()
  }

  // Rekomendasi: produk di kategori yang sama atau gender yang sama, kecuali produk ini sendiri
  const recommendations = DUMMY_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4)

  // We are guaranteed to have these since we enhanced dummyProducts.ts,
  // but we provide fallbacks just in case
  const images = product.images || [product.image]
  const colors = product.colors || []
  const sizes = product.sizes || []

  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [alertType, setAlertType] = useState<AlertType>(null)
  const router = useRouter()

  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(product.id)

  const [isDetailOpen, setIsDetailOpen] = useState(true)
  const [isShippingOpen, setIsShippingOpen] = useState(false)

  // Handlers
  const nextImage = () => {
    setMainImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setMainImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setAlertType('oops')
      return
    }
    addToCart(product, selectedSize, quantity)
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
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-8 flex gap-2 items-center">
        <Link href="/" className="hover:text-black">Beranda</Link>
        <span>&gt;</span>
        <Link href="#" className="hover:text-black">{product.gender ? product.gender.charAt(0).toUpperCase() + product.gender.slice(1) : ''}</Link>
        <span>&gt;</span>
        <Link href="#" className="hover:text-black">{product.category}</Link>
        <span>&gt;</span>
        <span className="text-black font-medium">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* Kiri: Galeri Gambar */}
        <section className="w-full lg:w-3/5">
          {/* Gambar Utama */}
          <div className="relative aspect-[3/4] md:aspect-[4/5] bg-gray-100 mb-4 overflow-hidden rounded">
            <Image
              src={images[mainImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              quality={100}
              unoptimized
              priority
            />
            {/* Navigasi Kiri */}
            <button
              onClick={prevImage}
              aria-label="Gambar sebelumnya"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-sm shadow transition-colors"
            >
              <HiChevronLeft className="text-2xl" />
            </button>
            {/* Navigasi Kanan */}
            <button
              onClick={nextImage}
              aria-label="Gambar berikutnya"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-sm shadow transition-colors"
            >
              <HiChevronRight className="text-2xl" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImageIndex(idx)}
                className={`relative aspect-square bg-gray-100 rounded overflow-hidden border-2 transition-all ${mainImageIndex === idx ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  quality={100}
                  unoptimized
                />
              </button>
            ))}
          </div>
        </section>

        {/* Kanan: Detail Produk */}
        <section className="w-full lg:w-2/5 flex flex-col">
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{product.brand}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-gray-900">Rp{product.price.toLocaleString('id-ID')}</p>
          </div>

          {/* Pilih Ukuran */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-900 mb-3">Pilih Ukuran</p>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[3rem] h-12 px-4 rounded border font-medium transition-colors ${selectedSize === size
                    ? 'border-black bg-black text-white rounded-xl'
                    : 'border-gray-300 bg-white text-gray-900 hover:border-black rounded-xl'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Jumlah */}
          <div className="mb-8">
            <p className="text-sm font-medium text-gray-900 mb-3">Jumlah</p>
            <div className="inline-flex items-center border border-gray-300 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-50 transition-colors"
                disabled={quantity === 1}
              >
                &minus;
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mb-10">
            <button
              onClick={handleAddToCart}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-colors"
            >
              TAMBAH KE KERANJANG
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full bg-white border-2 border-black hover:bg-gray-50 text-black font-bold py-4 rounded-xl transition-colors"
            >
              BELI SEKARANG
            </button>
            <button
              onClick={() => toggleFavorite(product)}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-black border border-gray-300 font-medium py-4 rounded transition-colors rounded-xl"
            >
              {favorite ? (
                <>
                  <HiHeart className="text-xl text-red-500" />
                  Hapus dari Favorit
                </>
              ) : (
                <>
                  <HiOutlineHeart className="text-xl" />
                  Tambahkan ke Favorit
                </>
              )}
            </button>
          </div>

          {/* Accordions */}
          <div className="border-t border-gray-200">
            {/* Detail Produk */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => setIsDetailOpen(!isDetailOpen)}
                className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-900 hover:text-gray-600 transition-colors"
              >
                Detail Produk
                <HiChevronDown className={`text-xl transition-transform duration-300 ${isDetailOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDetailOpen && (
                <div className="pb-4 text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </div>
              )}
            </div>

            {/* Pengiriman */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => setIsShippingOpen(!isShippingOpen)}
                className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-900 hover:text-gray-600 transition-colors"
              >
                Pengiriman & Pengembalian
                <HiChevronDown className={`text-xl transition-transform duration-300 ${isShippingOpen ? 'rotate-180' : ''}`} />
              </button>
              {isShippingOpen && (
                <div className="pb-4 text-sm text-gray-600 leading-relaxed">
                  {product.shippingInfo}
                </div>
              )}
            </div>
          </div>
        </section>

      </div>

      {recommendations.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
          <div className="border-t border-gray-200 pt-10 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Rekomendasi Produk</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((rec) => (
                <ProductCard key={rec.id} product={rec} />
              ))}
            </div>
          </div>
        </div>
      )}

      <AlertModal
        type={alertType}
        onClose={() => setAlertType(null)}
      />
    </main>
  )
}
