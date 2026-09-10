import { Link } from '@inertiajs/react';
import { MapPin, Phone, Mail } from 'lucide-react';
import donateImage from '../../../storage/app/public/Donatelogo.png';

export default function Footer() {
    return (
        <footer className="bg-[#1A3025] text-white pt-16 pb-8 relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 relative z-10">
                    
                    {/* Brand Info */}
                    <div className="md:col-span-4 pr-6 flex flex-col border-none md:border-r md:border-white/">
                        <div className="flex items-center gap-2 mb-6">
                            <img
                            src={donateImage}
                            alt="Logo"
                            className="w-auto h-10 object-contain"
                            />
                            <span className="text-xl font-bold">Donate Yours</span>
                        </div>
                        <p className="text-white/90 leading-relaxed text-sm max-w-[220px]">
                            Barangmu masih layak,<br />hidup orang lain bisa<br />lebih baik.
                        </p>
                    </div>

                    {/* Navigasi */}
                    <div className="md:col-span-2">
                        <h4 className="font-bold mb-5 text-sm">Navigasi</h4>
                        <ul className="space-y-3 text-white/90 text-sm font-medium">
                            <li><Link href="/" className="hover:text-white">Beranda</Link></li>
                            <li><Link href="#" className="hover:text-white">Donasi Barang</Link></li>
                            <li><Link href="#" className="hover:text-white">Cari Barang</Link></li>
                            <li><Link href="/cara-kerja" className="hover:text-white">Cara Kerja</Link></li>
                            <li><Link href="/tentang-kami" className="hover:text-white">Tentang Kami</Link></li>
                        </ul>
                    </div>

                    {/* Bantuan */}
                    <div className="md:col-span-3">
                        <h4 className="font-bold mb-5 text-sm">Bantuan</h4>
                        <ul className="space-y-3 text-white/90 text-sm font-medium">
                            <li><Link href="#" className="hover:text-white">Pusat Bantuan</Link></li>
                            <li><Link href="#" className="hover:text-white">Syarat & Ketentuan</Link></li>
                            <li><Link href="#" className="hover:text-white">Kebijakan Privasi</Link></li>
                            <li><Link href="#" className="hover:text-white">Pertanyaan Umum</Link></li>
                        </ul>
                    </div>

                    {/* Hubungi Kami */}
                    <div className="md:col-span-3">
                        <h4 className="font-bold mb-5 text-sm">Hubungi Kami</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 text-white/90 text-sm">
                                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">Jl. Pandanaran 2 No.12, Mugassari, Semarang Sel.,<br />Jawa Tengah 50249</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/90 text-sm">
                                <Phone className="h-4 w-4 shrink-0" />
                                <span>0896-2811-3770</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/90 text-sm">
                                <Mail className="h-4 w-4 shrink-0" />
                                <span>DonateYoursweb@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-xs font-medium text-white/90 relative z-10">
                    © 2026 DonateYours. All rights reserved
                </div>
            </div>
        </footer>
    );
}
