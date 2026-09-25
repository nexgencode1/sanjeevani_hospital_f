import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { PhoneCall, X, PhoneForwarded, Sparkles } from 'lucide-react';
import HospitalChatbot from './HospitalChatbot';

// High-fidelity authentic WhatsApp SVG icon
const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

// Modern Friendly AI Chatbot SVG Icon
const ChatBotIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Antenna */}
    <path d="M12 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="2" r="1.5" fill="currentColor" />
    
    {/* Chat Robot Head Body */}
    <path 
      d="M5 6h14a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-4l-3 3-1-3H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" 
      fill="currentColor" 
      fillOpacity="0.2"
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinejoin="round" 
    />
    
    {/* Robot Side Ears */}
    <rect x="0.5" y="9.5" width="2" height="4" rx="1" fill="currentColor" />
    <rect x="21.5" y="9.5" width="2" height="4" rx="1" fill="currentColor" />
    
    {/* Friendly Robot Eyes */}
    <circle cx="8.5" cy="11.5" r="1.75" fill="currentColor" />
    <circle cx="15.5" cy="11.5" r="1.75" fill="currentColor" />
    
    {/* Smile */}
    <path 
      d="M9.5 14.5c.8.8 1.7 1 2.5 1s1.7-.2 2.5-1" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
    />
  </svg>
);

export default function FloatingActions({ activeTab, onOpenBooking }) {
  const { settings } = useHospital();
  const [chatOpen, setChatOpen] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  // Cleanly hide on admin dashboard / login routes
  if (activeTab === 'admin-login' || activeTab === 'admin-dashboard') {
    return null;
  }

  const primaryPhone = settings?.primaryPhone || '9455304235';
  const emergencyPhone = settings?.emergencyPhone || '7897284402';
  const helplinePhone = settings?.helplinePhone || '6307821195';
  const whatsappNumber = settings?.whatsappNumber || '919455304235';

  const whatsappMessage = encodeURIComponent(
    `Hello Sanjeevani Hospital (Kaushambi), I would like to inquire regarding doctor consultation & hospital services.`
  );

  return (
    <>
      {/* Floating Action Cluster - Bottom Right Fixed */}
      <div className="fixed bottom-4 right-3 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 select-none pointer-events-auto">
        
        {/* 1. Authentic WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg shadow-[#25D366]/40 border-2 border-white/20 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Chat on WhatsApp"
        >
          <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none hidden sm:inline border border-slate-800">
            WhatsApp Inquiry
          </span>
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </a>

        {/* 2. Direct Call Helpline Button */}
        <div className="relative">
          <button
            onClick={() => setShowPhoneModal(!showPhoneModal)}
            className="group relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 bg-sky-600 hover:bg-sky-500 text-white rounded-full shadow-lg shadow-sky-600/30 hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
            title="Emergency Call Helpline"
          >
            <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none hidden sm:inline border border-slate-800">
              24x7 Call Helpline
            </span>
            <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Quick Phone Selector Dropup */}
          {showPhoneModal && (
            <div className="absolute bottom-14 sm:bottom-16 right-0 w-64 sm:w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 sm:p-4 space-y-2.5 animate-in slide-in-from-bottom-3 duration-200 z-50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Hospital Helplines</h4>
                  <p className="text-[10px] text-slate-500">Tap to dial instantly</p>
                </div>
                <button
                  onClick={() => setShowPhoneModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <a
                  href={`tel:${primaryPhone}`}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition-all group"
                >
                  <div>
                    <span className="font-bold text-slate-800 group-hover:text-sky-700 block text-xs">
                      +91 {primaryPhone}
                    </span>
                    <span className="text-[10px] text-slate-500">Main Hospital Helpline</span>
                  </div>
                  <PhoneForwarded className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600" />
                </a>

                <a
                  href={`tel:${emergencyPhone}`}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition-all group"
                >
                  <div>
                    <span className="font-bold text-slate-800 group-hover:text-sky-700 block text-xs">
                      +91 {emergencyPhone}
                    </span>
                    <span className="text-[10px] text-slate-500">24x7 Emergency & Trauma</span>
                  </div>
                  <PhoneForwarded className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600" />
                </a>

                <a
                  href={`tel:${helplinePhone}`}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition-all group"
                >
                  <div>
                    <span className="font-bold text-slate-800 group-hover:text-sky-700 block text-xs">
                      +91 {helplinePhone}
                    </span>
                    <span className="text-[10px] text-slate-500">Ambulance & Blood Bank</span>
                  </div>
                  <PhoneForwarded className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 3. AI Smart Medical Assistant Button with Dedicated Chatbot Avatar & Badge */}
        <div className="relative">
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-sky-600 to-sky-800 hover:from-sky-500 hover:to-sky-700 text-white rounded-full shadow-xl shadow-sky-900/40 transition-all duration-200 transform hover:scale-105 active:scale-95 border-2 border-white/30 cursor-pointer"
            title="Sanjeevani AI Medical Chatbot"
          >
            {/* Hover Tooltip */}
            <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none hidden sm:inline border border-slate-800">
              AI Medical Chatbot
            </span>

            {/* Glowing Pulse */}
            <span className="absolute inset-0 rounded-full bg-sky-400 opacity-25 animate-ping pointer-events-none"></span>

            {/* Micro AI badge */}
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-sky-500 text-white font-black text-[9px] border border-slate-900 shadow-sm flex items-center gap-0.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              AI
            </span>

            {chatOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <ChatBotIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            )}
          </button>
        </div>

      </div>

      {/* Chatbot Window */}
      <HospitalChatbot
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onOpenBooking={onOpenBooking}
      />
    </>
  );
}
