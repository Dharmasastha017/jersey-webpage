import React, { useState } from 'react';
import { CartItem, OrderConfirmation } from '../types/jersey';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, ArrowRight, Package } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onOrderSuccess: (order: OrderConfirmation) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discount,
  shipping,
  total,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cod'>('card');
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);

  // Form states
  const [fullName, setFullName] = useState('Alexander Wright');
  const [email, setEmail] = useState('sastharajesh017@gmail.com');
  const [address, setAddress] = useState('44 Highbury Crescent');
  const [city, setCity] = useState('London');
  const [country, setCountry] = useState('United Kingdom');
  const [postalCode, setPostalCode] = useState('N5 1RN');

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `CK-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: OrderConfirmation = {
      orderId,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...cartItems],
      customer: {
        fullName,
        email,
        address,
        city,
        country,
        postalCode,
      },
      subtotal,
      discount,
      shipping,
      total,
      paymentMethod:
        paymentMethod === 'card'
          ? 'Credit / Debit Card (Stripe)'
          : paymentMethod === 'apple_pay'
          ? 'Apple Pay / Digital Wallet'
          : 'Cash on Delivery (COD)',
      status: 'Confirmed',
      estimatedDelivery: '3–5 Business Days (Tracked Air Express)',
    };

    setCompletedOrder(newOrder);
    setStep('success');
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#11141c] border border-[#262e3f] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#212735] flex items-center justify-between bg-[#0e1118]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white font-display uppercase tracking-tight">
              {step === 'details' ? 'Secure Matchday Checkout' : 'Order Confirmed'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1a202d] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {step === 'details' ? (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Order quick overview */}
              <div className="p-4 bg-[#151924] rounded-xl border border-[#242b3b] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Items in Order:</span>
                  <span className="font-semibold text-white">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Shirts
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Shipping:</span>
                  <span className="font-semibold text-emerald-400">
                    {shipping === 0 ? 'Free DHL Express Worldwide' : `$${shipping} USD`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#202737] flex items-center justify-between text-sm font-bold text-white">
                  <span>Grand Total:</span>
                  <span className="text-[#ff3b30] text-base tabular-nums">${total} USD</span>
                </div>
              </div>

              {/* 1. Shipping Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  1. Dispatch & Delivery Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#161a25] border border-[#273144] focus:border-[#ff3b30] rounded-lg px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Email for Tracking Receipt</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#161a25] border border-[#273144] focus:border-[#ff3b30] rounded-lg px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-slate-400 block mb-1">Street Address</label>
                    <input
                      required
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#161a25] border border-[#273144] focus:border-[#ff3b30] rounded-lg px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">City</label>
                    <input
                      required
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#161a25] border border-[#273144] focus:border-[#ff3b30] rounded-lg px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Postal / ZIP Code</label>
                    <input
                      required
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-[#161a25] border border-[#273144] focus:border-[#ff3b30] rounded-lg px-3 py-2 text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Payment Method */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  2. Select Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#ff3b30] bg-[#1a1f2e] text-white shadow-sm'
                        : 'border-[#232b3b] bg-[#141822] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mb-2 text-[#ff3b30]" />
                    <div>
                      <div className="text-xs font-bold">Credit Card</div>
                      <div className="text-[10px] text-slate-400">Visa, MC, Amex</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'apple_pay'
                        ? 'border-[#ff3b30] bg-[#1a1f2e] text-white shadow-sm'
                        : 'border-[#232b3b] bg-[#141822] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Package className="w-4 h-4 mb-2 text-white" />
                    <div>
                      <div className="text-xs font-bold">Apple Pay</div>
                      <div className="text-[10px] text-slate-400">Instant One-Touch</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#ff3b30] bg-[#1a1f2e] text-white shadow-sm'
                        : 'border-[#232b3b] bg-[#141822] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Banknote className="w-4 h-4 mb-2 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold">Cash on Delivery</div>
                      <div className="text-[10px] text-slate-400">Pay on Handshake</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-4 bg-[#ff3b30] hover:bg-[#e03429] text-white font-bold text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#ff3b30]/20"
                >
                  <span>Authorize & Place Order (${total} USD)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          ) : (
            /* Post-order State */
            completedOrder && (
              <div className="space-y-6 text-center py-4">
                
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white font-display">
                    Order Confirmed — #{completedOrder.orderId}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 max-w-md mx-auto">
                    Your official kits have been sent to our Kit Room heat-press station. 
                    A receipt and DHL live tracking link have been dispatched to <span className="text-white font-semibold">{completedOrder.customer.email}</span>.
                  </p>
                </div>

                {/* Status Timeline */}
                <div className="p-4 bg-[#141823] rounded-xl border border-[#222939] text-left space-y-3">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Live Kit Room Status
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                      <div className="font-bold">1. Confirmed</div>
                      <div className="text-[10px] opacity-80">Payment verified</div>
                    </div>
                    <div className="p-2 rounded bg-[#ff3b30]/15 border border-[#ff3b30]/40 text-[#ff7066] animate-pulse">
                      <div className="font-bold">2. In Kit Room</div>
                      <div className="text-[10px] opacity-80">Vinyl heat-press</div>
                    </div>
                    <div className="p-2 rounded bg-[#10141d] border border-[#232a39] text-slate-400">
                      <div className="font-bold">3. QC Check</div>
                      <div className="text-[10px] opacity-80">Hologram seal</div>
                    </div>
                    <div className="p-2 rounded bg-[#10141d] border border-[#232a39] text-slate-400">
                      <div className="font-bold">4. Dispatched</div>
                      <div className="text-[10px] opacity-80">DHL Express</div>
                    </div>
                  </div>
                </div>

                {/* Itemized receipt summary */}
                <div className="p-4 bg-[#141823] rounded-xl border border-[#222939] text-left text-xs space-y-2">
                  <div className="font-bold text-white">Receipt Summary</div>
                  {completedOrder.items.map((it) => (
                    <div key={it.id} className="flex justify-between text-slate-300">
                      <span>
                        {it.jersey.club} ({it.jersey.season}) · Size {it.size}
                        {it.customization && ` · ${it.customization.name} #${it.customization.number}`}
                        <span className="text-slate-400 ml-1">×{it.quantity}</span>
                      </span>
                      <span className="font-mono text-white tabular-nums">${it.unitPrice * it.quantity}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#202737] flex justify-between font-bold text-white">
                    <span>Total Paid:</span>
                    <span className="text-[#ff3b30] tabular-nums">${completedOrder.total} USD</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#1e2534] hover:bg-[#273145] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Return to Storefront
                </button>

              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
