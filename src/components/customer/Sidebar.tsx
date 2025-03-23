import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <div className="sidebar p-4" style={{ direction: 'rtl', textAlign: 'right' }}>
            <h2 className="text-2xl font-bold mb-6">پنل فروشنده</h2>
            <ul>
                <li className="mb-4">
                    <Link
                        to="/customer-dashboard"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/customer-dashboard" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        داشبورد
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/customer-dashboard/orders"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/customer-dashboard/orders" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        مدیریت سفارشات
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/customer-dashboard/addresses"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/customer-dashboard/addresses" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        مدیریت آدرس‌ها
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/customer-dashboard/wallet"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/customer-dashboard/wallet" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        کیف پول و روش‌های پرداخت
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/customer-dashboard/account-setting"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/customer-dashboard/account-setting" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        مدیریت پروفایل
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/customer-dashboard/discount"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/customer-dashboard/discount" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        سیستم تخفیف و امتیازدهی
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/customer-dashboard/support"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/customer-dashboard/support" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        پشتیبانی و تیکتینگ
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/customer-dashboard/wishlist"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/customer-dashboard/wishlist" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        علاقه‌مندی‌ها و لیست خرید بعدی
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/customer-dashboard/reviews"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/customer-dashboard/reviews" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        نظرات و بازخوردها
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/customer-dashboard/notifications"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/customer-dashboard/notifications" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        اعلان‌ها و اطلاع‌رسانی‌ها
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/customer-dashboard/loyalty"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/customer-dashboard/loyalty" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        برنامه‌های وفاداری و سطح‌بندی مشتریان
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/customer-dashboard/compare-products"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/customer-dashboard/compare-products" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        مقایسه محصولات خریداری‌شده
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;