
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-white py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Text Side */}
        <div className="md:w-1/2 text-center md:text-left z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
             მუკუზანი 0.75 ლ
          </h1>
          <p className="text-xl text-gray-600">წითელი მშრალი</p>
          
          <div className="space-y-2">
            <p className="text-lg text-gray-500 font-medium">ფასში შედის გრავირება</p>
            <p className="text-lg text-gray-500 font-medium">თბილისში მიწოდება უფასოა</p>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-6 py-4">
             <span className="text-4xl line-through text-red-700 decoration-2 decoration-red-700 opacity-50">75 ₾</span>
             <span className="text-6xl font-bold text-gray-900">50 ₾</span>
          </div>

          <button className="bg-niamori-dark text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-black transition-all transform hover:scale-105">
             შეუკვეთე ახლავე
          </button>
        </div>

        {/* Image Side */}
        <div className="md:w-1/2 mt-12 md:mt-0 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square">
               <img 
                 src="https://niamori.ge/wp-content/uploads/2023/12/MUKUZANI_WEB.png" 
                 alt="Featured Product" 
                 className="w-full h-full object-contain drop-shadow-2xl animate-float"
               />
            </div>
        </div>
      </div>

      {/* Slider dots */}
      <div className="flex justify-center mt-8 space-x-2">
         <div className="w-2.5 h-2.5 bg-gray-200 rounded-full cursor-pointer"></div>
         <div className="w-2.5 h-2.5 bg-niamori-dark rounded-full cursor-pointer"></div>
         <div className="w-2.5 h-2.5 bg-gray-200 rounded-full cursor-pointer"></div>
      </div>
      
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Hero;
