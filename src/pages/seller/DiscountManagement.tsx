import React, { useState } from "react";

// نمونه داده‌های تخفیف‌ها
const initialDiscounts = [
    { id: 1, code: "SUMMER20", type: "درصدی", value: 20, startDate: "۱۴۰۲/۰۷/۰۱", endDate: "۱۴۰۲/۰۷/۱۰", status: "فعال" },
    { id: 2, code: "WELCOME10", type: "ثابت", value: 10000, startDate: "۱۴۰۲/۰۷/۰۵", endDate: "۱۴۰۲/۰۷/۱۵", status: "منقضی شده" },
];

const DiscountManagement: React.FC = () => {
    const [discounts, setDiscounts] = useState(initialDiscounts);
    const [newDiscount, setNewDiscount] = useState({ code: "", type: "درصدی", value: 0, startDate: "", endDate: "" });
    const [searchQuery, setSearchQuery] = useState("");

    // افزودن تخفیف جدید
    const handleAddDiscount = () => {
        if (newDiscount.code && newDiscount.startDate && newDiscount.endDate) {
            const discount = { id: discounts.length + 1, ...newDiscount, status: "فعال" };
            setDiscounts([...discounts, discount]);
            setNewDiscount({ code: "", type: "درصدی", value: 0, startDate: "", endDate: "" });
        } else {
            alert("لطفاً تمام فیلدها را به درستی پر کنید.");
        }
    };

    // فیلتر کردن تخفیف‌ها بر اساس جستجو
    const filteredDiscounts = discounts.filter((discount) =>
        discount.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">مدیریت تخفیف‌ها و جشنواره‌ها</h1>

            {/* فرم افزودن تخفیف جدید */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">افزودن تخفیف جدید</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="کد تخفیف"
                        value={newDiscount.code}
                        onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <select
                        value={newDiscount.type}
                        onChange={(e) => setNewDiscount({ ...newDiscount, type: e.target.value })}
                        className="p-2 border rounded"
                    >
                        <option value="درصدی">درصدی</option>
                        <option value="ثابت">ثابت</option>
                    </select>
                    <input
                        type="number"
                        placeholder="مقدار تخفیف"
                        value={newDiscount.value}
                        onChange={(e) => setNewDiscount({ ...newDiscount, value: +e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="تاریخ شروع (۱۴۰۲/۰۷/۰۱)"
                        value={newDiscount.startDate}
                        onChange={(e) => setNewDiscount({ ...newDiscount, startDate: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="تاریخ پایان (۱۴۰۲/۰۷/۱۰)"
                        value={newDiscount.endDate}
                        onChange={(e) => setNewDiscount({ ...newDiscount, endDate: e.target.value })}
                        className="p-2 border rounded"
                    />
                </div>
                <button
                    onClick={handleAddDiscount}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    افزودن تخفیف
                </button>
            </div>

            {/* جستجوی تخفیف‌ها */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="جستجوی تخفیف‌ها..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-full md:w-1/2"
                />
            </div>

            {/* لیست تخفیف‌ها */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">لیست تخفیف‌ها</h2>
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">کد تخفیف</th>
                        <th className="py-2 px-4 border-b">نوع</th>
                        <th className="py-2 px-4 border-b">مقدار</th>
                        <th className="py-2 px-4 border-b">تاریخ شروع</th>
                        <th className="py-2 px-4 border-b">تاریخ پایان</th>
                        <th className="py-2 px-4 border-b">وضعیت</th>
                        <th className="py-2 px-4 border-b">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredDiscounts.map((discount) => (
                        <tr key={discount.id}>
                            <td className="py-2 px-4 border-b">{discount.code}</td>
                            <td className="py-2 px-4 border-b">{discount.type}</td>
                            <td className="py-2 px-4 border-b">
                                {discount.type === "درصدی" ? `${discount.value}%` : `${discount.value.toLocaleString()} تومان`}
                            </td>
                            <td className="py-2 px-4 border-b">{discount.startDate}</td>
                            <td className="py-2 px-4 border-b">{discount.endDate}</td>
                            <td className="py-2 px-4 border-b">
                                    <span
                                        className={`p-1 rounded ${
                                            discount.status === "فعال"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {discount.status}
                                    </span>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => alert(`ویرایش تخفیف ${discount.code}`)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    ویرایش
                                </button>
                                <button
                                    onClick={() => {
                                        const confirmDelete = window.confirm(
                                            `آیا از حذف تخفیف ${discount.code} مطمئن هستید؟`
                                        );
                                        if (confirmDelete) {
                                            const updatedDiscounts = discounts.filter((d) => d.id !== discount.id);
                                            setDiscounts(updatedDiscounts);
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

export default DiscountManagement;