import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaTiktok } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="text-white py-10 px-6 md:px-10 bg-black border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-start justify-between mx-auto gap-10 max-w-7xl w-full">

                {/* Bagian Kiri: Logo & Copyright */}
                <div className="flex flex-col items-start gap-4 shrink-0">
                    <Link href="/">
                        <Image
                            src="/Assets/Logo/voxhaul_logo.png"
                            alt="VoxHaul Logo"
                            width={120}
                            height={40}
                            style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                            className="brightness-0 invert"
                        />
                    </Link>
                    <p className="text-gray-400 text-sm">© 2026 VoxHaul. All rights reserved.</p>
                </div>

                {/* Bagian Bantuan / Customer Care */}
                <div className="flex flex-col gap-3">
                    <p className="font-semibold text-base">Bantuan</p>
                    <nav className="flex flex-col gap-2" aria-label="Bantuan">
                        <Link
                            href="/help"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Customer Care
                        </Link>
                        <Link
                            href="/help#faq"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            FAQ
                        </Link>
                        <Link
                            href="/help#return"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Pengembalian Barang
                        </Link>
                        <Link
                            href="/help#shipping"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Info Pengiriman
                        </Link>
                    </nav>
                </div>

                {/* Bagian Tentang Kami */}
                <div className="flex flex-col gap-3">
                    <p className="font-semibold text-base">Tentang Kami</p>
                    <nav className="flex flex-col gap-2" aria-label="Tentang Kami">
                        <Link
                            href="/about"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Tentang VoxHaul
                        </Link>
                        <Link
                            href="/about?topic=vision"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Visi & Misi
                        </Link>
                        <Link
                            href="/about?topic=careers"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Karir
                        </Link>
                        <Link
                            href="/about?topic=contact"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Hubungi Kami
                        </Link>
                    </nav>
                </div>

                {/* Bagian Kanan: Social Media */}
                <div className="flex flex-col gap-4 shrink-0">
                    <p className="font-semibold text-base">Ikuti Kami</p>
                    <div className="flex items-center gap-5">
                        <Link href="#" aria-label="Instagram">
                            <FaInstagram className="text-2xl cursor-pointer hover:text-gray-400 transition-colors" />
                        </Link>
                        <Link href="#" aria-label="X Twitter">
                            <FaXTwitter className="text-2xl cursor-pointer hover:text-gray-400 transition-colors" />
                        </Link>
                        <Link href="#" aria-label="TikTok">
                            <FaTiktok className="text-2xl cursor-pointer hover:text-gray-400 transition-colors" />
                        </Link>
                        <Link href="#" aria-label="YouTube">
                            <FaYoutube className="text-2xl cursor-pointer hover:text-gray-400 transition-colors" />
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer