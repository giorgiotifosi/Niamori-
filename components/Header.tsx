
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="https://niamori.ge/wp-content/uploads/2022/10/logo.png" alt="Niamori" className="h-16" />
        </div>

        {/* Language Selector */}
        <div className="hidden md:block">
          <button className="bg-niamori-dark text-white px-6 py-2 rounded-full flex items-center space-x-2 text-sm">
            <span>ქართული</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative border-b-2 border-gray-200 py-1">
            <input 
              type="text" 
              placeholder="ძებნა..." 
              className="w-full pl-8 pr-4 outline-none text-sm placeholder-gray-400" 
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-0 top-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Info & Socials */}
        <div className="flex items-center space-x-6">
          <div className="hidden lg:flex items-center space-x-4">
             {/* FB, IG, TikTok Icons - Placeholder as SVGs */}
             <div className="flex space-x-2">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">f</span>
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">ig</span>
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">tk</span>
             </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2 font-bold text-sm">
             <span className="bg-niamori-dark text-white p-1 rounded">📞</span>
             <span>+995 555 682 266</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer">
                <div className="bg-niamori-dark text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="absolute -top-1 -right-1 bg-white text-niamori-dark border border-niamori-dark rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">0</span>
            </div>
            <button className="bg-niamori-dark text-white px-6 py-2 rounded-full flex items-center space-x-2 text-sm whitespace-nowrap">
              <span className="bg-white/20 p-1 rounded-full">👤</span>
              <span>შესვლა</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
