import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, Category, Subcategory } from "../data/categories";

const Shop: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleFilter = (id: number | null) => {
        setSelectedCategory(id);
    };

    const handleSubCategoryClick = (subCategoryName: string) => {
        const encodedName = encodeURIComponent(subCategoryName);
        navigate(`/subcategory-products/${encodedName}`);
}   ;

    const filteredCategories = selectedCategory
        ? categories.filter((cat) => cat.id === selectedCategory)
        : categories;

    return (
        <div className="flex bg-[#E5E5E5] min-h-screen" style={{ direction: "rtl" }}>
            <aside className="w-1/5 bg-[#00296B] text-white p-4 h-screen overflow-y-auto">
                <h2 className="text-xl font-bold mb-4 text-[#FDC500]">فیلتر دسته‌بندی</h2>
                <ul className="space-y-3">
                    <li>
                        <button
                            onClick={() => handleFilter(null)}
                            className={`w-full text-right px-3 py-2 rounded-lg ${
                                selectedCategory === null
                                    ? "bg-[#FDC500] text-black"
                                    : "hover:bg-[#00509D]"
                            }`}
                        >
                            همه دسته‌بندی‌ها
                        </button>
                    </li>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <button
                                onClick={() => handleFilter(category.id)}
                                className={`w-full text-right px-3 py-2 rounded-lg ${
                                    selectedCategory === category.id
                                        ? "bg-[#FDC500] text-black"
                                        : "hover:bg-[#00509D]"
                                }`}
                            >
                                {category.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="w-4/5 p-4 space-y-8 h-screen overflow-y-auto">
                {filteredCategories.map((category) => (
                    <div key={category.id} className="bg-white rounded-xl shadow p-4">
                        <h3 className="text-2xl font-bold text-[#00509D] mb-4 border-b-2 border-[#FDC500] pb-2">
                            {category.name}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {category.subcategories.map((sub) => (
                                <div
                                    key={sub.id}
                                    className="bg-[#FDC500] text-black rounded-lg shadow hover:bg-[#00509D] hover:text-white transition-all cursor-pointer p-6 text-center font-semibold"
                                    onClick={() => handleSubCategoryClick(sub.name)}
                                >
                                    {sub.name}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Shop;
