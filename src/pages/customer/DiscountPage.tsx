import React from "react";

const DiscountPage: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">سیستم تخفیف و امتیازدهی</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">کدهای تخفیف فعال</h3>
                    <p>کد تخفیف: WELCOME10</p>
                    <p>اعتبار: ۱۰٪ تخفیف برای خرید بعدی</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">امتیازات شما</h3>
                    <p>امتیازات: ۵۰۰ امتیاز</p>
                    <p>امتیازات قابل استفاده: ۲۰۰ امتیاز</p>
                </div>
            </div>
        </div>
    );
};

export default DiscountPage;