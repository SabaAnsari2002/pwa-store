import React, { useState, useEffect, useRef } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiCheck, FiArrowUp } from "react-icons/fi";
import { categories } from "../categoriesData";

interface Subcategory {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
}

interface Product {
    id: number;
    name: string;
    category: string;
    subcategory: string;
    price: number;
    stock: number;
}

const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
        name: "",
        category: "",
        subcategory: "",
        price: 0,
        stock: 0
    });
    const [editProductId, setEditProductId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [productToDelete, setProductToDelete] = useState<number | null>(null);

    const token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");

    const topRef = useRef<HTMLDivElement | null>(null);

    const handleScrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const refreshAccessToken = async () => {
        if (!refresh_token) {
            console.error("توکن refresh یافت نشد.");
            return null;
        }

        const response = await fetch("http://localhost:8000/api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refresh_token }),
        });

        if (response.ok) {
            const data = await response.json();
            const newAccessToken = data.access_token;
            localStorage.setItem("access_token", newAccessToken);
            return newAccessToken;
        } else {
            console.error("خطا در تمدید توکن.");
            return null;
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            let currentToken = token;

            if (!currentToken) {
                currentToken = await refreshAccessToken();
            }

            if (!currentToken) {
                console.error("توکن معتبر یافت نشد.");
                return;
            }

            const response = await fetch("http://localhost:8000/api/products/", {
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("خطا: داده دریافتی آرایه نیست", data);
                    setProducts([]);
                }
            } else {
                const error = await response.json();
                console.error(`خطا در واکشی محصولات: ${error.detail || response.statusText}`);
                setProducts([]);
            }
        } catch (err) {
            console.error("خطا در ارتباط با سرور:", err);
            setProducts([]);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = async () => {
        const cleanedProduct = {
            ...newProduct,
            category: newProduct.category.trim(),
            subcategory: newProduct.subcategory.trim()
        };

        if (!cleanedProduct.name || !cleanedProduct.category || !cleanedProduct.subcategory || cleanedProduct.price <= 0 || cleanedProduct.stock <= 0) {
            alert("لطفاً تمام فیلدها را به درستی پر کنید.");
            return;
        }

        let currentToken = token;

        if (!currentToken) {
            currentToken = await refreshAccessToken();
        }

        if (!currentToken) {
            alert("توکن معتبر یافت نشد.");
            return;
        }

        const response = await fetch("http://localhost:8000/api/products/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentToken}`,
            },
            body: JSON.stringify(cleanedProduct),
        });

        if (response.ok) {
            const product: Product = await response.json();
            setProducts([...products, product]);
            setNewProduct({ name: "", category: "", subcategory: "", price: 0, stock: 0 });
            setSelectedCategory(null);
        } else {
            const error = await response.json();
            alert(`افزودن محصول با مشکل مواجه شد: ${error.detail || "خطای نامشخص"}`);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        const response = await fetch(`http://localhost:8000/api/products/${id}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            setProducts(products.filter((p) => p.id !== id));
            setShowDeleteModal(false);
        } else {
            alert("حذف محصول ناموفق بود.");
        }
    };

    const handleEditProduct = (id: number) => {
        const product = products.find((p) => p.id === id);
        if (product) {
            setNewProduct({
                name: product.name,
                category: product.category,
                subcategory: product.subcategory,
                price: product.price,
                stock: product.stock
            });

            const category = categories.find(cat => cat.name === product.category);
            setSelectedCategory(category || null);

            setEditProductId(id);
        }
    };

    const handleSaveEdit = async () => {
        if (!editProductId) return;

        const cleanedProduct = {
            ...newProduct,
            category: newProduct.category.trim(),
            subcategory: newProduct.subcategory.trim()
        };

        if (!cleanedProduct.name || !cleanedProduct.category || !cleanedProduct.subcategory || cleanedProduct.price <= 0 || cleanedProduct.stock <= 0) {
            alert("لطفاً تمام فیلدها را به درستی پر کنید.");
            return;
        }

        const response = await fetch(`http://localhost:8000/api/products/${editProductId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cleanedProduct),
        });

        if (response.ok) {
            const updated: Product = await response.json();
            setProducts(products.map(p => p.id === editProductId ? updated : p));
            setEditProductId(null);
            setNewProduct({ name: "", category: "", subcategory: "", price: 0, stock: 0 });
            setSelectedCategory(null);
        } else {
            const error = await response.json();
            alert(`ویرایش محصول با مشکل مواجه شد: ${error.detail || "خطای نامشخص"}`);
        }
    };

    const handleCancelEdit = () => {
        setEditProductId(null);
        setNewProduct({ name: "", category: "", subcategory: "", price: 0, stock: 0 });
        setSelectedCategory(null);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryName = e.target.value;
        const category = categories.find(cat => cat.name === categoryName) || null;

        setSelectedCategory(category);
        setNewProduct({
            ...newProduct,
            category: categoryName,
            subcategory: ""
        });
    };

    const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewProduct({
            ...newProduct,
            subcategory: e.target.value
        });
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const Loader = () => (
        <div className="flex justify-center items-center py-12">
            <div className="relative w-24 h-24 animate-spin">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-8 rounded-full bg-gradient-to-b from-[#3b82f6] to-[#1d4ed8]"
                        style={{
                            transform: `rotate(${i * 30}deg) translate(0, -36px)`,
                            opacity: 0.1 + (i * 0.05),
                            transformOrigin: "bottom center"
                        }}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] min-h-screen p-4 md:p-8" style={{ direction: 'rtl' }}>
            <button 
                onClick={handleScrollToTop}
                className="fixed bottom-6 left-6 bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white p-3 rounded-full shadow-lg z-10 hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
                <FiArrowUp size={20} />
            </button>

            <div className="max-w-7xl mx-auto">
                <div className="mb-8 text-center" ref={topRef}>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-3 relative inline-block">
                        مدیریت محصولات
                    </h1>
                    <p className="text-[#64748b] max-w-2xl mx-auto">
                        مدیریت و سازماندهی محصولات فروشگاه شما با امکانات پیشرفته
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] p-4 text-white">
                        <h2 className="text-xl font-semibold flex items-center">
                            <FiPlus className="ml-2" />
                            {editProductId ? "ویرایش محصول" : "افزودن محصول جدید"}
                        </h2>
                    </div>
                    
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="block text-[#334155] font-medium">نام محصول</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="نام محصول"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all"

                                    />
                                    {newProduct.name && (
                                        <FiCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                                    )}
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-[#334155] font-medium">دسته‌بندی</label>
                                <select
                                    value={newProduct.category}
                                    onChange={handleCategoryChange}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NDc0OGIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im03IDE1IDUgNSA1LTUiLz48L3N2Zz4=')] bg-no-repeat bg-[center_left_1rem]"
                                >
                                    <option value="">انتخاب دسته‌بندی</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            {selectedCategory && (
                                <div className="space-y-2">
                                    <label className="block text-[#334155] font-medium">زیرمجموعه</label>
                                    <select
                                        value={newProduct.subcategory}
                                        onChange={handleSubcategoryChange}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NDc0OGIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im03IDE1IDUgNSA1LTUiLz48L3N2Zz4=')] bg-no-repeat bg-[center_left_1rem]"
                                    >
                                        <option value="">انتخاب زیرمجموعه</option>
                                        {selectedCategory.subcategories.map((subcategory) => (
                                            <option key={subcategory.id} value={subcategory.name}>
                                                {subcategory.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            
                            <div className="space-y-2">
                                <label className="block text-[#334155] font-medium">قیمت (تومان)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        min="0"
                                        placeholder="قیمت"
                                        value={newProduct.price}
                                        onChange={(e) => {
                                            const value = Math.max(0, +e.target.value);
                                            setNewProduct({ ...newProduct, price: value });
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all"

                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">تومان</span>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-[#334155] font-medium">موجودی</label>
                                <input
                                    type="text"
                                    placeholder="موجودی"
                                    value={newProduct.stock}
                                    onChange={(e) => {
                                        const value = Math.max(0, +e.target.value);
                                        setNewProduct({ ...newProduct, stock: value });
                                    }}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <button
                                onClick={editProductId ? handleSaveEdit : handleAddProduct}
                                className="bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:from-[#2563eb] hover:to-[#1e40af] flex-1 md:flex-none flex items-center justify-center"
                            >
                                {editProductId ? (
                                    <>
                                        <FiEdit2 className="ml-2" />
                                        ذخیره تغییرات
                                    </>
                                ) : (
                                    <>
                                        <FiPlus className="ml-2" />
                                        افزودن محصول
                                    </>
                                )}
                            </button>
                            
                            {editProductId && (
                                <button
                                    onClick={handleCancelEdit}
                                    className="bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:from-[#dc2626] hover:to-[#b91c1c] flex-1 md:flex-none flex items-center justify-center"
                                >
                                    <FiX className="ml-2" />
                                    انصراف از ویرایش
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Search Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-[#1e293b] mb-4 flex items-center">
                        <FiSearch className="ml-2 text-[#3b82f6]" />
                        جستجوی محصولات
                    </h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="جستجوی محصولات..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all"
                        />
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Products List */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] p-4 text-white">
                        <h2 className="text-xl font-semibold flex items-center">
                            لیست محصولات
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium mr-3">
                                {filteredProducts.length} محصول
                            </span>
                        </h2>
                    </div>
                    
                    <div className="p-6">
                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-[#3b82f6] uppercase tracking-wider">نام محصول</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-[#3b82f6] uppercase tracking-wider">دسته‌بندی</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-[#3b82f6] uppercase tracking-wider">زیرمجموعه</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-[#3b82f6] uppercase tracking-wider">قیمت</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-[#3b82f6] uppercase tracking-wider">موجودی</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-[#3b82f6] uppercase tracking-wider">عملیات</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1e293b]">{product.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">
                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">{product.subcategory}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1e293b]">
                                                    {product.price.toLocaleString()} تومان
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {product.stock > 0 ? `${product.stock} عدد` : 'ناموجود'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">
                                                    <div className="flex items-center space-x-2 space-x-reverse">
                                                        <button
                                                            onClick={() => {
                                                                handleEditProduct(product.id);
                                                                handleScrollToTop();
                                                            }}
                                                            className="text-[#3b82f6] hover:text-[#1d4ed8] transition-colors p-2 rounded-full hover:bg-blue-50"
                                                            title="ویرایش"
                                                        >
                                                            <FiEdit2 size={18} />
                                                        </button>
                                                        
                                                        <button
                                                            onClick={() => {
                                                                setShowDeleteModal(true);
                                                                setProductToDelete(product.id);
                                                            }}
                                                            className="text-[#ef4444] hover:text-[#dc2626] transition-colors p-2 rounded-full hover:bg-red-50"
                                                            title="حذف"
                                                        >
                                                            <FiTrash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                {filteredProducts.length === 0 && !loading && (
                                    <div className="text-center py-12">
                                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <FiSearch size={32} className="text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-[#334155]">محصولی یافت نشد</h3>
                                        <p className="text-[#64748b] mt-1">هیچ محصولی با معیارهای جستجوی شما مطابقت ندارد</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md">
                        <div className="bg-gradient-to-r from-[#ef4444] to-[#dc2626] p-4 text-white">
                            <h3 className="text-lg font-semibold flex items-center">
                                <FiTrash2 className="ml-2" />
                                حذف محصول
                            </h3>
                        </div>
                        
                        <div className="p-6">
                            <p className="text-[#475569] mb-6">آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟ این عمل برگشت‌پذیر نیست.</p>
                            
                            <div className="flex justify-end space-x-3 space-x-reverse">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-[#334155] hover:bg-gray-50 transition-colors"
                                >
                                    انصراف
                                </button>
                                <button
                                    onClick={() => {
                                        if (productToDelete) {
                                            handleDeleteProduct(productToDelete);
                                        }
                                    }}
                                    className="px-4 py-2 bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white rounded-lg hover:shadow-md transition-all"
                                >
                                    حذف محصول
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;