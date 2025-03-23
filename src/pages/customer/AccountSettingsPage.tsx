import React from "react";

const AccountSettingsPage: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md" style={{ direction: 'rtl' }}>
            <h2 className="text-2xl font-bold mb-6">مدیریت پروفایل</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">نام</label>
                    <input type="text" className="w-full p-2 border rounded" defaultValue="جان دو" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">شماره موبایل</label>
                    <input type="text" className="w-full p-2 border rounded" defaultValue="۰۹۱۲۱۲۳۴۵۶۷" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">ایمیل</label>
                    <input type="email" className="w-full p-2 border rounded" defaultValue="john.doe@example.com" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">عکس پروفایل</label>
                    <input type="file" className="w-full p-2 border rounded" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">ذخیره تغییرات</button>
            </form>
        </div>
    );
};

export default AccountSettingsPage;