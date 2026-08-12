import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function Index({ donations }: { donations: any[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
            destroy(`/donations/${id}`);
        }
    };

    return (
        <DashboardLayout>
            <Head title="Barang Saya" />
            <div className="p-8 min-w-full max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-[28px] font-bold text-gray-900">Barang Saya</h1>
                        <p className="text-[15px] font-semibold text-gray-900 mt-1">Kelola barang donasi Anda di sini.</p>
                    </div>
                    <Link 
                        href="/donations/create" 
                        className="bg-[#5170FF] hover:bg-[#405ce6] text-white px-6 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors shadow-sm"
                    >
                        <Plus className="w-4 h-4" strokeWidth={3} />
                        Tambah Barang
                    </Link>
                </div>

                <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-6 py-4 text-[12px] font-bold text-gray-900 w-[30%]">Barang</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-gray-900 w-[20%]">Status</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-gray-900 w-[15%]">Kondisi</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-gray-900 w-[15%]">Jumlah</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-gray-900 w-[20%] text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {donations.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-[13px] text-gray-500 font-medium">
                                        Belum ada barang donasi.
                                    </td>
                                </tr>
                            ) : (
                                donations.map((donation) => (
                                    <tr key={donation.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded shrink-0 overflow-hidden">
                                                    {donation.images && donation.images.length > 0 ? (
                                                        <img 
                                                            src={`/storage/${donation.images.find((i: any) => i.is_primary)?.image || donation.images[0].image}`} 
                                                            alt={donation.title} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : null}
                                                </div>
                                                <span className="text-[13px] text-gray-900 font-bold">{donation.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-3 py-1 text-[11px] font-medium text-[#5170FF] border border-[#5170FF] rounded-md bg-[#F5F7FF] capitalize">
                                                {donation.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[13px] text-gray-700 font-medium capitalize">
                                            {donation.condition.replace('_', ' ')}
                                        </td>
                                        <td className="px-6 py-4 text-[13px] text-gray-700 font-medium">
                                            {donation.quantity}
                                        </td>
                                        <td className="px-6 py-4 text-right flex justify-end gap-3">
                                            <Link href={`/donations/${donation.id}/edit`} className="text-gray-400 hover:text-[#5170FF] transition-colors">
                                                <Edit className="w-4.5 h-4.5" />
                                            </Link>
                                            <button onClick={() => handleDelete(donation.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4.5 h-4.5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}

Index.layout = (page: React.ReactNode) => <>{page}</>;
