import React from "react";

const NotificationsPage: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md" style={{ direction: 'rtl' }}>
            <h2 className="text-2xl font-bold mb-6">اعلان‌ها و اطلاع‌رسانی‌ها</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">پیام‌های مهم</h3>
                    <ul>
                        <li>سفارش #۱۲۳۴: ارسال شد</li>
                        <li>تخفیف ویژه: ۲۰٪ تخفیف برای خرید بعدی</li>
                    </ul>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">تنظیمات اعلان‌ها</h3>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">دریافت اعلان‌ها از طریق:</label>
                            <div>
                                <label className="inline-flex items-center">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="ml-2">ایمیل</span>
                                </label>
                                <label className="inline-flex items-center ml-4">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="ml-2">پیامک</span>
                                </label>
                                <label className="inline-flex items-center ml-4">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="ml-2">نوتیفیکیشن</span>
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">ذخیره تنظیمات</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;