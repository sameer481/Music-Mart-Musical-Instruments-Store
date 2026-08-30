import React, { useState } from 'react';
import './UserProfileModal.css';
import { X, User, Package, LogOut, ShieldCheck, MapPin, Phone, Mail, KeyRound } from 'lucide-react';
import { CURRENCIES } from '../data/products';

export default function UserProfileModal({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  userOrders = [],
  onOpenTracking,
  onOpenAdmin,
  currency = 'USD'
}) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'auth'
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register'

  const [loginEmail, setLoginEmail] = useState('sameer@example.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');

  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const newUserObj = {
      name: authMode === 'register' ? regName || 'Sameer Kumar' : 'Sameer Kumar',
      email: loginEmail,
      phone: regPhone || '+91 98765 43210',
      role: loginEmail.includes('admin') ? 'admin' : 'customer'
    };
    onLogin(newUserObj);
    setActiveTab('profile');
  };

  return (
    <div className="overlay">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 btn-icon border-slate-700 z-20">
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-slate-950 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-600/20">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white font-heading">
                {currentUser ? `Welcome, ${currentUser.name}` : 'My Account & Orders'}
              </h2>
              <p className="text-xs text-slate-400">Manage account, view order history, or access admin controls</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-950/60 border-b border-slate-800 px-6 py-2 flex gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === 'profile'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            My Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Order History ({userOrders.length})
          </button>
          {!currentUser && (
            <button
              onClick={() => setActiveTab('auth')}
              className={`pb-2 border-b-2 transition-all ${
                activeTab === 'auth'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Sign In / Register
            </button>
          )}
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* TAB 1: PROFILE DETAILS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {currentUser ? (
                <>
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-xs font-bold uppercase text-purple-400 tracking-wider">Account Credentials</span>
                      <span className="badge badge-deal text-xs uppercase font-mono">{currentUser.role || 'Customer'}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <User className="w-4 h-4 text-cyan-400" />
                        <div>
                          <span className="text-slate-500 block text-[10px]">Full Name</span>
                          <strong className="text-slate-100">{currentUser.name}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-300">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        <div>
                          <span className="text-slate-500 block text-[10px]">Email Address</span>
                          <strong className="text-slate-100">{currentUser.email}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone className="w-4 h-4 text-cyan-400" />
                        <div>
                          <span className="text-slate-500 block text-[10px]">Phone Number</span>
                          <strong className="text-slate-100">{currentUser.phone || '+91 98765 43210'}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <div>
                          <span className="text-slate-500 block text-[10px]">Primary Delivery Address</span>
                          <strong className="text-slate-100">Bandra West, Mumbai, MH</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Admin Launcher */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={onOpenAdmin}
                      className="btn-primary py-2.5 px-5 text-xs bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Open Admin Master Panel</span>
                    </button>

                    <button
                      onClick={onLogout}
                      className="btn-secondary py-2.5 px-4 text-xs hover:bg-rose-950/40 hover:text-rose-400 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out Account</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <KeyRound className="w-12 h-12 text-slate-600 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-200">You are currently in Guest Mode</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">Sign in or create an account to save order history, track deliveries, and manage address details.</p>
                  <button onClick={() => setActiveTab('auth')} className="btn-primary py-2.5 px-6 text-xs font-bold">
                    Go to Sign In / Register
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ORDER HISTORY & QUICK TRACKING */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase text-slate-300 tracking-wider">Past Instrument Purchases</h3>

              {userOrders.length > 0 ? (
                <div className="space-y-3">
                  {userOrders.map((ord) => (
                    <div key={ord.id} className="bg-slate-950 p-4 border border-slate-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-cyan-400 text-sm">{ord.id}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300">{ord.status}</span>
                        </div>
                        <span className="text-xs text-slate-400 block mt-1">Date: {ord.date} • Method: {ord.paymentMethod}</span>
                        <span className="text-xs font-bold text-amber-400 font-mono block">Total Paid: {curr.symbol}{(ord.totalAmount * curr.rate).toFixed(2)}</span>
                      </div>

                      <button
                        onClick={() => {
                          onOpenTracking(ord.id);
                          onClose();
                        }}
                        className="btn-primary py-2 px-4 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 rounded-xl font-bold flex items-center gap-2"
                      >
                        <Package className="w-4 h-4 text-cyan-400" />
                        <span>Track Live Order</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 space-y-2 bg-slate-950 rounded-2xl border border-slate-800">
                  <Package className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400">No order history recorded yet.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AUTHENTICATION (SIGN IN / REGISTER) */}
          {activeTab === 'auth' && (
            <form onSubmit={handleAuthSubmit} className="space-y-4 max-w-md mx-auto">
              <div className="flex justify-center border-b border-slate-800 pb-3">
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                      authMode === 'login' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    User Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                      authMode === 'register' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    New Register
                  </button>
                </div>
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="text-xs font-semibold text-slate-400">Full Name</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white mt-1"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-400">Email Address</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white mt-1"
                />
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="text-xs font-semibold text-slate-400">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white mt-1"
                  />
                </div>
              )}

              <button type="submit" className="w-full btn-primary py-3 text-xs font-bold shadow-xl">
                {authMode === 'login' ? 'Sign In to Account' : 'Complete Registration'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
