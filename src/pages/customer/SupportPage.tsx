import React, { useState, useEffect } from "react";
import axios from "axios";

interface Ticket {
    id: number;
    subject: string;
    message: string;
    status: string;
    status_display: string;
    created_at: string;
    updated_at: string;
}

const SupportPage: React.FC = () => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState({
        fetching: false,
        submitting: false
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString('fa-IR');
        setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 10));
        console.log(`[SupportPage] ${message}`);
    };

    const fetchTickets = async () => {
        const token = localStorage.getItem("access_token");
        try {
            addLog("شروع دریافت تیکت‌ها از سرور");
            setLoading(prev => ({ ...prev, fetching: true }));

            const res = await axios.get("http://localhost:8000/api/users/tickets/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTickets(res.data);
            addLog(`دریافت ${res.data.length} تیکت با موفقیت انجام شد`);
        } catch (err) {
            const errorMessage = axios.isAxiosError(err)
                ? err.response?.data?.message || "خطای نامشخص"
                : "خطا در ارتباط با سرور";

            setError("خطا در دریافت تیکت‌ها");
            addLog(`خطا در دریافت تیکت‌ها: ${errorMessage}`);
        } finally {
            setLoading(prev => ({ ...prev, fetching: false }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("access_token");

        if (!subject.trim() || !message.trim()) {
            setError("لطفاً موضوع و متن پیام را وارد کنید");
            addLog("ارسال تیکت ناموفق: فیلدهای الزامی پر نشده‌اند");
            return;
        }

        try {
            addLog("شروع ارسال تیکت جدید");
            setLoading(prev => ({ ...prev, submitting: true }));

            const response = await axios.post(
                "http://localhost:8000/api/users/tickets/",
                { subject, message },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setSubject("");
            setMessage("");
            setError("");
            setSuccess("تیکت با موفقیت ارسال شد");
            addLog(`تیکت با شناسه #${response.data.id} با موفقیت ارسال شد`);

            // Refresh tickets after successful submission
            await fetchTickets();
        } catch (err) {
            const errorMessage = axios.isAxiosError(err)
                ? err.response?.data?.message || "خطای نامشخص"
                : "خطا در ارتباط با سرور";

            setError("خطا در ارسال تیکت");
            addLog(`خطا در ارسال تیکت: ${errorMessage}`);
        } finally {
            setLoading(prev => ({ ...prev, submitting: false }));
            setTimeout(() => setSuccess(""), 3000);
        }
    };

    useEffect(() => {
        addLog("کامپوننت صفحه پشتیبانی بارگذاری شد");
        fetchTickets();
    }, []);

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    پشتیبانی و تیکتینگ
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {success}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500] col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold mb-4 text-[#00509D]">ارسال تیکت جدید</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2 text-[#000000]">موضوع</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00509D]"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                disabled={loading.submitting}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2 text-[#000000]">پیام</label>
                            <textarea
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00509D]"
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={loading.submitting}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#00509D] hover:bg-[#003f7d] text-white px-4 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50"
                            disabled={loading.submitting}
                        >
                            {loading.submitting ? "در حال ارسال..." : "ارسال تیکت"}
                        </button>
                    </form>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-[#00509D]">وضعیت تیکت‌ها</h3>
                        <button
                            onClick={fetchTickets}
                            disabled={loading.fetching}
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                        >
                            {loading.fetching ? "در حال بروزرسانی..." : "بروزرسانی"}
                        </button>
                    </div>

                    {loading.fetching && tickets.length === 0 ? (
                        <p className="text-gray-500">در حال بارگذاری تیکت‌ها...</p>
                    ) : tickets.length === 0 ? (
                        <p className="text-gray-500">تیکتی وجود ندارد</p>
                    ) : (
                        <ul className="text-[#000000] space-y-3 overflow-y-auto" style={{ maxHeight: "300px" }}>
                            {tickets.map((ticket) => (
                                <li key={ticket.id} className="border-b pb-2 last:border-b-0">
                                    <div className="font-medium">تیکت #{ticket.id}: {ticket.subject}</div>
                                    <div className={`text-sm ${
                                        ticket.status === 'pending' ? 'text-yellow-600' :
                                            ticket.status === 'approved' ? 'text-green-600' :
                                                ticket.status === 'rejected' ? 'text-red-600' :
                                                    'text-gray-600'
                                    }`}>
                                        وضعیت: {ticket.status_display}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        ایجاد: {new Date(ticket.created_at).toLocaleString('fa-IR')}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        آخرین تغییر: {new Date(ticket.updated_at).toLocaleString('fa-IR')}
                                    </div>
                                    <div className="mt-1 text-xs">
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => {
                                                setSubject(`RE: ${ticket.subject}`);
                                                setMessage(`\n\n---\nدر پاسخ به تیکت #${ticket.id}:\n${ticket.message}`);
                                                addLog(`پاسخ به تیکت #${ticket.id} آماده شد`);
                                            }}
                                        >
                                            پاسخ
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
