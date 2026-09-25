import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, CheckCircle, Quote, Sparkles, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const DEFAULT_TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Rajendra Kumar',
    location: 'Sarai Akil, Kaushambi',
    treatment: 'Emergency Trauma & Blood Transfusion',
    rating: 5,
    review: "My mother met with a road accident at night. Sanjeevani's trauma team attended her within minutes and emergency blood units were issued immediately from their in-house blood bank. They saved her life when every minute mattered.",
    date: 'February 2026'
  },
  {
    id: 'test-2',
    name: 'Pooja & Amit Patel',
    location: 'Manjhanpur, Kaushambi',
    treatment: 'IUI & Infertility Treatment',
    rating: 5,
    review: "After 6 years of marriage and visiting multiple hospitals in Allahabad, Dr. Manisha Chaudhary's compassionate guidance and computerized IUI treatment blessed our family with a healthy baby boy. We are deeply grateful to Sanjeevani Hospital.",
    date: 'January 2026'
  },
  {
    id: 'test-3',
    name: 'Ram Surat Yadav',
    location: 'Muratganj, Kaushambi',
    treatment: 'Ayushman Bharat Laparoscopic Surgery',
    rating: 5,
    review: "I had severe gallbladder stones and underwent keyhole laparoscopic surgery completely cashless under Ayushman Bharat PM-JAY card. The private recovery rooms, cleanliness, and nursing staff were outstanding.",
    date: 'December 2025'
  },
  {
    id: 'test-4',
    name: 'Dr. Sanjay Gupta',
    location: 'Kaushambi',
    treatment: 'Cardiology & Emergency Care',
    rating: 5,
    review: "Having a licensed 24x7 blood bank and advanced ICU facility right in Kaushambi has revolutionized local healthcare. Patients no longer need to travel 60 kms to Prayagraj in life-threatening emergencies.",
    date: 'January 2026'
  },
  {
    id: 'test-5',
    name: 'Sunita Devi',
    location: 'Chail, Kaushambi',
    treatment: 'Free Sunday OPD Consultation',
    rating: 5,
    review: "The free Sunday OPD facility is a true blessing for village families. We received comprehensive checkup, expert doctor advice, and medicines guidance without paying any consultation fees.",
    date: 'February 2026'
  }
];

export default function TestimonialsSection({ settings }) {
  const testimonials = (settings?.testimonials && settings.testimonials.length > 0)
    ? settings.testimonials
    : DEFAULT_TESTIMONIALS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Autoplay every 4.5 seconds
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, testimonials.length, nextSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
          मरीजों का विश्वास • Patient Stories & Trust
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          What Our Patients Say
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Real experiences from families whose lives have been healed and touched at Sanjeevani Hospital.
        </p>
      </div>

      {/* Sliding Carousel Container */}
      <div 
        className="relative overflow-hidden px-2 sm:px-6 py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel Track */}
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="w-full flex-shrink-0 px-2 sm:px-4"
            >
              <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-lg hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                
                {/* Background soft emerald glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0 pointer-events-none opacity-60"></div>

                <div className="space-y-4 relative z-10">
                  {/* Top row: Rating stars & Quote */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-1.5">5.0 Star Care</span>
                    </div>
                    <Quote className="w-8 h-8 text-emerald-200 group-hover:text-emerald-500 transition-colors" />
                  </div>

                  {/* Treatment tag */}
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    🩺 {t.treatment}
                  </span>

                  {/* Review text */}
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                    "{t.review}"
                  </p>
                </div>

                {/* Author details */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-700 text-white font-black flex items-center justify-center text-sm flex-shrink-0 shadow-md">
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-black text-slate-900 text-sm">
                          {t.name}
                        </h4>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-slate-500">
                        {t.location}
                      </p>
                    </div>
                  </div>

                  {t.date && (
                    <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
                      {t.date}
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrow Buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous Testimonial"
          className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/95 hover:bg-white text-slate-800 border border-slate-200 shadow-lg hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Testimonial"
          className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/95 hover:bg-white text-slate-800 border border-slate-200 shadow-lg hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'w-7 bg-emerald-600' 
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
