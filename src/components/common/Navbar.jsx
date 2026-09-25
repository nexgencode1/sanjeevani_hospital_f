import React, { useState, useEffect } from 'react';
import EnhancedLogo from './EnhancedLogo';
import { useHospital } from '../../context/HospitalContext';
import { useAuth } from '../../context/AuthContext';
import { CalendarCheck, Menu, X, Shield, ChevronRight } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const { settings } = useHospital();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Our Doctors' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/75 backdrop-blur-md border-b border-slate-200/50 shadow-md supports-[backdrop-filter]:bg-white/70' 
          : 'bg-white/95 backdrop-blur-sm border-b border-slate-200/80 shadow-xs'
      }`}
      style={{ position: 'sticky', top: 0 }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 gap-2 ${
          isScrolled ? 'h-15 sm:h-18' : 'h-16 sm:h-20'
        }`}>
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer transition-transform hover:scale-[1.01] flex-1 min-w-0"
          >
            <EnhancedLogo className="w-9 h-9 sm:w-12 sm:h-12" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'text-sky-700 bg-sky-50 shadow-xs'
                      : 'text-slate-600 hover:text-sky-700 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA & Admin Status */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg border border-emerald-300 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                Admin
              </button>
            )}

            <button
              onClick={() => handleNavClick('booking')}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Actions Button */}
          <div className="flex lg:hidden items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => handleNavClick('booking')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 shadow-xs active:bg-emerald-700"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:text-sky-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-sky-700 bg-sky-50 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => handleNavClick('booking')}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-sky-600 hover:bg-sky-700 shadow-md"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Doctor Appointment</span>
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300"
              >
                <Shield className="w-4 h-4" />
                Go to Admin Dashboard
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('admin-login')}
                className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                <Shield className="w-3.5 h-3.5" />
                Staff / Doctor Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
