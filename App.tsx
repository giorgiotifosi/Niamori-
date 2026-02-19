
import React, { useState, useEffect } from 'react';
import LandingHero from './components/LandingHero';
import LandingFeatures from './components/LandingFeatures';
import LandingProcess from './components/LandingProcess';
import LandingReviews from './components/LandingReviews';
import LandingScarcity from './components/LandingScarcity';
import LandingCTA from './components/LandingCTA';
import LandingShowcase from './components/LandingShowcase';
import OrderFormModal from './components/OrderFormModal';
import AiChat from './components/AiChat';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-[#d4af37] selection:text-black font-['Noto_Sans_Georgian']">
      {/* No Nav as requested */}
      
      <main>
        <LandingHero onAction={openModal} />
        <LandingShowcase onAction={openModal} />
        
        <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#121212]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-[#d4af37] mb-8 leading-tight">
              რატომ არის პერსონალიზებული საჩუქარი დაუვიწყარი?
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed italic">
              "საჩუქარი მხოლოდ ნივთი არ არის, ეს არის ამბავი, რომელიც ბოთლის ზედაპირზე სამუდამოდ დარჩება. როდესაც ადამიანი საკუთარ სახელს ან თბილ სიტყვებს მინაზე ამოტვიფრულს ხედავს, ის გრძნობს განსაკუთრებულ ზრუნვას."
            </p>
          </div>
        </section>

        <LandingFeatures />
        <LandingProcess />
        <LandingReviews />
        <LandingScarcity onAction={openModal} />
        <LandingCTA onAction={openModal} />
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <div className="flex justify-center space-x-6 mb-6">
          <span className="cursor-pointer hover:text-white">Facebook</span>
          <span className="cursor-pointer hover:text-white">Instagram</span>
          <span className="cursor-pointer hover:text-white">TikTok</span>
        </div>
        <p>© 2025 ნიამორი • ექსკლუზიური საჩუქრები. ყველა უფლება დაცულია.</p>
      </footer>

      {isModalOpen && <OrderFormModal onClose={closeModal} />}
      <AiChat />
    </div>
  );
};

export default App;
