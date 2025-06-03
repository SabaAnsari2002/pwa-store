import React, { useEffect, useState } from "react";

interface UserData {
    username: string;
    email: string;
    phone: string;
}

const AccountSettingsPage: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        new_password: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No access token found");
                setIsLoading(false);
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
                    setFormData(prev => ({
                        ...prev,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        password: "",
                        new_password: ""
                    }));
                } else {
                    const errText = await response.text();
                    console.error("Failed to fetch user data:", errText);
                    setErrorMessage("خطا در دریافت اطلاعات کاربر");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setErrorMessage("خطا در اتصال به سرور");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    const validateForm = () => {
        if (formData.username.length < 2) {
            setErrorMessage("نام کاربری باید حداقل ۲ حرف باشد.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage("فرمت ایمیل معتبر نیست.");
            return false;
        }
        const phoneRegex = /^\d{11}$/;
        if (!phoneRegex.test(formData.phone)) {
            setErrorMessage("شماره موبایل باید ۱۱ رقم باشد.");
            return false;
        }
        if (formData.new_password && formData.new_password.length < 6) {
            setErrorMessage("رمز عبور جدید باید حداقل ۶ حرف باشد.");
            return false;
        }
        return true;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccessMessage("");
        setErrorMessage("");

        if (!validateForm()) {
            setIsSaving(false);
            return;
        }

        const token = localStorage.getItem("access_token");
        if (!token) {
            setErrorMessage("لطفاً ابتدا وارد شوید");
            setIsSaving(false);
            return;
        }

        const submitData = formData.new_password
            ? { ...formData }
            : {
                username: formData.username,
                email: formData.email,
                phone: formData.phone
            };

        try {
            const response = await fetch("http://localhost:8000/api/users/profile/", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitData),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setUserData(updatedData);
                setSuccessMessage("تغییرات با موفقیت ذخیره شد");
                if (formData.new_password) {
                    setFormData(prev => ({
                        ...prev,
                        password: "",
                        new_password: ""
                    }));
                }
            } else {
                const errData = await response.json();
                setErrorMessage(
                    errData.password?.[0] ||
                    errData.new_password?.[0] ||
                    "خطا در ذخیره تغییرات"
                );
            }
        } catch (error) {
            console.error("Error updating user data:", error);
            setErrorMessage("خطا در اتصال به سرور");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    مدیریت پروفایل
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                {isLoading ? (
                    <div className="text-center py-8">
                        <p className="text-[#666]">در حال بارگذاری اطلاعات...</p>
                    </div>
                ) : errorMessage && !userData ? (
                    <div className="text-center py-8 text-red-500">
                        <p>{errorMessage}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="username" className="block text-lg font-medium mb-3 text-[#00509D]">نام کاربری</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-lg font-medium mb-3 text-[#00509D]">ایمیل</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="phone" className="block text-lg font-medium mb-3 text-[#00509D]">شماره موبایل</label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="new_password" className="block text-lg font-medium mb-3 text-[#00509D]">رمز عبور جدید</label>
                            <input
                                id="new_password"
                                name="new_password"
                                type="password"
                                className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                                value={formData.new_password}
                                onChange={handleInputChange}
                                placeholder="برای تغییر رمز عبور وارد کنید"
                            />
                        </div>

                        {formData.new_password && (
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-lg font-medium mb-3 text-[#00509D]">رمز عبور فعلی</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="برای تغییر رمز عبور، رمز فعلی را وارد کنید"
                                />
                                <p className="text-sm text-gray-500 mt-2">برای تغییر رمز عبور، رمز عبور فعلی خود را وارد کنید</p>
                            </div>
                        )}

                        {successMessage && (
                            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                                {successMessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`${isSaving ? 'bg-[#00509D]/70' : 'bg-[#00509D] hover:bg-[#00296B]'} text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-300 w-full md:w-auto`}
                        >
                            {isSaving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AccountSettingsPage;