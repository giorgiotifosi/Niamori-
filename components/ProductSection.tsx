
import React from 'react';
import { Product } from '../types';

interface Props {
  title: string;
  products: Product[];
  icon: React.ReactNode;
}

const ProductSection: React.FC<Props> = ({ title, products, icon }) => {
  return (
    <section className="py-12">
      <div className="flex items-center space-x-3 mb-10 border-b border-gray-200 pb-4">
        {icon}
        <h2 className="text-2xl font-bold text-red-900 uppercase tracking-wider">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-gray-100 flex flex-col">
            <div className="relative overflow-hidden aspect-[3/4] p-8">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                 <div className="bg-niamori-dark p-2 rounded-full text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                 </div>
              </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-[14px] leading-relaxed font-bold text-gray-900 mb-4 line-clamp-3">
                  {product.name}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="text-xl font-bold text-red-800">
                  {product.price.toFixed(2)}₾
                </div>
                
                <button className="w-full bg-niamori-dark text-white py-3 rounded-2xl font-bold hover:bg-black transition-colors uppercase text-sm tracking-widest">
                  არჩევა
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
