import React from "react";

const OrdersPage: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">مدیریت سفارشات</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">شماره سفارش</th>
                        <th className="py-2 px-4 border-b">وضعیت</th>
                        <th className="py-2 px-4 border-b">جزئیات</th>
                        <th className="py-2 px-4 border-b">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="py-2 px-4 border-b">#۱۲۳۴</td>
                        <td className="py-2 px-4 border-b">در حال پردازش</td>
                        <td className="py-2 px-4 border-b">
                            <button className="text-blue-500">مشاهده جزئیات</button>
                        </td>
                        <td className="py-2 px-4 border-b">
                            <button className="text-red-500">لغو سفارش</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">#۱۲۳۵</td>
                        <td className="py-2 px-4 border-b">ارسال شده</td>
                        <td className="py-2 px-4 border-b">
                            <button className="text-blue-500">مشاهده جزئیات</button>
                        </td>
                        <td className="py-2 px-4 border-b">
                            <button className="text-red-500">مرجوع کردن</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersPage;