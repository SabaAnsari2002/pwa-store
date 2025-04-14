import React from "react";

const AddressesPage: React.FC = () => {
    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان با خط کامل در زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    مدیریت آدرس‌ها
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* آدرس پیش‌فرض */}
                    <div className="bg-white p-4 rounded-lg border border-[#E2E8F0]">
                        <h3 className="text-lg font-semibold mb-2 text-[#00509D]">آدرس پیش‌فرض</h3>
                        <p className="text-[#000000]">تهران، خیابان آزادی، کوچه ۱۰، پلاک ۱۲</p>
                        <button className="text-[#00509D] hover:text-[#00296B] mt-2">ویرایش</button>
                    </div>

                    {/* آدرس دیگر */}
                    <div className="bg-white p-4 rounded-lg border border-[#E2E8F0]">
                        <h3 className="text-lg font-semibold mb-2 text-[#00509D]">آدرس دیگر</h3>
                        <p className="text-[#000000]">اصفهان، خیابان امام، کوچه ۲۰، پلاک ۵</p>
                        <button className="text-[#00509D] hover:text-[#00296B] mt-2">ویرایش</button>
                        <button className="text-[#D30000] hover:text-[#9D0000] mt-2 ml-2">حذف</button>
                    </div>
                </div>

                {/* دکمه اضافه کردن آدرس جدید */}
                <button className="bg-[#00509D] hover:bg-[#00296B] text-white px-4 py-2 rounded mt-6 transition-colors duration-300">
                    اضافه کردن آدرس جدید
                </button>
            </div>
        </div>
    );
};

export default AddressesPage;