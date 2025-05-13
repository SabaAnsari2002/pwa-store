import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

interface BlogPost {
    id: number;
    title: string;
    summary: string;
    date: string;
    category: string;
}



const postsData: BlogPost[] = [
    {
        id: 1,
        title: "معرفی پروژه بیچارم و اهداف آن",
        summary:
            "در این مقاله با اهداف و ویژگی‌های پروژه بیچارم آشنا می‌شوید و دلیل انتخاب این نام را خواهید فهمید.",
        date: "۱۴۰۲/۰۱/۱۵",
        category: "معرفی",
    },
    {
        id: 2,
        title: "چگونه بهترین محصولات را انتخاب کنیم؟",
        summary:
            "راهنمایی برای انتخاب محصولات با کیفیت در فروشگاه‌های آنلاین و نکات مهم قبل از خرید.",
        date: "۱۴۰۲/۰۲/۱۰",
        category: "راهنما",
    },
    {
        id: 3,
        title: "نکات مهم در فروش آنلاین برای فروشندگان",
        summary:
            "اگر فروشنده هستید این مقاله را از دست ندهید. نکاتی کلیدی برای موفقیت در فروشگاه اینترنتی.",
        date: "۱۴۰۲/۰۳/۰۵",
        category: "فروشندگان",
    },
    // می‌توانید پست‌های بیشتری اضافه کنید
];

const Blog: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("همه");

    const categories = useMemo(() => {
        const cats = postsData.map((p) => p.category);
        return ["همه", ...Array.from(new Set(cats))];
    }, []);

    const filteredPosts = useMemo(() => {
        return postsData.filter((post) => {
            const matchesCategory =
                selectedCategory === "همه" || post.category === selectedCategory;
            const matchesSearch =
                post.title.includes(searchTerm) || post.summary.includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div
            className="min-h-screen bg-[#E5E5E5] pt-32 pb-16 px-6 md:px-12"
            style={{ direction: "rtl" }}
        >
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10 border-t-8 border-[#00509D]">
                <h1 className="text-4xl font-extrabold text-[#00296B] mb-8 text-center">
                    وبلاگ
                </h1>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="جستجو در مقالات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-2/3 border border-[#FDC500] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00509D] bg-[#E5E5E5] text-[#000000] transition"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full md:w-1/3 border border-[#FDC500] rounded-lg px-4 py-3 bg-[#E5E5E5] text-[#000000] focus:outline-none focus:border-[#00509D] transition"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {filteredPosts.length === 0 ? (
                    <p className="text-center text-[#00296B] text-lg font-semibold mt-20">
                        مقاله‌ای یافت نشد.
                    </p>
                ) : (
                    <ul className="space-y-8">
                        {filteredPosts.map(({ id, title, summary, date, category }) => (
                            <li
                                key={id}
                                className="border border-[#FDC500] rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
                            >
                                <Link to={`/blog/${id}`} className="block no-underline hover:underline">
                                    <h2 className="text-2xl font-bold text-[#00509D] mb-2">{title}</h2>
                                    <p className="text-[#000000] mb-3 leading-relaxed">{summary}</p>
                                    <div className="flex justify-between text-[#00296B] text-sm font-semibold">
                                        <span>تاریخ: {date}</span>
                                        <span className="bg-[#FDC500] text-[#00296B] px-3 py-1 rounded-full">
                      {category}
                    </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Blog;
