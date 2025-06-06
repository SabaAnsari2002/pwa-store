import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categories, Category, Subcategory } from "../data/categories";
import { Product } from "../data/products";
import { getProductsBySubcategory } from "../api/products";
import IMG from "../assets/img.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX, FiShoppingCart, FiHeart } from "react-icons/fi";

const SubCategoryProducts: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                if (id) {
                    const decodedName = decodeURIComponent(id);
                    const data = await getProductsBySubcategory(decodedName);
                    setProducts(data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProducts();
        }
    }, [id]);

    const currentSubcategory = id ? decodeURIComponent(id) : "";

    const toggleCategory = (categoryId: number) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
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

    const filteredProducts = products.filter(product => {
        if (product.subcategory !== currentSubcategory) return false;
        if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
        return true;
    });

    return (
        <div className="flex bg-[#E5E5E5] min-h-screen" style={{ direction: "rtl" }}>
            <aside className="w-1/5 bg-[#00296B] text-white p-4 h-screen sticky top-0 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6 text-[#FDC500] border-b border-[#00509D] pb-2">دسته‌بندی‌ها</h2>
                <div className="space-y-2">
                    <button
                        className="flex justify-between items-center cursor-pointer p-2 bg-[#00509D] hover:bg-[#003F7D] rounded-lg w-full"
                        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    >
                        <span>دسته‌بندی‌ها</span>
                        <span>{isCategoriesOpen ? '−' : '+'}</span>
                    </button>

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
                                                    onClick={() => navigate(`/subcategory-products/${encodeURIComponent(sub.name)}`)}
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

                <button
                    onClick={() => {
                        setPriceRange([0, 50000000]);
                    }}
                    className="w-full py-2 bg-[#FDC500] text-black rounded-lg font-medium hover:bg-[#FFD700] transition-colors"
                >
                    حذف فیلتر
                </button>
            </aside>

            <main className="w-3/4 p-6">
                <h1 className="text-2xl font-bold text-[#00509D] mb-6">
                    محصولات دسته‌بندی: {currentSubcategory}
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00509D]"></div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg shadow">
                            <div className="text-sm text-gray-600">
                                {filteredProducts.length} محصول یافت شد
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                        onClick={() => navigate(`/products/${product.id}`)}
                                    >
                                        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                                          <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                                            <img
                                              src={IMG}
                                              className="h-full w-full object-cover"
                                            />
                                          </div>
                                          
                                          <div className="p-5">
                                            <div className="flex justify-between items-center mb-2">
                                              <h3 className="font-bold text-xl text-gray-800 truncate">{product.name}</h3>
                                            </div>
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
                                    }}
                                    className="bg-[#00509D] hover:bg-[#003F7D] text-white px-4 py-2 rounded font-medium transition-colors"
                                >
                                    حذف همه فیلترها
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default SubCategoryProducts;