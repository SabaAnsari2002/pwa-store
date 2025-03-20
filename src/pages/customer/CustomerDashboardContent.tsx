import React from "react";

const CustomerDashboardContent: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">داشبورد مشتری</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* نمایش خلاصه اطلاعات کاربر */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">اطلاعات کاربر</h3>
                    <p>نام: جان دو</p>
                    <p>ایمیل: john.doe@example.com</p>
                    <p>شماره تماس: ۰۹۱۲۱۲۳۴۵۶۷</p>
                    <img src="/avatar.png" alt="آواتار" className="w-16 h-16 rounded-full mt-2" />
                </div>

                {/* نمایش وضعیت سفارش‌های اخیر */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">وضعیت سفارش‌های اخیر</h3>
                    <ul>
                        <li>سفارش #۱۲۳۴: در حال پردازش</li>
                        <li>سفارش #۱۲۳۵: ارسال شده</li>
                    </ul>
                </div>

                {/* نمایش کیف پول و تخفیف‌ها */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">کیف پول و تخفیف‌ها</h3>
                    <p>موجودی کیف پول: ۵۰۰,۰۰۰ تومان</p>
                    <p>تخفیف‌های فعال: ۱۰٪ تخفیف ویژه</p>
                </div>

                {/* پیشنهادات ویژه */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">پیشنهادات ویژه</h3>
                    <p>محصولات پیشنهادی بر اساس خریدهای قبلی</p>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboardContent;