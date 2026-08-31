import React, { useState } from 'react';
import { ShieldAlert, KeyRound, Lock, Eye, EyeOff, X, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AdminAuthModal({
  isOpen,
  onClose,
  onAuthenticate,
  ownerEmail = 'sameer@example.com'
}) {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Valid Owner Passcodes: 'owner123', 'admin2026', 'sameer123'
    const validCodes = ['owner123', 'admin2026', 'sameer123', 'musicmartowner'];

    if (validCodes.includes(passcode.trim().toLowerCase())) {
      setIsSuccess(true);
      setTimeout(() => {
        onAuthenticate();
        setPasscode('');
        setIsSuccess(false);
      }, 600);
    } else {
      setError('Invalid Owner Passcode. Access restricted to store owner only.');
    }
  };

  return (
    <div className="overlay">
      <div className="bg-slate-900 border border-rose-500/40 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn-icon border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 via-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-600/30">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="badge badge-deal text-[10px] font-mono uppercase tracking-widest bg-rose-950/80 text-rose-300 border border-rose-500/40 px-3 py-1 rounded-full">
              Owner Security Gate
            </span>
            <h3 className="text-xl font-extrabold text-white font-heading mt-2">
              Store Owner Verification
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Admin panel access is restricted exclusively to the store owner (<span className="text-cyan-400 font-semibold">{ownerEmail}</span>).
            </p>
          </div>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Owner Passcode / Secret Key</span>
            </label>
            <div className="relative">
              <input
                type={showPasscode ? 'text' : 'password'}
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter owner passcode (e.g. owner123)"
                className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono placeholder-slate-500 outline-none transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-rose-400 text-xs font-semibold mt-2 bg-rose-950/40 border border-rose-500/30 p-2 rounded-lg">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="font-bold text-slate-300">🔑 Default Owner Passcodes:</p>
            <p className="font-mono text-cyan-300"><code>owner123</code> &nbsp;|&nbsp; <code>admin2026</code> &nbsp;|&nbsp; <code>sameer123</code></p>
          </div>

          <button
            type="submit"
            disabled={isSuccess}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 ${
              isSuccess
                ? 'bg-emerald-500 text-slate-950 font-black'
                : 'bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600 text-white hover:opacity-90'
            }`}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950 animate-bounce" />
                <span>Access Granted! Opening Dashboard...</span>
              </>
            ) : (
              <>
                <span>Unlock Owner Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-4 text-center border-t border-slate-800 pt-3">
          <p className="text-[10px] text-slate-500">
            MusicMart Security System • Protected Admin Session
          </p>
        </div>

      </div>
    </div>
  );
}
