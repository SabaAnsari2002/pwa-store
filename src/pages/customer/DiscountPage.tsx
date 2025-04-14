import React from "react";

const DiscountPage: React.FC = () => {
    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان با خط کامل در زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    سیستم تخفیف و امتیازدهی
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* کدهای تخفیف فعال */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-lg font-semibold mb-2 text-[#00509D]">کدهای تخفیف فعال</h3>
                    <p className="text-[#000000]">کد تخفیف: WELCOME10</p>
                    <p className="text-[#000000]">اعتبار: ۱۰٪ تخفیف برای خرید بعدی</p>
                </div>

                {/* امتیازات کاربر */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-lg font-semibold mb-2 text-[#00509D]">امتیازات شما</h3>
                    <p className="text-[#000000]">امتیازات کل: ۵۰۰</p>
                    <p className="text-[#000000]">امتیازات قابل استفاده: ۲۰۰</p>
                </div>
            </div>
        </div>
    );
};

export default DiscountPage;
