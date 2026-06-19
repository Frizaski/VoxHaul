# Panduan Memahami Tampilan VoxHaul

Dokumen ini menjelaskan cara kerja proyek marketplace VoxHaul saat ini. Fokusnya adalah memahami bagaimana layout dibuat, bagaimana data produk ditampilkan menjadi kartu, bagaimana tombol bekerja, dan bagaimana banner berpindah otomatis.

## 1. Teknologi yang Digunakan

Proyek ini menggunakan:

- **Next.js App Router** untuk struktur halaman dan routing.
- **React** untuk membuat komponen dan interaksi.
- **TypeScript** untuk memeriksa bentuk data.
- **Tailwind CSS** untuk mengatur tampilan melalui `className`.
- **next/image** untuk menampilkan dan mengoptimalkan gambar.
- **next/link** untuk navigasi antarhalaman.
- **react-icons** untuk ikon keranjang, hati, panah, dan media sosial.

Struktur utamanya:

```text
app/
├── components/
│   ├── CategoryMenu.tsx
│   ├── Footer.tsx
│   ├── HeroBanner.tsx
│   ├── Navbar.tsx
│   └── ProductCard.tsx
├── globals.css
├── layout.tsx
└── page.tsx

public/
└── Assets/
    ├── Banner/
    ├── Katalog/
    └── Logo/
```

Folder `app` berisi kode halaman. Folder `public` berisi aset yang bisa diakses langsung oleh browser.

Contohnya:

```text
public/Assets/Katalog/Baju Putih 1.png
```

dipanggil dari kode menggunakan:

```tsx
image: '/Assets/Katalog/Baju Putih 1.png'
```

Kata `public` tidak perlu ditulis dalam URL.

---

## 2. Alur Tampilan Halaman

Urutan komponen yang tampil adalah:

```text
RootLayout
├── Navbar
├── Page
│   ├── HeroBanner
│   ├── CategoryMenu
│   └── kumpulan ProductCard
└── Footer
```

`layout.tsx` membungkus semua halaman:

```tsx
<body>
  <Navbar />
  {children}
  <Footer />
</body>
```

`children` adalah isi halaman yang sedang dibuka. Ketika pengguna membuka `/`, nilai `children` berasal dari `app/page.tsx`.

Jadi Navbar dan Footer tidak perlu ditulis ulang pada setiap halaman.

---

## 3. Server Component dan Client Component

Secara default, komponen di App Router adalah **Server Component**.

Contohnya:

```tsx
export default function Page() {
  return <main>...</main>
}
```

Server Component cocok untuk:

- Menampilkan data.
- Membuat struktur halaman.
- Mengurangi JavaScript yang dikirim ke browser.
- Mengambil data dari database atau API nantinya.

Komponen yang memakai state, event, atau efek harus menjadi **Client Component** dengan:

```tsx
'use client'
```

Pada proyek ini:

- `page.tsx` adalah Server Component.
- `layout.tsx` adalah Server Component.
- `Navbar.tsx` dan `Footer.tsx` adalah Server Component.
- `HeroBanner.tsx` adalah Client Component karena menggunakan state, timer, dan tombol.
- `ProductCard.tsx` adalah Client Component karena tombol favorit menggunakan state.
- `CategoryMenu.tsx` adalah Client Component karena kategori dapat dibuka dan ditutup.

---

## 4. Layout Utama di `page.tsx`

Bagian utama halaman:

```tsx
<main>
  <HeroBanner />

  <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8 max-w-7xl mx-auto">
    <CategoryMenu />

    <section className="flex-1">
      ...
    </section>
  </div>
</main>
```

Arti class Tailwind tersebut:

| Class | Fungsi |
|---|---|
| `flex` | Mengaktifkan Flexbox |
| `flex-col` | Pada layar kecil, elemen tersusun ke bawah |
| `md:flex-row` | Mulai ukuran medium, elemen tersusun ke samping |
| `gap-6` | Memberi jarak antara sidebar dan katalog |
| `p-4` | Padding pada layar kecil |
| `md:p-8` | Padding lebih besar pada layar medium |
| `max-w-7xl` | Membatasi lebar konten |
| `mx-auto` | Menempatkan konten di tengah |
| `flex-1` | Area katalog mengambil sisa ruang |

Bagian ini yang membuat layout menjadi:

```text
Desktop:
[ CategoryMenu ] [ Katalog Produk                 ]

Mobile:
[ CategoryMenu ]
[ Katalog      ]
```

Prefix seperti `md:` adalah breakpoint responsif. Class itu baru aktif saat layar mencapai ukuran medium.

### Mengapa banner berada di atas?

Perhatikan urutan JSX di `page.tsx`:

```tsx
<main>
  <HeroBanner />

  <div className="flex flex-col md:flex-row ...">
    <CategoryMenu />
    <section className="flex-1">...</section>
  </div>
</main>
```

`HeroBanner` ditulis lebih dahulu dan berada **di luar** container Flexbox sidebar-katalog. Elemen HTML secara normal mengalir dari atas ke bawah. Karena itu urutannya menjadi:

```text
1. HeroBanner
2. Container sidebar dan katalog
```

Secara visual:

```text
┌─────────────────────────────────────────────┐
│                  BANNER                     │
└─────────────────────────────────────────────┘

┌──────────────┐  ┌──────────────────────────┐
│   SIDEBAR    │  │       CARD PRODUK        │
│              │  │  [card] [card] [card]    │
└──────────────┘  └──────────────────────────┘
```

Jika `HeroBanner` dipindahkan ke dalam container Flexbox, banner akan ikut disejajarkan dengan sidebar dan katalog. Jadi posisi komponen ditentukan oleh CSS sekaligus letaknya di dalam struktur JSX.

### Mengapa sidebar berada di kiri?

`CategoryMenu` dan `<section>` berada di dalam parent yang sama:

```tsx
<div className="flex flex-col md:flex-row ...">
  <CategoryMenu />
  <section className="flex-1">...</section>
</div>
```

Pada layar desktop, `md:flex-row` mengubah arah Flexbox menjadi horizontal. Anak-anaknya disusun dari kiri ke kanan sesuai urutan penulisan:

```text
Anak pertama: CategoryMenu → kiri
Anak kedua: section      → kanan
```

Jika urutannya ditukar:

```tsx
<div className="flex md:flex-row">
  <section className="flex-1">...</section>
  <CategoryMenu />
</div>
```

maka katalog akan berada di kiri dan sidebar berada di kanan.

`CategoryMenu` memiliki:

```tsx
className="w-full md:w-64"
```

Artinya:

- Pada mobile, sidebar selebar layar.
- Pada desktop, lebarnya tetap `w-64` atau sekitar 16 rem.

### Mengapa card mengisi bagian kanan?

Area katalog menggunakan:

```tsx
<section className="flex-1">
```

`flex-1` meminta section mengambil semua ruang yang tersisa setelah ruang untuk sidebar dan `gap-6` digunakan.

```text
Lebar container
- lebar sidebar
- gap
= lebar area katalog
```

Di dalam section, produk memakai Grid:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

Jadi ada dua sistem layout yang bekerja bersama:

1. **Flexbox** membagi halaman menjadi sidebar kiri dan katalog kanan.
2. **Grid** membagi area katalog menjadi beberapa kolom kartu.

Pada mobile, `flex-col` membuat sidebar dan katalog tersusun ke bawah. Pada desktop, `md:flex-row` membuat keduanya berdampingan.

---

## 5. Grid Katalog Produk

Produk ditampilkan menggunakan CSS Grid:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {DUMMY_PRODUCTS.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

Jumlah kolom berubah sesuai ukuran layar:

| Ukuran layar | Jumlah kolom |
|---|---:|
| Mobile | 1 |
| Small (`sm`) | 2 |
| Large (`lg`) | 3 |

`gap-4` memberi jarak antarkartu.

### Cara `.map()` bekerja

`DUMMY_PRODUCTS` adalah array yang berisi kumpulan objek produk:

```tsx
const DUMMY_PRODUCTS = [
  {
    id: 1,
    brand: 'VOXHAUL',
    name: 'Relaxed Linen Shirt - Cokelat',
    price: 249000,
    image: '/Assets/Katalog/Baju Cokelat 1.png',
  },
]
```

Kode ini:

```tsx
DUMMY_PRODUCTS.map((product) => (
  <ProductCard key={product.id} product={product} />
))
```

berarti:

1. Ambil setiap produk dari array.
2. Buat satu `ProductCard`.
3. Kirim seluruh data melalui prop bernama `product`.

`key={product.id}` membantu React mengenali setiap kartu. Karena itu, setiap `id` harus unik.

### Menambahkan produk

Tambahkan objek baru sebelum penutup array:

```tsx
{
  id: 17,
  brand: 'VOXHAUL',
  name: 'Nama Produk Baru',
  price: 299000,
  image: '/Assets/Katalog/Nama Gambar.png',
},
```

Aturannya:

- `id` tidak boleh sama dengan produk lain.
- `price` ditulis sebagai angka tanpa titik.
- File gambar harus tersedia di dalam `public`.
- Path gambar harus sama persis dengan nama file.

---

## 6. Cara Kerja `ProductCard`

TypeScript mendefinisikan bentuk sebuah produk:

```tsx
interface Product {
  id: number
  brand: string
  name: string
  price: number
  image: string
}
```

Artinya, `ProductCard` hanya menerima produk dengan properti tersebut.

Props komponen:

```tsx
interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  ...
}
```

Data kemudian ditampilkan dengan:

```tsx
{product.brand}
{product.name}
{product.price}
```

### Kotak kartu

```tsx
<div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
```

| Class | Fungsi |
|---|---|
| `bg-white` | Latar kartu berwarna putih |
| `rounded-xl` | Sudut kartu membulat |
| `shadow-sm` | Bayangan kecil |
| `hover:shadow-lg` | Bayangan membesar saat disentuh mouse |
| `transition-all` | Perubahan dibuat halus |
| `duration-300` | Durasi animasi 300 milidetik |
| `overflow-hidden` | Isi yang keluar dari sudut kartu dipotong |
| `group` | Memungkinkan elemen anak bereaksi saat kartu di-hover |

### Gambar produk

```tsx
<div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
  <Image
    src={product.image}
    alt={product.name}
    fill
    className="object-contain group-hover:scale-105 transition-transform duration-300"
  />
</div>
```

`fill` membuat gambar memenuhi parent. Karena menggunakan `fill`, parent harus memiliki:

- Posisi `relative`.
- Ukuran yang jelas, pada kode ini `w-full aspect-4/3`.

`aspect-4/3` mengikuti rasio foto katalog `800 × 600`. `object-contain` menjaga seluruh gambar tetap terlihat walaupun lebar card berubah.

```tsx
className="object-contain ..."
```

Jika ingin gambar selalu memenuhi kotak walaupun sebagian tepinya terpotong, gunakan:

```tsx
className="object-cover ..."
```

Perbedaannya:

- `object-cover`: kotak penuh, tetapi gambar mungkin terpotong.
- `object-contain`: seluruh gambar terlihat, tetapi mungkin ada ruang kosong.

`group-hover:scale-105` memperbesar gambar menjadi 105% ketika kartu di-hover.

### Format harga Rupiah

```tsx
Rp {product.price.toLocaleString('id-ID')}
```

Contohnya:

```tsx
249000
```

ditampilkan menjadi:

```text
Rp 249.000
```

`id-ID` adalah locale Bahasa Indonesia.

---

## 7. Cara Kerja Tombol Favorit

State favorit dibuat dengan:

```tsx
const [isFavorite, setIsFavorite] = useState(false)
```

Artinya:

- `isFavorite` menyimpan kondisi saat ini.
- Nilai awalnya `false`.
- `setIsFavorite` digunakan untuk mengubah nilainya.

Tombolnya:

```tsx
<button onClick={() => setIsFavorite(!isFavorite)}>
  {isFavorite ? <HiHeart /> : <HiOutlineHeart />}
</button>
```

Ketika tombol diklik:

```tsx
setIsFavorite(!isFavorite)
```

akan membalik nilai:

```text
false → true
true  → false
```

Conditional rendering berikut memilih ikon:

```tsx
isFavorite ? ikonPenuh : ikonKosong
```

Tanda `? :` disebut ternary operator.

Tombol memiliki `absolute top-3 right-3`, sehingga berada di pojok kanan atas gambar. Posisi absolutnya mengacu pada parent gambar yang menggunakan `relative`.

Versi lebih aman untuk pembaruan state adalah:

```tsx
onClick={() => setIsFavorite((previous) => !previous)}
```

Tambahkan juga label aksesibilitas:

```tsx
aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
```

---

## 8. Tombol Tambah Keranjang

Tampilan tombol:

```tsx
<button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2.5 rounded-lg transition duration-200">
  Tambah Keranjang
</button>
```

| Class | Fungsi |
|---|---|
| `w-full` | Lebar tombol memenuhi kartu |
| `bg-black` | Latar hitam |
| `hover:bg-gray-800` | Menjadi abu gelap saat hover |
| `text-white` | Tulisan putih |
| `font-semibold` | Tulisan agak tebal |
| `py-2.5` | Padding atas dan bawah |
| `rounded-lg` | Sudut membulat |
| `transition` | Perubahan warna dibuat halus |

Saat ini tombol baru memiliki tampilan dan belum memiliki `onClick`. Contoh sederhana:

```tsx
<button
  onClick={() => alert(`${product.name} ditambahkan ke keranjang`)}
  className="..."
>
  Tambah Keranjang
</button>
```

Karena `ProductCard` sudah menjadi Client Component, event `onClick` dapat langsung digunakan.

Untuk marketplace yang lebih lengkap, data keranjang sebaiknya disimpan di state bersama, React Context, atau database.

---

## 9. Cara Kerja Menu Kategori

Data kategori disimpan sebagai array:

```tsx
const MENU_CATEGORIES = [
  {
    title: 'Belanja (Shop)',
    items: ['Pria (Men)', 'Wanita (Women)'],
  },
]
```

State menyimpan kategori mana yang terbuka:

```tsx
const [expandedCategories, setExpandedCategories] =
  useState<Record<string, boolean>>({
    'Belanja (Shop)': true,
    'Bantuan (Customer Care)': false,
    'Tentang Kami (About Us)': false,
  })
```

Nilai `true` berarti terbuka. Nilai `false` berarti tertutup.

Fungsi toggle:

```tsx
const toggleCategory = (categoryTitle: string) => {
  setExpandedCategories((prev) => ({
    ...prev,
    [categoryTitle]: !prev[categoryTitle],
  }))
}
```

Bagian penting:

- `...prev` menyalin seluruh state lama.
- `[categoryTitle]` memilih kategori yang diklik.
- `!prev[categoryTitle]` membalik nilai kategori tersebut.

Tombol memanggil fungsi:

```tsx
onClick={() => toggleCategory(category.title)}
```

Daftar hanya dirender ketika kategori terbuka:

```tsx
{expandedCategories[category.title] && (
  <ul>...</ul>
)}
```

Operator `&&` berarti: tampilkan bagian kanan hanya jika kondisi bagian kiri bernilai `true`.

Ikon panah diputar saat kategori terbuka:

```tsx
className={`... ${
  expandedCategories[category.title] ? 'rotate-180' : ''
}`}
```

---

## 10. Struktur Banner

Data banner:

```tsx
const slides = [
  {
    id: 1,
    src: '/Assets/Banner/Banner1Baru.png',
    alt: 'Banner 1',
    bg: 'bg-blue-500',
    label: 'Slide 1',
  },
]
```

Setiap slide mempunyai:

- `id`: identitas unik.
- `src`: alamat gambar.
- `alt`: deskripsi gambar.
- `bg`: warna cadangan.
- `label`: tulisan cadangan jika tidak ada gambar.

Untuk menambahkan slide:

```tsx
{
  id: 4,
  src: '/Assets/Banner/Banner4.png',
  alt: 'Promo koleksi terbaru VoxHaul',
  bg: 'bg-gray-500',
  label: 'Slide 4',
},
```

Pastikan file tersedia di:

```text
public/Assets/Banner/Banner4.png
```

---

## 11. Cara Banner Berpindah

State berikut menyimpan indeks slide aktif:

```tsx
const [current, setCurrent] = useState(0)
```

Nilai `0` berarti slide pertama, `1` berarti slide kedua, dan seterusnya.

Semua slide disusun horizontal:

```tsx
<div className="flex">
  {slides.map(...)}
</div>
```

Setiap slide menggunakan:

```tsx
className="relative w-full shrink-0"
```

Artinya:

- `w-full`: setiap slide selebar banner.
- `shrink-0`: slide tidak boleh mengecil.
- Karena parent memakai `flex`, semua slide berjajar ke samping.

Gambaran sederhananya:

```text
[ Slide 1 ][ Slide 2 ][ Slide 3 ]
```

Container luar menggunakan `overflow-hidden`, sehingga hanya satu bagian yang terlihat.

Slide dipindahkan dengan:

```tsx
style={{ transform: `translateX(-${current * 100}%)` }}
```

Hasil perhitungannya:

| `current` | Transform | Yang terlihat |
|---:|---|---|
| 0 | `translateX(0%)` | Slide 1 |
| 1 | `translateX(-100%)` | Slide 2 |
| 2 | `translateX(-200%)` | Slide 3 |

Animasi dibuat halus oleh:

```tsx
className="transition-transform duration-500 ease-in-out"
```

Artinya transform berubah selama 500 milidetik.

---

## 12. Tombol Next dan Previous Banner

Fungsi slide berikutnya:

```tsx
const next = useCallback(() => {
  setCurrent((prev) => (prev + 1) % slides.length)
}, [])
```

Misalnya ada tiga slide:

```text
(0 + 1) % 3 = 1
(1 + 1) % 3 = 2
(2 + 1) % 3 = 0
```

Operator `%` adalah modulo atau sisa pembagian. Teknik ini membuat slide kembali ke awal setelah slide terakhir.

Fungsi slide sebelumnya:

```tsx
const prev = useCallback(() => {
  setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
}, [])
```

Penambahan `slides.length` mencegah hasil menjadi negatif.

Tombol memanggil fungsi tersebut:

```tsx
<button onClick={prev} aria-label="Slide sebelumnya">
  <HiChevronLeft />
</button>

<button onClick={next} aria-label="Slide berikutnya">
  <HiChevronRight />
</button>
```

Posisi tombol:

```tsx
absolute left-3 top-1/2 -translate-y-1/2
```

Artinya:

- `absolute`: tombol ditempatkan bebas di dalam banner.
- `left-3`: dekat sisi kiri.
- `top-1/2`: titik awal berada pada 50% tinggi banner.
- `-translate-y-1/2`: menggeser tombol setengah tingginya ke atas agar benar-benar di tengah.

Tombol kanan memakai `right-3`.

---

## 13. Membuat Banner Auto-Slide

Kecepatan perpindahan disimpan dalam:

```tsx
const INTERVAL_MS = 3500
```

`3500` milidetik sama dengan 3,5 detik.

Auto-slide menggunakan `useEffect`:

```tsx
useEffect(() => {
  if (paused) return

  const timer = setInterval(next, INTERVAL_MS)

  return () => clearInterval(timer)
}, [paused, next])
```

Urutan kerjanya:

1. React menjalankan efek setelah komponen tampil.
2. Jika `paused` bernilai `true`, timer tidak dibuat.
3. `setInterval` menjalankan fungsi `next` setiap 3,5 detik.
4. `next` memperbarui `current`.
5. Perubahan `current` menggeser banner.
6. `clearInterval` membersihkan timer lama ketika efek dijalankan ulang atau komponen dilepas.

Cleanup berikut sangat penting:

```tsx
return () => clearInterval(timer)
```

Tanpa cleanup, beberapa timer dapat berjalan bersamaan dan banner bisa berpindah terlalu cepat.

### Mengubah kecepatan

Contoh 5 detik:

```tsx
const INTERVAL_MS = 5000
```

Contoh 2 detik:

```tsx
const INTERVAL_MS = 2000
```

Nilai yang terlalu kecil dapat membuat banner sulit dibaca. Umumnya 3 sampai 6 detik cukup nyaman.

---

## 14. Pause Banner Saat Hover

State pause:

```tsx
const [paused, setPaused] = useState(false)
```

Event pada banner:

```tsx
<section
  onMouseEnter={() => setPaused(true)}
  onMouseLeave={() => setPaused(false)}
>
```

Saat mouse masuk:

```text
paused = true
```

`useEffect` berhenti membuat timer.

Saat mouse keluar:

```text
paused = false
```

`useEffect` membuat timer baru dan auto-slide berjalan lagi.

Untuk perangkat sentuh, hover tidak selalu tersedia. Nanti banner bisa ditingkatkan dengan pause ketika pengguna fokus pada tombol atau ketika tab browser tidak aktif.

---

## 15. Dot Indicator Banner

Dot dibuat berdasarkan jumlah slide:

```tsx
{slides.map((_, i) => (
  <button
    key={i}
    onClick={() => setCurrent(i)}
    aria-label={`Pergi ke slide ${i + 1}`}
  />
))}
```

Jika ada empat slide, otomatis muncul empat dot.

Ketika dot diklik:

```tsx
setCurrent(i)
```

langsung mengubah slide aktif.

Style dot aktif:

```tsx
i === current
  ? 'bg-white scale-125'
  : 'bg-white/50 hover:bg-white/80'
```

Jika indeks dot sama dengan indeks slide aktif, dot menjadi putih dan sedikit lebih besar.

---

## 16. Ukuran dan Tampilan Gambar Banner

Wadah banner saat ini menggunakan rasio:

```tsx
aspect-1920/400
```

Rasionya adalah `4.8:1`. Ukuran desain yang cocok:

```text
1920 × 400 px
```

Ukuran lain tetap bisa dipakai selama rasionya sama, misalnya:

```text
1440 × 300 px
960 × 200 px
```

Gambar menggunakan:

```tsx
fill
className="object-cover"
```

Karena itu gambar memenuhi banner. Jika rasio file berbeda, sebagian gambar dapat terpotong.

`priority={slide.id === 1}` membuat slide pertama dimuat lebih awal karena tampil pertama kali.

`quality={100}` meminta kualitas maksimal, tetapi ukuran transfer dapat menjadi lebih besar. Nilai sekitar `80` sampai `90` biasanya sudah cukup untuk web.

---

## 17. Navbar

Navbar menggunakan Flexbox:

```tsx
<nav className="flex items-center justify-between ...">
```

Bagian di dalamnya:

```text
[ Logo ] [ Menu ] [ Search                    ] [ Cart ]
```

Class penting:

- `items-center`: semua elemen sejajar vertikal.
- `justify-between`: ruang dibagi di antara elemen.
- `sticky top-0`: navbar tetap menempel di atas saat halaman di-scroll.
- `shadow-md`: memberi bayangan.
- `z-100`: mencoba menempatkan navbar di atas elemen lain.

Logo dan ikon keranjang menggunakan `Link`:

```tsx
<Link href="/">...</Link>
<Link href="/cart">...</Link>
```

`Link` digunakan untuk navigasi tanpa reload halaman penuh.

Search bar saat ini masih berupa tampilan:

```tsx
<input type="text" placeholder="Cari fashion lo..." />
```

Karena belum memiliki state dan fungsi filter, mengetik belum mengubah daftar produk.

Perhatikan juga bahwa menu Men, Women, Kids, dan Brand sekarang berada dalam satu `Link`. Akibatnya, semuanya menuju URL yang sama. Untuk membuat menu terpisah, bentuk yang lebih tepat:

```tsx
<div className="flex gap-6">
  <Link href="/men">Men</Link>
  <Link href="/women">Women</Link>
  <Link href="/brands">Brand</Link>
</div>
```

---

## 18. Footer

Footer memakai layout responsif:

```tsx
<div className="flex flex-col md:flex-row items-center justify-between ...">
```

Pada mobile, bagian logo dan media sosial tersusun vertikal. Pada desktop, keduanya tersusun horizontal.

Logo dibuat putih dengan:

```tsx
className="brightness-0 invert"
```

Ikon media sosial berasal dari `react-icons`:

```tsx
<FaInstagram />
<FaXTwitter />
<FaTiktok />
<FaYoutube />
```

Saat ini `href="#"` hanya membawa pengguna ke bagian atas halaman. Nantinya ganti dengan URL media sosial sebenarnya.

---

## 19. CSS Global

File `globals.css` dimulai dengan:

```css
@import "tailwindcss";
```

Baris itu mengaktifkan Tailwind CSS.

Variabel warna global:

```css
:root {
  --background: #f8f9fa;
  --foreground: #1a1a2e;
}
```

Kemudian dipakai pada body:

```css
body {
  background: var(--background);
  color: var(--foreground);
}
```

Aturan:

```css
* {
  box-sizing: border-box;
}
```

membuat ukuran elemen lebih mudah dihitung karena padding dan border masuk ke dalam ukuran total elemen.

---

## 20. Pola Membuat Tombol Interaktif

Secara umum, tombol React terdiri dari tiga bagian:

### 1. State

```tsx
const [active, setActive] = useState(false)
```

### 2. Event

```tsx
onClick={() => setActive(!active)}
```

### 3. Tampilan berdasarkan state

```tsx
className={active ? 'bg-black text-white' : 'bg-white text-black'}
```

Contoh lengkap:

```tsx
'use client'

import { useState } from 'react'

export default function ExampleButton() {
  const [active, setActive] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setActive((previous) => !previous)}
      className={
        active
          ? 'rounded bg-black px-4 py-2 text-white'
          : 'rounded bg-gray-200 px-4 py-2 text-black'
      }
    >
      {active ? 'Aktif' : 'Tidak aktif'}
    </button>
  )
}
```

Gunakan `type="button"` jika tombol tidak dimaksudkan untuk mengirim form.

---

## 21. Cara Berpikir Saat Membuat Tampilan

Urutan kerja yang cukup mudah untuk pemula:

1. Pecah halaman menjadi bagian besar: Navbar, Banner, Sidebar, Katalog, Footer.
2. Buat struktur HTML/JSX tanpa memikirkan detail warna.
3. Tentukan layout utama memakai Flexbox atau Grid.
4. Jadikan bagian yang berulang sebagai komponen.
5. Pindahkan data berulang ke array lalu tampilkan dengan `.map()`.
6. Tambahkan responsive class seperti `sm:`, `md:`, dan `lg:`.
7. Tambahkan state hanya pada bagian yang memang interaktif.
8. Tambahkan hover, transition, dan animasi setelah struktur bekerja.
9. Periksa tampilan mobile dan desktop.
10. Jalankan TypeScript, ESLint, dan build.

Untuk proyek VoxHaul:

- Flexbox digunakan untuk layout sidebar dan konten.
- Grid digunakan untuk daftar produk.
- Absolute positioning digunakan untuk ikon yang menempel di atas gambar.
- State digunakan untuk favorit, kategori, dan banner.
- `.map()` digunakan untuk produk, kategori, slide, dan dot.

---

## 22. Menjalankan Proyek

Mode pengembangan:

```bash
npm run dev
```

Perubahan kode biasanya langsung diperbarui oleh Next.js.

Jika menggunakan PowerShell dan `npm` diblokir oleh execution policy, gunakan:

```powershell
npm.cmd run dev
```

Pemeriksaan kode:

```bash
npm run lint
```

Build production:

```bash
npm run build
```

Build tidak perlu dijalankan setiap kali gambar atau kode berubah ketika sedang memakai mode development.

Jika isi gambar berubah tetapi nama file tetap sama dan browser masih menampilkan versi lama:

1. Lakukan hard refresh dengan `Ctrl + F5`.
2. Ganti nama file gambar.
3. Perbarui nilai `src`.
4. Restart development server jika diperlukan.

---

## 23. Ringkasan Konsep Penting

```text
layout.tsx
└── Struktur bersama: Navbar + halaman + Footer

page.tsx
├── Menyimpan data produk
├── Menyusun layout utama
└── Membuat ProductCard menggunakan .map()

HeroBanner.tsx
├── current menentukan slide aktif
├── next dan prev mengganti current
├── translateX menggeser kumpulan slide
├── setInterval menjalankan next otomatis
└── clearInterval membersihkan timer

ProductCard.tsx
├── Menerima data melalui props
├── next/image menampilkan gambar
├── useState menyimpan status favorit
└── Tailwind mengatur kartu dan tombol

CategoryMenu.tsx
├── Array menyimpan kategori
├── state menyimpan kategori terbuka
└── conditional rendering menampilkan item
```

Inti pola React pada proyek ini adalah:

```text
Data → .map() → Component → Props → Tampilan

Interaksi pengguna → Event → Perubahan State → Render ulang
```

Jika dua pola tersebut sudah dipahami, sebagian besar kode pada halaman marketplace ini akan jauh lebih mudah dibaca dan dikembangkan.

## Detail Produk (app/product/[id]/page.tsx)

Halaman detail produk dirancang secara dinamis menggunakan fitur *dynamic routing* Next.js, sehingga setiap produk memiliki halamannya sendiri berdasarkan ID. 
Halaman ini dibagi menjadi dua kolom utama pada layar besar (kiri untuk galeri, kanan untuk detail).

### 1. Galeri Gambar (Kiri)
Komponen ini menggunakan useState untuk menyimpan index gambar utama yang sedang ditampilkan.
- **Gambar Utama**: Ditampilkan menggunakan komponen Image dari 
ext/image untuk optimasi performa.
- **Navigasi Panah**: Fungsi prevImage dan 
extImage mengubah index mainImageIndex.
- **Thumbnails**: Array gambar di-map menjadi kotak-kotak kecil. Jika di-klik, state mainImageIndex akan berubah dan mengganti gambar utama di atasnya.

### 2. Informasi Produk (Kanan)
Bagian kanan memuat berbagai informasi yang bersifat interaktif dan reaktif:
- **Pilihan Warna & Ukuran**: Menggunakan useState (selectedColor, selectedSize). Ketika diklik, tombol yang aktif akan memiliki *border* atau warna berbeda.
- **Kuantitas**: State quantity diatur lewat fungsi tambah/kurang, dengan batas minimal 1 untuk mencegah input nilai negatif.
- **Tombol Aksi**: Tombol Keranjang dan Favorit saat ini memberikan feedback sederhana, tapi ke depannya akan dihubungkan ke CartContext dan FavoritesContext.
- **Accordion Detail**: isDetailOpen dan isShippingOpen menggunakan useState boolean. Ikon chevron (panah) diputar menggunakan CSS Tailwind (otate-180) saat state dalam keadaan *true*, dan konten teks di bawahnya akan dirender/ditampilkan.

