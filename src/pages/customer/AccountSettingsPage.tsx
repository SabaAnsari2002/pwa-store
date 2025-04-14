import React from "react";

const AccountSettingsPage: React.FC = () => {
    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان با خط کامل در زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    مدیریت پروفایل
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                <form>
                    <div className="mb-6">
                        <label className="block text-lg font-medium mb-3 text-[#00509D]">نام</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                            defaultValue="جان دو"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg font-medium mb-3 text-[#00509D]">شماره موبایل</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                            defaultValue="۰۹۱۲۱۲۳۴۵۶۷"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg font-medium mb-3 text-[#00509D]">ایمیل</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                            defaultValue="john.doe@example.com"
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-lg font-medium mb-3 text-[#00509D]">عکس پروفایل</label>
                        <div className="flex items-center">
                            <img
                                src="/avatar.png"
                                alt="پروفایل فعلی"
                                className="w-16 h-16 rounded-full mr-4 border-2 border-[#FDC500]"
                            />
                            <input
                                type="file"
                                className="w-full p-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#00509D] hover:bg-[#00296B] text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-300 w-full md:w-auto"
                    >
                        ذخیره تغییرات
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccountSettingsPage;