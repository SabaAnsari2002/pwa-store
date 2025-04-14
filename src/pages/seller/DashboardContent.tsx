import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DashboardContent: React.FC = () => {
    // داده‌های نمونه برای نمودار
    const salesData = [
        { name: "فروردین", فروش: 4000 },
        { name: "اردیبهشت", فروش: 3000 },
        { name: "خرداد", فروش: 2000 },
        { name: "تیر", فروش: 2780 },
        { name: "مرداد", فروش: 1890 },
        { name: "شهریور", فروش: 2390 },
    ];

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان با خط کامل در زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    داشبورد اصلی
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            {/* کارت‌های اطلاعات کلی */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h2 className="text-lg font-semibold text-[#00509D]">فروش روزانه</h2>
                    <p className="text-2xl text-[#000000]">۱۰۰,۰۰۰ تومان</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h2 className="text-lg font-semibold text-[#00509D]">سفارشات جدید</h2>
                    <p className="text-2xl text-[#000000]">۵ سفارش</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h2 className="text-lg font-semibold text-[#00509D]">بازدید محصولات</h2>
                    <p className="text-2xl text-[#000000]">۱,۲۰۰ بازدید</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h2 className="text-lg font-semibold text-[#00509D]">درآمد ماهانه</h2>
                    <p className="text-2xl text-[#000000]">۲,۵۰۰,۰۰۰ تومان</p>
                </div>
            </div>

            {/* نمودار فروش ماهانه */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] mb-8">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">نمودار فروش ماهانه</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="فروش" fill="#00509D" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* جدول وضعیت سفارشات */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">وضعیت سفارشات</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-[#00509D]">شماره سفارش</th>
                            <th className="py-2 px-4 border-b text-[#00509D]">مشتری</th>
                            <th className="py-2 px-4 border-b text-[#00509D]">تاریخ</th>
                            <th className="py-2 px-4 border-b text-[#00509D]">مبلغ</th>
                            <th className="py-2 px-4 border-b text-[#00509D]">وضعیت</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b text-[#000000]">#۱۲۳۴۵</td>
                            <td className="py-2 px-4 border-b text-[#000000]">علی محمدی</td>
                            <td className="py-2 px-4 border-b text-[#000000]">۱۴۰۲/۰۷/۰۱</td>
                            <td className="py-2 px-4 border-b text-[#000000]">۱۵۰,۰۰۰ تومان</td>
                            <td className="py-2 px-4 border-b text-green-600">تحویل شده</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b text-[#000000]">#۱۲۳۴۶</td>
                            <td className="py-2 px-4 border-b text-[#000000]">فاطمه احمدی</td>
                            <td className="py-2 px-4 border-b text-[#000000]">۱۴۰۲/۰۷/۰۲</td>
                            <td className="py-2 px-4 border-b text-[#000000]">۲۰۰,۰۰۰ تومان</td>
                            <td className="py-2 px-4 border-b text-yellow-600">در حال پردازش</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b text-[#000000]">#۱۲۳۴۷</td>
                            <td className="py-2 px-4 border-b text-[#000000]">رضا حسینی</td>
                            <td className="py-2 px-4 border-b text-[#000000]">۱۴۰۲/۰۷/۰۳</td>
                            <td className="py-2 px-4 border-b text-[#000000]">۱۰۰,۰۰۰ تومان</td>
                            <td className="py-2 px-4 border-b text-red-600">لغو شده</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;