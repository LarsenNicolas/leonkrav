import './globals.css'
import type { Metadata } from 'next'
import ClientLayout from './ClientLayout'

export const metadata: Metadata = {
    title: 'Tu título acá',
    description: 'Una descripción opcional',
    icons: {
        icon: '/logo.png',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full">
            <ClientLayout>{children}</ClientLayout>
        </html>
    )
}
