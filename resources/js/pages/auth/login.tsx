import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { User, Key, Eye, EyeOff, ArrowRight } from 'lucide-react';
/* @chisel-registration */
import { register } from '@/routes';
/* @end-chisel-registration */
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import donateImage from '../../../../storage/app/public/Donatelogo.png';


type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-[#EDF1FF]">
            <Head title="Log in" />

            <div className="bg-white rounded-[24px] p-8 w-full max-w-[460px] shadow-lg">
                <div className="mb-6 text-center flex flex-col items-center">
                    <div className="mb-4">
                        <img 
                            src={donateImage}
                            alt="Logo"
                            className="w-auto h-20 object-contain"/>
                    </div>
                    <h1 className="text-[20px] font-bold text-gray-900 mb-1">Login</h1>
                    <p className="text-[12px] text-gray-500">Masuk ke akun DoanteYours Anda</p>
                </div>

                {status && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    disableWhileProcessing
                    className="flex flex-col gap-4"
                >
                    {({ processing, errors }: any) => (
                        <>
                            {/* Email / Username */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="text-[11px] font-bold text-gray-800">
                                    Email atau Nomor Telepon
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <User className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
                                    </div>
                                    <input
                                        id="email"
                                        type="text"
                                        required
                                        autoFocus
                                        name="email"
                                        placeholder="nama@gmail.com atau 089675378726"
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-[8px] text-[12px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#5170FF] focus:border-[#5170FF] placeholder:text-gray-300 transition-colors"
                                    />
                                </div>
                                {errors?.email && (
                                    <p className="text-red-500 text-[11px] mt-0.5">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="password" className="text-[11px] font-bold text-gray-800">
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
                                        placeholder="Masukkan password Anda"
                                        className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-[8px] text-[12px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#5170FF] focus:border-[#5170FF] placeholder:text-gray-300 transition-colors"
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

                            {/* Options Row */}
                            <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center gap-2">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        name="remember"
                                        className="h-[14px] w-[14px] rounded border-gray-300 text-[#5170FF] focus:ring-[#5170FF]"
                                    />
                                    <label htmlFor="remember" className="text-[11px] font-bold text-gray-800 cursor-pointer">
                                        Ingat Saya
                                    </label>
                                </div>

                                {canResetPassword && (
                                    <Link
                                        href={request()}
                                        className="text-[11px] font-semibold text-[#5170FF] hover:underline"
                                        tabIndex={5}
                                    >
                                        Lupa Password?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-3 w-full py-2.5 bg-[#5170FF] hover:bg-[#405ce6] text-white text-[13px] font-bold rounded-[8px] transition-colors flex items-center justify-center gap-2"
                            >
                                {processing ? 'Memproses...' : 'Masuk'}
                                <ArrowRight className="h-4 w-4 ml-1 opacity-80" strokeWidth={2} />
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-2">
                                <div className="h-[1px] w-full bg-gray-200"></div>
                                <span className="text-[10px] font-bold text-gray-800 whitespace-nowrap">atau masuk dengan</span>
                                <div className="h-[1px] w-full bg-gray-200"></div>
                            </div>

                            {/* Google Button */}
                            <button
                                type="button"
                                className="w-full py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-[12px] font-bold rounded-[8px] transition-colors flex items-center justify-center gap-2"
                            >
                                Google
                            </button>

                            {/* @chisel-registration */}
                            <div className="text-center mt-3">
                                <p className="text-gray-800 text-[11px] font-bold">
                                    Belum punya akun?{' '}
                                    <Link href={register()} className="text-[#5170FF] font-bold hover:underline">
                                        Daftar sekarang
                                    </Link>
                                </p>
                            </div>
                            {/* @end-chisel-registration */}
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}

// Override default layout so it displays correctly over the full background
Login.layout = (page: React.ReactNode) => <>{page}</>;
