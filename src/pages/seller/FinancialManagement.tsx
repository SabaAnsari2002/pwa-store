import React, { useState } from "react";
import { 
  MdAttachMoney, 
  MdMoneyOff, 
  MdSync, 
  MdSearch,
  MdOutlineReceipt,
  MdOutlineTrendingUp,
  MdOutlineShowChart
} from "react-icons/md";
import { FiTrendingUp, FiDownload, FiUpload } from "react-icons/fi";
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";

const initialTransactions = [
  { id: 1, date: "۱۴۰۲/۰۷/۰۱", amount: 1500000, type: "درآمد", status: "تسویه شده", category: "فروش محصول" },
  { id: 2, date: "۱۴۰۲/۰۷/۰۲", amount: 250000, type: "درآمد", status: "در انتظار تسویه", category: "خدمات" },
  { id: 3, date: "۱۴۰۲/۰۷/۰۳", amount: 100000, type: "هزینه", status: "تسویه شده", category: "تبلیغات" },
  { id: 4, date: "۱۴۰۲/۰۷/۰۴", amount: 320000, type: "درآمد", status: "تسویه شده", category: "اشتراک" },
  { id: 5, date: "۱۴۰۲/۰۷/۰۵", amount: 75000, type: "هزینه", status: "تسویه شده", category: "نرم‌افزار" },
];

const FinancialDashboard: React.FC = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("همه");

  const filteredTransactions = transactions.filter(t => 
    t.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeFilter === "همه" || t.status === activeFilter)
  );

  const income = transactions
    .filter(t => t.type === "درآمد")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const pending = transactions
    .filter(t => t.status === "در انتظار تسویه")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === "هزینه")
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = [
    { name: "فروردین", income: 1200000, expenses: 450000 },
    { name: "اردیبهشت", income: 1800000, expenses: 600000 },
    { name: "خرداد", income: 2100000, expenses: 750000 },
    { name: "تیر", income: 1650000, expenses: 550000 },
    { name: "مرداد", income: 2400000, expenses: 800000 },
    { name: "شهریور", income: 1950000, expenses: 650000 },
  ];

  return (
    <div className="bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] min-h-screen p-4 md:p-8" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b] flex items-center">
              <MdOutlineTrendingUp className="ml-2 text-indigo-600" size={28} />
              داشبورد مالی
            </h1>
            <p className="text-[#64748b] mt-2">وضعیت مالی و تراکنش‌های شما در یک نگاه</p>
          </div>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <MdSearch className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm pr-10 pl-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="جستجوی تراکنش‌ها..."
            />
          </div>
          <div className="flex space-x-2 space-x-reverse">
            {["همه", "تسویه شده", "در انتظار تسویه"].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg ${activeFilter === filter 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <SummaryCard
            title="کل درآمد"
            value={income}
            change="+12% نسبت به ماه گذشته"
            icon={<FiTrendingUp size={24} className="text-green-600" />}
            color="green"
          />
          <SummaryCard
            title="در انتظار تسویه"
            value={pending}
            change="2 تراکنش در انتظار"
            icon={<MdSync size={24} className="text-yellow-600 animate-spin" />}
            color="yellow"
          />
          <SummaryCard
            title="کل هزینه‌ها"
            value={expenses}
            change="-5% نسبت به ماه گذشته"
            icon={<MdMoneyOff size={24} className="text-red-600" />}
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border-l-4 border-indigo-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-indigo-700 flex items-center">
                <MdOutlineShowChart className="ml-2" />
                عملکرد مالی سالانه
              </h3>
              <select className="bg-gray-100 border border-gray-300 text-gray-700 py-1 px-3 rounded-lg focus:outline-none">
                <option>۱۴۰۲</option>
                <option>۱۴۰۱</option>
                <option>۱۴۰۰</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: any) => [`${value.toLocaleString()} تومان`, ""]}
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  name="درآمد" 
                  stroke="#10B981" 
                  fill="#D1FAE5" 
                  strokeWidth={2} 
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  name="هزینه" 
                  stroke="#EF4444" 
                  fill="#FECACA" 
                  strokeWidth={2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-green-700 flex items-center mb-4">
              <MdOutlineReceipt className="ml-2" />
              توزیع هزینه‌ها
            </h3>
            <div className="space-y-4">
              {[
                { category: "تبلیغات", amount: 450000, percentage: 45, color: "bg-blue-500" },
                { category: "نرم‌افزار", amount: 250000, percentage: 25, color: "bg-purple-500" },
                { category: "تجهیزات", amount: 150000, percentage: 15, color: "bg-yellow-500" },
                { category: "حقوق", amount: 100000, percentage: 10, color: "bg-red-500" },
                { category: "سایر", amount: 50000, percentage: 5, color: "bg-gray-500" },
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.category}</span>
                    <span className="font-medium">{item.amount.toLocaleString()} تومان</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full`} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-indigo-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-indigo-700 flex items-center">
              <MdOutlineReceipt className="ml-2" />
              آخرین تراکنش‌ها
            </h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              مشاهده همه تراکنش‌ها →
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">دسته‌بندی</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مبلغ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        t.type === "درآمد" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {t.category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      t.type === "درآمد" ? "text-green-600" : "text-red-600"
                    }`}>
                      {t.amount.toLocaleString()} تومان
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        t.status === "تسویه شده"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">ویرایش</button>
                      <button className="text-gray-500 hover:text-gray-700">جزئیات</button>
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

const SummaryCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  color 
}: { 
  title: string, 
  value: number, 
  change: string,
  icon: React.ReactNode, 
  color: string 
}) => {
  const colorClasses = {
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      iconBg: "bg-green-100",
      border: "border-green-500"
    },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      iconBg: "bg-yellow-100",
      border: "border-yellow-500"
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-700",
      iconBg: "bg-red-100",
      border: "border-red-500"
    }
  };

  return (
    <div className={`${colorClasses[color].bg} p-5 rounded-2xl shadow-sm border-t-4 ${colorClasses[color].border}`}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className={`${colorClasses[color].text} font-medium text-sm`}>{title}</h4>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value.toLocaleString()} تومان</p>
          <p className="text-xs text-gray-500 mt-2">{change}</p>
        </div>
        <div className={`${colorClasses[color].iconBg} p-3 rounded-lg`}>{icon}</div>
      </div>
    </div>
  );
};

export default FinancialDashboard;