import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

interface LoginProps {
  setUser: (user: string | null) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", data.username);
        localStorage.setItem("accessToken", data.access);
        setUser(data.username);
        navigate("/");
      } else {
        alert(data.error || "مشکلی در ورود به حساب وجود دارد.");
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
              <h2 className="text-2xl font-bold text-[#00296B]">ورود به سامانه</h2>
            </div>

            <form onSubmit={handleLogin} className="p-6 space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#00509D]">
                  <FaUser />
                </div>
                <input
                    name="username"
                    type="text"
                    placeholder="نام کاربری"
                    value={credentials.username}
                    onChange={handleChange}
                    className="w-full pr-10 pl-4 py-3 border-b-2 border-[#E5E5E5] focus:border-[#00509D] focus:outline-none bg-transparent transition-all"
                    required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#00509D]">
                  <FaLock />
                </div>
                <input
                    name="password"
                    type="password"
                    placeholder="رمز عبور"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full pr-10 pl-4 py-3 border-b-2 border-[#E5E5E5] focus:border-[#00509D] focus:outline-none bg-transparent transition-all"
                    required
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <label className="flex items-center text-sm text-[#666]">
                  <input type="checkbox" className="mr-2 accent-[#00509D]" />
                  مرا به خاطر بسپار
                </label>
                <button
                    type="button"
                    className="text-sm text-[#00509D] hover:text-[#00296B] transition-colors"
                >
                  فراموشی رمز عبور؟
                </button>
              </div>

              <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00509D] to-[#00296B] text-white py-3 rounded-lg mt-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                ورود به حساب
              </button>

              <div className="text-center pt-4">
                <span className="text-[#666]">حساب ندارید؟ </span>
                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="text-[#00509D] font-medium hover:text-[#00296B] transition-colors"
                >
                  ثبت‌نام کنید
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;