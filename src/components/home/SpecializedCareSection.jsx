import React from 'react';
import { 
  Droplets, Baby, CheckCircle2, PhoneCall, CalendarCheck, 
  ArrowRight, ShieldCheck, Activity, Award, Sparkles 
} from 'lucide-react';

export default function SpecializedCareSection({ settings, onOpenBooking, setActiveTab }) {
  return (
    <section className="relative w-full bg-slate-950 text-white py-14 sm:py-20 overflow-hidden border-b border-slate-800">
      {/* Subtle Sky Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-900/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Pioneering Medical Excellence in Kaushambi
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Specialized Care Centers
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            District-first specialized medical infrastructure providing tertiary clinical capabilities, licensed blood component separation, and high-success fertility solutions.
          </p>
        </div>

        {/* Full-Width Showcase Cards in Alternating Column Layout */}
        <div className="flex flex-col gap-8 lg:gap-12">
          
          {/* Card 1: Sanjeevani Blood Bank (Left Image, Right Content) */}
          <div className="group relative rounded-3xl bg-slate-900/95 border border-slate-800 hover:border-sky-500 hover:ring-2 hover:ring-sky-500/20 overflow-hidden shadow-2xl transition-all duration-300">
            {/* Subtle soft tint overlay on hover */}
            <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/[0.03] transition-colors duration-300 pointer-events-none z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[360px]">
              {/* Left Image Section (Desktop 5 cols) */}
              <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[320px] lg:min-h-full overflow-hidden bg-slate-950">
                <img
                  src={settings?.bloodBankImage || "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1000"}
                  alt="Sanjeevani Blood Bank & Component Separation Unit"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/95 via-slate-900/40 to-transparent"></div>
                
                {/* Floating Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <span className="px-3.5 py-1 rounded-full bg-sky-600 backdrop-blur-md text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md">
                    <Droplets className="w-4 h-4" />
                    24x7 Operational
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm">
                    {settings?.bloodBankLicense || 'Licence: BBF28C2026UP000019'}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 block lg:hidden">
                  <h3 className="text-xl font-black text-white drop-shadow-md">
                    Sanjeevani Blood Bank & Component Center
                  </h3>
                </div>
              </div>

              {/* Right Content Body (Desktop 7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3.5">
                  <div className="hidden lg:flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/25 text-xs font-bold uppercase tracking-wider">
                      Specialized Facility #01
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-400">
                      District's 1st Licensed Apheresis & Component Separation Unit
                    </span>
                  </div>

                  <h3 className="hidden lg:block text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                    Sanjeevani Blood Bank & Component Center
                  </h3>

                  <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
                    Equipped with computerized high-precision centrifuges, deep cold storage freezers, and apheresis technology. We supply 100% NAT & ELISA screened Packed Red Blood Cells (PRBC), Platelets (RDP/SDP), and Fresh Frozen Plasma (FFP).
                  </p>

                  {/* Highlights 4-Grid with larger text */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs sm:text-sm lg:text-base font-semibold text-slate-200">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                      <span>24-Hour Emergency Issue</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                      <span>Voluntary Donor Camps</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                      <span>Component Separation (PRBC/Platelets)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                      <span>Strict Testing Protocols</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href={`tel:${settings?.emergencyPhone || '7897284402'}`}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-600/30 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Blood Bank (24x7)</span>
                  </a>

                  <button
                    onClick={() => setActiveTab && setActiveTab('services')}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
                  >
                    <span>Explore All Services</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Sanjeevani IUI & Infertility Center (Left Content, Right Image) */}
          <div className="group relative rounded-3xl bg-slate-900/95 border border-slate-800 hover:border-sky-500 hover:ring-2 hover:ring-sky-500/20 overflow-hidden shadow-2xl transition-all duration-300">
            {/* Subtle soft tint overlay on hover */}
            <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/[0.03] transition-colors duration-300 pointer-events-none z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[360px]">
              {/* Left Content Body on Desktop (Desktop 7 cols, Order 1) */}
              <div className="lg:col-span-7 lg:order-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3.5">
                  <div className="hidden lg:flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/25 text-xs font-bold uppercase tracking-wider">
                      Specialized Facility #02
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-400">
                      High-Success Computerized Reproductive Healthcare
                    </span>
                  </div>

                  <h3 className="hidden lg:block text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                    Sanjeevani IUI & Infertility Center
                  </h3>

                  <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
                    Comprehensive fertility diagnosis and computerized Intrauterine Insemination (IUI) led by chief specialist <strong>Dr. Manisha Chaudhary</strong> (M.B.B.S. Hons, D.G.O.), offering confidential, high-success parenthood treatments.
                  </p>

                  {/* Highlights 4-Grid with larger text */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs sm:text-sm lg:text-base font-semibold text-slate-200">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                      <span>Computerized Sperm Preparation</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                      <span>Serial Ovulation & Follicular Study</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                      <span>High-Risk Pregnancy Support</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                      <span>Complete Patient Confidentiality</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={onOpenBooking}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-600/30 transition-all cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Book Fertility Consult</span>
                  </button>

                  <button
                    onClick={() => setActiveTab && setActiveTab('doctors')}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
                  >
                    <span>Meet Doctor Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Image Section on Desktop (Desktop 5 cols, Order 2) */}
              <div className="lg:col-span-5 lg:order-2 relative min-h-[280px] sm:min-h-[320px] lg:min-h-full overflow-hidden bg-slate-950">
                <img
                  src={settings?.iuiInfertilityImage || "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000"}
                  alt="Sanjeevani IUI & Fertility Center Laboratory"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-slate-900/95 via-slate-900/40 to-transparent"></div>
                
                {/* Floating Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <span className="px-3.5 py-1 rounded-full bg-sky-600 backdrop-blur-md text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md">
                    <Baby className="w-4 h-4" />
                    Advanced Fertility Suite
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm">
                    Under Dr. Manisha Chaudhary
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 block lg:hidden">
                  <h3 className="text-xl font-black text-white drop-shadow-md">
                    Sanjeevani IUI & Infertility Center
                  </h3>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
