import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
};

export type CartItem = {
    product: Product;
    quantity: number;
};

type CartStore = {
    cart: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    getTotalItems: () => number; // Nueva función útil
    getTotalPrice: () => number; // Nueva función útil
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product, quantity) => {
                const existingItem = get().cart.find(
                    (item) => item.product.id === product.id
                );

                if (existingItem) {
                    set({
                        cart: get().cart.map((item) =>
                            item.product.id === product.id
                                ? {
                                    ...item,
                                    quantity: item.quantity + quantity
                                }
                                : item
                        ),
                    });
                } else {
                    set({
                        cart: [...get().cart, {
                            product,
                            quantity: quantity > 0 ? quantity : 1
                        }]
                    });
                }
            },
            removeFromCart: (productId) => {
                set({
                    cart: get().cart.filter(
                        (item) => item.product.id !== productId
                    ),
                });
            },
            clearCart: () => set({ cart: [] }),
            getTotalItems: () => {
                return get().cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                );
            },
            getTotalPrice: () => {
                return get().cart.reduce(
                    (total, item) => total + (item.quantity * item.product.price),
                    0
                );
            }
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
