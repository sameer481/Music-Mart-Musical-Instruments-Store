import React, { useState } from 'react';
import './CheckoutModal.css';
import { X, CheckCircle, CreditCard, ShieldCheck, Truck, Lock, ArrowRight, Printer, Sparkles, QrCode, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRENCIES } from '../data/products';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  summary,
  currency,
  onClearCart,
  onOrderPlaced
}) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success Receipt
  const [shippingInfo, setShippingInfo] = useState({
    fullName: 'Sameer Kumar',
    email: 'sameer@example.com',
    address: '42 Music Avenue, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400050',
    phone: '+91 98765 43210'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'cod'
  const [upiOption, setUpiOption] = useState('gpay'); // 'gpay', 'phonepe', 'paytm', 'bhim', 'custom'
  const [customUpiId, setCustomUpiId] = useState('sameer@okhdfcbank');
  const [upiRefId] = useState(() => 'UPI-' + Math.floor(1000000000 + Math.random() * 9000000000));
  
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
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newTrackingId = 'MM-' + Math.floor(100000 + Math.random() * 900000);
    setOrderTrackingId(newTrackingId);
    
    const newOrderObj = {
      id: newTrackingId,
      date: new Date().toLocaleDateString(),
      items: [...cartItems],
      totalAmount: summary.totalUSD,
      status: 'Processing',
      shippingAddress: shippingInfo,
      paymentMethod: paymentMethod === 'upi' ? `UPI (${upiOption.toUpperCase()})` : paymentMethod.toUpperCase(),
      upiRefId: paymentMethod === 'upi' ? upiRefId : null,
      estimatedDelivery: '2-3 Business Days'
    };

    setStep(3);
    triggerConfetti();
    onClearCart();
    
    if (onOrderPlaced) {
      onOrderPlaced(newOrderObj);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="overlay">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 btn-icon border-slate-700 z-20">
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Stepper Progress Bar */}
        {step < 3 && (
          <div className="bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-around text-xs font-bold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-cyan-400' : 'text-slate-500'}`}>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">1</span>
              <span>Shipping Details</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-800"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-cyan-400' : 'text-slate-500'}`}>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">2</span>
              <span>UPI & Payment</span>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Shipping Details */}
          {step === 1 && (
            <form onSubmit={() => setStep(2)} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Truck className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-slate-100 font-heading">Customer Shipping Address</h3>
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
                <label className="text-xs font-semibold text-slate-400">Delivery Street Address</label>
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
                  <label className="text-xs font-semibold text-slate-400">Pincode / Zip</label>
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

          {/* STEP 2: Payment Options with UPI */}
          {step === 2 && (
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-xl font-bold text-slate-100 font-heading">Choose Payment Method</h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Instant Encrypted Checkout</span>
                </div>
              </div>

              {/* Payment Category Selectors */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === 'upi'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>UPI Payment</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === 'card'
                      ? 'bg-purple-950/60 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  <span>Card / NetBanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === 'cod'
                      ? 'bg-amber-950/60 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* UPI PAYMENT SPECIFIC CONTAINER */}
              {paymentMethod === 'upi' && (
                <div className="bg-slate-950 p-5 border border-emerald-500/30 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Select UPI App / Provider</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">0% Gateway Fee</span>
                  </div>

                  {/* UPI Apps Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'gpay', name: 'Google Pay', icon: '🟢' },
                      { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
                      { id: 'paytm', name: 'Paytm UPI', icon: '🔵' },
                      { id: 'bhim', name: 'BHIM UPI', icon: '🟠' }
                    ].map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setUpiOption(app.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          upiOption === app.id
                            ? 'bg-emerald-900/40 border-emerald-400 text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-lg block mb-0.5">{app.icon}</span>
                        <span className="text-[11px] block">{app.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* UPI ID Input or QR Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-slate-900/90 p-4 border border-slate-800 rounded-xl">
                    <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 bg-white rounded-xl text-slate-950 text-center">
                      <QrCode className="w-24 h-24 text-slate-900" />
                      <span className="text-[9px] font-bold font-mono uppercase mt-1">Scan to Pay via UPI</span>
                    </div>

                    <div className="sm:col-span-8 space-y-3 text-xs">
                      <div>
                        <label className="text-slate-400 font-medium block mb-1">Enter your Virtual Payment Address (VPA / UPI ID):</label>
                        <input
                          type="text"
                          required
                          value={customUpiId}
                          onChange={(e) => setCustomUpiId(e.target.value)}
                          placeholder="username@upi"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-emerald-300 font-mono"
                        />
                      </div>

                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
                        <div className="flex justify-between">
                          <span>UPI Transaction Ref:</span>
                          <span className="text-amber-400 font-mono font-bold">{upiRefId}</span>
                        </div>
                        <p className="text-[10px] text-slate-500">App approve request will be sent to your UPI app instantly.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD PAYMENT CONTAINER */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 bg-slate-950 p-4 border border-slate-800 rounded-2xl">
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
                      <label className="text-xs font-semibold text-slate-400">CVV</label>
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
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center text-sm font-bold">
                <span className="text-slate-300">Total Payable Amount:</span>
                <span className="text-2xl text-emerald-400 font-extrabold font-mono">
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
                <button
                  type="submit"
                  className="btn-primary py-3 px-8 text-sm bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-slate-950 font-black rounded-xl shadow-xl flex items-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 text-slate-950" />
                  <span>Pay & Place Order</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Receipt & Confirmation */}
          {step === 3 && (
            <div id="printable-receipt" className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Order Placed & UPI Payment Verified</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-100 font-heading">Order Successfully Confirmed!</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Tracking ID: <span className="text-cyan-400 font-mono font-extrabold">{orderTrackingId}</span>
                </p>
              </div>

              {/* Receipt Details Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left space-y-4 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-800 pb-3">
                  <div>
                    <p className="font-bold text-slate-200">Customer: {shippingInfo.fullName}</p>
                    <p className="text-slate-400">{shippingInfo.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400">Date: {new Date().toLocaleDateString()}</p>
                    <p className="text-emerald-400 font-bold">Method: {paymentMethod === 'upi' ? `UPI (${upiOption.toUpperCase()})` : paymentMethod.toUpperCase()}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-slate-300 font-sans uppercase text-[10px]">Purchased Items:</p>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-slate-300">
                      <span>{item.quantity}x {item.name}</span>
                      <span>{curr.symbol}{(item.price * curr.rate * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-3 space-y-1 font-sans text-right">
                  <p className="text-slate-400">Paid Total: <strong className="text-emerald-400 text-base font-mono">{curr.symbol}{(summary.totalUSD * curr.rate).toFixed(2)}</strong></p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button onClick={handlePrintReceipt} className="btn-secondary text-xs py-2.5 px-5">
                  <Printer className="w-4 h-4 text-cyan-400" />
                  <span>Print Receipt</span>
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
