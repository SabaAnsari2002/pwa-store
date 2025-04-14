import React, { useState } from "react";

// نمونه داده‌های تراکنش‌ها
const initialTransactions = [
    { id: 1, date: "۱۴۰۲/۰۷/۰۱", amount: 1500000, type: "درآمد", status: "تسویه شده" },
    { id: 2, date: "۱۴۰۲/۰۷/۰۲", amount: 250000, type: "درآمد", status: "در انتظار تسویه" },
    { id: 3, date: "۱۴۰۲/۰۷/۰۳", amount: 100000, type: "هزینه", status: "تسویه شده" },
];

const FinancialManagement: React.FC = () => {
    const [transactions, setTransactions] = useState(initialTransactions);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTransactions = transactions.filter((transaction) =>
        transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان صفحه */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    مدیریت مالی و پرداخت‌ها
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            {/* بخش جستجو */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="جستجوی تراکنش‌ها..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-3 border border-[#D1D5DB] rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
                />
            </div>

            {/* جدول تراکنش‌ها */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] mb-8">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">لیست تراکنش‌ها</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-[#00509D]">تاریخ</th>
                            <th className="py-2 px-4 border-b text-[#00509D]">مبلغ</th>
                            <th className="py-2 px-4 border-b text-[#00509D]">نوع</th>
                            <th className="py-2 px-4 border-b text-[#00509D]">وضعیت</th>
                            <th className="py-2 px-4 border-b text-[#00509D]">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredTransactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td className="py-2 px-4 border-b text-[#000000]">{transaction.date}</td>
                                <td className="py-2 px-4 border-b text-[#000000]">
                                    {transaction.amount.toLocaleString()} تومان
                                </td>
                                <td className="py-2 px-4 border-b text-[#000000]">{transaction.type}</td>
                                <td className="py-2 px-4 border-b">
                                    <span
                                        className={`p-1 rounded text-sm font-medium ${
                                            transaction.status === "تسویه شده"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {transaction.status}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => alert(`جزئیات تراکنش #${transaction.id}`)}
                                        className="bg-[#00509D] text-white px-3 py-1 rounded hover:bg-[#003f7d] transition"
                                    >
                                        جزئیات
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* خلاصه مالی */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">خلاصه مالی</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-100 p-4 rounded-lg">
                        <h3 className="text-md font-semibold text-green-800">کل درآمد</h3>
                        <p className="text-2xl text-black">۱,۷۵۰,۰۰۰ تومان</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg">
                        <h3 className="text-md font-semibold text-yellow-800">در انتظار تسویه</h3>
                        <p className="text-2xl text-black">۲۵۰,۰۰۰ تومان</p>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg">
                        <h3 className="text-md font-semibold text-red-800">کل هزینه‌ها</h3>
                        <p className="text-2xl text-black">۱۰۰,۰۰۰ تومان</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialManagement;
