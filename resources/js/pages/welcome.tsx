import { Head, Link } from '@inertiajs/react';
import donateImage from '../../../storage/app/public/Donatelogo.png';
import Footer from '@/components/footer';
import {
    Search,
    Package,
    Users,
    Shirt,
    Book,
    Laptop,
    Backpack,
    Home,
    MoreHorizontal,
    MapPin,
    Phone,
    Mail
} from 'lucide-react';


export default function Welcome() {
    return (
        <>
            <Head title="Welcome to Donate Yours" />
            <div className="min-h-screen bg-[#FAF8F5] font-sans text-gray-900 flex flex-col justify-between">
                <div>
                    {/* Header / Navigation */}
                    <header className="public-navbar w-full flex items-center justify-between px-6 py-4 lg:px-12 bg-[#535226] border-b border-[#41401E] shadow-lg">
                        <div className="flex items-center gap-12">
                            {/* Logo Custom */}
                            <div className="flex items-center gap-2">
                                <img
                                    src={donateImage}
                                    alt="Logo"
                                    className="w-auto h-10 object-contain"
                                />
                                <span className="text-xl font-bold tracking-tight text-[#74732F]">Donate Yours</span>
                            </div>

                            <nav className="hidden lg:flex items-center gap-8 text-sm mt-1">
                                <Link href="/" className="font-bold text-[#74732F] border-b-2 border-[#74732F] pb-1">Beranda</Link>
                                <Link href="#" className="font-semibold text-gray-600 hover:text-[#74732F] transition-colors pb-1">Donasi Barang</Link>
                                <Link href="/cari-barang" className="font-semibold text-gray-600 hover:text-[#74732F] transition-colors pb-1">Cari Barang</Link>
                                <Link href="/cara-kerja" className="font-semibold text-gray-600 hover:text-[#74732F] transition-colors pb-1">Cara Kerja</Link>
                                <Link href="/tentang-kami" className="font-semibold text-gray-600 hover:text-[#74732F] transition-colors pb-1">Tentang Kami</Link>
                            </nav> 
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:text-[#74732F] hover:border-[#74732F] transition-colors">
                                <Search className="h-5 w-5" />
                            </button>
                            <Link href="/login" className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-800 hover:border-[#74732F] hover:text-[#74732F] transition-colors">
                                Masuk
                            </Link>
                            <Link href="/register" className="rounded-lg bg-[#FFBAC6] px-6 py-2 text-sm font-semibold text-white hover:bg-[#E89AA9] transition-colors">
                                Daftar
                            </Link>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="container mx-auto px-6 lg:px-12 pt-10 pb-16">
                        
                        {/* Hero Section */}
                        <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-[420px] mb-8">
                            <div className="w-full lg:w-1/2 z-10 py-8 lg:pr-10 bg-white">
                                <h1 className="text-4xl lg:text-5xl font-extrabold leading-[1.2] text-black mb-6 tracking-tight">
                                    Barangmu<br />
                                    Masih Layak.<br />
                                    Hidup Orang Lain<br />
                                    Bisa Lebih Baik.
                                </h1>
                                <p className="text-base text-gray-700 mb-8 max-w-[340px] leading-relaxed font-medium">
                                    Bagikan barangmu yang<br />
                                    layak dipakai untuk mereka<br />
                                    yang membutuhkan
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="#" className="rounded-xl bg-[#FFBAC6] px-8 py-3 text-sm font-bold text-white hover:bg-[#E89AA9] transition-colors">
                                        Donasikan Barang
                                    </Link>
                                    <Link href="#" className="rounded-xl border-2 border-[#74732F] px-8 py-3 text-sm font-bold text-[#74732F] hover:bg-primary-50 transition-colors bg-white">
                                        Cari Barang
                                    </Link>
                                </div>
                            </div>

                            {/* Hero Banner Image with Gradient Mask */}
                            <div className="w-full lg:w-3/5 h-[300px] lg:h-[450px] absolute right-0 top-0 lg:-mr-12 -z-0">
                                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                    alt="Volunteers at donation center"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </div>

                        {/* Stats Banner */}
                        <div className="bg-[#74732F] rounded-[2rem] text-white mb-16 shadow-lg relative z-10">
                            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/30">
                                <div className="flex items-center justify-center gap-5 p-6">
                                    <Shirt className="h-12 w-12 text-white stroke-[1.5]" />
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-extrabold tracking-tight">1.250+</span>
                                        <span className="text-white/90 text-xs font-medium mt-1">Barang Didonasikan</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-5 p-6">
                                    <Package className="h-12 w-12 text-white stroke-[1.5]" />
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-extrabold tracking-tight">850+</span>
                                        <span className="text-white/90 text-xs font-medium mt-1">Penerima Terbantu</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-5 p-6">
                                    <MapPin className="h-12 w-12 text-white stroke-[1.5]" />
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-extrabold tracking-tight">320+</span>
                                        <span className="text-white/90 text-xs font-medium mt-1">Donatur Aktif</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-5 p-6">
                                    <Users className="h-12 w-12 text-white stroke-[1.5]" />
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-extrabold tracking-tight">45+</span>
                                        <span className="text-white/90 text-xs font-medium mt-1">Komunitas Terhubung</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categories Section */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Kategori Barang</h2>
                                <Link href="#" className="text-sm font-bold text-[#74732F] hover:underline">
                                    Lihat Semua
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                                {[
                                    { name: 'Pakaian', count: '254 barang', icon: Shirt },
                                    { name: 'Buku', count: '254 barang', icon: Book },
                                    { name: 'Elektronik', count: '254 barang', icon: Laptop },
                                    { name: 'Peralatan Sekolah', count: '254 barang', icon: Backpack },
                                    { name: 'Furnitur', count: '254 barang', icon: Home },
                                    { name: 'Lain-lain', count: '254 barang', icon: MoreHorizontal },
                                ].map((cat, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center py-8 px-4 border-2 border-gray-200 rounded-3xl bg-white hover:border-[#74732F] hover:shadow-sm transition-all cursor-pointer group">
                                        <cat.icon className="h-12 w-12 text-[#74732F] mb-4 stroke-[1.5] group-hover:scale-110 transition-transform" />
                                        <span className="font-bold text-gray-900 text-sm mb-1 text-center">{cat.name}</span>
                                        <span className="text-xs text-gray-500">{cat.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>

                <Footer />
            </div>
        </>
    );
}
