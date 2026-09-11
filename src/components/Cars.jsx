import React, { useEffect, useState } from 'react';
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
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'ev', 'ice'

  useEffect(() => {
    fetch('api/tata_database/tata_cars_data_fetch')
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-white text-center pt-32">Loading cars data...</div>;
  }

  // Filter cars dynamically based on user category choice
  const filteredCars = cars.filter((car) => {
    if (filter === 'ev') return car.type === 'ev';
    if (filter === 'ice') return car.type === 'ice';
    return true;
  });

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="bg-slate-950 text-slate-100 min-h-screen font-sans pb-24">
        
        {/* --- HEADER SECTION --- */}
        <section className="pt-28 pb-12 px-6 max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest bg-blue-950/80 text-blue-400 border border-blue-800/50 px-4 py-1.5 rounded-full mb-4 inline-block font-semibold">
            Tata Motors Collection
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Explore All Vehicles
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Browse through our wide range of 5-star GNCAP safety rated electric cars, high-performance SUVs, and eco-friendly CNG vehicles.
          </p>

          {/* Category Filter Buttons */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Models ({cars.length})
            </button>
            <button
              onClick={() => setFilter('ev')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                filter === 'ev'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Electric Vehicles (.ev)
            </button>
            <button
              onClick={() => setFilter('ice')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                filter === 'ice'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Petrol / Diesel / CNG
            </button>
          </div>
        </section>

        {/* --- CARDS GRID --- */}
        <section className="px-6 max-w-7xl mx-auto">
          <motion.div
            key={filter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCars.map((car) => (
              <motion.div
                key={car.id}
                variants={cardVariants}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 group hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-slate-950 flex items-center justify-center">
                    <img
                      src={`/car/${car.imageUrl}.avif`} // Updated to map imageUrl column
                      alt={car.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 right-4 bg-blue-950/90 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full border border-blue-800/60">
                      {car.safetyRating}-Star GNCAP
                    </div>
                    <div className="absolute bottom-3 left-4 bg-slate-950/80 text-slate-300 text-[10px] font-medium px-2.5 py-1 rounded-md border border-slate-800">
                      {car.fuelType}
                    </div>
                  </div>

                  {/* Details Container */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-slate-400 text-xs mb-6">{car.tagline}</p>

                    <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-800/80 py-4 mb-2 text-sm">
                      <div>
                        <span className="block text-slate-500 text-xs">Starting At</span>
                        <span className="font-semibold text-blue-400">₹ {car.price} Lakh</span>
                      </div>
                      <div>
                        <span className="block text-slate-500 text-xs">Efficiency</span>
                        <span className="font-semibold text-slate-200">
                          {car.type === 'ev' ? `${car.rangeOrMileage} km Range` : `${car.rangeOrMileage} kmpl`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 pb-6 flex gap-3">
                  <Link
                    to="/book-test-drive"
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition-all text-xs shadow-md shadow-blue-600/20"
                  >
                    Book Test Drive
                  </Link>
                  <Link
                    to="/finance"
                    className="px-4 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white font-medium py-2.5 rounded-xl transition-all text-xs bg-slate-950/50"
                  >
                    EMI
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
}