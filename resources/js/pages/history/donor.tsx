import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { History, Eye, Edit2, Trash2, Gift } from 'lucide-react';
import React from 'react';

export default function DonorHistory({ histories, totalDonations }: { histories: any, totalDonations: number }) {

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
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const formatTime = (dateString: string) => {
        if (!dateString) return '-';
        const d = new Date(dateString);
        return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <span className="px-3 py-1 bg-green-50 text-green-600 border border-green-200 rounded-lg text-[12px] font-medium">Selesai</span>;
            case 'approved':
                return <span className="px-3 py-1 bg-yellow-50 text-yellow-600 border border-yellow-200 rounded-lg text-[12px] font-medium">Diproses</span>;
            case 'rejected':
                return <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg text-[12px] font-medium">Ditolak</span>;
            case 'pending':
                return <span className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg text-[12px] font-medium">Menunggu</span>;
            case 'cancelled':
                return <span className="px-3 py-1 bg-gray-100 text-gray-500 border border-gray-300 rounded-lg text-[12px] font-medium">Diambil</span>;
            default:
                return <span className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg text-[12px] font-medium">{status}</span>;
        }
    };

    return (
        <DashboardLayout>
            <Head title="Riwayat Saya" />
            
            <div className="p-8 min-w-full max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-[28px] font-bold text-gray-900 mb-1">Riwayat Saya</h1>
                    <p className="text-[14px] text-[#5170FF] font-medium">Donasi yang Saya Berikan</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Table Content */}
                    <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 px-6 text-[13px] font-bold text-gray-900 w-24">Foto</th>
                                        <th className="py-4 px-6 text-[13px] font-bold text-gray-900">Barang</th>
                                        <th className="py-4 px-6 text-[13px] font-bold text-gray-900">Penerima</th>
                                        <th className="py-4 px-6 text-[13px] font-bold text-gray-900">Tanggal Donasi</th>
                                        <th className="py-4 px-6 text-[13px] font-bold text-gray-900">Status</th>
                                        <th className="py-4 px-6 text-[13px] font-bold text-gray-900 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(!histories?.data || histories.data.length === 0) ? (
                                        <tr>
                                            <td colSpan={6} className="py-12 text-center text-gray-500 text-[14px]">
                                                Belum ada riwayat donasi.
                                            </td>
                                        </tr>
                                    ) : (
                                        histories.data.map((history: any) => (
                                            <tr key={history.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden">
                                                        {getPrimaryImage(history.donation?.images) && (
                                                            <img src={getPrimaryImage(history.donation.images)!} alt="Donation" className="w-full h-full object-cover" />
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <h3 className="text-[14px] font-bold text-gray-900 mb-1">{history.donation?.title}</h3>
                                                    <p className="text-[12px] text-gray-500">Kategori: {history.donation?.category?.name || 'Lainnya'}</p>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <h3 className="text-[14px] font-bold text-gray-900 mb-1">{history.recipient?.name}</h3>
                                                    <p className="text-[12px] text-gray-500">{history.donation?.city || 'Tidak diketahui'}</p>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <h3 className="text-[13px] text-gray-900 mb-1">{formatDate(history.updated_at)}</h3>
                                                    <p className="text-[12px] text-gray-500">{formatTime(history.updated_at)}</p>
                                                </td>
                                                <td className="py-4 px-6">
                                                    {getStatusBadge(history.status)}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <Link href={`/donations/${history.donation_id}`} className="text-[#5170FF] hover:text-blue-700 transition-colors">
                                                            <Eye className="w-4.5 h-4.5" />
                                                        </Link>
                                                        <button className="text-[#5170FF] hover:text-blue-700 transition-colors">
                                                            <Edit2 className="w-4.5 h-4.5" />
                                                        </button>
                                                        <button className="text-red-500 hover:text-red-700 transition-colors">
                                                            <Trash2 className="w-4.5 h-4.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {histories?.last_page > 1 && (
                            <div className="p-4 border-t border-gray-100 flex justify-center gap-2 bg-gray-50/50">
                                {histories?.links?.map((link: any, i: number) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-1.5 text-[12px] rounded-lg transition-colors ${
                                            link.active 
                                            ? 'bg-[#5170FF] text-white font-bold' 
                                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                        } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
                        {/* Keterangan Status */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h3 className="text-[16px] font-bold text-gray-900 mb-5">Keterangan Status</h3>
                            
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h4 className="text-[13px] font-bold text-green-600 mb-1">Selesai</h4>
                                    <p className="text-[12px] text-gray-500 leading-relaxed">Barang telah diterima oleh penerima.</p>
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-bold text-gray-600 mb-1">Diambil</h4>
                                    <p className="text-[12px] text-gray-500 leading-relaxed">Barang telah diambil oleh penerima.</p>
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-bold text-yellow-600 mb-1">Diproses</h4>
                                    <p className="text-[12px] text-gray-500 leading-relaxed">Barang sedang diproses dan dalam pengiriman.</p>
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-bold text-red-600 mb-1">Ditolak</h4>
                                    <p className="text-[12px] text-gray-500 leading-relaxed">Permintaan penerima ditolak oleh donatur.</p>
                                </div>
                            </div>
                        </div>

                        {/* Total Donasi */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h3 className="text-[16px] font-bold text-gray-900 mb-4">Total Donasi</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                    <Gift className="w-6 h-6 text-[#5170FF]" />
                                </div>
                                <div>
                                    <span className="text-[28px] font-bold text-gray-900 leading-none block mb-1">{totalDonations}</span>
                                    <span className="text-[12px] text-gray-500 leading-tight block">Barang telah Anda donasikan</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

DonorHistory.layout = (page: React.ReactNode) => <>{page}</>;
