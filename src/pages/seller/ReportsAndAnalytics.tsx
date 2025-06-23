import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { FiTrendingUp, FiPieChart, FiDollarSign, FiCalendar, FiAward } from "react-icons/fi";

const salesData = [
  { name: "فروردین", فروش: 4000, رشد: 15 },
  { name: "اردیبهشت", فروش: 3000, رشد: -5 },
  { name: "خرداد", فروش: 2000, رشد: -20 },
  { name: "تیر", فروش: 2780, رشد: 39 },
  { name: "مرداد", فروش: 1890, رشد: -32 },
  { name: "شهریور", فروش: 2390, رشد: 26 },
];

const topProductsData = [
  { name: "لپ‌تاپ ایسوس", فروش: 1200 },
  { name: "هدفون بلوتوث", فروش: 800 },
  { name: "کتاب React پیشرفته", فروش: 600 },
  { name: "ماوس گیمینگ", فروش: 450 },
  { name: "کیبورد مکانیکی", فروش: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const ReportsAndAnalytics: React.FC = () => {
  const totalSales = salesData.reduce((sum, item) => sum + item.فروش, 0);
  const avgMonthlySales = Math.round(totalSales / salesData.length);
  const growthRate = ((salesData[salesData.length - 1].فروش - salesData[salesData.length - 2].فروش) / 
                      salesData[salesData.length - 2].فروش * 100).toFixed(1);

  return (
    <div className="bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] min-h-screen p-4 md:p-8" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] flex items-center justify-center">
            <FiTrendingUp className="ml-2 text-[#3b82f6]" size={32} />
            گزارشات و آنالیز فروش
          </h1>
          <p className="text-[#64748b] mt-3 max-w-2xl mx-auto">
            تحلیل جامع عملکرد فروش و شناسایی فرصت‌های رشد کسب‌وکار
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-r-4 border-[#3b82f6]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#64748b] text-sm">فروش کل</p>
                <h3 className="text-2xl font-bold text-[#1e293b] mt-1">
                  {totalSales.toLocaleString()}
                  <span className="text-sm font-normal text-[#64748b] mr-1">تومان</span>
                </h3>
              </div>
              <div className="bg-[#3b82f6]/10 p-2 rounded-lg">
                <FiDollarSign className="text-[#3b82f6]" size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`flex items-center ${parseFloat(growthRate) >= 0 ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
                {parseFloat(growthRate) >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(growthRate))}%
              </span>
              <span className="text-[#64748b] mr-1">نسبت به ماه قبل</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-r-4 border-[#10b981]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#64748b] text-sm">میانگین ماهانه</p>
                <h3 className="text-2xl font-bold text-[#1e293b] mt-1">
                  {avgMonthlySales.toLocaleString()}
                  <span className="text-sm font-normal text-[#64748b] mr-1">تومان</span>
                </h3>
              </div>
              <div className="bg-[#10b981]/10 p-2 rounded-lg">
                <FiPieChart className="text-[#10b981]" size={20} />
              </div>
            </div>
            <div className="mt-4 text-sm text-[#64748b]">
              <span>در ۶ ماه گذشته</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-r-4 border-[#f59e0b]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#64748b] text-sm">بهترین ماه</p>
                <h3 className="text-2xl font-bold text-[#1e293b] mt-1">
                  {Math.max(...salesData.map(item => item.فروش)).toLocaleString()}
                  <span className="text-sm font-normal text-[#64748b] mr-1">تومان</span>
                </h3>
              </div>
              <div className="bg-[#f59e0b]/10 p-2 rounded-lg">
                <FiAward className="text-[#f59e0b]" size={20} />
              </div>
            </div>
            <div className="mt-4 text-sm text-[#64748b]">
              <span>ماه {salesData.find(item => item.فروش === Math.max(...salesData.map(i => i.فروش)))?.name}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-r-4 border-[#8b5cf6]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#64748b] text-sm">محصولات پرفروش</p>
                <h3 className="text-2xl font-bold text-[#1e293b] mt-1">
                  {topProductsData.length}
                  <span className="text-sm font-normal text-[#64748b] mr-1">محصول</span>
                </h3>
              </div>
              <div className="bg-[#8b5cf6]/10 p-2 rounded-lg">
                <FiTrendingUp className="text-[#8b5cf6]" size={20} />
              </div>
            </div>
            <div className="mt-4 text-sm text-[#64748b]">
              <span>براساس فروش ۳۰ روز گذشته</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border-t-4 border-[#3b82f6]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1e293b] flex items-center">
                <FiCalendar className="ml-2 text-[#3b82f6]" size={20} />
                نمودار فروش ماهانه
              </h2>
              <div className="flex space-x-2 space-x-reverse">
                <button className="px-3 py-1 text-sm bg-[#3b82f6] text-white rounded-lg">۶ ماهه</button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg">سالانه</button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                    formatter={(value) => [`${value} تومان`, "مبلغ فروش"]}
                  />
                  <Legend />
                  <Bar 
                    dataKey="فروش" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={2000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-[#8b5cf6]">
            <h2 className="text-xl font-bold text-[#1e293b] flex items-center mb-6">
              <FiAward className="ml-2 text-[#8b5cf6]" size={20} />
              محصولات پرفروش
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topProductsData}
                    dataKey="فروش"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={5}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {topProductsData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} تومان`, "مبلغ فروش"]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mt-6 border-t-4 border-[#10b981]">
          <h2 className="text-xl font-bold text-[#1e293b] flex items-center mb-6">
            <FiTrendingUp className="ml-2 text-[#10b981]" size={20} />
            جزئیات فروش ماهانه
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ماه</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مبلغ فروش</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">درصد رشد</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملکرد</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.فروش.toLocaleString()} تومان</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${item.رشد >= 0 ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
                      {item.رشد >= 0 ? '+' : ''}{item.رشد}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.رشد >= 0 ? 'bg-[#16a34a]' : 'bg-[#dc2626]'}`} 
                          style={{ width: `${Math.min(Math.abs(item.رشد) * 3, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;