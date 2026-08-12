import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { ArrowLeft, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function DonationForm({ donation, categories }: { donation: any, categories: any[] }) {
    const isEdit = !!donation.id;

    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'put' : 'post',
        title: donation.title || '',
        category_id: donation.category_id || (categories.length > 0 ? categories[0].id : ''),
        description: donation.description || '',
        condition: donation.condition || 'good',
        quantity: donation.quantity || 1,
        pickup_address: donation.pickup_address || '',
        city: donation.city || '',
        province: donation.province || '',
        status: donation.status || 'draft',
        images: [] as File[]
    });

    const [previews, setPreviews] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (data.images && data.images.length > 0) {
            const objectUrls = data.images.map(file => URL.createObjectURL(file));
            setPreviews(objectUrls);
            
            return () => {
                objectUrls.forEach(url => URL.revokeObjectURL(url));
            };
        } else {
            setPreviews([]);
        }
    }, [data.images]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            post(`/donations/${donation.id}`, { forceFormData: true });
        } else {
            post('/donations', { forceFormData: true });
        }
    };

    const inputClass = "w-full px-4 py-2.5 bg-white border border-gray-300 rounded-[8px] text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#5170FF] focus:border-[#5170FF] placeholder:text-gray-300 transition-colors";

    return (
        <>
            <DashboardLayout>
            <Head title={isEdit ? "Edit Barang" : "Tambah Barang"} />
            <div className="p-8 min-w-full max-w-3xl">
                <div className="mb-6 flex items-center gap-4">
                    <Link href="/donations" className="text-gray-400 hover:text-gray-600 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-[24px] font-bold text-gray-900">{isEdit ? "Edit Barang Donasi" : "Tambah Barang Donasi"}</h1>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-800">Nama Barang</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Contoh: Sepatu Nike Bekas"
                                className={inputClass}
                            />
                            {errors.title && <p className="text-red-500 text-[11px] mt-0.5">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12px] font-bold text-gray-800">Kategori</label>
                                <select
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="" disabled>Pilih Kategori</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-red-500 text-[11px] mt-0.5">{errors.category_id}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12px] font-bold text-gray-800">Kondisi</label>
                                <select
                                    value={data.condition}
                                    onChange={e => setData('condition', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="new">Baru (New)</option>
                                    <option value="very_good">Sangat Baik (Very Good)</option>
                                    <option value="good">Baik (Good)</option>
                                    <option value="fair">Cukup (Fair)</option>
                                    <option value="damaged">Rusak (Damaged)</option>
                                </select>
                                {errors.condition && <p className="text-red-500 text-[11px] mt-0.5">{errors.condition}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-800">Jumlah (Quantity)</label>
                            <input
                                type="number"
                                min="1"
                                value={data.quantity}
                                onChange={e => setData('quantity', e.target.value)}
                                className={inputClass}
                            />
                            {errors.quantity && <p className="text-red-500 text-[11px] mt-0.5">{errors.quantity}</p>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-800">Deskripsi Barang</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Jelaskan detail barang yang didonasikan..."
                                rows={4}
                                className={inputClass}
                            />
                            {errors.description && <p className="text-red-500 text-[11px] mt-0.5">{errors.description}</p>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-800">Alamat Pengambilan</label>
                            <textarea
                                value={data.pickup_address}
                                onChange={e => setData('pickup_address', e.target.value)}
                                placeholder="Alamat lengkap untuk mengambil barang..."
                                rows={3}
                                className={inputClass}
                            />
                            {errors.pickup_address && <p className="text-red-500 text-[11px] mt-0.5">{errors.pickup_address}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12px] font-bold text-gray-800">Kota</label>
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={e => setData('city', e.target.value)}
                                    placeholder="Contoh: Jakarta Selatan"
                                    className={inputClass}
                                />
                                {errors.city && <p className="text-red-500 text-[11px] mt-0.5">{errors.city}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12px] font-bold text-gray-800">Provinsi</label>
                                <input
                                    type="text"
                                    value={data.province}
                                    onChange={e => setData('province', e.target.value)}
                                    placeholder="Contoh: DKI Jakarta"
                                    className={inputClass}
                                />
                                {errors.province && <p className="text-red-500 text-[11px] mt-0.5">{errors.province}</p>}
                            </div>
                        </div>

                        {isEdit && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12px] font-bold text-gray-800">Status</label>
                                <select
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Dipublikasi</option>
                                    <option value="cancelled">Dibatalkan</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-[11px] mt-0.5">{errors.status}</p>}
                            </div>
                        )}

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-800">Foto Barang (Bisa lebih dari 1)</label>
                            
                            {(previews.length > 0 || (donation.images && donation.images.length > 0)) && (
                                <div className="flex gap-3 mb-1 flex-wrap">
                                    {previews.length > 0 ? (
                                        previews.map((url, i) => (
                                            <div 
                                                key={i} 
                                                className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => setSelectedImage(url)}
                                            >
                                                <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))
                                    ) : (
                                        donation.images?.map((img: any) => (
                                            <div 
                                                key={img.id} 
                                                className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 relative cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => setSelectedImage(`/storage/${img.image}`)}
                                            >
                                                <img src={`/storage/${img.image}`} alt="Existing" className="w-full h-full object-cover" />
                                                {img.is_primary ? (
                                                    <div className="absolute bottom-0 left-0 right-0 bg-[#5170FF]/90 text-white font-bold text-[9px] text-center py-0.5">Utama</div>
                                                ) : null}
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={e => setData('images', Array.from(e.target.files || []))}
                                className={inputClass}
                            />
                            {/* Inertia validation errors for array can be nested like images.0, we just show a generic one if needed or map them, but let's keep it simple */}
                            {errors.images && <p className="text-red-500 text-[11px] mt-0.5">{errors.images}</p>}
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-2">
                            <Link 
                                href="/donations"
                                className="px-6 py-2.5 rounded-[8px] text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#5170FF] hover:bg-[#405ce6] text-white px-8 py-2.5 rounded-[8px] font-bold text-[13px] transition-colors shadow-sm disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Barang'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
            
            {/* Image Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] w-full flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <img 
                            src={selectedImage} 
                            alt="Full Preview" 
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" 
                        />
                    </div>
                </div>
            )}
        </>
    );
}

DonationForm.layout = (page: React.ReactNode) => <>{page}</>;
