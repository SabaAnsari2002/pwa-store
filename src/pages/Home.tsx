import React from 'react';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Brands from '../components/Brands';
import DiscountedProducts from '../components/DiscountedProducts';
import BestSellingProducts from '../components/BestSellingProducts';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
    return (
        <div className="bg-pink-100 min-h-screen">
            <Header/>
            <div className="container mx-auto px-4">
                <div className="pt-40">
                    <Slider/>
                </div>
                <Categories/>
                <Brands/>
                <DiscountedProducts/>
                <BestSellingProducts/>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
