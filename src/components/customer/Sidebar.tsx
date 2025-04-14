import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <div
            className="sidebar p-4 min-h-screen"
            style={{
                direction: 'rtl',
                textAlign: 'right',
                backgroundColor: '#00296B',
                color: '#ffffff',
            }}
        >
            <h2 className="text-2xl font-bold mb-6">پنل فروشنده</h2>
            <ul>
                {[
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
                    { to: "/customer-dashboard/compare-products", label: "مقایسه محصولات خریداری‌شده" },
                ].map(({ to, label }) => {
                    const isActive = location.pathname === to;
                    return (
                        <li key={to} className="mb-4">
                            <Link
                                to={to}
                                className={`block p-2 rounded transition-all duration-200 ${
                                    isActive
                                        ? "bg-[#FFD500] text-black border-r-4 border-[#FDC500]"
                                        : "hover:bg-[#00509D] text-white"
                                }`}
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
