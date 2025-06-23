import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line
} from "recharts";
import { 
  FiTrendingUp,
  FiAward, FiUsers, FiShoppingBag, FiActivity, FiBarChart2
} from "react-icons/fi";
import { BsBoxSeam, BsGraphUpArrow } from "react-icons/bs";
import { MdOutlineAttachMoney, MdOutlineInventory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getOrders} from '../../api/orders';
import { toast } from "react-toastify";




interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
    image?: string;
    stock: number;
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


interface Product {
    id: number;
    name: string;
    category: string;
    subcategory: string;
    price: number;
    stock: number;
}

const monthlySalesData = [
  { name: "فروردین", فروش: 4200, مشتریان: 120, سفارشات: 85 },
  { name: "اردیبهشت", فروش: 3800, مشتریان: 110, سفارشات: 78 },
  { name: "خرداد", فروش: 2900, مشتریان: 95, سفارشات: 65 },
  { name: "تیر", فروش: 3100, مشتریان: 105, سفارشات: 72 },
  { name: "مرداد", فروش: 4500, مشتریان: 130, سفارشات: 90 },
  { name: "شهریور", فروش: 5200, مشتریان: 150, سفارشات: 105 },
];



const topProductsData = [
  { name: "لپ‌تاپ ایسوس", فروش: 1800, سهم: 28 },
  { name: "هدفون بلوتوث", فروش: 1200, سهم: 19 },
  { name: "کتاب React", فروش: 900, سهم: 14 },
  { name: "ماوس گیمینگ", فروش: 750, سهم: 12 },
  { name: "کیبورد مکانیکی", فروش: 600, سهم: 9 },
  { name: "سایر", فروش: 1250, سهم: 18 },
];

const trafficSources = [
  { name: "مستقیم", value: 35 },
  { name: "جستجو", value: 25 },
  { name: "شبکه‌های اجتماعی", value: 20 },
  { name: "تبلیغات", value: 15 },
  { name: "سایر", value: 5 },
];


const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6", "#3B82F6"];

const ProfessionalDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);  
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const newsales = orders.filter((o)=> o.status === 'completed');
  const totalSales = newsales.reduce((sum , item)=> sum + item.total_price , 0);
  const totalstock = products.reduce((sum , item)=> sum + item.stock , 0);
  const lastMonthSales = orders[newsales.length - 1]?.total_price;
  const prevMonthSales = orders[newsales.length - 2]?.total_price;
  const growthRate = ((lastMonthSales / prevMonthSales) * 100).toFixed(1);
  const token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  var totalusers = [];
  var res_res = 0;



  const handlenav = () => {
    navigate("/seller-dashboard/orders");
    
  };

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


    for (let i = 0; i < orders.length ; i++) {
      var res = orders.map((o)=> o.user.id);
      for (let j = 0; j < res.length ; j++) {
        if(totalusers.length === 0){
          totalusers.push(res[0]);
        }
        if(res[j] !== res[i]){
          totalusers.push(res[j]);
        }
      }
      res_res = totalusers.length;
    }



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };


  const refreshAccessToken = async () => {
      if (!refresh_token) {
          console.error("توکن refresh یافت نشد.");
          return null;
      }
      const response = await fetch("http://localhost:8000/api/token/refresh/", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refresh_token }),
      });
      if (response.ok) {
          const data = await response.json();
          const newAccessToken = data.access_token;
          localStorage.setItem("access_token", newAccessToken);
          return newAccessToken;
      } else {
          console.error("خطا در تمدید توکن.");
          return null;
      }
  };

  const fetchProducts = async () => {
      setLoading(true);
      try {
          let currentToken = token;
          if (!currentToken) {
              currentToken = await refreshAccessToken();
          }
          if (!currentToken) {
              console.error("توکن معتبر یافت نشد.");
              return;
          }
          const response = await fetch("http://localhost:8000/api/products/", {
              headers: {
                  Authorization: `Bearer ${currentToken}`,
              },
          });
          if (response.ok) {
              const data = await response.json();
              if (Array.isArray(data)) {
                  setProducts(data);
              } else {
                  console.error("خطا: داده دریافتی آرایه نیست", data);
                  setProducts([]);
              }
          } else {
              const error = await response.json();
              console.error(`خطا در واکشی محصولات: ${error.detail || response.statusText}`);
              setProducts([]);
          }
      } catch (err) {
          console.error("خطا در ارتباط با سرور:", err);
          setProducts([]);
      } finally {
          setLoading(false); 
      }
  };

  useEffect(() => {
      fetchProducts();
  }, []);


  console.log(products);


  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">داشبورد مدیریتی</h1>
            <p className="text-gray-500 mt-2">خلاصه عملکرد و آمار کلی کسب‌وکار</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">فروش کل</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {totalSales.toLocaleString('fa-IR')}
                  <span className="text-sm font-normal text-gray-500 mr-1">تومان</span>
                </h3>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <MdOutlineAttachMoney className="text-indigo-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm flex items-center ${parseFloat(growthRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {parseFloat(growthRate) >= 0 ? (
                  <FiTrendingUp className="ml-1" />
                ) : (
                  <FiTrendingUp className="ml-1 transform rotate-180" />
                )}
                {(Math.abs(parseFloat(growthRate))).toLocaleString('fa-IR')}%
              </span>
              <span className="text-gray-500 text-sm mr-1">نسبت به خرید های قبل</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">مشتریان</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {res_res.toLocaleString('fa-IR')}
                  <span className="text-sm font-normal text-gray-500 mr-1">نفر</span>
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiUsers className="text-green-600" size={24} />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-green-500" 
                  style={{ width: `${(orders[orders?.length - 1]?. user.id / 200 * 100)}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                {((orders[orders?.length - 1]?.user.id / 200) * 100).toLocaleString('fa-IR')}% از هدف ماهانه
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">سفارشات</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {orders.length.toLocaleString('fa-IR')}
                  <span className="text-sm font-normal text-gray-500 mr-1">سفارش</span>
                </h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiShoppingBag className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={monthlySalesData}>
                  <Area 
                    type="monotone" 
                    dataKey="سفارشات" 
                    stroke="#3B82F6" 
                    fill="#93C5FD" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">موجودی انبار</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {totalstock.toLocaleString('fa-IR')}
                  <span className="text-sm font-normal text-gray-500 mr-1">محصول</span>
                  
                </h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <MdOutlineInventory className="text-purple-600" size={24} />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <span className="text-green-600 flex items-center">
                  <BsGraphUpArrow className="ml-1" />
                  ۸ محصول جدید
                </span>
                <span className="text-gray-500 mr-2">در ۷ روز گذشته</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <FiActivity className="ml-2 text-indigo-600" size={20} />
                عملکرد فروش ماهانه
              </h2>
              <div className="mt-3 sm:mt-0 flex space-x-2 space-x-reverse">
                <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg">۶ ماهه</button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg">سالانه</button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySalesData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      textAlign: 'right'
                    }}
                    formatter={(value) => [`${value} تومان`, "مبلغ فروش"]}
                  />
                  <Legend />
                  <Bar 
                    dataKey="فروش" 
                    fill="#6366F1" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center mb-6">
              <FiAward className="ml-2 text-purple-600" size={20} />
              محصولات پرفروش
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topProductsData}
                    dataKey="فروش"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={50}
                    paddingAngle={2}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toLocaleString('fa-IR')}%`}
                    labelLine={false}
                  >
                    {topProductsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} تومان`, "مبلغ فروش"]}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      textAlign: 'right'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center mb-6">
              <FiBarChart2 className="ml-2 text-green-600" size={20} />
              منابع ترافیک
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSources}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toLocaleString('fa-Ir')}%`}
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "سهم ترافیک"]}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      textAlign: 'right'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center mb-6">
              <BsGraphUpArrow className="ml-2 text-blue-600" size={20} />
              روند فروش و مشتریان
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySalesData}>
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      textAlign: 'right'
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="فروش"
                    stroke="#6366F1"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="فروش (هزار تومان)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="مشتریان"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="مشتریان (نفر)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center mb-6">
            <BsBoxSeam className="ml-2 text-orange-500" size={20} />
            سفارشات اخیر
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">شماره سفارش</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مشتری</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مبلغ</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
                </tr>
              </thead>  
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((orders, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{orders.id.toLocaleString('fa-IR')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{orders.user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(orders.created_at)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{orders.total_price.toLocaleString('fa-IR')} تومان</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        orders.status === "completed" ? "bg-green-100 text-green-800" :
                        orders.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        orders.status === "cancelled" ? "bg-red-100 text-red-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                      {orders.status === "pending" && (
                        <span>
                          در حال پردازش
                        </span>
                      )}
                      {orders.status === "completed" && (
                        <span>
                          تحویل داده شده
                        </span>
                      )}
                      {orders.status === "cancelled" && (
                        <span>
                          لغو شده
                        </span>
                      )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium" onClick={handlenav}>
              مشاهده همه سفارشات →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;