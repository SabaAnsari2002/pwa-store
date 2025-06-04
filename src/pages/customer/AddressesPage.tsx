import React, { useEffect, useState } from "react";

interface Address {
    id: number;
    title: string;
    address_line: string;
    is_default: boolean;
    created_at: string;
}

const AddressesPage: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [newAddress, setNewAddress] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const token = localStorage.getItem("access_token");

    const fetchAddresses = () => {
        fetch("http://localhost:8000/api/users/addresses/", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text);
                }
                return res.json();
            })
            .then(setAddresses)
            .catch(err => {
                console.error("Error fetching addresses:", err);
                setErrorMessage("خطا در دریافت آدرس‌ها.");
            });
    };

    useEffect(() => {
        if (!token) {
            setErrorMessage("لطفاً ابتدا وارد حساب خود شوید.");
            return;
        }
        fetchAddresses();
    }, []);

    const handleAdd = () => {
        if (!newAddress.trim() || !newTitle.trim()) {
            setErrorMessage("عنوان و آدرس نمی‌توانند خالی باشند.");
            return;
        }

        fetch("http://localhost:8000/api/users/addresses/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTitle,
                address_line: newAddress,
                is_default: addresses.length === 0
            })
        })
            .then(async res => {
                if (!res.ok) throw new Error(await res.text());
                return res.json();
            })
            .then(data => {
                setAddresses(prev => [...prev, data]);
                setNewAddress('');
                setNewTitle('');
                setSuccessMessage("آدرس با موفقیت اضافه شد.");
                setErrorMessage('');
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch(err => {
                console.error("Error adding address:", err);
                setErrorMessage("ثبت آدرس انجام نشد.");
            });
    };

    const handleEdit = (id: number) => {
        const address = addresses.find(a => a.id === id);
        if (address) {
            setNewTitle(address.title);
            setNewAddress(address.address_line);
            setEditingId(id);
            setSuccessMessage('');
            setErrorMessage('');
        }
    };

    const handleUpdate = () => {
        if (editingId === null || !newAddress.trim() || !newTitle.trim()) return;

        fetch(`http://localhost:8000/api/users/addresses/${editingId}/`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTitle,
                address_line: newAddress
            })
        })
            .then(async res => {
                if (!res.ok) throw new Error(await res.text());
                return res.json();
            })
            .then(updated => {
                setAddresses(prev => prev.map(a => (a.id === updated.id ? updated : a)));
                setNewAddress('');
                setNewTitle('');
                setEditingId(null);
                setSuccessMessage("آدرس با موفقیت به‌روزرسانی شد.");
                setErrorMessage('');
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch(err => {
                console.error("Error updating address:", err);
                setErrorMessage("به‌روزرسانی آدرس انجام نشد.");
            });
    };

    const handleDelete = (id: number) => {
        if (!window.confirm("آیا از حذف این آدرس مطمئن هستید؟")) return;

        fetch(`http://localhost:8000/api/users/addresses/${id}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    setAddresses(prev => prev.filter(a => a.id !== id));
                    setSuccessMessage("آدرس حذف شد.");
                    setErrorMessage('');
                    setTimeout(() => setSuccessMessage(''), 3000);
                } else {
                    return res.text().then(text => {
                        throw new Error(text);
                    });
                }
            })
            .catch(err => {
                console.error("Error deleting address:", err);
                setErrorMessage("حذف آدرس انجام نشد.");
            });
    };

    const setAsDefault = (id: number) => {
        fetch(`http://localhost:8000/api/users/addresses/${id}/set_default/`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(async res => {
                if (!res.ok) throw new Error(await res.text());
                return res.json();
            })
            .then(updated => {
                setAddresses(prev =>
                    prev.map(a => ({
                        ...a,
                        is_default: a.id === updated.id
                    }))
                );
                setSuccessMessage("آدرس پیش‌فرض تغییر کرد.");
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch(err => {
                console.error("Error setting default address:", err);
                setErrorMessage("تغییر آدرس پیش‌فرض انجام نشد.");
            });
    };

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            <h2 className="text-3xl font-bold text-center mb-6 text-[#00296B]">مدیریت آدرس‌ها</h2>

            <div className="bg-white p-6 rounded shadow-md border-t-4 border-[#FDC500]">
                <div className="mb-4">
                    <input
                        type="text"
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        placeholder="عنوان آدرس (مثلاً خانه، محل کار)"
                        className="w-full p-3 border rounded mb-2"
                    />
                    <textarea
                        value={newAddress}
                        onChange={e => setNewAddress(e.target.value)}
                        placeholder="نشانی کامل"
                        className="w-full p-3 border rounded mb-2"
                        rows={3}
                    />
                    <button
                        onClick={editingId ? handleUpdate : handleAdd}
                        className="bg-[#00509D] hover:bg-[#003366] text-white px-4 py-2 rounded transition"
                    >
                        {editingId ? "ویرایش آدرس" : "افزودن آدرس"}
                    </button>
                    {editingId && (
                        <button
                            onClick={() => {
                                setEditingId(null);
                                setNewTitle('');
                                setNewAddress('');
                            }}
                            className="mr-2 bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
                        >
                            انصراف
                        </button>
                    )}
                </div>

                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-3">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
                        {errorMessage}
                    </div>
                )}

                <div className="space-y-4">
                    {addresses.length === 0 ? (
                        <p className="text-gray-500">هیچ آدرسی ثبت نشده است.</p>
                    ) : (
                        addresses.map(addr => (
                            <div
                                key={addr.id}
                                className={`p-4 border rounded flex flex-col md:flex-row justify-between items-start md:items-center ${
                                    addr.is_default ? "border-2 border-green-500" : ""
                                }`}
                            >
                                <div className="flex-1 mb-3 md:mb-0">
                                    <h3 className="font-bold">{addr.title}</h3>
                                    <p className="text-gray-700">{addr.address_line}</p>
                                    <p className="text-sm text-gray-500">
                                        تاریخ ثبت: {new Date(addr.created_at).toLocaleDateString('fa-IR')}
                                    </p>
                                    {addr.is_default && (
                                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">
                                            آدرس پیش‌فرض
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mt-4 w-full md:w-auto">
                                    {!addr.is_default && (
                                        <button
                                            onClick={() => setAsDefault(addr.id)}
                                            className="bg-[#FDC500] hover:bg-yellow-400 text-[#00296B] px-6 py-2 rounded-lg text-sm font-semibold transition duration-300 w-full md:w-auto"
                                        >
                                            انتخاب به‌عنوان پیش‌فرض
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleEdit(addr.id)}
                                        className="bg-[#00509D] hover:bg-[#003F7D] text-white px-6 py-2 rounded-lg text-sm font-semibold transition duration-300 w-full md:w-auto"
                                    >
                                        ویرایش
                                    </button>

                                    <button
                                        onClick={() => handleDelete(addr.id)}
                                        className="bg-[#D62828] hover:bg-[#B21F1F] text-white px-6 py-2 rounded-lg text-sm font-semibold transition duration-300 w-full md:w-auto"
                                    >
                                        حذف
                                    </button>
                                </div>

                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddressesPage;