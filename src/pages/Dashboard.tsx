import React from "react";
import Header from "../components/profile/Header";
import Sidebar from "../components/profile/Sidebar";
import UserInfo from "../components/profile/UserInfo";
import Orders from "../components/profile/Orders";
import Addresses from "../components/profile/Addresses";
import Wishlist from "../components/profile/Wishlist";

const Dashboard: React.FC = () => {
    const user = {
        name: "Jenny Wilson",
        email: "jenny.w@gmail.com",
        phone: "(817) 234-3244",
        orders: [
            { id: 1, date: "2023-03-01", status: "Delivered", total: "$120.00" },
            { id: 2, date: "2023-02-15", status: "Processing", total: "$85.50" },
            { id: 3, date: "2023-02-10", status: "Canceled", total: "$45.00" },
        ],
        addresses: [
            { id: 1, title: "Home", details: "123 Main Street, New York" },
            { id: 2, title: "Work", details: "456 Office Park, Los Angeles" },
        ],
        wishlist: [
            { id: 1, name: "Wireless Headphones", price: "$99.99" },
            { id: 2, name: "Smart Watch", price: "$199.99" },
        ],
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6 grid grid-cols-12 gap-6">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="col-span-9">
                    {/* اطلاعات کاربر */}
                    <UserInfo name={user.name} email={user.email} phone={user.phone} />

                    {/* سفارش‌ها */}
                    <Orders orders={user.orders} />

                    {/* آدرس‌ها */}
                    <Addresses addresses={user.addresses} />

                    {/* علاقه‌مندی‌ها */}
                    <Wishlist wishlist={user.wishlist} />
                </main>
            </div>
        </>
    );
};

export default Dashboard;
