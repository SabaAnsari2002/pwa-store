import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiChevronLeft } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { updateProductStock } from '../api/products';
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
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

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
    setIsCheckingOut(true);
    try {
      const order = await checkoutOrder(
        storeItems.map(item => ({
          product_id: item.productId,
          seller_id: item.sellerId,
          quantity: item.quantity
        }))
      );

      await Promise.all(
        storeItems.map(item =>
          updateProductStock(item.productId, item.quantity)
        )
      );

      storeItems.forEach(item => {
        removeFromCart(item.productId, item.sellerId);
      });

      toast.success(`سفارش #${order.id} با موفقیت ثبت شد!`, {
        position: "top-center",
        autoClose: 5000,
      });

    } catch (error: any) {
      let errorMessage = 'خطا در ثبت سفارش';

      if (error.response?.data?.error?.includes('موجودی')) {
        errorMessage = 'موجودی برخی محصولات کافی نیست';
        const outOfStockItems = storeItems.filter(item => 
          error.response.data.error.includes(item.productId.toString())
        );
        outOfStockItems.forEach(item => {
          updateQuantity(item.productId, item.sellerId, item.stock);
        });
      }

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const groupedItems = groupItemsByStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
      style={{ direction: 'rtl' }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#00296B] hover:text-blue-800"
          >
            <FiChevronLeft className="ml-1" />
            بازگشت
          </button>
          <h1 className="text-2xl font-bold text-[#00296B] mr-4">سبد خرید شما</h1>
          {totalItems > 0 && (
            <span className="bg-[#00296B] text-white text-sm px-3 py-1 rounded-full">
              {totalItems}
            </span>
          )}
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-8 text-center"
          >
            <div className="max-w-md mx-auto">
              <FiShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-[#00296B] mb-2">
                سبد خرید شما خالی است
              </h2>
              <p className="text-gray-600 mb-6">
                می‌توانید از فروشگاه ما محصولات مورد نظر خود را انتخاب کنید
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-[#00296B] hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium"
              >
                بازگشت به فروشگاه
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h2 className="font-semibold text-[#00296B]">
                      فروشگاه: {group.storeName}
                    </h2>
                  </div>

                  {group.items.map(item => (
                    <motion.div
                      key={`${item.productId}-${item.sellerId}`}
                      layout
                      className="p-4 flex items-start sm:items-center border-b border-gray-100"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded-lg border border-gray-200 ml-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <span>تحویل: {item.deliveryTime || "۲ تا ۳ روز کاری"}</span>
                        </div>
                          {item.quantity > item.stock && (
                            <div className="text-xs text-red-500 mt-1">
                              تعداد انتخابی بیشتر از موجودی است (موجودی: {item.stock})
                            </div>
                          )}
                        <div className="mt-2 text-lg font-bold text-[#00296B]">
                          {formatPrice(item.price)} تومان
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.sellerId,
                                item.quantity - 1
                              )
                            }
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1 bg-white">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.sellerId,
                                item.quantity + 1
                              )
                            }
                            className={`px-3 py-1 ${
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
                          className="p-2 text-red-500 hover:text-red-700 mr-2"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  <div className="p-4 bg-blue-50 flex justify-between items-center">
                    <div>
                      <span className="text-gray-600">جمع این فروشگاه:</span>
                    </div>
                    <div className="text-lg font-bold text-[#00296B]">
                      {formatPrice(storeTotal)} تومان
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-200">
                    <button
                      onClick={() => handleStoreCheckout(Number(storeId), group.items)}
                      disabled={isCheckingOut}
                      className={`w-full bg-[#FDC500] hover:bg-yellow-500 text-[#00296B] font-bold py-2 px-4 rounded-lg transition-colors ${
                        isCheckingOut ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isCheckingOut ? 'در حال پردازش...' : 'تسویه حساب این فروشگاه'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ShoppingCart;