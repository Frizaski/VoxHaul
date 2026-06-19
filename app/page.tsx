import HeroBanner from './components/HeroBanner'
import CategoryMenu from './components/CategoryMenu'
import ProductCard from './components/ProductCard'

import { DUMMY_PRODUCTS } from './data/dummyProducts'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const genderFilter = typeof params.gender === 'string' ? params.gender : undefined
  const searchFilter = typeof params.search === 'string' ? params.search.toLowerCase() : undefined
  const originFilter = typeof params.origin === 'string' ? params.origin.toLowerCase() : undefined

  const LOCAL_BRANDS = ['erigo', 'sejauh mata memandang', 'sepatu compass', 'buttonscarves', 'executive'];
  const INTL_BRANDS = ['uniqlo', 'zara', 'nike', 'levis', 'ralph lauren'];

  let displayedProducts = DUMMY_PRODUCTS

  if (genderFilter) {
    displayedProducts = displayedProducts.filter((p) => p.gender?.toLowerCase() === genderFilter.toLowerCase())
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

  let catalogTitle = 'Katalog VoxHaul'
  if (searchFilter) {
    catalogTitle = `Hasil Pencarian: "${params.search}"`
  } else if (originFilter === 'lokal') {
    catalogTitle = `Katalog Brand Lokal`
  } else if (originFilter === 'internasional') {
    catalogTitle = `Katalog Brand Internasional`
  } else if (genderFilter) {
    catalogTitle = `Katalog VoxHaul - ${genderFilter.charAt(0).toUpperCase() + genderFilter.slice(1)}`
  }

  return (
    <main>
      <HeroBanner />
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8 max-w-auto mx-auto">
        {/* Sidebar Kategori */}
        <CategoryMenu />

        {/* Content Area */}
        <section className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {catalogTitle}
          </h2>
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-lg">Yah, produk tidak ditemukan :(</p>
              <p className="text-sm mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
