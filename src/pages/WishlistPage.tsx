import React from "react";
import Header from "../components/profile/Header";
import Sidebar from "../components/profile/Sidebar";
import Wishlist from "../components/profile/Wishlist";

const WishlistPage: React.FC = () => {
    const wishlist = [
        { id: 1, name: "Wireless Headphones", price: "$99.99" },
        { id: 2, name: "Smart Watch", price: "$199.99" },
    ];

    return (
        <>
            <Header />
            <div className="container mx-auto p-6 grid grid-cols-12 gap-6">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="col-span-9">
                    <Wishlist wishlist={wishlist} />
                </main>
            </div>
        </>
    );
};

export default WishlistPage;
