
import React from 'react';

const Header: React.FC = () => {
  // Logo URL from Wix as requested
  const logoUrl = "https://static.wixstatic.com/media/046dc4_513c168c39fc4e6cbe30811d6e453ee6~mv2.png";

  return (
    <header className="relative w-full z-[150] bg-[#0a0a0a] border-b border-white/10 py-6 px-8 transition-all">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo and Slogan Group */}
        <div className="flex items-center space-x-8">
          <a href="/" className="flex items-center group">
            <img 
              src={logoUrl} 
              alt="Logo" 
              className="h-20 md:h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('niamori.ge')) {
                   target.src = "https://niamori.ge/wp-content/uploads/2022/10/logo.png";
                }
              }}
            />
          </a>
          
          <div className="border-l-2 border-[#d4af37]/40 pl-8 flex flex-col justify-center">
            <span className="text-white font-bold text-2xl md:text-3xl tracking-tight leading-tight">
              ღვინო პერსონალური
            </span>
            <span className="text-[#d4af37] font-bold text-lg md:text-xl tracking-wide uppercase opacity-90">
              გრავირებით
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
