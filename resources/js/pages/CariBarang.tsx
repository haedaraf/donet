import { Head, Link, router } from '@inertiajs/react';
import donateImage from '../../../storage/app/public/Donatelogo.png';
import { Search, MapPin, Calendar, CheckCircle2, Phone, Mail } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function CariBarang({ donations, categories = [], filters = {} }: { donations: any, categories: any[], filters: any }) {
    const safeFilters = Array.isArray(filters) ? {} : (filters || {});
    const [search, setSearch] = useState(typeof safeFilters.search === 'string' ? safeFilters.search : '');
    const [category, setCategory] = useState(typeof safeFilters.category === 'string' ? safeFilters.category : '');
    const [condition, setCondition] = useState(typeof safeFilters.condition === 'string' ? safeFilters.condition : '');
    const [sort, setSort] = useState(typeof safeFilters.sort === 'string' ? safeFilters.sort : 'latest');

    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            const params: any = {};
            if (search) params.search = search;
            if (category) params.category = category;
            if (condition) params.condition = condition;
            if (sort && sort !== 'latest') params.sort = sort;

            router.get('/cari-barang', params, { preserveState: true, replace: true });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search]);

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const params: any = {};
        if (search) params.search = search;
        if (category) params.category = category;
        if (condition) params.condition = condition;
        if (sort && sort !== 'latest') params.sort = sort;

        router.get('/cari-barang', params, { preserveState: true });
    };

    const handleCategoryClick = (id: string) => {
        setCategory(id);
        const params: any = {};
        if (search) params.search = search;
        if (id) params.category = id;
        if (condition) params.condition = condition;
        if (sort && sort !== 'latest') params.sort = sort;

        router.get('/cari-barang', params, { preserveState: true });
    };

    const handleConditionChange = (val: string) => {
        setCondition(val);
        const params: any = {};
        if (search) params.search = search;
        if (category) params.category = category;
        if (val) params.condition = val;
        if (sort && sort !== 'latest') params.sort = sort;

        router.get('/cari-barang', params, { preserveState: true });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        setSort(newSort);
        const params: any = {};
        if (search) params.search = search;
        if (category) params.category = category;
        if (condition) params.condition = condition;
        if (newSort && newSort !== 'latest') params.sort = newSort;

        router.get('/cari-barang', params, { preserveState: true });
    };

    // Helper to format date
    const formatDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const getPrimaryImage = (images: any[]) => {
        if (!images || images.length === 0) return null;
        const primary = images.find(img => img.is_primary);
        const img = primary ? primary.image : images[0].image;
        return img.startsWith('http') ? img : `/storage/${img}`;
    };

    return (
        <>
            <Head title="Cari Barang - Donate Yours" />
            <div className="min-h-screen bg-[#FAF8F5] font-sans text-gray-900">
                {/* Navigation - sama dengan halaman lain (Beranda, Cara Kerja, Tentang Kami) */}
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
                        <Link href="#" className="font-medium text-gray-700 hover:text-[#3F7859] transition-colors whitespace-nowrap">Donasi Barang</Link>
                        <Link href="/cari-barang" className="font-semibold text-[#3F7859] border-b-2 border-[#3F7859] pb-1 whitespace-nowrap">Cari Barang</Link>
                        <Link href="/cara-kerja" className="font-medium text-gray-700 hover:text-[#3F7859] transition-colors whitespace-nowrap">Cara Kerja</Link>
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

                <main className="container mx-auto px-6 pt-8 pb-24 lg:px-12">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Cari Barang</h1>
                        <p className="text-gray-500">Temukan barang yang masih layak pakai dari para donatur.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                            {/* Search and Sort */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <form onSubmit={handleSearch} className="flex-1 flex gap-4">
                                    <div className="relative flex-1">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Search className="h-4.5 w-4.5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Cari barang..."
                                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-[12px] text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#3F7859] focus:border-[#3F7859] transition-colors shadow-sm"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-[#3F7859] hover:bg-[#2F5B43] text-white px-8 py-3 rounded-[12px] font-bold text-[13px] transition-colors shadow-sm"
                                    >
                                        Cari
                                    </button>
                                </form>

                                <div className="w-full sm:w-48">
                                    <select
                                        value={sort}
                                        onChange={handleSortChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-[12px] text-[13px] text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#3F7859] focus:border-[#3F7859] transition-colors shadow-sm"
                                    >
                                        <option value="latest">Urutkan: Terbaru</option>
                                        <option value="oldest">Urutkan: Terlama</option>
                                    </select>
                                </div>
                            </div>

                            {/* Grid */}
                            {(!donations?.data || donations.data.length === 0) ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <Search className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-[18px] font-bold text-gray-900 mb-1">Barang Tidak Ditemukan</h3>
                                    <p className="text-[14px] text-gray-500">Coba ubah kata kunci atau filter pencarian Anda.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {donations?.data?.map((item: any) => (
                                        <Link href={`/explore/${item.id}`} key={item.id} className="bg-white border border-gray-200 rounded-[24px] overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
                                            <div className="h-48 bg-gray-100 relative overflow-hidden">
                                                {getPrimaryImage(item.images) ? (
                                                    <img src={getPrimaryImage(item.images)!} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        No Image
                                                    </div>
                                                )}
                                                {item.category && (
                                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-[#3F7859] shadow-sm">
                                                        {item.category.name}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-5 flex-1 flex flex-col">
                                                <h3 className="text-[16px] font-bold text-gray-900 mb-4 line-clamp-1">{item.title}</h3>

                                                <div className="mt-auto flex flex-col gap-2.5">
                                                    <div className="flex items-center gap-2 text-[12px] text-gray-600">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        <span className="capitalize">{item.condition ? item.condition.replace('_', ' ') : 'Tidak diketahui'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[12px] text-gray-600">
                                                        <MapPin className="w-3.5 h-3.5" />
                                                        <span className="line-clamp-1">{item.city}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[12px] text-gray-600">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        <span>{formatDate(item.created_at)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Pagination - simple version */}
                            {donations?.last_page > 1 && (
                                <div className="mt-8 flex justify-center gap-2">
                                    {donations?.links?.map((link: any, i: number) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 text-[13px] rounded-lg transition-colors ${
                                                link.active
                                                ? 'bg-[#3F7859] text-white font-bold shadow-sm'
                                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                            } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Filters */}
                        <aside className="w-full lg:w-72 shrink-0 bg-[#FAF8F5] rounded-2xl p-8 flex flex-col gap-10 h-fit">
                            <div>
                                <h3 className="text-[16px] font-bold text-gray-900 mb-5">Kategori</h3>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleCategoryClick('')}
                                        className={`text-left px-4 py-2.5 rounded-xl text-[13px] transition-colors ${
                                            category === '' ? 'bg-[#9FB0FF] text-[#1E3A8A] font-bold' : 'text-gray-600 hover:bg-[#E2E8FF]'
                                        }`}
                                    >
                                        Semua Kategori
                                    </button>
                                    {categories.map((c: any) => (
                                        <button
                                            key={c.id}
                                            onClick={() => handleCategoryClick(c.id.toString())}
                                            className={`text-left px-4 py-2.5 rounded-xl text-[13px] transition-colors ${
                                                category === c.id.toString() ? 'bg-[#9FB0FF] text-[#1E3A8A] font-bold' : 'text-gray-600 hover:bg-[#E2E8FF]'
                                            }`}
                                        >
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[16px] font-bold text-gray-900 mb-5">Kondisi</h3>
                                <div className="flex flex-col gap-4 pl-4">
                                    {[
                                        { value: '', label: 'Semua Kondisi' },
                                        { value: 'new', label: 'Baru' },
                                        { value: 'very_good', label: 'Sangat Baik' },
                                        { value: 'good', label: 'Baik' },
                                        { value: 'fair', label: 'Cukup' },
                                        { value: 'damaged', label: 'Rusak' }
                                    ].map((cond) => (
                                        <label key={cond.value} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="radio"
                                                    name="condition"
                                                    value={cond.value}
                                                    checked={condition === cond.value}
                                                    onChange={() => handleConditionChange(cond.value)}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-[#3F7859] peer-checked:bg-[#3F7859] transition-all"></div>
                                                {condition === cond.value && (
                                                    <div className="absolute w-2 h-2 bg-white rounded-full"></div>
                                                )}
                                            </div>
                                            <span className="text-[13px] text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                                                {cond.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>


            </div>
        </>
    );
}

CariBarang.layout = (page: React.ReactNode) => page;