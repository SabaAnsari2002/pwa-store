import React, { useEffect, useState } from "react";

interface UserData {
    username: string;
    email: string;
    phone: string;
}

const CustomerDashboardContent: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No access token found");
                return;
            }

            try {
                const response = await fetch("http://localhost:8000/api/users/profile/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    const errText = await response.text();
                    console.error("Failed to fetch user data:", errText);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    داشبورد مشتری
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-lg font-semibold mb-2 text-[#00509D]">اطلاعات کاربر</h3>
                    {userData ? (
                        <>
                            <p className="text-[#000000]">نام کاربری: {userData.username}</p>
                            <p className="text-[#000000]">ایمیل: {userData.email}</p>
                            <p className="text-[#000000]">شماره تماس: {userData.phone}</p>
                        </>
                    ) : (
                        <p className="text-[#666]">در حال بارگذاری...</p>
                    )}
                </div>

                {/* وضعیت سفارش‌ها */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-lg font-semibold mb-2 text-[#00509D]">وضعیت سفارش‌های اخیر</h3>
                    <ul className="text-[#000000]">
                        <li>سفارش #۱۲۳۴: در حال پردازش</li>
                        <li>سفارش #۱۲۳۵: ارسال شده</li>
                    </ul>
                </div>

                {/* کیف پول و تخفیف‌ها */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-lg font-semibold mb-2 text-[#00509D]">کیف پول و تخفیف‌ها</h3>
                    <p className="text-[#000000]">موجودی کیف پول: ۵۰۰,۰۰۰ تومان</p>
                    <p className="text-[#000000]">تخفیف‌های فعال: ۱۰٪ تخفیف ویژه</p>
                </div>

                {/* پیشنهادات ویژه */}
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <h3 className="text-lg font-semibold mb-2 text-[#00509D]">پیشنهادات ویژه</h3>
                    <p className="text-[#000000]">محصولات پیشنهادی بر اساس خریدهای قبلی</p>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboardContent;