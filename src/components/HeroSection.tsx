// src/components/HeroSection.tsx
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="container mx-auto mt-8 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-1">
          <img
            src="your-image-url.jpg"
            alt="Hero Image"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="md:col-span-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Winter SALE OFF
          </h1>
          <p className="text-gray-700 mb-6">Anything for your baby</p>
          <button className="bg-secondary text-white py-3 px-6 rounded-md hover:bg-primary">
            View All Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
