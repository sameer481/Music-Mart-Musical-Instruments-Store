import React, { useEffect } from 'react';
import './Toast.css';
import { CheckCircle, Info, X } from 'lucide-react';
import { playUiChime } from '../utils/audioSynth';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    playUiChime('success');
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-purple-500/50 text-slate-100 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl animate-slideLeft max-w-sm">
      <div className="w-8 h-8 rounded-xl bg-purple-600/30 text-purple-400 flex items-center justify-center shrink-0">
        <CheckCircle className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0 text-xs">
        <p className="font-extrabold text-slate-100">{toast.title || 'MusicMart Notice'}</p>
        <p className="text-slate-300 line-clamp-1">{toast.message}</p>
      </div>
      <button onClick={onClose} className="text-slate-500 hover:text-white p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
