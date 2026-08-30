import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import { Sparkles, Play, ShieldCheck, Truck, RotateCcw, Headphones, Volume2, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { HERO_SLIDES } from '../data/products';
import { playInstrumentPreview } from '../utils/audioSynth';

export default function HeroSection({ openVirtualStudio, scrollToCatalog }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto rotate slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="relative overflow-hidden py-10 lg:py-14 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800">
      
      {/* Glow effects */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side Showcase */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Category Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight leading-tight">
              Unleash Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">{slide.title}</span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              {slide.subtitle}. High-fidelity instruments with live Web Audio DSP sound previews in your browser.
            </p>

            {/* CTA Buttons with Explicit Spacing & Distinct Styling */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={scrollToCatalog}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm py-3 px-7 rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4 text-slate-950" />
                <span>Shop Department Store</span>
              </button>

              <button
                onClick={openVirtualStudio}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-400 text-cyan-300 font-bold text-sm py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Virtual Sound Studio</span>
              </button>
            </div>

            {/* Carousel Slide Nav Dots */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlideIndex === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`Slide ${idx + 1}`}
                ></button>
              ))}
            </div>

            {/* Trust Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Free Express Shipping</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-pink-400 shrink-0" />
                <span>2-Year Warranty</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <RotateCcw className="w-4 h-4 text-purple-400 shrink-0" />
                <span>30-Day Returns</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <Headphones className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24/7 Expert Support</span>
              </div>
            </div>

          </div>

          {/* Right Side Product Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 relative overflow-hidden shadow-2xl">
              
              {/* Carousel Arrows */}
              <button
                onClick={() => setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
                className="absolute top-1/2 left-3 z-30 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/80 text-white flex items-center justify-center border border-slate-700 hover:bg-slate-800"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="absolute top-1/2 right-3 z-30 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/80 text-white flex items-center justify-center border border-slate-700 hover:bg-slate-800"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Instrument Showcase Image */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center p-3 border border-slate-800">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain"
                />

                {/* Live Sound Demo Trigger Button */}
                <button
                  onClick={() => playInstrumentPreview(slide.audioType, slide.audioFreq)}
                  className="absolute bottom-3 right-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-3.5 rounded-full shadow-lg flex items-center gap-2 text-xs transition-all border border-cyan-400/40"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{slide.ctaText}</span>
                </button>
              </div>

              {/* Title & Price Below Image */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-white">{slide.title}</h3>
                  <p className="text-xs text-slate-400 font-medium line-clamp-1">{slide.subtitle}</p>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className="text-lg font-black text-amber-400 font-mono">{slide.price}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
