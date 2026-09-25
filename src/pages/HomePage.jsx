import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { 
  ShieldCheck, HeartPulse, Clock, Sparkles, PhoneCall, CalendarCheck, 
  Award, CheckCircle2, ChevronRight, Activity, Droplets, Baby, 
  Stethoscope, MapPin, ArrowRight, UserCheck, Star, Bed, Building2
} from 'lucide-react';
import HeroSlider from '../components/home/HeroSlider';
import SpecializedCareSection from '../components/home/SpecializedCareSection';
import StatsSection from '../components/home/StatsSection';
import FlipDepartmentCard from '../components/home/FlipDepartmentCard';
import TestimonialsSection from '../components/home/TestimonialsSection';
import HomeDoctorsSection from '../components/home/HomeDoctorsSection';
import HomeContactSection from '../components/home/HomeContactSection';
import PageSEO from '../components/common/PageSEO';

export default function HomePage({ setActiveTab, onOpenBooking }) {
  const { settings, doctors } = useHospital();
  const primaryDoctor = doctors.find((d) => d.id === 'doc-1') || doctors[0];

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Sanjeevani Multispeciality Hospital & Trauma Center Kaushambi",
    "description": "Kaushambi's 1st Multispeciality Hospital with 24x7 Emergency, Licensed Blood Bank, IUI Fertility Center, Ayushman Bharat PM-JAY Cashless Care, and Sunday Free OPD.",
    "url": "https://sanjeevanihospital.in/",
    "about": {
      "@type": "Hospital",
      "name": "Sanjeevani Multispeciality Hospital & Trauma Center",
      "telephone": "+91-9455304235"
    }
  };

  // 9 Departments -> Exactly 3 Cards per Row (3x3 grid)
  const departments = [
    {
      title: '24x7 Emergency & Trauma',
      badge: '24x7 Resuscitation',
      desc: 'Rapid critical trauma resuscitation, acute medical emergencies, and round-the-clock emergency medical officers.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      icon: HeartPulse,
      timing: 'Open 24 Hours • All Days',
      procedures: [
        'Acute Road Trauma Resuscitation',
        'Advanced Cardiac Life Support (ACLS)',
        'Emergency Fracture Stabilization',
        '24x7 Dedicated Trauma Minor OT'
      ]
    },
    {
      title: 'Blood Bank & Components',
      badge: 'Licence BBF28C2026UP000019',
      desc: 'Kaushambi\'s first licensed 24x7 blood bank providing whole blood and computerized component separation.',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
      icon: Droplets,
      timing: '24x7 Emergency Blood Issue',
      procedures: [
        'Packed Red Blood Cells (PRBC)',
        'Platelet Concentrates (RDP / SDP)',
        'Fresh Frozen Plasma (FFP)',
        'NAT & ELISA Screened Safety Testing'
      ]
    },
    {
      title: 'IUI & Infertility Unit',
      badge: 'Led by Dr. Manisha Chaudhary',
      desc: 'Advanced fertility evaluation, ovulation tracking, and computerized intrauterine insemination procedures.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      icon: Baby,
      timing: 'Daily OPD (Mon - Sat)',
      procedures: [
        'Computerized Sperm Preparation',
        'Serial Follicular & Ovulation Study',
        'Tubal Patency & Fertility Evaluation',
        'High-Success IUI Insemination'
      ]
    },
    {
      title: 'Laparoscopic Keyhole Surgery',
      badge: 'Modular OT Suites',
      desc: 'Minimally invasive keyhole surgical procedures with reduced hospital stay and fast postoperative recovery.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
      icon: Activity,
      timing: 'Daily Scheduled & Emergency OT',
      procedures: [
        'Laparoscopic Cholecystectomy (Gallbladder)',
        'Laparoscopic Hernia Repair',
        'Keyhole Appendix Removal (Appendectomy)',
        'Minimally Invasive Gynae Surgery'
      ]
    },
    {
      title: 'Orthopedics & Spine Care',
      badge: 'Trauma & Joint Center',
      desc: 'Comprehensive fracture trauma management, arthroscopic interventions, joint replacements, and spine care.',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
      icon: ShieldCheck,
      timing: 'Mon - Sat: 9:00 AM - 6:00 PM',
      procedures: [
        'Complex Fracture Internal Fixation & Plating',
        'Joint Pain & Arthritis Management',
        'Diagnostic & Therapeutic Arthroscopy',
        'Spine Alignment & Disc Decompression'
      ]
    },
    {
      title: 'Pediatrics & Neonatal Care',
      badge: 'Child Wellness Unit',
      desc: 'Dedicated newborn care, developmental assessment, childhood illnesses, and government-approved vaccination.',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
      icon: Stethoscope,
      timing: 'Mon - Sat OPD • 24x7 Emergency',
      procedures: [
        'Newborn Phototherapy & Resuscitation',
        'Growth & Developmental Monitoring',
        'Complete Pediatric Vaccination Program',
        'Acute Childhood Infection Care'
      ]
    },
    {
      title: 'Pathology & Digital Diagnostics',
      badge: 'Automated Diagnostic Lab',
      desc: 'Fully automated biochemistry, hematology, digital X-Ray, 3D/4D ultrasound, and computerized ECG.',
      image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&q=80&w=800',
      icon: Activity,
      timing: '24x7 Emergency Testing',
      procedures: [
        'Automated Blood Cell Counter & Biochemistry',
        'Digital High-Frequency X-Ray',
        'Color Doppler & 3D/4D Obstetric Ultrasound',
        'Computerized 12-Lead ECG Diagnostics'
      ]
    },
    {
      title: 'Deluxe AC Rooms & Recovery',
      badge: 'Inpatient Amenities',
      desc: 'Private air-conditioned recovery rooms, sterile post-op monitoring wards, and in-house 24hr pharmacy.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      icon: Bed,
      timing: '24x7 Admission & Inpatient Care',
      procedures: [
        'Private AC Recovery Rooms with Attendant Couch',
        'Sterile Post-Operative Monitoring Unit',
        '24x7 In-House Medicine Pharmacy',
        '24x7 Ambulance Patient Transfer'
      ]
    },
    {
      title: 'Ayushman Bharat & Free OPD',
      badge: 'PM-JAY Partner Hospital',
      desc: 'Cashless treatment up to ₹5 Lakhs for Ayushman cardholders, plus free medical consultation every Sunday.',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800',
      icon: Award,
      timing: 'Free OPD: Every Sunday (9 AM - 2 PM)',
      procedures: [
        '₹5 Lakhs 100% Cashless Hospitalization',
        'Free Sunday Medical & Surgical OPD',
        'Hausala Saajhedari Laparoscopic Partner',
        'Dedicated Ayushman Mitra Help Desk'
      ]
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 w-full overflow-hidden">
      <PageSEO 
        title="संजीवनी हॉस्पिटल कौशाम्बी | 24x7 Emergency, Trauma & Licensed Blood Bank"
        description="कौशाम्बी का प्रथम 24x7 लाइसेंसी ब्लड बैंक, आईयूआई फर्टिलिटी, लैप्रोस्कोपिक सर्जरी, आयुष्मान भारत PM-JAY कैशलेस इलाज एवं प्रत्येक रविवार फ्री ओपीडी। हेल्पलाइन: +91 9455304235, 7897284402"
        keywords="Sanjeevani Hospital Kaushambi, hospital in Sarai Akil, blood bank Kaushambi, emergency hospital Kaushambi, Dr Manisha Chaudhary, IUI center Kaushambi, संजीवनी हॉस्पिटल कौशाम्बी"
        canonicalPath="/"
        schemaData={homeSchema}
      />
      
      {/* 1. HERO SLIDER SECTION (Full-Width, Alag Text & Images, Admin Editable) */}
      <HeroSlider 
        settings={settings} 
        onOpenBooking={onOpenBooking} 
        setActiveTab={setActiveTab} 
      />

      {/* 2. SPECIALIZED CARE CENTERS (Hero ke theek baad, Full-Screen with Realistic Imagery) */}
      <SpecializedCareSection
        settings={settings}
        onOpenBooking={onOpenBooking}
        setActiveTab={setActiveTab}
      />

      {/* 3. ANIMATED STATS COUNTER (0 to Target Smooth Count-Up Animation) */}
      <StatsSection settings={settings} />

      {/* 4. OUR DEPARTMENTS & SERVICES (3 Cards Per Row, 3D Flip Card Hover Animation, Unified Palette) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            Complete Multispeciality Infrastructure
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Our Departments & Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            Comprehensive medical and surgical specialties under one roof. Hover or tap any card to view detailed procedures and book an appointment.
          </p>
        </div>

        {/* 3 Cards Per Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <FlipDepartmentCard
              key={index}
              department={dept}
              onOpenBooking={onOpenBooking}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>
      </section>

      {/* 5. SUNDAY FREE CONSULTATION & AYUSHMAN BHARAT HIGHLIGHT CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* Card 1: Free Sunday OPD */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-slate-900 border border-slate-800 hover:border-sky-500 hover:ring-2 hover:ring-sky-500/20 text-white shadow-xl overflow-hidden flex flex-col justify-between group transition-all duration-300">
            {/* Subtle soft tint overlay on hover */}
            <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/[0.03] transition-colors duration-300 pointer-events-none z-10"></div>

            <div className="space-y-3 relative z-20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/20 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                Community Healthcare Initiative
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                Free Medical Consultation Every Sunday
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Free consultation across general and surgical departments with zero doctor consultation fees every Sunday from <strong>09:00 AM to 02:00 PM</strong>.
              </p>
            </div>

            <div className="pt-6 relative z-20 flex items-center justify-between gap-2 border-t border-slate-800 mt-4">
              <span className="text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl">
                Sun: 9:00 AM - 2:00 PM
              </span>
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Reserve Free Slot</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Ayushman Bharat PM-JAY */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-slate-900 border border-slate-800 hover:border-sky-500 hover:ring-2 hover:ring-sky-500/20 text-white shadow-xl overflow-hidden flex flex-col justify-between group transition-all duration-300">
            {/* Subtle soft tint overlay on hover */}
            <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/[0.03] transition-colors duration-300 pointer-events-none z-10"></div>

            <div className="space-y-3 relative z-20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/20 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                Government Empanelled Partner
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                Ayushman Bharat PM-JAY Cashless Care
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Eligible cardholders avail 100% cashless medical care and surgery up to ₹5 Lakhs. Empanelled with <strong>Hausala Saajhedari</strong> for laparoscopic surgeries.
              </p>
            </div>

            <div className="pt-6 relative z-20 flex items-center justify-between gap-2 border-t border-slate-800 mt-4">
              <span className="text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl">
                ₹5 Lakh Cashless Cover
              </span>
              <button
                onClick={() => setActiveTab('contact')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer"
              >
                <span>Inquire Desk</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. SPECIALIST DOCTORS (3-4 DOCTORS GRID) */}
      <HomeDoctorsSection 
        doctors={doctors} 
        settings={settings} 
        onOpenBooking={onOpenBooking} 
        setActiveTab={setActiveTab} 
      />

      {/* 7. LEAD CLINICAL DIRECTOR SPOTLIGHT (Dr. Manisha Chaudhary) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden border border-slate-800 hover:border-sky-500/50 hover:ring-1 hover:ring-sky-500/20 transition-all duration-300 group">
          {/* Subtle soft tint overlay on hover */}
          <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/[0.02] transition-colors duration-300 pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Doctor Photo */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <div className="w-52 h-64 sm:w-64 sm:h-76 rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-slate-900">
                  <img
                    src={primaryDoctor?.image || "https://images.unsplash.com/photo-1594824813873-41a6b0c25a76?auto=format&fit=crop&q=80&w=800"}
                    alt={primaryDoctor?.name || "Dr. Manisha Chaudhary"}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-sky-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg whitespace-nowrap border border-white/20">
                  Director & Chief Specialist
                </div>
              </div>
            </div>

            {/* Doctor Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">
                  Lead Clinical Director
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {primaryDoctor?.name || "Dr. Manisha Chaudhary"}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-sky-300">
                  {primaryDoctor?.qualifications || "M.B.B.S. (Hons), D.G.O."} • Obstetrician, Gynecologist & Laparoscopic Surgeon
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {primaryDoctor?.bio || "Dr. Manisha Chaudhary has dedicated over 14 years to advancing maternity care, laparoscopic gynae surgery, and fertility treatments in Kaushambi. She is acclaimed for successfully handling high-risk deliveries, minimally invasive keyhole operations, and computerized IUI procedures."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>High-Risk Pregnancy & Normal Deliveries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Infertility & Advanced Computerized IUI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Keyhole Laparoscopic Gynae Surgeries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Free Sunday OPD Consultations</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <button
                  onClick={onOpenBooking}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-sky-600 hover:bg-sky-500 shadow-md transition-all cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Consultation with Dr. Manisha</span>
                </button>

                <button
                  onClick={() => setActiveTab('doctors')}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>View All Hospital Doctors</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 8. PATIENT TESTIMONIALS SECTION */}
      <TestimonialsSection settings={settings} />

      {/* 9. QUICK INQUIRY & DUAL ACTION FORM (Admin Panel + WhatsApp) */}
      <HomeContactSection />

    </div>
  );
}
