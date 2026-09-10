import { Head, Link } from '@inertiajs/react';
import Footer from '@/components/footer';
import donateImage from '../../../storage/app/public/Donatelogo.png';
import {
    Search,
    ChevronDown,
    Mail,
    Phone,
    Clock,
    MapPin,
    MessageCircle
} from 'lucide-react';
import { useState } from 'react';

export default function CaraKerja() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
        "Apakah semua barang bisa didonasikan?",
        "Apakah ada biaya untuk berdonasi?",
        "Bagaimana jika tidak ada yang mengajukan permintaan barang saya?",
        "Bagaimana cara menghubungi penerima atau donatur?"
    ];

    const steps = [
        { title: "Daftar/ Masuk", desc: "Buat akun atau masuk ke Donate Yours untuk berbagi atau mencari barang." },
        { title: "Donasi Barang", desc: "Unggah barang yang masih layak pakai lengkap dengan foto dan deskripsi lengkap." },
        { title: "Barang Dipublikasikan", desc: "Barang Anda akan ditampilkan di website agar bisa dilihat oleh penerima yang membutuhkan." },
        { title: "Penerima Mengajukan", desc: "Penerima yang membutuhkan mengajukan permintaan untuk barang yang tersedia." },
        { title: "Donatur Menyetujui", desc: "Anda akan menerima permintaan dan dapat menyetujui atau menolak permintaan tersebut." },
        { title: "Barang Diterima", desc: "Barang diambil oleh penerima dan kebaikan Anda pun sampai ke tangan yang tepat." }
    ];

    return (
        <>
            <Head title="Cara Kerja - Donate Yours" />
            <div className="min-h-screen bg-[#FAF8F5] font-sans text-gray-900">
                {/* Navigation */}
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
                        <Link href="/cara-kerja" className="font-semibold text-[#3F7859] border-b-2 border-[#3F7859] pb-1 whitespace-nowrap">Cara Kerja</Link>
                        <Link href="/tentang-kami" className="font-medium text-gray-700 hover:text-[#3F7859] transition-colors whitespace-nowrap">Tentang Kami</Link>
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
                    <div className="bg-[#F0F7F2] rounded-3xl p-8 lg:p-16 mb-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
                        <div className="w-full md:w-1/2 z-10">
                            <div className="inline-block border border-[#3F7859] text-[#3F7859] rounded-full px-4 py-1 text-sm font-medium mb-6 bg-white/50">
                                Cara Kerja
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-gray-900 mb-6">
                                Bagikan kebaikan,<br />
                                Bersama <span className="text-[#3F7859]">ubah<br />kehidupan</span>
                            </h1>
                            <p className="text-gray-600 max-w-md text-lg leading-relaxed">
                                Barang yang sudah tidak terpakai di rumah anda, dapat menjadi syukur bagi mereka yang membutuhkan. Ikuti langkah mudah berikut untuk berbagi kebaikan.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end relative z-10">
                            <img 
                                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800" 
                                alt="Donation items" 
                                className="w-full max-w-md rounded-2xl shadow-xl object-cover h-[300px] lg:h-[400px]"
                            />
                        </div>
                        {/* Decorative background circle */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
                    </div>

                    {/* How It Works Steps */}
                    <div className="text-center mb-24">
                        <h2 className="text-3xl font-bold mb-16">Bagaimana Cara Kerjanya?</h2>
                        
                        <div className="flex flex-col md:flex-row justify-between items-start relative max-w-5xl mx-auto">
                            {/* Dotted connecting line */}
                            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] border-t-2 border-dashed border-gray-300 z-0"></div>
                            
                            {steps.map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center w-full md:w-1/6 px-2 mb-10 md:mb-0 relative z-10">
                                    <div className="w-24 h-24 rounded-full bg-[#F0F7F2] flex items-center justify-center mb-6 shadow-sm">
                                        <div className="w-12 h-12 rounded-full bg-[#3F7859] flex items-center justify-center text-white font-bold text-lg">
                                            {idx + 1}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-sm mb-2">{step.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Banner */}
                    <div className="mb-24">
                        <div className="bg-[#3F7859] rounded-2xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between text-white shadow-xl relative overflow-hidden">
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent opacity-50"></div>
                            
                            <div className="flex items-center gap-6 relative z-10 mb-6 md:mb-0">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex-shrink-0"></div>
                                <div>
                                    <h2 className="text-2xl lg:text-3xl font-bold mb-2">Yuk, Mulai Berbagi Sekarang!</h2>
                                    <p className="text-blue-100 text-sm">Setiap barang yang anda donasikan adalah suatu kebahagiaan untuk orang membutuhkan.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 relative z-10 shrink-0">
                                <Link href="#" className="bg-white text-[#3F7859] px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap">
                                    Donasikan Barang
                                </Link>
                                <Link href="#" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-white/10 transition-colors whitespace-nowrap">
                                    Cari Barang
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* FAQ & Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {/* FAQ */}
                        <div className="border border-gray-200 rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-6">Pertanyaan yang Sering Diajukan</h3>
                            <div className="space-y-3 mb-6">
                                {faqs.map((faq, idx) => (
                                    <div key={idx} className="bg-[#F0F7F2] rounded-xl overflow-hidden transition-all">
                                        <button 
                                            className="w-full px-5 py-4 flex justify-between items-center text-left text-sm font-medium text-gray-800"
                                            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        >
                                            {faq}
                                            <ChevronDown className={`w-5 h-5 text-[#3F7859] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openFaq === idx && (
                                            <div className="px-5 pb-4 text-sm text-gray-600 border-t border-blue-100 pt-3">
                                                Tentu, Anda dapat mendonasikan barang apa saja asalkan masih layak pakai dan bersih.
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Link href="#" className="text-[#3F7859] font-semibold text-sm flex items-center gap-1 hover:underline whitespace-nowrap">
                                Lihat Semua FAQ <span className="text-lg leading-none">&rarr;</span>
                            </Link>
                        </div>

                        {/* Contact */}
                        <div className="border border-gray-200 rounded-2xl p-8 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Masih Punya Pertanyaan?</h3>
                                <p className="text-sm text-gray-500 mb-8">Tim kami siap membantu Anda kapan saja.</p>
                                
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#F0F7F2] flex items-center justify-center text-[#3F7859] flex-shrink-0">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-gray-900">E-mail</div>
                                            <div className="text-[#3F7859] text-sm font-medium">DonateYoursweb@gmail.com</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#F0F7F2] flex items-center justify-center text-[#3F7859] flex-shrink-0">
                                            <MessageCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-gray-900">WhatsApp</div>
                                            <div className="text-gray-600 text-sm">0896-2811-3770</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#F0F7F2] flex items-center justify-center text-[#3F7859] flex-shrink-0">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-gray-900">Jam Operasional</div>
                                            <div className="text-gray-600 text-sm">Senin-Minggu, 08.00 - 22.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-10 flex justify-end">
                                <button className="bg-[#3F7859] text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-[#2F5B43] transition-colors w-full md:w-auto shadow-sm whitespace-nowrap">
                                    Hubungi Kami
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
