import React from 'react';
import AnimatedCounter from '../common/AnimatedCounter';
import { 
  Users, Activity, Droplets, HeartPulse, Award, 
  Stethoscope, Clock, ShieldCheck 
} from 'lucide-react';

export default function StatsSection({ settings }) {
  const statItems = [
    {
      id: 'patients',
      label: 'Treated Patients',
      sublabel: 'Satisfied families across Kaushambi',
      target: settings?.stats?.patientsTreated || 50000,
      suffix: '+',
      icon: Users
    },
    {
      id: 'surgeries',
      label: 'Surgeries Performed',
      sublabel: 'Keyhole laparoscopic & general operations',
      target: settings?.stats?.surgeriesDone || 12500,
      suffix: '+',
      icon: HeartPulse
    },
    {
      id: 'blood',
      label: 'Blood Units Issued',
      sublabel: 'PRBC, Platelets & FFP life support',
      target: settings?.stats?.bloodUnitsCollected || 8000,
      suffix: '+',
      icon: Droplets
    },
    {
      id: 'doctors',
      label: 'Specialist Doctors',
      sublabel: 'Multispeciality clinical consultants',
      target: settings?.stats?.doctorCount || 14,
      suffix: '+',
      icon: Stethoscope
    },
    {
      id: 'years',
      label: 'Years of Service',
      sublabel: 'Continuous healthcare leadership',
      target: settings?.stats?.experienceYears || 12,
      suffix: '+ Years',
      icon: Award
    }
  ];

  return (
    <section className="relative bg-slate-950 text-white py-14 sm:py-18 overflow-hidden border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-xs font-bold text-sky-300 border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Demonstrated Clinical Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Our Healthcare Impact in Numbers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real clinical care delivered round-the-clock to patients across Kaushambi and neighbouring districts.
          </p>
        </div>

        {/* Counter Grid (Unified Sky Blue & Slate System) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {statItems.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className="relative group p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500 hover:ring-2 hover:ring-sky-500/20 shadow-xl flex flex-col items-center text-center justify-between transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                {/* Subtle soft tint overlay on hover */}
                <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/[0.04] transition-colors duration-300 pointer-events-none"></div>

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3 border border-sky-500/20 z-10">
                  <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                    <AnimatedCounter
                      target={item.target}
                      suffix={item.suffix}
                      duration={2200}
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-200">
                    {item.label}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 leading-snug line-clamp-2">
                    {item.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
