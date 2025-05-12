import React from "react";
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

const Home: React.FC = () => {
    const user = localStorage.getItem("user");

    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            <Header />
            <div className="container mx-auto px-4 pt-44 pb-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#00296B] text-right w-full">
                        {user ? `خوش آمدید، ${user}` : "!به فروشگاه ما خوش آمدید"}
                    </h1>

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
