
import React, { useState, useEffect } from 'react';

interface Props {
  onAction: () => void;
}

const LandingScarcity: React.FC<Props> = ({ onAction }) => {
  const [stock, setStock] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setStock(prev => (prev > 3 ? prev - 1 : prev));
    }, 45000); // Decriment every 45s to simulate sales
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-red-950/20">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center space-x-2 text-red-500 font-bold uppercase tracking-tighter animate-pulse">
           <span className="w-2 h-2 bg-red-500 rounded-full"></span>
           <span>მარაგი იწურება</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold">
          დარჩენილია მხოლოდ <span className="text-[#d4af37]">{stock}</span> ბოთლი
        </h2>
        <p className="text-xl text-gray-400">
          დღეს უკვე გაიყიდა 47 კომპლექტი. ნუ გადადებთ, შეუკვეთეთ ახლა და დაჯავშნეთ თქვენი ექსკლუზიური საჩუქარი.
        </p>
        <button 
          onClick={onAction}
          className="bg-white text-black font-bold px-12 py-5 rounded-2xl hover:bg-gray-200 transition-all text-xl"
        >
          დაჯავშნა - შეკვეთა
        </button>
      </div>
    </section>
  );
};

export default LandingScarcity;
