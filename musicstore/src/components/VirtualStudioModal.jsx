import React, { useState, useEffect } from 'react';
import { Volume2, X, Music, Sparkles, Radio, Zap } from 'lucide-react';
import { playInstrumentPreview } from '../utils/audioSynth';

const INSTRUMENT_MODES = [
  { id: 'guitar', name: 'Guitar Strum', icon: '🎸', baseFreq: 329.63, description: 'Polyphonic harmonic guitar chord synthesis' },
  { id: 'piano', name: 'Grand Piano', icon: '🎹', baseFreq: 261.63, description: 'Pure acoustic piano triad resonant tones' },
  { id: 'synth', name: 'Synth Lead', icon: '🎛️', baseFreq: 440.0, description: 'Filtered sawtooth pulse lead soundwave' },
  { id: 'drums', name: 'Drum Kit', icon: '🥁', baseFreq: 120.0, description: 'Acoustic kick drum + highpass snare blast' },
  { id: 'violin', name: 'Concert Violin', icon: '🎻', baseFreq: 659.25, description: 'Bowed string sustain with 5Hz LFO vibrato' },
  { id: 'brass', name: 'Trumpet Brass', icon: '🎺', baseFreq: 311.13, description: 'Lowpass envelope brass crescendo swell' }
];

const PIANO_KEYS = [
  { note: 'C4', freq: 261.63, keyLabel: 'A' },
  { note: 'D4', freq: 293.66, keyLabel: 'S' },
  { note: 'E4', freq: 329.63, keyLabel: 'D' },
  { note: 'F4', freq: 349.23, keyLabel: 'F' },
  { note: 'G4', freq: 392.00, keyLabel: 'G' },
  { note: 'A4', freq: 440.00, keyLabel: 'H' },
  { note: 'B4', freq: 493.88, keyLabel: 'J' },
  { note: 'C5', freq: 523.25, keyLabel: 'K' }
];

export default function VirtualStudioModal({ isOpen, onClose }) {
  const [activeMode, setActiveMode] = useState('guitar');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  // Keyboard shortcut listener for studio keys
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      const keyUpper = e.key.toUpperCase();
      const match = PIANO_KEYS.find((k) => k.keyLabel === keyUpper);
      if (match) {
        triggerKey(match);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeMode]);

  const triggerKey = (keyObj) => {
    setActiveKey(keyObj.note);
    setIsPlaying(true);
    playInstrumentPreview(activeMode, keyObj.freq);
    setTimeout(() => {
      setActiveKey(null);
      setIsPlaying(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 btn-icon hover:bg-red-500/20 hover:text-red-400 border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Studio Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Volume2 className="w-7 h-7 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white font-heading">Virtual Sound Studio</h2>
              <span className="badge badge-deal">Live Web Audio API</span>
            </div>
            <p className="text-xs text-slate-400">Play virtual notes using your mouse or keyboard keys (A, S, D, F, G, H, J, K)</p>
          </div>
        </div>

        {/* Instrument Selector Cards */}
        <div>
          <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-3">
            Select Sound Engine Preset
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {INSTRUMENT_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setActiveMode(mode.id);
                  playInstrumentPreview(mode.id, mode.baseFreq);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  activeMode === mode.id
                    ? 'bg-gradient-to-br from-purple-900/60 to-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-500/10 scale-[1.02]'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800/80 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{mode.icon}</span>
                  {activeMode === mode.id && (
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                  )}
                </div>
                <div className="mt-2">
                  <h4 className="font-bold text-sm">{mode.name}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1">{mode.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Audio Visualizer & Sound Wave Display */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Radio className={`w-5 h-5 ${isPlaying ? 'text-pink-400 animate-spin' : 'text-slate-500'}`} />
            <div>
              <span className="text-xs font-mono uppercase text-slate-400">Current Synth Preset</span>
              <p className="text-sm font-bold text-cyan-300 capitalize">{activeMode} Synth Engine</p>
            </div>
          </div>

          {/* Sound Wave bars */}
          <div className="flex items-end gap-1.5 h-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
              <div
                key={bar}
                className={`w-1.5 rounded-full transition-all duration-150 ${
                  isPlaying
                    ? 'bg-gradient-to-t from-cyan-400 to-pink-500 animate-pulse'
                    : 'bg-slate-700 h-2'
                }`}
                style={{
                  height: isPlaying ? `${Math.floor(Math.random() * 24) + 8}px` : '6px'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Virtual Piano / Pad Keyboard */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase text-slate-400">Interactive Keyboard</span>
            <span className="text-xs text-purple-400 font-medium">Click or press keyboard keys</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {PIANO_KEYS.map((key) => (
              <button
                key={key.note}
                onClick={() => triggerKey(key)}
                className={`h-24 sm:h-28 rounded-xl border flex flex-col justify-between p-2.5 transition-all select-none ${
                  activeKey === key.note
                    ? 'bg-gradient-to-t from-pink-500 to-purple-600 border-white text-white translate-y-1 shadow-lg shadow-pink-500/50'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-cyan-400'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-slate-900/60 text-[10px] font-bold flex items-center justify-center text-slate-300">
                  {key.keyLabel}
                </div>
                <div className="text-center">
                  <span className="font-extrabold text-sm block">{key.note}</span>
                  <span className="text-[9px] text-slate-400 block font-mono">{key.freq}Hz</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>Zero-latency Web Audio API Synth</span>
          </div>
          <button
            onClick={() => playInstrumentPreview(activeMode, 440)}
            className="text-cyan-400 hover:underline font-semibold flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Play Test Sequence
          </button>
        </div>

      </div>
    </div>
  );
}
