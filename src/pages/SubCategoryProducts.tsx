import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    price: number;
    brand: string;
    category: string;
    subcategory: string;
    image: string;
    rating: number;
}

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

const mockProducts: Product[] = [
    {
        id: 1,
        name: "یخچال ساید بای ساید سامسونگ 25 فوت",
        price: 25000000,
        brand: "سامسونگ",
        category: "لوازم خانگی",
        subcategory: "یخچال",
        image: "https://example.com/fridge1.jpg",
        rating: 4.5,
    },
    {
        id: 2,
        name: "یخچال فراست فری ال جی 18 فوت",
        price: 18000000,
        brand: "ال جی",
        category: "لوازم خانگی",
        subcategory: "یخچال",
        image: "https://example.com/fridge2.jpg",
        rating: 4.2,
    },
    {
        id: 3,
        name: "یخچال ساده دو درب هیمالیا",
        price: 12000000,
        brand: "هیمالیا",
        category: "لوازم خانگی",
        subcategory: "یخچال",
        image: "https://example.com/fridge3.jpg",
        rating: 3.9,
    },
    {
        id: 4,
        name: "یخچال آمریکایی بوش",
        price: 32000000,
        brand: "بوش",
        category: "لوازم خانگی",
        subcategory: "یخچال",
        image: "https://example.com/fridge4.jpg",
        rating: 4.7,
    },
    {
        id: 5,
        name: "یخچال ساید بای ساید دوو",
        price: 22000000,
        brand: "دوو",
        category: "لوازم خانگی",
        subcategory: "یخچال",
        image: "https://example.com/fridge5.jpg",
        rating: 4.0,
    },
    {
        id: 6,
        name: "یخچال ساده تک درب پارس خزر",
        price: 9000000,
        brand: "پارس خزر",
        category: "لوازم خانگی",
        subcategory: "یخچال",
        image: "https://example.com/fridge6.jpg",
        rating: 3.5,
    },
    {
        id: 7,
        name: "یخچال ساید بای ساید اسنوا",
        price: 28000000,
        brand: "اسنوا",
        category: "لوازم خانگی",
        subcategory: "یخچال",
        image: "https://example.com/fridge7.jpg",
        rating: 4.3,
    },
    {
        id: 8,
        name: "یخچال فراست فری میندو",
        price: 15000000,
        brand: "میندو",
        category: "لوازم خانگی",
        subcategory: "یخچال",
        image: "https://example.com/fridge8.jpg",
        rating: 3.8,
    },
];

const SubCategoryProducts: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    const currentSubcategory = id || "";

    const brands = Array.from(new Set(
        mockProducts
            .filter(p => p.subcategory === currentSubcategory)
            .map(p => p.brand)
    ));

    const toggleCategory = (categoryId: number) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleBrandToggle = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = parseInt(e.target.value);
        setPriceRange(prev =>
            index === 0 ? [value, prev[1]] : [prev[0], value]
        );
    };

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const filteredProducts = mockProducts.filter(product => {
        if (product.subcategory !== currentSubcategory) return false;
        if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
        return true;
    });

    return (
        <div className="flex bg-[#E5E5E5] min-h-screen" style={{ direction: "rtl" }}>
            {/* Sidebar Filters */}
            <aside className="w-1/5 bg-[#00296B] text-white p-4 h-screen sticky top-0 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6 text-[#FDC500] border-b border-[#00509D] pb-2">دسته‌بندی‌ها</h2>

                {/* Categories List */}
                <div className="space-y-2">
                    {/* دکمه اصلی برای باز/بسته کردن آکاردئون */}
                    <button
                        className="flex justify-between items-center cursor-pointer p-2 bg-[#00509D] hover:bg-[#003F7D] rounded-lg w-full"
                        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    >
                        <span>دسته‌بندی‌ها</span>
                        <span>{isCategoriesOpen ? '−' : '+'}</span>
                    </button>

                    {/* محتوای آکاردئون */}
                    {isCategoriesOpen && (
                        <div className="mt-2 space-y-2">
                            {categories.map(category => (
                                <div key={category.id} className="mb-2">
                                    <div
                                        className="flex justify-between items-center cursor-pointer p-2 hover:bg-[#00509D] rounded-lg"
                                        onClick={() => toggleCategory(category.id)}
                                    >
                                        <span>{category.name}</span>
                                        <span>
                            {expandedCategories.includes(category.id) ? '−' : '+'}
                        </span>
                                    </div>

                                    {expandedCategories.includes(category.id) && (
                                        <div className="pr-4 mt-1 space-y-1">
                                            {category.subcategories.map(sub => (
                                                <div
                                                    key={sub.id}
                                                    className={`p-2 rounded-lg cursor-pointer ${currentSubcategory === sub.name ? 'bg-[#FDC500] text-black' : 'hover:bg-[#003F7D]'}`}
                                                    onClick={() => navigate(`/subcategory-products/${sub.name}`)}
                                                >
                                                    {sub.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price Range Filter */}
                <div className="mt-6 mb-6">
                    <h3 className="font-semibold mb-3 text-[#FDC500]">محدوده قیمت</h3>
                    <div className="px-2">
                        <input
                            type="range"
                            min="0"
                            max="50000000"
                            step="1000000"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange(e, 0)}
                            className="w-full mb-2 accent-[#FDC500]"
                        />
                        <input
                            type="range"
                            min="0"
                            max="50000000"
                            step="1000000"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange(e, 1)}
                            className="w-full mb-4 accent-[#FDC500]"
                        />
                        <div className="flex justify-between text-sm">
                            <span>{formatPrice(priceRange[0])} تومان</span>
                            <span>{formatPrice(priceRange[1])} تومان</span>
                        </div>
                    </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3 text-[#FDC500]">برندها</h3>
                    <div className="space-y-2">
                        {brands.map(brand => (
                            <div key={brand} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`brand-${brand}`}
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => handleBrandToggle(brand)}
                                    className="ml-2 h-4 w-4 accent-[#FDC500]"
                                />
                                <label htmlFor={`brand-${brand}`} className="cursor-pointer">
                                    {brand}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reset Filters Button */}
                <button
                    onClick={() => {
                        setPriceRange([0, 50000000]);
                        setSelectedBrands([]);
                    }}
                    className="w-full py-2 bg-[#FDC500] text-black rounded-lg font-medium hover:bg-[#FFD700] transition-colors"
                >
                    حذف فیلترها
                </button>
            </aside>

            {/* Main Content */}
            <main className="w-3/4 p-6">
                <h1 className="text-2xl font-bold text-[#00509D] mb-6">
                    محصولات دسته‌بندی: {currentSubcategory}
                </h1>

                {/* Sorting Options */}
                <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg shadow">
                    <div className="text-sm text-gray-600">
                        {filteredProducts.length} محصول یافت شد
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="sort" className="ml-2 text-[#00509D]">مرتب‌سازی بر اساس:</label>
                        <select
                            id="sort"
                            className="bg-[#E5E5E5] border border-[#00509D] text-[#00509D] rounded px-3 py-1"
                        >
                            <option value="popular">پربازدیدترین</option>
                            <option value="newest">جدیدترین</option>
                            <option value="cheapest">ارزان‌ترین</option>
                            <option value="expensive">گران‌ترین</option>
                            <option value="top-rated">پربازدیدترین</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x300?text=Product+Image";
                                        }}
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-[#00509D] mb-2">{product.name}</h3>
                                    <div className="flex items-center mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-[#FDC500]" : "text-gray-300"}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <span className="text-sm text-gray-600 mr-1">({product.rating})</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-lg text-[#00296B]">{formatPrice(product.price)} تومان</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <h3 className="text-lg font-medium text-[#00509D] mb-2">محصولی یافت نشد</h3>
                        <p className="text-gray-600 mb-4">با تغییر فیلترها دوباره امتحان کنید</p>
                        <button
                            onClick={() => {
                                setPriceRange([0, 50000000]);
                                setSelectedBrands([]);
                            }}
                            className="bg-[#00509D] hover:bg-[#003F7D] text-white px-4 py-2 rounded font-medium transition-colors"
                        >
                            حذف همه فیلترها
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {filteredProducts.length > 0 && (
                    <div className="flex justify-center mt-8">
                        <nav className="inline-flex rounded-md shadow">
                            <button className="px-3 py-1 rounded-r-md bg-[#00509D] text-white font-medium hover:bg-[#003F7D]">
                                قبلی
                            </button>
                            {[1, 2, 3, 4, 5].map(page => (
                                <button
                                    key={page}
                                    className={`px-3 py-1 border-t border-b ${page === 1 ? "bg-[#FDC500] text-black" : "bg-white text-[#00509D]"} border-gray-300 hover:bg-gray-100 font-medium`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button className="px-3 py-1 rounded-l-md bg-[#00509D] text-white font-medium hover:bg-[#003F7D]">
                                بعدی
                            </button>
                        </nav>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SubCategoryProducts;
