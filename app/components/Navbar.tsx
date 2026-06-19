'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HiHeart, HiOutlineSearch } from 'react-icons/hi'
import { FaCartShopping } from 'react-icons/fa6'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'

const Navbar = () => {
    const { totalItems } = useCart()
    const { favorites } = useFavorites()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')

    const [isBrandHovered, setIsBrandHovered] = useState(false)

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)

        if (value.trim()) {
            router.replace(`/?search=${encodeURIComponent(value.trim())}`)
        } else {
            router.replace('/')
        }
    }

    return (
        <nav className={`bg-white border-b border-gray-200 sticky top-0 z-100 transition-shadow duration-200 ${isBrandHovered ? 'shadow-none' : 'shadow-md'}`}>
            <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between py-3 px-4 md:px-8 gap-3 md:gap-4 w-full">

                {/* Bagian kiri buat logo */}
                <Link href="/" className="shrink-0">
                    <Image
                        src="/Assets/Logo/voxhaul_logo.png"
                        alt="VoxHaul Logo"
                        width={120}
                        height={40}
                        style={{ width: 'auto', height: 'auto' }}
                        priority
                    />
                </Link>

                {/* Mobile Icons */}
                <div className="flex md:hidden items-center gap-2 ml-auto">
                    <Link href="/favorites" aria-label="Lihat produk favorit" className="relative flex items-center justify-center rounded py-1.5 px-2.5 text-black hover:bg-black/10 transition-colors">
                        <HiHeart className="text-2xl" />
                        {favorites.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex min-w-5 h-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                                {favorites.length}
                            </span>
                        )}
                    </Link>
                    <Link href="/cart" aria-label="Lihat keranjang" className="relative flex items-center justify-center rounded py-1.5 px-2.5 text-black hover:bg-black/10 transition-colors">
                        <FaCartShopping className="text-2xl" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex min-w-5 h-5 items-center justify-center rounded-full bg-black px-1 text-xs font-bold text-white">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>

                <div className="flex flex-row shrink-0 gap-4 md:gap-6 items-center order-3 md:order-0 w-full md:w-auto justify-center md:justify-start">
                    <Link href="/" className="text-sm font-semibold text-gray-800 hover:text-orange-500">Semua</Link>
                    <Link href="/?gender=men" className="text-sm font-semibold text-gray-800 hover:text-orange-500">Men</Link>
                    <Link href="/?gender=women" className="text-sm font-semibold text-gray-800 hover:text-orange-500">Women</Link>
                    <div
                        className="relative py-4 -my-4"
                        onMouseEnter={() => setIsBrandHovered(true)}
                        onMouseLeave={() => setIsBrandHovered(false)}
                    >
                        <span className="text-sm font-semibold text-gray-800 hover:text-orange-500 cursor-pointer relative z-10">Brand</span>
                        {/* Kotak hover dropdown warna putih */}
                        <div className={`absolute left-0 top-full mt-0 w-48 bg-white text-black rounded-b-md shadow-xl transition-all duration-200 z-20 ${isBrandHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                            <ul className="py-2">
                                <li>
                                    <Link href="/?origin=lokal" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-orange-500 transition-colors">Lokal</Link>
                                </li>
                                <li>
                                    <Link href="/?origin=internasional" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-orange-500 transition-colors">Internasional</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Buat search bar */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center w-full md:w-auto md:flex-1 max-w-xl order-4 md:order-0 border border-solid border-gray-500 rounded-xl py-1.5 px-3 gap-2"
                >
                    <HiOutlineSearch className="text-gray-400 text-lg shrink-0" />
                    <input
                        type="text"
                        placeholder="Cari fashion lo..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border-none outline-none w-full text-sm bg-transparent text-gray-700 placeholder:text-gray-400"
                        suppressHydrationWarning
                    />
                </form>

                {/* Bagian kanan buat favorite dan cart icon (Desktop) */}
                <div className="hidden md:flex items-center gap-2 shrink-0">
                    <Link
                        href="/favorites"
                        aria-label="Lihat produk favorit"
                        className="relative flex items-center justify-center rounded py-1.5 px-2.5 text-black hover:bg-black/10 transition-colors"
                    >
                        <HiHeart className="text-2xl" />
                        {favorites.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex min-w-5 h-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                                {favorites.length}
                            </span>
                        )}
                    </Link>

                    <Link href="/cart" aria-label="Lihat keranjang" className="relative flex items-center justify-center rounded py-1.5 px-2.5 text-black cursor-pointer hover:bg-black/10 transition-colors">
                        <FaCartShopping className="text-2xl" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex min-w-5 h-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Overlay gelap di level Navbar agar ukurannya full layar */}
            <div className={`absolute top-full left-0 w-full h-screen bg-black/60 transition-all duration-300 z-[-1] pointer-events-none ${isBrandHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}`}></div>
        </nav>
    )
}

export default Navbar
