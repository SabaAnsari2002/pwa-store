import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateShop: React.FC = () => {
    const navigate = useNavigate();
    const [shopName, setShopName] = useState("");
    const [phone, setPhone] = useState("");
    const [category, setCategory] = useState("");
    const [address, setAddress] = useState("");

    const handleCreateShop = () => {
        // ذخیره اطلاعات فروشگاه در دیتابیس (می‌توانید این بخش را با API متصل کنید)
        const shopData = { shopName, phone, category, address };
        localStorage.setItem("sellerShop", JSON.stringify(shopData));

        // انتقال به پنل فروشندگان
        navigate("/seller-dashboard");
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold mb-4">ثبت غرفه جدید</h2>
            <input
                type="text"
                placeholder="نام فروشگاه"
                className="border p-2 w-full mb-2"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
            />
            <input
                type="text"
                placeholder="شماره تماس"
                className="border p-2 w-full mb-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="text"
                placeholder="دسته‌بندی فعالیت"
                className="border p-2 w-full mb-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="text"
                placeholder="آدرس فروشگاه"
                className="border p-2 w-full mb-4"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleCreateShop}>
                ثبت و ورود به پنل
            </button>
        </div>
    );
};

export default CreateShop;
