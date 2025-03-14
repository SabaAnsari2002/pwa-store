import React, { useState } from "react";

const AddProduct: React.FC = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const handleAddProduct = () => {
        const newProduct = { name, price, stock };
        const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
        localStorage.setItem("products", JSON.stringify([...existingProducts, newProduct]));
        alert("محصول با موفقیت اضافه شد!");
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold mb-4">افزودن محصول جدید</h2>
            <input type="text" placeholder="نام محصول" className="border p-2 w-full mb-2" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="قیمت محصول" className="border p-2 w-full mb-2" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="text" placeholder="موجودی" className="border p-2 w-full mb-4" value={stock} onChange={(e) => setStock(e.target.value)} />
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddProduct}>
                افزودن محصول
            </button>
        </div>
    );
};

export default AddProduct;
