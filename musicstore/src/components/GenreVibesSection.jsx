import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { GENRE_VIBES } from '../data/products';

export default function GenreVibesSection({ onSelectCategory, scrollToCatalog }) {
  return (
    <section className="py-12 bg-slate-950 border-b border-slate-800/80">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Collections</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-100 font-heading">
              Shop by Genre & Sound Vibe
            </h2>
          </div>
        </div>

        {/* Vibes Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GENRE_VIBES.map((vibe) => (
            <div
              key={vibe.id}
              onClick={() => {
                onSelectCategory(vibe.categoryId);
                scrollToCatalog();
              }}
              className="relative h-64 rounded-3xl overflow-hidden cursor-pointer group shadow-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Background Image */}
              <img
                src={vibe.image}
                alt={vibe.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75"
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${vibe.color} opacity-60 mix-blend-multiply group-hover:opacity-75 transition-opacity`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Card Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-2 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  {vibe.categoryId}
                </span>
                <h3 className="text-xl font-extrabold font-heading leading-tight group-hover:text-cyan-300 transition-colors">
                  {vibe.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1">{vibe.tagline}</p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 pt-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Gear</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
