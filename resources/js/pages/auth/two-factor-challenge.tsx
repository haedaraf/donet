import { Form, Head } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { store } from '@/routes/two-factor/login';
import donateImage from '../../../../storage/app/public/Donatelogo.png';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Kode Pemulihan',
                description:
                    'Harap konfirmasi akses ke akun Anda dengan memasukkan salah satu kode pemulihan darurat.',
                toggleText: 'masuk menggunakan kode autentikasi',
            };
        }

        return {
            title: 'Autentikasi Dua Faktor',
            description:
                'Masukkan kode autentikasi yang diberikan oleh aplikasi autentikator Anda.',
            toggleText: 'masuk menggunakan kode pemulihan',
        };
    }, [showRecoveryInput]);

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-[#EDF1FF]">
            <Head title="Two-factor authentication" />

            <div className="bg-white rounded-[24px] p-8 w-full max-w-[460px] shadow-lg">
                <div className="mb-6 text-center flex flex-col items-center">
                    <div className="mb-4">
                        <img 
                            src={donateImage}
                            alt="Logo"
                            className="w-auto h-20 object-contain"
                        />
                    </div>
                    <h1 className="text-[20px] font-bold text-gray-900 mb-1">{authConfigContent.title}</h1>
                    <p className="text-[12px] text-gray-500">{authConfigContent.description}</p>
                </div>

                <div className="space-y-6">
                    <Form
                        {...store.form()}
                        className="space-y-4"
                        resetOnError
                        resetOnSuccess={!showRecoveryInput}
                    >
                        {({ errors, processing, clearErrors }) => (
                            <>
                                {showRecoveryInput ? (
                                    <>
                                        <Input
                                            name="recovery_code"
                                            type="text"
                                            placeholder="Masukkan kode pemulihan"
                                            autoFocus={showRecoveryInput}
                                            required
                                        />
                                        <InputError
                                            message={errors.recovery_code}
                                        />
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center space-y-3 text-center">
                                        <div className="flex w-full items-center justify-center">
                                            <InputOTP
                                                name="code"
                                                maxLength={OTP_MAX_LENGTH}
                                                value={code}
                                                onChange={(value) => setCode(value)}
                                                disabled={processing}
                                                pattern={REGEXP_ONLY_DIGITS}
                                                autoFocus
                                            >
                                                <InputOTPGroup>
                                                    {Array.from(
                                                        { length: OTP_MAX_LENGTH },
                                                        (_, index) => (
                                                            <InputOTPSlot
                                                                key={index}
                                                                index={index}
                                                            />
                                                        ),
                                                    )}
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                        <InputError message={errors.code} />
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full bg-[#5170FF] hover:bg-[#405ce6] text-white font-bold"
                                    disabled={processing}
                                >
                                    Lanjutkan
                                </Button>

                                <div className="text-center text-sm text-muted-foreground">
                                    <span>atau Anda dapat </span>
                                    <button
                                        type="button"
                                        className="cursor-pointer text-[#5170FF] font-bold hover:underline"
                                        onClick={() =>
                                            toggleRecoveryMode(clearErrors)
                                        }
                                    >
                                        {authConfigContent.toggleText}
                                    </button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}
