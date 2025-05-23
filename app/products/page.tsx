import { Suspense } from 'react';
import ProductsContent from './ProductsContent';
import { LoadingSpinner } from '@/lib/components/LoadingSpinner';
import { getProducts } from '@/services/products';

export default async function ProductsPage() {

    const products = await getProducts();

    console.log(products)

    return (
        <Suspense fallback={
            <div className="text-center py-20">
                <LoadingSpinner size="lg" className="text-primary" />
                <p className="mt-4">Cargando contenido...</p>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
