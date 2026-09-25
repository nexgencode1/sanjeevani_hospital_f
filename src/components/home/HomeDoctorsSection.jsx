import React from 'react';
import { 
  Stethoscope, Clock, CalendarCheck, Award, 
  ArrowRight, Sparkles, CheckCircle2, UserCheck 
} from 'lucide-react';

export default function HomeDoctorsSection({ doctors = [], settings, onOpenBooking, setActiveTab }) {
  // Show 3 to 4 doctors on homepage
  const displayDoctors = doctors.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
            विशेषज्ञ चिकित्सक • Specialist Doctors & Faculty
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Meet Our Specialist Doctors
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Experienced medical directors, laparoscopic surgeons, and consultants providing trusted clinical consultations in Kaushambi.
          </p>
        </div>

        <div>
          <button
            onClick={() => setActiveTab && setActiveTab('doctors')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-800 hover:text-white bg-emerald-50 hover:bg-emerald-600 border border-emerald-200 hover:border-emerald-600 shadow-xs transition-all cursor-pointer"
          >
            <span>View All Doctors</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Doctor Showcase Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayDoctors.map((doc, idx) => (
          <div
            key={doc.id || idx}
            className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500 hover:ring-2 hover:ring-emerald-500/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div>
              {/* Doctor Photo with Gradient Overlay */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                <img
                  src={doc.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-300 border border-slate-700 shadow-sm">
                    {doc.department}
                  </span>
                  {doc.featured && (
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-sm uppercase flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      Lead
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                  <span className="text-[11px] font-bold text-emerald-300 block leading-tight">
                    {doc.designation || 'Consultant Specialist'}
                  </span>
                  <h3 className="text-lg font-black text-white drop-shadow-sm truncate">
                    {doc.name}
                  </h3>
                </div>
              </div>

              {/* Body Info */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <Award className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{doc.qualifications}</span>
                </div>

                {/* OPD Schedule Box */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-700 block">OPD Schedule:</span>
                    <span className="text-slate-500 line-clamp-1">
                      {doc.availability || doc.timing || 'Mon - Sat: 10 AM - 4 PM'}
                    </span>
                  </div>
                </div>

                {/* Free Sunday Tag */}
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span>Free Consultation Every Sunday</span>
                </div>
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 mt-2">
              <button
                onClick={onOpenBooking}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
