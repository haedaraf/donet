import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { MessageSquare, User, Send, ArrowLeft, MoreVertical, Package, Info, CheckCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

export default function ChatsShow({ conversations, activeConversation }: { conversations: any[], activeConversation: any }) {
    const { auth } = usePage<any>().props;
    const scrollRef = useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, reset } = useForm({
        message: ''
    });

    const [showStatusMenu, setShowStatusMenu] = useState(false);

    const updateStatus = (newStatus: string) => {
        router.post(`/chats/${activeConversation.id}/status`, { status: newStatus }, {
            preserveScroll: true,
            onSuccess: () => setShowStatusMenu(false)
        });
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeConversation.messages]);

    // Polling setiap 5 detik
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ['activeConversation', 'conversations']
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [activeConversation.id]);

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

    const formatTime = (dateString: string) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    };

    const otherUser = getOtherParticipant(activeConversation);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.message.trim()) return;

        post(`/chats/${activeConversation.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <DashboardLayout>
            <Head title={`Pesan dengan ${otherUser.name}`} />
            
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar List (Hidden on mobile when conversation is active) */}
                <div className="hidden md:flex w-80 border-r border-gray-100 bg-white flex-col h-full shrink-0 overflow-y-auto">
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
                                const oUser = getOtherParticipant(conv);
                                const lastMessage = conv.messages && conv.messages.length > 0 ? conv.messages[0] : null;
                                const isActive = conv.id === activeConversation.id;
                                
                                return (
                                    <Link 
                                        key={conv.id} 
                                        href={`/chats/${conv.id}`}
                                        className={`flex items-center gap-3 p-4 border-b border-gray-50 transition-colors ${isActive ? 'bg-[#F2F4FF]' : 'hover:bg-gray-50'}`}
                                    >
                                        <div className="relative shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                                                {oUser.avatar ? (
                                                    <img src={oUser.avatar.startsWith('http') ? oUser.avatar : `/storage/${oUser.avatar}`} alt={oUser.name} className="w-full h-full object-cover" />
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
                                                <h4 className={`text-[14px] truncate pr-2 ${isActive ? 'font-bold text-[#5170FF]' : 'font-bold text-gray-900'}`}>{oUser.name}</h4>
                                                <span className="text-[10px] text-gray-400 shrink-0">{formatDate(conv.last_message_at || conv.created_at)}</span>
                                            </div>
                                            <p className={`text-[12px] truncate ${isActive ? 'text-[#5170FF] opacity-80' : 'text-gray-500'}`}>
                                                {lastMessage ? lastMessage.message : 'Belum ada pesan...'}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Right side Conversation */}
                <div className="flex-1 bg-[#F8FAFC] flex flex-col h-full w-full">
                    {/* Header */}
                    <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 shrink-0">
                        <div className="flex items-center gap-3">
                            <Link href="/chats" className="md:hidden text-gray-500 p-2 hover:bg-gray-100 rounded-full">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                                    {otherUser.avatar ? (
                                        <img src={otherUser.avatar.startsWith('http') ? otherUser.avatar : `/storage/${otherUser.avatar}`} alt={otherUser.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-[15px] font-bold text-gray-900 leading-tight">{otherUser.name}</h3>
                                    {activeConversation.donation && (
                                        <div className="flex items-center gap-1 mt-0.5 text-[11px] text-[#5170FF] font-medium">
                                            <Package className="w-3 h-3" />
                                            <span className="truncate max-w-[200px]">Barang: {activeConversation.donation.title}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            {auth.user.role === 'donor' && (activeConversation.donation_request?.status === 'approved' || activeConversation.donationRequest?.status === 'approved') && (
                                <div className="relative">
                                    <button 
                                        onClick={() => setShowStatusMenu(!showStatusMenu)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-[12px] font-bold transition-colors flex items-center gap-2 shadow-sm"
                                    >
                                        Ubah Status
                                    </button>
                                    
                                    {showStatusMenu && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                                            <button onClick={() => updateStatus('completed')} className="w-full text-left px-4 py-3 text-[13px] text-green-600 hover:bg-green-50 font-medium border-b border-gray-50 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div> Selesai
                                            </button>
                                            <button onClick={() => updateStatus('cancelled')} className="w-full text-left px-4 py-3 text-[13px] text-gray-600 hover:bg-gray-50 font-medium border-b border-gray-50 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-gray-400"></div> Diambil
                                            </button>
                                            <button onClick={() => updateStatus('rejected')} className="w-full text-left px-4 py-3 text-[13px] text-red-600 hover:bg-red-50 font-medium flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-500"></div> Ditolak
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                            <button className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                                <Info className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4" ref={scrollRef}>
                        {activeConversation.messages.map((msg: any) => {
                            const isMe = msg.sender_id === auth.user.id;
                            
                            return (
                                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className="flex items-end gap-2 max-w-[85%] md:max-w-[70%]">
                                        {!isMe && (
                                            <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden shrink-0 mb-5">
                                                {msg.sender?.avatar ? (
                                                    <img src={msg.sender.avatar.startsWith('http') ? msg.sender.avatar : `/storage/${msg.sender.avatar}`} alt={msg.sender.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="w-3 h-3 text-gray-400 m-auto mt-1.5" />
                                                )}
                                            </div>
                                        )}
                                        
                                        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                            <div className={`px-4 py-2.5 rounded-2xl ${
                                                isMe 
                                                ? 'bg-[#5170FF] text-white rounded-br-none' 
                                                : 'bg-white text-gray-900 border border-gray-100 rounded-bl-none shadow-sm'
                                            }`}>
                                                <p className="text-[14px] whitespace-pre-wrap">{msg.message}</p>
                                            </div>
                                            <span className="text-[10px] text-gray-400 mt-1 px-1">{formatTime(msg.created_at)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Input Area */}
                    <div className="bg-white border-t border-gray-200 p-4 shrink-0">
                        {(() => {
                            const currentStatus = activeConversation.donation_request?.status || activeConversation.donationRequest?.status;
                            if (currentStatus === 'completed') {
                                return (
                                    <div className="bg-green-50 text-green-700 text-center py-3 rounded-xl text-[13px] font-bold border border-green-100 flex items-center justify-center gap-2">
                                        <CheckCircle className="w-4 h-4" /> Transaksi ini telah selesai.
                                    </div>
                                );
                            } else if (currentStatus === 'rejected') {
                                return (
                                    <div className="bg-red-50 text-red-700 text-center py-3 rounded-xl text-[13px] font-bold border border-red-100 flex items-center justify-center gap-2">
                                        <Info className="w-4 h-4" /> Transaksi ini telah ditolak.
                                    </div>
                                );
                            } else if (currentStatus === 'cancelled') {
                                return (
                                    <div className="bg-gray-50 text-gray-700 text-center py-3 rounded-xl text-[13px] font-bold border border-gray-200 flex items-center justify-center gap-2">
                                        <CheckCircle className="w-4 h-4" /> Barang telah diambil.
                                    </div>
                                );
                            }
                            
                            // Default to form if approved (or if status missing for some reason)
                            return (
                            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    placeholder="Ketik pesan..."
                                    className="flex-1 bg-gray-50 border-none px-4 py-3 rounded-full text-[14px] text-gray-900 focus:ring-2 focus:ring-[#5170FF]/20 placeholder:text-gray-400"
                                />
                                <button
                                    type="submit"
                                    disabled={!data.message.trim() || processing}
                                    className="w-12 h-12 bg-[#5170FF] hover:bg-[#405ce6] text-white rounded-full flex items-center justify-center shrink-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                >
                                    <Send className="w-5 h-5 -ml-0.5" />
                                </button>
                            </form>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

ChatsShow.layout = (page: React.ReactNode) => <>{page}</>;
