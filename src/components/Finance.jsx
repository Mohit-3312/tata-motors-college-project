import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

// --- CAR INVENTORY DATA ARRAY ---
// (Connect this to fetch('/api/cars') when backend API is ready)
const initialCarsData = [
  {
    id: 1,
    name: 'Tata Curvv.ev',
    exShowroom: 1749000,
    rtoRate: 0.06, // 6% RTO
    insuranceCost: 62000,
    category: 'ev',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Tata Harrier Dark',
    exShowroom: 1549000,
    rtoRate: 0.10, // 10% RTO
    insuranceCost: 58000,
    category: 'suv',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Tata Nexon.ev',
    exShowroom: 1249000,
    rtoRate: 0.06,
    insuranceCost: 45000,
    category: 'ev',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Tata Safari Gold',
    exShowroom: 1619000,
    rtoRate: 0.10,
    insuranceCost: 61000,
    category: 'suv',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Tata Punch.ev',
    exShowroom: 1099000,
    rtoRate: 0.06,
    insuranceCost: 38000,
    category: 'ev',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Tata Altroz iCNG',
    exShowroom: 665000,
    rtoRate: 0.06,
    insuranceCost: 28000,
    category: 'hatchback',
    image: 'https://images.unsplash.com/photo-1541348263662-e082662d82da?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Finance() {
  const [cars] = useState(initialCarsData);
  const [selectedCarId, setSelectedCarId] = useState(1);

  // Financial Sliders State
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20%
  const [interestRate, setInterestRate] = useState(8.5);            // 8.5%
  const [loanTenureYears, setLoanTenureYears] = useState(5);         // 5 years

  // Find currently selected car
  const selectedCar = cars.find((c) => c.id === Number(selectedCarId)) || cars[0];

  // --- FINANCIAL CALCULATIONS ---
  const exShowroom = selectedCar.exShowroom;
  const rtoTax = Math.round(exShowroom * selectedCar.rtoRate);
  const insurance = selectedCar.insuranceCost;
  const fastagAndRegistration = 2500;
  
  // TCS (1% Tax Collected at Source on cars priced > 10 Lakhs)
  const tcsTax = exShowroom > 1000000 ? Math.round(exShowroom * 0.01) : 0;

  // Total Estimated On-Road Price
  const totalOnRoadPrice = exShowroom + rtoTax + insurance + fastagAndRegistration + tcsTax;

  // EMI Logic
  const downPaymentAmount = Math.round((totalOnRoadPrice * downPaymentPercent) / 100);
  const loanPrincipal = totalOnRoadPrice - downPaymentAmount;
  
  const monthlyInterestRate = interestRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;

  // Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateEMI = () => {
    if (loanPrincipal <= 0) return 0;
    const emi =
      (loanPrincipal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalMonths)) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    return Math.round(emi);
  };

  const monthlyEmi = calculateEMI();
  const totalAmountPayable = downPaymentAmount + monthlyEmi * totalMonths;
  const totalInterestPayable = Math.round(totalAmountPayable - totalOnRoadPrice);

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="bg-slate-950 text-slate-100 min-h-screen font-sans pb-24">
        
        {/* --- HEADER --- */}
        <section className="relative pt-28 pb-12 px-6 max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest bg-blue-950/80 text-blue-400 border border-blue-800/50 px-4 py-1.5 rounded-full mb-4 inline-block font-semibold">
            Tata Financial Services
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            On-Road Price & EMI Estimator
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Select any vehicle to view itemized pricing including RTO taxes, insurance, TCS, and customized monthly loan payment terms.
          </p>
        </section>

        {/* --- MAIN CALCULATOR GRID --- */}
        <section className="px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* LEFT COLUMN: VEHICLE SELECTOR & SLIDERS (7 COLS) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8"
            >
              {/* 1. Vehicle Dropdown Selector */}
              <div>
                <label className="block text-white font-bold text-sm mb-2">
                  Select Vehicle Model
                </label>
                <select
                  value={selectedCarId}
                  onChange={(e) => setSelectedCarId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 font-medium"
                >
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name} — Ex-Showroom ₹{(car.exShowroom / 100000).toFixed(2)} Lakh
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Car Preview */}
              <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute bottom-3 left-4 bg-slate-950/90 text-white font-bold text-base px-3 py-1 rounded-lg border border-slate-800">
                  {selectedCar.name}
                </div>
              </div>

              {/* 2. Down Payment Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Down Payment ({downPaymentPercent}%)</span>
                  <span className="text-blue-400 font-bold text-sm">
                    ₹ {downPaymentAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="70"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                />
              </div>

              {/* 3. Interest Rate Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Annual Interest Rate</span>
                  <span className="text-blue-400 font-bold text-sm">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="6.5"
                  max="14.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                />
              </div>

              {/* 4. Loan Tenure Selector */}
              <div className="space-y-2">
                <span className="block text-slate-400 text-xs mb-2">Loan Tenure</span>
                <div className="grid grid-cols-5 gap-2">
                  {[3, 4, 5, 6, 7].map((years) => (
                    <button
                      key={years}
                      onClick={() => setLoanTenureYears(years)}
                      className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                        loanTenureYears === years
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {years} Yrs
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: ITEMIZED COST & EMI SUMMARY (5 COLS) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-4">
                  Itemized On-Road Breakup
                </h3>

                <div className="space-y-3 text-xs mb-8">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Ex-Showroom Price:</span>
                    <span className="font-semibold">₹ {exShowroom.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">RTO / Registration Tax:</span>
                    <span className="font-semibold">₹ {rtoTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Comprehensive Insurance:</span>
                    <span className="font-semibold">₹ {insurance.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">FASTag & Registration Fee:</span>
                    <span className="font-semibold">₹ {fastagAndRegistration.toLocaleString('en-IN')}</span>
                  </div>
                  {tcsTax > 0 && (
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-500">TCS (1% Income Tax &gt; ₹10L):</span>
                      <span className="font-semibold text-amber-400">₹ {tcsTax.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-white font-bold text-sm border-t border-slate-800 pt-4 mt-2">
                    <span>Estimated On-Road Price:</span>
                    <span className="text-blue-400">₹ {totalOnRoadPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* EMI Output Card */}
                <div className="bg-slate-950 border border-blue-900/50 rounded-2xl p-6 text-center shadow-xl">
                  <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                    Estimated Monthly EMI
                  </span>
                  <span className="text-3xl md:text-4xl font-black text-blue-400 block mb-2">
                    ₹ {monthlyEmi.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-400">/ mo</span>
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 border-t border-slate-800/80 pt-3 mt-3">
                    <div>
                      <span>Loan Amount:</span>
                      <span className="block text-slate-200 font-semibold">
                        ₹ {loanPrincipal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div>
                      <span>Total Interest:</span>
                      <span className="block text-slate-200 font-semibold">
                        ₹ {totalInterestPayable.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all text-xs shadow-lg shadow-blue-600/30">
                  Apply for Loan Approval
                </button>
                <p className="text-[10px] text-slate-500 text-center">
                  *Ex-showroom prices & taxes are estimates and vary by region and state policies.
                </p>
              </div>

            </motion.div>

          </div>
        </section>

      </div>
    </ReactLenis>
  );
}