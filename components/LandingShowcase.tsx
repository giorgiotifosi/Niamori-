
import React from 'react';

interface Props {
  onAction: () => void;
}

const LandingShowcase: React.FC<Props> = ({ onAction }) => {
  return (
    <section className="py-24 bg-white text-black rounded-[40px] md:rounded-[80px] mx-4 my-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            პრემიუმ ნაკრები <br/>
            <span className="text-red-800 underline decoration-red-800/30">ქინძმარაული</span> სპეციალური ყუთით
          </h2>
          <ul className="space-y-4 text-lg">
            {[
              "ტექსტის გრავირება უშუალოდ მინაზე",
              "ნატურალური ხის სასაჩუქრე ყუთი",
              "ნახევრად ტკბილი ქინძმარაული (0.75ლ)",
              "უფასო გრავირების სერვისი"
            ].map((item, i) => (
              <li key={i} className="flex items-start space-x-3">
                <span className="mt-1 flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-800" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                </span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 flex items-center space-x-6">
             <div className="flex flex-col items-center">
               <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                 </svg>
               </div>
               <span className="text-[10px] uppercase font-bold text-gray-400">ადგილზე გადახდა</span>
             </div>
             <div className="flex flex-col items-center">
               <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                 </svg>
               </div>
               <span className="text-[10px] uppercase font-bold text-gray-400">გადმორიცხვა</span>
             </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 md:p-12 rounded-[32px] border border-gray-200 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="space-y-2">
            <p className="text-xs uppercase text-gray-400 font-bold tracking-widest">სრული კომპლექტის ფასი</p>
            <p className="text-7xl font-black text-gray-900 tracking-tighter">115.00 <span className="text-3xl">₾</span></p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="text-gray-500 text-sm italic">
               * ფასში შედის გრავირება და სასაჩუქრე ყუთი
             </div>
             <button 
              onClick={onAction}
              className="w-full sm:w-auto bg-black text-white px-10 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
             >
               ყიდვა
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingShowcase;
