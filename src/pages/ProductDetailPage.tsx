import React from "react";
import { useParams } from "react-router-dom";

const products = [
    { id: 1, name: "موبایل سامسونگ گلکسی S21", image: "https://via.placeholder.com/150", seller: "فروشگاه سامسونگ", price: "25,000,000 تومان", stock: 10 },
    { id: 2, name: "موبایل اپل آیفون 13", image: "https://via.placeholder.com/150", seller: "فروشگاه اپل", price: "35,000,000 تومان", stock: 5 },
];

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return <p className="text-center text-red-500">محصول مورد نظر یافت نشد!</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4 rounded-lg" />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-700">فروشنده: {product.seller}</p>
                <p className="text-gray-900 font-semibold">قیمت: {product.price}</p>
                <p className="text-gray-600">موجودی: {product.stock} عدد</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg w-full">افزودن به سبد خرید</button>
            </div>
        </div>
    );
};

export default ProductDetailPage;
