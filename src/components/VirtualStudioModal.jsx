import React, { useState, useEffect, useRef } from 'react';
import './VirtualStudioModal.css';
import { Volume2, X, Sparkles, Radio, Zap, Sliders, Music, Disc } from 'lucide-react';
import {
  playInstrumentPreview,
  getAudioFrequencyData,
  getFxSettings,
  setFxSettings,
  playUiChime
} from '../utils/audioSynth';

const INSTRUMENT_MODES = [
  { id: 'guitar', name: 'Guitar Strum', icon: '🎸', baseFreq: 329.63, description: 'Polyphonic acoustic & electric strum with chorus harmonics' },
  { id: 'piano', name: 'Grand Piano', icon: '🎹', baseFreq: 261.63, description: 'Resonant concert grand piano with hammer attack dynamics' },
  { id: 'synth', name: 'Synth Lead', icon: '🎛️', baseFreq: 440.0, description: 'Fat dual sawtooth lead with resonant cutoff glide' },
  { id: 'drums', name: 'Drum Engine', icon: '🥁', baseFreq: 120.0, description: 'Punchy kick drum, highpass snare & crisp hi-hat sequence' },
  { id: 'violin', name: 'Concert Violin', icon: '🎻', baseFreq: 659.25, description: 'Bowed orchestral violin string with 5.5Hz vibrato' },
  { id: 'brass', name: 'Brass Swell', icon: '🎺', baseFreq: 311.13, description: 'Epic cinematic brass horn section swell' },
  { id: 'lofi', name: 'Lo-Fi Rhodes', icon: '🎹', baseFreq: 293.66, description: 'Warm FM electric piano with soft vintage tremolo' },
  { id: 'dj', name: 'DJ Acid Synth', icon: '🎧', baseFreq: 196.0, description: 'Resonant filter sweep synth baseline' }
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
  
  // FX State
  const [fxState, setFxState] = useState(getFxSettings());
  
  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);

  const handleUpdateFx = (key, val) => {
    const updated = { ...fxState, [key]: val };
    setFxState(updated);
    setFxSettings(updated);
  };

  const triggerKey = React.useCallback((keyObj) => {
    setActiveKey(keyObj.note);
    setIsPlaying(true);
    playInstrumentPreview(activeMode, keyObj.freq);
    setTimeout(() => {
      setActiveKey(null);
      setIsPlaying(false);
    }, 600);
  }, [activeMode]);

  // Keyboard shortcut listener for studio keys
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const keyUpper = e.key.toUpperCase();
      const match = PIANO_KEYS.find((k) => k.keyLabel === keyUpper);
      if (match) {
        triggerKey(match);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeMode, fxState.octaveOffset, triggerKey]);

  // Audio Canvas Visualizer Animation
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dataArray = new Uint8Array(32);

    const render = () => {
      getAudioFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / dataArray.length) - 2;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const val = dataArray[i];
        const barHeight = (val / 255) * canvas.height;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#06b6d4'); // Cyan
        gradient.addColorStop(0.6, '#a855f7'); // Purple
        gradient.addColorStop(1, '#ec4899'); // Pink

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 2;
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isOpen]);

  const handlePlaySequence = () => {
    playUiChime('success');
    let delay = 0;
    PIANO_KEYS.forEach((key) => {
      setTimeout(() => {
        triggerKey(key);
      }, delay);
      delay += 180;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 btn-icon hover:bg-red-500/20 hover:text-red-400 border-slate-700 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Studio Header */}
        <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
            <Volume2 className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Pro Audio Synth Studio
              </h2>
              <span className="badge badge-deal text-xs font-mono">Web Audio DSP</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              High-fidelity synthesizer engine with impulse reverb, delay feedback, & real-time spectrum analysis. Press keys (A, S, D, F, G, H, J, K) to trigger sounds.
            </p>
          </div>
        </div>

        {/* Real-time Spectrum Audio Visualizer & Studio Deck */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <Radio className={`w-6 h-6 ${isPlaying ? 'text-pink-400 animate-spin' : 'text-slate-500'}`} />
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-400 block tracking-wider">Active Sound Preset</span>
              <p className="text-lg font-bold text-cyan-300 capitalize flex items-center gap-2">
                <span>{INSTRUMENT_MODES.find(m => m.id === activeMode)?.name}</span>
                <span className="text-xs font-normal text-slate-400">({fxState.octaveOffset >= 0 ? `+${fxState.octaveOffset}` : fxState.octaveOffset} Octave)</span>
              </p>
            </div>
          </div>

          {/* Canvas Spectrum Visualizer */}
          <div className="w-full sm:w-64 h-14 bg-slate-900/90 rounded-xl border border-slate-800 p-1 flex items-center justify-center relative shadow-inner">
            <canvas
              ref={canvasRef}
              width={240}
              height={48}
              className="w-full h-full rounded"
            />
          </div>
        </div>

        {/* DSP Effects Controls Panel */}
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider">
                DSP Sound Effects & Controls
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Octave Shift:</span>
              {[-1, 0, 1].map((oct) => (
                <button
                  key={oct}
                  onClick={() => handleUpdateFx('octaveOffset', oct)}
                  className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all ${
                    fxState.octaveOffset === oct
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {oct >= 0 ? `+${oct}` : oct}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Master Volume */}
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50 space-y-1">
              <label className="text-[11px] text-slate-400 font-medium block">Master Gain ({Math.round(fxState.masterVolume * 100)}%)</label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={fxState.masterVolume}
                onChange={(e) => handleUpdateFx('masterVolume', parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
              />
            </div>

            {/* Reverb Toggle */}
            <button
              onClick={() => handleUpdateFx('reverbEnabled', !fxState.reverbEnabled)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                fxState.reverbEnabled
                  ? 'bg-purple-950/60 border-purple-500 text-purple-200'
                  : 'bg-slate-900/60 border-slate-700/50 text-slate-400'
              }`}
            >
              <span className="text-[10px] font-mono uppercase">Convolution Reverb</span>
              <span className="font-bold">{fxState.reverbEnabled ? 'ON (Hall 1.8s)' : 'OFF'}</span>
            </button>

            {/* Delay Toggle */}
            <button
              onClick={() => handleUpdateFx('delayEnabled', !fxState.delayEnabled)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                fxState.delayEnabled
                  ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
                  : 'bg-slate-900/60 border-slate-700/50 text-slate-400'
              }`}
            >
              <span className="text-[10px] font-mono uppercase">Stereo Delay (220ms)</span>
              <span className="font-bold">{fxState.delayEnabled ? 'ON (Feedback 30%)' : 'OFF'}</span>
            </button>

            {/* Reverb Mix */}
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50 space-y-1">
              <label className="text-[11px] text-slate-400 font-medium block">Wet/Dry Mix ({Math.round(fxState.reverbMix * 100)}%)</label>
              <input
                type="range"
                min="0.0"
                max="0.8"
                step="0.05"
                value={fxState.reverbMix}
                onChange={(e) => handleUpdateFx('reverbMix', parseFloat(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Instrument Selector Cards */}
        <div>
          <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-3">
            Select Synthesizer Sound Engine Preset
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {INSTRUMENT_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setActiveMode(mode.id);
                  playInstrumentPreview(mode.id, mode.baseFreq);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  activeMode === mode.id
                    ? 'bg-gradient-to-br from-purple-900/70 to-cyan-950/70 border-cyan-400 text-white shadow-lg shadow-cyan-500/10 scale-[1.02]'
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

        {/* Virtual Piano / Pad Keyboard */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase text-slate-400">Interactive Expressive Keyboard</span>
            <span className="text-xs text-purple-400 font-medium">Click or press keyboard hotkeys (A, S, D, F, G, H, J, K)</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {PIANO_KEYS.map((key) => (
              <button
                key={key.note}
                onClick={() => triggerKey(key)}
                className={`h-24 sm:h-32 rounded-xl border flex flex-col justify-between p-2.5 transition-all select-none ${
                  activeKey === key.note
                    ? 'bg-gradient-to-t from-pink-500 via-purple-600 to-indigo-600 border-white text-white translate-y-1 shadow-lg shadow-pink-500/50'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-cyan-400'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-slate-900/80 text-xs font-bold flex items-center justify-center text-cyan-300 border border-slate-700">
                  {key.keyLabel}
                </div>
                <div className="text-center">
                  <span className="font-extrabold text-base block">{key.note}</span>
                  <span className="text-[9px] text-slate-400 block font-mono">
                    {Math.round(key.freq * Math.pow(2, fxState.octaveOffset))}Hz
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800 pt-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Zero-latency Web Audio API Multi-Oscillator Engine</span>
          </div>
          <button
            onClick={handlePlaySequence}
            className="btn-primary py-2 px-4 text-xs bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Play Test Arpeggio Sequence
          </button>
        </div>

      </div>
    </div>
  );
}
