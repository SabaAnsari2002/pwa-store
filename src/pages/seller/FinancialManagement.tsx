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

    // فیلتر کردن تراکنش‌ها بر اساس جستجو
    const filteredTransactions = transactions.filter((transaction) =>
        transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6" style={{ direction: 'rtl' }}>
            <h1 className="text-2xl font-bold mb-6">مدیریت مالی و پرداخت‌ها</h1>

            {/* جستجوی تراکنش‌ها */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="جستجوی تراکنش‌ها..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-full md:w-1/2"
                />
            </div>

            {/* لیست تراکنش‌ها */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">لیست تراکنش‌ها</h2>
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">تاریخ</th>
                        <th className="py-2 px-4 border-b">مبلغ</th>
                        <th className="py-2 px-4 border-b">نوع</th>
                        <th className="py-2 px-4 border-b">وضعیت</th>
                        <th className="py-2 px-4 border-b">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="py-2 px-4 border-b">{transaction.date}</td>
                            <td className="py-2 px-4 border-b">{transaction.amount.toLocaleString()} تومان</td>
                            <td className="py-2 px-4 border-b">{transaction.type}</td>
                            <td className="py-2 px-4 border-b">
                                    <span
                                        className={`p-1 rounded ${
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
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                >
                                    جزئیات
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* خلاصه مالی */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">خلاصه مالی</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-100 p-4 rounded-lg">
                        <h3 className="text-lg font-bold">کل درآمد</h3>
                        <p className="text-2xl">۱,۷۵۰,۰۰۰ تومان</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg">
                        <h3 className="text-lg font-bold">در انتظار تسویه</h3>
                        <p className="text-2xl">۲۵۰,۰۰۰ تومان</p>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg">
                        <h3 className="text-lg font-bold">کل هزینه‌ها</h3>
                        <p className="text-2xl">۱۰۰,۰۰۰ تومان</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialManagement;