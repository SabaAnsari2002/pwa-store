import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Brands from "../components/Brands";
import DiscountedProducts from "../components/DiscountedProducts";
import BestSellingProducts from "../components/BestSellingProducts";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface HomeProps {
    user: string | null;
    setUser: (user: string | null) => void;
}

const Home: React.FC<HomeProps> = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <div className="bg-pink-100 min-h-screen">
            <Header />
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center pt-40">
                    <h1 className="text-2xl font-bold">
                        {user ? `خوش آمدید، ${user}` : "به فروشگاه ما خوش آمدید!"}
                    </h1>
                    {user ? (
                        <div>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                onClick={() => navigate("/dashboard")}
                            >
                                پروفایل
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                onClick={() => navigate("/cart")}
                            >
                                سبد خرید
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleLogout}
                            >
                                خروج
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => navigate("/login")}
                        >
                            ورود / ثبت‌نام
                        </button>
                    )}
                </div>
                <Slider />
                <Categories />
                <Brands />
                <DiscountedProducts />
                <BestSellingProducts />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
