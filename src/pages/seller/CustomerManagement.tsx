import React, { useState } from "react";
import { 
  FiUsers, 
  FiMessageSquare, 
  FiSearch, 
  FiChevronDown,
  FiMail,
  FiPhone,
  FiShoppingBag,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPlus
} from "react-icons/fi";

// نمونه داده‌های مشتریان
const initialCustomers = [
  { 
    id: 1, 
    name: "علی محمدی", 
    email: "ali@example.com", 
    phone: "09123456789", 
    purchases: 5,
    joinDate: "۱۴۰۱/۰۳/۱۵",
    status: "فعال"
  },
  { 
    id: 2, 
    name: "فاطمه احمدی", 
    email: "fatemeh@example.com", 
    phone: "09129876543", 
    purchases: 3,
    joinDate: "۱۴۰۲/۰۱/۲۲",
    status: "فعال"
  },
  { 
    id: 3, 
    name: "رضا حسینی", 
    email: "reza@example.com", 
    phone: "09121234567", 
    purchases: 10,
    joinDate: "۱۴۰۰/۱۱/۰۵",
    status: "ویژه"
  },
  { 
    id: 4, 
    name: "زهرا کریمی", 
    email: "zahra@example.com", 
    phone: "09155566778", 
    purchases: 2,
    joinDate: "۱۴۰۲/۰۵/۱۸",
    status: "غیرفعال"
  },
  { 
    id: 5, 
    name: "محمد رضایی", 
    email: "mohammad@example.com", 
    phone: "09187654321", 
    purchases: 7,
    joinDate: "۱۴۰۱/۰۹/۳۰",
    status: "فعال"
  },
];

// نمونه داده‌های پیام‌ها
const initialMessages = [
  { 
    id: 1, 
    customer: "علی محمدی", 
    customerId: 1,
    message: "سلام، محصول کی ارسال می‌شود؟", 
    date: "۱۴۰۲/۰۷/۰۱", 
    status: "خوانده نشده",
    priority: "بالا"
  },
  { 
    id: 2, 
    customer: "فاطمه احمدی", 
    customerId: 2,
    message: "آیا تخفیف ویژه‌ای دارید؟", 
    date: "۱۴۰۲/۰۷/۰۲", 
    status: "پاسخ داده شده",
    priority: "متوسط"
  },
  { 
    id: 3, 
    customer: "رضا حسینی", 
    customerId: 3,
    message: "مشکلی در پرداخت داشتم.", 
    date: "۱۴۰۲/۰۷/۰۳", 
    status: "در حال بررسی",
    priority: "بالا"
  },
  { 
    id: 4, 
    customer: "زهرا کریمی", 
    customerId: 4,
    message: "نظرم را درباره محصول تغییر دادم", 
    date: "۱۴۰۲/۰۷/۰۴", 
    status: "خوانده نشده",
    priority: "پایین"
  },
];

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("customers");
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // فیلتر کردن مشتریان بر اساس جستجو
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  // فیلتر کردن پیام‌ها بر اساس جستجو
  const filteredMessages = messages.filter((message) =>
    message.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // آمار کلی
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === "فعال").length;
  const vipCustomers = customers.filter(c => c.status === "ویژه").length;
  const unreadMessages = messages.filter(m => m.status === "خوانده نشده").length;

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  return (
    <div className="bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] min-h-screen p-4 md:p-8" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b] flex items-center">
              <FiUsers className="ml-2 text-indigo-600" size={28} />
              مدیریت مشتریان و پیام‌ها
            </h1>
            <p className="text-[#64748b] mt-2">مدیریت ارتباط با مشتریان و پیام‌های دریافتی</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2 space-x-reverse">
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => setShowCustomerModal(true)}
            >
              <FiPlus className="ml-2" />
              افزودن مشتری
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

          <div className="bg-white p-5 rounded-2xl shadow-sm border-t-4 border-yellow-500">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-gray-500 text-sm font-medium">مشتریان ویژه</h4>
                <p className="text-2xl font-bold text-gray-800 mt-1">{vipCustomers}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiUsers className="text-yellow-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border-t-4 border-red-500">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-gray-500 text-sm font-medium">پیام‌های خوانده نشده</h4>
                <p className="text-2xl font-bold text-gray-800 mt-1">{unreadMessages}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <FiMessageSquare className="text-red-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 ${activeTab === 'customers' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('customers')}
          >
            مشتریان
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 ${activeTab === 'messages' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('messages')}
          >
            پیام‌ها
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm pr-10 pl-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="جستجوی مشتریان یا پیام‌ها..."
            />
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              فیلترها
              <FiChevronDown className="mr-2" />
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
              اعمال فیلتر
            </button>
          </div>
        </div>

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام مشتری</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اطلاعات تماس</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تعداد خریدها</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                            {customer.name.charAt(0)}
                          </div>
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500">عضویت: {customer.joinDate}</div>
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
                          {customer.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiShoppingBag className="ml-2 text-gray-400" />
                          <span className="text-sm font-medium">{customer.purchases} خرید</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          customer.status === "فعال" 
                            ? "bg-green-100 text-green-800" 
                            : customer.status === "ویژه" 
                              ? "bg-purple-100 text-purple-800" 
                              : "bg-gray-100 text-gray-800"
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2 space-x-reverse">
                          <button 
                            onClick={() => handleCustomerClick(customer)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="مشاهده جزئیات"
                          >
                            <FiEye size={18} />
                          </button>
                          <button 
                            className="text-yellow-600 hover:text-yellow-900"
                            title="ویرایش"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            title="حذف"
                          >
                            <FiTrash2 size={18} />
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

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مشتری</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">پیام</th>
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

      {/* Customer Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedCustomer ? 'جزئیات مشتری' : 'افزودن مشتری جدید'}
                </h3>
                <button 
                  onClick={() => setShowCustomerModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              
              {/* Customer Form/Details */}
              <div className="space-y-4">
                {selectedCustomer ? (
                  <>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-2xl">
                        {selectedCustomer.name.charAt(0)}
                      </div>
                      <div className="mr-4">
                        <h4 className="text-lg font-bold">{selectedCustomer.name}</h4>
                        <p className="text-gray-500">عضویت: {selectedCustomer.joinDate}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-700 mb-2">اطلاعات تماس</h5>
                        <p className="text-gray-600"><span className="font-medium">ایمیل:</span> {selectedCustomer.email}</p>
                        <p className="text-gray-600 mt-1"><span className="font-medium">تلفن:</span> {selectedCustomer.phone}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-700 mb-2">اطلاعات خرید</h5>
                        <p className="text-gray-600"><span className="font-medium">تعداد خریدها:</span> {selectedCustomer.purchases}</p>
                        <p className="text-gray-600 mt-1"><span className="font-medium">وضعیت:</span> 
                          <span className={`px-2 py-1 rounded-full text-xs mr-2 ${
                            selectedCustomer.status === "فعال" 
                              ? "bg-green-100 text-green-800" 
                              : selectedCustomer.status === "ویژه" 
                                ? "bg-purple-100 text-purple-800" 
                                : "bg-gray-100 text-gray-800"
                          }`}>
                            {selectedCustomer.status}
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 space-x-reverse pt-4">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        ویرایش اطلاعات
                      </button>
                      <button 
                        onClick={() => setShowCustomerModal(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        بستن
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">نام کامل</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                        <input type="email" className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">تلفن</label>
                        <input type="tel" className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">وضعیت</label>
                        <select className="w-full p-2 border border-gray-300 rounded-lg">
                          <option>فعال</option>
                          <option>ویژه</option>
                          <option>غیرفعال</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 space-x-reverse pt-4">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        ذخیره مشتری
                      </button>
                      <button 
                        onClick={() => setShowCustomerModal(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        انصراف
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="text-xl font-bold text-gray-800">پاسخ به پیام</h3>
                <button 
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              
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
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-2">پیام مشتری:</h5>
                  <p className="text-gray-800">{selectedMessage.message}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">پاسخ شما:</label>
                  <textarea 
                    rows={4} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="پاسخ خود را اینجا بنویسید..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3 space-x-reverse">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    ارسال پاسخ
                  </button>
                  <button 
                    onClick={() => setShowMessageModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    بستن
                  </button>
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