import React from "react";

const About: React.FC = () => {
    return (
        <div
            className="min-h-screen bg-[#E5E5E5] pt-32 pb-16 px-6 md:px-12"
            style={{ direction: "rtl" }}
        >
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10 border-t-8 border-[#FDC500]">
                <h1 className="text-4xl font-extrabold text-[#00296B] mb-8 text-center">
                    درباره ما
                </h1>

                <p className="text-[#000000] text-lg leading-relaxed mb-6">
                    پروژه <span className="text-[#FDC500] font-bold">اسم پروژه بیچارم</span> با هدف ایجاد بستری امن، سریع و آسان برای خرید و فروش آنلاین راه‌اندازی شده است. ما معتقدیم که خرید اینترنتی باید ساده، مطمئن و لذت‌بخش باشد.
                </p>

                <p className="text-[#00509D] font-semibold mb-4">
                    ارزش‌های اصلی ما:
                </p>
                <ul className="list-disc list-inside text-[#00509D] mb-8 space-y-2">
                    <li>پشتیبانی ۲۴ ساعته و پاسخگویی سریع</li>
                    <li>ضمانت بازگشت وجه در صورت نارضایتی</li>
                    <li>ارسال سریع و مطمئن به سراسر کشور</li>
                    <li>تنوع گسترده و به‌روز محصولات</li>
                    <li>حفظ امنیت اطلاعات کاربران</li>
                </ul>

                <div className="bg-[#FDC500] rounded-lg p-6 text-[#00296B] shadow-md">
                    <h2 className="text-2xl font-bold mb-3">ماموریت ما</h2>
                    <p className="text-base leading-relaxed">
                        فراهم کردن تجربه‌ای بی‌نظیر در خرید آنلاین با ارائه بهترین خدمات، قیمت‌های رقابتی و پشتیبانی حرفه‌ای تا رضایت کامل مشتریان را به دست آوریم.
                    </p>
                </div>

                <div className="mt-10 text-center text-[#00296B]">
                    <h3 className="text-xl font-semibold mb-2">با ما در ارتباط باشید</h3>
                    <p>ایمیل: <a href="mailto:info@example.com" className="text-[#00509D] underline">info@example.com</a></p>
                    <p>تلفن: <a href="tel:+982112345678" className="text-[#00509D] underline">۰۲۱-۱۲۳۴۵۶۷۸</a></p>
                    <p>آدرس: تهران، خیابان مثال، پلاک ۱۲۳</p>
                </div>
            </div>
        </div>
    );
};

export default About;
