import { Head, usePage, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Plus, MoreVertical, Circle } from 'lucide-react';
import { Auth } from '@/types';

// Donor Dashboard Component
function DonorDashboard({ user }: { user: any }) {
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
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 bg-white border border-gray-300 rounded-2xl"></div>
                ))}
            </div>

            {/* Barang Saya */}
            <h2 className="text-[20px] font-bold text-gray-900 mb-4">Barang Saya</h2>
            <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 px-6">
                    <button className="text-[#5170FF] font-bold text-[13px] py-4 border-b-2 border-[#5170FF] px-4 -mb-px">Semua (4)</button>
                    <button className="text-gray-400 font-bold text-[13px] py-4 px-4 hover:text-gray-600">Tersedia (1)</button>
                    <button className="text-gray-400 font-bold text-[13px] py-4 px-4 hover:text-gray-600">Diproses (1)</button>
                    <button className="text-gray-400 font-bold text-[13px] py-4 px-4 hover:text-gray-600">Selesai (2)</button>
                </div>

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
                        {/* Row 1 */}
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded shrink-0"></div>
                                <span className="text-[12px] text-gray-700 font-medium">Sepatu</span>
                            </td>
                            <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">6 Juli 2026</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex px-3 py-1 text-[11px] font-medium text-[#5170FF] border border-[#5170FF] rounded-md bg-[#F5F7FF]">Diproses</span>
                            </td>
                            <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">1 permintaan</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                            </td>
                        </tr>
                        {/* Row 2 */}
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded shrink-0"></div>
                                <span className="text-[12px] text-gray-700 font-medium">Tas</span>
                            </td>
                            <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">7 Juli 2026</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex px-3 py-1 text-[11px] font-medium text-emerald-500 border border-emerald-500 rounded-md bg-emerald-50">Tersedia</span>
                            </td>
                            <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">1 permintaan</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                            </td>
                        </tr>
                        {/* Row 3 */}
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded shrink-0"></div>
                                <span className="text-[12px] text-gray-700 font-medium">Buku</span>
                            </td>
                            <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">3 Juli 2026</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex px-3 py-1 text-[11px] font-medium text-emerald-500 border border-emerald-500 rounded-md bg-emerald-50">Selesai</span>
                            </td>
                            <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">0 permintaan</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                            </td>
                        </tr>
                        {/* Row 4 */}
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded shrink-0"></div>
                                <span className="text-[12px] text-gray-700 font-medium">Botol minum</span>
                            </td>
                            <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">1 Juli 2026</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex px-3 py-1 text-[11px] font-medium text-emerald-500 border border-emerald-500 rounded-md bg-emerald-50">Selesai</span>
                            </td>
                            <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">0 permintaan</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="p-4 text-center border-t border-gray-100">
                    <button className="text-[#5170FF] text-[13px] font-bold hover:underline">Lihat Semua Barang</button>
                </div>
            </div>
        </div>
    );
}

// Recipient Dashboard Component
function RecipientDashboard({ user }: { user: any }) {
    return (
        <div className="p-8 min-w-full max-w-7xl flex gap-8">
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
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-24 bg-white border border-gray-300 rounded-2xl"></div>
                    ))}
                </div>

                {/* Permintaan Saya */}
                <h2 className="text-[20px] font-bold text-gray-900 mb-4">Permintaan Saya</h2>
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
                            {/* Row 1 */}
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0"></div>
                                    <span className="text-[12px] text-gray-700 font-medium">Sepatu</span>
                                </td>
                                <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">6 Juli 2026</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex px-3 py-1 text-[11px] font-medium text-amber-500 border border-amber-500 rounded-md bg-amber-50">Menunggu</span>
                                </td>
                                <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">Nathania Galuh</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                                </td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0"></div>
                                    <span className="text-[12px] text-gray-700 font-medium">Tas</span>
                                </td>
                                <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">7 Juli 2026</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex px-3 py-1 text-[11px] font-medium text-emerald-500 border border-emerald-500 rounded-md bg-emerald-50">Disetujui</span>
                                </td>
                                <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">Nathania Galuh</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                                </td>
                            </tr>
                            {/* Row 3 */}
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0"></div>
                                    <span className="text-[12px] text-gray-700 font-medium">Buku</span>
                                </td>
                                <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">3 Juli 2026</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex px-3 py-1 text-[11px] font-medium text-emerald-500 border border-emerald-500 rounded-md bg-emerald-50">Selesai</span>
                                </td>
                                <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">Nathania Galuh</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                                </td>
                            </tr>
                            {/* Row 4 */}
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0"></div>
                                    <span className="text-[12px] text-gray-700 font-medium">Botol minum</span>
                                </td>
                                <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">1 Juli 2026</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex px-3 py-1 text-[11px] font-medium text-red-500 border border-red-500 rounded-md bg-red-50">Ditolak</span>
                                </td>
                                <td className="px-6 py-4 text-[12px] text-gray-700 font-medium">Nathania Galuh</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="p-4 text-center border-t border-gray-100">
                        <button className="text-[#5170FF] text-[13px] font-bold hover:underline">Lihat Semua Barang</button>
                    </div>
                </div>
            </div>
            
            {/* Right Sidebar for Penerima */}
            <div className="w-[300px] flex flex-col gap-4">
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
                    <p className="text-[13px] opacity-90">Butuh Bantuan?</p>
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

export default function Dashboard() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const role = auth.user.role || 'donor';

    return (
        <DashboardLayout>
            <Head title="Dashboard" />
            
            {role === 'donor' && <DonorDashboard user={auth.user} />}
            {role === 'recipient' && <RecipientDashboard user={auth.user} />}
            {role === 'admin' && <AdminDashboard user={auth.user} />}
        </DashboardLayout>
    );
}

// Override default layout to prevent AppLayout from wrapping the Dashboard
Dashboard.layout = (page: React.ReactNode) => <>{page}</>;
