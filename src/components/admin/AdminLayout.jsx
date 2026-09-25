import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import EnhancedLogo from '../common/EnhancedLogo';
import { 
  LayoutDashboard, Settings, Users, CalendarCheck, MessageSquare, 
  Image, LogOut, Globe, Shield, Menu, X, ArrowLeft, SlidersHorizontal, Droplets 
} from 'lucide-react';

export default function AdminLayout({ activeTab, onSelectTab, onBackToSite, children }) {
  const { user, logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'slider', label: 'Hero Banner Slider', icon: SlidersHorizontal },
    { id: 'settings', label: 'Hospital & Contact Settings', icon: Settings },
    { id: 'doctors', label: 'Specialist Doctors', icon: Users },
    { id: 'appointments', label: 'Patient Appointments', icon: CalendarCheck },
    { id: 'inquiries', label: 'Blood Bank Enquiry', icon: Droplets },
    { id: 'gallery', label: 'Media & Gallery', icon: Image },
  ];

  const handleTabClick = (tabId) => {
    onSelectTab(tabId);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col w-full overflow-x-hidden">
      
      {/* Sticky Top Admin Header */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-md w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          
          {/* Left: Mobile Burger + Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none flex-shrink-0"
              aria-label="Toggle Admin Menu"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div 
              className="cursor-pointer flex items-center gap-2 min-w-0" 
              onClick={() => handleTabClick('overview')}
            >
              <EnhancedLogo className="w-8 h-8 sm:w-10 sm:h-10" showText={false} />
              <div className="min-w-0 flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-black text-sm sm:text-base text-white tracking-tight">SANJEEVANI</span>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    Admin
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 hidden sm:block truncate">
                  Hospital Management Suite
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-xs flex-shrink-0">
            <button
              onClick={onBackToSite}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white transition-colors text-xs font-semibold"
              title="View Public Site"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline">Public Site</span>
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-rose-200 border border-rose-500/30 transition-colors text-xs font-semibold"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content with Sticky Sidebar on Desktop */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1 sticky top-20">
            <div className="p-3 mb-2 border-b border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="truncate">Logged in: <strong className="text-slate-800">{user?.username || 'Admin'}</strong></span>
            </div>

            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-3 w-full px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <IconComp className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden col-span-1 bg-white rounded-2xl p-3 border border-slate-200 shadow-xl space-y-1 mb-2 animate-in slide-in-from-top-2">
            <div className="p-2 mb-1 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Admin: <strong className="text-slate-800">{user?.username || 'Admin'}</strong></span>
              </div>
              <button
                onClick={onBackToSite}
                className="text-[11px] font-bold text-sky-600 hover:text-sky-700"
              >
                Go to Website →
              </button>
            </div>

            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-xs font-bold ${
                    isActive ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <IconComp className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Main View Area */}
        <main className="lg:col-span-9 space-y-6 w-full min-w-0">
          {children}
        </main>

      </div>

    </div>
  );
}
