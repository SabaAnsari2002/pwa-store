import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import SellerDashboard from "./pages/seller/SellerDashboard";
import DashboardContent from "./pages/seller/DashboardContent";
import ProductManagement from "./pages/seller/ProductManagement";
import OrderManagement from "./pages/seller/OrderManagement";
import FinancialManagement from "./pages/seller/FinancialManagement";
import CustomerManagement from "./pages/seller/CustomerManagement";
import DiscountManagement from "./pages/seller/DiscountManagement";
import ReportsAndAnalytics from "./pages/seller/ReportsAndAnalytics";
import Settings from "./pages/seller/Settings";
import TeamManagement from "./pages/seller/TeamManagement";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerDashboardContent from "./pages/customer/CustomerDashboardContent";
import AccountSettingsPageCustomer from "./pages/customer/AccountSettingsPage";
import AddressesPageCustomer from "./pages/customer/AddressesPage";
import CompareProductsPageCustomer from "./pages/customer/CompareProductsPage";
import DiscountPageCustomer from "./pages/customer/DiscountPage";
import LoyaltyPageCustomer from "./pages/customer/LoyaltyPage";
import NotificationsPageCustomer from  "./pages/customer/NotificationsPage";
import OrdersPageCustomer from "./pages/customer/OrdersPage";
import ReviewsPageCustomer from "./pages/customer/ReviewsPage";
import SupportPageCustomer from "./pages/customer/SupportPage";
import WalletPageCustomer from "./pages/customer/WalletPage";
import WishlistPageCustomer from "./pages/customer/WishlistPage";
const App: React.FC = () => {
    const [user, setUser] = useState<string | null>(localStorage.getItem("user"));

    return (
        <Router>
            <Routes>
                {/* مسیرهای اصلی */}
                <Route path="/" element={<Home user={user} setUser={setUser} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/subcategory/:id" element={<SubCategoryPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />

                {/* مسیرهای پنل کاربری */}
                <Route path="/cart" element={<CartPage />} />

                <Route path="/seller-dashboard" element={<SellerDashboard />}>
                    <Route index element={<DashboardContent />} />
                    <Route path="products" element={<ProductManagement />} />
                    <Route path="orders" element={<OrderManagement />} />
                    <Route path="financial" element={<FinancialManagement />} />
                    <Route path="customers" element={<CustomerManagement />} />
                    <Route path="discounts" element={<DiscountManagement />} />
                    <Route path="reports" element={<ReportsAndAnalytics />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="team" element={<TeamManagement />} />
                </Route>

                <Route path="/customer-dashboard" element={<CustomerDashboard />}>
                    <Route index element={<CustomerDashboardContent />} />
                    <Route path="orders" element={<OrdersPageCustomer />} />
                    <Route path="addresses" element={<AddressesPageCustomer />} />
                    <Route path="wallet" element={<WalletPageCustomer />} />
                    <Route path="account-setting" element={<AccountSettingsPageCustomer />} />
                    <Route path="discount" element={<DiscountPageCustomer />} />
                    <Route path="support" element={<SupportPageCustomer />} />
                    <Route path="wishlist" element={<WishlistPageCustomer />} />
                    <Route path="reviews" element={<ReviewsPageCustomer />} />
                    <Route path="notifications" element={<NotificationsPageCustomer />} />
                    <Route path="loyalty" element={<LoyaltyPageCustomer />} />
                    <Route path="compare-products" element={<CompareProductsPageCustomer />} />

                </Route>

            </Routes>
        </Router>
    );
};

export default App;
