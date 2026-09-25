import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, ShieldCheck, CalendarCheck, 
  PhoneCall, Droplets, Sparkles, HeartPulse, Award 
} from 'lucide-react';

const DEFAULT_SLIDES = [
  {
    id: 'slide-1',
    title: 'Advanced Healthcare & 24x7 Trauma Care',
    highlight: 'in Kaushambi',
    subtitle: "Equipped with Kaushambi's licensed 24x7 Blood Bank, advanced IUI Fertility Center, modular laparoscopic surgery suites, and round-the-clock emergency support.",
    badge: "CMO Reg. No. 2013/108 • Kaushambi's 1st Multispeciality Hospital",
    image: '/hospital-building.jpg',
    primaryBtnText: 'Book Doctor Appointment',
    primaryBtnAction: 'booking',
    secondaryBtnText: '24x7 Emergency Helpline',
    secondaryBtnAction: 'call'
  },
  {
    id: 'slide-2',
    title: "Kaushambi's 1st Licensed 24x7 Blood Bank",
    highlight: '& Component Separation',
    subtitle: 'Saving critical lives round-the-clock with PRBC, Platelets (RDP/SDP), and Fresh Frozen Plasma (FFP) separation facilities with computerized safety testing.',
    badge: 'Licence: BBF28C2026UP000019 • 24x7 Emergency Blood Issue',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1920',
    primaryBtnText: 'Call Blood Bank Helpline',
    primaryBtnAction: 'call_blood',
    secondaryBtnText: 'Explore Blood Bank',
    secondaryBtnAction: 'services'
  },
  {
    id: 'slide-3',
    title: 'Pioneering IUI & Infertility Care Center',
    highlight: 'Led by Dr. Manisha Chaudhary',
    subtitle: 'Fulfilling parenthood dreams with advanced follicular study, computerized sperm enhancement, high-success IUI procedures, and high-risk pregnancy care.',
    badge: 'M.B.B.S. (Hons), D.G.O. • 14+ Years Clinical Excellence',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1920',
    primaryBtnText: 'Book Fertility Consult',
    primaryBtnAction: 'booking',
    secondaryBtnText: 'Meet Dr. Manisha',
    secondaryBtnAction: 'doctors'
  },
  {
    id: 'slide-4',
    title: 'Ayushman Bharat PM-JAY Cashless Care',
    highlight: '& Free Sunday OPD',
    subtitle: 'Avail 100% cashless medical & surgical treatment up to ₹5 Lakhs. Zero doctor fee consultation every Sunday 9:00 AM - 2:00 PM for all community families.',
    badge: 'Government Empanelled • 100% Cashless Treatment',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920',
    primaryBtnText: 'Book Free Sunday OPD',
    primaryBtnAction: 'booking',
    secondaryBtnText: 'Inquire Benefits',
    secondaryBtnAction: 'contact'
  }
];

export default function HeroSlider({ settings, onOpenBooking, setActiveTab }) {
  const slides = (settings?.heroSlides && settings.heroSlides.length > 0) 
    ? settings.heroSlides 
    : DEFAULT_SLIDES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay interval (6 seconds)
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length, nextSlide]);

  // Touch Swipe for mobile devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleAction = (action) => {
    switch (action) {
      case 'booking':
        if (onOpenBooking) onOpenBooking();
        break;
      case 'call':
        window.location.href = `tel:${settings?.primaryPhone || '9455304235'}`;
        break;
      case 'call_blood':
        window.location.href = `tel:${settings?.emergencyPhone || '7897284402'}`;
        break;
      case 'services':
        if (setActiveTab) setActiveTab('services');
        break;
      case 'doctors':
        if (setActiveTab) setActiveTab('doctors');
        break;
      case 'contact':
        if (setActiveTab) setActiveTab('contact');
        break;
      default:
        if (onOpenBooking) onOpenBooking();
    }
  };

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <div 
      className="relative w-full min-h-[380px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[480px] max-h-[520px] bg-slate-950 text-white overflow-hidden select-none flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides with crossfade transition & lightened overlay */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
            }`}
          >
            <img
              src={slide.image || '/hospital-building.jpg'}
              alt={slide.title}
              className={`w-full h-full object-cover object-center filter brightness-90 transform transition-transform duration-[6000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Soft, light gradient overlay so the slide image shines through vividly */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/40 to-slate-950/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
          </div>
        );
      })}

      {/* Main Content Area - Compact & Perfectly Proportioned */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14 w-full flex flex-col justify-center min-h-[380px] sm:min-h-[420px] md:min-h-[460px]">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          
          {/* Bilingual Hospital Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-300 font-bold">संजीवनी हॉस्पिटल</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 text-[11px] truncate">{currentSlide.badge || "Kaushambi's 1st Multispeciality Hospital"}</span>
          </div>

          {/* Bold Impactful Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] drop-shadow-xl">
            {currentSlide.title}{' '}
            {currentSlide.highlight && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-300 to-white block sm:inline">
                {currentSlide.highlight}
              </span>
            )}
          </h1>

          {/* Subtitle description */}
          {currentSlide.subtitle && (
            <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 max-w-2xl drop-shadow">
              {currentSlide.subtitle}
            </p>
          )}

          {/* 2 Action Buttons (Doctor Emerald + Emergency Line) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => handleAction(currentSlide.primaryBtnAction || 'booking')}
              className="flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 active:scale-98 shadow-lg shadow-emerald-700/30 transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{currentSlide.primaryBtnText || 'Book Doctor Appointment'}</span>
            </button>

            <button
              onClick={() => handleAction(currentSlide.secondaryBtnAction || 'call')}
              className="flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-slate-900/85 hover:bg-slate-800 active:scale-98 border border-slate-700 backdrop-blur-md shadow-md transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
              <span>{currentSlide.secondaryBtnText || '24x7 Emergency Helpline'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Slide Indicator Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-2.5 bg-slate-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'w-7 sm:w-8 bg-sky-400' 
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
