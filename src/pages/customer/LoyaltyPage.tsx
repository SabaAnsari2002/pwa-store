import React from "react";

const LoyaltyPage: React.FC = () => {
    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان اصلی */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    برنامه‌های وفاداری و سطح‌بندی مشتریان
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* سطح کاربری */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-xl font-semibold mb-3 text-[#00509D]">سطح کاربری شما</h3>
                    <p className="text-[#333] mb-1">سطح: <span className="font-bold text-yellow-500">طلایی</span></p>
                    <p className="text-[#333]">مزایا: <span className="text-green-600 font-semibold">۱۵٪ تخفیف ویژه</span></p>
                </div>

                {/* دعوت دوستان */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-xl font-semibold mb-3 text-[#00509D]">دعوت دوستان</h3>
                    <p className="text-[#333] mb-2">کد دعوت: <span className="font-mono bg-gray-200 px-2 py-1 rounded">INVITE123</span></p>
                    <p className="text-[#333]">برای هر دعوت موفق <span className="font-bold text-blue-600">۱۰۰ امتیاز</span> دریافت کنید</p>
                </div>
            </div>
        </div>
    );
};

export default LoyaltyPage;
