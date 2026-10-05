import React, { useState } from 'react';
import { CartItem } from '../types/jersey';
import { JerseyMockup } from './JerseyMockup';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  discountRate: number;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountRate,
  onApplyPromo,
}) => {
  const [promoInput, setPromoInput] = useState<string>('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discount = Math.round(subtotal * discountRate);
  const freeShippingThreshold = 120;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping || subtotal === 0 ? 0 : 12;
  const total = Math.max(0, subtotal - discount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = onApplyPromo(promoInput);
    if (ok) {
      setPromoMessage({ text: 'Promo code CURVA10 applied! 10% discount', success: true });
    } else {
      setPromoMessage({ text: 'Invalid code. Try "CURVA10"', success: false });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-[#10131b] border-l border-[#232a39] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#212735] flex items-center justify-between bg-[#0d1016]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ff3b30]" />
            <h2 className="text-base font-bold text-white font-display uppercase tracking-tight">
              Matchday Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1a202d] transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-6 py-3 bg-[#141822] border-b border-[#1f2636] text-xs">
          {isFreeShipping ? (
            <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span>✓ You’ve qualified for Free Express Tracked Shipping!</span>
            </div>
          ) : (
            <div>
              <div className="text-slate-300 mb-1.5">
                Add <span className="font-bold text-white">${freeShippingThreshold - subtotal}</span> more for Free Worldwide Shipping
              </div>
              <div className="w-full bg-[#202737] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#ff3b30] h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Itemized List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#181d28] border border-[#273245] flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="text-base font-bold text-white font-display">Your bag is empty</h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Explore our authentic club kits, 90s vintage archives, or customize your own matchday shirt.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#ff3b30] hover:bg-[#e03429] rounded-lg transition-colors cursor-pointer"
              >
                Browse Shirts
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-[#141822] rounded-xl border border-[#222938] flex gap-3 items-center"
              >
                {/* Visual miniature mockup */}
                <div className="w-18 h-22 bg-[#0e1117] rounded-lg border border-[#252d3d] p-1 flex items-center justify-center shrink-0">
                  <JerseyMockup
                    jersey={item.jersey}
                    view={item.customization ? 'back' : 'front'}
                    customName={item.customization?.name}
                    customNumber={item.customization?.number}
                    fontStyle={item.customization?.fontStyle}
                    className="w-full h-full"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-bold text-white truncate font-display">
                      {item.jersey.club} ({item.jersey.season})
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-[#ff3b30] p-1 cursor-pointer transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 mt-0.5 space-y-0.5">
                    <div>Size: <span className="text-slate-200 font-medium">{item.size}</span> · {item.edition === 'Matchday Player Issue' ? 'Player Issue' : 'Replica'}</div>
                    {item.customization && (
                      <div className="text-[#ff3b30] font-mono text-[10px] font-semibold">
                        PRINT: {item.customization.name} #{item.customization.number}
                      </div>
                    )}
                    {item.customization?.sleeveBadge && (
                      <div className="text-slate-300 text-[10px] truncate">
                        Badge: {item.customization.sleeveBadge}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center border border-[#2a3447] rounded bg-[#0f121a]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-slate-300 hover:bg-[#1a2130] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-xs text-slate-300 hover:bg-[#1a2130] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-white tabular-nums">
                      ${item.unitPrice * item.quantity} USD
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo code & Footer summary */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#212735] bg-[#0d1016] space-y-4">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (CURVA10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  className="flex-1 bg-[#141822] border border-[#273144] focus:border-[#ff3b30] rounded-lg px-3 py-2 text-xs text-white uppercase outline-none font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-semibold text-white bg-[#1e2533] hover:bg-[#283245] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-[11px] ${promoMessage.success ? 'text-emerald-400' : 'text-[#ff3b30]'}`}>
                  {promoMessage.text}
                </p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium tabular-nums">${subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Promo Discount (10%)</span>
                  <span className="tabular-nums">-${discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>DHL Express Shipping</span>
                <span className="text-white font-medium tabular-nums">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#202737] flex justify-between text-base font-bold text-white">
                <span className="font-display">Total</span>
                <span className="tabular-nums">${total} USD</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 bg-[#ff3b30] hover:bg-[#e03429] text-white font-bold text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#ff3b30]/20"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Hologram Authenticity Guaranteed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
