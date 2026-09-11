import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

// Motion Variants for Float-In Effect
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

export default function ElectricVehicles() {
  const [evCars, setEvcars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to format image paths correctly from database keys
  const getEvImagePath = (rawImage) => {
    if (!rawImage) return '/ev/placeholder.webp';
    // Removes trailing "_jpg", "_png", or ".jpg" stored in database rows
    const cleanName = rawImage.replace(/(_jpg|\.jpg|_png|\.png|_webp|\.webp)$/i, '');
    return `/ev/${cleanName}.webp`;
  };

  useEffect(() => {
    // Uses full Tomcat localhost URL or root proxy
    fetch('http://localhost:8080/tata_database/tata_ev_car_data_fetch')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setEvcars(data);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Savings Calculator Interactive State
  const [dailyKm, setDailyKm] = useState(40);
  const petrolCostPerYear = Math.round(((dailyKm * 365) / 15) * 100);
  const evCostPerYear = Math.round(((dailyKm * 365) / 8) * 10);
  const annualSavings = petrolCostPerYear - evCostPerYear;

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="bg-slate-950 text-slate-100 min-h-screen font-sans pb-16 sm:pb-24 overflow-x-hidden">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-20 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 max-w-7xl mx-auto text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-[500px] h-48 sm:h-[300px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          <span className="text-[10px] sm:text-xs uppercase tracking-widest bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 px-3.5 py-1 rounded-full mb-3 sm:mb-4 inline-block font-semibold">
            Zero Emissions • Ziptron Technology
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
            The Tata <span className="text-emerald-400">.ev</span> Ecosystem
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed px-2">
            Experience liquid-cooled battery technology, instant torque, and 80% lower running costs compared to conventional petrol vehicles.
          </p>
        </section>

        {/* --- CALCULATOR --- */}
        <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              <div className="flex-1 w-full">
                <span className="text-emerald-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider block mb-1 sm:mb-2">
                  Interactive Fuel vs. EV Tool
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  Calculate Your Annual Savings
                </h3>
                
                <label className="block text-slate-300 text-xs mb-2">
                  Daily Commute Distance: <span className="text-emerald-400 font-bold text-sm sm:text-base">{dailyKm} km/day</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="150"
                  value={dailyKm}
                  onChange={(e) => setDailyKm(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>10 km</span>
                  <span>80 km</span>
                  <span>150 km</span>
                </div>
              </div>

              <div className="bg-slate-950 border border-emerald-900/40 p-4 sm:p-6 rounded-xl sm:rounded-2xl w-full md:w-72 text-center">
                <span className="text-slate-400 text-[11px] sm:text-xs block mb-1">Estimated Yearly Savings</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 block mb-1 sm:mb-2">
                  ₹ {annualSavings.toLocaleString('en-IN')}
                </span>
                <p className="text-[9px] sm:text-[10px] text-slate-500">
                  Based on current fuel prices & domestic charging tariffs.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- EV CARS GRID --- */}
        <section className="px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-10">
            <div>
              <h2 className="text-emerald-400 font-semibold text-[10px] sm:text-xs tracking-widest uppercase mb-1">
                Pure Electric
              </h2>
              <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white">
                All .ev Lineup
              </h3>
            </div>
            <span className="text-slate-400 text-[11px] sm:text-xs">
              Showing {evCars.length} Electric Models
            </span>
          </div>

          {loading ? (
            <div className="text-center text-slate-400 py-16 text-sm">Loading vehicles...</div>
          ) : (
            <motion.div
              key={evCars.length}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {evCars.map((ev) => (
                <motion.div
                  key={ev.id}
                  variants={cardVariants}
                  className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative h-48 sm:h-64 overflow-hidden bg-slate-950">
                      <img
                        src={getEvImagePath(ev.imageurl)}
                        onError={(e) => {
                          // Fallback to direct raw key if the cleaned one isn't found
                          if (!e.target.dataset.triedOriginal) {
                            e.target.dataset.triedOriginal = 'true';
                            e.target.src = `/ev/${ev.imageurl}.webp`;
                            return;
                          }
                          // Final fallback if local file is missing
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop";
                        }}
                        alt={ev.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-emerald-950/90 text-emerald-400 text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full border border-emerald-800/60">
                        Ziptron Tech
                      </div>
                      <div className="absolute bottom-3 left-3 sm:left-4 bg-slate-950/80 text-slate-300 text-[9px] sm:text-[10px] font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-slate-800">
                        Battery Warranty: {ev.warranty} Years
                      </div>
                    </div>

                    {/* EV Details Container */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                        {ev.name}
                      </h3>
                      <p className="text-slate-400 text-xs mb-4 sm:mb-6">{ev.tagline}</p>

                      <div className="grid grid-cols-3 gap-2 sm:gap-3 border-t border-b border-slate-800/80 py-3 sm:py-4 mb-2 text-center text-xs">
                        <div className="bg-slate-950/50 p-1.5 sm:p-2 rounded-lg border border-slate-800">
                          <span className="block text-slate-500 text-[9px] sm:text-[10px]">Claimed Range</span>
                          <span className="font-bold text-emerald-400 text-[11px] sm:text-xs mt-0.5 block">{ev.claimedrange} km</span>
                        </div>
                        <div className="bg-slate-950/50 p-1.5 sm:p-2 rounded-lg border border-slate-800">
                          <span className="block text-slate-500 text-[9px] sm:text-[10px]">Battery Pack</span>
                          <span className="font-bold text-slate-200 text-[11px] sm:text-xs mt-0.5 block">{ev.batterycapacity} kWh</span>
                        </div>
                        <div className="bg-slate-950/50 p-1.5 sm:p-2 rounded-lg border border-slate-800">
                          <span className="block text-slate-500 text-[9px] sm:text-[10px]">DC Fast Charge</span>
                          <span className="font-bold text-slate-200 text-[11px] sm:text-xs mt-0.5 block">{ev.fastchargertime} min</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex items-center justify-between gap-2 sm:gap-4">
                    <div>
                      <span className="block text-slate-500 text-[9px] sm:text-[10px]">Ex-Showroom Price</span>
                      <span className="text-sm sm:text-lg font-bold text-white whitespace-nowrap">₹ {ev.price} Lakhs</span>
                    </div>
                    <Link
                      to="/book-test-drive"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl transition-all text-xs shadow-md shadow-emerald-600/20 whitespace-nowrap"
                    >
                      Book EV Test Drive
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

      </div>
    </ReactLenis>
  );
}