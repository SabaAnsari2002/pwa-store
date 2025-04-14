import React from "react";

const NotificationsPage: React.FC = () => {
    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان اصلی */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    اعلان‌ها و اطلاع‌رسانی‌ها
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* پیام‌های مهم */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-xl font-semibold mb-4 text-[#00509D]">پیام‌های مهم</h3>
                    <ul className="space-y-3 text-[#333]">
                        <li className="border-b pb-2">سفارش #۱۲۳۴: ارسال شد</li>
                        <li className="border-b pb-2">تخفیف ویژه: ۲۰٪ تخفیف برای خرید بعدی</li>
                    </ul>
                </div>

                {/* تنظیمات اعلان‌ها */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-xl font-semibold mb-4 text-[#00509D]">تنظیمات اعلان‌ها</h3>
                    <form>
                        <div className="mb-4 text-[#333]">
                            <label className="block text-sm font-medium mb-2">دریافت اعلان‌ها از طریق:</label>
                            <div className="space-y-2">
                                <label className="inline-flex items-center">
                                    <input type="checkbox" className="form-checkbox text-[#00509D]" />
                                    <span className="mr-2">ایمیل</span>
                                </label>
                                <label className="inline-flex items-center mr-6">
                                    <input type="checkbox" className="form-checkbox text-[#00509D]" />
                                    <span className="mr-2">پیامک</span>
                                </label>
                                <label className="inline-flex items-center mr-6">
                                    <input type="checkbox" className="form-checkbox text-[#00509D]" />
                                    <span className="mr-2">نوتیفیکیشن</span>
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="bg-[#00509D] hover:bg-[#003f7d] text-white px-4 py-2 rounded-lg transition duration-300">
                            ذخیره تنظیمات
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
