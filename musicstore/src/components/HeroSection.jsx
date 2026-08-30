import React, { useState, useEffect } from 'react';
import { Sparkles, Play, ShieldCheck, Truck, RotateCcw, Headphones, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-b from-purple-950/30 via-slate-900/50 to-slate-950 border-b border-slate-800">
      
      {/* Background Animated Glow Orbs */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & Slide Info */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>{slide.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Unleash Your <span className="gradient-text">{slide.title}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              {slide.subtitle}. Explore 14 professional store departments with live Web Audio API sound previews in your browser!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={scrollToCatalog}
                className="btn-primary text-sm sm:text-base py-3 px-8 shadow-xl"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                Shop Department Store
              </button>

              <button
                onClick={openVirtualStudio}
                className="btn-secondary text-sm sm:text-base py-3 px-6 border-cyan-500/50 text-cyan-300 hover:bg-cyan-950/40"
              >
                <Volume2 className="w-5 h-5 text-cyan-400" />
                Virtual Sound Studio
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

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <span>Free Express Shipping</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>2-Year Warranty</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span>30-Day Returns</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <span>24/7 Expert Audio</span>
              </div>
            </div>
          </div>

          {/* Right Hero Slide Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-4 sm:p-6 relative overflow-hidden group shadow-2xl border-purple-500/30">
              
              {/* Controls */}
              <button
                onClick={() => setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
                className="absolute top-1/2 left-2 z-30 -translate-y-1/2 btn-icon w-8 h-8 bg-slate-950/80 border-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="absolute top-1/2 right-2 z-30 -translate-y-1/2 btn-icon w-8 h-8 bg-slate-950/80 border-slate-700"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Instrument Image */}
              <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Sound Preview Audio Trigger Button */}
                <button
                  onClick={() => playInstrumentPreview(slide.audioType, slide.audioFreq)}
                  className="absolute bottom-4 right-4 bg-purple-600/90 hover:bg-purple-500 text-white font-bold py-2.5 px-4 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2 transition-all hover:scale-105 border border-white/20"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span className="text-xs">{slide.ctaText}</span>
                  <div className="flex items-end gap-1 h-3 ml-1">
                    <div className="soundwave-bar"></div>
                    <div className="soundwave-bar"></div>
                    <div className="soundwave-bar"></div>
                  </div>
                </button>
              </div>

              {/* Floating Stat Widget */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-100">{slide.title}</h3>
                  <p className="text-xs text-slate-400 font-medium line-clamp-1">{slide.subtitle}</p>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className="text-xl font-extrabold text-pink-400">{slide.price}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
