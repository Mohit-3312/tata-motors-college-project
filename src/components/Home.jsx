import React from 'react';
import { Link } from 'react-router';
import { ReactTyped } from 'react-typed';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

// Animation variants for staggered float-in cards
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
  hidden: { opacity: 0, y: 55 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function Home() {
  const featuredCars = [
    {
      id: 'curvv',
      name: 'Tata Curvv.ev',
      tagline: 'Shaped to Break the Mold',
      price: '₹ 17.49 Lakh',
      range: '585 km',
      safety: '5-Star GNCAP',
      category: 'Electric Coupe SUV',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'harrier',
      name: 'Tata Harrier Dark',
      tagline: 'Above All, Above Everyone',
      price: '₹ 15.49 Lakh',
      range: '16.8 km/l',
      safety: '5-Star GNCAP',
      category: 'Premium SUV',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'nexon',
      name: 'Tata Nexon.ev',
      tagline: 'Way Ahead of Its Time',
      price: '₹ 12.49 Lakh',
      range: '465 km',
      safety: '5-Star GNCAP',
      category: 'Compact EV SUV',
      image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const highlights = [
    { title: 'GNCAP 5-Star Safety', desc: 'Reinforced high-strength steel chassis & 6 standard airbags across models.' },
    { title: 'iRA 2.0 Connected Tech', desc: 'Remote vehicle diagnostics, smart watch connectivity & over-the-air updates.' },
    { title: 'Zero Emission EV Mobility', desc: 'Pioneering liquid-cooled Ziptron technology with up to 585 km range.' },
  ];

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
        
        {/* --- HERO SECTION WITH AUTO-TYPING TEXT --- */}
        <section className="relative pt-20 md:pt-24 pb-14 md:pb-20 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-h-[75vh] md:min-h-[85vh]">
          {/* Ambient Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] sm:text-xs uppercase tracking-widest bg-blue-950/80 text-blue-400 border border-blue-800/50 px-3.5 py-1.5 rounded-full mb-5 sm:mb-6 font-semibold max-w-[90%]"
          >
            New Era of Indian Automotive Innovation
          </motion.span>

          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 leading-tight max-w-5xl">
            Engineered for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">
              <ReactTyped
                strings={[
                  '5-Star GNCAP Safety Standards.',
                  'Pure Electric Performance.',
                  'Next-Gen ADAS Autonomous Tech.',
                  'Unmatched Luxury & Comfort.',
                ]}
                typeSpeed={100}
                backSpeed={50}
                backDelay={2000}
                loop
              />
            </span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 leading-relaxed px-2">
            Discover India’s safest and most technologically advanced passenger vehicles. Explore our flagship range of EVs, SUVs, and luxury sedans.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto z-10 px-2 sm:px-0">
            <Link
              to="/cars"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl transition-all shadow-xl shadow-blue-600/25 text-sm text-center"
            >
              Explore Vehicles
            </Link>
            <Link
              to="/book-test-drive"
              className="border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl transition-all bg-slate-900/50 text-sm text-center"
            >
              Book Free Test Drive
            </Link>
          </div>
        </section>

        {/* --- CARDS FLOAT-IN & LOCK IN PLACE SECTION --- */}
        <section className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <div>
              <h2 className="text-blue-500 font-semibold text-xs tracking-widest uppercase mb-1.5 sm:mb-2">
                Showroom Highlights
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Featured Lineup
              </h3>
            </div>
            <Link to="/cars" className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium mt-3 md:mt-0 flex items-center gap-1">
              View All Models →
            </Link>
          </div>

          {/* Grid with Framer Motion viewport reveal */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {featuredCars.map((car) => (
              <motion.div
                key={car.id}
                variants={cardVariants}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 group hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-950">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-blue-950/90 text-blue-400 text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full border border-blue-800/60">
                      {car.safety}
                    </div>
                    <div className="absolute bottom-3 left-3 sm:left-4 bg-slate-950/80 text-slate-300 text-[10px] font-medium px-2.5 py-1 rounded-md border border-slate-800">
                      {car.category}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {car.name}
                    </h4>
                    <p className="text-slate-400 text-xs mb-4 sm:mb-6">{car.tagline}</p>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 border-t border-b border-slate-800/80 py-3 sm:py-4 mb-4 sm:mb-6 text-sm">
                      <div>
                        <span className="block text-slate-500 text-[10px] sm:text-xs">Starting Price</span>
                        <span className="font-semibold text-blue-400 text-xs sm:text-sm">{car.price}</span>
                      </div>
                      <div>
                        <span className="block text-slate-500 text-[10px] sm:text-xs">Range / Mileage</span>
                        <span className="font-semibold text-slate-200 text-xs sm:text-sm">{car.range}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <Link
                    to="/book-test-drive"
                    className="block text-center w-full bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white font-medium py-2.5 rounded-xl transition-all text-xs sm:text-sm"
                  >
                    Test Drive {car.name.split(' ')[1]}
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* --- BRAND HIGHLIGHTS --- */}
        <section className="py-10 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-950 border border-blue-900/40 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden"
          >
            <div className="mb-6 sm:mb-8">
              <span className="text-blue-400 font-bold tracking-wider text-[10px] sm:text-xs uppercase mb-1.5 sm:mb-2 block">
                Why Tata Motors?
              </span>
              <h3 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white">
                Built to Protect, Designed to Inspire
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="bg-slate-950/50 border border-slate-800/80 p-4 sm:p-6 rounded-xl sm:rounded-2xl">
                  <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs sm:text-sm mb-3 sm:mb-4">
                    0{idx + 1}
                  </div>
                  <h4 className="text-white font-bold text-sm sm:text-base mb-1.5 sm:mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-t border-slate-800/80 pt-6 sm:pt-8">
              <p className="text-xs text-slate-400">
                Ready to feel the experience? Schedule your dealership visit today.
              </p>
              <Link
                to="/contact"
                className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-md shadow-blue-600/20"
              >
                Locate Nearest Showroom
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
}