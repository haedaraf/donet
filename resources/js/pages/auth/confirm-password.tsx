import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';
import donateImage from '../../../../storage/app/public/Donatelogo.png';
/* @chisel-passkeys */
import {
    index as confirmOptions,
    store as confirmStore,
} from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController';
import PasskeyVerify from '@/components/passkey-verify';
/* @end-chisel-passkeys */

export default function ConfirmPassword() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-[#EDF1FF]">
            <Head title="Konfirmasi Kata Sandi" />

            <div className="bg-white rounded-[24px] p-8 w-full max-w-[460px] shadow-lg">
                <div className="mb-6 text-center flex flex-col items-center">
                    <div className="mb-4">
                        <img 
                            src={donateImage}
                            alt="Logo"
                            className="w-auto h-20 object-contain"
                        />
                    </div>
                    <h1 className="text-[20px] font-bold text-gray-900 mb-1">Konfirmasi Kata Sandi</h1>
                    <p className="text-[12px] text-gray-500">Ini adalah area aman. Harap konfirmasi kata sandi Anda sebelum melanjutkan.</p>
                </div>

                {/* @chisel-passkeys */}
                <PasskeyVerify
                    routes={{
                        options: confirmOptions(),
                        submit: confirmStore(),
                    }}
                    label="Confirm with passkey"
                    loadingLabel="Confirming..."
                    separator="Or confirm with password"
                />
                {/* @end-chisel-passkeys */}

                <Form {...store.form()} resetOnSuccess={['password']}>
                    {({ processing, errors }) => (
                        <div className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-[11px] font-bold text-gray-800">Password</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    autoFocus
                                />

                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center">
                                <Button
                                    className="w-full bg-[#5170FF] hover:bg-[#405ce6] text-white font-bold"
                                    disabled={processing}
                                    data-test="confirm-password-button"
                                >
                                    {processing && <Spinner className="mr-2" />}
                                    Konfirmasi Kata Sandi
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
}
