
import React from 'react';

interface Props {
  onAction: () => void;
}

const LandingCTA: React.FC<Props> = ({ onAction }) => {
  return (
    <section className="py-32 relative overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/10 to-transparent"></div>
       <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter italic text-[#d4af37]">
            შექმენი შენი ისტორია მინაზე
          </h2>
          <div className="flex flex-col items-center space-y-8">
            <button 
              onClick={onAction}
              className="bg-[#d4af37] text-black font-black px-16 py-6 rounded-2xl text-2xl hover:scale-110 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.4)] uppercase"
            >
              ახლავე შეკვეთა
            </button>
            <div className="space-y-2">
              <p className="text-gray-400 flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>უსაფრთხო გადახდა • 100% კმაყოფილების გარანტია</span>
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                გადახდა: საბანკო გადმორიცხვა (TBC/BOG) ან ნაღდი ანგარიშსწორება
              </p>
            </div>
          </div>
       </div>
    </section>
  );
};

export default LandingCTA;
