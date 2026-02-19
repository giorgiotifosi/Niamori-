
import React from 'react';

const ValueProps: React.FC = () => {
  return (
    <div className="relative py-24 bg-gray-900 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <img src="https://picsum.photos/seed/wine_bg/1920/600" className="w-full h-full object-cover" alt="" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-white text-3xl font-bold mb-16 uppercase tracking-widest">რატომ ჩვენ?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Item 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-8 flex items-center justify-center border-2 border-white rounded-xl">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
               </svg>
            </div>
            <h3 className="text-white text-xl font-bold mb-4 uppercase leading-tight">პერსონალიზებული ღვინის ონლაინ მაღაზია</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">გთავაზობთ ქართულ სასაჩუქრე ღვინოს, ჭაჭას და ბრენდს ექსკლუზიური გრავირებით.</p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center">
             <div className="w-20 h-20 mb-8 flex items-center justify-center border-2 border-white rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
             </div>
             <h3 className="text-white text-xl font-bold mb-4 uppercase leading-tight">სწრაფი და სანდო მომსახურება</h3>
             <p className="text-gray-300 text-sm leading-relaxed max-w-xs">საჩუქრის შერჩევაში ჩვენი გუნდი გაგიწევთ კონსულტაციას.</p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center">
             <div className="w-20 h-20 mb-8 flex items-center justify-center border-2 border-white rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
             </div>
             <h3 className="text-white text-xl font-bold mb-4 uppercase leading-tight">ადგილზე მიწოდების სერვისი</h3>
             <p className="text-gray-300 text-sm leading-relaxed max-w-xs">შერჩეულ საჩუქარს სასურველ მისამართზე გამოგიგზავნით.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueProps;
