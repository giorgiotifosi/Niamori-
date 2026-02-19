
import React from 'react';
import { CATEGORIES } from '../constants';

const CategoryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 py-12">
      {CATEGORIES.map((cat) => (
        <div key={cat.id} className="group flex flex-col items-center cursor-pointer">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-3 transition-transform group-hover:-translate-y-2">
            <img src={cat.icon} alt={cat.label} className="w-16 h-16 object-contain" />
          </div>
          <span className="bg-niamori-dark text-white px-4 py-1.5 rounded-full text-xs font-bold w-full text-center">
            {cat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
