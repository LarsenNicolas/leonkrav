'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import products from '../../mock/products';
import categoriesData from '../../mock/categories';

const ProductsContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const searchTerm = searchParams?.get('search') || '';
    const selectedCategory = searchParams?.get('category') || '';
    const sortOrder = searchParams?.get('sort') || '';

    const filteredProducts = useMemo(() => {
        let result = products;

        if (selectedCategory) {
            result = result.filter(
                (p) => p.category === parseInt(selectedCategory, 10)
            );
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter((p) =>
                p.name.toLowerCase().includes(term)
            );
        }

        if (sortOrder === 'asc') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [searchTerm, selectedCategory, sortOrder]);

    useEffect(() => {
        if (filteredProducts.length === 0 && (searchTerm || selectedCategory)) {
            toast.warning('No hay productos con los filtros aplicados');
        }
    }, [filteredProducts.length, searchTerm, selectedCategory]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const params = new URLSearchParams();

        formData.forEach((value, key) => {
            if (value) params.set(key, value.toString());
        });

        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <form
                onSubmit={handleSubmit}
                className="mb-6 flex flex-col md:flex-row items-center gap-4 justify-between"
            >
                <input
                    type="text"
                    name="search"
                    placeholder="Buscar por nombre..."
                    defaultValue={searchTerm}
                    className="border px-4 py-2 rounded-md w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <select
                    name="category"
                    defaultValue={selectedCategory}
                    className="border px-4 py-2 rounded-md w-full md:w-1/3 bg-white"
                >
                    <option value="">Todas las categorías</option>
                    {categoriesData.map((cat) => (
                        <option key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <select
                    name="sort"
                    defaultValue={sortOrder}
                    className="border px-4 py-2 rounded-md w-full md:w-1/3 bg-white"
                >
                    <option value="">Ordenar por precio</option>
                    <option value="asc">Menor a mayor</option>
                    <option value="desc">Mayor a menor</option>
                </select>

                <button
                    type="submit"
                    className={cn(
                        'bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto',
                        'hover:bg-blue-600 transition-colors duration-200'
                    )}
                >
                    Filtrar
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {filteredProducts.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="block group relative"
                        prefetch={false}
                    >
                        <div className="relative w-full h-[32rem] rounded-md overflow-hidden shadow-lg">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                                <h2 className="text-xl font-semibold truncate">{product.name}</h2>
                                <p className="text-lg font-medium mt-1">
                                    {new Intl.NumberFormat('es-AR', {
                                        style: 'currency',
                                        currency: 'ARS'
                                    }).format(product.price)}
                                </p>
                                <p className="text-sm mt-2 line-clamp-2">{product.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductsContent;
