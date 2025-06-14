import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../api/orders";
import { FiEye, FiChevronDown, FiChevronUp, FiPackage, FiCheckCircle, FiXCircle, FiClock, FiTruck, FiShoppingBag, FiCalendar } from "react-icons/fi";
import IMG from "../../assets/img.jpg";

interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
    image?: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  status: "pending" | "approved" | "cancelled";
  items: OrderItem[];
  total_price: number;
  created_at: string;
  user?: {
    id: number;
  };
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const userId = localStorage.getItem("user-id");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        const userOrders = data.filter((order: Order) => 
          order.user && order.user.id.toString() === userId
        );
        setOrders(userOrders);
      } catch (error) {
        console.error("خطا در دریافت سفارشات", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleStatusChange = async (orderId: number, newStatus: "pending" | "approved" | "cancelled") => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error("خطا در تغییر وضعیت سفارش", error);
    }
  };

  const getStatusDetails = (status: "pending" | "approved" | "cancelled") => {
    switch(status) {
      case "approved":
        return { 
          text: "تایید شده", 
          color: "bg-green-100 text-green-800",
          iconColor: "text-green-500",
          icon: <FiCheckCircle className="ml-1" /> 
        };
      case "cancelled":
        return { 
          text: "لغو شده", 
          color: "bg-red-100 text-red-800",
          iconColor: "text-red-500",
          icon: <FiXCircle className="ml-1" /> 
        };
      default:
        return { 
          text: "در حال بررسی", 
          color: "bg-yellow-100 text-yellow-800",
          iconColor: "text-yellow-500",
          icon: <FiClock className="ml-1" /> 
        };
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] min-h-screen p-4 md:p-8" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] flex items-center justify-center">
            <FiShoppingBag className="ml-2 text-[#00509D]" size={32} />
            مدیریت سفارشات
          </h1>
          <p className="text-[#64748b] mt-3 max-w-2xl mx-auto">
            مشاهده و مدیریت تمام سفارش‌های انجام شده
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00509D]"></div>
            <p className="mt-4 text-gray-600 text-lg">در حال بارگذاری سفارشات...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <FiPackage className="mx-auto text-5xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">هیچ سفارشی ثبت نشده است</h3>
            <p className="text-gray-500 mt-2">هنوز سفارشی برای نمایش وجود ندارد</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => {
              const status = getStatusDetails(order.status);
              const orderDate = new Date(order.created_at);
              const formattedDate = orderDate.toLocaleDateString('fa-IR');
              const formattedTime = orderDate.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
              
              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="p-5 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${status.color} bg-opacity-30`}>
                          {status.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                            سفارش {order.id}
                            <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>
                              {status.text}
                            </span>
                          </h3>
                          <p className="text-gray-500 text-sm mt-1 flex items-center">
                            <FiCalendar className="ml-1" />
                            {formattedDate} - {formattedTime}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-center">
                          <p className="text-sm">مبلغ کل</p>
                          <p className="font-bold">{order.total_price.toLocaleString('fa-IR')} تومان</p>
                        </div>
                        
                        <button 
                          onClick={() => toggleOrderDetails(order.id)}
                          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                            expandedOrder === order.id 
                              ? "bg-blue-50 text-blue-600 border-blue-200" 
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"
                          }`}
                        >
                          {expandedOrder === order.id ? (
                            <>
                              <FiChevronUp />
                              بستن جزئیات
                            </>
                          ) : (
                            <>
                              <FiEye />
                              مشاهده جزئیات
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <button 
                        onClick={() => handleStatusChange(order.id, "approved")}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
                          order.status === "approved" 
                            ? "bg-green-100 text-green-800" 
                            : "text-gray-600 hover:bg-green-50"
                        }`}
                      >
                        <FiCheckCircle className={status.iconColor} />
                        تایید سفارش
                      </button>
                      <button 
                        onClick={() => handleStatusChange(order.id, "cancelled")}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
                          order.status === "cancelled" 
                            ? "bg-red-100 text-red-800" 
                            : "text-gray-600 hover:bg-red-50"
                        }`}
                      >
                        <FiXCircle className={status.iconColor} />
                        لغو سفارش
                      </button>
                      <button 
                        onClick={() => handleStatusChange(order.id, "pending")}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
                          order.status === "pending" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "text-gray-600 hover:bg-yellow-50"
                        }`}
                      >
                        <FiClock className={status.iconColor} />
                        در حال بررسی
                      </button>
                    </div>
                  </div>
                  
                  {expandedOrder === order.id && (
                    <div className="border-t border-gray-200 bg-gray-50 p-5 md:p-6">
                      <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <FiPackage />
                        محصولات سفارش
                      </h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">محصول</th>
                              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">تعداد</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">قیمت واحد</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">قیمت کل</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {order.items.map(item => (
                              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 h-12 w-12">
                                      <img
                                        src={item.product.image || IMG}
                                        alt={item.product.name}
                                        className="h-12 w-12 rounded-lg object-cover border"
                                      />
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900">{item.product.name}</div>
                                      <div className="text-gray-500 text-sm">کد محصول: {item.product.id}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                  <span className="px-2 py-1 bg-gray-100 rounded-md">
                                    {item.quantity.toLocaleString('fa-IR')}
                                  </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                                  {item.price.toLocaleString('fa-IR')} تومان
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">
                                  {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-gray-600">
                            <FiTruck />
                            <span>هزینه ارسال:</span>
                          </div>
                          <span className="font-medium">رایگان</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-gray-600">تخفیف:</span>
                          <span className="font-medium">۰ تومان</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                          <span className="font-bold text-lg">جمع کل سفارش:</span>
                          <span className="font-bold text-lg text-blue-600">
                            {order.total_price.toLocaleString('fa-IR')} تومان
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;