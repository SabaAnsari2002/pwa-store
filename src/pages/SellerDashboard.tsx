import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SellerDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [shopData, setShopData] = useState<{ shopName: string } | null>(null);

    useEffect(() => {
        const savedShop = localStorage.getItem("sellerShop");
        if (savedShop) {
            setShopData(JSON.parse(savedShop));
        } else {
            navigate("/create-shop");
        }
    }, [navigate]);

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold mb-4">پنل مدیریت {shopData?.shopName}</h2>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => navigate("/add-product")}
            >
                افزودن محصول جدید
            </button>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                    localStorage.removeItem("sellerShop");
                    navigate("/");
                }}
            >
                خروج از پنل
            </button>
        </div>
    );
};

export default SellerDashboard;
