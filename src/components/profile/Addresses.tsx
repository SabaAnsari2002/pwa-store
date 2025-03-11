import React from "react";

interface Address {
    id: number;
    title: string;
    details: string;
}

interface AddressesProps {
    addresses: Address[];
}

const Addresses: React.FC<AddressesProps> = ({ addresses }) => {
    return (
        <section className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">آدرس‌ها</h2>
            {addresses.map((address) => (
                <div key={address.id} className="mb-4">
                    <h3 className="font-semibold">{address.title}</h3>
                    <p>{address.details}</p>
                </div>
            ))}
        </section>
    );
};

export default Addresses;
