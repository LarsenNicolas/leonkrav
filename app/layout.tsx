'use client'

import { ParallaxProvider } from 'react-scroll-parallax'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import Footer from "@/components/Footer";

const ToastContainer = dynamic(
    () => import('react-toastify').then(mod => mod.ToastContainer),
    { ssr: false }
)

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full">
        <body className="flex flex-col min-h-screen">
        <ParallaxProvider>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <ToastContainer />
        </ParallaxProvider>
        </body>
        </html>
    )
}