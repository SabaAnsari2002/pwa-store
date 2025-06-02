import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SellerRegister: React.FC = () => {
    const [formData, setFormData] = useState({
        shopName: "",
        phone: "",
        address: "",
        description: ""
    });
    const [errors, setErrors] = useState({
        shopName: "",
        phone: "",
        address: "",
        description: ""
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" })); // Reset error for the changed field
    };

    const validateForm = () => {
        let formValid = true;
        let validationErrors = { shopName: "", phone: "", address: "", description: "" };

        if (!formData.shopName.trim()) {
            validationErrors.shopName = "نام غرفه ضروری است.";
            formValid = false;
        } else if (formData.shopName.length < 5) {
            validationErrors.shopName = "نام غرفه باید حداقل 5 کاراکتر باشد.";
            formValid = false;
        }

        const phonePattern = /^09[0-9]{9}$/;
        if (!phonePattern.test(formData.phone)) {
            validationErrors.phone = "شماره تلفن باید 11 رقم باشد و با 09 شروع شود.";
            formValid = false;
        }

        if (!formData.address.trim()) {
            validationErrors.address = "آدرس ضروری است.";
            formValid = false;
        }

        if (formData.description && formData.description.length > 500) {
            validationErrors.description = "توضیحات نمی‌تواند بیشتر از 500 کاراکتر باشد.";
            formValid = false;
        }

        setErrors(validationErrors);
        return formValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return; // Prevent form submission if validation fails
        }

        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch("http://localhost:8000/api/sellers/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    shop_name: formData.shopName,
                    phone: formData.phone,
                    address: formData.address,
                    description: formData.description
                })
            });
            if (response.ok) {
                localStorage.setItem("isSeller", "true");
                navigate("/seller-login");
            } else {
                const data = await response.json();
                if (data.code === "token_not_valid") {
                    alert("توکن منقضی شده است. لطفاً دوباره وارد شوید.");
                    localStorage.removeItem("accessToken");
                    navigate("/login");
                } else {
                    alert("ثبت‌نام فروشنده با خطا مواجه شد.");
                    console.log(data);
                }
            }
        } catch (error) {
            console.error(error);
            alert("خطا در اتصال به سرور.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8" style={{ direction: "rtl" }}>
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#00296B]">ثبت‌نام فروشنده</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">نام غرفه</label>
                        <input
                            type="text"
                            name="shopName"
                            value={formData.shopName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
                            required
                        />
                        {errors.shopName && <p className="text-red-500 text-sm">{errors.shopName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">تلفن همراه</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
                            required
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">آدرس</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
                            required
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">توضیحات</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
                            rows={3}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#FDC500] text-black py-2 rounded-md hover:bg-yellow-400 transition duration-300"
                    >
                        ثبت‌نام
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellerRegister;
