import React, { useState } from 'react';
import './Footer.css';
import { Music, Mail, MapPin, Phone, ShieldCheck, Heart, Sparkles, Send } from 'lucide-react';

export default function Footer({ onShowToast, openVirtualStudio }) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    onShowToast({
      title: 'Welcome to MusicMart VIP!',
      message: `Use promo code VIP15 for 15% OFF your next order! Check ${email}`
    });
    setEmail('');
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* Newsletter Bar */}
      <div className="bg-gradient-to-r from-purple-950/40 via-pink-950/40 to-cyan-950/40 border-b border-slate-800 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-pink-400 font-bold uppercase text-xs tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Join MusicMart Sound Club</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white font-heading">
              Get $50 Off Your First Instrument Order
            </h3>
            <p className="text-slate-400 text-xs">Subscribe to receive gear release alerts, pro audio guides & exclusive deals.</p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-full pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-purple-500"
              />
            </div>
            <button type="submit" className="btn-primary py-2.5 px-6 shrink-0">
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 flex items-center justify-center text-white">
              <Music className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold gradient-text font-heading">MusicMart</span>
          </div>

          <p className="text-slate-400 leading-relaxed max-w-sm">
            MusicMart is the premier online destination for musicians, producers, and audio enthusiasts. Featuring real Web Audio sound previews, handpicked instruments, and 2-year warranty on all orders.
          </p>

          <button
            onClick={openVirtualStudio}
            className="btn-secondary text-xs py-2 px-4 border-cyan-500/40 text-cyan-300 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Virtual Sound Studio</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-white uppercase text-xs tracking-wider">Instruments</h4>
          <ul className="space-y-2">
            <li><a href="#catalog" className="hover:text-purple-400 transition-colors">Electric & Acoustic Guitars</a></li>
            <li><a href="#catalog" className="hover:text-purple-400 transition-colors">Synthesizers & Keyboards</a></li>
            <li><a href="#catalog" className="hover:text-purple-400 transition-colors">Acoustic & Electronic Drums</a></li>
            <li><a href="#catalog" className="hover:text-purple-400 transition-colors">Orchestral Violins & Celli</a></li>
            <li><a href="#catalog" className="hover:text-purple-400 transition-colors">DJ Controllers & Studio Gear</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-white uppercase text-xs tracking-wider">Customer Care</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-purple-400 transition-colors">Order Tracking & Status</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Shipping & Delivery Rates</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">30-Day Money Back Guarantee</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Instrument Warranty Claim</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Store Locator & Repairs</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-white uppercase text-xs tracking-wider">Headquarters</h4>
          <div className="space-y-2 text-slate-400">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
              <span>742 Soundwave Avenue, Music City, NY 10001</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-pink-400 shrink-0" />
              <span>+1 (800) 555-MART (6278)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>support@musicmart-store.com</span>
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} MusicMart Instruments Store Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[10px]">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>PAYPAL</span>
            <span>APPLE PAY</span>
            <span>AMEX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
