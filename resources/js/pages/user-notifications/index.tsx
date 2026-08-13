import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Bell, CheckCircle2, XCircle, Info } from 'lucide-react';
import React from 'react';

export default function UserNotificationsIndex({ notifications }: { notifications: any }) {

    const formatDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const getIcon = (title: string) => {
        if (title.toLowerCase().includes('disetujui')) return <CheckCircle2 className="w-6 h-6 text-green-500" />;
        if (title.toLowerCase().includes('ditolak')) return <XCircle className="w-6 h-6 text-red-500" />;
        return <Info className="w-6 h-6 text-[#5170FF]" />;
    };

    return (
        <DashboardLayout>
            <Head title="Notifikasi Sistem" />
            
            <div className="p-8 max-w-4xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-[24px] font-bold text-gray-900 mb-2">Notifikasi Sistem</h1>
                        <p className="text-[14px] text-gray-500">Pemberitahuan terkait status permintaan barang Anda.</p>
                    </div>
                </div>

                {(!notifications?.data || notifications.data.length === 0) ? (
                    <div className="bg-white rounded-3xl p-12 border border-gray-200 text-center flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <Bell className="w-10 h-10 text-[#5170FF]" />
                        </div>
                        <h3 className="text-[20px] font-bold text-gray-900 mb-2">Belum Ada Notifikasi</h3>
                        <p className="text-[14px] text-gray-500 mb-8 max-w-md">Saat ini belum ada notifikasi masuk untuk Anda.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {notifications.data.map((notif: any) => {
                            return (
                                <div 
                                    key={notif.id} 
                                    className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4 transition-colors relative overflow-hidden"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                                        {getIcon(notif.title)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                                            <h4 className="text-[15px] font-bold text-gray-900">
                                                {notif.title}
                                            </h4>
                                            <span className="text-[11px] text-gray-400 whitespace-nowrap">{formatDate(notif.created_at)}</span>
                                        </div>
                                        <p className="text-[13px] text-gray-600 leading-relaxed mt-2">{notif.message}</p>
                                        
                                        {notif.title.toLowerCase().includes('disetujui') && (
                                            <Link href="/chats" className="inline-block mt-4 text-[12px] font-bold text-[#5170FF] hover:underline">
                                                Buka Pesan Masuk &rarr;
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {notifications?.last_page > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                        {notifications?.links?.map((link: any, i: number) => (
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

UserNotificationsIndex.layout = (page: React.ReactNode) => <>{page}</>;
