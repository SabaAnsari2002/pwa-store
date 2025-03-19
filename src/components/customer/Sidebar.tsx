import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-6">پنل فروشنده</h2>
            <ul>
                <li className="mb-4">
                    <Link to="/customer-dashboard" className="block hover:bg-gray-700 p-2 rounded">
                        داشبورد
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/customer-dashboard/orders" className="block hover:bg-gray-700 p-2 rounded">
                        مدیریت سفارشات
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/customer-dashboard/addresses" className="block hover:bg-gray-700 p-2 rounded">
                        مدیریت آدرس‌ها
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/customer-dashboard/wallet" className="block hover:bg-gray-700 p-2 rounded">
                        کیف پول و روش‌های پرداخت
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/customer-dashboard/account-setting" className="block hover:bg-gray-700 p-2 rounded">
                        مدیریت پروفایل
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/customer-dashboard/discount" className="block hover:bg-gray-700 p-2 rounded">
                        سیستم تخفیف و امتیازدهی
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/customer-dashboard/support" className="block hover:bg-gray-700 p-2 rounded">
                        پشتیبانی و تیکتینگ
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/customer-dashboard/wishlist" className="block hover:bg-gray-700 p-2 rounded">
                        علاقه‌مندی‌ها و لیست خرید بعدی
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/customer-dashboard/reviews" className="block hover:bg-gray-700 p-2 rounded">
                        نظرات و بازخوردها
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/customer-dashboard/notifications" className="block hover:bg-gray-700 p-2 rounded">
                        اعلان‌ها و اطلاع‌رسانی‌ها
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/customer-dashboard/loyalty" className="block hover:bg-gray-700 p-2 rounded">
                        برنامه‌های وفاداری و سطح‌بندی مشتریان
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/customer-dashboard/compare-products" className="block hover:bg-gray-700 p-2 rounded">
                        مقایسه محصولات خریداری‌شده
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;