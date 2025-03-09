import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setUser: (user: string | null) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      localStorage.setItem("user", username);
      setUser(username);
      navigate("/");
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">ورود به حساب</h2>

          <input
              type="text"
              placeholder="نام کاربری"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all"
              onClick={handleLogin}
          >
            ورود
          </button>

          <p className="text-center mt-4 text-gray-600">
            حساب ندارید؟{" "}
            <button className="text-blue-500 hover:underline" onClick={() => navigate("/register")}>
              ثبت‌نام کنید
            </button>
          </p>
        </div>
      </div>
  );
};

export default Login;
