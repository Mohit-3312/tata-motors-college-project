import React from 'react';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

const stats = [
  { label: 'Happy Customers', value: '5,00,000+' },
  { label: 'Safety Rating', value: '5-Star GNCAP' },
  { label: 'Authorized Centers', value: '1,400+' },
  { label: 'EV Market Share', value: '70%+' },
];

export default function About() {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="bg-slate-950 text-slate-100 min-h-screen font-sans pb-24">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-28 pb-16 px-6 max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest bg-blue-950/80 text-blue-400 border border-blue-800/50 px-4 py-1.5 rounded-full mb-4 inline-block font-semibold">
            Connecting Aspirations
          </span>
          <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Pioneering the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Indian Mobility
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            From introducing India's first fully indigenous passenger car to leading the electric vehicle revolution, Tata Motors continues to set benchmarks in safety, innovation, and sustainability.
          </p>
        </section>

        {/* --- STATS GRID --- */}
        <section className="px-6 max-w-7xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/60 border border-slate-800 rounded-3xl p-8"
          >
            {stats.map((item, idx) => (
              <div key={idx} className="text-center p-4">
                <span className="text-2xl md:text-4xl font-black text-blue-400 block mb-1">
                  {item.value}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* --- CORE PILLARS --- */}
        <section className="px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-2">Safety Standard</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                We prioritize passenger safety above all. Our high-strength steel structures and Level-2 ADAS systems deliver top GNCAP crash-test ratings.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">EV Leadership</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Powered by proprietary Ziptron liquid-cooled battery technology, we are making zero-emission electric mobility accessible across India.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="text-3xl mb-4">🇮🇳</div>
              <h3 className="text-xl font-bold text-white mb-2">Indian Engineering</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Designed and manufactured in state-of-the-art facilities across India, engineered specifically to handle diverse road terrains.
              </p>
            </div>
          </div>
        </section>

      </div>
    </ReactLenis>
  );
}