import React from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">داشبورد اصلی</h1>

            {/* کارت‌های اطلاعات کلی */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800">فروش روزانه</h2>
                    <p className="text-2xl text-green-600">۱۰۰,۰۰۰ تومان</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800">سفارشات جدید</h2>
                    <p className="text-2xl text-blue-600">۵ سفارش</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800">بازدید محصولات</h2>
                    <p className="text-2xl text-purple-600">۱,۲۰۰ بازدید</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800">درآمد ماهانه</h2>
                    <p className="text-2xl text-orange-600">۲,۵۰۰,۰۰۰ تومان</p>
                </div>
            </div>

            {/*/!* نمودار فروش ماهانه *!/*/}
            {/*<div className="bg-white p-6 rounded-lg shadow-md mb-8">*/}
            {/*    <h2 className="text-xl font-bold text-gray-800 mb-4">نمودار فروش ماهانه</h2>*/}
            {/*    <ResponsiveContainer width="100%" height={300}>*/}
            {/*        <BarChart data={salesData}>*/}
            {/*            <XAxis dataKey="name" />*/}
            {/*            <YAxis />*/}
            {/*            <Tooltip />*/}
            {/*            <Legend />*/}
            {/*            <Bar dataKey="فروش" fill="#8884d8" />*/}
            {/*        </BarChart>*/}
            {/*    </ResponsiveContainer>*/}
            {/*</div>*/}

            {/* جدول وضعیت سفارشات */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">وضعیت سفارشات</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">شماره سفارش</th>
                            <th className="py-2 px-4 border-b">مشتری</th>
                            <th className="py-2 px-4 border-b">تاریخ</th>
                            <th className="py-2 px-4 border-b">مبلغ</th>
                            <th className="py-2 px-4 border-b">وضعیت</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b">#۱۲۳۴۵</td>
                            <td className="py-2 px-4 border-b">علی محمدی</td>
                            <td className="py-2 px-4 border-b">۱۴۰۲/۰۷/۰۱</td>
                            <td className="py-2 px-4 border-b">۱۵۰,۰۰۰ تومان</td>
                            <td className="py-2 px-4 border-b text-green-600">تحویل شده</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">#۱۲۳۴۶</td>
                            <td className="py-2 px-4 border-b">فاطمه احمدی</td>
                            <td className="py-2 px-4 border-b">۱۴۰۲/۰۷/۰۲</td>
                            <td className="py-2 px-4 border-b">۲۰۰,۰۰۰ تومان</td>
                            <td className="py-2 px-4 border-b text-yellow-600">در حال پردازش</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">#۱۲۳۴۷</td>
                            <td className="py-2 px-4 border-b">رضا حسینی</td>
                            <td className="py-2 px-4 border-b">۱۴۰۲/۰۷/۰۳</td>
                            <td className="py-2 px-4 border-b">۱۰۰,۰۰۰ تومان</td>
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