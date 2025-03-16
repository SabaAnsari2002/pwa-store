import React, { useState } from "react";

const Settings: React.FC = () => {
    const [shopSettings, setShopSettings] = useState({
        shopName: "فروشگاه من",
        logo: "",
        description: "توضیحات فروشگاه",
        shippingMethods: ["پست", "پیک", "حضوری"],
        paymentGateways: ["زرین‌پال", "ملت", "سامان"],
        minOrderAmount: 100000,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setShopSettings({ ...shopSettings, [name]: value });
    };

    const handleSaveSettings = () => {
        alert("تنظیمات با موفقیت ذخیره شد!");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">تنظیمات و سفارشی‌سازی فروشگاه</h1>

            {/* فرم تنظیمات فروشگاه */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">اطلاعات فروشگاه</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">نام فروشگاه</label>
                        <input
                            type="text"
                            name="shopName"
                            value={shopSettings.shopName}
                            onChange={handleChange}
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">لوگو</label>
                        <input
                            type="file"
                            name="logo"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setShopSettings({ ...shopSettings, logo: URL.createObjectURL(e.target.files[0]) });
                                }
                            }}
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">توضیحات فروشگاه</label>
                        <textarea
                            name="description"
                            value={shopSettings.description}
                            onChange={handleChange}
                            className="p-2 border rounded w-full"
                            rows={4}
                        />
                    </div>
                </div>
            </div>

            {/* روش‌های ارسال */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">روش‌های ارسال</h2>
                <div className="flex flex-wrap gap-4">
                    {shopSettings.shippingMethods.map((method, index) => (
                        <div key={index} className="bg-gray-100 p-2 rounded">
                            {method}
                        </div>
                    ))}
                </div>
            </div>

            {/* درگاه‌های پرداخت */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">درگاه‌های پرداخت</h2>
                <div className="flex flex-wrap gap-4">
                    {shopSettings.paymentGateways.map((gateway, index) => (
                        <div key={index} className="bg-gray-100 p-2 rounded">
                            {gateway}
                        </div>
                    ))}
                </div>
            </div>

            {/* حداقل خرید */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">حداقل خرید</h2>
                <input
                    type="number"
                    name="minOrderAmount"
                    value={shopSettings.minOrderAmount}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
            </div>

            {/* دکمه ذخیره تنظیمات */}
            <button
                onClick={handleSaveSettings}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                ذخیره تنظیمات
            </button>
        </div>
    );
};

export default Settings;