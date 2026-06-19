'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const slides = [
  {
    id: 1,
    src: '/Assets/Banner/Banner1Baru.png',
    alt: 'Banner 1',
    bg: 'bg-blue-500',
    label: 'Slide 1 — Ganti dengan foto asli',
  },
  {
    id: 2,
    src: '/Assets/Banner/Banner2.png',
    alt: 'Banner 2',
    bg: 'bg-purple-500',
    label: 'Slide 2 — Ganti dengan foto asli',
  },
  {
    id: 3,
    src: '/Assets/Banner/Banner3.png',
    alt: 'Banner 3',
    bg: 'bg-rose-500',
    label: 'Slide 3 — Ganti dengan foto asli',
  },
]

const INTERVAL_MS = 3500 // atur kecepatan slide dalam ms

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  // fungsi geser ke slide berikutnya
  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  // fungsi geser ke slide sebelumnya
  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  // auto-slide: jalan setiap INTERVAL_MS, berhenti saat di-hover
  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [paused, next])

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}   // pause saat hover
      onMouseLeave={() => setPaused(false)}  // lanjut saat tidak hover
    >
      {/* agar semua slide berjajar horizontal */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`relative w-full shrink-0 aspect-video md:aspect-1920/400 ${slide.bg} flex items-center justify-center`}
          >
            {/* Kalau ada foto, tampilkan foto. Kalau tidak, tampilkan placeholder */}
            {slide.src ? (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                quality={100}
                priority={slide.id === 1}
              />
            ) : (
              <span className="text-white text-xl font-semibold opacity-70 select-none">
                {slide.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* tombol Prev */}
      <button
        onClick={prev}
        aria-label="Slide sebelumnya"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors z-10"
        suppressHydrationWarning
      >
        <HiChevronLeft className="text-2xl" />
      </button>

      {/* Tombol Next */}
      <button
        onClick={next}
        aria-label="Slide berikutnya"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors z-10"
        suppressHydrationWarning
      >
        <HiChevronRight className="text-2xl" />
      </button>

      {/* Dot Indikator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Pergi ke slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current
              ? 'bg-white scale-125'          // dot aktif: lebih besar
              : 'bg-white/50 hover:bg-white/80'
              }`}
            suppressHydrationWarning
          />
        ))}
      </div>
    </section>
  )
}
