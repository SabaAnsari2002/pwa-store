import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Subcategory {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
}

const categories: Category[] = [
    {
        id: 1,
        name: "لوازم خانگی",
        subcategories: [
            { id: 11, name: "یخچال" },
            { id: 12, name: "ماشین لباسشویی" },
            { id: 13, name: "ظرفشویی" },
            { id: 14, name: "اجاق گاز" },
        ],
    },
    {
        id: 2,
        name: "مد و پوشاک",
        subcategories: [
            { id: 21, name: "پیراهن" },
            { id: 22, name: "شلوار" },
            { id: 23, name: "کفش" },
            { id: 24, name: "اکسسوری" },
        ],
    },
    {
        id: 3,
        name: "دیجیتال",
        subcategories: [
            { id: 31, name: "موبایل" },
            { id: 32, name: "لپ تاپ" },
            { id: 33, name: "تبلت" },
            { id: 34, name: "ساعت هوشمند" },
        ],
    },
    {
        id: 4,
        name: "زیبایی و سلامت",
        subcategories: [
            { id: 41, name: "لوازم آرایشی" },
            { id: 42, name: "مراقبت پوست" },
            { id: 43, name: "عطر" },
            { id: 44, name: "مراقبت مو" },
        ],
    },
    {
        id: 5,
        name: "ورزش و سفر",
        subcategories: [
            { id: 51, name: "دوچرخه" },
            { id: 52, name: "چمدان" },
            { id: 53, name: "کفش ورزشی" },
            { id: 54, name: "تجهیزات کوهنوردی" },
        ],
    },
    {
        id: 6,
        name: "کتاب و لوازم تحریر",
        subcategories: [
            { id: 61, name: "کتاب داستان" },
            { id: 62, name: "کتاب آموزشی" },
            { id: 63, name: "دفتر" },
            { id: 64, name: "نوشت‌افزار" },
        ],
    },
    {
        id: 7,
        name: "کودک و نوزاد",
        subcategories: [
            { id: 71, name: "لباس کودک" },
            { id: 72, name: "اسباب بازی" },
            { id: 73, name: "لوازم بهداشتی" },
            { id: 74, name: "کالسکه" },
        ],
    },
    {
        id: 8,
        name: "ابزارآلات صنعتی",
        subcategories: [
            { id: 81, name: "دریل" },
            { id: 82, name: "پیچ گوشتی برقی" },
            { id: 83, name: "اره برقی" },
            { id: 84, name: "ابزار دستی" },
        ],
    },
    {
        id: 9,
        name: "خودرو و موتورسیکلت",
        subcategories: [
            { id: 91, name: "لوازم یدکی خودرو" },
            { id: 92, name: "موتورسیکلت" },
            { id: 93, name: "روغن و فیلتر" },
            { id: 94, name: "تجهیزات جانبی" },
        ],
    },
    {
        id: 10,
        name: "خوراک و نوشیدنی",
        subcategories: [
            { id: 101, name: "نوشیدنی‌ها" },
            { id: 102, name: "شیرینی و شکلات" },
            { id: 103, name: "میوه و سبزی" },
            { id: 104, name: "محصولات لبنی" },
        ],
    },
];

const Shop: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleFilter = (id: number | null) => {
        setSelectedCategory(id);
    };

    const handleSubCategoryClick = (subCategoryName: string) => {
        navigate(`/subcategory-products/${subCategoryName}`);
    };

    const filteredCategories = selectedCategory
        ? categories.filter((cat) => cat.id === selectedCategory)
        : categories;

    return (
        <div className="flex bg-[#E5E5E5] min-h-screen" style={{ direction: "rtl" }}>
            {/* Sidebar Filter */}
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

            {/* Categories & Subcategories */}
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
