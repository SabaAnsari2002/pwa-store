import React from "react";

const CompareProductsPage: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">مقایسه محصولات خریداری‌شده</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">محصول</th>
                        <th className="py-2 px-4 border-b">قیمت</th>
                        <th className="py-2 px-4 border-b">امتیاز</th>
                        <th className="py-2 px-4 border-b">توضیحات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="py-2 px-4 border-b">محصول ۱</td>
                        <td className="py-2 px-4 border-b">۱۰۰,۰۰۰ تومان</td>
                        <td className="py-2 px-4 border-b">۴.۵/۵</td>
                        <td className="py-2 px-4 border-b">توضیحات محصول ۱</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">محصول ۲</td>
                        <td className="py-2 px-4 border-b">۱۵۰,۰۰۰ تومان</td>
                        <td className="py-2 px-4 border-b">۴/۵</td>
                        <td className="py-2 px-4 border-b">توضیحات محصول ۲</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompareProductsPage;