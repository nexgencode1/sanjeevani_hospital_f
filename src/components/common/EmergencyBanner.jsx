import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { PhoneCall, ShieldCheck, Clock, Sparkles, AlertCircle, Droplets, HeartPulse } from 'lucide-react';

export default function EmergencyBanner() {
  const { settings } = useHospital();

  const phone1 = settings?.primaryPhone || '9455304235';
  const phone2 = settings?.emergencyPhone || '7897284402';
  const phone3 = settings?.helplinePhone || '6307821195';

  const tickerItems = [
    { icon: AlertCircle, text: "🚨 24x7 इमरजेंसी एवं ट्रॉमा सेंटर सेवा उपलब्ध", color: "text-rose-400" },
    { icon: Sparkles, text: "🩺 प्रत्येक रविवार निःशुल्क ओपीडी परामर्श (Free OPD Every Sunday 9:00 AM - 2:00 PM)", color: "text-emerald-400" },
    { icon: ShieldCheck, text: "💳 आयुष्मान भारत PM-JAY योजना - ₹5 लाख तक कैशलेस उपचार की सुविधा", color: "text-amber-400" },
    { icon: Droplets, text: `🩸 कौशाम्बी का प्रथम लाइसेंस प्राप्त 24x7 ब्लड बैंक (${settings?.bloodBankLicense || 'Lic: BBF28C2026UP000019'}) - PRBC, Platelets, FFP`, color: "text-rose-400" },
    { icon: PhoneCall, text: `📞 24x7 इमरजेंसी हेल्पलाइन: +91 ${phone1} | +91 ${phone2} | +91 ${phone3}`, color: "text-sky-400" },
    { icon: HeartPulse, text: "🏥 अत्याधुनिक मॉड्यूलर लैप्रोस्कोपिक सर्जरी एवं कम्प्यूटरीकृत आईयूआई (IUI) फर्टिलिटी सेंटर", color: "text-emerald-400" }
  ];

  return (
    <div className="bg-slate-950 text-white text-[11px] sm:text-xs border-b border-slate-800 relative z-30 w-full overflow-hidden">
      {/* Upper Bar: Bilingual Name, Reg & 3 Phone Numbers */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex flex-col md:flex-row items-center justify-between gap-2 border-b border-slate-800/60">
        
        {/* Left: Bilingual Hospital Branding & CMO Reg */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2.5 max-w-full">
          <span className="font-extrabold text-white tracking-wide flex items-center gap-1">
            <span className="text-emerald-400 font-bold">संजीवनी हॉस्पिटल</span>
            <span className="text-slate-500 font-normal">|</span>
            <span className="text-sky-300 font-bold tracking-tight">SANJEEVANI</span>
          </span>

          <span className="flex items-center gap-1 font-semibold text-sky-300 bg-sky-950/70 border border-sky-800/80 px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
            <ShieldCheck className="w-3 h-3 text-sky-400 flex-shrink-0" />
            <span className="truncate">{settings?.registrationNo || "CMO Reg. No. 2013/108"}</span>
          </span>

          <span className="hidden lg:flex items-center gap-1 text-emerald-300 font-semibold bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>24x7 Open</span>
          </span>
        </div>

        {/* Right: All 3 Hospital Numbers (Primary, Emergency, Ambulance) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-full">
          <span className="text-slate-400 text-[10px] sm:text-xs font-semibold hidden sm:inline">24x7 Helpline:</span>
          
          {/* Phone 1: Primary OPD */}
          <a
            href={`tel:${phone1}`}
            title="Call Primary Line"
            className="flex items-center gap-1 font-bold text-white bg-sky-600 hover:bg-sky-500 px-2.5 py-1 rounded-full transition-all duration-150 shadow-xs text-[10px] sm:text-xs"
          >
            <PhoneCall className="w-3 h-3 flex-shrink-0" />
            <span>+91 {phone1}</span>
          </a>

          {/* Phone 2: Emergency & Trauma */}
          <a
            href={`tel:${phone2}`}
            title="Call Emergency Line"
            className="flex items-center gap-1 font-bold text-rose-300 bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 px-2 py-1 rounded-full transition-all duration-150 text-[10px] sm:text-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            <span>+91 {phone2}</span>
          </a>

          {/* Phone 3: Helpline / Ambulance */}
          <a
            href={`tel:${phone3}`}
            title="Call Ambulance Helpline"
            className="flex items-center gap-1 font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/80 px-2 py-1 rounded-full transition-all duration-150 text-[10px] sm:text-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>+91 {phone3}</span>
          </a>
        </div>

      </div>

      {/* Lower Bar: Continuous Auto-Scrolling Marquee Ticker */}
      <div className="bg-slate-900/90 py-1 px-2 border-t border-slate-800/40 relative flex items-center overflow-hidden">
        <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-600 text-white font-extrabold text-[9px] sm:text-[10px] uppercase rounded flex-shrink-0 z-10 shadow-xs tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          <span>Updates</span>
        </div>

        <div className="overflow-hidden w-full relative ml-2 select-none group">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[11px] sm:text-xs font-medium text-slate-200">
            {/* First sequence */}
            {tickerItems.map((item, idx) => (
              <span key={`t1-${idx}`} className="inline-flex items-center gap-1.5 flex-shrink-0">
                <span className={item.color}>{item.text}</span>
                <span className="text-slate-600 font-bold ml-3">•</span>
              </span>
            ))}
            {/* Duplicate sequence for seamless loop */}
            {tickerItems.map((item, idx) => (
              <span key={`t2-${idx}`} className="inline-flex items-center gap-1.5 flex-shrink-0">
                <span className={item.color}>{item.text}</span>
                <span className="text-slate-600 font-bold ml-3">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
