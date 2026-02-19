
import React, { useState } from 'react';
import { NAV_ITEMS } from '../constants';

const Navigation: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className="relative bg-white pt-2 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-niamori-dark text-white rounded-full flex flex-wrap items-center justify-center px-4 py-1.5 overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="relative group"
              onMouseEnter={() => setActiveMenu(item.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button 
                className={`px-5 py-2 text-sm font-bold uppercase transition-colors whitespace-nowrap
                  ${item.isRed ? 'bg-red-700 rounded-full' : 'hover:text-niamori-gold'}
                `}
              >
                {item.label}
              </button>

              {/* Dropdown */}
              {item.subItems && activeMenu === item.id && (
                <div className="absolute top-full left-0 mt-2 z-50 bg-[#1a1a1a] min-w-[180px] shadow-xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex flex-col py-2">
                    {item.subItems.map((sub, idx) => (
                      <a 
                        key={idx} 
                        href="#" 
                        className="px-6 py-2.5 text-[13px] hover:bg-white/10 text-white transition-colors"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
