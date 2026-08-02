import { Head, Link } from '@inertiajs/react';
import {
    Search,
    Package,
    Users,
    Heart,
    Globe,
    Shirt,
    Book,
    Laptop,
    Backpack,
    Home,
    MoreHorizontal,
    Clover
} from 'lucide-react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome to Donate Yours" />
            <div className="min-h-screen bg-white font-sans text-gray-900">
                {/* Navigation */}
                <header className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
                    <div className="flex items-center gap-2 text-[#5B75FF]">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
                            <circle cx="12" cy="18" r="8" fill="currentColor" />
                            <rect x="16" y="6" width="6" height="20" rx="3" fill="currentColor" />
                        </svg>
                        <span className="text-xl font-bold tracking-tight">Donate Yours</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="font-semibold text-[#5B75FF] border-b-2 border-[#5B75FF] pb-1">Beranda</Link>
                        <Link href="#" className="font-medium text-gray-700 hover:text-[#5B75FF] transition-colors">Donasi Barang</Link>
                        <Link href="#" className="font-medium text-gray-700 hover:text-[#5B75FF] transition-colors">Cari Barang</Link>
                        <Link href="/cara-kerja" className="font-medium text-gray-700 hover:text-[#5B75FF] transition-colors">Cara Kerja</Link>
                        <Link href="#" className="font-medium text-gray-700 hover:text-[#5B75FF] transition-colors">Tentang Kami</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-[#5B75FF] hover:bg-gray-50 transition-colors">
                            <Search className="h-5 w-5" />
                        </button>
                        <Link href="/login" className="rounded-lg border border-gray-200 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            Masuk
                        </Link>
                        <Link href="/register" className="rounded-lg bg-[#5B75FF] px-6 py-2 font-medium text-white hover:bg-[#4a61db] transition-colors shadow-sm">
                            Daftar
                        </Link>
                    </div>
                </header>

                <main className="container mx-auto px-6 pt-12 pb-24 lg:px-12">
                    {/* Hero Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 relative">
                        <div className="w-full md:w-1/2 pr-0 md:pr-12 z-10 py-12">
                            <h1 className="text-5xl md:text-[3.5rem] font-extrabold leading-[1.1] text-gray-900 mb-6">
                                Barangmu<br/>
                                Masih Layak.<br/>
                                Hidup Orang Lain<br/>
                                Bisa Lebih Baik.
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 max-w-[400px] leading-relaxed">
                                Bagikan barangmu yang<br/>
                                layak dipakai untuk mereka<br/>
                                yang membutuhkan
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="#" className="rounded-lg bg-[#5B75FF] px-8 py-3.5 font-semibold text-white hover:bg-[#4a61db] transition-colors shadow-md shadow-blue-500/20">
                                    Donasikan Barang
                                </Link>
                                <Link href="#" className="rounded-lg border-2 border-[#5B75FF] px-8 py-3.5 font-semibold text-[#5B75FF] hover:bg-blue-50 transition-colors">
                                    Cari Barang
                                </Link>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 h-[550px] mt-12 md:mt-0 relative md:absolute md:right-0 md:top-0">
                            {/* Gradient mask for smooth blending on the left, matching the design */}
                            <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 hidden md:block"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                                alt="Volunteers at donation center" 
                                className="w-full h-full object-cover rounded-2xl md:rounded-l-none md:rounded-r-3xl md:w-[120%] lg:w-[150%] max-w-none md:-mr-[20%] lg:-mr-[50%] object-right"
                            />
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-[#5B75FF] rounded-2xl text-white mb-16 shadow-xl relative z-20">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-8">
                                <Clover className="h-10 w-10 flex-shrink-0" strokeWidth={1.5} />
                                <div className="text-center sm:text-left">
                                    <div className="text-2xl lg:text-3xl font-bold">1.250+</div>
                                    <div className="text-blue-100 text-xs lg:text-sm font-medium">Barang Didonasikan</div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-8">
                                <Clover className="h-10 w-10 flex-shrink-0" strokeWidth={1.5} />
                                <div className="text-center sm:text-left">
                                    <div className="text-2xl lg:text-3xl font-bold">850+</div>
                                    <div className="text-blue-100 text-xs lg:text-sm font-medium">Penerima Terbantu</div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-8">
                                <Clover className="h-10 w-10 flex-shrink-0" strokeWidth={1.5} />
                                <div className="text-center sm:text-left">
                                    <div className="text-2xl lg:text-3xl font-bold">320+</div>
                                    <div className="text-blue-100 text-xs lg:text-sm font-medium">Donatur Aktif</div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-8">
                                <Clover className="h-10 w-10 flex-shrink-0" strokeWidth={1.5} />
                                <div className="text-center sm:text-left">
                                    <div className="text-2xl lg:text-3xl font-bold">45+</div>
                                    <div className="text-blue-100 text-xs lg:text-sm font-medium">Komunitas Terhubung</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories Section */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Kategori Barang</h2>
                            <Link href="#" className="font-semibold text-[#5B75FF] hover:text-[#4a61db] transition-colors">
                                Lihat Semua
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                            {[
                                { name: 'Pakaian', count: 254, icon: Clover },
                                { name: 'Buku', count: 254, icon: Clover },
                                { name: 'Elektronik', count: 254, icon: Clover },
                                { name: 'Peralatan Sekolah', count: 254, icon: Clover },
                                { name: 'Furnitur', count: 254, icon: Clover },
                                { name: 'Pakaian', count: 254, icon: Clover },
                                { name: 'Pakaian', count: 254, icon: Clover },
                                { name: 'Lain-lain', count: 254, icon: MoreHorizontal },
                            ].map((category, index) => (
                                <div key={index} className="flex flex-col items-center justify-center py-6 px-4 border border-gray-200 rounded-2xl hover:border-[#5B75FF] hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer group bg-white">
                                    <category.icon className="h-10 w-10 text-[#5B75FF] mb-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                                    <span className="font-bold text-gray-900 text-sm mb-1 text-center">{category.name}</span>
                                    <span className="text-xs text-gray-500">{category.count} barang</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
