import React, { useState, useEffect } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { 
  Building2, Phone, Mail, MapPin, Clock, Save, 
  CheckCircle2, AlertCircle, Sparkles, ShieldCheck,
  TrendingUp, Image, Upload, Activity
} from 'lucide-react';

export default function SiteSettingsManager() {
  const { settings, updateSettings } = useHospital();
  const { token } = useAuth();
  
  const [formData, setFormData] = useState({ ...settings });
  const [loading, setLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (settings) {
      setFormData({ ...settings });
    }
  }, [settings]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || {}),
        [field]: value
      }
    }));
  };

  const handleFileUpload = async (field, file) => {
    if (!file) return;
    setUploadingField(field);
    setErrorMsg('');

    try {
      const res = await api.uploadImage(file, token);
      if (res.success && res.url) {
        handleChange(field, res.url);
        setSuccessMsg(
          res.provider === 'cloudinary'
            ? 'Image successfully uploaded to Cloudinary!'
            : 'Image successfully uploaded to server storage!'
        );
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Image upload failed');
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setLoading(true);

    try {
      await updateSettings(formData);
      setSuccessMsg('Hospital settings updated successfully and synced across the site!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update settings. Please check server connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900">Hospital Site & Contact Settings</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage hospital helpline numbers, emergency lines, address, header notices, and timings.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving Changes...' : 'Save All Settings'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 shadow-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Hospital Identity & Licences */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-600" />
            Hospital Identity & Registration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hospital Full Name
              </label>
              <input
                type="text"
                value={formData.hospitalName || ''}
                onChange={(e) => handleChange('hospitalName', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tagline / Subtitle
              </label>
              <input
                type="text"
                value={formData.hospitalTagline || ''}
                onChange={(e) => handleChange('hospitalTagline', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                CMO Registration Number
              </label>
              <input
                type="text"
                value={formData.registrationNo || ''}
                onChange={(e) => handleChange('registrationNo', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Blood Bank Licence Number
              </label>
              <input
                type="text"
                value={formData.bloodBankLicense || ''}
                onChange={(e) => handleChange('bloodBankLicense', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Numbers & WhatsApp */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            Helplines & Direct Phone Numbers
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Phone *
              </label>
              <input
                type="text"
                value={formData.primaryPhone || ''}
                onChange={(e) => handleChange('primaryPhone', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                24x7 Emergency Line *
              </label>
              <input
                type="text"
                value={formData.emergencyPhone || ''}
                onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ambulance / Helpline
              </label>
              <input
                type="text"
                value={formData.helplinePhone || ''}
                onChange={(e) => handleChange('helplinePhone', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp Number (with 91)
              </label>
              <input
                type="text"
                value={formData.whatsappNumber || ''}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Address & Email */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-600" />
            Hospital Location & Emails
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Physical Address
              </label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                General Email
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Emergency Email
              </label>
              <input
                type="email"
                value={formData.emergencyEmail || ''}
                onChange={(e) => handleChange('emergencyEmail', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Header Notice & Timings */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            Notices & Operating Hours
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Top Header Bar Notice Text
            </label>
            <input
              type="text"
              value={formData.headerNotice || ''}
              onChange={(e) => handleChange('headerNotice', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                OPD Working Hours
              </label>
              <input
                type="text"
                value={formData.opdTimings || ''}
                onChange={(e) => handleChange('opdTimings', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Emergency / Blood Bank Timings
              </label>
              <input
                type="text"
                value={formData.emergencyTimings || ''}
                onChange={(e) => handleChange('emergencyTimings', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Clinical Statistics & Impact Numbers (0 se Animate hone wale figures) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-600" />
              Clinical Impact Statistics (Animated Counters)
            </h3>
            <span className="text-[11px] text-sky-600 font-semibold bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              Live Animated on Homepage
            </span>
          </div>
          <p className="text-xs text-slate-500">
            These numbers animate smoothly from 0 to the target value when visitors scroll to the Healthcare Impact section on the homepage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Treated Patients
              </label>
              <input
                type="number"
                value={formData.stats?.patientsTreated || ''}
                onChange={(e) => handleNestedChange('stats', 'patientsTreated', e.target.value)}
                placeholder="50000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Surgeries Performed
              </label>
              <input
                type="number"
                value={formData.stats?.surgeriesDone || ''}
                onChange={(e) => handleNestedChange('stats', 'surgeriesDone', e.target.value)}
                placeholder="12500"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Blood Units Issued
              </label>
              <input
                type="number"
                value={formData.stats?.bloodUnitsCollected || ''}
                onChange={(e) => handleNestedChange('stats', 'bloodUnitsCollected', e.target.value)}
                placeholder="8000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Specialist Doctors
              </label>
              <input
                type="number"
                value={formData.stats?.doctorCount || ''}
                onChange={(e) => handleNestedChange('stats', 'doctorCount', e.target.value)}
                placeholder="14"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Years of Service
              </label>
              <input
                type="number"
                value={formData.stats?.experienceYears || ''}
                onChange={(e) => handleNestedChange('stats', 'experienceYears', e.target.value)}
                placeholder="12"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-sky-500 focus:bg-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 6: Hospital Showcase & Section Images (Cloudinary & Local Upload) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Image className="w-4 h-4 text-indigo-600" />
              Specialized Care & About Section Images
            </h3>
            <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Cloudinary & Local Storage
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Upload new high-definition pictures for each hospital department or paste direct image URLs. Images are stored securely on Cloudinary / VPS storage.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
            
            {/* 1. Blood Bank Image */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  Blood Bank Showcase Image
                </label>
              </div>

              {formData.bloodBankImage && (
                <div className="relative h-32 rounded-xl overflow-hidden border border-slate-300 shadow-xs bg-slate-900">
                  <img
                    src={formData.bloodBankImage}
                    alt="Blood Bank Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <input
                type="text"
                value={formData.bloodBankImage || ''}
                onChange={(e) => handleChange('bloodBankImage', e.target.value)}
                placeholder="Image URL or upload below..."
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium"
              />

              <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingField === 'bloodBankImage' ? 'Uploading Image...' : 'Upload New Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('bloodBankImage', e.target.files[0])}
                  className="hidden"
                  disabled={uploadingField === 'bloodBankImage'}
                />
              </label>
            </div>

            {/* 2. IUI & Infertility Image */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  IUI & Fertility Center Image
                </label>
              </div>

              {formData.iuiInfertilityImage && (
                <div className="relative h-32 rounded-xl overflow-hidden border border-slate-300 shadow-xs bg-slate-900">
                  <img
                    src={formData.iuiInfertilityImage}
                    alt="IUI Center Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <input
                type="text"
                value={formData.iuiInfertilityImage || ''}
                onChange={(e) => handleChange('iuiInfertilityImage', e.target.value)}
                placeholder="Image URL or upload below..."
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium"
              />

              <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingField === 'iuiInfertilityImage' ? 'Uploading Image...' : 'Upload New Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('iuiInfertilityImage', e.target.files[0])}
                  className="hidden"
                  disabled={uploadingField === 'iuiInfertilityImage'}
                />
              </label>
            </div>

            {/* 3. About Page Hero Image */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  About Us Page Hero Photo
                </label>
              </div>

              {formData.aboutHeroImage && (
                <div className="relative h-32 rounded-xl overflow-hidden border border-slate-300 shadow-xs bg-slate-900">
                  <img
                    src={formData.aboutHeroImage}
                    alt="About Hero Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <input
                type="text"
                value={formData.aboutHeroImage || ''}
                onChange={(e) => handleChange('aboutHeroImage', e.target.value)}
                placeholder="Image URL or upload below..."
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium"
              />

              <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingField === 'aboutHeroImage' ? 'Uploading Image...' : 'Upload New Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('aboutHeroImage', e.target.files[0])}
                  className="hidden"
                  disabled={uploadingField === 'aboutHeroImage'}
                />
              </label>
            </div>

          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-lg shadow-sky-600/25 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving Settings...' : 'Save All Settings'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
