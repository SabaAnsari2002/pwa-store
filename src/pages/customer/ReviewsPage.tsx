import React from "react";

const ReviewsPage: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">نظرات و بازخوردها</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">نظرات شما</h3>
                    <ul>
                        <li>محصول #۱۲۳۴: نظر شما ثبت شد</li>
                        <li>محصول #۱۲۳۵: نظر شما در حال بررسی است</li>
                    </ul>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">ثبت نظر جدید</h3>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">محصول</label>
                            <select className="w-full p-2 border rounded">
                                <option>محصول ۱</option>
                                <option>محصول ۲</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">نظر</label>
                            <textarea className="w-full p-2 border rounded" rows={4} />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">ثبت نظر</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;