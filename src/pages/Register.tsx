import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
    phone: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" })); // Reset error for the changed field
  };

  const validateForm = () => {
    let formValid = true;
    let validationErrors = { username: "", password: "", email: "", phone: "" };

    if (!formData.username.trim()) {
      validationErrors.username = "نام کاربری ضروری است.";
      formValid = false;
    } else if (formData.username.length < 2) {
      validationErrors.username = "نام کاربری باید حداقل 2 کاراکتر باشد.";
      formValid = false;
    }

    if (formData.password.length < 6) {
      validationErrors.password = "رمز عبور باید حداقل 6 کاراکتر باشد.";
      formValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(formData.email)) {
      validationErrors.email = "آدرس ایمیل باید با @gmail.com تمام شود.";
      formValid = false;
    }

    const phonePattern = /^09[0-9]{9}$/;
    if (!phonePattern.test(formData.phone)) {
      validationErrors.phone = "شماره تلفن باید 11 رقم باشد و با 09 شروع شود.";
      formValid = false;
    }

    setErrors(validationErrors);
    return formValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Prevent form submission if validation fails
    }

    try {
      const response = await fetch("http://localhost:8000/api/users/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert("ثبت‌نام موفق! اکنون وارد شوید.");
        navigate("/login");
      } else {
        alert(data.error || "مشکلی در ثبت نام وجود دارد.");
      }
    } catch (error) {
      console.error(error);
      alert("خطا در اتصال به سرور.");
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#00509D] to-[#00296B] p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-[#FDC500] p-4 text-center">
              <h2 className="text-2xl font-bold text-[#00296B]">ثبت‌نام در سامانه</h2>
            </div>

            <form onSubmit={handleRegister} className="p-6 space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#00509D]">
                  <FaUser />
                </div>
                <input
                    name="username"
                    type="text"
                    placeholder="نام کاربری"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pr-10 pl-4 py-3 border-b-2 border-[#E5E5E5] focus:border-[#00509D] focus:outline-none bg-transparent transition-all"
                    required
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#00509D]">
                  <FaLock />
                </div>
                <input
                    name="password"
                    type="password"
                    placeholder="رمز عبور"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pr-10 pl-4 py-3 border-b-2 border-[#E5E5E5] focus:border-[#00509D] focus:outline-none bg-transparent transition-all"
                    required
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#00509D]">
                  <FaEnvelope />
                </div>
                <input
                    name="email"
                    type="email"
                    placeholder="آدرس ایمیل"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pr-10 pl-4 py-3 border-b-2 border-[#E5E5E5] focus:border-[#00509D] focus:outline-none bg-transparent transition-all"
                    required
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#00509D]">
                  <FaPhone />
                </div>
                <input
                    name="phone"
                    type="tel"
                    placeholder="شماره تلفن"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pr-10 pl-4 py-3 border-b-2 border-[#E5E5E5] focus:border-[#00509D] focus:outline-none bg-transparent transition-all"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00509D] to-[#00296B] text-white py-3 rounded-lg mt-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                ثبت‌نام
              </button>

              <div className="text-center pt-4">
                <span className="text-[#666]">حساب دارید؟ </span>
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-[#00509D] font-medium hover:text-[#00296B] transition-colors"
                >
                  ورود به حساب
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Register;
