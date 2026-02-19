
import React from 'react';

const LandingProcess: React.FC = () => {
  const steps = [
    { num: "01", title: "შეარჩიე ქინძმარაული", desc: "აარჩიე ჩვენი საუკეთესო ნახევრად ტკბილი ქინძმარაული." },
    { num: "02", title: "დაწერე ტექსტი", desc: "მიუთითე სახელი, თარიღი ან ნებისმიერი თბილი სიტყვა." },
    { num: "03", title: "მიიღე სწრაფად", desc: "ჩვენი კურიერი 24 საათში მოგიტანთ შეკვეთას თბილისში." },
  ];

  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 tracking-tight">როგორ მუშაობს?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center space-y-6">
              <div className="text-8xl font-black text-white/5 absolute -top-12 left-1/2 -translate-x-1/2 z-0 select-none">
                {step.num}
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-bold text-[#d4af37]">{step.title}</h3>
                <p className="text-gray-400 max-w-xs mx-auto">{step.desc}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-12 border-t border-dashed border-white/20"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingProcess;
