import React from 'react';
import { Link } from 'react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- TOP ROW: BRAND & NEWSLETTER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="text-2xl font-black tracking-widest text-blue-500 inline-flex items-center gap-1">
              TATA <span className="text-white text-sm font-medium tracking-normal">MOTORS SHOWROOM</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Experience the future of Indian engineering. From 5-Star GNCAP safety-rated SUVs to pioneering zero-emission electric vehicles. Visit our authorized showroom for exclusive deals and personalized finance plans.
            </p>
            {/* Showroom Working Hours */}
            <div className="pt-2 text-xs text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Showroom Timings: Mon – Sun (9:00 AM – 8:00 PM)
            </div>
          </div>

          {/* Newsletter / Test Drive Teaser */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-bold text-base">Stay Updated on New Launches</h4>
              <p className="text-xs text-slate-400 mt-1">Subscribe for exclusive discount offers, price drops & festive deals.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-auto flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full md:w-56"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition-all shrink-0 shadow-md shadow-blue-600/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* --- MIDDLE ROW: NAVIGATION & QUICK LINKS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 border-b border-slate-800/80 text-sm">
          
          {/* Column 1: Main Navigation */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase">Showroom</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home Page</Link></li>
              <li><Link to="/cars" className="hover:text-blue-400 transition-colors">All Cars & SUVs</Link></li>
              <li><Link to="/ev" className="hover:text-blue-400 transition-colors">Electric Vehicles (EV)</Link></li>
              <li><Link to="/offers" className="hover:text-blue-400 transition-colors">Festive & Special Offers</Link></li>
            </ul>
          </div>

          {/* Column 2: Customer Services */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase">Services</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/finance" className="hover:text-blue-400 transition-colors">Car Finance & EMI</Link></li>
              <li><Link to="/service" className="hover:text-blue-400 transition-colors">Book Maintenance Service</Link></li>
              <li><Link to="/book-test-drive" className="hover:text-blue-400 transition-colors">Schedule Test Drive</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Dealer Location & Inquiry</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase">Company</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Showroom</Link></li>
              <li><a href="#safety" className="hover:text-blue-400 transition-colors">GNCAP 5-Star Safety</a></li>
              <li><a href="#technology" className="hover:text-blue-400 transition-colors">iRA Connected Car Tech</a></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Careers & Dealership</Link></li>
            </ul>
          </div>

          {/* Column 4: Popular Lineup */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase">Popular Models</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/cars" className="hover:text-blue-400 transition-colors">Tata Curvv / Curvv.ev</Link></li>
              <li><Link to="/cars" className="hover:text-blue-400 transition-colors">Tata Nexon / Nexon.ev</Link></li>
              <li><Link to="/cars" className="hover:text-blue-400 transition-colors">Tata Harrier Dark Edition</Link></li>
              <li><Link to="/cars" className="hover:text-blue-400 transition-colors">Tata Safari 7-Seater</Link></li>
              <li><Link to="/cars" className="hover:text-blue-400 transition-colors">Tata Punch & Tiago.ev</Link></li>
            </ul>
          </div>

          {/* Column 5: Showroom Support & Hotline */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-3">
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase">24/7 Assistance</h5>
            <div className="space-y-2 text-xs">
              <div>
                <p className="text-slate-400">Toll-Free Customer Care:</p>
                <p className="text-blue-400 font-semibold text-sm">1800-209-8282</p>
              </div>
              <div>
                <p className="text-slate-400">Roadside Assistance (24x7):</p>
                <p className="text-white font-semibold">1800-209-7979</p>
              </div>
              <p className="text-slate-400 pt-2">Email: <span className="text-slate-300">customercare@tatamotors.com</span></p>
            </div>
          </div>

        </div>

        {/* --- BOTTOM ROW: COPYRIGHT & LEGAL --- */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          <p>© {currentYear} Tata Motors Passenger Vehicles Limited. All Rights Reserved. Built for Showroom Practice.</p>

          <div className="flex items-center space-x-6">
            <Link to="/invalid" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/invalid" className="hover:text-slate-300 transition-colors">Terms of Use</Link>
            <Link to="/invalid" className="hover:text-slate-300 transition-colors">Legal Disclaimer</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}