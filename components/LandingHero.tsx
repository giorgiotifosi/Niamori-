
import React from 'react';

interface Props {
  onAction: () => void;
}

const LandingHero: React.FC<Props> = ({ onAction }) => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-12 md:py-20">
      {/* Background visual effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
          <div className="inline-block bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#d4af37] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            პრემიუმ ხარისხი
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            აჩუქე <span className="text-[#d4af37]">ქინძმარაული</span>, რომელიც სამუდამოდ დარჩება
          </h1>
          <p className="text-xl text-gray-400 max-w-xl mx-auto lg:mx-0">
            პერსონალური გრავირება პირდაპირ მინაზე. ეს არ არის სტიკერი - ეს არის მარადიული კვალი თქვენს საჩუქარზე.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button 
              onClick={onAction}
              className="w-full sm:w-auto bg-[#d4af37] hover:bg-[#b8952e] text-black font-bold px-10 py-5 rounded-xl transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)] text-lg"
            >
              შეუკვეთე ახლა
            </button>
            <div className="flex items-center space-x-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>უფასო მიწოდება თბილისში</span>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-t from-[#d4af37]/20 to-transparent blur-2xl rounded-full opacity-50"></div>
            <img 
              src="https://static.wixstatic.com/media/046dc4_e86d7ae8da694edfabd450cbf0f93455~mv2.webp" 
              alt="Premium Kindzmarauli" 
              className="h-[450px] md:h-[600px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] animate-slow-float"
            />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes slow-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .animate-slow-float { animation: slow-float 8s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default LandingHero;
