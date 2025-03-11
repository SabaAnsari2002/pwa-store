import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <aside className="col-span-3 bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">منو</h2>
            <nav>
                <ul className="space-y-3">
                    <li onClick={() => navigate("/dashboard")} className="text-blue-600 font-medium cursor-pointer">داشبورد</li>
                    <li onClick={() => navigate("/orders")} className="text-gray-600 hover:text-blue-600 cursor-pointer">سفارش‌ها</li>
                    <li onClick={() => navigate("/addresses")} className="text-gray-600 hover:text-blue-600 cursor-pointer">آدرس‌ها</li>
                    <li onClick={() => navigate("/wishlist")} className="text-gray-600 hover:text-blue-600 cursor-pointer">علاقه‌مندی‌ها</li>
                    <li onClick={() => navigate("/account-settings")} className="text-gray-600 hover:text-blue-600 cursor-pointer">تنظیمات حساب</li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
