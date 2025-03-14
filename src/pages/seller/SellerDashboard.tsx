import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/seller/Sidebar";

const SellerDashboard: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default SellerDashboard;