import React, { useEffect, useState } from "react";
import axios from "axios";

interface Discount {
    id: number;
    title: string;
    code: string;
    description: string;
    percentage: number;
    for_first_purchase: boolean;
}

const DiscountPage: React.FC = () => {
    const [discounts, setDiscounts] = useState<Discount[]>([]);

    useEffect(() => {
        const fetchDiscounts = async () => {
            const token = localStorage.getItem("access_token");
            try {
                const res = await axios.get("http://localhost:8000/api/users/discounts/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDiscounts(res.data);
            } catch (err) {
                console.error("Error fetching discounts", err);
            }
        };

        fetchDiscounts();
    }, []);

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    سیستم تخفیف و امتیازدهی
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {discounts.map((d) => (
                        <div
                            key={d.id}
                            className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]"
                        >
                            <h3 className="text-lg font-semibold mb-2 text-[#00509D]">{d.title}</h3>
                            <p className="text-[#000000]">کد تخفیف: {d.code}</p>
                            <p className="text-[#000000]">{d.description}</p>
                            <p className="text-[#000000]">{d.percentage}% تخفیف</p>
                            {d.for_first_purchase && (
                                <p className="text-sm text-green-600">ویژه اولین خرید</p>
                            )}
                        </div>
                    ))}
                </div>

                <hr className="border-t-2 border-gray-300 my-4" />

                <div className="flex justify-start">
                    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-2 text-[#00509D]">امتیازات شما</h3>
                        <p className="text-[#000000]">امتیازات کل: ۵۰۰</p>
                        <p className="text-[#000000]">امتیازات قابل استفاده: ۲۰۰</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountPage;
