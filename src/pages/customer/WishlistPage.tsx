import React from "react";

const WishlistPage: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md" style={{ direction: 'rtl' }}>
            <h2 className="text-2xl font-bold mb-6">علاقه‌مندی‌ها و لیست خرید بعدی</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">محصول ۱</h3>
                    <p>توضیحات محصول ۱</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">افزودن به سبد خرید</button>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">محصول ۲</h3>
                    <p>توضیحات محصول ۲</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">افزودن به سبد خرید</button>
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;