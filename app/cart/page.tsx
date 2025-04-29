'use client';

import { useCartStore } from "@/store/useCartStore";
import { Trash2 } from "lucide-react";
import Button from "@/lib/components/Button";
import { useRouter } from "next/navigation";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

interface CartItem {
    product: Product;
    quantity: number;
}

const Cart = () => {
    const router = useRouter();
    const cart = useCartStore((state) => state.cart) as CartItem[];
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const handleCheckout = () => {
        router.push('/checkout');
    };

    const total = cart.reduce(
        (acc: number, item: CartItem) => acc + item.quantity * item.product.price,
        0
    );

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Tu carrito</h2>

            {cart.length === 0 ? (
                <p className="text-gray-500">No hay productos en el carrito.</p>
            ) : (
                <div className="space-y-6">
                    {cart.map((item: CartItem) => (
                        <div
                            key={item.product.id}
                            className="flex flex-col sm:flex-row items-center gap-6 bg-white rounded-xl shadow-md p-4"
                        >
                            <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full sm:w-32 h-32 object-cover rounded-md"
                            />

                            <div className="flex-1 w-full space-y-2 text-center sm:text-left">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {item.product.name}
                                </h3>
                                <p className="text-gray-600">{item.product.description}</p>
                                <div
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-1 sm:gap-4 mt-2">
                                    <span className="text-gray-700">
                                        Cantidad: <strong>{item.quantity}</strong>
                                    </span>
                                    <span className="text-gray-700">
                                        Precio unitario: ${item.product.price}
                                    </span>
                                    <span className="font-semibold text-primary">
                                        Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-red-500 hover:text-red-700 transition"
                                title="Quitar del carrito"
                            >
                                <Trash2 className="w-6 h-6"/>
                            </button>
                        </div>
                    ))}

                    <div className="mt-8 text-right">
                        <p className="text-xl font-bold text-gray-800">
                            Total: ${total.toFixed(2)}
                        </p>
                        <Button
                            onClick={handleCheckout}
                        >
                            Finalizar compra
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
