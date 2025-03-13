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

            </Routes>
        </Router>
    );
};

export default App;
