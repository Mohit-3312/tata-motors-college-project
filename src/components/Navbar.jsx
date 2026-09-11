import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Styling helper for active routes using NavLink
  const navLinkStyle = ({ isActive }) =>
    `text-sm font-medium transition-colors relative py-1 ${
      isActive
        ? 'text-blue-400 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:rounded-full'
        : 'text-slate-300 hover:text-blue-400'
    }`;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cars', path: '/cars' },
    { name: 'EV Zone', path: '/ev' },
    { name: 'Offers', path: '/offers' },
    { name: 'Finance', path: '/finance' },
    { name: 'Service', path: '/service' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-black tracking-widest text-blue-500 flex items-center gap-1">
          TATA <span className="text-white text-sm font-medium tracking-normal">MOTORS</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path} 
              end={link.path === '/'} 
              className={navLinkStyle}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center">
          <Link
            to="/book-test-drive"
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-600/30 border border-blue-400/20"
          >
            Book Test Drive
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-slate-300 hover:text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-base font-medium py-1 ${
                  isActive ? 'text-blue-400 font-semibold' : 'text-slate-300 hover:text-blue-400'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/book-test-drive"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-sm mt-4"
          >
            Book Test Drive
          </Link>
        </div>
      )}
    </header>
  );
}