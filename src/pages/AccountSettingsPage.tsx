import React from "react";
import Header from "../components/profile/Header";
import Sidebar from "../components/profile/Sidebar";
import AccountSettings from "../components/profile/AccountSettings";

const AccountSettingsPage: React.FC = () => {
    return (
        <>
            <Header />
            <div className="container mx-auto p-6 grid grid-cols-12 gap-6">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="col-span-9">
                    <AccountSettings />
                </main>
            </div>
        </>
    );
};

export default AccountSettingsPage;
