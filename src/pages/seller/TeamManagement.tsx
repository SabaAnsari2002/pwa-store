import React, { useState } from "react";

// نمونه داده‌های اعضای تیم
const initialTeamMembers = [
    { id: 1, name: "علی محمدی", role: "مدیر", email: "ali@example.com", status: "فعال" },
    { id: 2, name: "فاطمه احمدی", role: "پشتیبان", email: "fatemeh@example.com", status: "فعال" },
    { id: 3, name: "رضا حسینی", role: "انباردار", email: "reza@example.com", status: "غیرفعال" },
];

const TeamManagement: React.FC = () => {
    const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
    const [newMember, setNewMember] = useState({ name: "", role: "", email: "", status: "فعال" });
    const [searchQuery, setSearchQuery] = useState("");

    // افزودن عضو جدید
    const handleAddMember = () => {
        if (newMember.name && newMember.role && newMember.email) {
            const member = { id: teamMembers.length + 1, ...newMember };
            setTeamMembers([...teamMembers, member]);
            setNewMember({ name: "", role: "", email: "", status: "فعال" });
        } else {
            alert("لطفاً تمام فیلدها را به درستی پر کنید.");
        }
    };

    // فیلتر کردن اعضا بر اساس جستجو
    const filteredMembers = teamMembers.filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6" style={{ direction: 'rtl' }}>
            <h1 className="text-2xl font-bold mb-6">مدیریت تیم فروش</h1>

            {/* فرم افزودن عضو جدید */}

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">افزودن عضو جدید</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="نام"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="نقش"
                        value={newMember.role}
                        onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="email"
                        placeholder="ایمیل"
                        value={newMember.email}
                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <select
                        value={newMember.status}
                        onChange={(e) => setNewMember({ ...newMember, status: e.target.value })}
                        className="p-2 border rounded"
                    >
                        <option value="فعال">فعال</option>
                        <option value="غیرفعال">غیرفعال</option>
                    </select>
                </div>
                <button
                    onClick={handleAddMember}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    افزودن عضو
                </button>
            </div>

            {/* جستجوی اعضا */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="جستجوی اعضا..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-full md:w-1/2"
                />
            </div>

            {/* لیست اعضا */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">لیست اعضا</h2>
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">نام</th>
                        <th className="py-2 px-4 border-b">نقش</th>
                        <th className="py-2 px-4 border-b">ایمیل</th>
                        <th className="py-2 px-4 border-b">وضعیت</th>
                        <th className="py-2 px-4 border-b">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredMembers.map((member) => (
                        <tr key={member.id}>
                            <td className="py-2 px-4 border-b">{member.name}</td>
                            <td className="py-2 px-4 border-b">{member.role}</td>
                            <td className="py-2 px-4 border-b">{member.email}</td>
                            <td className="py-2 px-4 border-b">
                                    <span
                                        className={`p-1 rounded ${
                                            member.status === "فعال"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {member.status}
                                    </span>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => alert(`ویرایش عضو ${member.name}`)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    ویرایش
                                </button>
                                <button
                                    onClick={() => {
                                        const confirmDelete = window.confirm(
                                            `آیا از حذف عضو ${member.name} مطمئن هستید؟`
                                        );
                                        if (confirmDelete) {
                                            const updatedMembers = teamMembers.filter((m) => m.id !== member.id);
                                            setTeamMembers(updatedMembers);
                                        }
                                    }}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    حذف
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamManagement;
