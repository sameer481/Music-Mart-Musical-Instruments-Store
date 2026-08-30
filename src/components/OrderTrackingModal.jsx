import React, { useState } from 'react';
import './OrderTrackingModal.css';
import { X, Search, Package, Truck, CheckCircle2, MapPin, Calendar } from 'lucide-react';
import { CURRENCIES } from '../data/products';

export default function OrderTrackingModal({ isOpen, onClose, orders = [], activeTrackingId = '', currency = 'USD' }) {
  const [searchId, setSearchId] = useState(activeTrackingId || '');
  const [searchedOrder, setSearchedOrder] = useState(null);

  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  // Find order by searchId or pick default
  const activeOrder = searchedOrder || orders.find(o => o.id === (searchId || activeTrackingId)) || orders[0];

  const handleSearch = (e) => {
    e.preventDefault();
    const match = orders.find(o => o.id.toLowerCase() === searchId.trim().toLowerCase());
    if (match) {
      setSearchedOrder(match);
    } else {
      alert('No order found with Tracking ID: ' + searchId);
    }
  };

  const getStepStatus = (orderStatus, stepIndex) => {
    const statuses = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentIndex = statuses.indexOf(orderStatus);
    if (currentIndex > stepIndex) return 'completed';
    if (currentIndex === stepIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="overlay">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 btn-icon border-slate-700 z-20">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-slate-950 p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white font-heading">Track Your Order</h2>
              <p className="text-xs text-slate-400">Real-time GPS status & courier delivery progress</p>
            </div>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden w-full sm:w-auto">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. MM-849201)..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="bg-transparent px-3 py-2 text-xs text-white outline-none w-full sm:w-56"
            />
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3 py-2 font-bold text-xs">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          
          {activeOrder ? (
            <>
              {/* Order Meta Info Banner */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Tracking Number</span>
                  <span className="text-xl font-extrabold text-cyan-400 font-mono">{activeOrder.id}</span>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>Placed on: {activeOrder.date || 'Today'}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Estimated Delivery</span>
                  <span className="text-base font-extrabold text-emerald-400 font-mono">{activeOrder.estimatedDelivery || 'In 2-3 Days'}</span>
                  <span className="text-xs text-slate-400 block">Courier: BlueDart Express (#BD-9482)</span>
                </div>
              </div>

              {/* Live Tracking Progress Bar Timeline */}
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-6">Delivery Progress Timeline</h3>

                <div className="grid grid-cols-4 gap-2 relative">
                  
                  {/* Step 1: Placed */}
                  <div className="text-center space-y-2 relative z-10">
                    <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${
                      getStepStatus(activeOrder.status, 0) !== 'pending'
                        ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-200">Order Placed</p>
                    <span className="text-[10px] text-slate-400 block">Confirmed</span>
                  </div>

                  {/* Step 2: Processing */}
                  <div className="text-center space-y-2 relative z-10">
                    <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${
                      getStepStatus(activeOrder.status, 1) === 'completed'
                        ? 'bg-emerald-500 text-slate-950'
                        : getStepStatus(activeOrder.status, 1) === 'active'
                        ? 'bg-cyan-400 text-slate-950 animate-pulse ring-4 ring-cyan-500/20'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      <Package className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-200">Packed</p>
                    <span className="text-[10px] text-slate-400 block">Quality Verified</span>
                  </div>

                  {/* Step 3: Shipped */}
                  <div className="text-center space-y-2 relative z-10">
                    <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${
                      getStepStatus(activeOrder.status, 2) === 'completed'
                        ? 'bg-emerald-500 text-slate-950'
                        : getStepStatus(activeOrder.status, 2) === 'active'
                        ? 'bg-cyan-400 text-slate-950 animate-pulse ring-4 ring-cyan-500/20'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-200">Dispatched</p>
                    <span className="text-[10px] text-slate-400 block">In Transit</span>
                  </div>

                  {/* Step 4: Delivered */}
                  <div className="text-center space-y-2 relative z-10">
                    <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${
                      activeOrder.status === 'Delivered'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-200">Delivered</p>
                    <span className="text-[10px] text-slate-400 block">Destination</span>
                  </div>

                </div>
              </div>

              {/* Order Items & Shipping Address Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Shipping Address Card */}
                <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <span className="font-bold text-purple-400 uppercase tracking-wider block">Shipping Address</span>
                  <p className="font-bold text-slate-200">{activeOrder.shippingAddress?.fullName || 'Customer'}</p>
                  <p className="text-slate-400">{activeOrder.shippingAddress?.address}</p>
                  <p className="text-slate-400">{activeOrder.shippingAddress?.city}, {activeOrder.shippingAddress?.state} - {activeOrder.shippingAddress?.zip}</p>
                  <p className="text-slate-400">Phone: {activeOrder.shippingAddress?.phone}</p>
                  {activeOrder.upiRefId && (
                    <div className="pt-2 text-amber-400 font-mono font-bold">
                      UPI Ref ID: {activeOrder.upiRefId}
                    </div>
                  )}
                </div>

                {/* Items Summary */}
                <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider block">Items in Order</span>
                  <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                    {activeOrder.items?.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-slate-300">
                        <span className="truncate pr-2">{item.quantity}x {item.name}</span>
                        <span className="font-mono font-bold text-slate-100">
                          {curr.symbol}{((item.priceUSD || item.price || 0) * curr.rate * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-slate-100">
                    <span>Total Amount Paid:</span>
                    <span className="text-pink-400 font-mono">
                      {curr.symbol}{(activeOrder.totalAmount * curr.rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

              </div>
            </>
          ) : (
            <div className="text-center py-12 space-y-3">
              <Package className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-300">No Orders Tracked Yet</h3>
              <p className="text-xs text-slate-500">Place an order from the shop to track your live package shipping status.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
