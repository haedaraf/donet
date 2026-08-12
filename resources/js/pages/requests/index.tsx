import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Search, MapPin, Calendar, Clock, CheckCircle2, XCircle, Info, FileText } from 'lucide-react';
import React, { useState } from 'react';

export default function RequestsIndex({ requests }: { requests: any }) {
    const { post, processing } = useForm();
    const [cancelId, setCancelId] = useState<number | null>(null);

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

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'pending': return { label: 'Menunggu Persetujuan', color: 'bg-yellow-50 text-yellow-600 border-yellow-200', icon: Clock };
            case 'approved': return { label: 'Disetujui', color: 'bg-green-50 text-green-600 border-green-200', icon: CheckCircle2 };
            case 'rejected': return { label: 'Ditolak', color: 'bg-red-50 text-red-600 border-red-200', icon: XCircle };
            case 'completed': return { label: 'Selesai', color: 'bg-blue-50 text-blue-600 border-blue-200', icon: CheckCircle2 };
            case 'cancelled': return { label: 'Dibatalkan', color: 'bg-gray-50 text-gray-600 border-gray-200', icon: Info };
            default: return { label: status, color: 'bg-gray-50 text-gray-600 border-gray-200', icon: Info };
        }
    };

    const handleCancel = (id: number) => {
        if (confirm('Apakah Anda yakin ingin membatalkan permintaan ini?')) {
            setCancelId(id);
            post(`/requests/${id}/cancel`, {
                preserveScroll: true,
                onFinish: () => setCancelId(null)
            });
        }
    };

    return (
        <DashboardLayout>
            <Head title="Permintaan Saya" />
            
            <div className="p-8 max-w-7xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-[24px] font-bold text-gray-900 mb-2">Permintaan Saya</h1>
                        <p className="text-[14px] text-gray-500">Pantau status barang yang Anda ajukan ke donatur.</p>
                    </div>
                </div>

                {(!requests?.data || requests.data.length === 0) ? (
                    <div className="bg-white rounded-3xl p-12 border border-gray-200 text-center flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <FileText className="w-10 h-10 text-[#5170FF]" />
                        </div>
                        <h3 className="text-[20px] font-bold text-gray-900 mb-2">Belum Ada Permintaan</h3>
                        <p className="text-[14px] text-gray-500 mb-8 max-w-md">Anda belum mengajukan permintaan barang apapun. Mari cari barang yang Anda butuhkan!</p>
                        <Link 
                            href="/explore" 
                            className="bg-[#5170FF] hover:bg-[#405ce6] text-white px-8 py-3.5 rounded-xl font-bold text-[14px] transition-colors shadow-sm"
                        >
                            Cari Barang Sekarang
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {requests.data.map((req: any) => {
                            const StatusIcon = getStatusInfo(req.status).icon;
                            return (
                                <div key={req.id} className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                                    {/* Image */}
                                    <div className="w-full md:w-56 shrink-0 min-h-[192px] bg-gray-100 relative">
                                        {getPrimaryImage(req.donation?.images) ? (
                                            <img src={getPrimaryImage(req.donation.images)!} alt={req.donation?.title} className="absolute inset-0 w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-[12px]">No Image</div>
                                        )}
                                        <div className={`absolute top-4 left-4 border ${getStatusInfo(req.status).color} px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold backdrop-blur-md bg-white/80`}>
                                            <StatusIcon className="w-3.5 h-3.5" />
                                            {getStatusInfo(req.status).label}
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-[18px] font-bold text-gray-900 mb-1">
                                                    <Link href={`/explore/${req.donation_id}`} className="hover:text-[#5170FF] transition-colors">
                                                        {req.donation?.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-[13px] text-gray-500 line-clamp-1">{req.donation?.description}</p>
                                            </div>
                                            
                                            {req.status === 'pending' && (
                                                <button
                                                    onClick={() => handleCancel(req.id)}
                                                    disabled={processing && cancelId === req.id}
                                                    className="shrink-0 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-[12px] font-bold transition-colors border border-red-100 disabled:opacity-50"
                                                >
                                                    {processing && cancelId === req.id ? 'Membatalkan...' : 'Batalkan Permintaan'}
                                                </button>
                                            )}

                                            {req.status === 'approved' && (
                                                <button
                                                    className="shrink-0 bg-[#5170FF] hover:bg-[#405ce6] text-white px-5 py-2.5 rounded-xl text-[13px] font-bold transition-colors shadow-sm"
                                                >
                                                    Chat Donatur
                                                </button>
                                            )}
                                        </div>
                                        
                                        <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                                            <div>
                                                <p className="text-[11px] text-gray-400 font-medium mb-1">Donatur</p>
                                                <div className="text-[13px] font-medium text-gray-900 flex items-center gap-2">
                                                    {req.donation?.user?.name || 'Unknown'}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-gray-400 font-medium mb-1">Lokasi</p>
                                                <div className="text-[13px] font-medium text-gray-900 flex items-center gap-1.5">
                                                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                    <span className="truncate">{req.donation?.city}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-gray-400 font-medium mb-1">Tanggal Request</p>
                                                <div className="text-[13px] font-medium text-gray-900 flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                    {formatDate(req.requested_at || req.created_at)}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-gray-400 font-medium mb-1">Kondisi</p>
                                                <div className="text-[13px] font-medium text-gray-900 capitalize">
                                                    {req.donation?.condition ? req.donation.condition.replace('_', ' ') : '-'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {requests?.last_page > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                        {requests?.links?.map((link: any, i: number) => (
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

RequestsIndex.layout = (page: React.ReactNode) => <>{page}</>;
