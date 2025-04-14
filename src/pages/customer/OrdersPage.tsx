import React from "react";

const OrdersPage: React.FC = () => {
    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان با خط کامل در زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    مدیریت سفارشات
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr className="text-[#00509D]">
                            <th className="py-2 px-4 border-b">شماره سفارش</th>
                            <th className="py-2 px-4 border-b">وضعیت</th>
                            <th className="py-2 px-4 border-b">جزئیات</th>
                            <th className="py-2 px-4 border-b">عملیات</th>
                        </tr>
                        </thead>
                        <tbody className="text-[#000000]">
                        <tr>
                            <td className="py-2 px-4 border-b">#۱۲۳۴</td>
                            <td className="py-2 px-4 border-b">در حال پردازش</td>
                            <td className="py-2 px-4 border-b">
                                <button className="text-[#00509D] hover:text-[#00296B]">مشاهده جزئیات</button>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button className="text-[#D30000] hover:text-[#9D0000]">لغو سفارش</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">#۱۲۳۵</td>
                            <td className="py-2 px-4 border-b">ارسال شده</td>
                            <td className="py-2 px-4 border-b">
                                <button className="text-[#00509D] hover:text-[#00296B]">مشاهده جزئیات</button>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button className="text-[#D30000] hover:text-[#9D0000]">مرجوع کردن</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;