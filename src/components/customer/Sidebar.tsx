import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
    const location = useLocation();

    const menuItems = [
        { to:"/", label: "خانه"},
        { to: "/customer-dashboard", label: "داشبورد" },
        { to: "/customer-dashboard/orders", label: "مدیریت سفارشات" },
        { to: "/customer-dashboard/addresses", label: "مدیریت آدرس‌ها" },
        { to: "/customer-dashboard/wallet", label: "کیف پول و روش‌های پرداخت" },
        { to: "/customer-dashboard/account-setting", label: "مدیریت پروفایل" },
        { to: "/customer-dashboard/discount", label: "سیستم تخفیف و امتیازدهی" },
        { to: "/customer-dashboard/support", label: "پشتیبانی و تیکتینگ" },
        { to: "/customer-dashboard/wishlist", label: "علاقه‌مندی‌ها و لیست خرید بعدی" },
        { to: "/customer-dashboard/reviews", label: "نظرات و بازخوردها" },
        { to: "/customer-dashboard/notifications", label: "اعلان‌ها و اطلاع‌رسانی‌ها" },
        { to: "/customer-dashboard/loyalty", label: "برنامه‌های وفاداری و سطح‌بندی مشتریان" },
    ];

    return (
        <aside
            className="w-full md:w-64 p-4 min-h-screen"
            style={{
                direction: "rtl",
                backgroundColor: "#00296B",
                color: "#ffffff",
            }}
        >
            <h2 className="text-2xl font-extrabold mb-8 border-b border-[#FDC500] pb-4">پنل مشتری</h2>
            <ul className="space-y-2">
                {menuItems.map(({ to, label }) => {
                    const isActive = location.pathname === to;

                    return (
                        <li key={to}>
                            <Link
                                to={to}
                                className={`block px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                                    isActive
                                        ? "bg-[#FFD500] text-[#00296B] border-r-4 border-[#FDC500] shadow-md"
                                        : "hover:bg-[#003F88] text-white"
                                }`}
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;
