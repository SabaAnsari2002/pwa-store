import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Comment {
    id: number;
    product_name: string;
    product_id: number;
    text: string;
    created_at: string;
}

const ReviewsPage: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        fetch("http://localhost:8000/api/products/user/comments/", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("خطا در دریافت نظرات");
                }
                return res.json();
            })
            .then((data) => setComments(data))
            .catch((err) => {
                console.error(err);
                toast.error("خطا در دریافت نظرات");
            });
    }, []);

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: "rtl" }}>
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    نظرات ثبت‌شده شما
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] space-y-4">
                {comments.length === 0 ? (
                    <p className="text-gray-500 text-center">شما هنوز نظری ثبت نکرده‌اید.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="border-b pb-3">
                            <h4 className="font-semibold text-[#00509D] mb-1">
                                محصول:{" "}
                                <a
                                    href={`/product/${comment.product_id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    {comment.product_name}
                                </a>
                            </h4>
                            <p className="text-sm text-gray-700 mb-1">{comment.text}</p>
                            <p className="text-xs text-gray-500">
                                تاریخ ثبت: {new Date(comment.created_at).toLocaleDateString("fa-IR")}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewsPage;
