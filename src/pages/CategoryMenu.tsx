import React, { useState } from "react";

const categories = [
    {
        name: "کالای دیجیتال",
        subcategories: ["موبایل", "لپ‌تاپ", "تبلت", "لوازم جانبی"],
    },
    {
        name: "پوشاک",
        subcategories: ["مردانه", "زنانه", "کودک", "اکسسوری"],
    },
    {
        name: "آرایشی و بهداشتی",
        subcategories: ["لوازم آرایشی", "مراقبت پوست", "مراقبت مو"],
    },
    {
        name: "خانه و آشپزخانه",
        subcategories: ["لوازم آشپزخانه", "دکوراسیون", "کالای خواب"],
    },
    {
        name: "کتاب و لوازم تحریر",
        subcategories: ["کتاب", "دفتر و کاغذ", "نوشت‌افزار"],
    },
];

const CategoryMenu: React.FC = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
        >
            <button className="flex items-center gap-1 hover:text-[#FDC500] transition-colors">
                دسته‌بندی‌ها
                <span className="inline-block transform rotate-90 text-sm">▶</span>
            </button>

            {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-[600px] bg-white text-black rounded-xl shadow-2xl z-30 p-6 grid grid-cols-2 gap-6 text-right">
                    {categories.map((cat, idx) => (
                        <div key={idx}>
                            <div className="font-semibold text-[#00296B] mb-2">{cat.name}</div>
                            <ul className="space-y-1 text-sm">
                                {cat.subcategories.map((sub, i) => (
                                    <li
                                        key={i}
                                        className="hover:text-[#FDC500] transition-colors cursor-pointer pr-2"
                                    >
                                        {sub}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryMenu;
