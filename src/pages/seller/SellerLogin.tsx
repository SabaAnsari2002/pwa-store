import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SellerLogin: React.FC = () => {
    const [credentials, setCredentials] = useState({
        phone: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // در اینجا اطلاعات لاگین به سرور ارسال می‌شود
        localStorage.setItem("isSeller", "true");
        navigate("/seller-dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8" style={{ direction: "rtl" }}>
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#00296B]">ورود فروشنده</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">تلفن همراه</label>
                        <input
                            type="tel"
                            name="phone"
                            value={credentials.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">رمز عبور</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#FDC500] text-black py-2 rounded-md hover:bg-yellow-400 transition duration-300"
                    >
                        ورود
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellerLogin;