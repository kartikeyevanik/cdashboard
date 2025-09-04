import type { Metadata } from 'next'
import { Sidebar } from '@/components/sidebar'


export const metadata: Metadata = {
    title: 'Audit Log Viewer dashboard',
    description: 'View and filter audit logs in real-time on dashboard',
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex'>
            <Sidebar />
            {children}
        </div>
    )
}