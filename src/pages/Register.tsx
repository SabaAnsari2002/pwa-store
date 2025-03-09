import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [newUser, setNewUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (newUser.trim() && password.trim()) {
      alert("ثبت‌نام موفق! اکنون وارد شوید.");
      navigate("/login");
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-orange-500">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">ثبت‌نام</h2>

          <input
              type="text"
              placeholder="نام کاربری جدید"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl transition-all"
              onClick={handleRegister}
          >
            ثبت‌نام
          </button>

          <p className="text-center mt-4 text-gray-600">
            حساب دارید؟{" "}
            <button className="text-pink-500 hover:underline" onClick={() => navigate("/login")}>
              وارد شوید
            </button>
          </p>
        </div>
      </div>
  );
};

export default Register;
