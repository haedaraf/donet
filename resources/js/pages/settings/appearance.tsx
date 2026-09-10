import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import DashboardLayout from '@/layouts/dashboard-layout';

export default function Appearance() {
    return (
        <DashboardLayout>
            <Head title="Pengaturan Tampilan" />

            <div className="p-8 max-w-4xl space-y-6">
                <Heading
                    variant="small"
                    title="Pengaturan Tampilan"
                    description="DonateYours menggunakan tema terang bernuansa hangat."
                />
            </div>
        </DashboardLayout>
    );
}
