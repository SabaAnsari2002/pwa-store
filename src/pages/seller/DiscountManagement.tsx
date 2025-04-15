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
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان با خط کامل در زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    مدیریت تخفیف‌ها و جشنواره‌ها
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            {/* فرم افزودن تخفیف جدید */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] mb-8">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">افزودن تخفیف جدید</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-[#00509D] mb-1">کد تخفیف</label>
                        <input
                            type="text"
                            placeholder="مثال: SUMMER20"
                            value={newDiscount.code}
                            onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
                            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00509D]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#00509D] mb-1">نوع تخفیف</label>
                        <select
                            value={newDiscount.type}
                            onChange={(e) => setNewDiscount({ ...newDiscount, type: e.target.value })}
                            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00509D]"
                        >
                            <option value="درصدی">درصدی</option>
                            <option value="ثابت">ثابت</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#00509D] mb-1">
                            {newDiscount.type === "درصدی" ? "درصد تخفیف" : "مقدار تخفیف (تومان)"}
                        </label>
                        <input
                            type="number"
                            placeholder={newDiscount.type === "درصدی" ? "مثال: 20" : "مثال: 10000"}
                            value={newDiscount.value}
                            onChange={(e) => setNewDiscount({ ...newDiscount, value: +e.target.value })}
                            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00509D]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#00509D] mb-1">تاریخ شروع</label>
                        <input
                            type="text"
                            placeholder="۱۴۰۲/۰۷/۰۱"
                            value={newDiscount.startDate}
                            onChange={(e) => setNewDiscount({ ...newDiscount, startDate: e.target.value })}
                            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00509D]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#00509D] mb-1">تاریخ پایان</label>
                        <input
                            type="text"
                            placeholder="۱۴۰۲/۰۷/۱۰"
                            value={newDiscount.endDate}
                            onChange={(e) => setNewDiscount({ ...newDiscount, endDate: e.target.value })}
                            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00509D]"
                        />
                    </div>
                </div>
                <button
                    onClick={handleAddDiscount}
                    className="bg-[#00509D] text-white px-6 py-3 rounded-lg hover:bg-[#003F7D] transition"
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
                    className="p-3 border border-gray-300 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#00509D]"
                />
            </div>

            {/* لیست تخفیف‌ها */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">لیست تخفیف‌ها</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-3 px-4 border-b text-[#00509D]">کد تخفیف</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">نوع</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">مقدار</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">تاریخ شروع</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">تاریخ پایان</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">وضعیت</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredDiscounts.map((discount) => (
                            <tr key={discount.id}>
                                <td className="py-3 px-4 border-b text-[#000000] font-medium">{discount.code}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{discount.type}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">
                                    {discount.type === "درصدی" ? `${discount.value}%` : `${discount.value.toLocaleString()} تومان`}
                                </td>
                                <td className="py-3 px-4 border-b text-[#000000]">{discount.startDate}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{discount.endDate}</td>
                                <td className="py-3 px-4 border-b">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            discount.status === "فعال"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {discount.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 border-b">
                                    <button
                                        onClick={() => alert(`ویرایش تخفیف ${discount.code}`)}
                                        className="bg-[#FDC500] text-[#00296B] px-4 py-2 rounded-lg hover:bg-[#FFD700] transition mr-2"
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
                                        className="bg-[#D10000] text-white px-4 py-2 rounded-lg hover:bg-[#B00000] transition"
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

export default DiscountManagement;