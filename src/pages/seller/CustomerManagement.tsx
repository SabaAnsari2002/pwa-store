import React, { useState, useEffect } from "react";
import { 
  FiUsers, 
  FiMessageSquare, 
  FiSearch, 
  FiMail,
  FiPhone,
  FiShoppingBag,
  FiEye,
  FiCalendar
} from "react-icons/fi";

interface Customer {
  id: number;
  username: string;
  email: string;
  phone: string;
  date_joined: string;
  status?: string;
  purchases?: number;
}

interface Message {
  id: number;
  customer: string;
  customerId: number;
  message: string;
  date: string;
  status: string;
  priority: string;
}

interface Order {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
  };
  items: Array<{
    id: number;
    product: {
      id: number;
      name: string;
    };
    quantity: number;
    price: number;
  }>;
  total_price: number;
  status: string;
  created_at: string;
}

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("customers");
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No access token found");
        }

        const response = await fetch("http://localhost:8000/api/users/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }

        const data = await response.json();
        
        const customersWithStatus = Array.isArray(data) 
          ? data.map((customer: Customer) => ({
              ...customer,
              status: getRandomStatus(),
              purchases: Math.floor(Math.random() * 15) + 1,
              joinDate: formatDate(customer.date_joined),
            }))
          : [{
              ...data,
              status: getRandomStatus(),
              purchases: Math.floor(Math.random() * 15) + 1,
              joinDate: formatDate(data.date_joined),
            }];
          
        setCustomers(customersWithStatus);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No access token found");
        }

        const response = await fetch("http://localhost:8000/api/orders/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchCustomers();
    fetchOrders();
    
    setMessages([
      { 
        id: 1, 
        customer: "پوریا رحیمی", 
        customerId: 1,
        message: "سلام، محصول کی ارسال می‌شود؟", 
        date: "۱۴۰۲/۰۷/۰۱", 
        status: "خوانده نشده",
        priority: "بالا"
      },
      { 
        id: 2, 
        customer: "کاربر نمونه", 
        customerId: 2,
        message: "آیا تخفیف ویژه‌ای دارید؟", 
        date: "۱۴۰۲/۰۷/۰۲", 
        status: "پاسخ داده شده",
        priority: "متوسط"
      }
    ]);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
  };

  const getRandomStatus = () => {
    const statuses = ["فعال"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getPurchaseCount = (userId: number) => {
    return orders.filter(order => order.user.id === userId).length;
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const filteredMessages = messages.filter((message) =>
    message.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.length;
  const unreadMessages = messages.filter(m => m.status === "خوانده نشده").length;

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="mr-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] min-h-screen p-4 md:p-6" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b] flex items-center">
              <FiUsers className="ml-2 text-indigo-600" size={28} />
              مدیریت مشتریان
            </h1>
            <p className="text-[#64748b] mt-2">مدیریت ارتباط با مشتریان</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border-t-4 border-indigo-500">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-gray-500 text-sm font-medium">کل مشتریان</h4>
                <p className="text-2xl font-bold text-gray-800 mt-1">{totalCustomers}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <FiUsers className="text-indigo-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border-t-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-gray-500 text-sm font-medium">مشتریان فعال</h4>
                <p className="text-2xl font-bold text-gray-800 mt-1">{activeCustomers}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiUsers className="text-green-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 ${activeTab === 'customers' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('customers')}
          >
            مشتریان
          </button>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm pr-10 pl-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="جستجوی مشتریان ..."
            />
          </div>
        </div>

        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام مشتری</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اطلاعات تماس</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تعداد خریدها</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                            {customer.username.charAt(0)}
                          </div>
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">{customer.username}</div>
                            <div className="text-sm text-gray-500">عضویت: {formatDate(customer.date_joined)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FiMail className="ml-2 text-gray-400" />
                          {customer.email}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 flex items-center">
                          <FiPhone className="ml-2 text-gray-400" />
                          {customer.phone || 'ثبت نشده'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiShoppingBag className="ml-2 text-gray-400" />
                          <span className="text-sm font-medium">
                            {getPurchaseCount(customer.id)} خرید
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2 space-x-reverse">
                          <button 
                            onClick={() => handleCustomerClick(customer)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="مشاهده جزئیات"
                          >
                            <FiEye size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مشتری</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اولویت</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMessages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{message.customer}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 line-clamp-1">{message.message}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{message.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          message.priority === "بالا" 
                            ? "bg-red-100 text-red-800" 
                            : message.priority === "متوسط" 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-gray-100 text-gray-800"
                        }`}>
                          {message.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          message.status === "خوانده نشده" 
                            ? "bg-red-100 text-red-800" 
                            : message.status === "پاسخ داده شده" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {message.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleMessageClick(message)}
                          className="text-indigo-600 hover:text-indigo-900 px-3 py-1 border border-indigo-600 rounded-lg"
                        >
                          مشاهده و پاسخ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>


      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  جزئیات مشتری
                </h3>
                <button 
                  onClick={() => setShowCustomerModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                      {selectedCustomer?.username.charAt(0)}
                    </div>
                    <span className={`absolute bottom-0 right-0 h-5 w-5 rounded-full border-2 border-white ${
                      selectedCustomer?.status === "فعال" 
                        ? "bg-green-500" 
                        : 1
                    }`}></span>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedCustomer?.username}</h2>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedCustomer?.status === "فعال" 
                          ? "bg-green-100 text-green-800" 
                          : 1
                      }`}>
                        {selectedCustomer?.status}
                      </span>
                      <span className="flex items-center text-sm text-gray-600">
                        <FiCalendar className="ml-1" size={14} />
                        عضویت: {formatDate(selectedCustomer?.date_joined || '')}
                      </span>
                      <span className="flex items-center text-sm text-gray-600">
                        <FiShoppingBag className="ml-1" size={14} />
                        {getPurchaseCount(selectedCustomer?.id || 0)} خرید
                      </span>
                    </div>
                  </div>
                </div>
                    
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 space-x-reverse">
                    <button className="py-3 px-1 border-b-2 border-indigo-500 text-sm font-medium text-indigo-600">
                      اطلاعات اصلی
                    </button>
                  </nav>
                </div>
                    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-800">اطلاعات تماس</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                          <FiMail className="text-indigo-500" size={18} />
                        </div>
                        <div className="mr-3">
                          <p className="text-sm text-gray-500">ایمیل</p>
                          <p className="text-gray-800">{selectedCustomer?.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                          <FiPhone className="text-indigo-500" size={18} />
                        </div>
                        <div className="mr-3">
                          <p className="text-sm text-gray-500">تلفن</p>
                          <p className="text-gray-800">{selectedCustomer?.phone || 'ثبت نشده'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                    
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-4">آمار خرید</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <p className="text-sm text-gray-500">تعداد خریدها</p>
                        <p className="text-xl font-bold text-indigo-600 mt-1">
                          {getPurchaseCount(selectedCustomer?.id || 0)}
                        </p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <p className="text-sm text-gray-500">مبلغ کل</p>
                        <p className="text-xl font-bold text-green-600 mt-1">
                          {orders
                            .filter(o => o.user.id === selectedCustomer?.id)
                            .reduce((sum, order) => sum + order.total_price, 0)
                            .toLocaleString('fa-IR')} تومان
                        </p>
                      </div>
                          
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <p className="text-sm text-gray-500">میانگین خرید</p>
                        <p className="text-xl font-bold text-purple-600 mt-1">
                          {orders.length > 0 && selectedCustomer
                            ? (
                                orders
                                  .filter(o => o.user.id === selectedCustomer.id)
                                  .reduce((sum, order) => sum + order.total_price, 0) /
                                orders.filter(o => o.user.id === selectedCustomer.id).length
                              ).toLocaleString('fa-IR') + ' تومان'
                            : '0 تومان'}
                        </p>
                      </div>
                            
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <p className="text-sm text-gray-500">آخرین خرید</p>
                        <p className="text-sm font-medium text-gray-800 mt-1">
                          {orders.length > 0 
                            ? formatDate(orders
                                .filter(o => o.user.id === selectedCustomer?.id)
                                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]?.created_at || '') 
                            : 'بدون خرید'}
                        </p>
                      </div>
                    </div>
                  </div>
                            
                  <div className="md:col-span-2 bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-4">فعالیت‌های اخیر</h4>
                            
                    <div className="space-y-4">
                      {orders
                        .filter(o => o.user.id === selectedCustomer?.id)
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .slice(0, 3)
                        .map(order => (
                          <div key={order.id} className="flex items-start pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                              <FiShoppingBag className="text-green-500" size={18} />
                            </div>
                            <div className="mr-3 flex-1">
                              <div className="flex justify-between">
                                <p className="font-medium text-gray-800">سفارش {order.id}</p>
                                <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {order.items.length} آیتم - {order.total_price.toLocaleString('fa-IR')} تومان
                              </p>

                            </div>
                          </div>
                        ))}
                      
                      {orders.filter(o => o.user.id === selectedCustomer?.id).length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                          هیچ فعالیتی یافت نشد
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                    
                <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => setShowCustomerModal(false)}
                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    بستن
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">مشتری: {selectedMessage.customer}</h4>
                  <p className="text-gray-600">تاریخ: {selectedMessage.date}</p>
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedMessage.status === "خوانده نشده" 
                        ? "bg-red-100 text-red-800" 
                        : selectedMessage.status === "پاسخ داده شده" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                    }`}>
                      وضعیت: {selectedMessage.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium mr-2 ${
                      selectedMessage.priority === "بالا" 
                        ? "bg-red-100 text-red-800" 
                        : selectedMessage.priority === "متوسط" 
                          ? "bg-yellow-100 text-yellow-800" 
                          : "bg-gray-100 text-gray-800"
                    }`}>
                      اولویت: {selectedMessage.priority}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;