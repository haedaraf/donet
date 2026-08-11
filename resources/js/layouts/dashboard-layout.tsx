import { ReactNode } from 'react';
import { RoleSidebar } from '@/components/role-sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <RoleSidebar />
            <main className="flex-1 ml-65">
                {children}
            </main>
        </div>
    );
}
