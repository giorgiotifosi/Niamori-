
import React from 'react';

const CallButton: React.FC = () => {
  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      <a 
        href="tel:+995599235129"
        className="flex items-center space-x-4 bg-red-700 text-white px-6 py-4 rounded-full shadow-[0_15px_35px_rgba(185,28,28,0.5)] hover:bg-red-600 transition-all hover:scale-110 active:scale-95 group relative"
      >
        {/* Pulsing indicator */}
        <div className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white shadow-sm"></span>
        </div>
        
        {/* Phone Icon */}
        <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-md group-hover:bg-white/30 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        
        {/* Text and Number */}
        <div className="flex flex-col pr-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 leading-tight">დაგვირეკე</span>
          <span className="text-base font-black tracking-tight whitespace-nowrap">+995 599 235 129</span>
        </div>
      </a>
    </div>
  );
};

export default CallButton;
