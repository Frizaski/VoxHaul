'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import { useCart } from '../context/CartContext'
import AlertModal, { AlertType } from '../components/AlertModal'

const SHIPPING_COST = 15000
const PAYMENT_METHODS = [
  'Transfer Bank',
  'Virtual Account',
  'Bayar di Tempat (COD)',
  'E-Wallet (GoPay / OVO)',
]

export default function CartPage() {
  const { cartItems, totalItems, updateQuantity, removeFromCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0])
  const [alertType, setAlertType] = useState<AlertType>(null)
  const [itemToDelete, setItemToDelete] = useState<{ id: number; size: string } | null>(null)

  const handleDeleteClick = (id: number, size: string) => {
    setItemToDelete({ id, size })
    setAlertType('confirm_delete')
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete.id, itemToDelete.size)
      setItemToDelete(null)
    }
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )
  const shipping = cartItems.length > 0 ? SHIPPING_COST : 0
  const total = subtotal + shipping

  return (
    <main className="min-h-[70vh] bg-white">
      <div className="w-full mx-auto grid max-w-7xl gap-10 px-4 py-10 md:px-8 lg:grid-cols-[1fr_420px]">
        <section>
          <h1 className="text-2xl font-bold text-gray-900">
            Keranjang ({totalItems} Item)
          </h1>

          {cartItems.length > 0 ? (
            <>
              <div className="mt-8 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <article
                    key={`${item.product.id}-${item.size}`}
                    className="grid gap-5 py-8 sm:grid-cols-[160px_1fr_auto]"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-gray-100 rounded-lg">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="160px"
                        className="object-contain"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-400">
                        {item.product.brand}
                      </p>
                      <h2 className="mt-2 text-xl font-semibold text-gray-900">
                        {item.product.name}
                      </h2>
                      <p className="mt-2 text-gray-400">Ukuran: {item.size}</p>
                      <p className="mt-5 text-xl font-bold text-gray-900">
                        Rp {item.product.price.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="flex items-end justify-between gap-5 sm:flex-col">
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(item.product.id, item.size)}
                        aria-label={`Hapus ${item.product.name}`}
                        className="text-gray-300 hover:text-red-500"
                      >
                        <HiOutlineTrash className="h-6 w-6" />
                      </button>

                      <div className="flex items-center border border-gray-200">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity === 1}
                          className="h-11 w-11 text-xl disabled:opacity-30"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-lg">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="h-11 w-11 text-xl"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>


            </>
          ) : (
            <div className="mt-8 border border-gray-200 p-10 text-center rounded-xl">
              <h2 className="text-xl font-semibold">Keranjang masih kosong</h2>
              <p className="mt-2 text-gray-500">
                Tambahkan produk dari katalog terlebih dahulu.
              </p>
              <Link
                href="/"
                className="mt-6 inline-block bg-black px-5 py-3 font-semibold text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                Lihat katalog
              </Link>
            </div>
          )}
        </section>

        <aside className="h-fit border border-gray-200 rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-bold">
            Ringkasan Pesanan
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
            Alamat Pengiriman
          </h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penerima</label>
              <input type="text" placeholder="Masukkan nama lengkap" className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
              <textarea rows={3} placeholder="Nama jalan, nomor rumah, RT/RW..." className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:border-black"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
              <input type="tel" placeholder="08.." className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:border-black" />
            </div>
          </div>

          <h3 className="mt-8 font-bold text-gray-500">
            Metode Pembayaran
          </h3>
          <div className="mt-4 space-y-3">
            {PAYMENT_METHODS.map((method) => (
              <label
                key={method}
                className={`flex cursor-pointer items-center gap-4 border p-4 rounded-xl ${paymentMethod === method
                  ? 'border-black'
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
            disabled={cartItems.length === 0}
            onClick={() => setAlertType('checkout_success')}
            className="mt-6 w-full rounded-xl bg-black py-4 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 transition-colors"
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
          setItemToDelete(null)
          if (alertType === 'checkout_success') {
            window.location.href = '/' // Force reload to home
          }
        }}
        onConfirm={confirmDelete}
      />
    </main>
  )
}
