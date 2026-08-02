import { Form, Head, Link } from '@inertiajs/react';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { useState } from 'react';
import { User, Mail, Phone, Key, Eye, EyeOff } from 'lucide-react';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [role, setRole] = useState('donor');

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-[linear-gradient(243.43deg,#5170FF_13.62%,#BEC9FF_40.13%,#9FB0FF_65.01%,#5170FF_87.38%)]">
            <Head title="Register" />
            
            <div className="bg-white rounded-[24px] p-8 w-full max-w-[460px]">
                <div className="mb-6 text-center flex flex-col items-center">
                    <div className="mb-4">
                        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="20" y="0" width="12" height="40" rx="6" fill="#5170FF" />
                            <path d="M20 16C13.3726 16 8 21.3726 8 28C8 34.6274 13.3726 40 20 40V16Z" fill="#5170FF" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 mb-1">Daftar Akun Baru</h1>
                    <p className="text-[12px] text-gray-500">Isi data diri anda untuk membuat akun</p>
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-4"
                >
                    {({ processing, errors }: any) => (
                        <>
                            {/* Nama Lengkap */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-[12px] font-bold text-gray-800">
                                    Nama Lengkap
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <User className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        name="name"
                                        placeholder="Ketik Nama Anda"
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-[8px] text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#5170FF] focus:border-[#5170FF] placeholder:text-gray-300 transition-colors"
                                    />
                                </div>
                                {errors?.name && (
                                    <p className="text-red-500 text-[11px] mt-0.5">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="text-[12px] font-bold text-gray-800">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Mail className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        name="email"
                                        placeholder="Ketik Email Anda"
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-[8px] text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#5170FF] focus:border-[#5170FF] placeholder:text-gray-300 transition-colors"
                                    />
                                </div>
                                {errors?.email && (
                                    <p className="text-red-500 text-[11px] mt-0.5">{errors.email}</p>
                                )}
                            </div>

                            {/* Nomor Telepon */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="phone" className="text-[12px] font-bold text-gray-800">
                                    Nomor Telepon
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Phone className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
                                    </div>
                                    <input
                                        id="phone"
                                        type="tel"
                                        required
                                        name="phone"
                                        placeholder="Ketik Nomor Telepon Anda"
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-[8px] text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#5170FF] focus:border-[#5170FF] placeholder:text-gray-300 transition-colors"
                                    />
                                </div>
                                {errors?.phone && (
                                    <p className="text-red-500 text-[11px] mt-0.5">{errors.phone}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="password" className="text-[12px] font-bold text-gray-800">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Key className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        name="password"
                                        placeholder="Ketik Password Anda"
                                        className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-[8px] text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#5170FF] focus:border-[#5170FF] placeholder:text-gray-300 transition-colors"
                                    />
                                    <button 
                                        type="button" 
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <Eye className="h-4 w-4" strokeWidth={1.5} />
                                        ) : (
                                            <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                                        )}
                                    </button>
                                </div>
                                {errors?.password && (
                                    <p className="text-red-500 text-[11px] mt-0.5">{errors.password}</p>
                                )}
                            </div>

                            {/* Konfirmasi Password */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="password_confirmation" className="text-[12px] font-bold text-gray-800">
                                    Konfirmasi Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Key className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
                                    </div>
                                    <input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        name="password_confirmation"
                                        placeholder="Ulangi Password Anda"
                                        className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-[8px] text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#5170FF] focus:border-[#5170FF] placeholder:text-gray-300 transition-colors"
                                    />
                                    <button 
                                        type="button" 
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <Eye className="h-4 w-4" strokeWidth={1.5} />
                                        ) : (
                                            <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                                        )}
                                    </button>
                                </div>
                                {errors?.password_confirmation && (
                                    <p className="text-red-500 text-[11px] mt-0.5">{errors.password_confirmation}</p>
                                )}
                            </div>

                            {/* Role Selection */}
                            <div className="flex flex-col gap-2 mt-1">
                                <label className="text-[12px] font-bold text-gray-800">
                                    Saya mendaftar sebagai
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Donatur Card */}
                                    <label className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${role === 'donor' ? 'border-[#5170FF] bg-[#F5F7FF]' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                                        <input 
                                            type="radio" 
                                            name="role" 
                                            value="donor" 
                                            className="sr-only" 
                                            checked={role === 'donor'}
                                            onChange={() => setRole('donor')}
                                        />
                                        <div className="flex justify-between items-start mb-1.5">
                                            <span className="text-[13px] font-bold text-gray-900">Donatur</span>
                                            <div className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center ${role === 'donor' ? 'border-[#5170FF]' : 'border-gray-300'}`}>
                                                {role === 'donor' && <div className="w-[10px] h-[10px] rounded-full bg-[#5170FF]"></div>}
                                            </div>
                                        </div>
                                        <span className="text-[11px] text-gray-500 leading-tight">Saya ingin mendonasikan<br/>barang</span>
                                    </label>

                                    {/* Penerima Card */}
                                    <label className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${role === 'recipient' ? 'border-[#5170FF] bg-[#F5F7FF]' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                                        <input 
                                            type="radio" 
                                            name="role" 
                                            value="recipient" 
                                            className="sr-only" 
                                            checked={role === 'recipient'}
                                            onChange={() => setRole('recipient')}
                                        />
                                        <div className="flex justify-between items-start mb-1.5">
                                            <span className="text-[13px] font-bold text-gray-900">Penerima</span>
                                            <div className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center ${role === 'recipient' ? 'border-[#5170FF]' : 'border-gray-300'}`}>
                                                {role === 'recipient' && <div className="w-[10px] h-[10px] rounded-full bg-[#5170FF]"></div>}
                                            </div>
                                        </div>
                                        <span className="text-[11px] text-gray-500 leading-tight">Saya ingin mencari<br/>barang</span>
                                    </label>
                                </div>
                                {errors?.role && (
                                    <p className="text-red-500 text-[11px] mt-0.5">{errors.role}</p>
                                )}
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-2 mt-2">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    required
                                    name="terms"
                                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#5170FF] focus:ring-[#5170FF]"
                                />
                                <label htmlFor="terms" className="text-[11.5px] text-gray-800 font-bold leading-tight">
                                    Saya setuju dengan <span className="text-[#5170FF]">Syarat & Ketentuan</span> dan<br/><span className="text-[#5170FF]">Kebijakan Privasi</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-4 w-full py-2.5 bg-[#5170FF] hover:bg-[#405ce6] text-white text-[13px] font-bold rounded-[8px] transition-colors flex items-center justify-center gap-2"
                            >
                                {processing ? 'Memproses...' : 'Daftar Sekarang'}
                            </button>

                            <div className="text-center mt-3">
                                <p className="text-gray-800 text-[11.5px] font-bold">
                                    Sudah punya akun?{' '}
                                    <Link href={login()} className="text-[#5170FF] font-bold hover:underline">
                                        Masuk di sini
                                    </Link>
                                </p>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}

// Override default layout
Register.layout = (page: React.ReactNode) => <>{page}</>;
