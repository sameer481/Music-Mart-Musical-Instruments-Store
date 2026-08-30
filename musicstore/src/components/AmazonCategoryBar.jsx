import React from 'react';
import { DEPARTMENTS } from '../data/products';

export default function AmazonCategoryBar({ selectedDepartment, onSelectDepartment, scrollToCatalog }) {
  return (
    <div className="bg-slate-900 border-b border-slate-800 py-3 overflow-x-auto no-scrollbar">
      <div className="container mx-auto px-4 flex items-center gap-6">
        
        {/* All Departments Circle */}
        <button
          onClick={() => {
            onSelectDepartment('all');
            scrollToCatalog();
          }}
          className="flex flex-col items-center gap-1.5 shrink-0 group"
        >
          <div
            className={`w-14 h-14 rounded-full border-2 p-1 transition-all flex items-center justify-center ${
              selectedDepartment === 'all'
                ? 'border-amber-400 bg-amber-400/20 scale-105 shadow-lg shadow-amber-400/20'
                : 'border-slate-700 bg-slate-800 group-hover:border-slate-500'
            }`}
          >
            <span className="text-xl">🏬</span>
          </div>
          <span
            className={`text-[11px] font-bold tracking-tight text-center ${
              selectedDepartment === 'all' ? 'text-amber-400 font-extrabold' : 'text-slate-300'
            }`}
          >
            All Store
          </span>
        </button>

        {/* 14 Department Circles */}
        {DEPARTMENTS.map((dept) => {
          const isSelected = selectedDepartment === dept.id;

          return (
            <button
              key={dept.id}
              onClick={() => {
                onSelectDepartment(dept.id);
                scrollToCatalog();
              }}
              className="flex flex-col items-center gap-1.5 shrink-0 group"
            >
              <div
                className={`w-14 h-14 rounded-full border-2 overflow-hidden transition-all relative ${
                  isSelected
                    ? 'border-amber-400 scale-105 ring-2 ring-amber-400/30 shadow-lg'
                    : 'border-slate-800 group-hover:border-slate-600'
                }`}
              >
                <img src={dept.image} alt={dept.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-slate-950/20"></div>
              </div>
              <span
                className={`text-[11px] font-bold tracking-tight text-center max-w-[70px] truncate ${
                  isSelected ? 'text-amber-400 font-extrabold' : 'text-slate-300'
                }`}
              >
                {dept.name}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
}
