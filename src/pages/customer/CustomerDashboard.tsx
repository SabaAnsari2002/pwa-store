import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/customer/Sidebar";
import "../css/DashboardSlider.css";

const CustomerDashboard: React.FC = () => {
    return (
        <div className="flex flex-row-reverse min-h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar Container */}
            <div className="sidebar-container w-64 bg-gray-800 text-white h-screen overflow-y-auto">
                <Sidebar />
            </div>

            {/* Content Container */}
            <div className="content flex-1 p-8 overflow-y-auto h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default CustomerDashboard;
