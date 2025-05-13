import React from "react";
import { useParams, useNavigate } from "react-router-dom";

interface BlogPost {
    id: number;
    title: string;
    body: string;
    date: string;
    category: string;
}

const postsData: BlogPost[] = [
    {
        id: 1,
        title: "معرفی پروژه بیچارم و اهداف آن",
        body: `
      <p>در این مقاله با اهداف و ویژگی‌های پروژه بیچارم آشنا می‌شوید و دلیل انتخاب این نام را خواهید فهمید.</p>
      <p>پروژه بیچارم با هدف ایجاد بستری امن و آسان برای خرید و فروش آنلاین راه‌اندازی شده است...</p>
    `,
        date: "۱۴۰۲/۰۱/۱۵",
        category: "معرفی",
    },
    {
        id: 2,
        title: "چگونه بهترین محصولات را انتخاب کنیم؟",
        body: `
      <p>راهنمایی برای انتخاب محصولات با کیفیت در فروشگاه‌های آنلاین و نکات مهم قبل از خرید.</p>
      <ul>
        <li>بررسی نظرات کاربران</li>
        <li>مقایسه قیمت‌ها</li>
        <li>توجه به گارانتی و خدمات پس از فروش</li>
      </ul>
    `,
        date: "۱۴۰۲/۰۲/۱۰",
        category: "راهنما",
    },
    {
        id: 3,
        title: "نکات مهم در فروش آنلاین برای فروشندگان",
        body: `
      <p>اگر فروشنده هستید این مقاله را از دست ندهید. نکاتی کلیدی برای موفقیت در فروشگاه اینترنتی.</p>
      <p>از جمله نکات مهم می‌توان به بازاریابی دیجیتال، مدیریت موجودی و پاسخگویی سریع اشاره کرد.</p>
    `,
        date: "۱۴۰۲/۰۳/۰۵",
        category: "فروشندگان",
    },
];

const BlogPostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const post = postsData.find((p) => p.id === Number(id));

    if (!post) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-[#E5E5E5]"
                style={{ direction: "rtl" }}
            >
                <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl text-center border-t-8 border-[#FDC500]">
                    <h2 className="text-2xl font-bold text-[#00296B] mb-4">مقاله یافت نشد</h2>
                    <button
                        onClick={() => navigate("/blog")}
                        className="bg-[#00509D] hover:bg-[#00296B] text-white px-6 py-2 rounded transition"
                    >
                        بازگشت به وبلاگ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-[#E5E5E5] pt-32 pb-16 px-6 md:px-12"
            style={{ direction: "rtl" }}
        >
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10 border-t-8 border-[#FDC500]">
                <h1 className="text-4xl font-extrabold text-[#00296B] mb-4">{post.title}</h1>
                <p className="text-sm text-[#00509D] mb-6">
                    دسته‌بندی: <span className="font-semibold">{post.category}</span> | تاریخ:{" "}
                    <span>{post.date}</span>
                </p>
                <div
                    className="prose prose-rtl max-w-none text-[#000000]"
                    dangerouslySetInnerHTML={{ __html: post.body }}
                />
                <button
                    onClick={() => navigate("/blog")}
                    className="mt-8 bg-[#00509D] hover:bg-[#00296B] text-white px-6 py-2 rounded transition"
                >
                    بازگشت به وبلاگ
                </button>
            </div>
        </div>
    );
};

export default BlogPostDetail;
