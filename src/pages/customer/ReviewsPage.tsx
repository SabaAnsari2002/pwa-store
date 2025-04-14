import React from "react";

const ReviewsPage: React.FC = () => {
    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان صفحه */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    نظرات و بازخوردها
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* بخش نمایش نظرات قبلی */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-xl font-semibold mb-4 text-[#00509D]">نظرات شما</h3>
                    <ul className="space-y-3 text-[#333]">
                        <li className="border-b pb-2">محصول #۱۲۳۴: نظر شما ثبت شد</li>
                        <li className="border-b pb-2">محصول #۱۲۳۵: نظر شما در حال بررسی است</li>
                    </ul>
                </div>

                {/* فرم ثبت نظر جدید */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-xl font-semibold mb-4 text-[#00509D]">ثبت نظر جدید</h3>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">محصول</label>
                            <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FDC500]">
                                <option>محصول ۱</option>
                                <option>محصول ۲</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">نظر</label>
                            <textarea className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FDC500]" rows={4} />
                        </div>
                        <button type="submit" className="bg-[#00509D] hover:bg-[#003f7d] text-white px-4 py-2 rounded-lg transition duration-300">
                            ثبت نظر
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;
