import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { 
  Send, Phone, MapPin, Clock, MessageSquare, 
  CheckCircle2, AlertCircle, Sparkles, ShieldCheck 
} from 'lucide-react';

// Authentic WhatsApp SVG
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export default function HomeContactSection() {
  const { settings, sendInquiry } = useHospital();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: 'General OPD Consultation',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const departments = [
    'General OPD Consultation',
    'Sanjeevani Blood Bank & Components',
    'IUI & Infertility Care Center',
    'Laparoscopic (Keyhole) Surgery',
    '24x7 Emergency & Trauma Resuscitation',
    'Maternity & Cesarean Delivery',
    'Orthopedics & Spine Surgery',
    'Pediatrics & Child Care',
    'Ayushman Bharat PM-JAY Cashless Desk',
    'Free Sunday OPD Consultation'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError('Please enter your full name, phone number, and query message.');
      return;
    }

    setLoading(true);

    try {
      // 1. SAVE TO ADMIN PANEL & DATABASE
      await sendInquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        department: formData.department,
        subject: `Homepage Inquiry - ${formData.department}`,
        message: formData.message.trim()
      });

      // 2. PREPARE & TRIGGER WHATSAPP CHAT
      const whatsappNumber = settings?.whatsappNumber || '919455304235';
      const whatsappText = 
        `*New Hospital Inquiry - Sanjeevani Hospital (Kaushambi)*\n\n` +
        `👤 *Patient Name:* ${formData.name.trim()}\n` +
        `📞 *Contact Number:* +91 ${formData.phone.trim()}\n` +
        `🏥 *Department / Service:* ${formData.department}\n` +
        `💬 *Message / Query:* ${formData.message.trim()}\n\n` +
        `_Inquiry successfully saved in hospital administrative portal._`;

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
      window.open(whatsappUrl, '_blank');

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        department: 'General OPD Consultation',
        message: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to submit inquiry. Please call our 24x7 helpline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden">
        
        {/* Ambient Subtle Sky Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Hospital Contact Details & Live Desk */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/20 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Direct Hospital Desk & WhatsApp
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Quick Medical Inquiry & WhatsApp Helpdesk
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Fill this form to submit your inquiry. It will be <strong>securely saved in our hospital admin system</strong> and <strong>instantly connected to our WhatsApp desk</strong> for quick assistance.
              </p>
            </div>

            {/* Quick Helpline Boxes */}
            <div className="space-y-3 pt-2">
              <a
                href={`tel:${settings?.primaryPhone || '9455304235'}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-600/20 text-sky-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block">Main Hospital Reception</span>
                  <span className="text-sm font-extrabold text-white group-hover:text-sky-300 transition-colors">
                    +91 {settings?.primaryPhone || '9455304235'}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${settings?.emergencyPhone || '7897284402'}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block">24x7 Emergency & Blood Bank</span>
                  <span className="text-sm font-extrabold text-white group-hover:text-rose-300 transition-colors">
                    +91 {settings?.emergencyPhone || '7897284402'}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${settings?.helplinePhone || '6307821195'}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block">Ambulance & General Helpline</span>
                  <span className="text-sm font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                    +91 {settings?.helplinePhone || '6307821195'}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block">Location</span>
                  <span className="font-semibold text-white">
                    Sarai Akil, Kaushambi Road, Kaushambi (U.P.)
                  </span>
                </div>
              </div>
            </div>

            {/* Registration Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-300">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>{settings?.registrationNo || 'CMO Reg. No. 2013/108'}</span>
            </div>
          </div>

          {/* Right Column: Dual-Save Contact Form (Admin + WhatsApp) */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
            
            <div className="border-b border-slate-800 pb-4 mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-sky-400" />
                  Send Patient Inquiry
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Synced directly to Admin Portal & WhatsApp Helpline
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-xs font-bold">
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Sync</span>
              </div>
            </div>

            {success && (
              <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs font-semibold mb-6 flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-300 text-sm">
                    Inquiry Saved & WhatsApp Connected!
                  </p>
                  <p className="text-emerald-200/90 mt-0.5">
                    Your inquiry has been stored in our hospital administrative database and WhatsApp chat was launched. Our medical desk will respond shortly.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs font-semibold mb-6 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Patient / Attendant Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-500 focus:outline-sky-500 focus:border-sky-500 font-medium"
                  />
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Contact Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="e.g. 9876543210"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-500 focus:outline-sky-500 focus:border-sky-500 font-medium"
                  />
                </div>
              </div>

              {/* Department Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Select Department / Medical Concern
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-sky-500 focus:border-sky-500 font-medium"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className="bg-slate-900 text-white">
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Your Query or Medical Message *
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Describe doctor consultation inquiry, blood requirement, or surgery question..."
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-500 focus:outline-sky-500 focus:border-sky-500 font-medium resize-none"
                ></textarea>
              </div>

              {/* Submit Button (Dual action: Admin save + WhatsApp) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 shadow-xl shadow-sky-600/30 transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>
                    {loading ? 'Saving & Connecting...' : 'Submit to Admin & Connect WhatsApp'}
                  </span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400 pt-1">
                🔒 Your medical inquiry is recorded securely in hospital records and immediately forwarded to our duty desk on WhatsApp.
              </p>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
