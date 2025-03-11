import React from "react";

interface Order {
    id: number;
    date: string;
    status: string;
    total: string;
}

interface OrdersProps {
    orders: Order[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
    return (
        <section className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">سفارش‌های اخیر</h2>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-2 text-left">#</th>
                    <th className="border border-gray-200 p-2 text-left">تاریخ</th>
                    <th className="border border-gray-200 p-2 text-left">وضعیت</th>
                    <th className="border border-gray-200 p-2 text-left">مجموع</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td className="border border-gray-200 p-2">{order.id}</td>
                        <td className="border border-gray-200 p-2">{order.date}</td>
                        <td
                            className={`border border-gray-200 p-2 ${
                                order.status === "Delivered"
                                    ? "text-green-500"
                                    : order.status === "Processing"
                                        ? "text-yellow-500"
                                        : "text-red-500"
                            }`}
                        >
                            {order.status}
                        </td>
                        <td className="border border-gray-200 p-2">{order.total}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};

export default Orders;
