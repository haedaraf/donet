import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { email } from '@/routes/password';
import donateImage from '../../../../storage/app/public/Donatelogo.png';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-[#EDF1FF]">
            <Head title="Lupa Kata Sandi" />

            <div className="bg-white rounded-[24px] p-8 w-full max-w-[460px] shadow-lg">
                <div className="mb-6 text-center flex flex-col items-center">
                    <div className="mb-4">
                        <img 
                            src={donateImage}
                            alt="Logo"
                            className="w-auto h-20 object-contain"
                        />
                    </div>
                    <h1 className="text-[20px] font-bold text-gray-900 mb-1">Lupa Kata Sandi</h1>
                    <p className="text-[12px] text-gray-500">Masukkan email Anda untuk menerima link reset kata sandi</p>
                </div>

                {status && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <div className="space-y-6">
                    <Form {...email.form()}>
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-[11px] font-bold text-gray-800">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="off"
                                        autoFocus
                                        placeholder="nama@email.com"
                                    />

                                    <InputError message={errors.email} />
                                </div>

                                <div className="my-6 flex items-center justify-start">
                                    <Button
                                        className="w-full bg-[#5170FF] hover:bg-[#405ce6] text-white font-bold"
                                        disabled={processing}
                                        data-test="email-password-reset-link-button"
                                    >
                                        {processing && (
                                            <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                        )}
                                        Kirim Link Reset Kata Sandi
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>

                    <div className="space-x-1 text-center text-sm text-muted-foreground">
                        <span>Kembali ke </span>
                        <TextLink href={login()} className="text-[#5170FF] font-bold">Masuk</TextLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
