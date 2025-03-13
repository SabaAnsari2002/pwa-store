import React, { useState, useEffect } from 'react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    stock: number; // موجودی انبار
}

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // داده‌های نمونه با موجودی انبار
        const sampleCartItems: CartItem[] = [
            { id: 1, name: "گوشی هوشمند سامسونگ گلکسی S21", price: 20000000, quantity: 1, image: "/images/samsung-s21.jpg", stock: 5 },
            { id: 2, name: "لپ‌تاپ اپل مک‌بوک پرو", price: 50000000, quantity: 1, image: "/images/macbook-pro.jpg", stock: 3 },
            { id: 3, name: "هدفون بی‌سیم سونی WH-1000XM4", price: 8000000, quantity: 1, image: "/images/sony-headphones.jpg", stock: 10 },
        ];
        setCartItems(sampleCartItems);
    }, []);

    const updateQuantity = (id: number, change: number) => {
        setCartItems(prevItems =>
            prevItems
                .map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + change } : item
                )
                .filter(item => item.quantity > 0) // حذف محصولاتی که تعدادشان به صفر رسیده است
        );
    };

    const removeItem = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/*<Header />*/}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">سبد خرید</h1>
                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <p className="text-xl text-gray-600">سبد خرید شما خالی است.</p>
                        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                            بازگشت به فروشگاه
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                                <div className="flex-grow">
                                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                    <p className="text-gray-600">قیمت واحد: {item.price.toLocaleString()} تومان</p>
                                    <p className="text-gray-600 text-sm">موجودی انبار: {item.stock} عدد</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    {/* دکمه کاهش تعداد */}
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className={`px-4 py-2 rounded-md ${
                                            item.quantity > 0 ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        <FaMinus />
                                    </button>

                                    {/* نمایش تعداد */}
                                    <span className="px-4 py-2 border rounded-md text-center">{item.quantity}</span>

                                    {/* دکمه افزایش تعداد */}
                                    <button
                                        onClick={() =>
                                            item.quantity < item.stock && updateQuantity(item.id, 1)
                                        }
                                        className={`px-4 py-2 rounded-md ${
                                            item.quantity < item.stock ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        <FaPlus />
                                    </button>

                                    {/* قیمت کل برای محصول */}
                                    <p className="text-lg font-semibold text-gray-800 w-[150px] text-right">
                                        {(item.price * item.quantity).toLocaleString()} تومان
                                    </p>

                                    {/* دکمه حذف محصول */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-700 ml-4"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* بخش مجموع کل */}
                        <div className="mt-8">
                            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                                <span className="text-xl font-bold text-gray-800">مجموع کل:</span>
                                <span className="text-2xl font-bold text-gray-800">
                                    {getTotalPrice().toLocaleString()} تومان
                                </span>
                            </div>

                            {/* دکمه‌های ادامه خرید و پرداخت نهایی */}
                            <div className="mt-6 flex justify-end space-x-4">
                                <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
                                    ادامه خرید
                                </button>
                                <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300">
                                    پرداخت نهایی
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;
