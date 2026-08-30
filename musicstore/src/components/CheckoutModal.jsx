import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck, Truck, Lock, ArrowRight, Printer, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRENCIES } from '../data/products';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  summary,
  currency,
  onClearCart
}) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success Receipt
  const [shippingInfo, setShippingInfo] = useState({
    fullName: 'David Bowie',
    email: 'david.bowie@musicmart.com',
    address: '108 Rock & Roll Boulevard',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90028',
    phone: '+1 (555) 392-8192'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '4532 •••• •••• 8912',
    expDate: '08/29',
    cvv: '849'
  });

  const [orderTrackingId, setOrderTrackingId] = useState('');

  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newTrackingId = 'MM-' + Math.floor(100000 + Math.random() * 900000);
    setOrderTrackingId(newTrackingId);
    setStep(3);
    triggerConfetti();
    onClearCart();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="overlay">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 btn-icon border-slate-700 z-20">
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Stepper Progress Bar */}
        {step < 3 && (
          <div className="bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-around text-xs font-bold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-cyan-400' : 'text-slate-500'}`}>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">1</span>
              <span>Shipping Info</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-800"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-cyan-400' : 'text-slate-500'}`}>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">2</span>
              <span>Payment Details</span>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Shipping Details */}
          {step === 1 && (
            <form onSubmit={() => setStep(2)} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Truck className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-slate-100 font-heading">Shipping Address</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400">Full Name</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400">Email Address</label>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 mt-1"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400">City</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400">State</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400">Zip Code</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.zip}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 mt-1"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" className="btn-primary py-2.5 px-6 text-sm">
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Details */}
          {step === 2 && (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-pink-400" />
                  <h3 className="text-xl font-bold text-slate-100 font-heading">Payment Method</h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
              </div>

              {/* Select Payment Provider */}
              <div className="grid grid-cols-3 gap-3">
                {['card', 'paypal', 'applepay'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`p-3 rounded-xl border text-xs font-bold capitalize transition-all ${
                      paymentMethod === method
                        ? 'bg-purple-600/30 border-purple-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {method === 'card' && 'Credit Card'}
                    {method === 'paypal' && 'PayPal'}
                    {method === 'applepay' && 'Apple Pay'}
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 bg-slate-950/60 p-4 border border-slate-800 rounded-2xl">
                  <div>
                    <label className="text-xs font-semibold text-slate-400">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardInfo.cardNumber}
                      onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 mt-1 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-400">Exp Date</label>
                      <input
                        type="text"
                        required
                        value={cardInfo.expDate}
                        onChange={(e) => setCardInfo({ ...cardInfo, expDate: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 mt-1 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400">CVV Code</label>
                      <input
                        type="password"
                        required
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 mt-1 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Total Summary Banner */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center text-sm font-bold">
                <span className="text-slate-300">Total Amount Due:</span>
                <span className="text-xl text-pink-400 font-extrabold">
                  {curr.symbol}{(summary.totalUSD * curr.rate).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Back to Shipping
                </button>
                <button type="submit" className="btn-primary py-3 px-8 text-sm shadow-2xl">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Pay</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Receipt & Printable Confirmation */}
          {step === 3 && (
            <div id="printable-receipt" className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Order Confirmed & Payment Authorized</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-100 font-heading">Thank You for Your Order!</h2>
                <p className="text-xs text-slate-400 mt-1">Tracking ID: <span className="text-cyan-400 font-mono font-bold">{orderTrackingId}</span></p>
              </div>

              {/* Printable Receipt Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left space-y-4 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-800 pb-3">
                  <div>
                    <p className="font-bold text-slate-200">Customer: {shippingInfo.fullName}</p>
                    <p className="text-slate-400">{shippingInfo.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400">Date: {new Date().toLocaleDateString()}</p>
                    <p className="text-slate-400">Method: {paymentMethod.toUpperCase()}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-slate-300 font-sans uppercase text-[10px]">Purchased Gear:</p>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-slate-300">
                      <span>{item.quantity}x {item.name}</span>
                      <span>{curr.symbol}{(item.price * curr.rate * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-3 space-y-1 font-sans text-right">
                  <p className="text-slate-400">Paid Total: <strong className="text-pink-400 text-base font-mono">{curr.symbol}{(summary.totalUSD * curr.rate).toFixed(2)}</strong></p>
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-2">
                <button onClick={handlePrintReceipt} className="btn-secondary text-xs py-2.5 px-5">
                  <Printer className="w-4 h-4 text-cyan-400" />
                  <span>Print Official Receipt</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    setStep(1);
                  }}
                  className="btn-primary text-xs py-2.5 px-6"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
