import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";

// نمونه داده‌های فروش
const salesData = [
    { name: "فروردین", فروش: 4000 },
    { name: "اردیبهشت", فروش: 3000 },
    { name: "خرداد", فروش: 2000 },
    { name: "تیر", فروش: 2780 },
    { name: "مرداد", فروش: 1890 },
    { name: "شهریور", فروش: 2390 },
];

// نمونه داده‌های محصولات پرفروش
const topProductsData = [
    { name: "لپ‌تاپ ایسوس", فروش: 1200 },
    { name: "هدفون بلوتوث", فروش: 800 },
    { name: "کتاب React پیشرفته", فروش: 600 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const ReportsAndAnalytics: React.FC = () => {
    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان صفحه با خط زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    گزارشات و آنالیز فروش
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
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

            {/* نمودار محصولات پرفروش */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">محصولات پرفروش</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={topProductsData}
                            dataKey="فروش"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {topProductsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ReportsAndAnalytics;
