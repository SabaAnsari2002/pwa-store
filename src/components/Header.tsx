import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CategoryMenu from "../pages/CategoryMenu";

const Header: React.FC = () => {
	const [user, setUser] = useState<string | null>(null);
	const [isSeller, setIsSeller] = useState<boolean>(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const navigate = useNavigate();
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const savedUser = localStorage.getItem("user");
		const sellerStatus = localStorage.getItem("isSeller") === "true";

		if (savedUser) setUser(savedUser);
		if (sellerStatus) setIsSeller(true);

		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("isSeller");
		setUser(null);
		setIsSeller(false);
		navigate("/");
	};

	const handleSellerLogout = () => {
		localStorage.removeItem("isSeller");
		setIsSeller(false);
		setDropdownOpen(false);
	};

	const goToProfile = () => {
		setDropdownOpen(false);
		navigate("/customer-dashboard");
	};

	const goToSellerRegister = () => {
		setDropdownOpen(false);
		navigate("/seller-register");
	};

	const goToSellerLogin = () => {
		setDropdownOpen(false);
		navigate("/seller-login");
	};

	const goToSellerDashboard = () => {
		navigate("/seller-dashboard");
	};

	return (
		<header className="bg-[#00296B] text-white shadow fixed top-0 left-0 w-full z-10" style={{ direction: "rtl" }}>
			<div className="container mx-auto py-3 px-4 flex flex-col md:flex-row items-center justify-between">
				<a href="/" className="text-3xl font-bold text-[#FDC500]">اسم پروژه بیچارم</a>

				<input
					type="search"
					placeholder="جستجو..."
					className="mt-2 md:mt-0 border border-[#FDC500] rounded-md px-3 py-1 text-black w-full md:w-1/3 text-right"
				/>

				<div className="flex items-center gap-4 mt-2 md:mt-0 relative" ref={dropdownRef}>
					<a href="/cart" title="سبد خرید">
						<svg className="w-6 h-6 text-white hover:text-[#FDC500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
						</svg>
					</a>

					{isSeller && (
						<button
							className="bg-[#FDC500] text-black px-4 py-1 rounded hover:bg-yellow-400"
							onClick={goToSellerDashboard}
						>
							ورود به غرفه
						</button>
					)}

					{user ? (
						<button onClick={() => setDropdownOpen(!dropdownOpen)} title="پروفایل">
							<svg className="w-6 h-6 text-white hover:text-[#FDC500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
							</svg>
						</button>
					) : (
						<button
							className="bg-[#FDC500] text-black px-4 py-1 rounded hover:bg-yellow-400"
							onClick={() => navigate("/login")}
						>
							ورود / ثبت‌نام
						</button>
					)}

					{dropdownOpen && (
						<div className="absolute top-10 left-0 bg-white text-black shadow-md rounded-lg p-4 w-48 text-right z-50">
							<p className="mb-2 font-semibold text-sm truncate">{user}</p>
							<button onClick={goToProfile} className="block w-full text-right hover:text-[#00509D]">پروفایل</button>
							{isSeller ? (
								<button onClick={handleSellerLogout} className="block w-full text-right hover:text-[#00509D] mt-2">
									خروج از غرفه
								</button>
							) : (
								<>
									<button onClick={goToSellerRegister} className="block w-full text-right hover:text-[#00509D] mt-2">
										ایجاد غرفه
									</button>
									<button onClick={goToSellerLogin} className="block w-full text-right hover:text-[#00509D] mt-2">
										ورود فروشنده
									</button>
								</>
							)}
							<button onClick={handleLogout} className="block w-full text-right text-red-600 mt-2 hover:text-red-800">خروج</button>
						</div>
					)}
				</div>
			</div>

			<nav className="bg-[#00509D] py-2 mt-2">
				<div className="container mx-auto flex justify-center gap-6 text-white text-lg">
					<a href="/" className="hover:text-[#FDC500]">خانه</a>
					<a href="/about" className="hover:text-[#FDC500]">درباره ما</a>
					<a href="/shop" className="hover:text-[#FDC500]">فروشگاه</a>
					<a href="/pages" className="hover:text-[#FDC500]">دسته بندی‌ها</a>
					<CategoryMenu />
					<a href="/blog" className="hover:text-[#FDC500]">وبلاگ</a>
					<a href="/contact" className="hover:text-[#FDC500]">ارتباط با ما</a>
				</div>
			</nav>
		</header>
	);
};

export default Header;