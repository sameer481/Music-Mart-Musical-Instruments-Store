import React from 'react';
import './DepartmentCategoryHub.css';
import { LayoutGrid, Sparkles, ArrowRight, Guitar, Piano, Drum, Headphones, Mic, Volume2, Wind, Music, Sliders, Radio } from 'lucide-react';
import { DEPARTMENTS } from '../data/products';

export default function DepartmentCategoryHub({ selectedDepartment, onSelectDepartment, scrollToCatalog }) {
  return (
    <section className="py-12 bg-slate-950 border-b border-slate-800/80">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>14 Music Store Departments</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-100 font-heading">
              Browse Store Departments & Gear
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectDepartment('all');
                scrollToCatalog();
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedDepartment === 'all'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Show All Departments
            </button>
          </div>
        </div>

        {/* 14 Department Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEPARTMENTS.map((dept) => {
            const isSelected = selectedDepartment === dept.id;

            return (
              <div
                key={dept.id}
                onClick={() => {
                  onSelectDepartment(dept.id);
                  scrollToCatalog();
                }}
                className={`relative h-52 rounded-2xl overflow-hidden cursor-pointer group shadow-xl border transition-all duration-300 ${
                  isSelected
                    ? 'border-cyan-400 ring-2 ring-cyan-400/40 translate-y-[-2px]'
                    : 'border-slate-800 hover:border-purple-500/60 hover:-translate-y-1'
                }`}
              >
                {/* Background Image */}
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.4]"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

                {/* Department Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between text-white z-10">
                  
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between">
                    <span className="badge font-mono text-[10px] bg-slate-900/80 border-slate-700">
                      {dept.count}+ Items
                    </span>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                    )}
                  </div>

                  {/* Bottom Info */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-extrabold font-heading text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {dept.name}
                    </h3>

                    {/* Subcategories tags */}
                    <div className="flex flex-wrap gap-1">
                      {dept.subcategories.slice(0, 2).map((sub, idx) => (
                        <span key={idx} className="text-[10px] bg-white/10 backdrop-blur-md px-2 py-0.5 rounded text-slate-300">
                          {sub}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 pt-1 group-hover:translate-x-1 transition-transform">
                      <span>Explore Department</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
