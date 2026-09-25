import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { 
  HeartPulse, Droplets, Baby, Activity, ShieldCheck, Stethoscope, 
  Eye, Ear, Sparkles, Building, Pill, Ambulance, CheckCircle2, 
  PhoneCall, CalendarCheck, ChevronRight, Search 
} from 'lucide-react';
import PageSEO from '../components/common/PageSEO';

export default function ServicesPage({ onOpenBooking, setActiveTab }) {
  const { settings } = useHospital();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Medical Services & Departments - Sanjeevani Hospital Kaushambi",
    "description": "Comprehensive healthcare facilities including 24x7 Emergency, Licensed Blood Bank, Laparoscopic Surgery, and IUI Fertility Center.",
    "url": "https://sanjeevanihospital.in/services"
  };

  const servicesList = [
    {
      id: 'blood-bank',
      category: 'Specialized Units',
      title: 'Sanjeevani Blood Bank & Component Center',
      tagline: 'Licence No. BBF28C2026UP000019 • 24x7 Operational',
      image: settings?.bloodBankImage || 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
      icon: Droplets,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      desc: 'District’s leading licensed blood bank offering whole blood and component separation including PRBC (Packed Red Blood Cells), Platelet Concentrates, and Fresh Frozen Plasma (FFP).',
      points: [
        'Component separation (PRBC, Platelets, FFP)',
        '100% voluntary & replacement blood testing',
        'Advanced NAT / ELISA infectious screening',
        '24-Hour emergency blood issue counter'
      ]
    },
    {
      id: 'iui-center',
      category: 'Specialized Units',
      title: 'Sanjeevani IUI & Infertility Center',
      tagline: 'Led by Dr. Manisha Chaudhary • Advanced Fertility Care',
      image: settings?.iuiInfertilityImage || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      icon: Baby,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      desc: 'Specialized diagnosis and computerized Intrauterine Insemination (IUI) treatments for couples facing conception challenges, with personalized hormonal and ovulation monitoring.',
      points: [
        'Comprehensive fertility evaluation for couples',
        'Computerized semen analysis & preparation',
        'Follicular tracking & ovulation induction',
        'High clinical success rates & ethical counselling'
      ]
    },
    {
      id: 'emergency-trauma',
      category: 'Emergency & Critical',
      title: '24-Hour Emergency & Trauma Care',
      tagline: 'Round-The-Clock Critical Resuscitation',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      icon: HeartPulse,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      desc: 'Fully equipped trauma resuscitation unit capable of handling severe road accident polytrauma, head injuries, poisoning, cardiac emergencies, and acute surgical conditions.',
      points: [
        'Dedicated trauma surgeons & emergency doctors',
        'Multipara vital monitoring & defibrillators',
        'Immediate emergency blood & OT access',
        '24x7 advanced life support ambulance'
      ]
    },
    {
      id: 'laparoscopic-surgery',
      category: 'Surgical Specialities',
      title: 'Laparoscopic (Keyhole) Surgery',
      tagline: 'Minimally Invasive • Faster Recovery',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
      icon: Activity,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      desc: 'Advanced keyhole laparoscopic procedures for gallbladder stones, appendix, hernia, and gynae operations resulting in minimal pain, smaller scars, and quick return to daily life.',
      points: [
        'Laparoscopic Gallbladder & Appendix removal',
        'Laparoscopic Hernia repair (TEP / TAPP)',
        'Laparoscopic Hysterectomy & Ovarian Cystectomy',
        'Hausala Saajhedari Laparoscopic Family Planning'
      ]
    },
    {
      id: 'maternity-gynae',
      category: 'Women & Child',
      title: 'Maternity, Normal & Cesarean Delivery',
      tagline: 'Safe Motherhood & Comprehensive Care',
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800',
      icon: Baby,
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      desc: 'Complete antenatal, delivery, and post-natal care under senior gynecologist Dr. Manisha Chaudhary, specializing in both painless normal deliveries and high-risk Cesarean sections.',
      points: [
        'Painless labor & natural delivery support',
        'High-risk pregnancy management',
        '24x7 emergency Cesarean surgical support',
        'Postnatal neonatal checkups & lactation guidance'
      ]
    },
    {
      id: 'orthopedics-spine',
      category: 'Surgical Specialities',
      title: 'Orthopedics & Spine Surgery',
      tagline: 'Bone Fractures & Joint Replacement',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800',
      icon: ShieldCheck,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      desc: 'Comprehensive management of complex fractures, joint trauma, spine disc disorders, arthritis, and knee/hip joint replacement surgeries.',
      points: [
        'Complex trauma & fracture fixation',
        'Spine decompression & disc surgeries',
        'Arthroscopic joint procedures',
        'Pediatric deformity corrections & arthritis care'
      ]
    },
    {
      id: 'general-plastic-surgery',
      category: 'Surgical Specialities',
      title: 'General & Plastic Surgery',
      tagline: 'Laser Proctology & Reconstructive Surgery',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
      icon: Activity,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      desc: 'General surgical operations including laser treatment for piles, fissure, fistula, abdominal surgeries, burn trauma care, and cosmetic reconstructive procedures.',
      points: [
        'Laser proctology (Piles, Fissure, Fistula)',
        'Burn care & plastic wound reconstruction',
        'Thyroid, breast, and swelling excisions',
        'Diabetic foot & soft tissue repair'
      ]
    },
    {
      id: 'pediatrics-childcare',
      category: 'Women & Child',
      title: 'Pediatrics & Child Health Care',
      tagline: 'Newborn to Adolescent Medicine',
      image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800',
      icon: Stethoscope,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      desc: 'Holistic healthcare for children including newborn care, childhood infections, growth assessment, nutrition counselling, and complete vaccination schedules.',
      points: [
        'Complete childhood immunization schedule',
        'Neonatal jaundice & infection treatment',
        'Childhood asthma & respiratory illness care',
        'Growth and developmental milestone tracking'
      ]
    },
    {
      id: 'diagnostics-radiology',
      category: 'Diagnostics & Support',
      title: 'Pathology, Digital X-Ray & Ultrasound',
      tagline: 'Accurate & High-Speed Diagnostics',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      icon: Activity,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      desc: 'In-house diagnostic center featuring automated biochemistry, hematology analyzers, digital high-resolution X-Ray, 3D/4D color Doppler ultrasound, and ECG.',
      points: [
        'Fully automated pathology testing',
        'High definition digital X-Ray imaging',
        '3D/4D obstetrics & abdominal ultrasound',
        'Instant ECG & pre-operative fitness checks'
      ]
    },
    {
      id: 'ophthalmology-ent',
      category: 'Specialized Units',
      title: 'Eye Care & ENT Speciality',
      tagline: 'Vision & Ear, Nose, Throat Care',
      image: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&q=80&w=800',
      icon: Eye,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      desc: 'Expert diagnosis and treatments for vision refractive errors, cataract screening, ear infections, hearing evaluation, sinus disorders, and throat ailments.',
      points: [
        'Computerized eye vision & refraction check',
        'Cataract & glaucoma screening',
        'ENT endoscopy & ear infection management',
        'Tonsillitis & sinus disease treatments'
      ]
    },
    {
      id: 'wards-deluxe-rooms',
      category: 'Diagnostics & Support',
      title: 'Deluxe AC Rooms & In-House Pharmacy',
      tagline: 'Comfortable Recovery & 24x7 Medicines',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
      icon: Pill,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      desc: 'Clean, sanitized general wards and private air-conditioned deluxe recovery rooms equipped with 24-hour round-the-clock nursing care and full in-house pharmacy.',
      points: [
        'Private deluxe AC rooms for patient comfort',
        '24x7 in-house licensed pharmacy counter',
        '24-Hour continuous nursing & caregiver support',
        'Nutritious dietary assistance during stay'
      ]
    },
    {
      id: 'government-schemes',
      category: 'Community & Schemes',
      title: 'Ayushman Bharat PM-JAY & Free Sunday OPD',
      tagline: 'Cashless & Community Healthcare',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
      icon: Sparkles,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      desc: 'Official partner for Ayushman Bharat PM-JAY offering cashless treatment up to ₹5 Lakhs, Hausala Saajhedari laparoscopic sterilization, and Free OPD every Sunday.',
      points: [
        'Ayushman Bharat PM-JAY cashless admissions',
        'Free doctor consultation every Sunday (9 AM - 2 PM)',
        'Hausala Saajhedari family planning procedures',
        'Transparent and affordable pricing for all'
      ]
    }
  ];

  const categories = ['All', 'Specialized Units', 'Emergency & Critical', 'Surgical Specialities', 'Women & Child', 'Diagnostics & Support', 'Community & Schemes'];

  const filteredServices = servicesList.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      <PageSEO 
        title="चिकित्सा सुविधाएं एवं विभाग | Medical Services & Departments | Sanjeevani Hospital"
        description="24x7 इमरजेंसी एवं ट्रॉमा, कौशाम्बी का प्रथम लाइसेंसी ब्लड बैंक, आईयूआई फर्टिलिटी, मॉड्यूलर लैप्रोस्कोपिक सर्जरी, मैटरनिटी, एवं आयुष्मान भारत कैशलेस इलाज।"
        keywords="hospital services Kaushambi, blood bank in Kaushambi, laparoscopic surgery Kaushambi, IUI fertility center, Ayushman hospital Kaushambi, emergency trauma center"
        canonicalPath="/services"
        schemaData={servicesSchema}
      />
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Complete Healthcare Facilities
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Medical Services & Specialized Units
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            From 24x7 emergency trauma and licensed blood banking to computerized IUI and modular laparoscopic surgery.
          </p>
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white"
            />
          </div>

        </div>
      </section>

      {/* Services Grid with Visual Image Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl hover:border-sky-500 hover:ring-2 hover:ring-sky-500/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Service Image Banner with Category Pill & Icon */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-950">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
                    
                    {/* Top Floating Category Badge & Icon */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-sky-300 border border-slate-700 shadow-sm">
                        {service.category}
                      </span>
                      <div className={`w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md ${service.color} flex items-center justify-center shadow-md`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Bottom overlay tagline */}
                    <div className="absolute bottom-3 left-4 right-4 z-10">
                      <span className="text-xs font-bold text-sky-300 drop-shadow">
                        {service.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.desc}
                    </p>

                    {/* 4 Feature Points */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {service.points.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs font-medium text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={onOpenBooking}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-600/30 transition-all cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Book Service</span>
                  </button>

                  <a
                    href={`tel:${settings?.emergencyPhone || settings?.primaryPhone || '7897284402'}`}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all"
                    title="Call Hospital Helpline"
                  >
                    <PhoneCall className="w-4 h-4 text-sky-600" />
                    <span>Call Desk</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
