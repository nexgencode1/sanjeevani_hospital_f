import React from 'react';

export default function EnhancedLogo({ className = "w-10 h-10 sm:w-12 sm:h-12", showText = true, textLight = false, subtitle = "Multispeciality Hospital & Trauma Center" }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 select-none max-w-full">
      {/* Enhanced Vector SVG Medical Emblem */}
      <div className={`relative flex-shrink-0 ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Gradients */}
            <linearGradient id="goldSun" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="bgCenterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
            
            {/* Text Paths */}
            <path id="textPathTop" d="M 30,100 A 70,70 0 0,1 170,100" />
            <path id="textPathBottom" d="M 160,105 A 65,65 0 0,1 40,105" />
          </defs>

          {/* Outer Ring */}
          <circle cx="100" cy="100" r="96" fill="#FFFFFF" stroke="#047857" strokeWidth="6" />
          <circle cx="100" cy="100" r="90" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          
          {/* Inner Golden Core */}
          <circle cx="100" cy="100" r="58" fill="url(#bgCenterGrad)" stroke="#B45309" strokeWidth="2.5" />

          {/* Sun Rays & Rising Sun */}
          <g transform="translate(100, 78)">
            <circle cx="0" cy="0" r="18" fill="url(#goldSun)" />
            <path d="M 0,-24 L 0,-18" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            <path d="M 17,-17 L 13,-13" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            <path d="M -17,-17 L -13,-13" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            <path d="M 24,0 L 18,0" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            <path d="M -24,0 L -18,0" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            <path d="M 12,-7 L 22,-14" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M -12,-7 L -22,-14" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Healing Hands */}
          <g>
            <path d="M 52,118 C 65,134 95,138 128,128 C 145,122 152,112 152,112 C 148,118 136,134 112,138 C 85,142 60,132 52,118 Z" fill="#D97706" />
            <path d="M 50,110 C 62,118 84,124 116,116 C 132,112 144,102 148,98 C 142,106 128,122 102,126 C 76,130 56,120 50,110 Z" fill="#F59E0B" />
          </g>

          {/* Green Sanjeevani Sprout */}
          <g>
            <path d="M 98,105 C 80,95 72,108 64,104 C 76,118 92,114 98,105 Z" fill="url(#leafGrad)" stroke="#065F46" strokeWidth="1.2" />
            <path d="M 100,105 C 114,94 126,102 134,98 C 124,114 108,112 100,105 Z" fill="url(#leafGrad)" stroke="#065F46" strokeWidth="1.2" />
            <path d="M 99,106 C 96,90 90,82 98,75 C 104,82 101,95 99,106 Z" fill="#34D399" stroke="#047857" strokeWidth="1" />
          </g>

          {/* Red Cross Symbols */}
          <g transform="translate(32, 100)">
            <rect x="-8" y="-2.5" width="16" height="5" fill="#DC2626" rx="1" />
            <rect x="-2.5" y="-8" width="5" height="16" fill="#DC2626" rx="1" />
          </g>
          <g transform="translate(168, 100)">
            <rect x="-8" y="-2.5" width="16" height="5" fill="#DC2626" rx="1" />
            <rect x="-2.5" y="-8" width="5" height="16" fill="#DC2626" rx="1" />
          </g>

          {/* Curved Text */}
          <text fontSize="14" fontWeight="800" fill="#0B3B60" letterSpacing="2.5">
            <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
              SANJEEVANI HOSPITAL
            </textPath>
          </text>

          <text fontSize="13" fontWeight="800" fill="#047857" letterSpacing="3">
            <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
              KAUSHAMBI
            </textPath>
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-base sm:text-lg md:text-xl font-black tracking-tight leading-tight ${textLight ? 'text-white' : 'text-slate-900'}`}>
              संजीवनी <span className={textLight ? 'text-sky-300' : 'text-sky-700'}>SANJEEVANI</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              हॉस्पिटल
            </span>
          </div>
          <p className={`text-[10px] sm:text-xs font-semibold tracking-tight truncate max-w-[200px] xs:max-w-[260px] sm:max-w-none mt-0.5 ${textLight ? 'text-sky-200' : 'text-slate-500'}`}>
            {subtitle || "मल्टीस्पेशलिटी हॉस्पिटल एवं 24x7 ट्रॉमा सेंटर • Kaushambi"}
          </p>
        </div>
      )}
    </div>
  );
}
