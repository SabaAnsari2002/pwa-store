import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">گزارشات و آنالیز فروش</h1>

            {/* نمودار فروش ماهانه */}


            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">نمودار فروش ماهانه</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="فروش" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* نمودار محصولات پرفروش */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">محصولات پرفروش</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={topProductsData}
                            dataKey="فروش"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
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