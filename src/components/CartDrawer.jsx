import React, { useState } from 'react';
import './CartDrawer.css';
import { X, Trash2, ShoppingCart, Tag, ArrowRight, Sparkles, Check, Truck } from 'lucide-react';
import { CURRENCIES, handleImageError } from '../data/products';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  onProceedToCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoSuccessMsg, setPromoSuccessMsg] = useState('');
  const [promoErrorMsg, setPromoErrorMsg] = useState('');
  const [selectedIds, setSelectedIds] = useState(() => cartItems.map((i) => i.id));

  // Sync selectedIds whenever cartItems changes
  React.useEffect(() => {
    setSelectedIds((prev) => {
      const currentIds = cartItems.map((i) => i.id);
      const newIds = currentIds.filter((id) => !prev.includes(id));
      const updated = [...prev.filter((id) => currentIds.includes(id)), ...newIds];
      return updated.length > 0 ? updated : currentIds;
    });
  }, [cartItems]);

  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  const getItemPrice = (item) => {
    const val = item.priceUSD ?? item.price;
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  };

  const toggleSelectItem = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === cartItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cartItems.map((i) => i.id));
    }
  };

  const selectedCartItems = cartItems.filter((item) => selectedIds.includes(item.id));

  const subtotalUSD = selectedCartItems.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0);
  const discountUSD = (subtotalUSD * discountPercent) / 100;
  const taxableUSD = Math.max(0, subtotalUSD - discountUSD);
  const estimatedTaxUSD = taxableUSD * 0.08;
  const totalUSD = taxableUSD + estimatedTaxUSD;

  const freeShippingThreshold = 500;
  const freeShippingProgress = Math.min(100, (subtotalUSD / freeShippingThreshold) * 100);

  const formatCurr = (usdAmount) => {
    const converted = usdAmount * curr.rate;
    return `${curr.symbol}${converted.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'MUSIC10') {
      setDiscountPercent(10);
      setPromoSuccessMsg('10% OFF Coupon Applied!');
      setPromoErrorMsg('');
    } else if (code === 'BEATS20' || code === 'FAMILY50') {
      setDiscountPercent(15);
      setPromoSuccessMsg('15% OFF Middle-Class Family Coupon Applied!');
      setPromoErrorMsg('');
    } else {
      setDiscountPercent(0);
      setPromoErrorMsg('Invalid coupon code. Try MUSIC10 or FAMILY50');
      setPromoSuccessMsg('');
    }
  };

  return (
    <div className="overlay">
      <div className="drawer p-6 flex flex-col justify-between">
        
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              <h2 className="font-extrabold text-lg text-slate-100 font-heading">Your Instrument Cart</h2>
              <span className="badge font-bold">{cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items</span>
            </div>
            <button onClick={onClose} className="btn-icon">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Select All & Selection Tracker Header */}
          {cartItems.length > 0 && (
            <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 mb-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-200">
                <input
                  type="checkbox"
                  checked={selectedIds.length === cartItems.length && cartItems.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400 cursor-pointer"
                />
                <span>Select All ({selectedIds.length}/{cartItems.length})</span>
              </label>
              <span className="text-[11px] font-bold text-amber-400">
                {selectedCartItems.length} selected for purchase
              </span>
            </div>
          )}

          {/* Free Shipping Meter */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 mb-4 text-xs space-y-1.5">
            <div className="flex justify-between font-semibold">
              <span className="flex items-center gap-1 text-slate-300">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                FREE Delivery Meter
              </span>
              <span className="text-amber-400 font-bold">
                {subtotalUSD >= freeShippingThreshold
                  ? 'Qualified for FREE Delivery!'
                  : `${formatCurr(freeShippingThreshold - subtotalUSD)} away`}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 my-2">
          {cartItems.length > 0 ? (
            cartItems.map((item, idx) => {
              const isSelected = selectedIds.includes(item.id);
              const itemImg = item.image || item.selectedFinish?.image || item.finishes?.[0]?.image;

              return (
                <div
                  key={`${item.id}-${idx}`}
                  className={`glass-panel p-3 flex items-center gap-3 border transition-all ${
                    isSelected ? 'border-amber-500/50 bg-amber-950/10' : 'border-slate-800 opacity-60'
                  }`}
                >
                  {/* Selective Purchase Checkbox */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectItem(item.id)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-400 cursor-pointer shrink-0"
                    title="Select to purchase this instrument"
                  />

                  <img
                    src={itemImg}
                    alt={item.name}
                    onError={handleImageError}
                    className="w-16 h-16 object-contain rounded-xl shrink-0 bg-slate-950 p-1"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-amber-400">{item.brand}</span>
                      {item.selectedFinish && (
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {item.selectedFinish}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-xs text-slate-100 truncate mt-0.5">{item.name}</h4>
                    <p className="text-xs font-extrabold text-amber-400 font-mono mt-0.5">
                      {formatCurr(getItemPrice(item) * item.quantity)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 font-bold text-slate-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-bold text-slate-200">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 font-bold text-slate-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-500 hover:text-red-400 p-1"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 text-slate-500 space-y-3">
              <ShoppingCart className="w-12 h-12 mx-auto text-slate-700" />
              <p className="text-sm font-semibold">Your cart is currently empty.</p>
              <button onClick={onClose} className="btn-secondary text-xs py-2 px-4">
                Start Shopping Now
              </button>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-slate-800 pt-4 space-y-3">
            
            {/* Promo Code Input */}
            <div className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. FAMILY50)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-2 py-1.5 text-xs text-slate-100 outline-none uppercase font-mono"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="btn-secondary text-xs py-1.5 px-3 border-amber-500/40 text-amber-300"
                >
                  Apply
                </button>
              </div>

              {promoSuccessMsg && <p className="text-[11px] text-emerald-400 font-semibold">{promoSuccessMsg}</p>}
              {promoErrorMsg && <p className="text-[11px] text-red-400 font-semibold">{promoErrorMsg}</p>}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex justify-between">
                <span>Selected Subtotal ({selectedCartItems.length} items)</span>
                <span>{formatCurr(subtotalUSD)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-{formatCurr(discountUSD)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Est. Tax (8%)</span>
                <span>{formatCurr(estimatedTaxUSD)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-base text-slate-100 pt-2 border-t border-slate-800">
                <span>Total for Purchase</span>
                <span className="text-amber-400">{formatCurr(totalUSD)}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              disabled={selectedCartItems.length === 0}
              onClick={() => {
                if (selectedCartItems.length === 0) return;
                onClose();
                onProceedToCheckout(selectedCartItems, {
                  subtotalUSD,
                  discountUSD,
                  estimatedTaxUSD,
                  totalUSD,
                  discountPercent
                });
              }}
              className={`btn-amazon-cart w-full py-3 justify-center text-sm font-bold shadow-xl ${
                selectedCartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>
                {selectedCartItems.length > 0
                  ? `Purchase Selected (${selectedCartItems.length})`
                  : 'Select an Instrument to Purchase'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
