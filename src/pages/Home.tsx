import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Brands from "../components/Brands";
import DiscountedProducts from "../components/DiscountedProducts";
import BestSellingProducts from "../components/BestSellingProducts";
import Collection from "../components/Collection";
import DiscountSlider from "../components/DiscountSlider";
import Collection2 from "../components/Collection2";
import HotProducts from "../components/HotProducts";

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
        <div className="bg-[#F5F5F5] min-h-screen">
            <Header />
            <div className="container mx-auto px-4 pt-44 pb-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#00296B]">
                        {user ? `خوش آمدید، ${user}` : "به فروشگاه ما خوش آمدید!"}
                    </h1>
                    <div className="mt-4 md:mt-0 flex gap-3">
                        {user ? (
                            <>
                                <button
                                    className="bg-[#00509D] hover:bg-[#003f7f] text-white px-4 py-2 rounded"
                                    onClick={() => navigate("/customer-dashboard")}
                                >
                                    پروفایل
                                </button>
                                <button
                                    className="bg-[#FDC500] hover:bg-yellow-400 text-black px-4 py-2 rounded"
                                    onClick={() => navigate("/seller-dashboard")}
                                >
                                    ایجاد غرفه
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                    onClick={handleLogout}
                                >
                                    خروج
                                </button>
                            </>
                        ) : (
                            <button
                                className="bg-[#00509D] hover:bg-[#003f7f] text-white px-4 py-2 rounded"
                                onClick={() => navigate("/login")}
                            >
                                ورود / ثبت‌نام
                            </button>
                        )}
                    </div>
                </div>

                <Slider />
                <Collection />
                <DiscountSlider />
                <Categories />
                <Collection2 />
                <Brands />
                <DiscountedProducts />
                <HotProducts />
                <BestSellingProducts />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
