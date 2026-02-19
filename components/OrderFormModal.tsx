
import React, { useState } from 'react';
import { jsPDF } from 'https://esm.sh/jspdf@2.5.1';

interface Props {
  onClose: () => void;
}

const OrderFormModal: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    engraving: '',
    wine: 'ქინძმარაული (ნახევრად ტკბილი)',
    price: '115.00 ₾'
  });

  const generateInvoice = () => {
    setIsGenerating(true);
    const doc = new jsPDF();
    
    // Header - Brand Name
    doc.setFontSize(22);
    doc.setTextColor(212, 175, 55); // Gold color
    doc.text('NIAMORI - ნიამორი', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('ინვოისი #INV-' + Math.floor(Math.random() * 90000 + 10000), 20, 40);
    doc.text('თარიღი: ' + new Date().toLocaleDateString('ka-GE'), 20, 45);

    // Customer Info
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('მყიდველის ინფორმაცია:', 20, 60);
    doc.setFontSize(11);
    doc.text(`სახელი: ${formData.name}`, 20, 70);
    doc.text(`ელ-ფოსტა: ${formData.email}`, 20, 75);
    doc.text(`ტელეფონი: ${formData.phone}`, 20, 80);

    // Order Info
    doc.setFontSize(14);
    doc.text('შეკვეთის დეტალები:', 20, 95);
    doc.setDrawColor(230, 230, 230);
    doc.line(20, 98, 190, 98);
    
    doc.setFontSize(11);
    doc.text('პროდუქტი:', 20, 110);
    doc.text(formData.wine, 70, 110);
    
    doc.text('გრავირების ტექსტი:', 20, 120);
    doc.text(formData.engraving, 70, 120, { maxWidth: 120 });
    
    doc.setFontSize(14);
    doc.text('ჯამური ფასი:', 20, 145);
    doc.setFontSize(16);
    doc.setTextColor(185, 28, 28); // Red
    doc.text(formData.price, 70, 145);

    // Bank Details
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('საბანკო რეკვიზიტები:', 20, 170);
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text('მიმღები: შპს ნიამორი (ს/კ: 405157431)', 20, 180);
    doc.text('TBC Bank: GE29TB7968536020100006', 20, 185);
    doc.text('Bank of Georgia: GE21BG0000000499279996', 20, 190);

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('გმადლობთ, რომ ირჩევთ ნიამორს!', 105, 270, { align: 'center' });
    doc.text('office@niamori.ge | +995 555 682 266', 105, 275, { align: 'center' });

    // Download
    doc.save(`niamori-invoice-${formData.name}.pdf`);
    setIsGenerating(false);
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
                className="w-full bg-[#d4af37] text-black py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-[#b8952e] transition-colors shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{isGenerating ? 'მზადდება...' : 'ინვოისის ჩამოტვირთვა'}</span>
              </button>
            </div>
            
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
