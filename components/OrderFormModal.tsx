
import React, { useState, useRef } from 'react';
import html2pdf from 'https://esm.sh/html2pdf.js@0.10.1';

interface Props {
  onClose: () => void;
}

const OrderFormModal: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const invoiceTemplateRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    engraving: '',
    wine: 'ქინძმარაული (ნახევრად ტკბილი)',
    price: '115.00 ₾'
  });

  const generateInvoice = async () => {
    if (!invoiceTemplateRef.current) return;
    setIsGenerating(true);

    const element = invoiceTemplateRef.current;
    const opt = {
      margin: 10,
      filename: `niamori-invoice-${formData.name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF Generation Error:', err);
      alert('PDF-ის გენერაციისას მოხდა შეცდომა');
    } finally {
      setIsGenerating(false);
    }
  };

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
      {/* Hidden Invoice Template for PDF Generation */}
      <div className="absolute opacity-0 pointer-events-none -z-10">
        <div 
          ref={invoiceTemplateRef} 
          className="w-[210mm] p-[20mm] bg-white text-black font-['Noto_Sans_Georgian'] leading-relaxed"
          style={{ fontFamily: "'Noto Sans Georgian', sans-serif" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b-2 border-[#d4af37] pb-8 mb-10">
            <div>
              <h1 className="text-3xl font-black text-[#d4af37] uppercase tracking-tighter">NIAMORI • ნიამორი</h1>
              <p className="text-sm text-gray-500 mt-1">ექსკლუზიური საჩუქრები გრავირებით</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold uppercase tracking-widest text-gray-400">ინვოისი</h2>
              <p className="text-sm">#{Math.floor(Math.random() * 90000 + 10000)}</p>
              <p className="text-sm">თარიღი: {new Date().toLocaleDateString('ka-GE')}</p>
            </div>
          </div>

          {/* Info Sections */}
          <div className="grid grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-widest">მყიდველი</h3>
              <p className="font-bold text-lg">{formData.name}</p>
              <p className="text-sm text-gray-600">{formData.email}</p>
              <p className="text-sm text-gray-600">{formData.phone}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-widest">მიმღები</h3>
              <p className="font-bold text-lg">შპს ნიამორი</p>
              <p className="text-sm text-gray-600">ს/კ: 405157431</p>
              <p className="text-sm text-gray-600">თბილისი, ჩერქეზიშვილის 33</p>
            </div>
          </div>

          {/* Product Table */}
          <div className="mb-12">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 text-xs font-bold uppercase text-gray-400">დასახელება</th>
                  <th className="py-4 text-xs font-bold uppercase text-gray-400 text-right">ფასი</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-6">
                    <p className="font-bold text-lg">{formData.wine}</p>
                    <p className="text-sm text-gray-500 mt-2 italic">
                      გრავირება: "{formData.engraving}"
                    </p>
                  </td>
                  <td className="py-6 text-right font-bold text-lg">{formData.price}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment and Totals */}
          <div className="grid grid-cols-2 gap-12 items-start pt-8">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-xs font-bold uppercase text-[#d4af37] mb-4 tracking-widest">საბანკო რეკვიზიტები</h3>
              <div className="space-y-3 text-sm">
                <p><span className="text-gray-400">TBC:</span> <strong>GE29TB7968536020100006</strong></p>
                <p><span className="text-gray-400">BOG:</span> <strong>GE21BG0000000499279996</strong></p>
                <p className="text-[10px] text-gray-400 mt-4 leading-tight italic">
                  * გთხოვთ, გადარიცხვისას დანიშნულებაში მიუთითოთ თქვენი სახელი ან ინვოისის ნომერი.
                </p>
              </div>
            </div>
            <div className="text-right space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold uppercase text-xs">ჯამი:</span>
                <span className="text-xl font-bold">{formData.price}</span>
              </div>
              <div className="border-t-2 border-black pt-4 flex justify-between items-center">
                <span className="text-black font-black uppercase text-sm">სულ გადასახდელი:</span>
                <span className="text-3xl font-black text-red-800">{formData.price}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 text-center border-t border-gray-100 pt-10">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em] mb-2">გმადლობთ არჩევანისთვის</p>
            <p className="text-xs text-gray-400">office@niamori.ge • +995 555 682 266 • niamori.ge</p>
          </div>
        </div>
      </div>

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
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">შეკვეთა მიღებულია!</h3>
              <p className="text-gray-500 text-sm">
                ავტომატური PDF ინვოისი გამოგზავნილია თქვენს მეილზე ({formData.email}) <strong>office@niamori.ge</strong>-დან.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={generateInvoice}
                disabled={isGenerating}
                className={`w-full ${isGenerating ? 'bg-gray-200' : 'bg-[#d4af37]'} text-black py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-[#b8952e] transition-colors shadow-lg`}
              >
                {isGenerating ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                <span>{isGenerating ? 'მზადდება...' : 'ინვოისის ჩამოტვირთვა'}</span>
              </button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-3xl text-left space-y-4 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">საბანკო გადმორიცხვა</p>
              
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
            </div>

            <button 
              onClick={onClose}
              className="w-full bg-black text-white py-4 rounded-xl font-bold"
            >
              დასრულება
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-3xl font-bold mb-2">გააფორმე შეკვეთა</h3>
            <p className="text-gray-500 text-sm mb-8">შეავსეთ მონაცემები ინვოისის მისაღებად</p>
            
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
                <label className="text-xs font-bold uppercase text-gray-400 ml-1">ელ-ფოსტა</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:border-black transition-colors"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                  placeholder="მაგ: გილოცავ დაბადების დღეს!"
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
