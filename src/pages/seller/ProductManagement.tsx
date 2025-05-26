// ===============================
// ✅ React Component (ProductManagement.tsx)
// ===============================
import React, { useState, useEffect } from "react";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
}

const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({ name: "", category: "", price: 0, stock: 0 });
    const [editProductId, setEditProductId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const token = localStorage.getItem("accessToken");

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/products/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("خطا: داده دریافتی آرایه نیست", data);
                    setProducts([]); // یا نمایش پیغام خطا
                }
            } else {
                console.error("خطا در واکشی محصولات:", response.status);
                setProducts([]);
            }
        } catch (err) {
            console.error("خطا در ارتباط با سرور:", err);
            setProducts([]);
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = async () => {
        const response = await fetch("http://localhost:8000/api/products/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newProduct),
        });
        if (response.ok) {
            const product: Product = await response.json();
            setProducts([...products, product]);
            setNewProduct({ name: "", category: "", price: 0, stock: 0 });
        } else {
            alert("افزودن محصول با مشکل مواجه شد.");
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
        } else {
            alert("حذف محصول ناموفق بود.");
        }
    };

    const handleEditProduct = (id: number) => {
        const product = products.find((p) => p.id === id);
        if (product) {
            setNewProduct({ name: product.name, category: product.category, price: product.price, stock: product.stock });
            setEditProductId(id);
        }
    };

    const handleSaveEdit = async () => {
        if (!editProductId) return;
        const response = await fetch(`http://localhost:8000/api/products/${editProductId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newProduct),
        });
        if (response.ok) {
            const updated: Product = await response.json();
            setProducts(products.map(p => p.id === editProductId ? updated : p));
            setEditProductId(null);
            setNewProduct({ name: "", category: "", price: 0, stock: 0 });
        } else {
            alert("ویرایش محصول با خطا مواجه شد.");
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان با خط کامل در زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    مدیریت محصولات
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            {/* فرم افزودن/ویرایش محصول */}
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
                        <input
                            type="text"
                            placeholder="دسته‌بندی"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            className="p-2 border rounded w-full focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                        />
                    </div>
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
                <button
                    onClick={editProductId ? handleSaveEdit : handleAddProduct}
                    className="mt-4 bg-[#00509D] hover:bg-[#003F7D] text-white px-6 py-2 rounded transition duration-300"
                >
                    {editProductId ? "ذخیره تغییرات" : "افزودن محصول"}
                </button>
            </div>

            {/* جستجوی محصولات */}
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

            {/* لیست محصولات */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">لیست محصولات</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-3 px-4 border-b text-[#00509D]">نام محصول</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">دسته‌بندی</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">قیمت</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">موجودی</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td className="py-3 px-4 border-b text-[#000000]">{product.name}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{product.category}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{product.price.toLocaleString()} تومان</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{product.stock}</td>
                                <td className="py-3 px-4 border-b">
                                    <button
                                        onClick={() => handleEditProduct(product.id)}
                                        className="bg-[#FDC500] hover:bg-[#DAA900] text-[#00296B] px-3 py-1 rounded ml-2 transition duration-300"
                                    >
                                        ویرایش
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="bg-[#D62828] hover:bg-[#B21F1F] text-white px-3 py-1 rounded transition duration-300"
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;
