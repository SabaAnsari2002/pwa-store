import React from "react";

const LoyaltyPage: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">برنامه‌های وفاداری و سطح‌بندی مشتریان</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">سطح کاربری شما</h3>
                    <p>سطح: طلایی</p>
                    <p>مزایا: ۱۵٪ تخفیف ویژه</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">دعوت دوستان</h3>
                    <p>کد دعوت: INVITE123</p>
                    <p>برای هر دعوت موفق ۱۰۰ امتیاز دریافت کنید</p>
                </div>
            </div>
        </div>
    );
};

export default LoyaltyPage;