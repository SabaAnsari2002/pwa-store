import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../../api/orders';
import { toast } from 'react-toastify';
import IMG from '../../assets/img.jpg';
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiRefreshCw, FiChevronDown, FiChevronUp, FiShoppingBag, FiDollarSign, FiCalendar, FiUser } from 'react-icons/fi';

interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
    image?: string;
  };
  quantity: number;
  price: number;
  seller: {
    id: number;
    shop_name: string;
  };
}

interface Order {
  id: number;
  user: {
    id: number;
    username: string;
  };
  items: OrderItem[];
  total_price: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded' | 'delivered';
  created_at: string;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
        setFilteredOrders(fetchedOrders);
      } catch (error) {
        toast.error('خطا در دریافت سفارشات');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === statusFilter));
    }
  }, [statusFilter, orders]);

  const handleCheckout = async (order: Order) => {
    setProcessingId(order.id);
    try {
      await updateOrderStatus(order.id, 'completed');
      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'completed' } : o));
      toast.success(`سفارش #${order.id} با موفقیت تسویه شد`);
    } catch (error) {
      toast.error('خطا در تسویه حساب سفارش');
    } finally {
      setProcessingId(null);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: 'cancelled' | 'delivered') => {
    if (!window.confirm(`آیا از تغییر وضعیت سفارش به ${newStatus === 'cancelled' ? 'لغو شده' : 'تحویل داده شده'} مطمئن هستید؟`)) return;
    
    setProcessingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      toast.success(`وضعیت سفارش #${orderId} با موفقیت تغییر یافت`);
    } catch (error) {
      toast.error('خطا در تغییر وضعیت سفارش');
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'cancelled':
        return 'bg-rose-100 text-rose-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-violet-100 text-violet-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FiRefreshCw className="ml-1 animate-spin" size={16} />;
      case 'completed':
        return <FiCheckCircle className="ml-1" size={16} />;
      case 'cancelled':
        return <FiXCircle className="ml-1" size={16} />;
      case 'delivered':
        return <FiTruck className="ml-1" size={16} />;
      default:
        return <FiPackage className="ml-1" size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'در انتظار پرداخت';
      case 'completed':
        return 'تکمیل شده';
      case 'cancelled':
        return 'لغو شده';
      case 'refunded':
        return 'مرجوعی';
      case 'delivered':
        return 'تحویل داده شده';
      default:
        return status;
    }
  };

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fa-IR', options);
  };

  const statusFilters = [
    { value: 'all', label: 'همه', color: 'bg-gray-100 text-gray-800', icon: <FiShoppingBag size={16} />, count: orders.length },
    { value: 'pending', label: 'در انتظار', color: 'bg-amber-100 text-amber-800', icon: <FiRefreshCw size={16} />, count: orders.filter(o => o.status === 'pending').length },
    { value: 'completed', label: 'تکمیل شده', color: 'bg-emerald-100 text-emerald-800', icon: <FiCheckCircle size={16} />, count: orders.filter(o => o.status === 'completed').length },
    { value: 'cancelled', label: 'لغو شده', color: 'bg-rose-100 text-rose-800', icon: <FiXCircle size={16} />, count: orders.filter(o => o.status === 'cancelled').length },
    { value: 'delivered', label: 'تحویل شده', color: 'bg-violet-100 text-violet-800', icon: <FiTruck size={16} />, count: orders.filter(o => o.status === 'delivered').length },
    { value: 'refunded', label: 'مرجوعی', color: 'bg-blue-100 text-blue-800', icon: <FiPackage size={16} />, count: orders.filter(o => o.status === 'refunded').length },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen p-4 md:p-6" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                <FiPackage className="ml-2 text-indigo-600" size={28} />
                مدیریت سفارشات
              </h1>
              <p className="text-gray-600 mt-2">نمایش و مدیریت تمامی سفارشات سیستم</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-xs border border-gray-200">
              <p className="text-sm text-gray-500">تعداد سفارشات</p>
              <p className="text-xl font-bold text-indigo-600">{orders.length.toLocaleString('fa-IR')}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-4 md:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-800 flex items-center">
                  <FiShoppingBag className="ml-2 text-indigo-500" size={20} />
                  فیلتر وضعیت سفارشات
                </h2>
                <span className="text-sm text-gray-500">
                  <span className="font-medium text-indigo-600">{filteredOrders.length}</span> سفارش یافت شد
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border
                      ${statusFilter === filter.value 
                        ? `${filter.color} border-transparent shadow-md font-semibold` 
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'}
                    `}
                  >
                    {filter.icon}
                    {filter.label}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      statusFilter === filter.value ? 'bg-white/80' : 'bg-gray-100'
                    }`}>
                      {filter.count.toLocaleString('fa-IR')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
              <span className="mr-3 text-gray-600">در حال بارگذاری سفارشات...</span>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 text-center">
            <div className="inline-flex flex-col items-center justify-center text-gray-500">
              <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                <FiPackage className="w-12 h-12 text-indigo-400" />
              </div>
              <p className="text-lg font-medium">سفارشی یافت نشد</p>
              <p className="text-sm mt-1">هیچ سفارشی با وضعیت انتخاب شده وجود ندارد</p>
              <button 
                onClick={() => setStatusFilter('all')}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                نمایش همه سفارشات
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div 
                  className="p-4 md:p-6 cursor-pointer transition-colors hover:bg-gray-50"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 flex items-center">
                          سفارش #{order.id}
                          <span className={`ml-3 px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                          <p className="text-sm text-gray-500 flex items-center">
                            <FiUser className="ml-1" size={14} />
                            {order.user.username}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <FiCalendar className="ml-1" size={14} />
                            {formatDate(order.created_at)}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <FiShoppingBag className="ml-1" size={14} />
                            {order.items.length} آیتم
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:items-end gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-800 text-lg">
                          {order.total_price.toLocaleString('fa-IR')} تومان
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {order.status === 'pending' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCheckout(order);
                            }}
                            disabled={processingId === order.id}
                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all
                              ${processingId === order.id ? 'opacity-70 cursor-not-allowed' : ''}
                            `}
                          >
                            {processingId === order.id ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                در حال پردازش
                              </>
                            ) : (
                              <>
                                <FiDollarSign className="ml-1" size={16} />
                                تسویه حساب
                              </>
                            )}
                          </button>
                        )}
                        
                        {order.status !== 'cancelled' && order.status !== 'completed' &&(
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(order.id, 'cancelled');
                            }}
                            disabled={processingId === order.id}
                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-md hover:shadow-lg transition-all
                              ${processingId === order.id ? 'opacity-70 cursor-not-allowed' : ''}
                            `}
                          >
                            <FiXCircle className="ml-1" size={16} />
                            لغو سفارش
                          </button>
                        )}
                        
                        {order.status === 'completed' && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(order.id, 'delivered');
                            }}
                          >
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-3">
                    {expandedOrder === order.id ? (
                      <FiChevronUp className="text-gray-400" />
                    ) : (
                      <FiChevronDown className="text-gray-400" />
                    )}
                  </div>
                </div>
                
                {expandedOrder === order.id && (
                  <div className="px-4 pb-4 md:px-6 md:pb-6 animate-fade-in">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                        <FiShoppingBag className="ml-2 text-indigo-500" size={18} />
                        جزئیات سفارش
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-xs">
                            <div className="flex items-center gap-3">
                              {item.product.image || IMG ? (
                                <img 
                                  src={IMG} 
                                  alt={item.product.name}
                                  className="w-12 h-12 object-cover rounded-lg"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <FiPackage className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium text-gray-800">{item.product.name}</p>
                                <p className="text-xs text-gray-500 mt-1">فروشنده: {item.seller.shop_name}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-indigo-600">{item.price.toLocaleString('fa-IR')} تومان</p>
                              <p className="text-xs text-gray-500 mt-1">تعداد: {item.quantity.toLocaleString('fa-IR')}</p>
                              <p className="text-xs font-medium text-indigo-600 mt-1">
                                جمع: {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-sm text-gray-600">جمع کل سفارش:</span>
                        <span className="font-medium text-lg text-indigo-600">{order.total_price.toLocaleString('fa-IR')} تومان</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;