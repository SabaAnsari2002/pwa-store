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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setShopSettings({ ...shopSettings, [name]: value });
    };

    const handleSaveSettings = () => {
        alert("تنظیمات با موفقیت ذخیره شد!");
    };

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: "rtl" }}>
            {/* عنوان اصلی */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    تنظیمات فروشگاه
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            {/* اطلاعات فروشگاه */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] mb-8">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">اطلاعات فروشگاه</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#333] mb-1">نام فروشگاه</label>
                        <input
                            type="text"
                            name="shopName"
                            value={shopSettings.shopName}
                            onChange={handleChange}
                            className="p-2 border rounded w-full focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#333] mb-1">لوگو</label>
                        <input
                            type="file"
                            name="logo"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setShopSettings({ ...shopSettings, logo: URL.createObjectURL(e.target.files[0]) });
                                }
                            }}
                            className="p-2 border rounded w-full focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-[#333] mb-1">توضیحات فروشگاه</label>
                        <textarea
                            name="description"
                            value={shopSettings.description}
                            onChange={handleChange}
                            className="p-2 border rounded w-full focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                            rows={4}
                        />
                    </div>
                </div>
            </div>

            {/* روش‌های ارسال */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] mb-8">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">روش‌های ارسال</h2>
                <div className="flex flex-wrap gap-4">
                    {shopSettings.shippingMethods.map((method, index) => (
                        <div key={index} className="bg-gray-100 px-4 py-2 rounded text-[#000] border border-gray-300">
                            {method}
                        </div>
                    ))}
                </div>
            </div>

            {/* درگاه‌های پرداخت */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] mb-8">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">درگاه‌های پرداخت</h2>
                <div className="flex flex-wrap gap-4">
                    {shopSettings.paymentGateways.map((gateway, index) => (
                        <div key={index} className="bg-gray-100 px-4 py-2 rounded text-[#000] border border-gray-300">
                            {gateway}
                        </div>
                    ))}
                </div>
            </div>

            {/* حداقل مبلغ سفارش */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] mb-8">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">حداقل مبلغ سفارش</h2>
                <input
                    type="number"
                    name="minOrderAmount"
                    value={shopSettings.minOrderAmount}
                    onChange={handleChange}
                    className="p-2 border rounded w-full md:w-1/2 focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                />
            </div>

            {/* دکمه ذخیره */}
            <div className="text-center">
                <button
                    onClick={handleSaveSettings}
                    className="bg-[#00509D] hover:bg-[#003F7D] text-white px-6 py-2 rounded transition duration-300"
                >
                    ذخیره تنظیمات
                </button>
            </div>
        </div>
    );
};

export default Settings;
