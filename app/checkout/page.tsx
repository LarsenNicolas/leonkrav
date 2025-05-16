'use client'

import { useState, FormEvent } from 'react';
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { CartItem } from "@/store/useCartStore";

interface FormErrors {
    name?: string;
    address?: string;
    whatsapp?: string;
    email?: string;
    shippingMethod?: string;
    paymentMethod?: string;
}

const Checkout = () => {
    const router = useRouter();
    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);

    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [whatsapp, setWhatsapp] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [shippingMethod, setShippingMethod] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const total = cart.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0);

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
        if (!address.trim()) newErrors.address = 'La dirección es obligatoria.';
        if (!whatsapp.trim()) {
            newErrors.whatsapp = 'El número de WhatsApp es obligatorio.';
        } else if (!/^\d{10,15}$/.test(whatsapp)) {
            newErrors.whatsapp = 'Ingrese un número válido.';
        }
        if (!email.trim()) {
            newErrors.email = 'El email es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Email no válido.';
        }
        if (!shippingMethod) newErrors.shippingMethod = 'Seleccione un método de envío.';
        if (!paymentMethod) newErrors.paymentMethod = 'Seleccione un método de pago.';
        return newErrors;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        const newErrors = validate();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsProcessing(true);

            try {
                const response = await fetch('/api/mercadopago', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        email,
                        whatsapp,
                        address,
                        shippingMethod,
                        paymentMethod,
                        cart,
                    }),
                });

                if (!response.ok) throw new Error('Error al crear preferencia');

                const data = await response.json();
                console.log("data")
                console.log(data)

            } catch (err) {
                console.error(err);
                alert('Error al procesar el pago 😢');
                setIsProcessing(false);
            }
        }
    };

    return (
        <div className="container mx-auto p-4 min-h-screen">
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-60 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
                        <h3 className="text-2xl font-bold mb-2">¡Gracias por tu compra! 🎉</h3>
                        <p className="text-gray-600 mb-4">En breve serás redirigido al inicio.</p>
                        <div className="loader mx-auto border-t-4 border-black border-solid rounded-full w-8 h-8 animate-spin"></div>
                    </div>
                </div>
            )}

            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Finaliza tu Compra</h2>
                {cart.length === 0 ? (
                    <p className="text-gray-500">No hay productos en el carrito.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                            {submitted && errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Dirección</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                            {submitted && errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
                            <input
                                type="text"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                placeholder="Ej: 1123456789"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                            {submitted && errors.whatsapp && <p className="text-red-500 text-sm">{errors.whatsapp}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ej: ejemplo@mail.com"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                            {submitted && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Método de Envío</label>
                            <select
                                value={shippingMethod}
                                onChange={(e) => setShippingMethod(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="envio">Envío a domicilio</option>
                                <option value="retiro">Retiro en punto de venta</option>
                            </select>
                            {submitted && errors.shippingMethod &&
                                <p className="text-red-500 text-sm">{errors.shippingMethod}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="efectivo">Efectivo</option>
                                <option value="transferencia">Transferencia bancaria</option>
                            </select>
                            {submitted && errors.paymentMethod &&
                                <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
                        </div>

                        <div className="text-right">
                            <div className="mt-4">
                                <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
                            </div>
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`bg-black text-white px-4 py-4 my-8 rounded transition w-full md:w-1/3 ${
                                    isProcessing
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-white cursor-pointer'
                                }`}
                            >
                                {isProcessing ? 'Procesando...' : 'Confirmar Compra'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Checkout;
