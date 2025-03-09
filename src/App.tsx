import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";

const App: React.FC = () => {
    const [user, setUser] = useState<string | null>(localStorage.getItem("user"));

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home user={user} setUser={setUser} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/subcategory/:id" element={<SubCategoryPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;
