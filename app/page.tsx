import HeroBanner from './components/HeroBanner'
import CategoryMenu from './components/CategoryMenu'
import ProductCard from './components/ProductCard'
import SearchResultsClient from './components/SearchResultsClient'
import { DUMMY_PRODUCTS } from './data/dummyProducts'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const genderFilter = typeof params.gender === 'string' ? params.gender : undefined
  const searchFilter = typeof params.search === 'string' ? params.search.toLowerCase().trim() : undefined
  const originFilter = typeof params.origin === 'string' ? params.origin.toLowerCase() : undefined

  const LOCAL_BRANDS = ['erigo', 'sejauh mata memandang', 'sepatu compass', 'buttonscarves', 'executive']
  const INTL_BRANDS = ['uniqlo', 'zara', 'nike', 'levis', 'ralph lauren']

  // Filter awal dari server (gender, origin, search keyword)
  let displayedProducts = DUMMY_PRODUCTS

  if (genderFilter) {
    displayedProducts = displayedProducts.filter((p) => p.gender?.toLowerCase() === genderFilter)
  }
  if (searchFilter) {
    displayedProducts = displayedProducts.filter((p) =>
      p.name.toLowerCase().includes(searchFilter) ||
      p.brand.toLowerCase().includes(searchFilter) ||
      p.category?.toLowerCase().includes(searchFilter)
    )
  }
  if (originFilter === 'lokal') {
    displayedProducts = displayedProducts.filter((p) => LOCAL_BRANDS.includes(p.brand.toLowerCase()))
  } else if (originFilter === 'internasional') {
    displayedProducts = displayedProducts.filter((p) => INTL_BRANDS.includes(p.brand.toLowerCase()))
  }

  // Judul katalog
  let catalogTitle = 'Katalog VoxHaul'
  if (originFilter === 'lokal') catalogTitle = 'Katalog Brand Lokal'
  else if (originFilter === 'internasional') catalogTitle = 'Katalog Brand Internasional'
  else if (genderFilter) {
    catalogTitle = `Katalog VoxHaul — ${genderFilter.charAt(0).toUpperCase() + genderFilter.slice(1)}`
  }

  // ── MODE SEARCH: tampilkan sidebar filter + hasil pencarian ──
  if (searchFilter) {
    return (
      <main>
        <div className="w-full p-4 md:p-8 max-w-7xl mx-auto">
          <SearchResultsClient
            initialProducts={displayedProducts}
            searchQuery={params.search as string}
          />
        </div>
      </main>
    )
  }

  // ── MODE NORMAL: tampilkan banner + grid produk (tanpa sidebar) ──
  return (
    <main>
      <HeroBanner />
      <div className="w-full p-4 md:p-8 max-w-7xl mx-auto">

        {/* Konten Produk */}
        <section className="w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{catalogTitle}</h2>

          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-lg font-medium">Produk tidak ditemukan</p>
              <p className="text-sm mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
