import Link from 'next/link'
import { HiArrowLeft } from 'react-icons/hi'

export default async function AboutPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams
  const topic = typeof params.topic === 'string' ? params.topic : 'about'

  const topics = [
    { id: 'about', title: 'Tentang VoxHaul' },
    { id: 'vision', title: 'Visi & Misi' },
    { id: 'careers', title: 'Karir' },
    { id: 'contact', title: 'Hubungi Kami' },
  ]

  const currentTopic = topics.find(t => t.id === topic) || topics[0]

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 md:gap-12">
        
        {/* Sidebar About Menu */}
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
                Tentang Kami
              </h2>
            </div>
            <ul className="flex flex-col space-y-4">
              {topics.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/about?topic=${t.id}`}
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

          {topic === 'about' && (
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p>
                Selamat datang di <strong>VoxHaul</strong>! Kami adalah destinasi utama bagi Gen Z yang mencari produk fesyen berkualitas, berkarakter, dan otentik.
              </p>
              <p>
                Dimulai sejak tahun 2026, VoxHaul diciptakan bukan sekadar sebagai tempat berbelanja, melainkan sebagai platform eksplorasi gaya hidup bagi anak muda yang dinamis. Kami mengumpulkan ratusan brand lokal hingga internasional pilihan terbaik untuk memenuhi hasrat gaya anak muda zaman sekarang.
              </p>
            </div>
          )}

          {topic === 'vision' && (
            <div className="prose max-w-none text-gray-600 space-y-6">
              <div>
                <h3 className="font-bold text-black text-xl mb-2">Visi Kami</h3>
                <p>
                  Menjadi platform gaya hidup dan fesyen pilihan utama Gen Z di Indonesia yang merayakan kreativitas, kebebasan berekspresi, dan keberagaman kultur anak muda.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black text-xl mb-2">Misi Kami</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Menyediakan kurasi fesyen terbaik yang relevan dengan tren masa kini.</li>
                  <li>Mendukung brand-brand lokal untuk bisa dijangkau oleh lebih banyak kalangan.</li>
                  <li>Memberikan pengalaman berbelanja online yang intuitif, aman, dan tanpa hambatan.</li>
                  <li>Terus berinovasi menciptakan teknologi untuk mendukung gaya hidup pengguna kami.</li>
                </ul>
              </div>
            </div>
          )}

          {topic === 'careers' && (
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p>
                Jadilah bagian dari revolusi fesyen Gen Z! Kami selalu mencari talenta-talenta muda, kreatif, dan penuh semangat untuk bergabung dengan VoxHaul.
              </p>
              <h3 className="font-bold text-black mt-6 mb-2">Posisi yang sedang terbuka:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Social Media Specialist (Jakarta)</li>
                <li>Frontend Engineer - React/Next.js (Remote)</li>
                <li>Fashion Merchandiser (Jakarta)</li>
              </ul>
              <p className="mt-4">
                Kirimkan CV dan portofolio Anda ke: <strong>careers@voxhaul.id</strong>
              </p>
            </div>
          )}

          {topic === 'contact' && (
            <div className="prose max-w-none text-gray-600 space-y-6">
              <p>Punya pertanyaan, kritik, atau saran? Jangan ragu untuk menghubungi kami melalui kanal-kanal di bawah ini:</p>
              
              <div>
                <h4 className="font-bold text-black mb-1">Email</h4>
                <p>hello@voxhaul.id</p>
              </div>
              <div>
                <h4 className="font-bold text-black mb-1">WhatsApp (Chat Only)</h4>
                <p>+62 812 3456 7890</p>
              </div>
              <div>
                <h4 className="font-bold text-black mb-1">Kantor Pusat</h4>
                <p>
                  Gedung VoxHaul Tower, Lantai 15<br />
                  Jl. Jend. Sudirman Kav. 50<br />
                  Jakarta Selatan, Indonesia 12190
                </p>
              </div>
            </div>
          )}

        </section>
      </div>
    </main>
  )
}
