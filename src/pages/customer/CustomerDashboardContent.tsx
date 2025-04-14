import React from "react";

const CustomerDashboardContent: React.FC = () => {
    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان با خط کامل در زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    داشبورد مشتری
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            {/* بقیه کدها بدون تغییر */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* اطلاعات کاربر */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-lg font-semibold mb-2 text-[#00509D]">اطلاعات کاربر</h3>
                    <p className="text-[#000000]">نام: جان دو</p>
                    <p className="text-[#000000]">ایمیل: john.doe@example.com</p>
                    <p className="text-[#000000]">شماره تماس: ۰۹۱۲۱۲۳۴۵۶۷</p>
                    <img src="/avatar.png" alt="آواتار" className="w-16 h-16 rounded-full mt-2" />
                </div>

                {/* وضعیت سفارش‌ها */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-lg font-semibold mb-2 text-[#00509D]">وضعیت سفارش‌های اخیر</h3>
                    <ul className="text-[#000000]">
                        <li>سفارش #۱۲۳۴: در حال پردازش</li>
                        <li>سفارش #۱۲۳۵: ارسال شده</li>
                    </ul>
                </div>

                {/* کیف پول و تخفیف‌ها */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-lg font-semibold mb-2 text-[#00509D]">کیف پول و تخفیف‌ها</h3>
                    <p className="text-[#000000]">موجودی کیف پول: ۵۰۰,۰۰۰ تومان</p>
                    <p className="text-[#000000]">تخفیف‌های فعال: ۱۰٪ تخفیف ویژه</p>
                </div>

                {/* پیشنهادات ویژه */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-lg font-semibold mb-2 text-[#00509D]">پیشنهادات ویژه</h3>
                    <p className="text-[#000000]">محصولات پیشنهادی بر اساس خریدهای قبلی</p>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboardContent;