import React from "react";

const Header: React.FC = () => {
	return (
		<header className="bg-gray-400 text-white shadow fixed top-0 left-0 w-full z-10 rtl">
			<div className="container mx-auto py-2 px-4 md:px-6">
				{/* Top Row */}
				<div className="flex items-center justify-between mb-4">
					{/* Icons */}
					<div className="flex items-center space-x-4 order-1">
						<a href="/profile" aria-label="Profile">
							{/* Profile Icon */}
							<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</a>
						<a href="/cart" aria-label="Cart">
							{/* Cart Icon */}
							<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
							</svg>
						</a>
					</div>

					{/* Search Input */}
					<input
						type="search"
						placeholder="جستجو"
						className="border rounded-md px-2 py-1 text-black w-1/3 text-right order-2"
					/>

					{/* Logo */}
					<a href="/" className="text-2xl font-bold text-white order-3">
						سندیکا
					</a>
				</div>

				{/* Bottom Row - Navigation */}
				<nav className="flex justify-center space-x-4 lg:space-x-6">
					<a href="/contact" className="text-xl hover:text-purple-200">ارتباط با ما</a>
					<a href="/blog" className="text-xl hover:text-purple-200">وبلاگ</a>
					<a href="/pages" className="text-xl hover:text-purple-200">دسته بندی ها</a>
					<a href="/shop" className="text-xl hover:text-purple-200">فروشگاه</a>
					<a href="/about" className="text-xl hover:text-purple-200">درباره ما</a>
					<a href="/" className="text-xl hover:text-purple-200">خانه</a>
				</nav>


			</div>
		</header>
	);
};

export default Header;
