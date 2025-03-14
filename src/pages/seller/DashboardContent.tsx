import React from "react";

const DashboardContent: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">داشبورد اصلی</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold">فروش روزانه</h2>
                    <p>۱۰۰,۰۰۰ تومان</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold">سفارشات</h2>
                    <p>۵ سفارش جدید</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold">بازدید محصولات</h2>
                    <p>۱,۲۰۰ بازدید</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;