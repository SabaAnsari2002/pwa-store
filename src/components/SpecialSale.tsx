// src/components/SpecialSale.tsx
import React from "react";

const SpecialSale: React.FC = () => {
  return (
    <div className="container mx-auto mt-8 px-6 bg-purple-100 rounded-lg py-6">
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <h2 className="text-3xl font-bold text-purple-800 mb-4">
            Special Sale
          </h2>
          <p className="text-gray-700">
            Special promotions for our regular customers. Time is limited.
          </p>
          <button className="mt-4 bg-purple-500 text-white py-3 px-6 rounded-md hover:bg-purple-700">
            Shop Now
          </button>
        </div>
        <div className="w-1/2">
          <img
            src="your-image-url.jpg"
            alt="Special Sale"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default SpecialSale;
