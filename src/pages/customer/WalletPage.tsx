import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface BankCard {
    id: number;
    card_name: string;
    card_number: string;
    is_default?: boolean;
}

const WalletPage: React.FC = () => {
    const [bankCards, setBankCards] = useState<BankCard[]>([]);
    const [newCard, setNewCard] = useState({
        card_name: "",
        card_number: ""
    });
    const [editingCard, setEditingCard] = useState<BankCard | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [walletBalance, setWalletBalance] = useState<number>(500000);
    const [cardNumberError, setCardNumberError] = useState<string | null>(null);

    useEffect(() => {
        fetchBankCards();
    }, []);

    const getAuthHeaders = () => {
        const token = localStorage.getItem("access_token");
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };
    };

    const fetchBankCards = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                "http://localhost:8000/api/users/bank-cards/",
                getAuthHeaders()
            );
            console.log("Response data:", response.data);

            let cards: BankCard[] = [];
            if (Array.isArray(response.data)) {
                cards = response.data;
            } else if (response.data?.results) {
                cards = response.data.results;
            } else if (response.data?.data) {
                cards = response.data.data;
            }

            setBankCards(cards);
        } catch (error) {
            console.error("Error fetching bank cards:", error);
            setError("خطا در دریافت اطلاعات کارت‌های بانکی");

            if (axios.isAxiosError(error) && error.response?.status === 401) {
                toast.error("لطفاً مجدداً وارد شوید");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const validateCardNumber = (number: string): boolean => {
        return number.length === 16 && /^\d+$/.test(number);
    };

    const handleAddCard = async () => {
        if (!newCard.card_name || !newCard.card_number) {
            toast.error("لطفاً نام و شماره کارت را وارد کنید");
            return;
        }

        if (!validateCardNumber(newCard.card_number)) {
            setCardNumberError("شماره کارت باید ۱۶ رقم باشد");
            return;
        }

        try {
            await axios.post(
                "http://localhost:8000/api/users/bank-cards/",
                newCard,
                getAuthHeaders()
            );
            setNewCard({ card_name: "", card_number: "" });
            setCardNumberError(null);
            setIsAdding(false);
            fetchBankCards();
            toast.success("کارت بانکی با موفقیت افزوده شد");
        } catch (error) {
            console.error("Error adding card:", error);
            toast.error("خطا در افزودن کارت بانکی");

            if (axios.isAxiosError(error) && error.response?.status === 401) {
                toast.error("دسترسی غیرمجاز. لطفاً وارد شوید");
            }
        }
    };

    const handleUpdateCard = async () => {
        if (!editingCard) return;

        if (!editingCard.card_name || !editingCard.card_number) {
            toast.error("لطفاً نام و شماره کارت را وارد کنید");
            return;
        }

        if (!validateCardNumber(editingCard.card_number)) {
            setCardNumberError("شماره کارت باید ۱۶ رقم باشد");
            return;
        }

        try {
            await axios.put(
                `http://localhost:8000/api/users/bank-cards/${editingCard.id}/`,
                editingCard,
                getAuthHeaders()
            );
            setEditingCard(null);
            setCardNumberError(null);
            fetchBankCards();
            toast.success("کارت بانکی با موفقیت ویرایش شد");
        } catch (error) {
            console.error("Error updating card:", error);
            toast.error("خطا در ویرایش کارت بانکی");

            if (axios.isAxiosError(error) && error.response?.status === 401) {
                toast.error("دسترسی غیرمجاز. لطفاً وارد شوید");
            }
        }
    };

    const handleDeleteCard = async (id: number) => {
        try {
            await axios.delete(
                `http://localhost:8000/api/users/bank-cards/${id}/`,
                getAuthHeaders()
            );
            fetchBankCards();
            toast.success("کارت بانکی با موفقیت حذف شد");
        } catch (error) {
            console.error("Error deleting card:", error);
            toast.error("خطا در حذف کارت بانکی");

            if (axios.isAxiosError(error) && error.response?.status === 401) {
                toast.error("دسترسی غیرمجاز. لطفاً وارد شوید");
            }
        }
    };
    const formatCardNumber = (cardNumber: string | number): string => {
        const str = String(cardNumber).replace(/\D/g, "");
        const result = [];

        // گروه‌بندی از راست به چپ
        for (let i = str.length; i > 0; i -= 4) {
            result.unshift(str.slice(Math.max(i - 4, 0), i));
        }

        return result.join(" ");
    };


    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fa-IR').format(amount) + " تومان";
    };

    const handleChargeWallet = () => {
        toast.info("این قابلیت به زودی اضافه خواهد شد");
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean = false) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) return;

        if (isEditing && editingCard) {
            setEditingCard({...editingCard, card_number: value});
        } else {
            setNewCard({...newCard, card_number: value});
        }

        if (value.length !== 16) {
            setCardNumberError("شماره کارت باید ۱۶ رقم باشد");
        } else {
            setCardNumberError(null);
        }
    };

    return (
        <div className="bg-[#F5F5F5] p-6 rounded-lg min-h-screen" style={{ direction: 'rtl' }}>
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#00296B] text-center pb-3 relative">
                    کیف پول و روش‌های پرداخت
                    <span className="absolute bottom-0 right-0 left-0 h-1.5 bg-[#FDC500] rounded-full mx-auto w-full max-w-2xl"></span>
                </h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FDC500]">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* موجودی کیف پول */}
                    <div className="bg-white p-4 rounded-lg border border-[#E2E8F0]">
                        <h3 className="text-lg font-semibold mb-2 text-[#00509D]">موجودی کیف پول</h3>
                        <p className="text-2xl font-bold text-[#000000]">{formatCurrency(walletBalance)}</p>
                        <button
                            className="bg-[#00509D] hover:bg-[#003F7D] text-white px-6 py-2 rounded-lg text-sm font-semibold transition duration-300 mt-3 w-full md:w-auto"
                            onClick={handleChargeWallet}
                        >
                            شارژ کیف پول
                        </button>
                    </div>

                    {/* کارت‌های بانکی */}
                    <div className="bg-white p-4 rounded-lg border border-[#E2E8F0]">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-[#00509D]">کارت‌های بانکی</h3>
                            <button
                                className="bg-[#FDC500] hover:bg-yellow-400 text-[#00296B] px-6 py-2 rounded-lg text-sm font-semibold transition duration-300"
                                onClick={() => setIsAdding(true)}
                            >
                                + افزودن کارت جدید
                            </button>
                        </div>

                        {isLoading ? (
                            <p className="text-center py-4">در حال بارگذاری...</p>
                        ) : bankCards.length === 0 ? (
                            <p className="text-gray-500 py-4">هیچ کارتی ثبت نشده است</p>
                        ) : (
                            <div className="space-y-4">
                                {bankCards.map((card) => (
                                    <div key={card.id} className="border-b pb-4 last:border-b-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-[#000000] font-medium">
                                                    {card.card_name} - {formatCardNumber(card.card_number).split('').reverse().join('')}
                                                </p>
                                                {card.is_default && (
                                                    <span className="inline-block bg-[#E6F7FF] text-[#00509D] text-xs px-2 py-1 rounded mt-1">
                                                        پیش‌فرض
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mt-2">
                                                <button
                                                    onClick={() => setEditingCard(card)}
                                                    className="bg-[#00509D] hover:bg-[#003F7D] text-white px-6 py-2 rounded-lg text-sm font-semibold transition duration-300 w-full md:w-auto"
                                                >
                                                    ویرایش
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCard(card.id)}
                                                    className="bg-[#D62828] hover:bg-[#B21F1F] text-white px-6 py-2 rounded-lg text-sm font-semibold transition duration-300 w-full md:w-auto"
                                                >
                                                    حذف
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* فرم افزودن کارت جدید */}
                {isAdding && (
                    <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] mt-4">
                        <h3 className="text-lg font-semibold mb-4 text-[#00509D]">افزودن کارت جدید</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 mb-2">نام دارنده کارت</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-[#E2E8F0] rounded focus:outline-none focus:ring-1 focus:ring-[#00509D]"
                                    value={newCard.card_name}
                                    onChange={(e) => setNewCard({...newCard, card_name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">شماره کارت</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border ${cardNumberError ? 'border-red-500' : 'border-[#E2E8F0]'} rounded focus:outline-none focus:ring-1 focus:ring-[#00509D]`}
                                    value={newCard.card_number}
                                    onChange={(e) => handleCardNumberChange(e)}
                                    maxLength={16}
                                    placeholder="۱۶ رقم شماره کارت"
                                />
                                {cardNumberError && (
                                    <p className="text-red-500 text-sm mt-1">{cardNumberError}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                            <button
                                onClick={handleAddCard}
                                className="bg-[#00509D] hover:bg-[#003F7D] text-white px-6 py-2 rounded-lg text-sm font-semibold transition duration-300 w-full md:w-auto"
                            >
                                ذخیره کارت
                            </button>
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                    setCardNumberError(null);
                                }}
                                className="bg-[#E2E8F0] hover:bg-[#CBD5E0] text-[#4A5568] px-6 py-2 rounded-lg text-sm font-semibold transition duration-300 w-full md:w-auto"
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                )}

                {/* فرم ویرایش کارت */}
                {editingCard && (
                    <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] mt-4">
                        <h3 className="text-lg font-semibold mb-4 text-[#00509D]">ویرایش کارت بانکی</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 mb-2">نام دارنده کارت</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-[#E2E8F0] rounded focus:outline-none focus:ring-1 focus:ring-[#00509D]"
                                    value={editingCard.card_name}
                                    onChange={(e) => setEditingCard({...editingCard, card_name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">شماره کارت</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border ${cardNumberError ? 'border-red-500' : 'border-[#E2E8F0]'} rounded focus:outline-none focus:ring-1 focus:ring-[#00509D]`}
                                    value={editingCard.card_number}
                                    onChange={(e) => handleCardNumberChange(e, true)}
                                    maxLength={16}
                                    placeholder="۱۶ رقم شماره کارت"
                                />
                                {cardNumberError && (
                                    <p className="text-red-500 text-sm mt-1">{cardNumberError}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                            <button
                                onClick={handleUpdateCard}
                                className="bg-[#00509D] hover:bg-[#003F7D] text-white px-6 py-2 rounded-lg text-sm font-semibold transition duration-300 w-full md:w-auto"
                            >
                                ذخیره تغییرات
                            </button>
                            <button
                                onClick={() => {
                                    setEditingCard(null);
                                    setCardNumberError(null);
                                }}
                                className="bg-[#E2E8F0] hover:bg-[#CBD5E0] text-[#4A5568] px-6 py-2 rounded-lg text-sm font-semibold transition duration-300 w-full md:w-auto"
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WalletPage;