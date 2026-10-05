import React, { useState, useEffect } from 'react';
import { Jersey, KitEdition } from '../types/jersey';
import { JerseyMockup } from './JerseyMockup';
import { CUSTOM_STATION_IMAGE } from '../data/jerseys';
import { X, Sparkles, Check, RotateCw, ShoppingBag, Info } from 'lucide-react';

interface JerseyCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  jerseys: Jersey[];
  initialJersey?: Jersey | null;
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
}

export const JerseyCustomizerModal: React.FC<JerseyCustomizerModalProps> = ({
  isOpen,
  onClose,
  jerseys,
  initialJersey,
  onAddToCart,
}) => {
  const [selectedJersey, setSelectedJersey] = useState<Jersey>(initialJersey || jerseys[0]);
  const [view, setView] = useState<'back' | 'front'>('back');
  const [playerName, setPlayerName] = useState<string>('YOUR NAME');
  const [playerNumber, setPlayerNumber] = useState<string>('10');
  const [fontStyle, setFontStyle] = useState<'modern' | 'retro-block' | 'continental'>('modern');
  const [selectedBadge, setSelectedBadge] = useState<string>('');
  const [size, setSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>('L');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (initialJersey) {
      setSelectedJersey(initialJersey);
      if (initialJersey.playerPresets && initialJersey.playerPresets.length > 0) {
        setPlayerName(initialJersey.playerPresets[0].name);
        setPlayerNumber(initialJersey.playerPresets[0].number.toString());
      }
    }
  }, [initialJersey]);

  if (!isOpen) return null;

  const basePrice = selectedJersey.price;
  const printingCost = playerName.trim() ? 15 : 0;
  const badgeCost = selectedBadge ? 6 : 0;
  const totalPrice = basePrice + printingCost + badgeCost;

  const handleApplyPreset = (presetName: string, presetNum: number) => {
    setPlayerName(presetName);
    setPlayerNumber(presetNum.toString());
  };

  const handleAdd = () => {
    onAddToCart(
      selectedJersey,
      size,
      selectedJersey.edition,
      {
        name: playerName.toUpperCase().trim() || 'CUSTOM',
        number: playerNumber.trim() || '10',
        fontStyle,
        sleeveBadge: selectedBadge || undefined,
      }
    );
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-[#11141c] border border-[#262e3e] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-[#212735] flex items-center justify-between bg-[#0e1017]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ff3b30]" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display uppercase tracking-tight">
                Curva Kit Room Customizer
              </h2>
              <p className="text-xs text-slate-400">
                Official vinyl heat-press lettering & authentic sleeve emblems
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1c2230] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          
          {/* Left Canvas Panel: Interactive Mockup */}
          <div className="lg:col-span-7 bg-[#0b0d13] p-6 flex flex-col items-center justify-between border-b lg:border-b-0 lg:border-r border-[#212735] relative">
            
            {/* View switcher & jersey model selector */}
            <div className="w-full flex items-center justify-between z-10">
              <div className="text-xs font-semibold text-slate-300">
                {selectedJersey.club} · {selectedJersey.season} {selectedJersey.type}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-[#161a23] p-1 rounded-lg border border-[#283142]">
                <button
                  type="button"
                  onClick={() => setView('back')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    view === 'back'
                      ? 'bg-[#ff3b30] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Back (Name & Number)
                </button>
                <button
                  type="button"
                  onClick={() => setView('front')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    view === 'front'
                      ? 'bg-[#ff3b30] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Front (Crest & Sponsor)
                </button>
              </div>
            </div>

            {/* Live Mockup */}
            <div className="w-full my-6 flex items-center justify-center min-h-[320px] max-h-[440px]">
              <JerseyMockup
                jersey={selectedJersey}
                view={view}
                customName={playerName}
                customNumber={playerNumber}
                fontStyle={fontStyle}
                sleeveBadge={selectedBadge}
                className="w-full h-full max-h-[400px]"
              />
            </div>

            {/* Quick Kit Picker Carousel */}
            <div className="w-full pt-4 border-t border-[#1a1f2b]">
              <div className="text-[11px] uppercase font-semibold text-slate-400 mb-2">
                Choose Base Shirt
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {jerseys.map((j) => (
                  <button
                    key={j.id}
                    onClick={() => {
                      setSelectedJersey(j);
                      if (j.playerPresets.length > 0) {
                        setPlayerName(j.playerPresets[0].name);
                        setPlayerNumber(j.playerPresets[0].number.toString());
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${
                      selectedJersey.id === j.id
                        ? 'border-[#ff3b30] bg-[#1a1f2d] text-white'
                        : 'border-[#222938] bg-[#121620] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {j.club} ({j.season})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Controls Panel */}
          <div className="lg:col-span-5 p-6 bg-[#11141c] flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              
              {/* 1. Name & Number Inputs */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  1. Heat-Press Personalization (+${printingCost})
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <span className="text-[11px] text-slate-400 block mb-1">Player Name</span>
                    <input
                      type="text"
                      maxLength={12}
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                      placeholder="e.g. BELLINGHAM"
                      className="w-full bg-[#181d27] border border-[#2a3447] focus:border-[#ff3b30] rounded-lg px-3 py-2 text-sm text-white font-mono tracking-wider outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Squad No.</span>
                    <input
                      type="text"
                      maxLength={2}
                      value={playerNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setPlayerNumber(val);
                      }}
                      placeholder="10"
                      className="w-full bg-[#181d27] border border-[#2a3447] focus:border-[#ff3b30] rounded-lg px-3 py-2 text-sm text-white font-mono text-center outline-none"
                    />
                  </div>
                </div>

                {/* Squad Presets */}
                {selectedJersey.playerPresets && selectedJersey.playerPresets.length > 0 && (
                  <div className="mt-3">
                    <span className="text-[11px] text-slate-400 block mb-1.5">Official Squad Presets:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedJersey.playerPresets.map((p) => (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => handleApplyPreset(p.name, p.number)}
                          className="px-2.5 py-1 text-xs bg-[#171c26] hover:bg-[#222a3a] border border-[#273144] rounded text-slate-300 transition-colors cursor-pointer"
                        >
                          {p.name} {p.number}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Font Style Typography */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  2. Vinyl Font Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFontStyle('modern')}
                    className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                      fontStyle === 'modern'
                        ? 'border-[#ff3b30] bg-[#1c2230] text-white'
                        : 'border-[#242b3b] bg-[#141822] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-display font-extrabold text-lg">07</div>
                    <div className="text-[10px] mt-0.5 font-medium">Modern Bold</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFontStyle('retro-block')}
                    className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                      fontStyle === 'retro-block'
                        ? 'border-[#ff3b30] bg-[#1c2230] text-white'
                        : 'border-[#242b3b] bg-[#141822] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-jersey font-extrabold text-xl">07</div>
                    <div className="text-[10px] mt-0.5 font-medium">90s Retro Block</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFontStyle('continental')}
                    className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                      fontStyle === 'continental'
                        ? 'border-[#ff3b30] bg-[#1c2230] text-white'
                        : 'border-[#242b3b] bg-[#141822] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-serif font-bold text-lg">07</div>
                    <div className="text-[10px] mt-0.5 font-medium">European Cup</div>
                  </button>
                </div>
              </div>

              {/* 3. Sleeve Tournament Badges */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  3. Official Sleeve Emblem (+${badgeCost})
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2.5 p-2 rounded-lg bg-[#141822] border border-[#222938] cursor-pointer hover:border-[#313c52]">
                    <input
                      type="radio"
                      name="badge"
                      checked={selectedBadge === ''}
                      onChange={() => setSelectedBadge('')}
                      className="accent-[#ff3b30]"
                    />
                    <span className="text-xs text-slate-300">No Sleeve Badges (Clean Kit)</span>
                  </label>

                  {selectedJersey.availableBadges.map((b) => (
                    <label
                      key={b}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-[#141822] border border-[#222938] cursor-pointer hover:border-[#313c52]"
                    >
                      <input
                        type="radio"
                        name="badge"
                        checked={selectedBadge === b}
                        onChange={() => setSelectedBadge(b)}
                        className="accent-[#ff3b30]"
                      />
                      <span className="text-xs text-white flex-1">{b}</span>
                      <span className="text-[11px] font-semibold text-slate-400">+$6.00</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 4. Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    4. Select Size
                  </label>
                  <span className="text-[11px] text-slate-400">True to Fit</span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {(['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        size === s
                          ? 'border-[#ff3b30] bg-[#ff3b30] text-white shadow-sm'
                          : 'border-[#262e3f] bg-[#151924] text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Total & CTA */}
            <div className="pt-4 border-t border-[#212735] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Customized Shirt Total:</div>
                  <div className="text-2xl font-black text-white font-display tabular-nums">
                    ${totalPrice}
                    <span className="text-xs font-normal text-slate-400 ml-1">USD</span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Includes Vinyl Application</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={addedSuccess}
                className="w-full py-3.5 px-4 bg-[#ff3b30] hover:bg-[#e03429] text-white font-bold text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#ff3b30]/20 disabled:bg-emerald-600"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Matchday Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Customized Kit to Bag (${totalPrice})</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
