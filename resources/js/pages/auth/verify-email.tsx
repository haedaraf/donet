import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import donateImage from '../../../../storage/app/public/Donatelogo.png';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-[#EDF1FF]">
            <Head title="Verifikasi Email" />

            <div className="bg-white rounded-[24px] p-8 w-full max-w-[460px] shadow-lg">
                <div className="mb-6 text-center flex flex-col items-center">
                    <div className="mb-4">
                        <img 
                            src={donateImage}
                            alt="Logo"
                            className="w-auto h-20 object-contain"
                        />
                    </div>
                    <h1 className="text-[20px] font-bold text-gray-900 mb-1">Verifikasi Email</h1>
                    <p className="text-[12px] text-gray-500">Silakan verifikasi alamat email Anda melalui tautan yang kami kirimkan.</p>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        Tautan verifikasi baru telah dikirimkan ke alamat email yang Anda berikan saat pendaftaran.
                    </div>
                )}

                <Form {...send.form()} className="space-y-6 text-center">
                    {({ processing }) => (
                        <>
                            <Button
                                disabled={processing}
                                className="w-full bg-[#5170FF] hover:bg-[#405ce6] text-white font-bold"
                            >
                                {processing && <Spinner className="mr-2" />}
                                Kirim Ulang Email Verifikasi
                            </Button>

                            <TextLink
                                href={logout()}
                                className="mx-auto block text-sm text-[#5170FF] font-medium hover:underline"
                            >
                                Keluar
                            </TextLink>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
