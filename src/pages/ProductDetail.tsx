import React from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    price: number;
    brand: string;
    category: string;
    subcategory: string;
    image: string;
    rating: number;
    description: string;
    features: string[];
}

interface Store {
    id: number;
    name: string;
    price: number;
    stock: number;
    deliveryTime: string;
    rating: number;
    logo: string;
}

const mockProducts: Product[] = [
    {
        id: 1,
        name: "یخچال ساید بای ساید سامسونگ 25 فوت",
        price: 25000000,
        brand: "سامسونگ",
        category: "لوازم خانگی",
        subcategory: "یخچال",
        image: "https://example.com/fridge1.jpg",
        rating: 4.5,
        description: "یخچال ساید بای ساید سامسونگ با ظرفیت 25 فوت، دارای سیستم خنک‌کننده Twin Cooling Plus، نمایشگر دیجیتال، آبسردکن و یخساز اتوماتیک",
        features: [
            "ظرفیت 725 لیتر",
            "مصرف انرژی A++",
            "سیستم No Frost",
            "دارای فیلتر ضد باکتری",
            "گارانتی 2 ساله"
        ]
    },
];

const mockStores: Record<number, Store[]> = {
    1: [
        {
            id: 1,
            name: "دیجی‌کالا",
            price: 24800000,
            stock: 5,
            deliveryTime: "2 روز کاری",
            rating: 4.8,
            logo: "https://example.com/digikala-logo.jpg"
        },
        {
            id: 2,
            name: "بازارگاه",
            price: 25500000,
            stock: 3,
            deliveryTime: "3 روز کاری",
            rating: 4.5,
            logo: "https://example.com/bazargah-logo.jpg"
        },
        {
            id: 3,
            name: "مایکرو",
            price: 24900000,
            stock: 2,
            deliveryTime: "1 روز کاری",
            rating: 4.6,
            logo: "https://example.com/microro-logo.jpg"
        },
    ],
};

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const productId = parseInt(id || "0");

    const product = mockProducts.find(p => p.id === productId);
    const stores = mockStores[productId] || [];

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#E5E5E5]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#00509D] mb-4">محصول یافت نشد</h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-[#00509D] hover:bg-[#003F7D] text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                        بازگشت به صفحه قبل
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#E5E5E5] min-h-screen" style={{ direction: "rtl" }}>
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-600 mb-6">
                    <span
                        className="cursor-pointer hover:text-[#00509D]"
                        onClick={() => navigate("/")}
                    >
                        خانه
                    </span>
                    <span className="mx-2">/</span>
                    <span
                        className="cursor-pointer hover:text-[#00509D]"
                        onClick={() => navigate(`/category/${product.category}`)}
                    >
                        {product.category}
                    </span>
                    <span className="mx-2">/</span>
                    <span
                        className="cursor-pointer hover:text-[#00509D]"
                        onClick={() => navigate(`/subcategory/${product.subcategory}`)}
                    >
                        {product.subcategory}
                    </span>
                    <span className="mx-2">/</span>
                    <span className="text-[#00509D] font-medium">{product.name}</span>
                </div>

                {/* Product Main Info */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Product Image */}
                        <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-100 rounded-lg flex items-center justify-center p-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-80 object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x300?text=Product+Image";
                                }}
                            />
                        </div>

                        {/* Product Details */}
                        <div className="w-full md:w-2/3 lg:w-3/4">
                            <h1 className="text-2xl font-bold text-[#00296B] mb-2">{product.name}</h1>
                            <div className="flex items-center mb-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-[#FDC500]" : "text-gray-300"}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600 mr-2">({product.rating})</span>
                                <span className="text-sm text-gray-600">| برند: {product.brand}</span>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-[#00509D] mb-2">ویژگی‌های محصول</h2>
                                <ul className="list-disc pr-5 space-y-1">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="text-gray-700">{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-[#F8F9FA] p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-[#00509D] mb-2">توضیحات محصول</h2>
                                <p className="text-gray-700">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stores Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-[#00296B] mb-6 border-b border-[#00509D] pb-2">
                        فروشگاه‌های عرضه‌کننده این محصول
                    </h2>

                    {stores.length > 0 ? (
                        <div className="space-y-4">
                            {stores.map(store => (
                                <div key={store.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-4">
                                    <div className="flex items-center mb-3 sm:mb-0">
                                        <img
                                            src={store.logo}
                                            alt={store.name}
                                            className="w-12 h-12 object-contain rounded-full border border-gray-200 mr-3"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/50x50?text=Store";
                                            }}
                                        />
                                        <div>
                                            <h3 className="font-semibold text-[#00509D]">{store.name}</h3>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`w-3 h-3 ${i < Math.floor(store.rating) ? "text-[#FDC500]" : "text-gray-300"}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="mr-1">({store.rating})</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                                        <div className="text-center sm:text-right">
                                            <div className="text-lg font-bold text-[#00296B]">{formatPrice(store.price)} تومان</div>
                                            <div className="text-sm text-gray-600">
                                                {store.stock > 0 ? (
                                                    <span className="text-green-600">موجود در انبار ({store.stock} عدد)</span>
                                                ) : (
                                                    <span className="text-red-600">ناموجود</span>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500">تحویل: {store.deliveryTime}</div>
                                        </div>

                                        <button
                                            className={`px-4 py-2 rounded-lg font-medium ${store.stock > 0 ? 'bg-[#FDC500] hover:bg-[#FFD700] text-black' : 'bg-gray-300 cursor-not-allowed text-gray-600'}`}
                                            disabled={store.stock <= 0}
                                        >
                                            {store.stock > 0 ? 'افزودن به سبد خرید' : 'ناموجود'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <h3 className="text-lg font-medium text-[#00509D] mb-2">هیچ فروشگاهی برای این محصول یافت نشد</h3>
                            <p className="text-gray-600 mb-4">متاسفانه در حال حاضر این محصول در هیچ فروشگاهی موجود نمی‌باشد</p>
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-[#00509D] hover:bg-[#003F7D] text-white px-4 py-2 rounded font-medium transition-colors"
                            >
                                بازگشت به صفحه قبل
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;