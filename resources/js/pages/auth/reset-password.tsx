import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';
import donateImage from '../../../../storage/app/public/Donatelogo.png';

type Props = {
    token: string;
    email: string;
    passwordRules: string;
};

export default function ResetPassword({ token, email, passwordRules }: Props) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-[#EDF1FF]">
            <Head title="Reset Kata Sandi" />

            <div className="bg-white rounded-[24px] p-8 w-full max-w-[460px] shadow-lg">
                <div className="mb-6 text-center flex flex-col items-center">
                    <div className="mb-4">
                        <img 
                            src={donateImage}
                            alt="Logo"
                            className="w-auto h-20 object-contain"
                        />
                    </div>
                    <h1 className="text-[20px] font-bold text-gray-900 mb-1">Reset Kata Sandi</h1>
                    <p className="text-[12px] text-gray-500">Masukkan kata sandi baru Anda di bawah ini</p>
                </div>

                <Form
                    {...update.form()}
                    transform={(data) => ({ ...data, token, email })}
                    resetOnSuccess={['password', 'password_confirmation']}
                >
                    {({ processing, errors }) => (
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-[11px] font-bold text-gray-800">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    className="mt-1 block w-full bg-gray-50"
                                    readOnly
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-[11px] font-bold text-gray-800">Kata Sandi Baru</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    autoComplete="new-password"
                                    className="mt-1 block w-full"
                                    autoFocus
                                    placeholder="Kata Sandi Baru"
                                    passwordrules={passwordRules}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="text-[11px] font-bold text-gray-800">
                                    Konfirmasi Kata Sandi
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    className="mt-1 block w-full"
                                    placeholder="Konfirmasi Kata Sandi"
                                    passwordrules={passwordRules}
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full bg-[#5170FF] hover:bg-[#405ce6] text-white font-bold"
                                disabled={processing}
                                data-test="reset-password-button"
                            >
                                {processing && <Spinner className="mr-2" />}
                                Simpan Kata Sandi Baru
                            </Button>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
}
