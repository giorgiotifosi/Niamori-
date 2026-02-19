
import React from 'react';

const LandingReviews: React.FC = () => {
  const reviews = [
    { name: "ნინო ა.", text: "საოცარი საჩუქარი გამოვიდა! გრავირება ძალიან ხარისხიანია. მეუღლეს ძალიან მოეწონა.", rating: 5 },
    { name: "გიორგი ბ.", text: "სწრაფი მიტანა და საუკეთესო შეფუთვა. ხის ყუთი ძალიან ეფექტურია.", rating: 5 },
    { name: "თამარ ლ.", text: "ნამდვილი პრემიუმ მომსახურება. გრავირების ტექსტი ზუსტად ისეთი იყო, როგორიც მინდოდა.", rating: 5 },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">რას ამბობენ მომხმარებლები</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-[32px] border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex mb-4">
                {[...Array(r.rating)].map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{r.text}"</p>
              <p className="font-bold text-white">— {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingReviews;
