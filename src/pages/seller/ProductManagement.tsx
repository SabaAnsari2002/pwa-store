import React, { useState, useEffect, useRef } from "react";
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

    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const topRef = useRef<HTMLDivElement | null>(null);

    const handleScrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const refreshAccessToken = async () => {
        if (!refreshToken) {
            console.error("توکن refresh یافت نشد.");
            return null;
        }

        const response = await fetch("http://localhost:8000/api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            const newAccessToken = data.access_token;
            localStorage.setItem("accessToken", newAccessToken);
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
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#FDC500]"></div>
        </div>
    );

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            <div className="mb-8" ref={topRef}>
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    مدیریت محصولات
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] mb-8">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">
                    {editProductId ? "ویرایش محصول" : "افزودن محصول جدید"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-[#00509D] mb-1">نام محصول</label>
                        <input
                            type="text"
                            placeholder="نام محصول"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="p-2 border rounded w-full focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-[#00509D] mb-1">دسته‌بندی</label>
                        <select
                            value={newProduct.category}
                            onChange={handleCategoryChange}
                            className="p-2 border rounded w-full focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
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
                        <div>
                            <label className="block text-[#00509D] mb-1">زیرمجموعه</label>
                            <select
                                value={newProduct.subcategory}
                                onChange={handleSubcategoryChange}
                                className="p-2 border rounded w-full focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
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
                    <div>
                        <label className="block text-[#00509D] mb-1">قیمت (تومان)</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="قیمت"
                            value={newProduct.price}
                            onChange={(e) => {
                                const value = Math.max(0, +e.target.value);
                                setNewProduct({ ...newProduct, price: value });
                            }}
                            className="p-2 border rounded w-full focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-[#00509D] mb-1">موجودی</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="موجودی"
                            value={newProduct.stock}
                            onChange={(e) => {
                                const value = Math.max(0, +e.target.value);
                                setNewProduct({ ...newProduct, stock: value });
                            }}
                            className="p-2 border rounded w-full focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                    <button
                        onClick={editProductId ? handleSaveEdit : handleAddProduct}
                        className="bg-[#00509D] hover:bg-[#003F7D] text-white px-8 py-3 rounded-lg transition duration-300 w-full md:w-auto"
                    >
                        {editProductId ? "ذخیره تغییرات" : "افزودن محصول"}
                    </button>

                    {editProductId && (
                        <button
                            onClick={handleCancelEdit}
                            className="bg-[#D62828] hover:bg-[#B21F1F] text-white px-8 py-3 rounded-lg transition duration-300 w-full md:w-auto"
                        >
                            انصراف از ویرایش
                        </button>
                    )}
                </div>


            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] mb-8">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">جستجوی محصولات</h2>
                <input
                    type="text"
                    placeholder="جستجوی محصولات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-full md:w-1/2 focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
              <h2 className="text-lg font-semibold text-[#00509D] mb-4">لیست محصولات</h2>
              {loading ? (
                <Loader /> 
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-3 px-4 border-b text-[#00509D] text-center">نام محصول</th>
                        <th className="py-3 px-4 border-b text-[#00509D] text-center">دسته‌بندی</th>
                        <th className="py-3 px-4 border-b text-[#00509D] text-center">زیرمجموعه</th>
                        <th className="py-3 px-4 border-b text-[#00509D] text-center">قیمت</th>
                        <th className="py-3 px-4 border-b text-[#00509D] text-center">موجودی</th>
                        <th className="py-3 px-4 border-b text-[#00509D] text-center">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="py-3 px-4 border-b text-[#000000] text-center">{product.name}</td>
                          <td className="py-3 px-4 border-b text-[#000000] text-center">{product.category}</td>
                          <td className="py-3 px-4 border-b text-[#000000] text-center">{product.subcategory}</td>
                          <td className="py-3 px-4 border-b text-[#000000] text-center">{product.price.toLocaleString()} تومان</td>
                          <td className="py-3 px-4 border-b text-[#000000] text-center">{product.stock}</td>
                          <td className="py-3 px-4 border-b text-center">
                            <div>
                              <button
                                onClick={() => {
                                  handleEditProduct(product.id);
                                  handleScrollToTop();
                                }}
                                className="bg-[#FDC500] hover:bg-[#DAA900] text-[#00296B] px-3 py-1 rounded ml-2 transition duration-300"
                              >
                                ویرایش
                              </button>
                            
                              <button
                                onClick={() => {
                                  setShowDeleteModal(true);
                                  setProductToDelete(product.id);
                                }}
                                className="bg-[#D62828] hover:bg-[#B21F1F] text-white px-3 py-1 rounded transition duration-300"
                              >
                                حذف
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">آیا مطمئن هستید؟</h3>
                        <p>این محصول حذف خواهد شد.</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => {
                                    if (productToDelete) {
                                        handleDeleteProduct(productToDelete);
                                    }
                                }}
                                className="bg-[#D62828]  text-white px-6 py-2 rounded"
                            >
                                حذف
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="ml-4 bg-[#00509D] text-white px-8 py-2 rounded"
                            >
                                لغو
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;
