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

    const handleAddMember = () => {
        if (newMember.name && newMember.role && newMember.email) {
            const member = { id: teamMembers.length + 1, ...newMember };
            setTeamMembers([...teamMembers, member]);
            setNewMember({ name: "", role: "", email: "", status: "فعال" });
        } else {
            alert("لطفاً تمام فیلدها را به درستی پر کنید.");
        }
    };

    const filteredMembers = teamMembers.filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            {/* عنوان صفحه */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    مدیریت تیم فروش
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            {/* فرم افزودن عضو جدید */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] mb-8">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">افزودن عضو جدید</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="نام"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        className="p-2 border rounded focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                    />
                    <input
                        type="text"
                        placeholder="نقش"
                        value={newMember.role}
                        onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                        className="p-2 border rounded focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                    />
                    <input
                        type="email"
                        placeholder="ایمیل"
                        value={newMember.email}
                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                        className="p-2 border rounded focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                    />
                    <select
                        value={newMember.status}
                        onChange={(e) => setNewMember({ ...newMember, status: e.target.value })}
                        className="p-2 border rounded focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                    >
                        <option value="فعال">فعال</option>
                        <option value="غیرفعال">غیرفعال</option>
                    </select>
                </div>
                <button
                    onClick={handleAddMember}
                    className="mt-4 bg-[#00509D] hover:bg-[#003F7D] text-white px-4 py-2 rounded transition duration-300"
                >
                    افزودن عضو
                </button>
            </div>

            {/* جستجو */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500] mb-8">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">جستجوی اعضا</h2>
                <input
                    type="text"
                    placeholder="جستجوی اعضا..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-full md:w-1/2 focus:ring-2 focus:ring-[#00509D] focus:border-transparent"
                />
            </div>

            {/* لیست اعضا */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                <h2 className="text-lg font-semibold text-[#00509D] mb-4">لیست اعضا</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-3 px-4 border-b text-[#00509D]">نام</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">نقش</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">ایمیل</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">وضعیت</th>
                            <th className="py-3 px-4 border-b text-[#00509D]">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredMembers.map((member) => (
                            <tr key={member.id}>
                                <td className="py-3 px-4 border-b text-[#000000]">{member.name}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{member.role}</td>
                                <td className="py-3 px-4 border-b text-[#000000]">{member.email}</td>
                                <td className="py-3 px-4 border-b">
                                    <span
                                        className={`p-1 rounded border ${
                                            member.status === "فعال"
                                                ? "bg-green-100 text-green-800 border-green-300"
                                                : "bg-red-100 text-red-800 border-red-300"
                                        }`}
                                    >
                                        {member.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 border-b">
                                    <button
                                        onClick={() => alert(`ویرایش عضو ${member.name}`)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded ml-2 transition duration-300"
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
                                        className="bg-[#D62828] hover:bg-[#B21F1F] text-white px-3 py-1 rounded transition duration-300"
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
        </div>
    );
};

export default TeamManagement;
