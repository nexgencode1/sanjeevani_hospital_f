import React from 'react';
import EnhancedLogo from './EnhancedLogo';
import { useHospital } from '../../context/HospitalContext';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ArrowUpRight, Lock } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const { settings } = useHospital();
  const { isAuthenticated } = useAuth();

  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Credentials */}
          <div className="space-y-4">
            <EnhancedLogo textLight={true} className="w-14 h-14" />
            <p className="text-xs leading-relaxed text-slate-400">
              {settings?.aboutShort || "The 1st multispeciality hospital & trauma center in Kaushambi district providing 24x7 emergency, maternity, blood bank, and surgical care."}
            </p>
            
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>{settings?.registrationNo || "CMO Reg. No. 2013/108"}</span>
              </div>
              <div className="flex items-center gap-2 text-sky-400">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>{settings?.bloodBankLicense || "Licence: BBF28C2026UP000019"}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { id: 'home', label: 'Hospital Home' },
                { id: 'about', label: 'About Sanjeevani' },
                { id: 'services', label: 'Medical Services & Units' },
                { id: 'doctors', label: 'Our Specialist Doctors' },
                { id: 'gallery', label: 'Hospital Gallery & Tour' },
                { id: 'booking', label: 'Book Doctor Appointment' },
                { id: 'contact', label: 'Contact & Map Directions' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className="hover:text-sky-400 transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-slate-600 group-hover:text-sky-400">›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Departments & Schemes */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Key Specialities
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="text-rose-500 font-bold">•</span>
                24x7 Emergency & Trauma Center
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="text-rose-500 font-bold">•</span>
                Sanjeevani Blood Bank & Component Unit
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="text-sky-400 font-bold">•</span>
                IUI Infertility Treatment Center
              </li>
              <li>• Laparoscopic & Endoscopic Surgery</li>
              <li>• Normal & Cesarean Maternity Care</li>
              <li>• Orthopedic Trauma & Spine Surgery</li>
              <li>• Pediatrics, ENT & Eye Speciality</li>
              <li>• Ayushman Bharat PM-JAY Cashless</li>
            </ul>
          </div>

          {/* Col 4: Contact & Timings */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Hospital Location
            </h3>
            
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
              <span>{settings?.address || "Sarai Akil, Kaushambi Road, Kaushambi, UP - 212216"}</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div>
                  <span className="text-slate-400 text-[10px] block">Primary OPD:</span>
                  <a href={`tel:${settings?.primaryPhone || '9455304235'}`} className="hover:text-emerald-400 font-bold text-white">
                    +91 {settings?.primaryPhone || "9455304235"}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Emergency & Ambulance:</span>
                  <a href={`tel:${settings?.emergencyPhone || '7897284402'}`} className="hover:text-rose-400 font-semibold text-slate-200">
                    +91 {settings?.emergencyPhone || "7897284402"}
                  </a>
                  <span className="text-slate-500"> / </span>
                  <a href={`tel:${settings?.helplinePhone || '6307821195'}`} className="hover:text-emerald-400 font-semibold text-slate-200">
                    {settings?.helplinePhone || "6307821195"}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a href={`mailto:${settings?.email}`} className="hover:text-amber-400">
                {settings?.email || "contact@sanjeevanihospital.in"}
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-xs pt-1 text-slate-400">
              <Clock className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-200">OPD: Mon - Sat (8 AM - 8 PM)</p>
                <p className="text-amber-400 font-semibold">Sunday: 9 AM - 2 PM (Free Consultation)</p>
                <p className="text-rose-400 font-bold">Emergency & Blood Bank: 24 Hours</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Developer Credit & Admin Link */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sanjeevani Multispeciality Hospital & Trauma Center. All Rights Reserved.</p>
          
          {/* NexGenCode Developer Attribution */}
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <span>Developed by</span>
            <a 
              href="https://www.nexgencode.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors underline underline-offset-2 flex items-center gap-1"
            >
              <span>NexGenCode Pvt Ltd</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav(isAuthenticated ? 'admin-dashboard' : 'admin-login')}
              className="flex items-center gap-1.5 text-slate-400 hover:text-sky-400 transition-colors px-2 py-1 rounded bg-slate-900 border border-slate-800"
            >
              <Lock className="w-3 h-3" />
              <span>{isAuthenticated ? 'Admin Dashboard' : 'Staff Admin Login'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
