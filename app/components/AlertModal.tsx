'use client'
import Image from 'next/image'

export type AlertType = 'oops' | 'success' | 'checkout_success' | 'confirm_delete' | null

interface AlertModalProps {
  type: AlertType
  onClose: () => void
  onConfirm?: () => void
}

export default function AlertModal({ type, onClose, onConfirm }: AlertModalProps) {
  if (!type) return null

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-[400px] w-full text-center shadow-2xl relative">
        {type === 'oops' && (
          <div className="flex flex-col items-center">
            <Image 
              src="/Assets/Alert/Oops_Alert.svg" 
              alt="Oops!" 
              width={160} 
              height={100} 
              className="mb-6" 
            />
            <h3 className="text-xl font-bold text-black mb-3">Kamu lupa ya untuk memilih ukuran...</h3>
            <p className="text-gray-600 mb-8">Kamu bisa pilih ukuran kamu terlebih dahulu ya</p>
            <button 
              onClick={onClose} 
              className="bg-black hover:bg-gray-800 transition-colors text-white px-8 py-3 rounded-xl font-bold"
            >
              Tutup
            </button>
          </div>
        )}

        {type === 'success' && (
          <div className="flex flex-col items-center">
            <h2 className="text-[3rem] font-black mb-4">Yay!</h2>
            <h3 className="text-xl font-bold mb-3">Berhasil Ditambahkan!</h3>
            <p className="text-gray-600 mb-8">Lihat barangmu di keranjang</p>
            <button 
              onClick={onClose} 
              className="bg-black hover:bg-gray-800 transition-colors text-white px-8 py-3 rounded-xl font-bold"
            >
              Lanjut
            </button>
          </div>
        )}

        {type === 'checkout_success' && (
          <div className="flex flex-col items-center">
            <h2 className="text-[3rem] font-black mb-4">Yay!</h2>
            <h3 className="text-xl font-bold mb-3">Pembayaran Berhasil!</h3>
            <p className="text-gray-600 mb-8">Pesananmu akan segera diproses</p>
            <button 
              onClick={onClose} 
              className="bg-black hover:bg-gray-800 transition-colors text-white px-8 py-3 rounded-xl font-bold"
            >
              Kembali ke Beranda
            </button>
          </div>
        )}

        {type === 'confirm_delete' && (
          <div className="flex flex-col items-center pt-4">
            <h3 className="text-[1.7rem] leading-tight font-bold text-black mb-10 px-2">Anda Yakin untuk menghapus dari keranjang?</h3>
            <div className="flex gap-4">
              <button 
                onClick={onClose} 
                className="bg-[#FF3B30] hover:bg-red-600 transition-colors text-white px-8 py-3 rounded-2xl font-bold text-lg"
              >
                Batal
              </button>
              <button 
                onClick={() => { onConfirm?.(); onClose() }} 
                className="bg-black hover:bg-gray-800 transition-colors text-white px-8 py-3 rounded-2xl font-bold text-lg"
              >
                Yakin
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
