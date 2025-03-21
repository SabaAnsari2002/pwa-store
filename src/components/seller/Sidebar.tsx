import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
    const location = useLocation(); // استفاده از هوک useLocation برای دریافت مسیر فعلی

    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen p-4" style={{ direction: 'rtl', textAlign: 'right' }}>
            <h2 className="text-2xl font-bold mb-6">پنل فروشنده</h2>
            <ul>
                <li className="mb-4">
                    <Link
                        to="/seller-dashboard"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/seller-dashboard" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        داشبورد
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/seller-dashboard/products"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/seller-dashboard/products" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        مدیریت محصولات
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/seller-dashboard/orders"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/seller-dashboard/orders" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        مدیریت سفارشات
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/seller-dashboard/financial"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/seller-dashboard/financial" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        مدیریت مالی
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/seller-dashboard/customers"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/seller-dashboard/customers" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        مدیریت مشتریان
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/seller-dashboard/discounts"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/seller-dashboard/discounts" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        مدیریت تخفیف‌ها
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/seller-dashboard/reports"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/seller-dashboard/reports" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        گزارشات و آنالیز
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/seller-dashboard/settings"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/seller-dashboard/settings" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        تنظیمات
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/seller-dashboard/team"
                        className={`block hover:bg-gray-700 p-2 rounded ${
                            location.pathname === "/seller-dashboard/team" ? "bg-gray-700 border-r-4 border-blue-500" : ""
                        }`}
                    >
                        مدیریت تیم
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;