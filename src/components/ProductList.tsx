// src/components/ProductList.tsx
import React from "react";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Little Stars Dress",
    imageUrl: "your-image-url.jpg",
    price: 16.0,
  },
  // ... other products
];

const ProductList: React.FC = () => {
  return (
    <div className="container mx-auto mt-8 px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">New In Store</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="rounded-t-lg h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-700">
                {product.name}
              </h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <button className="mt-2 bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
