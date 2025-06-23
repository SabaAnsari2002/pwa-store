import React, { useState } from "react";
import { MdAttachMoney, MdMoneyOff, MdSync, MdSearch } from "react-icons/md";
import { FiTrendingUp } from "react-icons/fi";
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from "recharts";

const initialTransactions = [
  { id: 1, date: "۱۴۰۲/۰۷/۰۱", amount: 1500000, type: "درآمد", status: "تسویه شده" },
  { id: 2, date: "۱۴۰۲/۰۷/۰۲", amount: 250000, type: "درآمد", status: "در انتظار تسویه" },
  { id: 3, date: "۱۴۰۲/۰۷/۰۳", amount: 100000, type: "هزینه", status: "تسویه شده" },
];

const FinancialManagement: React.FC = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter((t) =>
    t.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const income = transactions
    .filter((t) => t.type === "درآمد")
    .reduce((sum, t) => sum + t.amount, 0);
  const pending = transactions
    .filter((t) => t.status === "در انتظار تسویه")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "هزینه")
    .reduce((sum, t) => sum + t.amount, 0);

  const summaryData = [
    { name: "درآمد", value: income },
    { name: "هزینه", value: expenses },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6" style={{ direction: "rtl" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-indigo-800 relative inline-block">
            مدیریت مالی و تراکنش‌ها
            <span className="block w-24 h-1 bg-yellow-400 rounded-full mx-auto mt-2"></span>
          </h2>
          <p className="text-gray-500 mt-2">گزارش و وضعیت مالی شما در یک نگاه</p>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm pl-10"
            placeholder="جستجوی نوع تراکنش..."
          />
          <MdSearch className="absolute right-3 top-3.5 text-gray-400" size={20} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <SummaryCard
            title="کل درآمد"
            value={income}
            icon={<MdAttachMoney size={24} className="text-green-700" />}
            color="green"
          />
          <SummaryCard
            title="در انتظار تسویه"
            value={pending}
            icon={<MdSync size={24} className="text-yellow-700 animate-spin" />}
            color="yellow"
          />
          <SummaryCard
            title="کل هزینه‌ها"
            value={expenses}
            icon={<MdMoneyOff size={24} className="text-red-700" />}
            color="red"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500 mb-8">
          <h3 className="text-xl font-semibold text-indigo-700 mb-4">لیست تراکنش‌ها</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-bold text-gray-600">تاریخ</th>
                  <th className="px-6 py-3 text-right text-sm font-bold text-gray-600">مبلغ</th>
                  <th className="px-6 py-3 text-right text-sm font-bold text-gray-600">نوع</th>
                  <th className="px-6 py-3 text-right text-sm font-bold text-gray-600">وضعیت</th>
                  <th className="px-6 py-3 text-right text-sm font-bold text-gray-600">جزئیات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((t) => (
                  <tr key={t.id}>
                    <td className="px-6 py-4 text-sm text-gray-800">{t.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{t.amount.toLocaleString()} تومان</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{t.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        t.status === "تسویه شده"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md">
                        مشاهده
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
          <h3 className="text-xl font-semibold text-green-700 mb-4">نمودار وضعیت درآمد/هزینه</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={summaryData}>
              <XAxis dataKey="name" />
              <Tooltip
                formatter={(value: any) => [`${value.toLocaleString()} تومان`, "مقدار"]}
                contentStyle={{ borderRadius: "8px", border: "none" }}
              />
              <Area type="monotone" dataKey="value" stroke="#10B981" fill="#D1FAE5" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) => {
  return (
    <div className={`bg-${color}-100 p-5 rounded-xl flex items-center justify-between shadow-sm`}>
      <div>
        <h4 className={`text-${color}-700 font-semibold text-sm`}>{title}</h4>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value.toLocaleString()} تومان</p>
      </div>
      <div className={`bg-${color}-200 p-3 rounded-full`}>{icon}</div>
    </div>
  );
};

export default FinancialManagement;