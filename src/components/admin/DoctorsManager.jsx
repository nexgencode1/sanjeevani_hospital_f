import React, { useState, useRef } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { 
  Users, UserPlus, Edit2, Trash2, Check, X, 
  Stethoscope, Clock, Award, Phone, CheckCircle2, AlertCircle, 
  Upload, Image as ImageIcon, Loader2 
} from 'lucide-react';

export default function DoctorsManager() {
  const { doctors, addDoctor, updateDoctor, deleteDoctor, uploadImage } = useHospital();
  
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const initialForm = {
    name: '',
    designation: 'Specialist Consultant',
    department: 'General Medicine & Critical Care',
    qualifications: 'M.B.B.S., M.D.',
    experience: '10+ Years Experience',
    availability: 'Mon - Sat: 10:00 AM - 04:00 PM',
    consultationFee: '',
    phone: '9455304235',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    bio: '',
    featured: false
  };

  const [formData, setFormData] = useState(initialForm);

  const handleStartAdd = () => {
    setFormData(initialForm);
    setEditingDoctor(null);
    setIsAddingNew(true);
    setErrorMsg('');
  };

  const handleStartEdit = (doc) => {
    setFormData({ 
      ...doc, 
      consultationFee: doc.consultationFee || doc.opdFee || '',
      availability: doc.availability || doc.timing || 'Mon - Sat: 10:00 AM - 04:00 PM'
    });
    setEditingDoctor(doc);
    setIsAddingNew(false);
    setErrorMsg('');
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingDoctor(null);
    setFormData(initialForm);
    setErrorMsg('');
  };

  // Direct File Upload from Device to Server /uploads (Hostinger VPS storage)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg('');
    try {
      const res = await uploadImage(file);
      if (res.success && res.url) {
        setFormData((prev) => ({ ...prev, image: res.url }));
        setSuccessMsg('Photo uploaded and stored permanently on VPS server!');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Image upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isAddingNew) {
        await addDoctor(formData);
        setSuccessMsg('Doctor added successfully!');
      } else if (editingDoctor) {
        await updateDoctor(editingDoctor.id, formData);
        setSuccessMsg('Doctor profile updated successfully!');
      }
      handleCancel();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save doctor details.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from doctors list?`)) {
      try {
        await deleteDoctor(id);
        setSuccessMsg(`${name} removed.`);
        setTimeout(() => setSuccessMsg(''), 4000);
      } catch (err) {
        setErrorMsg(err.message || 'Failed to delete doctor.');
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">Specialist Doctors & Medical Faculty</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Add doctors, upload photos (saved to VPS disk), and manage OPD schedules.
          </p>
        </div>

        {!isAddingNew && !editingDoctor && (
          <button
            onClick={handleStartAdd}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Doctor</span>
          </button>
        )}
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Add / Edit Doctor Form Modal/Card */}
      {(isAddingNew || editingDoctor) && (
        <div className="bg-white p-5 sm:p-8 rounded-3xl border border-sky-200 shadow-xl space-y-5 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-sky-600" />
              <span>{isAddingNew ? 'Add New Specialist Doctor' : `Edit: ${editingDoctor.name}`}</span>
            </h3>
            <button onClick={handleCancel} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Photo Upload & Preview Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-24 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 flex-shrink-0 relative">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2 w-full">
                <div>
                  <span className="font-bold text-slate-800 block text-xs">Doctor Photograph (Stored on VPS Server)</span>
                  <p className="text-[11px] text-slate-500">Upload directly from device or paste an image URL.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-all shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading to VPS...' : 'Upload Photo from Device'}</span>
                  </button>

                  <input
                    type="text"
                    placeholder="Or paste image URL (https://...)"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 min-w-[200px] bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Doctor Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Ramesh Gupta"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-sky-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Designation</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Consultant Surgeon"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-sky-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Department *</label>
                <input
                  type="text"
                  placeholder="e.g. Orthopedics & Spine Surgery"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-sky-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Qualifications *</label>
                <input
                  type="text"
                  placeholder="e.g. M.B.B.S., M.S. (Orthopedics)"
                  value={formData.qualifications}
                  onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-sky-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Experience</label>
                <input
                  type="text"
                  placeholder="e.g. 12+ Years Experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-sky-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">OPD Availability Timings *</label>
                <input
                  type="text"
                  placeholder="e.g. Mon - Sat: 10:00 AM - 04:00 PM"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-sky-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Consultation / OPD Fee (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. ₹400 (Leave blank to hide fee on card)"
                  value={formData.consultationFee || ''}
                  onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value, opdFee: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-sky-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  placeholder="e.g. 9455304235"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-sky-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Doctor Bio & Specialty Details</label>
              <textarea
                rows={2}
                placeholder="Brief summary of doctor clinical expertise and background..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-sky-500 font-medium"
              ></textarea>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured || false}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
              />
              <label htmlFor="featured" className="font-semibold text-slate-700 cursor-pointer text-xs">
                Highlight as Featured Lead Doctor on Homepage
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploadingImage}
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md disabled:opacity-50"
              >
                {loading ? 'Saving...' : isAddingNew ? 'Create Doctor' : 'Update Doctor'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Doctors List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-14 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                <img
                  src={doc.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="flex-1 space-y-0.5 min-w-0">
                {doc.featured && (
                  <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 inline-block mb-0.5">
                    Lead Director
                  </span>
                )}
                <h3 className="font-bold text-sm text-slate-900 truncate">{doc.name}</h3>
                <p className="text-[11px] font-semibold text-sky-700 truncate">{doc.qualifications}</p>
                <p className="text-[10px] text-slate-500 truncate">{doc.department}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span className="truncate">{doc.availability || doc.timing || 'Mon - Sat'}</span>
              </div>
              <p className="text-slate-500 text-[10px]">
                Fee: <span className={(doc.consultationFee || doc.opdFee) ? 'text-emerald-700 font-bold' : 'text-slate-400 italic'}>{(doc.consultationFee || doc.opdFee) || 'Blank / Hidden'}</span>
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[10px] text-slate-400">ID: {doc.id}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(doc)}
                  className="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                  title="Edit Doctor Profile"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(doc.id, doc.name)}
                  className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                  title="Remove Doctor"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
