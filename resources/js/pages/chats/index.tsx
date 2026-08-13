import { Head, Link, usePage, router } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { MessageSquare, User, Package } from 'lucide-react';
import React, { useEffect } from 'react';

export default function ChatsIndex({ conversations }: { conversations: any[] }) {
    const { auth } = usePage<any>().props;

    // Polling setiap 5 detik
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ['conversations']
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getPrimaryImage = (images: any[]) => {
        if (!images || images.length === 0) return null;
        const primary = images.find(img => img.is_primary);
        const img = primary ? primary.image : images[0].image;
        if (!img) return null;
        return img.startsWith('http') ? img : `/storage/${img}`;
    };

    const getOtherParticipant = (conversation: any) => {
        const other = conversation.participants.find((p: any) => p.user_id !== auth.user.id);
        return other?.user || { name: 'Unknown User' };
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
    };

    return (
        <DashboardLayout>
            <Head title="Pesan Masuk" />
            
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar List */}
                <div className="w-full md:w-80 border-r border-gray-100 bg-white flex flex-col h-full shrink-0 overflow-y-auto">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-[18px] font-bold text-gray-900">Pesan Masuk</h2>
                    </div>
                    
                    {(!conversations || conversations.length === 0) ? (
                        <div className="p-8 text-center flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                <MessageSquare className="w-5 h-5 text-gray-400" />
                            </div>
                            <p className="text-[13px] text-gray-500">Belum ada pesan</p>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col">
                            {conversations.map((conv) => {
                                const otherUser = getOtherParticipant(conv);
                                const lastMessage = conv.messages && conv.messages.length > 0 ? conv.messages[0] : null;
                                
                                return (
                                    <Link 
                                        key={conv.id} 
                                        href={`/chats/${conv.id}`}
                                        className="flex items-center gap-3 p-4 hover:bg-gray-50 border-b border-gray-50 transition-colors"
                                    >
                                        <div className="relative shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                                                {otherUser.avatar ? (
                                                    <img src={otherUser.avatar.startsWith('http') ? otherUser.avatar : `/storage/${otherUser.avatar}`} alt={otherUser.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="w-6 h-6 text-gray-400" />
                                                )}
                                            </div>
                                            {getPrimaryImage(conv.donation?.images) && (
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full p-0.5 border border-gray-100 overflow-hidden">
                                                    <img src={getPrimaryImage(conv.donation.images)!} alt="Item" className="w-full h-full object-cover rounded-full" />
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="text-[14px] font-bold text-gray-900 truncate pr-2">{otherUser.name}</h4>
                                                <span className="text-[10px] text-gray-400 shrink-0">{formatDate(conv.last_message_at || conv.created_at)}</span>
                                            </div>
                                            <p className="text-[12px] text-gray-500 truncate">
                                                {lastMessage ? lastMessage.message : 'Belum ada pesan...'}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Right side placeholder */}
                <div className="hidden md:flex flex-1 bg-gray-50 flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                        <MessageSquare className="w-10 h-10 text-[#5170FF]" />
                    </div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-2">Pilih Pesan</h3>
                    <p className="text-[14px] text-gray-500">Pilih salah satu pesan di samping untuk mulai membalas.</p>
                </div>
            </div>
        </DashboardLayout>
    );
}

ChatsIndex.layout = (page: React.ReactNode) => <>{page}</>;
