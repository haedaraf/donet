import { Head, Link } from '@inertiajs/react';
import Footer from '@/components/footer';
import donateImage from '../../../storage/app/public/Donatelogo.png';
// TODO: ganti path ini dengan foto asli anggota tim (contoh: naruh file di storage/app/public/)
import teamPhoto from '../../../storage/app/public/team.jpg';
import {
    Search,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Instagram
} from 'lucide-react';

export default function TentangKami() {
    const nilaiKami = [
        "Kepedulian",
        "Kolaborasi",
        "Kepercayaan",
        "Keberlanjutan",
        "Transparansi"
    ];

    return (
        <>
            <Head title="Tentang Kami - Donate Yours" />
            <div className="min-h-screen bg-[#FAF8F5] font-sans text-gray-900">
                {/* Navigation - sama dengan halaman Cara Kerja */}
                <header className="public-navbar container mx-auto flex items-center justify-between px-6 py-4 lg:px-12 bg-[#535226] shadow-lg">
                    <Link href="/" className="flex items-center gap-2 text-[#3F7859] shrink-0">
                        <img
                            src={donateImage}
                            alt="Donate Yours Logo"
                            className="w-8 h-8 object-contain"
                        />
                        <span className="text-xl font-bold tracking-tight whitespace-nowrap">Donate Yours</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-4 lg:gap-8">
                        <Link href="/" className="font-medium text-gray-700 hover:text-[#3F7859] transition-colors whitespace-nowrap">Beranda</Link>
                        <Link href="/donasi-barang" className="font-medium text-gray-700 hover:text-[#3F7859] transition-colors whitespace-nowrap">Donasi Barang</Link>
                        <Link href="/cari-barang" className="font-medium text-gray-700 hover:text-[#3F7859] transition-colors whitespace-nowrap">Cari Barang</Link>
                        <Link href="/cara-kerja" className="font-medium text-gray-700 hover:text-[#3F7859] transition-colors whitespace-nowrap">Cara Kerja</Link>
                        <Link href="/tentang-kami" className="font-semibold text-[#3F7859] border-b-2 border-[#3F7859] pb-1 whitespace-nowrap">Tentang Kami</Link>
                    </nav>

                    <div className="flex items-center gap-2 lg:gap-4 shrink-0">
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-[#3F7859] hover:bg-gray-50 transition-colors shrink-0">
                            <Search className="h-5 w-5" />
                        </button>
                        <Link href="/login" className="rounded-lg border border-gray-200 px-4 lg:px-6 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
                            Masuk
                        </Link>
                        <Link href="/register" className="rounded-lg bg-[#3F7859] px-4 lg:px-6 py-2 font-medium text-white hover:bg-[#2F5B43] transition-colors shadow-sm whitespace-nowrap">
                            Daftar
                        </Link>
                    </div>
                </header>

                <main className="container mx-auto px-6 pt-12 pb-24 lg:px-12">
                    {/* Hero Section */}
                    <div className="bg-[#F0F7F2] rounded-3xl p-8 lg:p-16 mb-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
                        <div className="w-full md:w-1/2 z-10">
                            <div className="inline-block border border-[#3F7859] text-[#3F7859] rounded-full px-4 py-1 text-sm font-medium mb-6 bg-white/50">
                                Tentang Kami
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] text-gray-900 mb-6">
                                Tentang DonateYours
                            </h1>
                            <p className="text-gray-600 max-w-md text-lg leading-relaxed mb-8">
                                DonateYours adalah platform donasi barang yang menghubungkan donatuer dengan mereka yang membutuhkan, kami percaya bahwa setiap barang yang masih layak dipakai dapat membawa manfaat besar dan menciptakan perubahan positif bagi banyak orang.
                            </p>
                            <Link
                                href="/register"
                                className="inline-block bg-[#3F7859] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#2F5B43] transition-colors shadow-sm whitespace-nowrap"
                            >
                                Bergabung & Berbagi Kebaikan
                            </Link>
                        </div>
                        <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&q=80&w=800"
                                alt="Serah terima barang donasi"
                                className="w-full max-w-md rounded-2xl shadow-xl object-cover h-[300px] lg:h-[380px]"
                            />
                        </div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
                    </div>

                    {/* Visi, Misi, & Nilai Kami */}
                    <div className="mb-24">
                        <h2 className="text-3xl font-bold mb-2">Visi, Misi, & Nilai Kami</h2>
                        <div className="w-16 h-1 bg-[#3F7859] rounded-full mb-12"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border border-gray-200 rounded-2xl p-8">
                                <h3 className="text-xl font-bold mb-6">Visi</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Memudahkan masyarakat untuk berdonasi barang layak pakai dan menyalurkannya kepada mereka yang membutuhkan.
                                </p>
                            </div>

                            <div className="border border-gray-200 rounded-2xl p-8">
                                <h3 className="text-xl font-bold mb-6">Misi</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Menjadi platform donasi barang terpercaya dan terdepan yang membawa dampak positif bagi kehidupan sosial dan lingkungan.
                                </p>
                            </div>

                            <div className="border border-gray-200 rounded-2xl p-8">
                                <h3 className="text-xl font-bold mb-6">Nilai kami</h3>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                    {nilaiKami.map((nilai, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[#3F7859] shrink-0"></span>
                                            <span className="text-sm text-gray-700">{nilai}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Orang dibalik DonateYours */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-2">Orang dibalik DonateYours</h2>
                        <div className="w-16 h-1 bg-[#3F7859] rounded-full mb-12"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Adalah seorang individu yang memiliki kepedulian tinggi terhadap sesama dan lingkungan. Bersama, kami berkomitmen untuk menghadirkan platform yang aman, mudah, dan bermanfaat bagi semua orang.
                            </p>

                            <div className="flex justify-center">
                                <img
                                    src="/storage/team.png"
                                    alt="Najwa Ridha Ilah"
                                    className="w-56 h-56 rounded-full object-cover shadow-sm"
                                />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-4 leading-tight">
                                    Najwa<br />Ridha Ilah
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    Menjadi platform donasi barang terpercaya dan terdepan yang membawa dampak positif bagi kehidupan sosial dan lingkungan.
                                </p>
                                <div className="flex gap-3">
                                    <a
                                        href="#"
                                        aria-label="LinkedIn"
                                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3F7859] text-white hover:bg-[#2F5B43] transition-colors"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="#"
                                        aria-label="Instagram"
                                        className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#3F7859] text-[#3F7859] hover:bg-[#F0F7F2] transition-colors"
                                    >
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}

TentangKami.layout = (page: React.ReactNode) => page;