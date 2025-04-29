import { LoadingSpinner } from '@/lib/components/LoadingSpinner';

export default function ProductsLoading() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <LoadingSpinner size="lg" className="text-blue-600" />
            <span className="ml-2 text-lg">Cargando productos...</span>
        </div>
    );
}