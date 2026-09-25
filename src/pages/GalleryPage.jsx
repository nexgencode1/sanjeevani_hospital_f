import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { Image, X, ZoomIn, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import PageSEO from '../components/common/PageSEO';

export default function GalleryPage() {
  const { gallery } = useHospital();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', 'Infrastructure', 'Facilities', 'Blood Bank', 'Maternity & IUI', 'Diagnostics', 'Wards', 'Emergency'];

  const filteredItems = gallery.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Sanjeevani Multispeciality Hospital Facilities & Infrastructure Gallery",
    "description": "Visual tour of modular operation theaters, licensed blood bank, ICU, and deluxe rooms.",
    "url": "https://sanjeevanihospital.in/gallery"
  };

  return (
    <div className="space-y-12 pb-16">
      <PageSEO 
        title="अस्पताल इंफ्रास्ट्रक्चर एवं फोटो गैलरी | Hospital Infrastructure & Gallery | Sanjeevani Hospital"
        description="संजीवनी हॉस्पिटल कौशाम्बी के मॉड्यूलर ऑपरेशन थिएटर, 24x7 ब्लड बैंक, आईसीयू, प्राइवेट रूम्स और आधुनिक चिकित्सा सुविधाओं का विजुअल टूर।"
        keywords="Sanjeevani Hospital gallery, hospital photos Kaushambi, OT photos, blood bank Kaushambi facility, hospital infrastructure"
        canonicalPath="/gallery"
        schemaData={gallerySchema}
      />
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Hospital Tour & Infrastructure
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Hospital Gallery & Facilities
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Take a visual tour of our modern building, sterile modular operation theaters, licensed blood bank, deluxe wards, and emergency trauma infrastructure.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-800">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-4 text-white">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
                    {item.category}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-sky-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold leading-tight">{item.title}</h3>
                  {item.description && (
                    <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 text-white space-y-2 bg-slate-900">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  {selectedImage.category}
                </span>
                <h3 className="text-lg font-bold">{selectedImage.title}</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
