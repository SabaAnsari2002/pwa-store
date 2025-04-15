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
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان با خط کامل در زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    مدیریت سفارشات
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            {/* جستجوی سفارشات */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] mb-8">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">جستجوی سفارشات</h2>
                <input
                    type="text"
                    placeholder="جستجوی سفارشات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-full md:w-1/2 focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                />
            </div>

            {/* لیست سفارشات */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">لیست سفارشات</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-3 px-4 border-b text-[#00509D]">شماره سفارش</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">مشتری</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">تاریخ</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">مبلغ</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">وضعیت</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td className="py-3 px-4 border-b text-[#000000]">#{order.id}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{order.customer}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{order.date}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{order.total.toLocaleString()} تومان</td>
                                <td className="py-3 px-4 border-b">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                                        className={`p-1 rounded border ${
                                            order.status === "تحویل شده"
                                                ? "bg-green-100 text-green-800 border-green-300"
                                                : order.status === "در حال پردازش"
                                                    ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                                    : "bg-red-100 text-red-800 border-red-300"
                                        } focus:ring-2 focus:ring-[#00509D] focus:border-transparent`}
                                    >
                                        <option value="تحویل شده">تحویل شده</option>
                                        <option value="در حال پردازش">در حال پردازش</option>
                                        <option value="لغو شده">لغو شده</option>
                                    </select>
                                </td>
                                <td className="py-3 px-4 border-b">
                                    <button
                                        onClick={() => alert(`جزئیات سفارش #${order.id}`)}
                                        className="bg-[#00509D] hover:bg-[#003F7D] text-white px-3 py-1 rounded ml-2 transition duration-300"
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
                                        className="bg-[#D62828] hover:bg-[#B21F1F] text-white px-3 py-1 rounded transition duration-300"
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
        </div>
    );
};

export default OrderManagement;