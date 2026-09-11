import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('api/tata_database/contact_data_store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Failed to submit: ' + data.message);
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      alert('Could not connect to the server. Check if Tomcat and MySQL are running.');
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="bg-slate-950 text-slate-100 min-h-screen font-sans pb-24">
        
        {/* --- HEADER --- */}
        <section className="relative pt-28 pb-12 px-6 max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest bg-blue-950/80 text-blue-400 border border-blue-800/50 px-4 py-1.5 rounded-full mb-4 inline-block font-semibold">
            Dealership Support
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Get in Touch With Us
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Have questions about vehicle availability, pricing, finance schemes, or booking? Our dealership team is here to assist you.
          </p>
        </section>

        {/* --- MAIN GRID --- */}
        <section className="px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* LEFT: SHOWROOM INFORMATION */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-8"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">
                  Showroom Headquarters
                </h3>
                
                <div className="space-y-6 text-xs">
                  <div>
                    <span className="text-slate-500 block mb-1">📍 Address:</span>
                    <p className="text-slate-200 font-medium leading-relaxed">
                      Tata Motors Authorized Showroom, Main Ring Road, Industrial Area, Junagadh, Gujarat - 362001
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1">📞 Customer Support Hotline:</span>
                    <p className="text-blue-400 font-bold text-sm">1800-209-8282 (Toll-Free)</p>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1">🚨 24x7 Roadside Assistance:</span>
                    <p className="text-white font-semibold">1800-209-7979</p>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1">✉️ Email Inquiry:</span>
                    <p className="text-slate-200">customercare@tatamotors.com</p>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1">⏰ Working Hours:</span>
                    <p className="text-slate-200">Monday – Sunday: 9:00 AM – 8:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: INQUIRY FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-2">Send Us a Message</h3>
              <p className="text-slate-400 text-xs mb-6">
                Fill in your details below and a showroom executive will get back to you within 24 hours.
              </p>

              {submitted && (
                <div className="mb-6 p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-400 text-xs font-medium">
                  ✓ Your message has been sent successfully! We will contact you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-xs mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      pattern="[A-Za-z ]+"
                      title="Name should contain alphabets only"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-xs mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      title="Phone number must contain exactly 10 digits"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-xs mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-xs mb-1.5">Inquiry Type</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="New Vehicle Purchase">New Vehicle Purchase</option>
                    <option value="Finance & EMI Options">Finance & EMI Options</option>
                    <option value="Test Drive Booking">Test Drive Booking</option>
                    <option value="Service & Warranty">Service & Warranty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 text-xs mb-1.5">Your Message</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Type your query or requirements here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all text-xs shadow-lg shadow-blue-600/30"
                >
                  Submit Inquiry
                </button>
              </form>
            </motion.div>

          </div>
        </section>

      </div>
    </ReactLenis>
  );
}