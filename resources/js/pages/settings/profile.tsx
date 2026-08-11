import { Head, Link, useForm, usePage } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import React, { useState, useEffect } from 'react';
import { Camera, UserIcon } from 'lucide-react';

export default function Profile() {
    const { auth } = usePage<any>().props;

    const { data, setData, post, processing, errors } = useForm({
        _method: 'patch',
        name: auth.user.name || '',
        email: auth.user.email || '',
        phone: auth.user.phone || '',
        avatar: null as File | null,
    });

    const { 
        data: pwdData, 
        setData: setPwdData, 
        put: putPwd, 
        processing: pwdProcessing, 
        errors: pwdErrors,
        reset: resetPwd 
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [preview, setPreview] = useState<string | null>(
        auth.user.avatar ? (auth.user.avatar.startsWith('http') ? auth.user.avatar : `/storage/${auth.user.avatar}`) : null
    );

    useEffect(() => {
        if (data.avatar) {
            const objectUrl = URL.createObjectURL(data.avatar);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else if (auth.user.avatar) {
            setPreview(auth.user.avatar.startsWith('http') ? auth.user.avatar : `/storage/${auth.user.avatar}`);
        } else {
            setPreview(null);
        }
    }, [data.avatar, auth.user.avatar]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/settings/profile', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        putPwd('/settings/password', {
            preserveScroll: true,
            onSuccess: () => resetPwd(),
        });
    };

    const inputClass = "w-full px-4 py-2.5 bg-white border border-gray-300 rounded-[8px] text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#5170FF] focus:border-[#5170FF] placeholder:text-gray-300 transition-colors";

    return (
        <DashboardLayout>
            <Head title="Profil Saya" />
            <div className="p-8 min-w-full max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-[28px] font-bold text-gray-900">Profil Saya</h1>
                    <p className="text-[15px] font-semibold text-gray-900 mt-1">Kelola data diri dan akun Anda di sini.</p>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        
                        {/* Avatar */}
                        <div className="flex flex-col gap-3 items-center sm:items-start mb-2">
                            <label className="text-[12px] font-bold text-gray-800">Foto Profil</label>
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                                    {preview ? (
                                        <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <UserIcon className="w-10 h-10 text-gray-400" />
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="bg-[#F2F4FF] hover:bg-[#E5E9FF] text-[#5170FF] px-4 py-2 rounded-lg font-bold text-[12px] cursor-pointer transition-colors inline-flex items-center gap-2 border border-[#5170FF]/20">
                                        <Camera className="w-4 h-4" />
                                        <span>Ganti Foto</span>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            className="hidden" 
                                            onChange={(e) => setData('avatar', e.target.files ? e.target.files[0] : null)}
                                        />
                                    </label>
                                    <p className="text-[11px] text-gray-500 max-w-[200px]">Format .JPG, .PNG maksimal ukuran 2MB.</p>
                                    {errors.avatar && <p className="text-red-500 text-[11px]">{errors.avatar}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-800">Nama Lengkap</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className={inputClass}
                            />
                            {errors.name && <p className="text-red-500 text-[11px] mt-0.5">{errors.name}</p>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-800">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className={inputClass}
                            />
                            {errors.email && <p className="text-red-500 text-[11px] mt-0.5">{errors.email}</p>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-800">Nomor Telepon</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                                placeholder="Contoh: 081234567890"
                                className={inputClass}
                            />
                            {errors.phone && <p className="text-red-500 text-[11px] mt-0.5">{errors.phone}</p>}
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#5170FF] hover:bg-[#405ce6] text-white px-8 py-2.5 rounded-[8px] font-bold text-[13px] transition-colors shadow-sm disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm mt-8">
                    <div className="mb-6">
                        <h2 className="text-[20px] font-bold text-gray-900">Ubah Kata Sandi</h2>
                        <p className="text-[13px] text-gray-500 mt-1">Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman.</p>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-800">Kata Sandi Saat Ini</label>
                            <input
                                type="password"
                                value={pwdData.current_password}
                                onChange={e => setPwdData('current_password', e.target.value)}
                                className={inputClass}
                            />
                            {pwdErrors.current_password && <p className="text-red-500 text-[11px] mt-0.5">{pwdErrors.current_password}</p>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-800">Kata Sandi Baru</label>
                            <input
                                type="password"
                                value={pwdData.password}
                                onChange={e => setPwdData('password', e.target.value)}
                                className={inputClass}
                            />
                            {pwdErrors.password && <p className="text-red-500 text-[11px] mt-0.5">{pwdErrors.password}</p>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-800">Konfirmasi Kata Sandi Baru</label>
                            <input
                                type="password"
                                value={pwdData.password_confirmation}
                                onChange={e => setPwdData('password_confirmation', e.target.value)}
                                className={inputClass}
                            />
                            {pwdErrors.password_confirmation && <p className="text-red-500 text-[11px] mt-0.5">{pwdErrors.password_confirmation}</p>}
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-4">
                            <button
                                type="submit"
                                disabled={pwdProcessing}
                                className="bg-[#5170FF] hover:bg-[#405ce6] text-white px-8 py-2.5 rounded-[8px] font-bold text-[13px] transition-colors shadow-sm disabled:opacity-50"
                            >
                                {pwdProcessing ? 'Menyimpan...' : 'Simpan Kata Sandi'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

Profile.layout = (page: React.ReactNode) => <>{page}</>;
