import React from 'react';

const Categories: React.FC = () => {
  const categories = [
    { id: 1, name: 'الکترونیک', image: 'https://hirsagol.com/wp-content/uploads/2019/03/red-rose.jpg', link: '#' },
    { id: 2, name: 'مد و پوشاک', image: 'https://hirsagol.com/wp-content/uploads/2019/03/red-rose.jpg', link: '#' },
    { id: 3, name: 'خانه و آشپزخانه', image: 'https://hirsagol.com/wp-content/uploads/2019/03/red-rose.jpg', link: '#' },
    { id: 4, name: 'کالاهای سوپرمارکتی', image: 'https://hirsagol.com/wp-content/uploads/2019/03/red-rose.jpg', link: '#' },
    { id: 5, name: 'کتاب و لوازم تحریر', image: 'https://hirsagol.com/wp-content/uploads/2019/03/red-rose.jpg', link: '#' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-8">
      {categories.map((category) => (
        <a key={category.id} href={category.link} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <img src={category.image} alt={category.name} className="w-16 h-16 mb-2 rounded-full" />
          <span className="text-sm text-center">{category.name}</span>
        </a>
      ))}
    </div>
  );
};

export default Categories;