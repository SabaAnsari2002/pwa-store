import React from "react";

const CompareProductsPage: React.FC = () => {
    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان با خط رنگی زیر */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    مقایسه محصولات خریداری‌شده
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            {/* کارت حاوی جدول */}
            <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-[#00509D] text-white">
                        <tr>
                            <th className="py-3 px-6 text-right">محصول</th>
                            <th className="py-3 px-6 text-right">قیمت</th>
                            <th className="py-3 px-6 text-right">امتیاز</th>
                            <th className="py-3 px-6 text-right">توضیحات</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="hover:bg-gray-50 transition">
                            <td className="py-4 px-6 border-b text-gray-800">محصول ۱</td>
                            <td className="py-4 px-6 border-b text-green-600 font-semibold">۱۰۰,۰۰۰ تومان</td>
                            <td className="py-4 px-6 border-b">۴.۵/۵</td>
                            <td className="py-4 px-6 border-b text-gray-600">توضیحات محصول ۱</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition">
                            <td className="py-4 px-6 border-b text-gray-800">محصول ۲</td>
                            <td className="py-4 px-6 border-b text-green-600 font-semibold">۱۵۰,۰۰۰ تومان</td>
                            <td className="py-4 px-6 border-b">۴/۵</td>
                            <td className="py-4 px-6 border-b text-gray-600">توضیحات محصول ۲</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompareProductsPage;
