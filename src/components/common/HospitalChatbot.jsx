import React, { useState, useEffect, useRef } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { 
  Bot, Send, X, User, Sparkles, Calendar, Phone, MapPin, 
  Clock, ShieldCheck, HeartPulse, CheckCircle2, ChevronRight 
} from 'lucide-react';
import EnhancedLogo from './EnhancedLogo';

// Modern Friendly AI Chatbot SVG Icon
const ChatBotIcon = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="2" r="1.5" fill="currentColor" />
    <path 
      d="M5 6h14a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-4l-3 3-1-3H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" 
      fill="currentColor" 
      fillOpacity="0.2"
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinejoin="round" 
    />
    <rect x="0.5" y="9.5" width="2" height="4" rx="1" fill="currentColor" />
    <rect x="21.5" y="9.5" width="2" height="4" rx="1" fill="currentColor" />
    <circle cx="8.5" cy="11.5" r="1.75" fill="currentColor" />
    <circle cx="15.5" cy="11.5" r="1.75" fill="currentColor" />
    <path 
      d="M9.5 14.5c.8.8 1.7 1 2.5 1s1.7-.2 2.5-1" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
    />
  </svg>
);

export default function HospitalChatbot({ isOpen, onClose, onOpenBooking }) {
  const { settings, doctors, bookAppointment } = useHospital();
  
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: `Hello! 👋 Welcome to Sanjeevani Multispeciality Hospital & Trauma Center (Kaushambi). How can I assist you with your health inquiry today?`,
      time: 'Just now',
      options: [
        'Book an Appointment',
        'Hospital OPD & Emergency Timings',
        'Blood Bank & Component Center',
        'IUI & Infertility Center',
        'Emergency Numbers & Location',
        'Free Sunday Consultation'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bookingStep, setBookingStep] = useState(null); // { patientName, phone, department, doctor, date }
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(query);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 700);
  };

  const generateBotResponse = (query) => {
    const q = query.toLowerCase();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Appointment booking intent
    if (q.includes('book') || q.includes('appointment') || q.includes('doctor')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: `You can easily book a doctor consultation online. Would you like to launch the quick booking form or view our specialist doctors?`,
        time: currentTime,
        action: 'open_booking',
        options: [
          'View Specialist Doctors',
          'Free Sunday OPD Details',
          'Gynecology & Dr. Manisha Chaudhary',
          'Orthopedics & Spine Care'
        ]
      };
    }

    // 2. Blood Bank
    if (q.includes('blood') || q.includes('donor') || q.includes('component')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: `🩸 **Sanjeevani Blood Bank & Component Center** (Licence No. ${settings?.bloodBankLicense || 'BBF28C2026UP000019'}) is fully operational 24x7 with advanced component separation including Packed Red Cells (PRBC), Platelets, and Fresh Frozen Plasma (FFP). For urgent blood requirements, please call our 24x7 blood helpline at +91 ${settings?.emergencyPhone || '7897284402'}.`,
        time: currentTime,
        options: ['Call Blood Bank', 'Emergency Contact', 'Book Appointment']
      };
    }

    // 3. IUI & Infertility
    if (q.includes('iui') || q.includes('fertility') || q.includes('pregnancy') || q.includes('baby') || q.includes('gynecologist') || q.includes('manisha')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: `🌸 **Sanjeevani IUI & Fertility Center** is led by Director **Dr. Manisha Chaudhary** (M.B.B.S. Hons, DGO - Specialist in Obstetrics, Infertility & Laparoscopic Surgery). We offer computer-guided IUI procedures, infertility counselling, and high-risk maternity care with high success rates.`,
        time: currentTime,
        options: ['Consult Dr. Manisha Chaudhary', 'Book Appointment', 'Hospital Timings']
      };
    }

    // 4. Sunday Free OPD
    if (q.includes('sunday') || q.includes('free') || q.includes('fee')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: `✨ **Free Medical Consultation Every Sunday!**\nSanjeevani Hospital organizes a Free OPD Consultation Camp every Sunday from **09:00 AM to 02:00 PM** for all patients. Ayushman Bharat PM-JAY card holders also receive 100% cashless treatment.`,
        time: currentTime,
        options: ['Book Sunday OPD Slot', 'Hospital Address', 'Ayushman Bharat Details']
      };
    }

    // 5. Emergency & Phone numbers
    if (q.includes('emergency') || q.includes('call') || q.includes('phone') || q.includes('number') || q.includes('ambulance') || q.includes('helpline')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: `🚨 **24x7 Emergency & Trauma Helpline**\n• Primary Line: +91 ${settings?.primaryPhone || '9455304235'}\n• Emergency Line: +91 ${settings?.emergencyPhone || '7897284402'}\n• Ambulance: +91 ${settings?.helplinePhone || '6307821195'}\nOur emergency team, ICU, and trauma surgeons are ready round the clock.`,
        time: currentTime,
        options: ['Direct WhatsApp Chat', 'Hospital Address & Map', 'Book Appointment']
      };
    }

    // 6. Timings & Working Hours
    if (q.includes('timing') || q.includes('time') || q.includes('open') || q.includes('hours') || q.includes('schedule')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: `⏰ **Hospital Working Schedule**\n• OPD Consultations: Monday to Saturday, 08:00 AM – 08:00 PM\n• Free Sunday OPD: 09:00 AM – 02:00 PM\n• Emergency, Trauma, Blood Bank, ICU, Pharmacy: Open 24 Hours (All Days)`,
        time: currentTime,
        options: ['Book an Appointment', 'Doctors List', 'Emergency Contact']
      };
    }

    // 7. Location & Address
    if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('map') || q.includes('reach') || q.includes('kaushambi')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: `📍 **Hospital Address**:\n${settings?.address || 'Sarai Akil, Kaushambi Road, Kaushambi, Uttar Pradesh - 212216'}\nLocated conveniently on the main Kaushambi Road with spacious patient parking and ambulance bay.`,
        time: currentTime,
        options: ['Call for Directions', 'Book Appointment', 'Emergency Helpline']
      };
    }

    // 8. Default fallback
    return {
      id: 'bot-' + Date.now(),
      sender: 'bot',
      text: `Thank you for your message! Our hospital medical desk is ready to help you with consultations, emergency care, or test reports. You can choose a quick topic below or type your question:`,
      time: currentTime,
      options: [
        'Book an Appointment',
        '24x7 Emergency Numbers',
        'Blood Bank Inquiries',
        'Dr. Manisha Chaudhary (Gynecologist)',
        'Sunday Free OPD Consultation'
      ]
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] md:w-[420px] max-h-[580px] h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
      
      {/* Chatbot Header */}
      <div className="medical-gradient-primary text-white p-4 flex items-center justify-between relative shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <ChatBotIcon className="w-6 h-6 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-sky-300 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm tracking-tight">Sanjeevani Assistant</h3>
              <span className="text-[10px] bg-sky-400/20 border border-sky-300/30 text-sky-200 px-1.5 py-0.2 rounded-full font-semibold">
                AI Help
              </span>
            </div>
            <p className="text-[11px] text-sky-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Online • Medical Helpdesk
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          aria-label="Close Chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 text-xs">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div key={msg.id} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
              <div className="flex items-start gap-2 max-w-[88%]">
                {isBot && (
                  <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-1 border border-sky-200">
                    <ModernAiAssistantIcon className="w-3.5 h-3.5" />
                  </div>
                )}
                
                <div
                  className={`p-3 rounded-2xl ${
                    isBot
                      ? 'bg-white text-slate-800 border border-slate-200/80 shadow-xs rounded-tl-xs'
                      : 'bg-sky-600 text-white shadow-xs rounded-tr-xs'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                  {/* Special Direct Booking Action Button if triggered */}
                  {msg.action === 'open_booking' && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBooking();
                      }}
                      className="mt-2.5 w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 transition-colors shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Open Appointment Booking Form</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Action Chips */}
              {isBot && msg.options && (
                <div className="flex flex-wrap gap-1.5 mt-2 ml-8">
                  {msg.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (opt === 'Book an Appointment' || opt === 'Book Sunday OPD Slot') {
                          onClose();
                          onOpenBooking();
                        } else {
                          handleSend(opt);
                        }
                      }}
                      className="px-2.5 py-1 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-[11px] font-semibold transition-all hover:scale-[1.02] active:scale-95 text-left"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question or request appointment..."
          className="flex-1 bg-slate-100 border border-slate-200 focus:border-sky-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-sm"
          aria-label="Send Message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
