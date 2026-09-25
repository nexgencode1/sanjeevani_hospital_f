import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { 
  UserCheck, Stethoscope, Clock, Award, CalendarCheck, 
  Phone, Sparkles, CheckCircle2, Search, Filter, IndianRupee 
} from 'lucide-react';
import PageSEO from '../components/common/PageSEO';

export default function DoctorsPage({ onSelectDoctorForBooking }) {
  const { doctors, settings } = useHospital();
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique departments
  const departments = ['All', ...new Set(doctors.map((d) => d.department))];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesDept = selectedDept === 'All' || doc.department === selectedDept;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.qualifications.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (doc.specialities && doc.specialities.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesDept && matchesSearch;
  });

  const doctorsSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Specialist Doctors & Medical Consultants - Sanjeevani Hospital Kaushambi",
    "description": "Meet our team of specialist surgeons, gynecologists, orthopedic consultants, and physicians.",
    "url": "https://sanjeevanihospital.in/doctors"
  };

  return (
    <div className="space-y-12 pb-16">
      <PageSEO 
        title="विशेषज्ञ चिकित्सक टीम | Specialist Doctors & Surgeons | Sanjeevani Hospital"
        description="डॉ. मनीषा चौधरी (आईयूआई एवं गायनेकोलॉजी विशेषज्ञ), लैप्रोस्कोपिक सर्जन, शिशु रोग विशेषज्ञ। संजीवनी हॉस्पिटल कौशाम्बी में ओपीडी परामर्श व अपॉइंटमेंट।"
        keywords="Doctors in Kaushambi, Dr Manisha Chaudhary, best gynecologist Kaushambi, laparoscopic surgeon Kaushambi, pediatrician Kaushambi, संजीवनी अस्पताल डॉक्टर्स"
        canonicalPath="/doctors"
        schemaData={doctorsSchema}
      />
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Medical Faculty & Consultants
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Our Specialist Doctors & Surgeons
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Experienced medical directors, laparoscopic surgeons, physicians, and pediatric specialists dedicated to your family's health.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Department Chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDept === dept
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search doctor name or speciality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white"
            />
          </div>

        </div>
      </section>

      {/* Doctors Alternating 1-in-a-Row Full Width List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:gap-10">
          {filteredDoctors.map((doctor, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={doctor.id || index}
                className="group relative bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl hover:border-sky-500 hover:ring-2 hover:ring-sky-500/20 transition-all duration-300 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[360px]">
                  
                  {/* Doctor Image Container (Desktop 4 or 5 cols) */}
                  <div
                    className={`lg:col-span-5 relative min-h-[300px] sm:min-h-[340px] lg:min-h-full overflow-hidden bg-slate-950 ${
                      isEven ? '' : 'lg:order-2'
                    }`}
                  >
                    <img
                      src={doctor.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        isEven
                          ? 'lg:bg-gradient-to-r from-slate-950/80 via-transparent to-transparent'
                          : 'lg:bg-gradient-to-l from-slate-950/80 via-transparent to-transparent'
                      }`}
                    ></div>

                    {/* Floating Badges on Doctor Image */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                      <span className="px-3 py-1 rounded-full bg-sky-600 text-white font-bold text-xs shadow-md">
                        {doctor.department}
                      </span>
                      {doctor.featured && (
                        <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-black text-xs shadow-md flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          Lead Specialist
                        </span>
                      )}
                    </div>

                    {/* Mobile bottom info overlay */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 block lg:hidden text-white">
                      <span className="text-xs font-bold text-sky-300 block">{doctor.designation}</span>
                      <h3 className="text-2xl font-black text-white drop-shadow-md">{doctor.name}</h3>
                    </div>
                  </div>

                  {/* Doctor Details Body Container (Desktop 7 cols) */}
                  <div
                    className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 ${
                      isEven ? '' : 'lg:order-1'
                    }`}
                  >
                    <div className="space-y-4">
                      
                      {/* Desktop Header */}
                      <div className="hidden lg:block space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-full">
                            {doctor.designation || 'Consultant Specialist'}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold">•</span>
                          <span className="text-xs text-slate-500 font-medium">
                            {doctor.experience || '14+ Years Clinical Excellence'}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                          {doctor.name}
                        </h3>
                      </div>

                      {/* Qualifications & Degrees */}
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200/80 p-3 rounded-2xl">
                        <Award className="w-4 h-4 text-sky-600 flex-shrink-0" />
                        <span>{doctor.qualifications}</span>
                      </div>

                      {/* OPD Timings & Consultation Fee Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-2.5">
                          <Clock className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[11px] font-bold text-slate-500 block">OPD Schedule</span>
                            <span className="text-xs font-extrabold text-slate-800">
                              {doctor.availability || doctor.timing || 'Mon - Sat: 10:00 AM - 04:00 PM'}
                            </span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[11px] font-bold text-slate-500 block">Consultation Fee</span>
                            <span className="text-xs font-extrabold text-emerald-800">
                              {(doctor.consultationFee || doctor.opdFee) && (doctor.consultationFee || doctor.opdFee).trim() !== ''
                                ? doctor.consultationFee || doctor.opdFee
                                : 'Standard OPD'}{' '}
                              <span className="text-[10px] text-emerald-600 font-normal">(Free Every Sunday)</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Areas of Clinical Expertise */}
                      {doctor.specialities && doctor.specialities.length > 0 && (
                        <div className="space-y-2 pt-1">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Key Clinical Expertise & Procedures:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                            {doctor.specialities.map((spec, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0"></span>
                                <span className="font-semibold">{spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                      <button
                        onClick={() => onSelectDoctorForBooking(doctor)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                      >
                        <CalendarCheck className="w-4 h-4" />
                        <span>Book Appointment with {doctor.name.split(' ')[0] || 'Doctor'}</span>
                      </button>

                      <a
                        href={`tel:${settings?.primaryPhone || '9455304235'}`}
                        className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
                      >
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <span>Call Hospital Desk</span>
                      </a>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
