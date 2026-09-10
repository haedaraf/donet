import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { History, CheckCircle2, Package, User, Clock, XCircle, Ban } from 'lucide-react';
import React from 'react';

export default function RecipientHistory({ histories }: { histories: any }) {

    const getPrimaryImage = (images: any[]) => {
        if (!images || images.length === 0) return null;
        const primary = images.find(img => img.is_primary);
        const img = primary ? primary.image : images[0].image;
        if (!img) return null;
        return img.startsWith('http') ? img : `/storage/${img}`;
    };

    const formatDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-[11px] font-bold text-green-700">Berhasil Diterima</span>
                    </div>
                );
            case 'approved':
                return (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        <span className="text-[11px] font-bold text-blue-700">Disetujui</span>
                    </div>
                );
            case 'rejected':
                return (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-[11px] font-bold text-red-700">Ditolak</span>
                    </div>
                );
            case 'cancelled':
                return (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                        <Ban className="w-4 h-4 text-gray-500" />
                        <span className="text-[11px] font-bold text-gray-700">Dibatalkan</span>
                    </div>
                );
            default:
                return (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-[11px] font-bold text-orange-700">Menunggu</span>
                    </div>
                );
        }
    };

    return (
        <DashboardLayout>
            <Head title="Riwayat Saya" />
            
            <div className="p-8 max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-[24px] font-bold text-gray-900 mb-2">Riwayat Barang Saya</h1>
                    <p className="text-[14px] text-gray-500">Daftar barang donasi yang Anda minta dari donatur.</p>
                </div>

                {(!histories?.data || histories.data.length === 0) ? (
                    <div className="bg-white rounded-3xl p-12 border border-gray-200 text-center flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                            <History className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="text-[20px] font-bold text-gray-900 mb-2">Belum Ada Riwayat</h3>
                        <p className="text-[14px] text-gray-500 mb-8 max-w-md">Anda belum memiliki riwayat permintaan barang donasi.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {histories.data.map((history: any) => (
                            <div key={history.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col hover:border-gray-300 transition-colors shadow-sm">
                                <div className="h-40 bg-gray-100 relative">
                                    {getPrimaryImage(history.donation?.images) ? (
                                        <img src={getPrimaryImage(history.donation.images)!} alt={history.donation.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Package className="w-8 h-8 text-gray-300" />
                                        </div>
                                    )}
                                    {getStatusBadge(history.status)}
                                </div>
                                
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-[16px] font-bold text-gray-900 mb-1 line-clamp-1">{history.donation?.title}</h3>
                                    <span className="text-[12px] text-gray-500 mb-4">Diperbarui pada {formatDate(history.updated_at)}</span>
                                    
                                    <div className="mt-auto bg-gray-50 rounded-xl p-3 flex items-center gap-3 border border-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                                            {history.donation?.user?.avatar ? (
                                                <img src={history.donation.user.avatar.startsWith('http') ? history.donation.user.avatar : `/storage/${history.donation.user.avatar}`} alt={history.donation.user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-[11px] text-gray-500 font-medium">Didonasikan oleh</p>
                                            <p className="text-[13px] font-bold text-gray-900 truncate">{history.donation?.user?.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {histories?.last_page > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                        {histories?.links?.map((link: any, i: number) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`px-4 py-2 text-[13px] rounded-lg transition-colors ${
                                    link.active 
                                    ? 'bg-[#5170FF] text-white font-bold shadow-sm' 
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

RecipientHistory.layout = (page: React.ReactNode) => <>{page}</>;
