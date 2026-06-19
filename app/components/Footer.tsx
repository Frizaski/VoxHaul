import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaTiktok } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="text-white py-10 px-10 bg-black border-t justify-center border-gray-800">
            {/* Container utama dengan flexbox */}
            <div className="flex flex-col md:flex-row items-center justify-between mx-auto gap-8">

                {/* Bagian Kiri: Logo & Copyright */}
                <div className="flex flex-col items-center md:items-start gap-4 shrink-0">
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

                {/* Bagian Kanan: Social Media Icons */}
                <div className="flex flex-col items-center md:items-start gap-4 shrink-0">
                    <p className='font-semibold text-lg'>Follow us on:</p>
                    <div className="flex items-center gap-6">
                        <Link href="#" aria-label="Instagram">
                            <FaInstagram className="text-3xl cursor-pointer hover:text-gray-400 transition-colors" />
                        </Link>
                        <Link href="#" aria-label="X Twitter">
                            <FaXTwitter className="text-3xl cursor-pointer hover:text-gray-400 transition-colors" />
                        </Link>
                        <Link href="#" aria-label="TikTok">
                            <FaTiktok className="text-3xl cursor-pointer hover:text-gray-400 transition-colors" />
                        </Link>
                        <Link href="#" aria-label="YouTube">
                            <FaYoutube className="text-3xl cursor-pointer hover:text-gray-400 transition-colors" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer