import React from "react";

const SupportPage: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md" style={{ direction: 'rtl' }}>
            <h2 className="text-2xl font-bold mb-6">پشتیبانی و تیکتینگ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">ارسال تیکت جدید</h3>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">موضوع</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">پیام</label>
                            <textarea className="w-full p-2 border rounded" rows={4} />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">ارسال تیکت</button>
                    </form>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">وضعیت تیکت‌ها</h3>
                    <ul>
                        <li>تیکت #۱۲۳: در حال بررسی</li>
                        <li>تیکت #۱۲۴: پاسخ داده شده</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;