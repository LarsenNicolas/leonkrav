import { useEffect, useState } from "react";
import { TagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import {useCartStore} from "@/store/useCartStore";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
    const cart = useCartStore((state) => state.cart);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [showNav, setShowNav] = useState(true);
    const [scrollTimeout, setScrollTimeout] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (!isHome) {
            setShowNav(true);
            return;
        }

        const handleScroll = () => {
            setShowNav(true);
            if (scrollTimeout) clearTimeout(scrollTimeout);

            const timeout = setTimeout(() => {
                setShowNav(false);
            }, 2000);

            setScrollTimeout(timeout);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, [isHome, scrollTimeout]);

    return (
        <nav className="w-full px-4 py-4 flex justify-between items-center bg-black">
            {/* Logo */}
            <Link href="/" className="text-[#343C43]">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-8 invert brightness-200 contrast-200"
                />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex space-x-6">
                <Link href="/products" className="flex relative group">
                    <span className="text-white hover:text-[#d8b444] px-2 text-sm font-mono cursor-pointer">PRODUCTOS</span>
                </Link>
                <Link href="/products" className="flex relative group">
                    <span className="text-white hover:text-[#d8b444] px-2 text-sm font-mono cursor-pointer">NOSOTROS</span>
                </Link>
                <Link href="/products" className="flex relative group">
                    <span className="text-white hover:text-[#d8b444] px-2 text-sm font-mono cursor-pointer">CONTACTANOS</span>
                </Link>
            </div>
            <div className="hidden md:flex space-x-6">
                    <Link href="/cart" className="relative group">
                        <ShoppingCartIcon
                            className="w-7 h-7 text-white hover:text-[#d8b444] transition-transform group-hover:scale-110 duration-300"/>
                        {totalItems > 0 && (
                            <span
                                className="absolute -top-2 -right-2 bg-[#d8b444] text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                    </span>
                        )}
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>

                {/* Fullscreen mobile menu */}
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 space-y-8 text-[#343C43]">
                        <Link href="/" className="text-[#343C43]">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-18 invert brightness-200 contrast-200"
                            />
                        </Link>
                        <Link href="/products" className="relative group">
                            <span className="text-white hover:text-[#d8b444] text-xl font-mono cursor-pointer">Productos</span>
                        </Link>
                        <Link href="/products" className="relative group">
                            <span className="text-white hover:text-[#d8b444] text-xl font-mono cursor-pointer">Nosotros</span>
                        </Link>
                        <Link href="/products" className="relative group">
                            <span className="text-white hover:text-[#d8b444] text-xl font-mono cursor-pointer">Contactanos</span>
                        </Link>
                        <Link href="/cart" className="relative group">
                            <ShoppingCartIcon
                                className="w-7 h-7 text-white transition-transform group-hover:scale-110 duration-300"/>
                            {totalItems > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 bg-[#d8b444] text-white hover:text-[#d8b444] text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                    </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-6 right-6 text-white"
                        >
                            ✕
                        </button>
                    </div>
                )}
        </nav>
);
};

export default Navbar;
