import React, { useState } from "react";

// نمونه داده‌های محصولات
const initialProducts = [
    { id: 1, name: "لپ‌تاپ ایسوس", category: "الکترونیک", price: 15000000, stock: 10 },
    { id: 2, name: "هدفون بلوتوث", category: "الکترونیک", price: 500000, stock: 25 },
    { id: 3, name: "کتاب React پیشرفته", category: "کتاب", price: 200000, stock: 50 },
];

const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState(initialProducts);
    const [newProduct, setNewProduct] = useState({ name: "", category: "", price: 0, stock: 0 });
    const [editProductId, setEditProductId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // افزودن محصول جدید
    const handleAddProduct = () => {
        if (newProduct.name && newProduct.category && newProduct.price > 0 && newProduct.stock >= 0) {
            const product = { id: products.length + 1, ...newProduct };
            setProducts([...products, product]);
            setNewProduct({ name: "", category: "", price: 0, stock: 0 });
        } else {
            alert("لطفاً تمام فیلدها را به درستی پر کنید.");
        }
    };

    // ویرایش محصول
    const handleEditProduct = (id: number) => {
        const product = products.find((p) => p.id === id);
        if (product) {
            setNewProduct({ name: product.name, category: product.category, price: product.price, stock: product.stock });
            setEditProductId(id);
        }
    };

    // ذخیره تغییرات ویرایش
    const handleSaveEdit = () => {
        if (editProductId) {
            const updatedProducts = products.map((p) =>
                p.id === editProductId ? { ...p, ...newProduct } : p
            );
            setProducts(updatedProducts);
            setEditProductId(null);
            setNewProduct({ name: "", category: "", price: 0, stock: 0 });
        }
    };

    // حذف محصول
    const handleDeleteProduct = (id: number) => {
        const updatedProducts = products.filter((p) => p.id !== id);
        setProducts(updatedProducts);
    };

    // فیلتر کردن محصولات بر اساس جستجو
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6" style={{ direction: 'rtl' }}>
            <h1 className="text-2xl font-bold mb-6">مدیریت محصولات</h1>

            {/* فرم افزودن/ویرایش محصول */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">
                    {editProductId ? "ویرایش محصول" : "افزودن محصول جدید"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="نام محصول"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="دسته‌بندی"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="قیمت"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: +e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="موجودی"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: +e.target.value })}
                        className="p-2 border rounded"
                    />
                </div>
                <button
                    onClick={editProductId ? handleSaveEdit : handleAddProduct}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {editProductId ? "ذخیره تغییرات" : "افزودن محصول"}
                </button>
            </div>

            {/* جستجوی محصولات */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="جستجوی محصولات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-full md:w-1/2"
                />
            </div>

            {/* لیست محصولات */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">لیست محصولات</h2>
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">نام محصول</th>
                        <th className="py-2 px-4 border-b">دسته‌بندی</th>
                        <th className="py-2 px-4 border-b">قیمت</th>
                        <th className="py-2 px-4 border-b">موجودی</th>
                        <th className="py-2 px-4 border-b">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">{product.category}</td>
                            <td className="py-2 px-4 border-b">{product.price.toLocaleString()} تومان</td>
                            <td className="py-2 px-4 border-b">{product.stock}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleEditProduct(product.id)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    ویرایش
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
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
    );
};

export default ProductManagement;