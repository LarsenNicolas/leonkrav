'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import categories from "@/mock/categories";
import dynamic from "next/dynamic";
import Image from "next/image";

const Parallax = dynamic(
    () => import("react-scroll-parallax").then((mod) => mod.Parallax),
    { ssr: false }
);

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Home() {
    return (
        <div className="w-full mx-auto">

            <div
                className="relative w-full h-screen bg-fixed bg-center bg-cover"
                style={{ backgroundImage: 'url(/hero.png)' }}
            >
                <div className="absolute inset-0 mix-blend-multiply"></div>

                <div className="relative z-10 flex flex-col justify-center h-full text-white text-center px-4">
                    <h1 className="text-5xl sm:text-7xl font-bold drop-shadow-md">
                        LEONKRAV
                    </h1>
                </div>
            </div>

            {categories.map((category, i) => (
                <Link
                    href={`/products/${category.id}`} // Cambiar 'to' por 'href'
                    key={category.id} // Mover key aquí
                >
                    <motion.section
                        className={`flex flex-col ${
                            i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
                        } items-center justify-center overflow-hidden py-12`}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                    >
                        {/* Imagen */}
                        <div className="w-full md:w-1/2 overflow-hidden group relative">
                            <Parallax speed={-10}>
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    width={800} // Ajustar según necesidades
                                    height={600}
                                    className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                                />
                            </Parallax>
                        </div>

                        {/* Título */}
                        <motion.div
                            className="w-full md:w-1/2 flex items-center justify-center px-4 mt-6 md:mt-0 text-center"
                            initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900">
                                {category.name}
                            </h2>
                        </motion.div>
                    </motion.section>
                </Link>
            ))}

        </div>
    );
};