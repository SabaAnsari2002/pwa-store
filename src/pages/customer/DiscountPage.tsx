import React, { useEffect, useState } from "react";
import axios from "axios";
import { instantDiscounts, InstantDiscount } from "../../data/discountsList";

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
    const [instantDiscountsToShow, setInstantDiscountsToShow] = useState<InstantDiscount[]>([]);

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

    useEffect(() => {
        // تابع برای انتخاب تصادفی 2 تخفیف
        const selectRandomDiscounts = () => {
            const shuffled = [...instantDiscounts].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 2);
        };

        // بررسی localStorage برای وجود تخفیف‌های قبلی و زمان آن
        const savedDiscounts = localStorage.getItem("instantDiscounts");
        const savedTime = localStorage.getItem("instantDiscountsTime");

        const currentTime = new Date().getTime();
        const twoHoursInMs = 2 * 60 * 60 * 1000;

        if (savedDiscounts && savedTime) {
            const parsedTime = parseInt(savedTime);
            if (currentTime - parsedTime < twoHoursInMs) {
                // اگر کمتر از 2 ساعت گذشته، همان تخفیف‌های قبلی را نمایش بده
                setInstantDiscountsToShow(JSON.parse(savedDiscounts));
                return;
            }
        }

        // اگر بیشتر از 2 ساعت گذشته یا اولین بار است، تخفیف‌های جدید انتخاب کن
        const newDiscounts = selectRandomDiscounts();
        setInstantDiscountsToShow(newDiscounts);
        localStorage.setItem("instantDiscounts", JSON.stringify(newDiscounts));
        localStorage.setItem("instantDiscountsTime", currentTime.toString());

        // تنظیم تایمر برای تغییر بعد از 2 ساعت
        const timeLeft = savedTime ? twoHoursInMs - (currentTime - parseInt(savedTime)) : twoHoursInMs;
        const timer = setTimeout(() => {
            const newDiscounts = selectRandomDiscounts();
            setInstantDiscountsToShow(newDiscounts);
            localStorage.setItem("instantDiscounts", JSON.stringify(newDiscounts));
            localStorage.setItem("instantDiscountsTime", new Date().getTime().toString());
        }, timeLeft);

        return () => clearTimeout(timer);
    }, []);

    // محاسبه زمان باقی‌مانده تا تغییر تخفیف‌ها
    const getRemainingTime = () => {
        const savedTime = localStorage.getItem("instantDiscountsTime");
        if (!savedTime) return "2:00:00";

        const endTime = parseInt(savedTime) + 2 * 60 * 60 * 1000;
        const now = new Date().getTime();
        const diff = endTime - now;

        if (diff <= 0) return "00:00:00";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const remainingTime = getRemainingTime();

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    سیستم تخفیف و امتیازدهی
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>
            <div className="space-y-6">
                {/* بخش تخفیف‌های لحظه‌ای */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-[#00296B]">تخفیف‌های لحظه‌ای</h3>
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                            زمان باقی‌مانده: {remainingTime}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        {instantDiscountsToShow.map((d) => (
                            <div
                                key={d.id}
                                className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FF0000]"
                            >
                                <h3 className="text-lg font-semibold mb-2 text-[#FF0000]">{d.title}</h3>
                                <p className="text-[#000000]">کد تخفیف: <span className="font-bold">{d.code}</span></p>
                                <p className="text-[#000000]">{d.description}</p>
                                <p className="text-[#000000] font-bold">{d.percentage}% تخفیف</p>
                                {d.for_first_purchase && (
                                    <p className="text-sm text-green-600">ویژه اولین خرید</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* بخش تخفیف‌های معمولی */}
                <div>
                    <h3 className="text-2xl font-bold text-[#00296B] mb-4">تخفیف‌های شما</h3>
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
                </div>
            </div>
        </div>
    );
};

export default DiscountPage;
