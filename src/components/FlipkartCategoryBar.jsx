import React from 'react';
import './FlipkartCategoryBar.css';
import { DEPARTMENTS } from '../data/products';

export default function FlipkartCategoryBar({ selectedDepartment, onSelectDepartment, scrollToCatalog }) {
  return (
    <div className="bg-white border-b border-gray-200 py-3 shadow-sm overflow-x-auto no-scrollbar">
      <div className="container mx-auto px-4 flex items-center gap-6">
        
        {/* All Departments Icon */}
        <button
          onClick={() => {
            onSelectDepartment('all');
            scrollToCatalog();
          }}
          className="flex flex-col items-center gap-1 shrink-0 group"
        >
          <div
            className={`w-12 h-12 rounded-full border p-1 transition-all flex items-center justify-center ${
              selectedDepartment === 'all'
                ? 'border-[#2874f0] bg-blue-50 scale-105 shadow-sm'
                : 'border-gray-200 bg-gray-50 group-hover:border-gray-400'
            }`}
          >
            <span className="text-lg">🏬</span>
          </div>
          <span
            className={`text-[11px] font-bold text-center tracking-tight ${
              selectedDepartment === 'all' ? 'text-[#2874f0]' : 'text-gray-700'
            }`}
          >
            All Store
          </span>
        </button>

        {/* 14 Department Category Circles */}
        {DEPARTMENTS.map((dept) => {
          const isSelected = selectedDepartment === dept.id;

          return (
            <button
              key={dept.id}
              onClick={() => {
                onSelectDepartment(dept.id);
                scrollToCatalog();
              }}
              className="flex flex-col items-center gap-1 shrink-0 group"
            >
              <div
                className={`w-12 h-12 rounded-full border overflow-hidden transition-all relative ${
                  isSelected
                    ? 'border-[#2874f0] ring-2 ring-blue-500/20 scale-105 shadow-sm'
                    : 'border-gray-200 group-hover:border-gray-400'
                }`}
              >
                <img src={dept.image} alt={dept.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <span
                className={`text-[11px] font-bold text-center max-w-[70px] truncate ${
                  isSelected ? 'text-[#2874f0] font-extrabold' : 'text-gray-700'
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
