import React from "react";

const WishlistPage: React.FC = () => {
    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان صفحه با طراحی جذاب */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    علاقه‌مندی‌ها و لیست خرید بعدی
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* محصول ۱ */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500] flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-[#00509D]">محصول ۱</h3>
                        <p className="text-[#333] mb-4">توضیحات محصول ۱</p>
                    </div>
                    <button className="bg-[#00509D] hover:bg-[#003f7d] text-white px-4 py-2 rounded-lg transition-colors duration-300 mt-auto">
                        افزودن به سبد خرید
                    </button>
                </div>

                {/* محصول ۲ */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500] flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-[#00509D]">محصول ۲</h3>
                        <p className="text-[#333] mb-4">توضیحات محصول ۲</p>
                    </div>
                    <button className="bg-[#00509D] hover:bg-[#003f7d] text-white px-4 py-2 rounded-lg transition-colors duration-300 mt-auto">
                        افزودن به سبد خرید
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
