import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiChevronLeft, FiShoppingCart, FiHeart, FiShare2, FiClock, FiCheckCircle } from "react-icons/fi";
import IMG from "../assets/img.jpg";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

interface User {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  specifications: Record<string, string>;
  category: string;
  subcategory: string;
  images: string[];
  rating: number;
  reviewCount: number;
  sellers: Seller[];
}

interface Seller {
  seller_id: number;
  id: number;
  shop_name: string;
  phone: string;
  address: string;
  description: string;
  price: number;
  stock: number;
  delivery_time: string;
  rating?: number;
  logo?: string;
  discount?: number;
  product_id: number;
}

interface Comment {
  id: number;
  user: User;
  text: string;
  created_at: string;
  updated_at: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();

  const [user, setUser] = useState<User | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [stores, setStores] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "comments">("description");
  const [notification, setNotification] = useState<{show: boolean, message: string}>({show: false, message: ''});
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  const token = localStorage.getItem("access_token");

    useEffect(() => {
      const fetchUserData = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.warn("No access token found in localStorage");
          return;
        }

        try {
          const response = await fetch("http://localhost:8000/api/users/profile/", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            const errText = await response.text();
            console.error("Failed to fetch user data:", errText);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id || isNaN(parseInt(id))) {
          throw new Error("شناسه محصول نامعتبر است");
        }

        const productId = parseInt(id);
        const headers = {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        };

        const [productResponse, sellersResponse, commentsResponse] = await Promise.all([
          fetch(`http://localhost:8000/api/products/${productId}/`, { headers }),
          fetch(`http://localhost:8000/api/products/${productId}/sellers/`, { headers }),
          fetch(`http://localhost:8000/api/products/${productId}/comments/`, { headers })
        ]);

        if (!productResponse.ok) {
          throw new Error("خطا در دریافت اطلاعات محصول");
        }

        if (!sellersResponse.ok) {
          throw new Error("خطا در دریافت لیست فروشندگان");
        }

        const productData = await productResponse.json();
        const sellersData = await sellersResponse.json();

        let commentsData = [];
        if (commentsResponse.ok) {
          commentsData = await commentsResponse.json();
        }

        setProduct({
          ...productData,
          sellers: sellersData
        });
        setStores(sellersData);
        setComments(commentsData);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError(err instanceof Error ? err.message : "خطا در دریافت اطلاعات محصول");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, token]);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({show: false, message: ''});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const handleAddToCart = (seller: Seller) => {
    if (!product) return;

    if (isInCart(seller.product_id, seller.seller_id)) {
      toast.info("این محصول قبلاً در سبد خرید شما ثبت شده است", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (seller.stock <= 0) {
      toast.error("موجودی این محصول کافی نیست", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    addToCart({
      productId: seller.product_id,
      sellerId: seller.seller_id,
      name: product.name,
      price: seller.price,
      image: product.images?.[0] || IMG,
      storeName: seller.shop_name,
      deliveryTime: seller.delivery_time || "۲ تا ۳ روز کاری",
      stock: seller.stock
    });

    setNotification({
      show: true,
      message: `${product.name} از ${seller.shop_name} به سبد خرید اضافه شد`
    });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !product || !user) {
      toast.error("لطفاً نظر خود را وارد کنید");
      return;
    }

    try {
      setCommentLoading(true);
      if (!token) {
        throw new Error("لطفاً ابتدا وارد حساب خود شوید");
      }

      const response = await fetch(`http://localhost:8000/api/products/${product.id}/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newComment }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || "خطا در ثبت نظر");
      }

      const data = await response.json();
      const createdAt = new Date().toISOString();

      setComments([{
        ...data,
        created_at: createdAt, // اضافه کن تاریخ استاندارد فعلی
        user: {
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name
        }
      }, ...comments]);

      setNewComment('');
      toast.success('نظر شما با موفقیت ثبت شد');
    } catch (err) {
      console.error('Error posting comment:', err);
      toast.error(err instanceof Error ? err.message : 'خطا در ثبت نظر');
    } finally {
      setCommentLoading(false);
    }
  };
  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("آیا از حذف این نظر مطمئن هستید؟")) return;

    try {
      if (!token) {
        throw new Error("لطفاً ابتدا وارد حساب خود شوید");
      }

      const response = await fetch(`http://localhost:8000/api/comments/${commentId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        setComments(comments.filter(comment => comment.id !== commentId));
        toast.success('نظر با موفقیت حذف شد');
      } else if (response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'نظر یافت نشد یا شما مجاز به حذف آن نیستید');
      } else {
        throw new Error("خطا در حذف نظر");
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
      toast.error(err instanceof Error ? err.message : 'خطا در حذف نظر');
    }
  };  const renderStars = (rating: number = 0) => {
    return [...Array(5)].map((_, i) => (
        <FiStar
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
    ));
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <LoadingSpinner size="lg" />
        </div>
    );
  }

  if (error) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center min-h-screen bg-gray-50"
        >
          <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-[#00296B] mb-4">{error}</h2>
            <button
                onClick={() => navigate(-1)}
                className="bg-[#00296B] hover:bg-[#001F54] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center mx-auto"
            >
              <FiChevronLeft className="ml-1" />
              بازگشت به صفحه قبل
            </button>
          </div>
        </motion.div>
    );
  }

  if (!product) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center min-h-screen bg-gray-50"
        >
          <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-[#00296B] mb-4">محصول یافت نشد</h2>
            <button
                onClick={() => navigate(-1)}
                className="bg-[#00296B] hover:bg-[#001F54] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center mx-auto"
            >
              <FiChevronLeft className="ml-1" />
              بازگشت به صفحه قبل
            </button>
          </div>
        </motion.div>
    );
  }

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 min-h-screen"
          style={{ direction: "rtl" }}
      >
        <AnimatePresence>
          {notification.show && (
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
              >
                <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
                  <FiCheckCircle className="ml-2" />
                  {notification.message}
                </div>
              </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
              <button
                  onClick={() => navigate("/")}
                  className="hover:text-[#00296B] transition-colors flex items-center"
              >
                <span>خانه</span>
              </button>
              <span className="mx-2 text-gray-400">/</span>
              <button
                  onClick={() => navigate("/shopping-cart")}
                  className="hover:text-[#00296B] transition-colors flex items-center"
              >
                <span>سبد خرید</span>
              </button>
              <span className="mx-2 text-gray-400">/</span>
              <button
                  onClick={() => navigate(`/subcategory-products/${encodeURIComponent(product.subcategory)}`)}
                  className="hover:text-[#00296B] transition-colors"
              >
                {product.subcategory}
              </button>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-[#00296B] font-medium truncate max-w-xs">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 p-6">
                <div className="relative bg-gray-100 rounded-lg flex items-center justify-center h-96 mb-4 overflow-hidden">
                  <motion.img
                      key={selectedImage}
                      src={product.images?.[selectedImage] || IMG}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = IMG;
                      }}
                  />

                  <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`absolute top-4 left-4 p-2 rounded-full ${isFavorite ? 'bg-red-100 text-red-500' : 'bg-white text-gray-400'} shadow-md hover:shadow-lg transition-all`}
                  >
                    <FiHeart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {product.images && product.images.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {product.images.map((img, index) => (
                          <button
                              key={index}
                              onClick={() => setSelectedImage(index)}
                              className={`flex-shrink-0 w-16 h-16 border-2 rounded-md overflow-hidden ${selectedImage === index ? 'border-[#00296B]' : 'border-transparent'}`}
                          >
                            <img
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = IMG;
                                }}
                            />
                          </button>
                      ))}
                    </div>
                )}
              </div>

              <div className="w-full lg:w-1/2 p-6 border-t lg:border-t-0 lg:border-r border-gray-100">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-2">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviewCount || 0} نظر)</span>
                </div>

                <div className="mb-6">
                  <div className="flex items-center text-green-600 mb-2">
                    <FiCheckCircle className="ml-1" />
                    <span className="text-sm font-medium">
                    {product.sellers.some(s => s.stock > 0) ? "موجود در انبار" : "ناموجود"}
                  </span>
                  </div>
                  <p className="text-gray-600 text-sm">{product.description || "این محصول با کیفیت بالا و گارانتی اصالت کالا عرضه می‌شود."}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">محدوده قیمت</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">از</span>
                    <div className="text-left">
                    <span className="text-lg font-bold text-[#00296B]">
                      {formatPrice(Math.min(...product.sellers.map(s => s.price)))}
                    </span>
                      <span className="text-sm text-gray-500 mr-1">تومان</span>
                    </div>
                    <span className="text-gray-500 text-sm">تا</span>
                    <div className="text-left">
                    <span className="text-lg font-bold text-[#00296B]">
                      {formatPrice(Math.max(...product.sellers.map(s => s.price)))}
                    </span>
                      <span className="text-sm text-gray-500 mr-1">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                    onClick={() => setActiveTab("description")}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "description" ? 'border-[#00296B] text-[#00296B]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  توضیحات محصول
                </button>
                <button
                    onClick={() => setActiveTab("comments")}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "comments" ? 'border-[#00296B] text-[#00296B]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  نظرات کاربران ({comments.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                  {activeTab === "description" && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">توضیحات کامل محصول</h3>
                        <p className="text-gray-600 leading-relaxed">
                          {product.description || "این محصول با کیفیت بالا و مطابق با استانداردهای بین‌المللی تولید شده است. دارای گارانتی اصالت و سلامت فیزیکی کالا می‌باشد. طراحی ارگونومیک و کاربرپسند این محصول، تجربه‌ای لذت‌بخش را برای شما به ارمغان می‌آورد."}
                        </p>
                      </div>
                  )}

                  {activeTab === "comments" && (
                      <div className="space-y-6">
                        {user && (
                            <div className="bg-white p-6 rounded-lg shadow">
                              <h3 className="text-lg font-semibold mb-4">ثبت نظر جدید</h3>
                              <form onSubmit={handleCommentSubmit}>
                          <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              rows={4}
                              placeholder="نظر خود را در مورد این محصول بنویسید..."
                              disabled={commentLoading}
                              maxLength={500}
                          />
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-xs text-gray-500">{newComment.length}/500 کاراکتر</span>
                                  <button
                                      type="submit"
                                      disabled={!newComment.trim() || commentLoading}
                                      className="mt-3 bg-[#00296B] text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
                                  >
                                    {commentLoading ? 'در حال ارسال...' : 'ثبت نظر'}
                                  </button>
                                </div>
                              </form>
                            </div>
                        )}

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">نظرات کاربران ({comments.length})</h3>

                          {comments.length === 0 ? (
                              <p className="text-gray-500">هنوز نظری ثبت نشده است.</p>
                          ) : (
                              comments.map((comment) => (
                                  <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
                                    <div className="flex justify-between items-start">
                                      <div className="flex items-center mb-2">
                                        <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 font-bold">
                                          {comment.user.first_name?.[0] || comment.user.username[0]}
                                        </div>
                                        <div className="mr-3">
                                          <h4 className="font-medium">
                                            {comment.user.first_name && comment.user.last_name
                                                ? `${comment.user.first_name} ${comment.user.last_name}`
                                                : comment.user.username}
                                          </h4>
                                          <p className="text-xs text-gray-500">
                                            {new Date(comment.created_at).toLocaleDateString('fa-IR')}
                                          </p>
                                        </div>
                                      </div>

                                      {user && user.id === comment.user.id && (
                                          <button
                                              onClick={() => handleDeleteComment(comment.id)}
                                              className="text-red-500 hover:text-red-700 text-sm"
                                          >
                                            حذف
                                          </button>
                                      )}
                                    </div>

                                    <p className="text-gray-700 mt-2">{comment.text}</p>
                                  </div>
                              ))
                          )}
                        </div>
                      </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                فروشگاه‌های عرضه‌کننده این محصول
              </h2>
              <p className="text-sm text-gray-500 mt-1">بهترین قیمت‌ها از معتبرترین فروشگاه‌ها</p>
            </div>

            <div className="divide-y divide-gray-200">
              {product.sellers.map((seller) => (
                  <motion.div
                      key={`${product.id}-${seller.seller_id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center flex-1">
                        <img
                            src={seller.logo || IMG}
                            alt={seller.shop_name}
                            className="w-16 h-16 object-contain rounded-lg border border-gray-200 ml-4"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = IMG;
                            }}
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{seller.shop_name}</h3>
                          <div className="flex items-center mt-1">
                            {renderStars(seller.rating || 4)}
                            <span className="text-xs text-gray-500 mr-1">({Math.floor(Math.random() * 50) + 10})</span>
                          </div>
                          <div className={`flex items-center text-xs mt-1 ${seller.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {seller.stock > 0
                                ? `${seller.stock} عدد در انبار موجود است`
                                : 'موجود نیست - به زودی'}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <FiClock className="ml-1" />
                            <span>تحویل: {seller.delivery_time || "۲ تا ۳ روز کاری"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                        <div className="text-center">
                          {seller.discount && seller.discount > 0 && (
                              <div className="text-xs text-gray-500 line-through mb-1">
                                {formatPrice(seller.price + (seller.price * seller.discount / 100))} تومان
                              </div>
                          )}
                          <div className="text-lg font-bold text-[#00296B]">
                            {formatPrice(seller.price)} تومان
                          </div>
                          {seller.discount && seller.discount > 0 && (
                              <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full mt-1">
                                {seller.discount}% تخفیف
                              </div>
                          )}
                        </div>
                        <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(seller);
                            }}
                            className={`w-[200px] px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                                seller.stock > 0
                                    ? isInCart(seller.product_id, seller.seller_id)
                                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        : 'bg-[#00296B] hover:bg-blue-900 text-white'
                                    : 'bg-red-100 text-red-800 cursor-not-allowed'
                            }`}
                            disabled={seller.stock <= 0 || isInCart(seller.product_id, seller.seller_id)}
                        >
                          <FiShoppingCart className="ml-2" />
                          {seller.stock > 0
                              ? isInCart(seller.product_id, seller.seller_id)
                                  ? 'اضافه شده به سبد'
                                  : 'افزودن به سبد'
                              : 'ناموجود'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
  );
};

export default ProductDetail;