import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedLogo from './EnhancedLogo';
import { ShieldCheck, HeartPulse, Award } from 'lucide-react';

export default function BrandSplashLoader({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 1900);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white px-4"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-sky-500/20 blur-3xl pointer-events-none animate-pulse"></div>

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center relative z-10"
          >
            {/* Logo Emblem */}
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-4">
              <EnhancedLogo className="w-20 h-20 md:w-24 md:h-24" showText={false} />
            </div>

            {/* Hospital Name with Stagger */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white uppercase"
            >
              SANJEEVANI <span className="text-sky-400">HOSPITAL</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-xs md:text-sm font-semibold text-sky-200 mt-1 uppercase tracking-widest"
            >
              Multispeciality Hospital & Trauma Center • Kaushambi
            </motion.p>

            {/* Badges Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 mt-5 text-xs text-slate-300 font-medium"
            >
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                CMO Reg. No. 2013/108
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15">
                <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                24x7 Emergency & Blood Bank
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                IUI & Laparoscopy Unit
              </span>
            </motion.div>

            {/* Smooth Progress Bar */}
            <motion.div className="w-48 h-1 bg-slate-800 rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
