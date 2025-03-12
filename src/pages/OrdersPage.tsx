import React from "react";
import Header from "../components/profile/Header";
import Sidebar from "../components/profile/Sidebar";
import Orders from "../components/profile/Orders";

const OrdersPage: React.FC = () => {
    const orders = [
        { id: 1, date: "2023-03-01", status: "Delivered", total: "$120.00" },
        { id: 2, date: "2023-02-15", status: "Processing", total: "$85.50" },
        { id: 3, date: "2023-02-10", status: "Canceled", total: "$45.00" },
    ];

    return (
        <>
            <Header />
            <div className="container mx-auto p-6 grid grid-cols-12 gap-6">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="col-span-9">
                    <Orders orders={orders} />
                </main>
            </div>
        </>
    );
};

export default OrdersPage;
