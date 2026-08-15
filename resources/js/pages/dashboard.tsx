import { Head, usePage, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Plus, MoreVertical, Circle } from 'lucide-react';
import { Auth } from '@/types';

const getPrimaryImage = (images: any[]) => {
    if (!images || images.length === 0) return null;
    const primary = images.find(img => img.is_primary);
    const img = primary ? primary.image : images[0].image;
    if (!img) return null;
    return img.startsWith('http') ? img : `/storage/${img}`;
};

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'completed':
            return <span className="inline-flex px-3 py-1 text-[11px] font-medium text-emerald-500 border border-emerald-500 rounded-md bg-emerald-50">Selesai</span>;
        case 'approved':
            return <span className="inline-flex px-3 py-1 text-[11px] font-medium text-[#5170FF] border border-[#5170FF] rounded-md bg-[#F5F7FF]">Diproses</span>;
        case 'rejected':
            return <span className="inline-flex px-3 py-1 text-[11px] font-medium text-red-500 border border-red-500 rounded-md bg-red-50">Ditolak</span>;
        case 'cancelled':
            return <span className="inline-flex px-3 py-1 text-[11px] font-medium text-gray-500 border border-gray-500 rounded-md bg-gray-50">Dibatalkan</span>;
        case 'pending':
            return <span className="inline-flex px-3 py-1 text-[11px] font-medium text-amber-500 border border-amber-500 rounded-md bg-amber-50">Menunggu</span>;
        case 'published':
            return <span className="inline-flex px-3 py-1 text-[11px] font-medium text-emerald-500 border border-emerald-500 rounded-md bg-emerald-50">Tersedia</span>;
        case 'draft':
            return <span className="inline-flex px-3 py-1 text-[11px] font-medium text-gray-500 border border-gray-500 rounded-md bg-gray-50">Draft</span>;
        default:
            return <span className="inline-flex px-3 py-1 text-[11px] font-medium text-gray-500 border border-gray-500 rounded-md bg-gray-50">{status}</span>;
    }
};

// Donor Dashboard Component
function DonorDashboard({ user, stats, recentItems }: { user: any, stats: any[], recentItems: any[] }) {
    return (
        <div className="p-8 min-w-full max-w-6xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-[28px] font-bold text-gray-900 flex items-center gap-2">
                        Halo, {user.name}! <span className="text-2xl">👋</span>
                    </h1>
                    <p className="text-[15px] font-semibold text-gray-900 mt-1">Terima kasih telah berbagi kebaikan hari ini.</p>
                </div>
                <Link href="/donations/create" className="bg-[#5170FF] hover:bg-[#405ce6] text-white px-6 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" strokeWidth={3} />
                    Donasikan Barang
                </Link>
            </div>

            {/* Ringkasan */}
            <h2 className="text-[20px] font-bold text-gray-900 mb-4">Ringkasan</h2>
            <div className="grid grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className={`h-24 bg-white border rounded-2xl flex flex-col justify-center px-6 ${stat.color.replace('bg-', 'bg-opacity-10 bg-')}`}>
                        <div className="text-[28px] font-bold leading-none mb-1">{stat.value}</div>
                        <div className="text-[12px] font-medium opacity-80">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Barang Saya */}
            <h2 className="text-[20px] font-bold text-gray-900 mb-4">Aktivitas Terkini</h2>
            <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden">
                {/* Table */}
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-6 py-4 text-[12px] font-bold text-gray-900 w-[30%]">Barang</th>
                            <th className="px-6 py-4 text-[12px] font-bold text-gray-900 w-[25%]">Tanggal</th>
                            <th className="px-6 py-4 text-[12px] font-bold text-gray-900 w-[20%]">Status</th>
                            <th className="px-6 py-4 text-[12px] font-bold text-gray-900 w-[20%]">Permintaan</th>
                            <th className="px-6 py-4 w-[5%]"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {(!recentItems || recentItems.length === 0) ? (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-gray-500 text-[14px]">
                                    Belum ada donasi.
                                </td>
                            </tr>
                        ) : (
                            recentItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded shrink-0 overflow-hidden">
                                            {getPrimaryImage(item.images) && (
                                                <img src={getPrimaryImage(item.images)!} alt={item.title} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <span className="text-[13px] text-gray-900 font-bold">{item.title}</span>
                                    </td>
                                    <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">{formatDate(item.created_at)}</td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(item.status)}
                                    </td>
                                    <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">{item.donation_requests_count} permintaan</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/donations/${item.id}`} className="text-gray-400 hover:text-[#5170FF] transition-colors"><MoreVertical className="w-5 h-5" /></Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="p-4 text-center border-t border-gray-100">
                    <Link href="/donations" className="text-[#5170FF] text-[13px] font-bold hover:underline">Lihat Semua Barang</Link>
                </div>
            </div>
        </div>
    );
}

// Recipient Dashboard Component
function RecipientDashboard({ user, stats, recentItems }: { user: any, stats: any[], recentItems: any[] }) {
    return (
        <div className="p-8 min-w-full max-w-7xl flex gap-8 flex-col lg:flex-row">
            <div className="flex-1">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-[28px] font-bold text-gray-900 flex items-center gap-2">
                        Halo, {user.name}! <span className="text-2xl">👋</span>
                    </h1>
                    <p className="text-[13px] font-bold text-gray-900 mt-1">Apa yang kamu butuhkan hari ini?</p>
                </div>

                {/* Ringkasan */}
                <h2 className="text-[20px] font-bold text-gray-900 mb-4">Ringkasan</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, i) => (
                        <div key={i} className={`h-24 bg-white border rounded-2xl flex flex-col justify-center px-6 ${stat.color.replace('bg-', 'bg-opacity-10 bg-')}`}>
                            <div className="text-[28px] font-bold leading-none mb-1">{stat.value}</div>
                            <div className="text-[12px] font-medium opacity-80">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Permintaan Saya */}
                <h2 className="text-[20px] font-bold text-gray-900 mb-4">Permintaan Terkini</h2>
                <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-6 py-4 text-[12px] font-bold text-gray-900 w-[30%]">Barang</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-gray-900 w-[25%]">Tanggal</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-gray-900 w-[20%]">Status</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-gray-900 w-[20%]">Donatur</th>
                                <th className="px-6 py-4 w-[5%]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {(!recentItems || recentItems.length === 0) ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-500 text-[14px]">
                                        Belum ada permintaan.
                                    </td>
                                </tr>
                            ) : (
                                recentItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded shrink-0 overflow-hidden">
                                                {getPrimaryImage(item.donation?.images) && (
                                                    <img src={getPrimaryImage(item.donation.images)!} alt={item.donation?.title} className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <span className="text-[13px] text-gray-900 font-bold">{item.donation?.title}</span>
                                        </td>
                                        <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">{formatDate(item.created_at)}</td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(item.status)}
                                        </td>
                                        <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">{item.donation?.user?.name}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/requests`} className="text-gray-400 hover:text-[#5170FF] transition-colors"><MoreVertical className="w-5 h-5" /></Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <div className="p-4 text-center border-t border-gray-100">
                        <Link href="/requests" className="text-[#5170FF] text-[13px] font-bold hover:underline">Lihat Semua Permintaan</Link>
                    </div>
                </div>
            </div>
            
            {/* Right Sidebar for Penerima */}
            <div className="w-full lg:w-[300px] flex flex-col gap-4 shrink-0">
                {/* Tips */}
                <div className="bg-[#EEF2FF] rounded-2xl p-6 border border-[#E0E7FF]">
                    <h3 className="text-[#5170FF] font-bold text-[16px] mb-4">Tips Penerima</h3>
                    <ul className="flex flex-col gap-4">
                        <li className="flex gap-3 text-[12px] font-medium text-gray-900 leading-tight">
                            <Circle className="w-[18px] h-[18px] text-[#5170FF] flex-shrink-0" strokeWidth={1} />
                            <span>Lengkapi profil anda agar donatur lebih percaya</span>
                        </li>
                        <li className="flex gap-3 text-[12px] font-medium text-gray-900 leading-tight">
                            <Circle className="w-[18px] h-[18px] text-[#5170FF] flex-shrink-0" strokeWidth={1} />
                            <span>Ajukan permintaan secara sopan dan jelas</span>
                        </li>
                        <li className="flex gap-3 text-[12px] font-medium text-gray-900 leading-tight">
                            <Circle className="w-[18px] h-[18px] text-[#5170FF] flex-shrink-0" strokeWidth={1} />
                            <span>Ambil barang sesuai kesepakatan</span>
                        </li>
                        <li className="flex gap-3 text-[12px] font-medium text-gray-900 leading-tight">
                            <Circle className="w-[18px] h-[18px] text-[#5170FF] flex-shrink-0" strokeWidth={1} />
                            <span>Tidak untuk diperjualbelikan kembali</span>
                        </li>
                    </ul>
                </div>
                
                {/* Bantuan */}
                <div className="bg-[#5170FF] rounded-2xl p-6 text-white shadow-md">
                    <h3 className="font-bold text-[18px] mb-1">Butuh Bantuan?</h3>
                    <p className="text-[13px] opacity-90 leading-relaxed mb-4">Jika Anda mengalami kendala saat mengajukan permintaan, hubungi tim support kami.</p>
                    <button className="bg-white text-[#5170FF] text-[12px] font-bold py-2 px-4 rounded-lg w-full">Hubungi Support</button>
                </div>
            </div>
        </div>
    );
}

// Admin Dashboard Component
function AdminDashboard({ user }: { user: any }) {
    return (
        <div className="p-8 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-gray-900 flex items-center gap-2">
                    Halo, {user.name}! <span className="text-2xl">👑</span>
                </h1>
                <p className="text-[15px] font-semibold text-gray-900 mt-1">Selamat datang di Panel Admin.</p>
            </div>
            
            <h2 className="text-[20px] font-bold text-gray-900 mb-4">Statistik Sistem</h2>
            <div className="grid grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 bg-white border border-gray-300 rounded-2xl"></div>
                ))}
            </div>
        </div>
    );
}

export default function Dashboard({ stats = [], recentItems = [] }: { stats?: any[], recentItems?: any[] }) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const role = auth.user.role || 'donor';

    return (
        <DashboardLayout>
            <Head title="Dashboard" />
            
            {role === 'donor' && <DonorDashboard user={auth.user} stats={stats} recentItems={recentItems} />}
            {role === 'recipient' && <RecipientDashboard user={auth.user} stats={stats} recentItems={recentItems} />}
            {role === 'admin' && <AdminDashboard user={auth.user} />}
        </DashboardLayout>
    );
}

// Override default layout to prevent AppLayout from wrapping the Dashboard
Dashboard.layout = (page: React.ReactNode) => <>{page}</>;
