import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Dashboard from "./pages/Dashboard";
import OrdersPage from "./pages/OrdersPage";
import AddressesPage from "./pages/AddressesPage";
import WishlistPage from "./pages/WishlistPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
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
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/addresses" element={<AddressesPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/account-settings" element={<AccountSettingsPage />} />
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

            </Routes>
        </Router>
    );
};

export default App;
