import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { 
  ShieldCheck, Award, Heart, Users, Target, CheckCircle2, 
  MapPin, PhoneCall, CalendarCheck, Sparkles, Building2, Stethoscope,
  Activity, Droplets, Baby
} from 'lucide-react';
import AnimatedCounter from '../components/common/AnimatedCounter';
import PageSEO from '../components/common/PageSEO';

export default function AboutPage({ onOpenBooking, setActiveTab }) {
  const { settings, doctors } = useHospital();
  const primaryDoctor = doctors.find((d) => d.id === 'doc-1') || doctors[0];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Sanjeevani Multispeciality Hospital & Trauma Center",
    "description": "Establishment, medical vision, and clinical leadership of Kaushambi's premier multispeciality hospital and 24x7 trauma center.",
    "url": "https://sanjeevanihospital.in/about",
    "mainEntity": {
      "@type": "Hospital",
      "name": "Sanjeevani Multispeciality Hospital & Trauma Center",
      "foundingDate": "2013",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sarai Akil, Kaushambi Road",
        "addressLocality": "Kaushambi",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "212216",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div className="space-y-16 pb-16 w-full overflow-hidden">
      <PageSEO 
        title="हमारे बारे में | About Sanjeevani Hospital Kaushambi | Mission & Leadership"
        description="संजीवनी हॉस्पिटल कौशाम्बी का इतिहास, CMO Reg. No. 2013/108, प्रथम लाइसेंसी ब्लड बैंक, डॉ. मनीषा चौधरी एवं अनुभवी डॉक्टर्स टीम।"
        keywords="About Sanjeevani Hospital, history Sanjeevani Hospital Kaushambi, CMO registered hospital Kaushambi, Dr Manisha Chaudhary Kaushambi, संजीवनी अस्पताल कौशाम्बी"
        canonicalPath="/about"
        schemaData={aboutSchema}
      />
      
      {/* 1. HERO-STYLE HEADER BANNER (Full-Bleed, Cinematic 5-Color System) */}
      <section className="relative w-full min-h-[460px] sm:min-h-[500px] md:min-h-[540px] bg-slate-950 text-white overflow-hidden flex items-center">
        {/* Background Image with Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings?.aboutHeroImage || "/hospital-building.jpg"}
            alt="Sanjeevani Multispeciality Hospital Building"
            className="w-full h-full object-cover object-center filter brightness-95 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/25 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="max-w-3xl space-y-4 sm:space-y-5">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold shadow-lg">
              <ShieldCheck className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span className="text-sky-300 font-bold">{settings?.registrationNo || "CMO Reg. No. 2013/108"}</span>
              <span className="text-white/40">•</span>
              <span className="text-slate-200">District's 1st Multispeciality Center</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-white">Sanjeevani Hospital</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
              Kaushambi District's premier multispeciality hospital, tertiary trauma center, and home to the district's first licensed 24x7 blood bank and advanced IUI fertility suite.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-600/30 transition-all cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Doctor Appointment</span>
              </button>

              <a
                href={`tel:${settings?.emergencyPhone || '7897284402'}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 shadow-lg transition-all"
              >
                <PhoneCall className="w-4 h-4 text-sky-400" />
                <span>24x7 Emergency Line</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MAIN STORY & HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600">
                Our Legacy of Healing
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Committed to Compassionate, Modern & Affordable Healthcare
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Established with the vision of bridging the gap in tertiary healthcare in Kaushambi district, <strong>Sanjeevani Multispeciality Hospital & Trauma Center</strong> (CMO Reg. No. 2013/108) stands as a beacon of clinical excellence and patient trust.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              From being the first hospital in the district to introduce a licensed <strong>24x7 Blood Bank and Component Center</strong> (Licence: BBF28C2026UP000019) to pioneering advanced computerized <strong>IUI fertility solutions</strong> and minimally invasive <strong>laparoscopic surgeries</strong>, Sanjeevani brings metropolitan-grade clinical facilities directly to our local community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>24x7 Emergency & Trauma Resuscitation</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>Licensed Blood Component Separation</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>Ayushman Bharat PM-JAY Cashless Facility</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>Free OPD Consultation Every Sunday</span>
              </div>
            </div>

          </div>

          {/* Right Column: Building & Stats */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-800 relative">
              <img
                src="/hospital-building.jpg"
                alt="Sanjeevani Hospital Infrastructure"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <p className="font-bold text-sm">Main Hospital Complex & Trauma Center</p>
                <p className="text-slate-300">Sarai Akil, Kaushambi Road, Kaushambi</p>
              </div>
            </div>

            {/* Quick 2 Counters */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-center">
                <div className="text-2xl font-black text-slate-900">
                  <AnimatedCounter target={50000} suffix="+" />
                </div>
                <span className="text-xs font-semibold text-slate-600">Satisfied Patients</span>
              </div>
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-center">
                <div className="text-2xl font-black text-sky-700">
                  <AnimatedCounter target={12500} suffix="+" />
                </div>
                <span className="text-xs font-semibold text-sky-700">Successful Surgeries</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. MISSION, VISION, VALUES (Strict 5 Colors) */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To provide high-quality, comprehensive, and compassionate medical care with modern clinical technology to every patient, ensuring affordability and accessibility.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To be the most trusted and advanced healthcare destination in the region, recognized for excellence in emergency trauma, maternity, surgery, and fertility care.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Core Values</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clinical Integrity, Patient Safety, Empathy, Transparency, Continuous Innovation, and Dedication to Community Welfare.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP PROFILE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="w-56 h-64 rounded-3xl overflow-hidden shadow-md bg-slate-100 border border-slate-200">
                <img
                  src={primaryDoctor?.image || "https://images.unsplash.com/photo-1594824813873-41a6b0c25a76?auto=format&fit=crop&q=80&w=800"}
                  alt={primaryDoctor?.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Medical Leadership</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{primaryDoctor?.name || 'Dr. Manisha Chaudhary'}</h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-600">{primaryDoctor?.qualifications || 'M.B.B.S. (Hons), D.G.O.'} • Director & Chief Specialist</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                "Our guiding philosophy at Sanjeevani Hospital is that every family in Kaushambi deserves prompt, honest, and high-quality healthcare without having to travel to distant cities. We are dedicated to delivering modern surgery, safe child delivery, fertility support, and life-saving trauma care 24 hours a day."
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-700 shadow-sm transition-all cursor-pointer"
                >
                  Book Appointment with Director
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
