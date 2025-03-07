import React from "react";
import { useParams } from "react-router-dom";

const CategoryPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // اینجا می‌توانید بر اساس `id` محصولات مربوط به این دسته‌بندی را از API یا آرایه‌ای دریافت کنید
    const products = [
        { id: 1, categoryId: 1, name: "موبایل سامسونگ", image: "https://via.placeholder.com/150" },
        { id: 2, categoryId: 1, name: "لپ‌تاپ ایسوس", image: "https://via.placeholder.com/150" },
        { id: 3, categoryId: 2, name: "تی‌شرت مردانه", image: "https://via.placeholder.com/150" },
        { id: 4, categoryId: 3, name: "قهوه‌ساز", image: "https://via.placeholder.com/150" },
    ];

    // فیلتر کردن محصولات مربوط به دسته‌بندی انتخاب‌شده
    const filteredProducts = products.filter((product) => product.categoryId === Number(id));

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">محصولات دسته‌بندی {id}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="p-4 bg-white rounded-lg shadow-md text-center">
                            <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2 rounded-lg" />
                            <p>{product.name}</p>
                        </div>
                    ))
                ) : (
                    <p>هیچ محصولی در این دسته‌بندی موجود نیست.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
