import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

// --- MOCK SERVICES ARRAY ---
const servicesList = [
  {
    id: 'periodic',
    title: 'Periodic Maintenance',
    badge: 'Scheduled',
    description: 'Comprehensive 40+ point checkup, engine oil replacement, brake pad tuning, filter changes, and wheel alignment.',
    features: ['Free Pick-up & Drop', 'Genuine Spare Parts', 'Digital Health Report'],
    estimatedTime: '2 - 3 Hours',
    icon: '⚙️',
  },
  {
    id: 'ezserve',
    title: 'EzServe Doorstep Service',
    badge: 'At Home',
    description: 'Mobile two-wheeler units equipped with specialized tools and mechanics for minor repairs & routine servicing right at your doorstep.',
    features: ['Zero Travel Needed', 'On-site Vacuuming', 'Emergency Quick Repairs'],
    estimatedTime: '45 - 60 Mins',
    icon: '🛵',
  },
  {
    id: 'rsa',
    title: '24x7 Roadside Assistance',
    badge: 'Emergency',
    description: 'Country-wide emergency breakdown support including towing assistance, battery jump-start, flat tire replacement, and fuel delivery.',
    features: ['Toll-Free Support 1800-209-7979', 'Pan-India Coverage', '60-Min City SLA'],
    estimatedTime: 'Immediate Dispatch',
    icon: '🚨',
  },
  {
    id: 'amc',
    title: 'Value Care AMC',
    badge: 'Protection Plan',
    description: 'Annual Maintenance Contracts protecting against inflation on consumables, spare parts, and labor costs for up to 5 years.',
    features: ['Substantial Cost Savings', 'Inflation Shield', 'Transferable Warranty'],
    estimatedTime: '1 - 5 Years Coverage',
    icon: '🛡️',
  },
  {
    id: 'speedo',
    title: 'Speed-O-Service',
    badge: 'Express',
    description: 'Ultra-fast service bays delivering 90-minute complete general service or 30-minute minor bulb/puncture fixes.',
    features: ['Dedicated Service Bay', 'Express Technicians', 'Time-Bound Guarantee'],
    estimatedTime: '90 Minutes Max',
    icon: '⚡',
  },
  {
    id: 'warranty',
    title: 'Extended Warranty',
    badge: 'Long-term',
    description: 'Extend your vehicle warranty for up to 5 years or 1,50,000 km to protect against mechanical & electrical component failures.',
    features: ['100% Cashless Repair', 'Nationwide Workshop Acceptability'],
    estimatedTime: 'Up to 1.5 Lakh KM',
    icon: '📜',
  },
];

// Motion Variants for Staggered Float-In
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function Service() {
  // Booking Form State
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    carModel: 'Tata Curvv.ev',
    serviceType: 'Periodic Maintenance',
    preferredDate: '',
    notes: '',
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Handle Form Submission
 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('api/tata_database/service_data_store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setBookingSuccess(true);
        setFormData({
          customerName: '',
          phone: '',
          carModel: 'Tata Curvv.ev',
          serviceType: 'Periodic Maintenance',
          preferredDate: '',
          notes: '',
        });
        setTimeout(() => setBookingSuccess(false), 5000);
      } else {
        alert('Booking failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      alert('Could not connect to the server. Check Tomcat and MySQL on port 3307.');
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="bg-slate-950 text-slate-100 min-h-screen font-sans pb-24">
        
        {/* --- HERO / HEADER --- */}
        <section className="relative pt-28 pb-12 px-6 max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest bg-blue-950/80 text-blue-400 border border-blue-800/50 px-4 py-1.5 rounded-full mb-4 inline-block font-semibold">
            Tata Care Authorized After-Sales
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Best-In-Class Vehicle Service
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Keep your vehicle running like new with certified factory-trained technicians, 100% genuine spare parts, and doorstep EzServe support.
          </p>
        </section>

        {/* --- SERVICE OFFERINGS GRID (FLOAT-IN CARDS LOCK IN PLACE) --- */}
        <section className="px-6 max-w-7xl mx-auto mb-20">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-blue-500 font-semibold text-xs tracking-widest uppercase mb-1">
              Authorized Programs
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Our Maintenance Solutions
            </h3>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }} // Animates once and stays permanently locked
          >
            {servicesList.map((srv) => (
              <motion.div
                key={srv.id}
                variants={cardVariants}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{srv.icon}</span>
                    <span className="bg-blue-950/80 text-blue-400 text-[10px] font-semibold uppercase px-3 py-1 rounded-full border border-blue-800/60">
                      {srv.badge}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {srv.title}
                  </h4>
                  <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-800/80 pt-4 text-xs mb-6">
                    {srv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center text-slate-300 gap-2">
                        <span className="text-blue-400 text-sm">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Duration:</span>
                  <span className="text-slate-200 font-semibold">{srv.estimatedTime}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* --- BOOK SERVICE APPOINTMENT FORM --- */}
        <section className="px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="mb-8 text-center">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-wider block mb-1">
                Easy Online Slot Booking
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Book a Service Appointment
              </h3>
              <p className="text-slate-400 text-xs mt-2">
                Fill out the form below to reserve your service bay or request EzServe doorstep pickup.
              </p>
            </div>

            {bookingSuccess && (
              <div className="mb-6 p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-400 text-xs text-center font-medium">
                ✓ Service request received! Our service advisor will call you shortly to confirm your slot.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div>
                  <label className="block text-slate-300 text-xs mb-2">Customer Name</label>
                  <input
                    type="text"
                    required
                    pattern="[A-Za-z ]+"
                    title="Name should contain alphabets only"
                    placeholder="Enter your full name"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-slate-300 text-xs mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    title="Phone number must contain exactly 10 digits"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Vehicle Select */}
                <div>
                  <label className="block text-slate-300 text-xs mb-2">Select Vehicle</label>
                  <select
                    value={formData.carModel}
                    onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Tata Curvv.ev">Tata Curvv.ev</option>
                    <option value="Tata Harrier Dark">Tata Harrier Dark</option>
                    <option value="Tata Nexon.ev">Tata Nexon.ev</option>
                    <option value="Tata Safari Gold">Tata Safari Gold</option>
                    <option value="Tata Punch.ev">Tata Punch.ev</option>
                    <option value="Tata Altroz iCNG">Tata Altroz iCNG</option>
                  </select>
                </div>

                {/* Service Type Select */}
                <div>
                  <label className="block text-slate-300 text-xs mb-2">Service Package</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Periodic Maintenance">Periodic Maintenance</option>
                    <option value="EzServe Doorstep Service">EzServe Doorstep Service</option>
                    <option value="Speed-O-Service (90 Mins)">Speed-O-Service (90 Mins)</option>
                    <option value="Value Care AMC Inquiry">Value Care AMC Inquiry</option>
                    <option value="General Inspection & Repairs">General Inspection & Repairs</option>
                  </select>
                </div>

              </div>

              {/* Date Input */}
              <div>
                <label className="block text-slate-300 text-xs mb-2">Preferred Appointment Date</label>
                <input
                  type="date"
                  required
                   min={new Date().toISOString().split("T")[0]}
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 [color-scheme:dark]"

                  />
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-slate-300 text-xs mb-2">Specific Issues / Notes (Optional)</label>
                <textarea
                  rows="3"
                  placeholder="Describe any issues e.g. brake noise, AC cleaning, battery check..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all text-xs shadow-lg shadow-blue-600/30"
              >
                Confirm Service Appointment
              </button>
            </form>
          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
}