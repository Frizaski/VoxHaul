import Link from 'next/link'
import { HiArrowLeft } from 'react-icons/hi'
import { DUMMY_FAQ } from '../data/dummyBantuan'

export default async function HelpPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams
  const topic = typeof params.topic === 'string' ? params.topic : 'faq'

  const topics = [
    { id: 'faq', title: 'Pusat Bantuan (FAQ)' },
    { id: 'tracking', title: 'Lacak Pesanan' },
    { id: 'shipping', title: 'Pengiriman' },
    { id: 'returns', title: 'Pengembalian & Penukaran' },
    { id: 'payment', title: 'Cara Pembayaran' },
  ]

  const currentTopic = topics.find(t => t.id === topic) || topics[0]

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 md:gap-12">
        
        {/* Sidebar Help Menu */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <Link 
                href="/" 
                className="text-gray-500 hover:text-black transition-colors" 
                aria-label="Kembali ke Beranda"
              >
                <HiArrowLeft className="w-5 h-5" />
              </Link>
              <h2 className="font-bold text-lg text-gray-900">
                Bantuan (Customer Care)
              </h2>
            </div>
            <ul className="flex flex-col space-y-4">
              {topics.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/help?topic=${t.id}`}
                    className={`block transition-colors ${
                      topic === t.id 
                        ? 'text-gray-900 font-semibold' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content Area */}
        <section className="flex-1 md:border-l md:border-gray-300 md:pl-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-10">
            {currentTopic.title}
          </h1>

          {topic === 'faq' && (
            <div className="space-y-8">
              {DUMMY_FAQ.map((faq) => (
                <div key={faq.id}>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.pertanyaan}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.jawaban}</p>
                </div>
              ))}
            </div>
          )}

          {topic === 'tracking' && (
            <div className="max-w-md">
              <p className="text-gray-600 mb-6">Masukkan nomor resi atau ID Pesanan Anda untuk melihat status pengiriman terkini.</p>
              <div className="flex gap-2">
                <input type="text" placeholder="Contoh: VXH-123456789" className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black" />
                <button className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">Lacak</button>
              </div>
            </div>
          )}

          {topic === 'shipping' && (
            <div className="prose max-w-none text-gray-600">
              <p>Kami bekerja sama dengan berbagai layanan logistik terpercaya untuk memastikan pesanan Anda sampai dengan aman dan tepat waktu.</p>
              <h3 className="font-bold text-black mt-6 mb-2">Metode Pengiriman:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Reguler (2-3 hari kerja):</strong> Rp 15.000 ke seluruh area coverage.</li>
                <li><strong>Instan (Sameday):</strong> Khusus area Jabodetabek. Pesanan sebelum jam 14.00 akan dikirim di hari yang sama.</li>
                <li><strong>Kargo (3-5 hari kerja):</strong> Untuk pesanan dalam jumlah besar atau berat di atas 5kg.</li>
              </ul>
            </div>
          )}

          {topic === 'returns' && (
            <div className="prose max-w-none text-gray-600">
              <p>Kepuasan pelanggan adalah prioritas kami. Jika Anda menerima produk yang tidak sesuai, cacat, atau salah ukuran, Anda dapat menukarnya.</p>
              <h3 className="font-bold text-black mt-6 mb-2">Syarat Penukaran:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Maksimal 7 hari sejak status barang diterima.</li>
                <li>Tag/label produk masih terpasang utuh.</li>
                <li>Barang belum pernah dicuci atau dipakai (kecuali dicoba).</li>
                <li>Sertakan video unboxing sebagai bukti jika barang cacat.</li>
              </ul>
            </div>
          )}

          {topic === 'payment' && (
            <div className="prose max-w-none text-gray-600">
              <p>Kami menyediakan berbagai kemudahan metode pembayaran untuk Anda.</p>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-bold text-black mb-1">Transfer Bank / Virtual Account</h4>
                  <p className="text-sm">BCA, Mandiri, BNI, BRI, Permata</p>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">E-Wallet</h4>
                  <p className="text-sm">GoPay, OVO, Dana, ShopeePay</p>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Bayar di Tempat (COD)</h4>
                  <p className="text-sm">Bayar tunai ke kurir saat paket sampai.</p>
                </div>
              </div>
            </div>
          )}

        </section>
      </div>
    </main>
  )
}
