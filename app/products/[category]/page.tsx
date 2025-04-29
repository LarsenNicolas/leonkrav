'use client';

import Link from "next/link";
import { toast } from "react-toastify";
import { useSearchParams, useParams, usePathname, useRouter } from "next/navigation";
import products from "../../../mock/products";
import categoriesData from "../../../mock/categories";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: number;
}

export default function CategoryProductsPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const category = Number(params.category);
    const searchTerm = searchParams.get('search') || "";
    const sortOrder = searchParams.get('sort') || "";

    // Función de filtrado
    const filterProducts = () => {
        let result = products.filter(p => p.category === category);

        if (searchTerm.trim()) {
            result = result.filter((p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortOrder === "asc") {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        if (result.length === 0) {
            toast.warning("No hay productos en esta categoría con los filtros aplicados.");
        }

        return result;
    };

    const filteredProducts = filterProducts();

    // Manejar envío del formulario (CORREGIDO)
    const handleSearch = (formData: FormData) => {
        const newParams = new URLSearchParams(searchParams.toString());

        formData.forEach((value, key) => {
            if (value) newParams.set(key, value.toString());
            else newParams.delete(key);
        });

        router.replace(`${pathname}?${newParams.toString()}`);
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <form action={handleSearch} className="mb-6 flex flex-col md:flex-row items-center gap-4 justify-between">
                <input
                    type="text"
                    name="search"
                    placeholder="Buscar por nombre..."
                    defaultValue={searchTerm}
                    className="border px-4 py-2 rounded-md w-full md:w-1/3"
                />

                <select
                    className="border px-4 py-2 rounded-md w-full md:w-1/3"
                    value={category}
                    onChange={(e) => router.push(`/products/${e.target.value}`)}
                >
                    <option value="">Todas las categorías</option>
                    {categoriesData.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <select
                    name="sort"
                    defaultValue={sortOrder}
                    className="border px-4 py-2 rounded-md w-full md:w-1/3"
                >
                    <option value="">Ordenar por precio</option>
                    <option value="asc">Menor a mayor</option>
                    <option value="desc">Mayor a menor</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
                >
                    Filtrar
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {filteredProducts.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="block"
                    >
                        <div className="relative w-full h-[32rem] rounded-md overflow-hidden shadow-lg group">
                            <img
                                src={product.image}
                                alt={`Imagen de ${product.name}`}
                                className="w-full h-full object-cover rounded-md transition-all duration-300 brightness-100 md:brightness-50 md:group-hover:brightness-100"
                            />

                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white px-4 py-4">
                                <h2 className="text-xl font-semibold truncate">{product.name}</h2>
                                <p className="text-lg font-medium">${product.price}</p>
                                <p className="text-sm mt-1 truncate">{product.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}