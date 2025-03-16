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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">مدیریت مشتریان و پیام‌ها</h1>

            {/* جستجوی مشتریان و پیام‌ها */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="جستجوی مشتریان یا پیام‌ها..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-full md:w-1/2"
                />
            </div>

            {/* لیست مشتریان */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">لیست مشتریان</h2>
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">نام</th>
                        <th className="py-2 px-4 border-b">ایمیل</th>
                        <th className="py-2 px-4 border-b">تلفن</th>
                        <th className="py-2 px-4 border-b">تعداد خریدها</th>
                        <th className="py-2 px-4 border-b">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCustomers.map((customer) => (
                        <tr key={customer.id}>
                            <td className="py-2 px-4 border-b">{customer.name}</td>
                            <td className="py-2 px-4 border-b">{customer.email}</td>
                            <td className="py-2 px-4 border-b">{customer.phone}</td>
                            <td className="py-2 px-4 border-b">{customer.purchases}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => alert(`جزئیات مشتری ${customer.name}`)}
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

            {/* لیست پیام‌ها */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">لیست پیام‌ها</h2>
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">مشتری</th>
                        <th className="py-2 px-4 border-b">پیام</th>
                        <th className="py-2 px-4 border-b">تاریخ</th>
                        <th className="py-2 px-4 border-b">وضعیت</th>
                        <th className="py-2 px-4 border-b">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredMessages.map((message) => (
                        <tr key={message.id}>
                            <td className="py-2 px-4 border-b">{message.customer}</td>
                            <td className="py-2 px-4 border-b">{message.message}</td>
                            <td className="py-2 px-4 border-b">{message.date}</td>
                            <td className="py-2 px-4 border-b">
                                    <span
                                        className={`p-1 rounded ${
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
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => alert(`پاسخ به پیام ${message.customer}`)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
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
    );
};

export default CustomerManagement;