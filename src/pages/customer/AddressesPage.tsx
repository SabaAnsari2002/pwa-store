import React from "react";

const AddressesPage: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">مدیریت آدرس‌ها</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">آدرس پیش‌فرض</h3>
                    <p>تهران، خیابان آزادی، کوچه ۱۰، پلاک ۱۲</p>
                    <button className="text-blue-500 mt-2">ویرایش</button>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">آدرس دیگر</h3>
                    <p>اصفهان، خیابان امام، کوچه ۲۰، پلاک ۵</p>
                    <button className="text-blue-500 mt-2">ویرایش</button>
                    <button className="text-red-500 mt-2 ml-2">حذف</button>
                </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">اضافه کردن آدرس جدید</button>
        </div>
    );
};

export default AddressesPage;