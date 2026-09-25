import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { 
  MapPin, Phone, Mail, Clock, Send, ShieldCheck, 
  CheckCircle2, AlertCircle, MessageCircle, ArrowRight 
} from 'lucide-react';
import PageSEO from '../components/common/PageSEO';

export default function ContactPage() {
  const { settings, sendInquiry } = useHospital();

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Sanjeevani Multispeciality Hospital & Trauma Center",
    "description": "Hospital address, 24x7 emergency helpline phone numbers, and WhatsApp desk in Kaushambi.",
    "url": "https://sanjeevanihospital.in/contact",
    "mainEntity": {
      "@type": "Hospital",
      "name": "Sanjeevani Multispeciality Hospital & Trauma Center",
      "telephone": "+91-9455304235",
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

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.phone || !formData.message) {
      setError('Please provide your name, phone number, and message.');
      return;
    }

    setLoading(true);
    try {
      const res = await sendInquiry(formData);
      setSubmittedInquiry({ ...formData, ...res });
      
      // Auto open WhatsApp with the inquiry details
      const waUrl = getWhatsAppInquiryUrl(formData);
      window.open(waUrl, '_blank');

      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to send message. Please call our helpline.');
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppInquiryUrl = (inquiry) => {
    const text = encodeURIComponent(
      `*New Hospital Inquiry - Sanjeevani Hospital (Kaushambi)*\n` +
      `*Patient/Sender Name:* ${inquiry.name}\n` +
      `*Contact Mobile:* +91 ${inquiry.phone}\n` +
      (inquiry.email ? `*Email:* ${inquiry.email}\n` : '') +
      `*Subject:* ${inquiry.subject || 'General Inquiry'}\n` +
      `*Message:* ${inquiry.message}\n`
    );
    return `https://wa.me/${settings?.whatsappNumber || '919455304235'}?text=${text}`;
  };

  return (
    <div className="space-y-10 sm:space-y-12 pb-16 w-full overflow-hidden">
      <PageSEO 
        title="संपर्क एवं 24x7 इमरजेंसी हेल्पलाइन | Contact Us & Location | Sanjeevani Hospital"
        description="संजीवनी हॉस्पिटल सराय अकिल कौशाम्बी का पता, 24x7 हेल्पलाइन: +91 9455304235, 7897284402, 6307821195, ब्लड बैंक संपर्क एवं गूगल मैप लोकेशन।"
        keywords="Contact Sanjeevani Hospital, Sanjeevani Hospital Kaushambi phone number, emergency helpline Kaushambi, hospital address Sarai Akil, संजीवनी अस्पताल फोन नंबर"
        canonicalPath="/contact"
        schemaData={contactSchema}
      />
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-10 sm:py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2.5">
          <span className="text-[10px] sm:text-xs font-bold text-sky-400 uppercase tracking-widest">
            24x7 Reachability
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Contact Us & Directions
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Get in touch with our hospital desk, emergency trauma unit, blood bank, or visit our facility in Sarai Akil, Kaushambi.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Address Card */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Hospital Address</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {settings?.address || "Sarai Akil, Kaushambi Road, Kaushambi, Uttar Pradesh - 212216"}
              </p>
              <div className="pt-1.5 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{settings?.registrationNo || "CMO Reg. No. 2013/108"}</span>
              </div>
            </div>

            {/* Phone & Emergency */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Emergency & Helplines</h3>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                  <span className="text-slate-500">Primary Help:</span>
                  <a href={`tel:${settings?.primaryPhone}`} className="font-bold text-slate-900 hover:text-sky-600">
                    +91 {settings?.primaryPhone || '9455304235'}
                  </a>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-50">
                  <span className="text-rose-700 font-semibold">24x7 Trauma Line:</span>
                  <a href={`tel:${settings?.emergencyPhone}`} className="font-bold text-rose-600 hover:text-rose-700">
                    +91 {settings?.emergencyPhone || '7897284402'}
                  </a>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                  <span className="text-slate-500">Ambulance / Blood:</span>
                  <a href={`tel:${settings?.helplinePhone}`} className="font-bold text-slate-900 hover:text-sky-600">
                    +91 {settings?.helplinePhone || '6307821195'}
                  </a>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Operational Hours</h3>
              <div className="text-xs space-y-1 text-slate-600">
                <p><strong>OPD Consultations:</strong> Mon - Sat (08:00 AM - 08:00 PM)</p>
                <p className="text-amber-700 font-semibold"><strong>Free Sunday OPD:</strong> 09:00 AM - 02:00 PM</p>
                <p className="text-rose-600 font-bold"><strong>Emergency, Blood Bank, ICU:</strong> 24 Hours Open</p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-5">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-sky-600 uppercase tracking-widest">
                  Direct Inquiries
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Send Us a Message
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Have a question regarding surgery packages, blood bank, or Ayushman card? Fill out the form below.
                </p>
              </div>

              {submittedInquiry ? (
                <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-emerald-900 text-base">Inquiry Submitted Successfully!</h3>
                    <p className="text-xs text-emerald-700">
                      Thank you, <strong>{submittedInquiry.name}</strong>. Your message is recorded in our system.
                    </p>
                  </div>

                  {/* Direct WhatsApp Forward Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppInquiryUrl(submittedInquiry)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Send Directly to WhatsApp</span>
                    </a>

                    <button
                      onClick={() => setSubmittedInquiry(null)}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {error && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Phone Number (WhatsApp) *
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. user@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Subject / Department
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Blood Bank, Surgery, Ayushman Card"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Your Message or Question *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Type your question or query here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Sending Message...' : 'Send Inquiry Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Google Map Embed */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
          <iframe
            title="Sanjeevani Hospital Kaushambi Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115456.88370725586!2d81.4286591730076!3d25.378775466812836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398522ec4bfda449%3A0xe108e4ad9c25ff9!2sSarai%20Akil%2C%20Uttar%20Pradesh%20212216!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

    </div>
  );
}
