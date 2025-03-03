// src/components/Header.tsx
import React from "react";

const Header: React.FC = () => {
	return (
		<header className="bg-white shadow fixed top-0 left-0 w-full z-10 h-20">
			<div className="container mx-auto h-full py-2 px-4 md:px-6 flex items-center justify-between">
				{/* Actions */}
				<div className="flex items-center space-x-2 md:space-x-4 order-1">
					{/* Search Input (Hidden on Small Screens) */}
					<input
						type="search"
						placeholder="جستجو"
						className="border rounded-md px-2 py-1 hidden md:block"
					/>

					{/* Icons (Adjust as needed) */}
					<a href="/cart" aria-label="Cart">
						{/* Cart Icon */}
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							></path>
						</svg>
					</a>
					<a href="/profile" aria-label="Profile">
						{/* Profile Icon */}
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
					</a>
				</div>

				{/* Navigation */}
				<nav className="hidden md:flex space-x-4 lg:space-x-6 order-2">
					<a href="/contact" className="hover:text-kidify_secondary">
						ارتباط با ما
					</a>
					<a href="/blog" className="hover:text-kidify_secondary">
						وبلاگ
					</a>
					
					<a href="/pages" className="hover:text-kidify_secondary">
						دسته بندی ها
					</a>
					<a href="/shop" className="hover:text-kidify_secondary">
						فروشگاه
					</a>
					<a href="/about" className="hover:text-kidify_secondary">
						درباره ما
					</a>
					<a href="/" className="hover:text-kidify_secondary">
						خانه
					</a>
				</nav>

				{/* Logo */}
				<a href="/" className="text-2xl font-bold text-kidify_primary order-3">
				سندیکا
				</a>
			</div>
		</header>
	);
};

export default Header;
