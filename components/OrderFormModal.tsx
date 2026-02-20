
import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'https://esm.sh/html2canvas@1.4.1';
import { jsPDF } from 'https://esm.sh/jspdf@2.5.1';

interface Props {
  onClose: () => void;
}

const OrderFormModal: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const invoiceTemplateRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    engraving: '',
    wine: 'ქინძმარაული (ნახევრად ტკბილი)',
    price: '115.00 ₾'
  });

  useEffect(() => {
    if (step === 3 && emailStatus === 'idle') {
      handleAutoEmail();
    }
  }, [step]);

  const generateInvoiceBlob = async (): Promise<{ base64: string } | null> => {
    if (!invoiceTemplateRef.current) return null;
    
    try {
      const canvas = await html2canvas(invoiceTemplateRef.current, {
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      
      // Return raw data string
      return { base64: pdf.output('datauristring') };
    } catch (err) {
      console.error("PDF generation internal error:", err);
      return null;
    }
  };

  const handleAutoEmail = async () => {
    setEmailStatus('sending');
    setErrorMessage('');
    
    try {
      const pdfData = await generateInvoiceBlob();
      if (!pdfData) throw new Error("PDF-ის გენერაცია ვერ მოხერხდა");

      const response = await fetch('/api/send-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          pdfBase64: pdfData.base64,
          orderId: Math.floor(Math.random() * 90000 + 10000)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailStatus('sent');
      } else {
        throw new Error(data.details || data.error || "სერვერული შეცდომა");
      }
    } catch (err: any) {
      console.error('Email Sending Error:', err);
      setEmailStatus('error');
      setErrorMessage(err.message || "ტექნიკური ხარვეზი");
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(invoiceTemplateRef.current!, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`niamori-invoice-${formData.name}.pdf`);
    } catch (err) {
      alert('PDF-ის ჩამოტვირთვისას მოხდა შეცდომა.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); 
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('ანგარიშის ნომერი დაკოპირებულია');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Hidden Invoice Template for PDF Capture */}
      <div className="absolute opacity-0 pointer-events-none -z-50 overflow-hidden" style={{ width: '800px' }}>
        <div 
          ref={invoiceTemplateRef} 
          className="bg-white text-black p-12 w-[800px]"
          style={{ fontFamily: "'Noto Sans Georgian', sans-serif" }}
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b-4 border-[#d4af37] pb-10 mb-10">
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-[#d4af37] tracking-tighter">NIAMORI • ნიამორი</h1>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Premium Personalized Gifts</p>
              <div className="pt-4 text-sm text-gray-600 space-y-1">
                <p>შპს ნიამორი | ს/კ: 405157431</p>
                <p>ვ. ჩერქეზიშვილის 33, თბილისი</p>
                <p>+995 555 682 266 | office@niamori.ge</p>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-4">
                <h2 className="text-2xl font-black uppercase text-gray-900 tracking-widest">ინვოისი</h2>
              </div>
              <p className="text-sm font-bold text-gray-400">#{Math.floor(Math.random() * 90000 + 10000)}</p>
              <p className="text-sm">თარიღი: {new Date().toLocaleDateString('ka-GE')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 mb-12">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h3 className="text-[10px] font-black uppercase text-gray-400 mb-4 tracking-[0.2em]">მყიდველი</h3>
              <p className="font-bold text-xl mb-1">{formData.name}</p>
              <p className="text-gray-600">{formData.email}</p>
              <p className="text-gray-600">{formData.phone}</p>
            </div>
            <div className="flex justify-end items-center">
              <img 
                src="https://static.wixstatic.com/media/046dc4_e86d7ae8da694edfabd450cbf0f93455~mv2.webp" 
                alt="Product" 
                className="h-40 object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Table */}
          <table className="w-full mb-12">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 text-left text-xs font-bold uppercase text-gray-400">დასახელება</th>
                <th className="py-4 text-right text-xs font-bold uppercase text-gray-400">რაოდენობა</th>
                <th className="py-4 text-right text-xs font-bold uppercase text-gray-400">ჯამი</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-8">
                  <p className="font-bold text-xl">{formData.wine}</p>
                  <p className="text-gray-500 mt-2 italic text-sm">
                    პერსონალური გრავირება: "{formData.engraving}"
                  </p>
                  <p className="text-xs text-[#d4af37] font-bold mt-1 uppercase">+ სასაჩუქრე ხის ყუთი</p>
                </td>
                <td className="py-8 text-right font-bold text-lg">1</td>
                <td className="py-8 text-right font-bold text-xl">{formData.price}</td>
              </tr>
            </tbody>
          </table>

          {/* Total and Bank */}
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-[#fcf9f0] p-6 rounded-3xl border border-[#d4af37]/20">
                <h3 className="text-[10px] font-black uppercase text-[#d4af37] mb-4 tracking-[0.2em]">საბანკო რეკვიზიტები</h3>
                <div className="space-y-4 text-xs font-bold">
                  <div>
                    <p className="text-gray-400 mb-1">TBC BANK:</p>
                    <p className="font-mono text-sm">GE29TB7968536020100006</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">BANK OF GEORGIA:</p>
                    <p className="font-mono text-sm">GE21BG0000000499279996</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end text-right space-y-4">
              <div className="border-t-4 border-black pt-6 flex justify-between items-center">
                <span className="text-sm font-black uppercase">სულ გადასახდელი</span>
                <span className="text-4xl font-black text-red-800">{formData.price}</span>
              </div>
              <p className="text-[10px] text-gray-400 italic">
                * გადახდა შესაძლებელია როგორც გადმორიცხვით, ასევე ნაღდი ანგარიშსწორებით კურიერთან.
              </p>
            </div>
          </div>

          <div className="mt-24 text-center">
            <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.5em]">NIAMORI.GE • მადლობა არჩევანისთვის</p>
          </div>
        </div>
      </div>

      {/* Modal UI */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white text-black w-full max-w-lg rounded-[40px] p-8 md:p-12 relative z-[210] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {step === 3 ? (
          <div className="text-center py-6 space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-3xl font-black">შეკვეთა მიღებულია!</h3>
              
              <div className="flex flex-col items-center justify-center space-y-2 py-2">
                {emailStatus === 'sending' && (
                  <div className="flex items-center space-x-2 text-blue-600 animate-pulse">
                    <div className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                    <span className="text-xs font-bold uppercase tracking-widest">ინვოისი იგზავნება...</span>
                  </div>
                )}
                {emailStatus === 'sent' && (
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-100">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="text-xs font-bold uppercase tracking-widest">ინვოისი გაიგზავნა: {formData.email}</span>
                  </div>
                )}
                {emailStatus === 'error' && (
                  <div className="flex flex-col items-center space-y-2 bg-red-50 p-4 rounded-2xl border border-red-100">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-widest">მეილის გაგზავნა ვერ მოხერხდა</span>
                    <p className="text-[10px] text-red-400 font-medium px-4 break-words max-w-xs">{errorMessage}</p>
                    <button onClick={handleAutoEmail} className="text-[10px] text-blue-600 font-bold underline uppercase tracking-widest mt-2">ხელახლა ცდა</button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={handleDownload}
                disabled={isGenerating}
                className={`w-full ${isGenerating ? 'bg-gray-100' : 'bg-[#d4af37]'} text-black py-5 rounded-2xl font-black flex items-center justify-center space-x-3 hover:bg-[#b8952e] transition-all transform hover:scale-[1.02] shadow-xl`}
              >
                {isGenerating ? (
                  <div className="w-6 h-6 border-3 border-black/20 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                <span className="text-lg font-black">{isGenerating ? 'მზადდება...' : 'ინვოისის გადმოწერა'}</span>
              </button>
              
              <button 
                onClick={onClose}
                className="w-full bg-black text-white py-4 rounded-2xl font-bold opacity-80 hover:opacity-100 transition-all"
              >
                დასრულება
              </button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-3xl text-left border border-gray-100">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center mb-4">საბანკო რეკვიზიტები</p>
               <div className="space-y-3">
                  <div onClick={() => copyToClipboard('GE29TB7968536020100006')} className="cursor-pointer group flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-all hover:shadow-md">
                    <div>
                      <p className="text-[10px] font-bold text-blue-600">TBC BANK</p>
                      <code className="text-xs font-mono font-bold">GE29TB7968536020100006</code>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
                  </div>
                  <div onClick={() => copyToClipboard('GE21BG0000000499279996')} className="cursor-pointer group flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 hover:border-orange-200 transition-all hover:shadow-md">
                    <div>
                      <p className="text-[10px] font-bold text-orange-600">BOG</p>
                      <code className="text-xs font-mono font-bold">GE21BG0000000499279996</code>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-4xl font-black tracking-tight">შეკვეთა</h3>
              <p className="text-gray-500 text-sm">შეიყვანეთ მონაცემები ინვოისის მისაღებად</p>
            </div>
            
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">სახელი და გვარი</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:border-black focus:bg-white transition-all text-lg font-medium"
                  placeholder="შეიყვანე სახელი და გვარი"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">ელ-ფოსტა</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:border-black focus:bg-white transition-all text-lg font-medium"
                  placeholder="name@mail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">ტელეფონი</label>
                <input 
                  required
                  type="tel" 
                  className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:border-black focus:bg-white transition-all text-lg font-medium"
                  placeholder="5XX XX XX XX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">გრავირების ტექსტი</label>
                <textarea 
                  required
                  className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:border-black focus:bg-white transition-all text-lg font-medium min-h-[120px]"
                  placeholder="მაგ: გილოცავ, საუკეთესო სურვილებით!"
                  value={formData.engraving}
                  onChange={(e) => setFormData({...formData, engraving: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-black text-white py-6 rounded-3xl font-black text-xl hover:bg-gray-800 transition-all shadow-2xl hover:scale-[1.01] active:scale-95 mt-4"
            >
              შეკვეთის დადასტურება
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderFormModal;
