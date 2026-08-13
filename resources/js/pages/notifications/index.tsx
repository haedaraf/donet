import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Calendar, Clock, CheckCircle2, XCircle, Info, Bell, User, MapPin } from 'lucide-react';
import React, { useState } from 'react';

export default function NotificationsIndex({ requests }: { requests: any }) {
    const { post, processing } = useForm();
    const [selectedReq, setSelectedReq] = useState<any>(null);
    const [actionId, setActionId] = useState<number | null>(null);

    const getPrimaryImage = (images: any[]) => {
        if (!images || images.length === 0) return null;
        const primary = images.find(img => img.is_primary);
        const img = primary ? primary.image : images[0].image;
        if (!img) return null;
        return img.startsWith('http') ? img : `/storage/${img}`;
    };

    const formatDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const handleAction = (id: number, type: 'approve' | 'reject') => {
        const actionText = type === 'approve' ? 'menyetujui' : 'menolak';
        if (confirm(`Apakah Anda yakin ingin ${actionText} permintaan ini?`)) {
            setActionId(id);
            post(`/notifications/${id}/${type}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setSelectedReq(null);
                    setActionId(null);
                },
                onError: () => setActionId(null)
            });
        }
    };

    return (
        <DashboardLayout>
            <Head title="Notifikasi" />
            
            <div className="p-8 max-w-5xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-[24px] font-bold text-gray-900 mb-2">Notifikasi</h1>
                        <p className="text-[14px] text-gray-500">Pemberitahuan aktivitas dan permintaan barang Anda.</p>
                    </div>
                </div>

                {(!requests?.data || requests.data.length === 0) ? (
                    <div className="bg-white rounded-3xl p-12 border border-gray-200 text-center flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <Bell className="w-10 h-10 text-[#5170FF]" />
                        </div>
                        <h3 className="text-[20px] font-bold text-gray-900 mb-2">Belum Ada Notifikasi</h3>
                        <p className="text-[14px] text-gray-500 mb-8 max-w-md">Saat ini belum ada notifikasi masuk untuk Anda.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {requests.data.map((req: any) => {
                            const isPending = req.status === 'pending';
                            return (
                                <div 
                                    key={req.id} 
                                    onClick={() => isPending ? setSelectedReq(req) : null}
                                    className={`bg-white rounded-2xl border ${isPending ? 'border-blue-200 bg-blue-50/30 cursor-pointer hover:border-[#5170FF]' : 'border-gray-200 opacity-70'} p-5 flex items-start gap-4 transition-colors`}
                                >
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                                        {req.recipient?.avatar ? (
                                            <img src={req.recipient.avatar.startsWith('http') ? req.recipient.avatar : `/storage/${req.recipient.avatar}`} alt={req.recipient.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                <User className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                                            <h4 className="text-[14px] font-bold text-gray-900">
                                                {req.recipient?.name} <span className="font-normal text-gray-600">mengajukan permintaan untuk barang</span> "{req.donation?.title}"
                                            </h4>
                                            <span className="text-[12px] text-gray-400 whitespace-nowrap">{formatDate(req.requested_at || req.created_at)}</span>
                                        </div>
                                        {req.message && (
                                            <p className="text-[13px] text-gray-600 italic line-clamp-1 mb-2">"{req.message}"</p>
                                        )}
                                        {isPending ? (
                                            <span className="text-[12px] font-bold text-[#5170FF]">Klik untuk melihat detail & merespons</span>
                                        ) : (
                                            <span className="text-[12px] font-bold text-gray-500">Status: {req.status}</span>
                                        )}
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

            {/* Modal Detail & Aksi */}
            {selectedReq && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[20px] font-bold text-gray-900">Detail Permintaan</h3>
                            <button onClick={() => setSelectedReq(null)} className="text-gray-400 hover:text-gray-900">
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            <div className="w-full md:w-40 h-40 bg-gray-100 rounded-2xl overflow-hidden shrink-0 border border-gray-200">
                                {getPrimaryImage(selectedReq.donation?.images) ? (
                                    <img src={getPrimaryImage(selectedReq.donation.images)!} alt={selectedReq.donation?.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-[12px]">No Image</div>
                                )}
                            </div>
                            <div>
                                <h4 className="text-[18px] font-bold text-gray-900 mb-2">{selectedReq.donation?.title}</h4>
                                <div className="text-[13px] text-gray-600 flex items-center gap-2 mb-1">
                                    <MapPin className="w-4 h-4" /> {selectedReq.donation?.city}
                                </div>
                                <div className="text-[13px] text-gray-600 flex items-center gap-2 mb-4">
                                    <Clock className="w-4 h-4" /> Dikirim {formatDate(selectedReq.requested_at || selectedReq.created_at)}
                                </div>
                                
                                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                                        {selectedReq.recipient?.avatar ? (
                                            <img src={selectedReq.recipient.avatar.startsWith('http') ? selectedReq.recipient.avatar : `/storage/${selectedReq.recipient.avatar}`} alt={selectedReq.recipient.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-500 font-medium">Pemohon</p>
                                        <p className="text-[13px] font-bold text-gray-900 truncate">{selectedReq.recipient?.name || 'Unknown'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-8 relative mt-4">
                            <div className="absolute -top-3 left-5 bg-gray-50 px-2 text-[12px] font-bold text-gray-500">Pesan Pemohon</div>
                            <p className="text-[14px] text-gray-700 italic leading-relaxed">"{selectedReq.message || 'Tidak ada pesan khusus.'}"</p>
                        </div>

                        <div className="flex gap-3 mt-auto pt-6 border-t border-gray-100">
                            <button
                                onClick={() => handleAction(selectedReq.id, 'reject')}
                                disabled={processing && actionId === selectedReq.id}
                                className="flex-1 py-3 bg-white hover:bg-red-50 text-red-600 rounded-xl font-bold text-[14px] transition-colors border border-red-200 disabled:opacity-50"
                            >
                                {processing && actionId === selectedReq.id ? 'Memproses...' : 'Tolak'}
                            </button>
                            <button
                                onClick={() => handleAction(selectedReq.id, 'approve')}
                                disabled={processing && actionId === selectedReq.id}
                                className="flex-1 py-3 bg-[#5170FF] hover:bg-[#405ce6] text-white rounded-xl font-bold text-[14px] transition-colors shadow-sm disabled:opacity-50"
                            >
                                {processing && actionId === selectedReq.id ? 'Memproses...' : 'Setujui Permintaan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

NotificationsIndex.layout = (page: React.ReactNode) => <>{page}</>;
