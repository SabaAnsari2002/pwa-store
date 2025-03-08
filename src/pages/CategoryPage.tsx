import React from "react";
import { useParams, Link } from "react-router-dom";

const CategoryPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // اینجا می‌توانید بر اساس id محصولات مربوط به این دسته‌بندی را از API یا آرایه‌ای دریافت کنید
    const products = [
        { id: 1, categoryId: 1, name: "موبایل سامسونگ", image: "https://via.placeholder.com/150" },
        { id: 2, categoryId: 1, name: "لپ‌تاپ ایسوس", image: "https://via.placeholder.com/150" },
        { id: 3, categoryId: 2, name: "تی‌شرت مردانه", image: "https://via.placeholder.com/150" },
        { id: 4, categoryId: 2, name: "شلوار جین مردانه", image: "https://via.placeholder.com/150" },
        { id: 5, categoryId: 3, name: "مبل کلاسیک", image: "https://via.placeholder.com/150" },
        { id: 6, categoryId: 3, name: "میز ناهارخوری", image: "https://via.placeholder.com/150" },
        { id: 7, categoryId: 4, name: "شیرینی خشک", image: "https://via.placeholder.com/150" },
        { id: 8, categoryId: 4, name: "نوشابه انرژی‌زا", image: "https://via.placeholder.com/150" },
        { id: 9, categoryId: 5, name: "کتاب رمان", image: "https://via.placeholder.com/150" },
        { id: 10, categoryId: 5, name: "دفتر یادداشت", image: "https://via.placeholder.com/150" },
        { id: 11, categoryId: 1, name: "هدفون بی‌سیم", image: "https://via.placeholder.com/150" },
        { id: 12, categoryId: 2, name: "کفش ورزشی", image: "https://via.placeholder.com/150" },
        { id: 13, categoryId: 3, name: "پرده طرح دار", image: "https://via.placeholder.com/150" },
        { id: 14, categoryId: 4, name: "چای سبز", image: "https://via.placeholder.com/150" },
        { id: 15, categoryId: 5, name: "خودکار رنگی", image: "https://via.placeholder.com/150" },
    ];

    // فیلتر کردن محصولات مربوط به دسته‌بندی انتخاب‌شده
    const filteredProducts = products.filter((product) => product.categoryId === Number(id));

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">محصولات دسته‌بندی {id}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={`/subcategory/${product.id}`}
                            className="p-4 bg-white rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
                        >
                            <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2 rounded-lg" />
                            <p>{product.name}</p>
                        </Link>
                    ))
                ) : (
                    <p>هیچ محصولی در این دسته‌بندی موجود نیست.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;