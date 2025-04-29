
import products from "../../mock/products";
import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import Button from "../components/Button.jsx";
import { toast } from "react-toastify";
import { CheckCircle } from "lucide-react";
import sizeList from "../../mock/size.js";
import qualitiesList from "../../mock/qualities.js";

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find((p) => String(p.id) === id);
    const [quantity, setQuantity] = useState(1);
    const addToCart = useCartStore((state) => state.addToCart);

    if (!product) {
        return (
            <div className="text-center mt-16">
                <h2 className="text-2xl font-semibold text-gray-700">Producto no encontrado</h2>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success("Agregaste " + product.name + " a tu carrito de compras.", {
            icon: <CheckCircle className="text-[#a5732db5]" />,
            style: {
                color: "#a5732db5",
                borderRadius: "8px",
                fontSize: "20px",
                width: "100%",
            },
        });
    };

    // Formatear precio
    const formattedPrice = new Intl.NumberFormat("es-AR").format(product.price);

    return (
        <div className="container mx-auto mt-14 mb-20 px-4">
            <div className="flex flex-col md:flex-row gap-10 md:gap-14">
                {/* Imagen */}
                <div className="w-full md:w-1/2 rounded-lg shadow-md overflow-hidden">
                    <img
                        src={product.image}
                        alt={`Imagen de ${product.name}`}
                        className="w-full h-[500px] object-cover brightness-95 hover:brightness-100 transition duration-300"
                    />
                </div>

                {/* Info */}
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    {/* Detalles */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

                        <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

                        {product.longDescription && (
                            <p className="text-gray-600 text-base italic">{product.longDescription}</p>
                        )}

                        <div className="space-y-2 text-gray-700 text-base">
                            <p><span className="font-semibold">Color:</span> {product.color}</p>

                            {product.size.length > 0 && (
                                <p>
                                    <span className="font-semibold">Talle:</span>{" "}
                                    {product.size.map((id) => sizeList.find((s) => s.id === id)?.name).join(", ")}
                                </p>
                            )}
                        </div>

                        {product.qualities.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {product.qualities.map((id) => {
                                    const q = qualitiesList.find((q) => q.id === id);
                                    return (
                                        <span
                                            key={id}
                                            className="px-3 py-1 text-sm rounded-full bg-[#e8e2db] text-[#7a5b2d] font-medium"
                                        >
                                            {q?.name}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Precio + Agregar */}
                    <div className="mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
                        <p className="text-3xl font-bold text-primary mb-10">${formattedPrice}</p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                            <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-full sm:w-20 px-3 py-2 border border-gray-300 rounded-md text-center text-lg"
                            />
                            <Button onClick={handleAddToCart} className="w-full sm:w-auto px-6 py-3 text-lg">
                                Agregar al carrito
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
