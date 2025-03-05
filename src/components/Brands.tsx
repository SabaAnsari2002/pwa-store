import React from 'react';

const Brands: React.FC = () => {
    const brands = [
        { id: 1, name: 'برند ۱', image: 'https://hirsagol.com/wp-content/uploads/2019/03/red-rose.jpg', link: '#' },
        { id: 2, name: 'برند ۲', image: 'https://hirsagol.com/wp-content/uploads/2019/03/red-rose.jpg', link: '#' },
        { id: 3, name: 'برند ۳', image: 'https://hirsagol.com/wp-content/uploads/2019/03/red-rose.jpg', link: '#' },
        { id: 4, name: 'برند ۴', image: 'https://hirsagol.com/wp-content/uploads/2019/03/red-rose.jpg', link: '#' },
        { id: 5, name: 'برند ۵', image: 'https://hirsagol.com/wp-content/uploads/2019/03/red-rose.jpg', link: '#' },
    ];

    return (
        <div className="my-8">
            <div className="flex justify-between items-center">
                <div className="flex-1"></div>
                <h2 className="text-2xl font-bold mb-4">برندهای محبوب</h2>
            </div>
            <div className="flex justify-between items-center gap-4 overflow-x-auto py-4">
                {brands.slice().reverse().map((brand) => (
                    <a
                        key={brand.id}
                        href={brand.link}
                        className="flex-shrink-0 flex flex-col items-center"
                        style={{ minWidth: '120px' }}
                    >
                        <div className="bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                            <img src={brand.image} alt={brand.name} className="w-32 h-32 rounded-full object-cover" />
                        </div>
                        <span className="text-sm mt-2 text-center">{brand.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Brands;
