import React, { useState } from "react";

// نمونه داده‌های مشتریان
const initialCustomers = [
    { id: 1, name: "علی محمدی", email: "ali@example.com", phone: "09123456789", purchases: 5 },
    { id: 2, name: "فاطمه احمدی", email: "fatemeh@example.com", phone: "09129876543", purchases: 3 },
    { id: 3, name: "رضا حسینی", email: "reza@example.com", phone: "09121234567", purchases: 10 },
];

// نمونه داده‌های پیام‌ها
const initialMessages = [
    { id: 1, customer: "علی محمدی", message: "سلام، محصول کی ارسال می‌شود؟", date: "۱۴۰۲/۰۷/۰۱", status: "خوانده نشده" },
    { id: 2, customer: "فاطمه احمدی", message: "آیا تخفیف ویژه‌ای دارید؟", date: "۱۴۰۲/۰۷/۰۲", status: "پاسخ داده شده" },
    { id: 3, customer: "رضا حسینی", message: "مشکلی در پرداخت داشتم.", date: "۱۴۰۲/۰۷/۰۳", status: "در حال بررسی" },
];

const CustomerManagement: React.FC = () => {
    const [customers, setCustomers] = useState(initialCustomers);
    const [messages, setMessages] = useState(initialMessages);
    const [searchQuery, setSearchQuery] = useState("");

    // فیلتر کردن مشتریان بر اساس جستجو
    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // فیلتر کردن پیام‌ها بر اساس جستجو
    const filteredMessages = messages.filter((message) =>
        message.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان با خط کامل در زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    مدیریت مشتریان و پیام‌ها
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            {/* جستجوی مشتریان و پیام‌ها */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="جستجوی مشتریان یا پیام‌ها..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#00509D]"
                />
            </div>

            {/* لیست مشتریان */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] mb-8">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">لیست مشتریان</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-3 px-4 border-b text-[#00509D]">نام</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">ایمیل</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">تلفن</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">تعداد خریدها</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="py-3 px-4 border-b text-[#000000]">{customer.name}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{customer.email}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{customer.phone}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{customer.purchases}</td>
                                <td className="py-3 px-4 border-b">
                                    <button
                                        onClick={() => alert(`جزئیات مشتری ${customer.name}`)}
                                        className="bg-[#00509D] text-white px-4 py-2 rounded hover:bg-[#003F7D] transition"
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

            {/* لیست پیام‌ها */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">لیست پیام‌ها</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-3 px-4 border-b text-[#00509D]">مشتری</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">پیام</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">تاریخ</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">وضعیت</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredMessages.map((message) => (
                            <tr key={message.id}>
                                <td className="py-3 px-4 border-b text-[#000000]">{message.customer}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{message.message}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{message.date}</td>
                                <td className="py-3 px-4 border-b">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            message.status === "خوانده نشده"
                                                ? "bg-red-100 text-red-800"
                                                : message.status === "پاسخ داده شده"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {message.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 border-b">
                                    <button
                                        onClick={() => alert(`پاسخ به پیام ${message.customer}`)}
                                        className="bg-[#00509D] text-white px-4 py-2 rounded hover:bg-[#003F7D] transition"
                                    >
                                        پاسخ
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

export default CustomerManagement;