import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/");
    };

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">پنل مشتری</h1>
            <button
                onClick={handleBackToHome}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
            >
                بازگشت به خانه
            </button>
        </header>
    );
};

export default Header;
