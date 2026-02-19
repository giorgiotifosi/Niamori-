
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-niamori-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* My Account */}
          <div>
            <h4 className="text-lg font-bold mb-8 uppercase border-b border-white/10 pb-4">ჩემი ანგარიში</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">ავტორიზაცია</a></li>
              <li><a href="#" className="hover:text-white transition-colors">რეგისტრაცია</a></li>
            </ul>
          </div>

          {/* Payments */}
          <div>
            <h4 className="text-lg font-bold mb-8 uppercase border-b border-white/10 pb-4">გადახდები</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">ხშირად დასმული კითხვები</a></li>
              <li><a href="#" className="hover:text-white transition-colors">კონფიდენციალურობა</a></li>
              <li><a href="#" className="hover:text-white transition-colors">მიტანის სერვისი</a></li>
              <li><a href="#" className="hover:text-white transition-colors">მიწოდება საზღვარგარეთ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">პროდუქტის წონა და ზომა</a></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-8 uppercase border-b border-white/10 pb-4">ნავიგაცია</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">კონტაქტი</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ჩვენს შესახებ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ბლოგი</a></li>
              <li><a href="#" className="hover:text-white transition-colors">გალერეა</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ვიდეო გიდი</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-8 uppercase border-b border-white/10 pb-4">კონტაქტი</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>საქართველო, თბილისი</li>
              <li>ვარლამ ჩერქეზიშვილის 33</li>
              <li>+995 555 682 266</li>
              <li>niamori22@gmail.com</li>
              <li className="pt-6 space-y-2 flex flex-col">
                 <a href="https://www.facebook.com/niamori.ge" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">facebook</a>
                 <a href="https://www.instagram.com/niamori.ge" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">instagram</a>
                 <a href="https://www.tiktok.com/@niamori.ge" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">tiktok</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-gray-500 mb-6 md:mb-0">
             Copyright © 2025 | Niamori • ნიამორი. All rights reserved.
          </p>
          <div className="flex items-center space-x-2">
             <div className="bg-white px-2 py-1 rounded text-blue-900 font-bold italic text-xs">VISA</div>
             <div className="bg-white px-2 py-1 rounded text-orange-600 font-bold italic text-xs">Mastercard</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
