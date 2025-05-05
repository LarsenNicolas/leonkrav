'use client'

import { ParallaxProvider } from 'react-scroll-parallax'
import { LoadingSpinner } from '@/lib/components/LoadingSpinner'
import dynamic from 'next/dynamic'
import Navbar from '@/lib/components/Navbar'
import Footer from '@/lib/components/Footer'
import { Suspense } from 'react'
import 'react-toastify/dist/ReactToastify.css'

const ToastContainer = dynamic(
    () => import('react-toastify').then((mod) => mod.ToastContainer),
    { ssr: false }
)

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <body className="flex flex-col min-h-screen">
        <Suspense
            fallback={
                <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <LoadingSpinner size="lg" />
                </div>
            }
        >
            <ParallaxProvider>
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
                <ToastContainer />
            </ParallaxProvider>
        </Suspense>
        </body>
    )
}
