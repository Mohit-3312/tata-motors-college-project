import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

// --- MOCK DATABASE ARRAY FOR SHOWROOM OFFERS ---
const initialOffersData = [
  {
    id: 1,
    carName: 'Tata Curvv & Curvv.ev',
    offerBadge: 'Festive Special',
    maxSavings: 'Save up to ₹ 1,25,000',
    cashDiscount: '₹ 30,000 Cash Discount',
    exchangeBonus: '₹ 45,000 Exchange / Scrappage',
    loyaltyBonus: '₹ 50,000 Existing Owner Loyalty',
    validity: 'Valid till End of Month',
    category: 'suv',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    carName: 'Tata Harrier & Safari',
    offerBadge: 'Freedom Benefit',
    maxSavings: 'Save up to ₹ 2,75,000',
    cashDiscount: '₹ 75,000 Direct Benefit',
    exchangeBonus: '₹ 1,00,000 Exchange Bonus',
    loyaltyBonus: 'Free 1-Year Insurance + Loyalty',
    validity: 'Limited Stock Available',
    category: 'suv',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    carName: 'Tata Nexon & Nexon.ev',
    offerBadge: 'Bestseller Offer',
    maxSavings: 'Save up to ₹ 75,000',
    cashDiscount: '₹ 25,000 Cash Discount',
    exchangeBonus: '₹ 25,000 Exchange Bonus',
    loyaltyBonus: '₹ 25,000 Corporate Discount',
    validity: 'Valid till Stocks Last',
    category: 'compact',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    carName: 'Tata Tiago.ev & Punch.ev',
    offerBadge: 'Green Mobility Bonus',
    maxSavings: 'Save up to ₹ 1,45,000',
    cashDiscount: '₹ 80,000 Green Bonus',
    exchangeBonus: '₹ 35,000 Scrappage Benefit',
    loyaltyBonus: '₹ 30,000 State EV Subsidy',
    validity: 'Valid on LR Variants',
    category: 'ev',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    carName: 'Tata Altroz iCNG & Petrol',
    offerBadge: 'Monsoon Saver',
    maxSavings: 'Save up to ₹ 55,000',
    cashDiscount: '₹ 15,000 Cash Benefit',
    exchangeBonus: '₹ 20,000 Exchange Bonus',
    loyaltyBonus: '₹ 20,000 Freedom Bonus',
    validity: 'Valid across all trims',
    category: 'hatchback',
    image: 'https://images.unsplash.com/photo-1541348263662-e082662d82da?q=80&w=800&auto=format&fit=crop',
  },
];

// Motion Variants for Cards Float-In Effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function Offers() {
  const [offers] = useState(initialOffersData);
  const [filter, setFilter] = useState('all');

  // Filter offers dynamically based on tab choice
  const filteredOffers = offers.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="bg-slate-950 text-slate-100 min-h-screen font-sans pb-16 sm:pb-24 overflow-x-hidden">
        
        {/* --- HERO / HEADER SECTION --- */}
        <section className="relative pt-20 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-6 max-w-7xl mx-auto text-center">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-[500px] h-48 sm:h-[250px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-[10px] sm:text-xs uppercase tracking-widest bg-blue-950/80 text-blue-400 border border-blue-800/50 px-3.5 py-1 rounded-full mb-3 sm:mb-4 inline-block font-semibold">
            Official Dealership Savings
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
            Latest Showroom Offers & Discounts
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed px-2">
            Take advantage of cash discounts, exchange bonuses, corporate benefits, and zero-downpayment finance schemes across all Tata vehicles.
          </p>

          {/* Offer Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Deals ({offers.length})
            </button>
            <button
              onClick={() => setFilter('suv')}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
                filter === 'suv'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              SUVs & Coupes
            </button>
            <button
              onClick={() => setFilter('ev')}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
                filter === 'ev'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              EV Green Deals
            </button>
            <button
              onClick={() => setFilter('compact')}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
                filter === 'compact'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Compact & Hatchbacks
            </button>
          </div>
        </section>

        {/* --- OFFERS GRID --- */}
        <section className="px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div
            key={filter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredOffers.map((deal) => (
              <motion.div
                key={deal.id}
                variants={cardVariants}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 group hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  {/* Image & Badge Container */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                    <img
                      src={deal.image}
                      alt={deal.carName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-blue-600 text-white text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 sm:px-3 py-1 rounded-md shadow-md">
                      {deal.offerBadge}
                    </div>
                    <div className="absolute bottom-3 right-3 sm:right-4 bg-slate-950/90 text-amber-400 text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full border border-amber-500/30">
                      {deal.validity}
                    </div>
                  </div>

                  {/* Offer Breakdown Container */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {deal.carName}
                    </h3>
                    <div className="text-xl sm:text-2xl font-black text-blue-400 mb-4 sm:mb-6">
                      {deal.maxSavings}
                    </div>

                    {/* Breakdown Items */}
                    <div className="space-y-2 border-t border-slate-800/80 pt-3 sm:pt-4 text-xs">
                      <div className="flex items-center justify-between text-slate-300 text-[11px] sm:text-xs">
                        <span className="text-slate-500">• Direct Benefit:</span>
                        <span className="font-semibold">{deal.cashDiscount}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300 text-[11px] sm:text-xs">
                        <span className="text-slate-500">• Exchange Bonus:</span>
                        <span className="font-semibold">{deal.exchangeBonus}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300 text-[11px] sm:text-xs">
                        <span className="text-slate-500">• Special Scheme:</span>
                        <span className="font-semibold text-emerald-400">{deal.loyaltyBonus}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 sm:pt-2">
                  <Link
                    to="/contact"
                    className="block text-center w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition-all text-xs sm:text-sm shadow-md shadow-blue-600/20"
                  >
                    Claim Deal at Showroom
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* --- DEALERSHIP EXCHANGE TEASER --- */}
        <section className="px-4 sm:px-6 max-w-5xl mx-auto mt-12 sm:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-950 border border-blue-900/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div>
              <span className="text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider block mb-1">
                Old Car Upgrade Scheme
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Exchange Any Brand Old Car for a New Tata
              </h3>
              <p className="text-slate-400 text-xs max-w-lg leading-relaxed">
                Get free on-site vehicle evaluation, instant registration transfer, and up to ₹50,000 extra exchange bonus over market value.
              </p>
            </div>
            <Link
              to="/book-test-drive"
              className="w-full md:w-auto text-center bg-slate-100 hover:bg-white text-slate-950 font-bold px-6 py-3 rounded-xl transition-all text-xs shrink-0 shadow-lg"
            >
              Request Free Valuation
            </Link>
          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
}