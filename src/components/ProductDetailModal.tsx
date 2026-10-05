import React, { useState } from 'react';
import { Jersey, KitEdition } from '../types/jersey';
import { JerseyMockup } from './JerseyMockup';
import { X, Check, ShieldCheck, Truck, RotateCcw, Sparkles, Ruler } from 'lucide-react';

interface ProductDetailModalProps {
  jersey: Jersey | null;
  onClose: () => void;
  onAddToCart: (
    jersey: Jersey,
    size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL',
    edition: KitEdition,
    customization?: {
      name: string;
      number: string;
      fontStyle: 'modern' | 'retro-block' | 'continental';
      sleeveBadge?: string;
    }
  ) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  jersey,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!jersey) return null;

  const [view, setView] = useState<'front' | 'back'>('front');
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');
  const [printOption, setPrintOption] = useState<'none' | 'preset' | 'custom'>('none');
  const [presetIndex, setPresetIndex] = useState<number>(0);
  const [customName, setCustomName] = useState<string>('');
  const [customNumber, setCustomNumber] = useState<string>('7');
  const [selectedBadge, setSelectedBadge] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const activePreset = jersey.playerPresets[presetIndex] || jersey.playerPresets[0];

  const currentName =
    printOption === 'preset'
      ? activePreset?.name || ''
      : printOption === 'custom'
      ? customName.toUpperCase()
      : '';

  const currentNumber =
    printOption === 'preset'
      ? activePreset?.number.toString() || '10'
      : printOption === 'custom'
      ? customNumber
      : '';

  const basePrice = jersey.price;
  const printCost = printOption !== 'none' ? 15 : 0;
  const badgeCost = selectedBadge ? 6 : 0;
  const finalPrice = basePrice + printCost + badgeCost;

  const handleAdd = () => {
    const customConfig =
      printOption !== 'none' || selectedBadge
        ? {
            name: currentName || 'PLAYER',
            number: currentNumber || '10',
            fontStyle: 'modern' as const,
            sleeveBadge: selectedBadge || undefined,
          }
        : undefined;

    onAddToCart(jersey, selectedSize, jersey.edition, customConfig);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#121620] border border-[#262e3f] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="px-6 py-3.5 border-b border-[#212735] flex items-center justify-between bg-[#0e1118]">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span>{jersey.league}</span>
            <span aria-hidden="true">·</span>
            <span>{jersey.season}</span>
            <span aria-hidden="true">·</span>
            <span className="text-white font-semibold">{jersey.club}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1a202d] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content: Split Screen PDP */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
          
          {/* Left Column: Interactive Visual Showcase */}
          <div className="md:col-span-6 bg-[#0a0c10] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#212735]">
            
            {/* View switcher */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-semibold text-slate-400">
                {jersey.edition}
              </span>
              <div className="flex items-center gap-1 bg-[#151923] p-1 rounded-lg border border-[#242b3b]">
                <button
                  onClick={() => setView('front')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    view === 'front' ? 'bg-[#ff3b30] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Front View
                </button>
                <button
                  onClick={() => setView('back')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    view === 'back' ? 'bg-[#ff3b30] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Back (Print)
                </button>
              </div>
            </div>

            {/* Live Shirt View */}
            <div className="my-auto py-6 flex items-center justify-center min-h-[300px]">
              <JerseyMockup
                jersey={jersey}
                view={view}
                customName={currentName}
                customNumber={currentNumber}
                fontStyle="modern"
                sleeveBadge={selectedBadge}
                className="w-full h-full max-h-[360px]"
              />
            </div>

            {/* Editorial Fabric Specs */}
            <div className="p-3.5 bg-[#121622] rounded-xl border border-[#212736] text-xs space-y-1.5">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Fabric & Matchday Spec</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {jersey.fabricDetails}
              </p>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 flex flex-col justify-between space-y-5 bg-[#121620]">
            
            <div className="space-y-5">
              {/* Product Title & Pricing */}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white font-display leading-snug">
                  {jersey.title}
                </h1>
                
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-2xl font-black text-white tabular-nums">
                    ${finalPrice}
                  </span>
                  {jersey.originalPrice && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      ${jersey.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-slate-400">USD</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {jersey.description}
              </p>

              {/* Size Selector with Fit Guide link */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Select Size
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-[#ff3b30] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size & Measurement Guide</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-6 gap-1.5">
                  {(['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'border-[#ff3b30] bg-[#ff3b30] text-white shadow-sm'
                          : 'border-[#262e3f] bg-[#161a25] text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Number Printing Options */}
              <div className="space-y-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                  Official Vinyl Heat-Press Printing
                </span>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setPrintOption('none');
                      setView('front');
                    }}
                    className={`p-2 rounded-lg border text-center transition-colors cursor-pointer ${
                      printOption === 'none'
                        ? 'border-[#ff3b30] bg-[#1a1f2c] text-white font-medium'
                        : 'border-[#242b3b] bg-[#141822] text-slate-400'
                    }`}
                  >
                    Plain Shirt ($0)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPrintOption('preset');
                      setView('back');
                    }}
                    className={`p-2 rounded-lg border text-center transition-colors cursor-pointer ${
                      printOption === 'preset'
                        ? 'border-[#ff3b30] bg-[#1a1f2c] text-white font-medium'
                        : 'border-[#242b3b] bg-[#141822] text-slate-400'
                    }`}
                  >
                    Squad Legend (+$15)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPrintOption('custom');
                      setView('back');
                    }}
                    className={`p-2 rounded-lg border text-center transition-colors cursor-pointer ${
                      printOption === 'custom'
                        ? 'border-[#ff3b30] bg-[#1a1f2c] text-white font-medium'
                        : 'border-[#242b3b] bg-[#141822] text-slate-400'
                    }`}
                  >
                    Custom Name (+$15)
                  </button>
                </div>

                {/* Preset Player Selector */}
                {printOption === 'preset' && (
                  <div className="p-3 bg-[#161a25] border border-[#273042] rounded-lg space-y-2">
                    <span className="text-[11px] text-slate-400 block font-medium">Choose Official Player:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {jersey.playerPresets.map((p, idx) => (
                        <button
                          key={p.name}
                          onClick={() => {
                            setPresetIndex(idx);
                            setView('back');
                          }}
                          className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                            presetIndex === idx
                              ? 'border-[#ff3b30] bg-[#ff3b30] text-white font-bold'
                              : 'border-[#2a3447] bg-[#131720] text-slate-300 hover:text-white'
                          }`}
                        >
                          {p.name} {p.number}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Name Inputs */}
                {printOption === 'custom' && (
                  <div className="p-3 bg-[#161a25] border border-[#273042] rounded-lg grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <span className="text-[11px] text-slate-400 block mb-1">Your Name</span>
                      <input
                        type="text"
                        maxLength={12}
                        value={customName}
                        onChange={(e) => {
                          setCustomName(e.target.value.toUpperCase());
                          setView('back');
                        }}
                        placeholder="NAME"
                        className="w-full bg-[#11141c] border border-[#2a3447] focus:border-[#ff3b30] rounded px-2.5 py-1.5 text-xs text-white uppercase font-mono outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">Number</span>
                      <input
                        type="text"
                        maxLength={2}
                        value={customNumber}
                        onChange={(e) => {
                          setCustomNumber(e.target.value.replace(/[^0-9]/g, ''));
                          setView('back');
                        }}
                        placeholder="10"
                        className="w-full bg-[#11141c] border border-[#2a3447] focus:border-[#ff3b30] rounded px-2.5 py-1.5 text-xs text-white font-mono text-center outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Tournament Sleeve Badge Option */}
              {jersey.availableBadges.length > 0 && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
                    Official Sleeve Tournament Badge
                  </span>
                  <select
                    value={selectedBadge}
                    onChange={(e) => setSelectedBadge(e.target.value)}
                    className="w-full bg-[#161a25] border border-[#273042] focus:border-[#ff3b30] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none cursor-pointer"
                  >
                    <option value="">No Badge Selected (+$0.00)</option>
                    {jersey.availableBadges.map((b) => (
                      <option key={b} value={b}>
                        {b} (+$6.00)
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Bottom Add to Bag Action Bar */}
            <div className="pt-4 border-t border-[#212735] space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>Tracked Express Worldwide Dispatch</span>
                </span>
                <span className="text-white font-semibold">Total: ${finalPrice} USD</span>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={addedSuccess}
                className="w-full py-3.5 px-4 bg-[#ff3b30] hover:bg-[#e03429] text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#ff3b30]/20 disabled:bg-emerald-600"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <span>Add to Matchday Bag (${finalPrice})</span>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
