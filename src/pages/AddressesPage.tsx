import React from "react";
import Header from "../components/profile/Header";
import Sidebar from "../components/profile/Sidebar";
import Addresses from "../components/profile/Addresses";

const AddressesPage: React.FC = () => {
    const addresses = [
        { id: 1, title: "Home", details: "123 Main Street, New York" },
        { id: 2, title: "Work", details: "456 Office Park, Los Angeles" },
    ];

    return (
        <>
            <Header />
            <div className="container mx-auto p-6 grid grid-cols-12 gap-6">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="col-span-9">
                    <Addresses addresses={addresses} />
                </main>
            </div>
        </>
    );
};

export default AddressesPage;
