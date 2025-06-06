import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../../api/orders';
import { toast } from 'react-toastify';
import IMG from '../../assets/img.jpg'

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
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'completed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'cancelled':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'refunded':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'delivered':
        return 'bg-violet-50 text-violet-800 border-violet-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
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
    { value: 'all', label: 'همه', color: 'bg-gray-100 text-gray-800', count: orders.length },
    { value: 'pending', label: 'در انتظار', color: 'bg-amber-100 text-amber-800', count: orders.filter(o => o.status === 'pending').length },
    { value: 'completed', label: 'تکمیل شده', color: 'bg-emerald-100 text-emerald-800', count: orders.filter(o => o.status === 'completed').length },
    { value: 'cancelled', label: 'لغو شده', color: 'bg-rose-100 text-rose-800', count: orders.filter(o => o.status === 'cancelled').length },
    { value: 'delivered', label: 'تحویل شده', color: 'bg-violet-100 text-violet-800', count: orders.filter(o => o.status === 'delivered').length },
    { value: 'refunded', label: 'مرجوعی', color: 'bg-blue-100 text-blue-800', count: orders.filter(o => o.status === 'refunded').length },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-200 min-h-screen" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#00296B]">مدیریت سفارشات</h1>
          <p className="text-[#00296B] mt-2">نمایش و مدیریت تمامی سفارشات سیستم</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-[#00296B] overflow-hidden mb-6">
          <div className="p-4 md:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-[#00296B]">فیلتر وضعیت سفارشات</h2>
                <span className="text-sm text-[#00296B]">
                  <span className="font-medium text-[#00296B]">{filteredOrders.length}</span> سفارش یافت شد
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                      ${statusFilter === filter.value 
                        ? `${filter.color} shadow-inner border font-semibold` 
                        : 'bg-white text-[#00296B] hover:bg-gray-100 border border-[#00296B]'}
                    `}
                  >
                    {filter.label}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      statusFilter === filter.value ? 'bg-white' : 'bg-gray-100'
                    }`}>
                      {filter.count}
                    </span>
                    {statusFilter === filter.value && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00296B]"></div>
              <span className="mr-3 text-gray-600">در حال بارگذاری سفارشات...</span>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 text-center">
            <div className="inline-flex flex-col items-center justify-center text-[#00296B]">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <p className="text-lg">سفارشی یافت نشد</p>
              <p className="text-sm mt-1">هیچ سفارشی با وضعیت انتخاب شده وجود ندارد</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white rounded-xl shadow-sm border border-[#00296B] overflow-hidden hover:shadow-md transition-shadow"
              >
                <div 
                  className="p-4 md:p-6 cursor-pointer"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <svg className="w-6 h-6 text-[#00296B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#00296B]">سفارش #{order.id}</h3>
                        <p className="text-sm text-gray-500 mt-1">مشتری: {order.user.username}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(order.created_at)}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:items-end gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <span className="font-medium text-[#00296B]">
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
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                تسویه حساب
                              </>
                            )}
                          </button>
                        )}
                        
                        {order.status !== 'cancelled' && (
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
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            لغو سفارش
                          </button>
                        )}
                        
                        {order.status === 'completed' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(order.id, 'delivered');
                            }}
                            disabled={processingId === order.id}
                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 shadow-md hover:shadow-lg transition-all
                              ${processingId === order.id ? 'opacity-70 cursor-not-allowed' : ''}
                            `}
                          >
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            تحویل شد
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {expandedOrder === order.id && (
                  <div className="px-4 pb-4 md:px-6 md:pb-6 animate-fade-in">
                    <div className="bg-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-3">جزئیات سفارش</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 shadow-xs">
                            <div className="flex items-center gap-3">
                              {item.product.image || IMG ? (
                                <img 
                                  src={IMG} 
                                  alt={item.product.name}
                                  className="w-12 h-12 object-cover rounded-lg"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                  </svg>
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium text-gray-800">{item.product.name}</p>
                                <p className="text-xs text-gray-500 mt-1">فروشنده: {item.seller.shop_name}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-[#00296B]">{item.price.toLocaleString('fa-IR')} تومان</p>
                              <p className="text-xs text-[#00296B] mt-1">تعداد: {item.quantity.toLocaleString('fa-IR')}</p>
                              <p className="text-xs font-medium text-[#00296B] mt-1">
                                جمع: {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-sm text-gray-600">جمع کل سفارش:</span>
                        <span className="font-medium text-lg text-[#00296B]">{order.total_price.toLocaleString('fa-IR')} تومان</span>
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