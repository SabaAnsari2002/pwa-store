import React from "react";

interface WishlistItem {
    id: number;
    name: string;
    price: string;
}

interface WishlistProps {
    wishlist: WishlistItem[];
}

const Wishlist: React.FC<WishlistProps> = ({ wishlist }) => {
    return (
        <section className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">علاقه‌مندی‌ها</h2>
            {wishlist.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                </div>
            ))}
        </section>
    );
};

export default Wishlist;
