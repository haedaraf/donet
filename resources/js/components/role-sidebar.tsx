import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Box, 
    History, 
    MessageSquare, 
    Bell, 
    UserIcon, 
    Settings, 
    LogOut,
    Search,
    FileText,
    Users
} from 'lucide-react';
import { dashboard } from '@/routes';
import { Auth } from '@/types';

export function RoleSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const role = auth.user.role || 'donor'; // fallback
    const url = usePage().url;

    // Define menus based on roles
    const menus = {
        donor: [
            { name: 'Dashboard', icon: LayoutGrid, href: dashboard(), active: url === '/dashboard' },
            { name: 'Barang Saya', icon: Box, href: '/donations', active: url.startsWith('/donations'), badge: null },
            { name: 'Riwayat Donasi', icon: History, href: '#', badge: null },
            { name: 'Pesan Masuk', icon: MessageSquare, href: '#', badge: 3 },
            { name: 'Notifikasi', icon: Bell, href: '#', badge: 1 },
            { name: 'Profil Saya', icon: UserIcon, href: '/settings/profile', active: url.startsWith('/settings/profile'), badge: null },
            { name: 'Pengaturan', icon: Settings, href: '#', badge: null },
        ],
        recipient: [
            { name: 'Dashboard', icon: LayoutGrid, href: dashboard(), active: url === '/dashboard' },
            { name: 'Cari Barang', icon: Search, href: '/explore', active: url.startsWith('/explore'), badge: null },
            { name: 'Permintaan Saya', icon: FileText, href: '/requests', active: url.startsWith('/requests'), badge: null },
            { name: 'Riwayat Saya', icon: History, href: '#', badge: null },
            { name: 'Pesan Masuk', icon: MessageSquare, href: '#', badge: 3 },
            { name: 'Notifikasi', icon: Bell, href: '#', badge: 1 },
            { name: 'Profil Saya', icon: UserIcon, href: '/settings/profile', active: url.startsWith('/settings/profile'), badge: null },
            { name: 'Pengaturan', icon: Settings, href: '#', badge: null },
        ],
        admin: [
            { name: 'Dashboard', icon: LayoutGrid, href: dashboard(), active: url.startsWith('/dashboard') },
            { name: 'Manajemen Pengguna', icon: Users, href: '#', badge: null },
            { name: 'Manajemen Donasi', icon: Box, href: '#', badge: null },
            { name: 'Laporan', icon: FileText, href: '#', badge: null },
            { name: 'Pesan Masuk', icon: MessageSquare, href: '#', badge: null },
            { name: 'Notifikasi', icon: Bell, href: '#', badge: null },
            { name: 'Profil Saya', icon: UserIcon, href: '/settings/profile', active: url.startsWith('/settings/profile'), badge: null },
            { name: 'Pengaturan', icon: Settings, href: '#', badge: null },
        ]
    };

    const activeMenu = menus[role] || menus.donor;
    
    // Determine display role name
    let displayRole = 'Donatur Aktif';
    if (role === 'recipient') displayRole = 'Penerima';
    else if (role === 'admin') displayRole = 'Administrator';

    return (
        <aside className="w-65 h-screen bg-white border-r border-gray-100 flex flex-col fixed top-0 left-0 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-8">
                <svg width="24" height="30" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="0" width="12" height="40" rx="6" fill="#5170FF" />
                    <path d="M20 16C13.3726 16 8 21.3726 8 28C8 34.6274 13.3726 40 20 40V16Z" fill="#5170FF" />
                </svg>
                <span className="font-bold text-[#5170FF] text-[15px] tracking-wide">Donate Yours</span>
            </div>

            {/* User Profile Snippet */}
            <div className="px-6 mb-6 flex items-center gap-3">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {auth.user.avatar ? (
                            <img src={auth.user.avatar.startsWith('http') ? auth.user.avatar : `/storage/${auth.user.avatar}`} alt={auth.user.name} className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon className="w-5 h-5 text-gray-400" />
                        )}
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-gray-900 leading-tight">{auth.user.name}</span>
                    <span className="text-[11px] text-gray-400 mt-0.5">{displayRole}</span>
                </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-4 flex flex-col gap-1 mb-8">
                {activeMenu.map((item, index) => {
                    const isActive = item.active;
                    return (
                        <Link 
                            key={index} 
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-colors ${
                                isActive 
                                ? 'bg-[#F2F4FF] text-[#5170FF]' 
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="w-4.5 h-4.5" strokeWidth={isActive ? 2.5 : 2} />
                                <span className={`text-[13px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                                    {item.name}
                                </span>
                            </div>
                            {item.badge && (
                                <div className="min-w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold px-1.5">
                                    {item.badge}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="px-4 pb-8 mt-auto border-t border-gray-100 pt-4">
                <Link 
                    href="/logout" 
                    method="post" 
                    as="button"
                    className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors"
                >
                    <LogOut className="w-4.5 h-4.5" strokeWidth={2} />
                    <span className="text-[13px] font-medium">Keluar</span>
                </Link>
            </div>
        </aside>
    );
}
