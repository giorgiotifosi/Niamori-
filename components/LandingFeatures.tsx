
import React from 'react';

const LandingFeatures: React.FC = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">ხარისხი, რომელიც იგრძნობა</h2>
          <p className="text-gray-400 text-xl">ჩვენი გრავირება არ არის ჩვეულებრივი ეტიკეტი</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#121212] p-10 rounded-3xl border border-white/5 group hover:border-[#d4af37]/30 transition-all">
            <div className="text-[#d4af37] mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">უშუალოდ მინაზე გრავირება</h3>
            <p className="text-gray-400 leading-relaxed">
              ლაზერული ტექნოლოგიით ჩვენ ვწვავთ მინის ზედა ფენას, რაც ქმნის ელეგანტურ, მქრქალ ეფექტს. ეს წარწერა არასოდეს წაიშლება და არ გაუფერულდება.
            </p>
          </div>

          <div className="bg-[#121212] p-10 rounded-3xl border border-white/5 group hover:border-[#d4af37]/30 transition-all">
             <div className="text-red-800 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
             </div>
             <h3 className="text-2xl font-bold mb-4">არა სტიკერებს!</h3>
             <p className="text-gray-400 leading-relaxed">
               განსხვავებით სხვა მაღაზიებისგან, ჩვენ არ ვიყენებთ წებოვან სტიკერებს ან პრინტებს, რომლებიც დროთა განმავლობაში ძვრება. ჩვენი პროდუქტი ნამდვილი ხელოვნებაა.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
