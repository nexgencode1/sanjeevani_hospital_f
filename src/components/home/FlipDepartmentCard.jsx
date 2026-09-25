import React, { useState } from 'react';
import { 
  ChevronRight, CalendarCheck, CheckCircle2, RotateCw 
} from 'lucide-react';

export default function FlipDepartmentCard({ department, onOpenBooking, setActiveTab }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const IconComponent = department.icon;

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`flip-card-container h-[380px] sm:h-[400px] w-full cursor-pointer ${isFlipped ? 'is-flipped' : ''}`}
      onClick={toggleFlip}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleFlip()}
      tabIndex={0}
      role="button"
      aria-label={`${department.title} department details`}
    >
      <div className="flip-card-inner">
        
        {/* FRONT FACE */}
        <div className="flip-card-front bg-slate-900 border border-slate-200/80 hover:border-sky-500 hover:ring-2 hover:ring-sky-500/20 shadow-md flex flex-col justify-between group transition-all duration-300 relative">
          
          {/* Subtle soft tint overlay on hover */}
          <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/[0.03] transition-colors duration-300 pointer-events-none z-10"></div>

          {/* Top Image */}
          <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
            <img
              src={department.image}
              alt={department.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            {/* Very soft darkening overlay on hover */}
            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/15 transition-colors duration-300"></div>
            
            {/* Top Badge */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-sky-400 border border-sky-400/30 text-[11px] font-bold z-10">
              <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{department.badge || 'Department'}</span>
            </div>

            {/* Flip hint chip */}
            <div className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-slate-950/70 text-slate-300 border border-white/20 text-[10px] font-medium flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity z-10">
              <RotateCw className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
              <span className="hidden xs:inline">Hover/Tap</span>
            </div>

            {/* Department Title */}
            <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
              <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                {department.title}
              </h3>
            </div>
          </div>

          {/* Bottom Info on Front */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white text-slate-800 relative z-0">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
              {department.desc}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-sky-700">
              <span className="flex items-center gap-1">
                <span>View Specialized Procedures</span>
              </span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* BACK FACE (Flipped) */}
        <div className="flip-card-back bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 border border-sky-500/30 hover:border-sky-400 hover:ring-2 hover:ring-sky-500/20 shadow-2xl flex flex-col justify-between transition-all duration-300">
          <div className="space-y-3">
            {/* Header with Icon */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-black text-sm sm:text-base text-white leading-tight">
                    {department.title}
                  </h4>
                  <span className="text-[10px] text-sky-300 font-semibold">Specialized Clinical Care</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                <RotateCw className="w-3 h-3" />
                Back
              </span>
            </div>

            {/* Procedures Bullet Points */}
            <div className="space-y-2 pt-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Key Services & Procedures:
              </p>
              <div className="space-y-1.5">
                {department.procedures?.map((proc, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{proc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timing / Facility Highlight */}
            {department.timing && (
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-300">
                <span className="text-sky-300 font-bold">Availability: </span>
                {department.timing}
              </div>
            )}
          </div>

          {/* Action CTAs on Back */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (setActiveTab) setActiveTab('services');
              }}
              className="w-full text-center text-[11px] font-semibold text-slate-400 hover:text-white py-1 transition-colors cursor-pointer"
            >
              Learn More Details →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
