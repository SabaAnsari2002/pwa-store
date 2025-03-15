import React, { useState } from "react";

// نمونه داده‌های سفارشات
const initialOrders = [
    { id: 1, customer: "علی محمدی", date: "۱۴۰۲/۰۷/۰۱", total: 1500000, status: "تحویل شده" },
    { id: 2, customer: "فاطمه احمدی", date: "۱۴۰۲/۰۷/۰۲", total: 250000, status: "در حال پردازش" },
    { id: 3, customer: "رضا حسینی", date: "۱۴۰۲/۰۷/۰۳", total: 1000000, status: "لغو شده" },
];

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [searchQuery, setSearchQuery] = useState("");

    // تغییر وضعیت سفارش
    const handleChangeStatus = (id: number, newStatus: string) => {
        const updatedOrders = orders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };

    // فیلتر کردن سفارشات بر اساس جستجو
    const filteredOrders = orders.filter((order) =>
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">مدیریت سفارشات</h1>

            {/* جستجوی سفارشات */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="جستجوی سفارشات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-full md:w-1/2"
                />
            </div>

            {/* لیست سفارشات */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">لیست سفارشات</h2>
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">شماره سفارش</th>
                        <th className="py-2 px-4 border-b">مشتری</th>
                        <th className="py-2 px-4 border-b">تاریخ</th>
                        <th className="py-2 px-4 border-b">مبلغ</th>
                        <th className="py-2 px-4 border-b">وضعیت</th>
                        <th className="py-2 px-4 border-b">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order.id}>
                            <td className="py-2 px-4 border-b">#{order.id}</td>
                            <td className="py-2 px-4 border-b">{order.customer}</td>
                            <td className="py-2 px-4 border-b">{order.date}</td>
                            <td className="py-2 px-4 border-b">{order.total.toLocaleString()} تومان</td>
                            <td className="py-2 px-4 border-b">
                                <select
                                    value={order.status}
                                    onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                                    className={`p-1 rounded ${
                                        order.status === "تحویل شده"
                                            ? "bg-green-100 text-green-800"
                                            : order.status === "در حال پردازش"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    <option value="تحویل شده">تحویل شده</option>
                                    <option value="در حال پردازش">در حال پردازش</option>
                                    <option value="لغو شده">لغو شده</option>
                                </select>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => alert(`جزئیات سفارش #${order.id}`)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    جزئیات
                                </button>
                                <button
                                    onClick={() => {
                                        const confirmDelete = window.confirm(
                                            `آیا از حذف سفارش #${order.id} مطمئن هستید؟`
                                        );
                                        if (confirmDelete) {
                                            const updatedOrders = orders.filter((o) => o.id !== order.id);
                                            setOrders(updatedOrders);
                                        }
                                    }}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    حذف
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManagement;