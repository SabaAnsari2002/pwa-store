import React from "react";

const SupportPage: React.FC = () => {
    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان با خط کامل در زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    پشتیبانی و تیکتینگ
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* ارسال تیکت جدید */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500] col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold mb-4 text-[#00509D]">ارسال تیکت جدید</h3>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2 text-[#000000]">موضوع</label>
                            <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00509D]" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2 text-[#000000]">پیام</label>
                            <textarea className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00509D]" rows={4} />
                        </div>
                        <button type="submit" className="bg-[#00509D] hover:bg-[#003f7d] text-white px-4 py-2 rounded-lg transition-colors duration-300">
                            ارسال تیکت
                        </button>
                    </form>
                </div>

                {/* وضعیت تیکت‌ها */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-lg font-semibold mb-2 text-[#00509D]">وضعیت تیکت‌ها</h3>
                    <ul className="text-[#000000] space-y-1">
                        <li>تیکت #۱۲۳: در حال بررسی</li>
                        <li>تیکت #۱۲۴: پاسخ داده شده</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
