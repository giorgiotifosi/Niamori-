
import React, { useState } from 'react';

interface Props {
  onClose: () => void;
}

const OrderFormModal: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    engraving: '',
    wine: 'ქინძმარაული'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Show success
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('ანგარიშის ნომერი დაკოპირებულია');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white text-black w-full max-w-lg rounded-[40px] p-8 md:p-12 relative z-[210] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {step === 3 ? (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold">შეკვეთა მიღებულია!</h3>
            <p className="text-gray-500 text-sm">ოპერატორი მალე დაგიკავშირდებათ დეტალების დასაზუსტებლად.</p>
            
            <div className="bg-gray-50 p-6 rounded-3xl text-left space-y-4 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">ანგარიშსწორება</p>
              
              <div className="space-y-3">
                <div className="flex flex-col space-y-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">თიბისი ბანკი</span>
                  <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-200">
                    <code className="text-[11px] font-mono">GE29TB7968536020100006</code>
                    <button onClick={() => copyToClipboard('GE29TB7968536020100006')} className="text-gray-400 hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-[10px] font-bold text-orange-600 uppercase">საქართველოს ბანკი</span>
                  <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-200">
                    <code className="text-[11px] font-mono">GE21BG0000000499279996</code>
                    <button onClick={() => copyToClipboard('GE21BG0000000499279996')} className="text-gray-400 hover:text-orange-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 space-y-1">
                <p className="text-[11px]"><span className="text-gray-400">მიმღები:</span> <span className="font-bold">შპს ნიამორი</span></p>
                <p className="text-[11px]"><span className="text-gray-400">საიდენტიფიკაციო კოდი:</span> <span className="font-bold">405157431</span></p>
                <p className="text-[11px] text-green-600 font-bold italic pt-2">✓ შესაძლებელია გადახდა ადგილზე კურიერთან</p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full bg-black text-white py-4 rounded-xl font-bold"
            >
              დახურვა
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-3xl font-bold mb-2">გააფორმე შეკვეთა</h3>
            <p className="text-gray-500 text-sm mb-8">შეავსეთ მონაცემები და ჩვენ დაგიკავშირდებით</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 ml-1">სახელი და გვარი</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:border-black transition-colors"
                  placeholder="მაგ: გიორგი ბერიძე"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 ml-1">ტელეფონის ნომერი</label>
                <input 
                  required
                  type="tel" 
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:border-black transition-colors"
                  placeholder="5XX XX XX XX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-400 ml-1">გრავირების ტექსტი</label>
                <textarea 
                  required
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:border-black transition-colors min-h-[100px]"
                  placeholder="მაგ: გილოცავ დაბადების დღეს, ძმაო!"
                  value={formData.engraving}
                  onChange={(e) => setFormData({...formData, engraving: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:bg-gray-800 transition-all shadow-xl"
            >
              შეკვეთის დადასტურება
            </button>
            <div className="flex items-center justify-center space-x-2 pt-2">
               <span className="text-[10px] text-gray-400 uppercase tracking-widest">ადგილზე გადახდა</span>
               <span className="text-gray-300">•</span>
               <span className="text-[10px] text-gray-400 uppercase tracking-widest">საბანკო გადმორიცხვა</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderFormModal;
