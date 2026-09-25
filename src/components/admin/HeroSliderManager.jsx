import React, { useState, useEffect } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { 
  Image, Plus, Trash2, ArrowUp, ArrowDown, Save, 
  Upload, CheckCircle2, AlertCircle, Eye, RefreshCw 
} from 'lucide-react';

export default function HeroSliderManager() {
  const { settings, updateSettings } = useHospital();
  const { token } = useAuth();

  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (settings?.heroSlides && Array.isArray(settings.heroSlides)) {
      setSlides(settings.heroSlides);
    }
  }, [settings]);

  const handleSlideChange = (index, field, value) => {
    setSlides((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      title: 'New Headline for Slide',
      highlight: 'in Kaushambi',
      subtitle: 'Write detailed description about this healthcare facility or clinical specialty.',
      badge: 'CMO Reg. No. 2013/108 • Sanjeevani Hospital',
      image: '/hospital-building.jpg',
      primaryBtnText: 'Book Doctor Appointment',
      primaryBtnAction: 'booking',
      secondaryBtnText: '24x7 Emergency Helpline',
      secondaryBtnAction: 'call'
    };
    setSlides((prev) => [...prev, newSlide]);
  };

  const handleDeleteSlide = (index) => {
    if (slides.length <= 1) {
      alert('You must keep at least 1 hero slide!');
      return;
    }
    if (window.confirm('Are you sure you want to delete this hero slide?')) {
      setSlides((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    setSlides((prev) => {
      const updated = [...prev];
      const temp = updated[index - 1];
      updated[index - 1] = updated[index];
      updated[index] = temp;
      return updated;
    });
  };

  const handleMoveDown = (index) => {
    if (index === slides.length - 1) return;
    setSlides((prev) => {
      const updated = [...prev];
      const temp = updated[index + 1];
      updated[index + 1] = updated[index];
      updated[index] = temp;
      return updated;
    });
  };

  // Image Upload handler (uses Cloudinary if configured on server, else local disk)
  const handleFileUpload = async (index, file) => {
    if (!file) return;
    setUploadingIndex(index);
    setErrorMsg('');

    try {
      const res = await api.uploadImage(file, token);
      if (res.success && res.url) {
        handleSlideChange(index, 'image', res.url);
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
      setUploadingIndex(null);
    }
  };

  const handleSaveAll = async () => {
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      await updateSettings({
        ...settings,
        heroSlides: slides
      });
      setSuccessMsg('Hero slider updated successfully! All slides are live on the homepage.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save slider changes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900">Hero Slider Manager</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, edit, reorder or upload images for full-width homepage hero slides. Supports Cloudinary uploads!
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleAddSlide}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slide</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save All Slides'}</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs">
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

      {/* Slide Cards List */}
      <div className="space-y-6">
        {slides.map((slide, index) => (
          <div 
            key={slide.id || index}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5"
          >
            {/* Slide Header & Order Controls */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-sky-600 text-white font-black text-xs flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="font-extrabold text-sm text-slate-800">
                  Slide #{index + 1}: {slide.title?.slice(0, 30)}...
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === slides.length - 1}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSlide(index)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer ml-1"
                  title="Delete Slide"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slide Form Inputs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Image Preview & Upload (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Slide Background Image
                </label>
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 border border-slate-200">
                  <img
                    src={slide.image || '/hospital-building.jpg'}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[10px] text-white font-semibold truncate">
                      {slide.image}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={slide.image || ''}
                      onChange={(e) => handleSlideChange(index, 'image', e.target.value)}
                      placeholder="Image URL or Cloudinary Link"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white"
                    />
                  </div>

                  <label className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-dashed border-sky-300 bg-sky-50/60 hover:bg-sky-50 text-sky-700 text-xs font-bold cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {uploadingIndex === index ? 'Uploading to Cloudinary...' : 'Upload Image (Cloudinary / File)'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(index, e.target.files?.[0])}
                      disabled={uploadingIndex === index}
                    />
                  </label>
                </div>
              </div>

              {/* Text and Actions (7 cols) */}
              <div className="lg:col-span-7 space-y-3.5">
                
                {/* Badge text */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Accreditation Badge Text
                  </label>
                  <input
                    type="text"
                    value={slide.badge || ''}
                    onChange={(e) => handleSlideChange(index, 'badge', e.target.value)}
                    placeholder="e.g. CMO Reg. No. 2013/108 • Kaushambi's 1st Multispeciality Hospital"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white font-medium"
                  />
                </div>

                {/* Headline & Highlight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Main Headline Title
                    </label>
                    <input
                      type="text"
                      value={slide.title || ''}
                      onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                      placeholder="e.g. Advanced Healthcare & 24x7 Trauma Care"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Gradient Highlighted Text
                    </label>
                    <input
                      type="text"
                      value={slide.highlight || ''}
                      onChange={(e) => handleSlideChange(index, 'highlight', e.target.value)}
                      placeholder="e.g. in Kaushambi"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white font-medium"
                    />
                  </div>
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subtitle Description
                  </label>
                  <textarea
                    rows={2}
                    value={slide.subtitle || ''}
                    onChange={(e) => handleSlideChange(index, 'subtitle', e.target.value)}
                    placeholder="Brief description about facilities, doctors, or services."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white font-medium"
                  />
                </div>

                {/* Primary and Secondary CTA buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600">
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      value={slide.primaryBtnText || ''}
                      onChange={(e) => handleSlideChange(index, 'primaryBtnText', e.target.value)}
                      placeholder="Book Doctor Appointment"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600">
                      Secondary Button Text
                    </label>
                    <input
                      type="text"
                      value={slide.secondaryBtnText || ''}
                      onChange={(e) => handleSlideChange(index, 'secondaryBtnText', e.target.value)}
                      placeholder="24x7 Emergency Helpline"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Bottom Save Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSaveAll}
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-lg shadow-sky-600/25 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving Changes...' : 'Save All Hero Slides'}</span>
        </button>
      </div>

    </div>
  );
}
