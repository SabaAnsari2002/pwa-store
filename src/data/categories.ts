export interface Subcategory {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
}

export const categories: Category[] = [
    {
        id: 1,
        name: "لوازم خانگی",
        subcategories: [
            { id: 11, name: "یخچال" },
            { id: 12, name: "ماشین لباسشویی" },
            { id: 13, name: "ظرفشویی" },
            { id: 14, name: "اجاق گاز" },
        ],
    },
    {
        id: 2,
        name: "مد و پوشاک",
        subcategories: [
            { id: 21, name: "پیراهن" },
            { id: 22, name: "شلوار" },
            { id: 23, name: "کفش" },
            { id: 24, name: "اکسسوری" },
        ],
    },
    {
        id: 3,
        name: "دیجیتال",
        subcategories: [
            { id: 31, name: "موبایل" },
            { id: 32, name: "لپ تاپ" },
            { id: 33, name: "تبلت" },
            { id: 34, name: "ساعت هوشمند" },
        ],
    },
    {
        id: 4,
        name: "زیبایی و سلامت",
        subcategories: [
            { id: 41, name: "لوازم آرایشی" },
            { id: 42, name: "مراقبت پوست" },
            { id: 43, name: "عطر" },
            { id: 44, name: "مراقبت مو" },
        ],
    },
    {
        id: 5,
        name: "ورزش و سفر",
        subcategories: [
            { id: 51, name: "دوچرخه" },
            { id: 52, name: "چمدان" },
            { id: 53, name: "کفش ورزشی" },
            { id: 54, name: "تجهیزات کوهنوردی" },
        ],
    },
    {
        id: 6,
        name: "کتاب و لوازم تحریر",
        subcategories: [
            { id: 61, name: "کتاب داستان" },
            { id: 62, name: "کتاب آموزشی" },
            { id: 63, name: "دفتر" },
            { id: 64, name: "نوشت‌افزار" },
        ],
    },
    {
        id: 7,
        name: "کودک و نوزاد",
        subcategories: [
            { id: 71, name: "لباس کودک" },
            { id: 72, name: "اسباب بازی" },
            { id: 73, name: "لوازم بهداشتی" },
            { id: 74, name: "کالسکه" },
        ],
    },
    {
        id: 8,
        name: "ابزارآلات صنعتی",
        subcategories: [
            { id: 81, name: "دریل" },
            { id: 82, name: "پیچ گوشتی برقی" },
            { id: 83, name: "اره برقی" },
            { id: 84, name: "ابزار دستی" },
        ],
    },
    {
        id: 9,
        name: "خودرو و موتورسیکلت",
        subcategories: [
            { id: 91, name: "لوازم یدکی خودرو" },
            { id: 92, name: "موتورسیکلت" },
            { id: 93, name: "روغن و فیلتر" },
            { id: 94, name: "تجهیزات جانبی" },
        ],
    },
    {
        id: 10,
        name: "خوراک و نوشیدنی",
        subcategories: [
            { id: 101, name: "نوشیدنی‌ها" },
            { id: 102, name: "شیرینی و شکلات" },
            { id: 103, name: "میوه و سبزی" },
            { id: 104, name: "محصولات لبنی" },
        ],
    },
];
