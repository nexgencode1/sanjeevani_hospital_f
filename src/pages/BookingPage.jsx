import React, { useState, useEffect } from 'react';
import { useHospital } from '../context/HospitalContext';
import { 
  CalendarCheck, User, Phone, Mail, Clock, Stethoscope, 
  FileText, CheckCircle2, MessageSquare, Sparkles, AlertCircle, ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import PageSEO from '../components/common/PageSEO';

export default function BookingPage({ preselectedDoctor, onBookingSuccess }) {
  const { doctors, settings, bookAppointment } = useHospital();

  const bookingSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Book Doctor Appointment - Sanjeevani Hospital Kaushambi",
    "description": "Book outpatient OPD consultation with specialist doctors or register for Free Sunday OPD at Sanjeevani Hospital Kaushambi.",
    "url": "https://sanjeevanihospital.in/booking"
  };

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Male',
    department: '',
    doctorId: '',
    doctorName: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    timeSlot: '10:00 AM',
    symptoms: '',
    isSundayOPD: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // If a preselected doctor was passed
  useEffect(() => {
    if (preselectedDoctor) {
      setFormData((prev) => ({
        ...prev,
        doctorId: preselectedDoctor.id,
        doctorName: preselectedDoctor.name,
        department: preselectedDoctor.department
      }));
    } else if (doctors.length > 0 && !formData.doctorId) {
      setFormData((prev) => ({
        ...prev,
        doctorId: doctors[0].id,
        doctorName: doctors[0].name,
        department: doctors[0].department
      }));
    }
  }, [preselectedDoctor, doctors]);

  const handleDoctorChange = (e) => {
    const docId = e.target.value;
    const selected = doctors.find((d) => d.id === docId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        doctorId: selected.id,
        doctorName: selected.name,
        department: selected.department
      }));
    }
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.patientName || !formData.phone) {
      setError('Please provide patient name and phone number.');
      return;
    }

    if (formData.phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const result = await bookAppointment(formData);
      setConfirmedBooking(result);
      
      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      if (onBookingSuccess) onBookingSuccess(result);
    } catch (err) {
      setError(err.message || 'Failed to submit appointment. Please try again or call our helpline.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewBooking = () => {
    setConfirmedBooking(null);
    setFormData({
      patientName: '',
      phone: '',
      email: '',
      age: '',
      gender: 'Male',
      department: doctors[0]?.department || '',
      doctorId: doctors[0]?.id || '',
      doctorName: doctors[0]?.name || '',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      timeSlot: '10:00 AM',
      symptoms: '',
      isSundayOPD: false
    });
  };

  const generateWhatsAppConfirmation = () => {
    if (!confirmedBooking) return '#';
    const text = encodeURIComponent(
      `*Sanjeevani Hospital - Appointment Confirmation*\n` +
      `Token ID: ${confirmedBooking.id}\n` +
      `Patient Name: ${confirmedBooking.patientName}\n` +
      `Doctor: ${confirmedBooking.doctorName}\n` +
      `Department: ${confirmedBooking.department}\n` +
      `Date & Slot: ${confirmedBooking.date} at ${confirmedBooking.timeSlot}\n` +
      `Address: Sarai Akil, Kaushambi Road, Kaushambi - 212216\n` +
      `Helpline: +91 ${settings?.primaryPhone || '9455304235'}`
    );
    return `https://wa.me/${settings?.whatsappNumber || '919455304235'}?text=${text}`;
  };

  return (
    <div className="space-y-12 pb-16">
      <PageSEO 
        title="ऑनलाइन डॉक्टर अपॉइंटमेंट बुक करें | Book OPD Appointment | Sanjeevani Hospital"
        description="संजीवनी हॉस्पिटल कौशाम्बी में डॉक्टर परामर्श के लिए ऑनलाइन टोकन व स्लॉट बुक करें। प्रत्येक रविवार निःशुल्क ओपीडी परामर्श उपलब्ध।"
        keywords="Book doctor appointment Kaushambi, online OPD registration, Dr Manisha Chaudhary appointment, free Sunday OPD Kaushambi, संजीवनी अपॉइंटमेंट"
        canonicalPath="/booking"
        schemaData={bookingSchema}
      />
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Seamless Patient Consultation
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Book Doctor Appointment
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Schedule an OPD consultation with our specialist doctors or register for our Free Sunday OPD Camp.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        {confirmedBooking ? (
          /* Confirmation Card */
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-2xl space-y-6 animate-in zoom-in-95 duration-300 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Appointment Requested Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Booking Token: <span className="text-sky-600">{confirmedBooking.id}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Thank you, <strong>{confirmedBooking.patientName}</strong>. Your consultation request has been recorded.
              </p>
            </div>

            {/* Summary Details Grid */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-xs text-left grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <div>
                <span className="text-slate-400 block text-[11px]">Doctor</span>
                <span className="font-bold text-slate-800 text-sm">{confirmedBooking.doctorName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Department</span>
                <span className="font-semibold text-slate-700">{confirmedBooking.department}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Date & Time</span>
                <span className="font-bold text-slate-800">{confirmedBooking.date} ({confirmedBooking.timeSlot})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Contact Mobile</span>
                <span className="font-bold text-slate-800">+91 {confirmedBooking.phone}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={generateWhatsAppConfirmation()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Receive Token on WhatsApp</span>
              </a>

              <button
                onClick={handleNewBooking}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* Form Card */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
            
            {/* Free Sunday OPD Banner Alert */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <span className="font-bold block">Free Sunday Consultation Available!</span>
                <span className="text-amber-800">No doctor consultation fee is charged on Sundays from 09:00 AM to 02:00 PM.</span>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Doctor & Department Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-sky-600" />
                  Select Specialist & Date
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Choose Doctor *
                    </label>
                    <select
                      value={formData.doctorId}
                      onChange={handleDoctorChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                      required
                    >
                      {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} - {doc.qualifications}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      readOnly
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 font-medium cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Patient Details Section */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <User className="w-4 h-4 text-sky-600" />
                  Patient Personal Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9455304235"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Age & Gender
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Age"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                      />
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Child / Infant">Child / Infant</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. patient@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Symptoms or Brief Reason for Consultation
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe symptoms, previous medical history or treatment details..."
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                  ></textarea>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-sky-600/25 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>{loading ? 'Submitting Appointment...' : 'Confirm Appointment Request'}</span>
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  For immediate accident or critical emergencies, please directly call <strong>+91 {settings?.primaryPhone || '9455304235'}</strong>.
                </p>
              </div>

            </form>
          </div>
        )}
      </section>

    </div>
  );
}
