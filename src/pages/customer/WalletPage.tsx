import React from "react";

const WalletPage: React.FC = () => {
    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان با خط کامل در زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    کیف پول و روش‌های پرداخت
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* موجودی کیف پول */}
                    <div className="bg-white p-4 rounded-lg border border-[#E2E8F0]">
                        <h3 className="text-lg font-semibold mb-2 text-[#00509D]">موجودی کیف پول</h3>
                        <p className="text-2xl font-bold text-[#000000]">۵۰۰,۰۰۰ تومان</p>
                        <button className="bg-[#00509D] hover:bg-[#00296B] text-white px-4 py-2 rounded mt-3 transition-colors duration-300">
                            شارژ کیف پول
                        </button>
                    </div>

                    {/* کارت‌های بانکی */}
                    <div className="bg-white p-4 rounded-lg border border-[#E2E8F0]">
                        <h3 className="text-lg font-semibold mb-2 text-[#00509D]">کارت‌های بانکی</h3>
                        <p className="text-[#000000]">**** **** **** ۱۲۳۴</p>
                        <div className="mt-3">
                            <button className="text-[#00509D] hover:text-[#00296B]">ویرایش</button>
                            <button className="text-[#D30000] hover:text-[#9D0000] mr-3">حذف</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;