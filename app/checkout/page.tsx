'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { DUMMY_PRODUCTS } from '../data/dummyProducts'
import AlertModal, { AlertType } from '../components/AlertModal'

const SHIPPING_COST = 15000
const PAYMENT_METHODS = [
  'Transfer Bank',
  'Virtual Account',
  'Bayar di Tempat (COD)',
  'E-Wallet (GoPay / OVO)',
]

export default function CheckoutPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = use(searchParams)
  const router = useRouter()
  
  const productId = typeof params.id === 'string' ? parseInt(params.id, 10) : null
  const size = typeof params.size === 'string' ? params.size : ''
  const qty = typeof params.qty === 'string' ? parseInt(params.qty, 10) : 1

  const product = DUMMY_PRODUCTS.find((p) => p.id === productId)

  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0])
  const [alertType, setAlertType] = useState<AlertType>(null)

  if (!product) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produk tidak ditemukan</h1>
          <Link href="/" className="bg-black text-white px-6 py-3 rounded-xl font-semibold">Kembali ke Katalog</Link>
        </div>
      </main>
    )
  }

  const subtotal = product.price * qty
  const shipping = SHIPPING_COST
  const total = subtotal + shipping

  const handlePay = () => {
    // Tampilkan success alert
    setAlertType('checkout_success')
  }

  return (
    <main className="min-h-[70vh] bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:px-8 lg:grid-cols-[1fr_420px]">
        <section>
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            CHECKOUT LANGSUNG
          </h1>

          <div className="border border-gray-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold mb-4 border-b border-gray-200 pb-4">Alamat Pengiriman</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penerima</label>
                <input type="text" placeholder="Masukkan nama lengkap" className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <textarea rows={3} placeholder="Nama jalan, nomor rumah, RT/RW, kecamatan..." className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-black"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
                <input type="tel" placeholder="08..." className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-black" />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 border-b border-gray-200 pb-4">Pesanan Anda</h2>
            <article className="grid gap-5 sm:grid-cols-[120px_1fr] items-center">
              <div className="relative aspect-4/3 overflow-hidden bg-gray-100 rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  {product.brand}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-gray-500">Ukuran: {size} | Jumlah: {qty}</p>
                <p className="mt-3 text-lg font-bold text-gray-900">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
              </div>
            </article>
          </div>
        </section>

        <aside className="h-fit border border-gray-200 p-6 md:p-8 rounded-xl">
          <h2 className="text-xl font-bold">
            RINGKASAN PESANAN
          </h2>

          <div className="mt-8 space-y-5 text-lg">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Ongkir</span>
              <span>Rp {shipping.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-5 font-bold">
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <h3 className="mt-8 font-bold text-gray-500">
            METODE PEMBAYARAN
          </h3>
          <div className="mt-4 space-y-3">
            {PAYMENT_METHODS.map((method) => (
              <label
                key={method}
                className={`flex cursor-pointer items-center gap-4 border p-4 rounded-xl transition-colors ${paymentMethod === method
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200'
                  }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="h-5 w-5 accent-black"
                />
                <span className="font-medium">{method}</span>
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={handlePay}
            className="mt-6 w-full rounded-xl bg-black py-4 font-semibold text-white hover:bg-gray-800 transition-colors"
          >
            BAYAR SEKARANG
          </button>
          <p className="mt-5 text-center text-sm leading-6 text-gray-400">
            Dengan melanjutkan, kamu menyetujui syarat dan ketentuan VOXHAUL.
          </p>
        </aside>
      </div>

      <AlertModal
        type={alertType}
        onClose={() => {
          setAlertType(null)
          if (alertType === 'checkout_success') {
            router.push('/')
          }
        }}
      />
    </main>
  )
}
