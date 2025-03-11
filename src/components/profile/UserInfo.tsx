import React from "react";

interface UserInfoProps {
    name: string;
    email: string;
    phone: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, email, phone }) => {
    return (
        <section className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">اطلاعات حساب</h2>
            <div className="grid grid-cols-2 gap-4">
                <p><strong>نام:</strong> {name}</p>
                <p><strong>ایمیل:</strong> {email}</p>
                <p><strong>شماره تماس:</strong> {phone}</p>
            </div>
        </section>
    );
};

export default UserInfo;
