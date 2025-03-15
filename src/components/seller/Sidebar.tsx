import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-6">پنل فروشنده</h2>
            <ul>
                <li className="mb-4">
                    <Link to="/seller-dashboard" className="block hover:bg-gray-700 p-2 rounded">
                        داشبورد
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/seller-dashboard/products" className="block hover:bg-gray-700 p-2 rounded">
                        مدیریت محصولات
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/seller-dashboard/orders" className="block hover:bg-gray-700 p-2 rounded">
                        مدیریت سفارشات
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/seller-dashboard/financial" className="block hover:bg-gray-700 p-2 rounded">
                        مدیریت مالی
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/seller-dashboard/customers" className="block hover:bg-gray-700 p-2 rounded">
                        مدیریت مشتریان
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/seller-dashboard/discounts" className="block hover:bg-gray-700 p-2 rounded">
                        مدیریت تخفیف‌ها
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/seller-dashboard/reports" className="block hover:bg-gray-700 p-2 rounded">
                        گزارشات و آنالیز
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/seller-dashboard/settings" className="block hover:bg-gray-700 p-2 rounded">
                        تنظیمات
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/seller-dashboard/team" className="block hover:bg-gray-700 p-2 rounded">
                        مدیریت تیم
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;