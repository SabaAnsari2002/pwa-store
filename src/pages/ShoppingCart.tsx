import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiChevronLeft, FiCheckCircle, FiTruck, FiGift } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { checkoutOrder } from '../api/orders';
import { toast } from 'react-toastify';

const ShoppingCart: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();
  const userId = localStorage.getItem("user-id");
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const groupItemsByStore = () => {
    const grouped: Record<number, { storeName: string; items: typeof cartItems }> = {};
    
    cartItems.forEach(item => {
      if (!grouped[item.sellerId]) {
        grouped[item.sellerId] = {
          storeName: item.storeName,
          items: [],
        };
      }
      grouped[item.sellerId].items.push(item);
    });
    
    return grouped;
  };

  const handleStoreCheckout = async (storeId: number, storeItems: typeof cartItems) => {
    if (!userId) {
      navigate('/login');
      return;
    }
    
    setIsCheckingOut(true);

    try {
      const order = await checkoutOrder(
        storeItems.map(item => ({
          product_id: item.productId,
          seller_id: item.sellerId,
          quantity: item.quantity
        }))
      );
    
      storeItems.forEach(item => {
        removeFromCart(item.productId, item.sellerId);
      });
    
      toast.success(`سفارش #${order.id} با موفقیت ثبت شد!`, {
        position: "top-center",
        autoClose: 5000,
      });
    
    } catch (error: any) {
      console.error('Checkout error:', error);
      let errorMessage = 'خطا در ثبت سفارش';
    
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
        
        if (error.response.data.error.includes('موجودی')) {
          const outOfStockItems = storeItems.filter(item =>
            error.response.data.error.includes(item.productId.toString())
          );
          outOfStockItems.forEach(item => {
            updateQuantity(item.productId, item.sellerId, item.stock);
          });
        }
      }
    
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const calculateDeliveryEstimate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today.toLocaleDateString('fa-IR');
  };

  const groupedItems = groupItemsByStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]"
      style={{ direction: 'rtl' }}
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#3b82f6] hover:text-blue-700 transition-colors"
          >
            <FiChevronLeft className="ml-1" size={20} />
            <span className="font-medium">بازگشت</span>
          </button>
          <div className="flex items-center mr-4">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b]">سبد خرید شما</h1>
            {totalItems > 0 && (
              <span className="bg-[#3b82f6] text-white text-sm px-3 py-1 rounded-full mr-3">
                {totalItems} کالا
              </span>
            )}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-2xl mx-auto"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiShoppingCart className="w-12 h-12 text-[#3b82f6]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e293b] mb-3">
                سبد خرید شما خالی است
              </h2>
              <p className="text-gray-600 mb-6">
                می‌توانید از فروشگاه ما محصولات مورد نظر خود را انتخاب کنید
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] hover:from-[#2563eb] hover:to-[#1e40af] text-white px-8 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
              >
                بازگشت به فروشگاه
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {Object.entries(groupedItems).map(([storeId, group]) => {
                const storeTotal = group.items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                );

                return (
                  <motion.div
                    key={storeId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden"
                  >
                    <div className="p-5 bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white">
                      <h2 className="font-bold text-lg flex items-center">
                        <FiCheckCircle className="ml-2" />
                        فروشگاه: {group.storeName}
                      </h2>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {group.items.map(item => (
                        <motion.div
                          key={`${item.productId}-${item.sellerId}`}
                          layout
                          className="p-5 flex items-start sm:items-center"
                        >
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 object-contain rounded-xl border border-gray-200 ml-4"
                            />
                            {item.quantity > 1 && (
                              <span className="absolute -top-2 -right-2 bg-[#3b82f6] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                                {item.quantity}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <FiTruck className="ml-1" size={14} />
                              <span>تحویل تا {item.deliveryTime || "۲ تا ۳ روز کاری"}</span>
                            </div>
                            {item.quantity > item.stock && (
                              <div className="text-xs text-red-500 mt-1 flex items-center">
                                <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                تعداد انتخابی بیشتر از موجودی است (موجودی: {item.stock})
                              </div>
                            )}
                            <div className="mt-3 text-lg font-bold text-[#1e293b]">
                              {item.price} تومان
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.sellerId,
                                    item.quantity - 1
                                  )
                                }
                                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="px-3 py-1 bg-white w-10 text-center">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.sellerId,
                                    item.quantity + 1
                                  )
                                }
                                className={`px-3 py-2 ${
                                  item.quantity >= item.stock
                                    ? 'bg-gray-200 cursor-not-allowed'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                } transition-colors`}
                                disabled={item.quantity >= item.stock}
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() =>
                                removeFromCart(item.productId, item.sellerId)
                              }
                              className="p-2 text-red-500 hover:text-red-700 mr-2 transition-colors"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="p-5 bg-blue-50 flex justify-between items-center border-t border-gray-200">
                      <div className="flex items-center">
                        <FiGift className="text-[#3b82f6] ml-2" />
                        <span className="text-gray-700 font-medium">جمع این فروشگاه:</span>
                      </div>
                      <div className="text-xl font-bold text-[#1e40af]">
                        {storeTotal} تومان
                      </div>
                    </div>
                    
                    <div className="p-5 border-t border-gray-200">
                      <button
                        onClick={() => handleStoreCheckout(Number(storeId), group.items)}
                        disabled={isCheckingOut}
                        className={`w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-bold py-3 px-4 rounded-xl transition-all ${
                          isCheckingOut ? 'opacity-80 cursor-not-allowed' : 'shadow-md hover:shadow-lg'
                        }`}
                      >
                        {isCheckingOut ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            در حال پردازش...
                          </span>
                        ) : (
                          'تسویه حساب این فروشگاه'
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-6">
              <h2 className="text-xl font-bold text-[#1e293b] mb-4">خلاصه سفارش</h2>
              
              <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
                <div className="flex items-center text-blue-800 mb-2">
                  <FiTruck className="ml-2" />
                  <span>تخمین زمان تحویل</span>
                </div>
                <p className="text-sm text-gray-700">
                  سفارش شما تا روز <span className="font-bold">{calculateDeliveryEstimate()}</span> تحویل داده می‌شود
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">تعداد کالاها:</span>
                  <span className="font-medium">{totalItems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">جمع کل:</span>
                  <span className="font-medium">{totalPrice} تومان</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>تخفیف:</span>
                  <span className="font-medium">۰ تومان</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-gray-800 font-bold">مبلغ قابل پرداخت:</span>
                  <span className="text-xl font-bold text-[#1e40af]">{totalPrice} تومان</span>
                </div>
              </div>

              <button 
                className="w-full bg-gradient-to-r from-[#f59e0b] to-[#f97316] hover:from-[#f97316] hover:to-[#ea580c] text-white py-3 px-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                onClick={() => {
                  Object.entries(groupedItems).forEach(([storeId, group]) => {
                    handleStoreCheckout(Number(storeId), group.items);
                  });
                }}
                disabled={isCheckingOut}
              >
                پرداخت همه سفارش‌ها
              </button>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-[#334155] mb-3">مزایای خرید از ما</h3>
                <ul className="space-y-2 text-sm text-[#475569]">
                  <li className="flex items-start">
                    <span className="text-[#3b82f6] mr-2">•</span>
                    <span>ضمانت بازگشت کالا تا ۷ روز</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#3b82f6] mr-2">•</span>
                    <span>پشتیبانی ۲۴ ساعته</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#3b82f6] mr-2">•</span>
                    <span>ارسال سریع و به موقع</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#3b82f6] mr-2">•</span>
                    <span>پرداخت در محل برای تهران</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ShoppingCart;