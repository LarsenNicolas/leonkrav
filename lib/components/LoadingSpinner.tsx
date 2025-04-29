import { cn } from '@/lib/utils';

export const LoadingSpinner = ({
   className,
   size = 'md',
}: {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}) => {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    return (
        <div className={cn('flex justify-center items-center', className)}>
            <div
                className={cn(
                    'animate-spin rounded-full border-2 border-current border-t-transparent',
                    sizes[size]
                )}
                style={{ animationDuration: '1.2s' }}
                role="status"
            >
                <span className="sr-only">Cargando...</span>
            </div>
        </div>
    );
};

export const SkeletonLoader = ({ className }: { className?: string }) => (
    <div className={cn('animate-pulse bg-gray-200 rounded-md', className)} />
);