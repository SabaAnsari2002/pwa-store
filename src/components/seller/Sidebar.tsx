import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
    const location = useLocation();

    const menuItems = [
        { to: "/seller-dashboard", label: "داشبورد" },
        { to: "/seller-dashboard/products", label: "مدیریت محصولات" },
        { to: "/seller-dashboard/orders", label: "مدیریت سفارشات" },
        { to: "/seller-dashboard/financial", label: "مدیریت مالی" },
        { to: "/seller-dashboard/customers", label: "مدیریت مشتریان" },
        { to: "/seller-dashboard/discounts", label: "مدیریت تخفیف‌ها" },
        { to: "/seller-dashboard/reports", label: "گزارشات و آنالیز" },
        { to: "/seller-dashboard/settings", label: "تنظیمات" },
        { to: "/seller-dashboard/team", label: "مدیریت تیم" },
    ];

    return (
        <aside
            className="w-full md:w-64 p-4 min-h-screen"
            style={{
                direction: "rtl",
                backgroundColor: "#00296B",
                color: "#ffffff",
                textAlign: "right",
            }}
        >
            <h2 className="text-2xl font-extrabold mb-8 border-b border-[#FDC500] pb-4">پنل فروشنده</h2>
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

////////
////
//////