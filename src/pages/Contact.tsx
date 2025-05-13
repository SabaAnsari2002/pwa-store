import React, { useState } from "react";

const Contact: React.FC = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div
            className="min-h-screen bg-[#E5E5E5] pt-32 pb-16 px-6 md:px-12"
            style={{ direction: "rtl" }}
        >
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-10 border-t-8 border-[#00509D]">
                <h1 className="text-4xl font-extrabold text-[#00509D] mb-8 text-center">
                    ارتباط با ما
                </h1>
                <p className="text-[#000000] text-lg mb-10 text-center leading-relaxed">
                    خوشحال می‌شویم نظرات، پیشنهادات و سوالات خود را با ما در میان بگذارید. تیم پشتیبانی ما در اسرع وقت پاسخگوی شما خواهد بود.
                </p>

                {submitted ? (
                    <div className="bg-[#FDC500] text-[#00296B] rounded-lg p-6 text-center font-semibold shadow-md">
                        پیام شما با موفقیت ارسال شد! <br /> در اسرع وقت پاسخگو خواهیم بود.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                className="block mb-2 text-[#00296B] font-semibold"
                                htmlFor="name"
                            >
                                نام و نام خانوادگی
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                placeholder="مثلاً علی رضایی"
                                className="w-full border border-[#FDC500] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00509D] bg-[#E5E5E5] text-[#000000] transition"
                            />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-[#00296B] font-semibold"
                                htmlFor="email"
                            >
                                ایمیل
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="example@mail.com"
                                className="w-full border border-[#FDC500] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00509D] bg-[#E5E5E5] text-[#000000] transition"
                            />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-[#00296B] font-semibold"
                                htmlFor="message"
                            >
                                پیام شما
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={6}
                                value={form.message}
                                onChange={handleChange}
                                placeholder="پیام خود را اینجا بنویسید..."
                                className="w-full border border-[#FDC500] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00509D] bg-[#E5E5E5] text-[#000000] transition resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#00509D] hover:bg-[#00296B] text-white font-bold py-3 rounded-lg transition"
                        >
                            ارسال پیام
                        </button>
                    </form>
                )}

                <div className="mt-12 text-center text-[#00296B] space-y-3">
                    <h3 className="text-2xl font-semibold mb-3">راه‌های ارتباطی</h3>
                    <p>
                        <strong>ایمیل:</strong>{" "}
                        <a
                            href="mailto:info@example.com"
                            className="text-[#00509D] underline"
                        >
                            info@example.com
                        </a>
                    </p>
                    <p>
                        <strong>تلفن:</strong>{" "}
                        <a href="tel:+982112345678" className="text-[#00509D] underline">
                            ۰۲۱-۱۲۳۴۵۶۷۸
                        </a>
                    </p>
                    <p>
                        <strong>آدرس:</strong> تهران، خیابان مثال، پلاک ۱۲۳
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
