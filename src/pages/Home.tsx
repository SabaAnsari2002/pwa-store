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
    <div className="container mx-auto px-4">
<Header/>
      <Slider />
      <Categories />
      <Brands />
      <DiscountedProducts />
      <BestSellingProducts />
<Footer/>
    </div>
  );
};

export default Home;