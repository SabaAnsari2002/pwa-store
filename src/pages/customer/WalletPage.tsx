import React from "react";

const WalletPage: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md" style={{ direction: 'rtl' }}>
            <h2 className="text-2xl font-bold mb-6">کیف پول و روش‌های پرداخت</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">موجودی کیف پول</h3>
                    <p>۵۰۰,۰۰۰ تومان</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">شارژ کیف پول</button>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">کارت‌های بانکی</h3>
                    <p>**** **** **** ۱۲۳۴</p>
                    <button className="text-blue-500 mt-2">ویرایش</button>
                    <button className="text-red-500 mt-2 ml-2">حذف</button>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;