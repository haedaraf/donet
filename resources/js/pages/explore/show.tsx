import { Head, Link, useForm, usePage } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { MapPin, Calendar, CheckCircle2, UserIcon, ArrowLeft, MessageSquare } from 'lucide-react';
import React, { useState } from 'react';

export default function ExploreShow({ donation, hasRequested }: { donation: any, hasRequested: boolean }) {
    const { auth } = usePage<any>().props;
    
    // Sort images: primary first
    const images = donation.images ? [...donation.images].sort((a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0)) : [];
    
    const [selectedImage, setSelectedImage] = useState(images.length > 0 ? images[0].image : null);
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        message: ''
    });

    const getImageUrl = (path: string) => {
        if (!path) return '';
        return path.startsWith('http') ? path : `/storage/${path}`;
    };

    const formatDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    const handleSubmitRequest = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/explore/${donation.id}/request`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowModal(false);
                reset();
            }
        });
    };

    return (
        <DashboardLayout>
            <Head title={donation.title} />
            <div className="p-8 max-w-6xl mx-auto">
                <Link href="/explore" className="inline-flex items-center gap-2 text-[#5170FF] font-bold text-[14px] hover:underline mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Pencarian
                </Link>

                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-10">
                    {/* Left: Images */}
                    <div className="w-full md:w-5/12 flex flex-col gap-4">
                        <div className="w-full aspect-square rounded-2xl bg-gray-100 overflow-hidden border border-gray-200">
                            {selectedImage ? (
                                <img src={getImageUrl(selectedImage)} alt={donation.title} className="w-full h-full object-contain" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {images.map((img: any) => (
                                    <button 
                                        key={img.id}
                                        onClick={() => setSelectedImage(img.image)}
                                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-colors ${
                                            selectedImage === img.image ? 'border-[#5170FF]' : 'border-transparent hover:border-gray-300'
                                        }`}
                                    >
                                        <img src={getImageUrl(img.image)} alt="Thumbnail" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info */}
                    <div className="w-full md:w-7/12 flex flex-col">
                        {donation.category && (
                            <div className="mb-3">
                                <span className="bg-[#EDF1FF] text-[#5170FF] px-3 py-1 rounded-full text-[12px] font-bold">
                                    {donation.category.name}
                                </span>
                            </div>
                        )}
                        <h1 className="text-[28px] font-bold text-gray-900 mb-4">{donation.title}</h1>
                        
                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="flex items-center gap-2 text-[13px] text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span className="capitalize font-medium">{donation.condition ? donation.condition.replace('_', ' ') : 'Tidak diketahui'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[13px] text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <MapPin className="w-4 h-4 text-red-500" />
                                <span className="font-medium">{donation.city}, {donation.province}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[13px] text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <Calendar className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">{formatDate(donation.created_at)}</span>
                            </div>
                        </div>

                        {/* Donor Info */}
                        <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-2xl border border-gray-100 mb-8">
                            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
                                {donation.user?.avatar ? (
                                    <img src={getImageUrl(donation.user.avatar)} alt={donation.user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="w-6 h-6 text-gray-400" />
                                )}
                            </div>
                            <div>
                                <p className="text-[12px] text-gray-500 font-medium">Didonasikan oleh</p>
                                <p className="text-[15px] font-bold text-gray-900">{donation.user?.name}</p>
                            </div>
                        </div>

                        <div className="mb-8 flex-1">
                            <h3 className="text-[16px] font-bold text-gray-900 mb-3">Deskripsi Barang</h3>
                            <div className="text-[14px] text-gray-600 leading-relaxed whitespace-pre-line">
                                {donation.description}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 border-t border-gray-100 mt-auto">
                            {hasRequested ? (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center justify-center gap-3">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="font-bold text-[14px]">Permintaan Anda sedang diproses donatur.</span>
                                </div>
                            ) : (
                                auth.user.role === 'recipient' ? (
                                    <button 
                                        onClick={() => setShowModal(true)}
                                        className="w-full bg-primary hover:bg-primary-900 text-primary-foreground py-4 rounded-xl font-bold text-[15px] transition-colors shadow-md ring-2 ring-primary/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 flex items-center justify-center gap-2"
                                    >
                                        Ajukan Permintaan
                                    </button>
                                ) : (
                                    <div className="bg-gray-50 border border-gray-200 text-gray-600 px-6 py-4 rounded-xl text-center">
                                        <span className="font-bold text-[14px]">Hanya Penerima yang bisa mengajukan permintaan.</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Request Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#EDF1FF] text-[#5170FF] flex items-center justify-center">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-[18px] font-bold text-gray-900">Ajukan Permintaan</h3>
                                <p className="text-[12px] text-gray-500">Tulis pesan ke donatur (opsional)</p>
                            </div>
                        </div>
                        
                        <form onSubmit={handleSubmitRequest}>
                            <textarea
                                value={data.message}
                                onChange={e => setData('message', e.target.value)}
                                placeholder="Halo, saya sangat membutuhkan barang ini karena..."
                                className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#5170FF] focus:border-[#5170FF] resize-none mb-2"
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-[11px] mb-4">{errors.message}</p>}

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        reset();
                                    }}
                                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-[13px] transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 py-3 bg-primary hover:bg-primary-900 text-primary-foreground rounded-xl font-bold text-[13px] transition-colors shadow-sm ring-2 ring-primary/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 disabled:opacity-50"
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Permintaan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

ExploreShow.layout = (page: React.ReactNode) => <>{page}</>;
