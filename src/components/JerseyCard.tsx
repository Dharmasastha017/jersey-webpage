import React, { useState } from 'react';
import { Jersey } from '../types/jersey';
import { JerseyMockup } from './JerseyMockup';
import { Eye, Sparkles, Plus } from 'lucide-react';

interface JerseyCardProps {
  jersey: Jersey;
  onSelect: (jersey: Jersey) => void;
  onQuickCustomize: (jersey: Jersey) => void;
  onQuickAdd: (jersey: Jersey) => void;
}

export const JerseyCard: React.FC<JerseyCardProps> = ({
  jersey,
  onSelect,
  onQuickCustomize,
  onQuickAdd,
}) => {
  const [view, setView] = useState<'front' | 'back'>('back');

  return (
    <div className="group relative flex flex-col bg-[#131720] border border-[#212735] hover:border-[#353f54] rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50">
      
      {/* Visual Canvas Area (65-75% height) */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-[#181d29] to-[#12151e] p-4 flex items-center justify-center overflow-hidden">
        
        {/* Subtle Text Tag (Single tag rule, NO pill sandwich) */}
        {jersey.badgeTag && (
          <div className="absolute top-3 left-3 z-10 text-[11px] font-semibold tracking-wider text-slate-300 uppercase bg-[#0c0e12]/80 backdrop-blur-xs px-2 py-0.5 rounded border border-[#273042]">
            {jersey.badgeTag}
          </div>
        )}

        {/* View toggle (Front / Back) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setView(v => v === 'back' ? 'front' : 'back');
          }}
          className="absolute top-3 right-3 z-10 text-[11px] font-medium text-slate-300 bg-[#0c0e12]/80 hover:bg-[#1a202d] px-2 py-1 rounded border border-[#273042] transition-colors cursor-pointer"
          title="Toggle Front/Back View"
        >
          {view === 'back' ? 'View Front' : 'View Back'}
        </button>

        {/* Live Vector Jersey Simulation */}
        <div
          onClick={() => onSelect(jersey)}
          className="w-full h-full flex items-center justify-center cursor-pointer transition-transform duration-300 group-hover:scale-105"
        >
          <JerseyMockup
            jersey={jersey}
            view={view}
            customName={jersey.playerPresets[0]?.name}
            customNumber={jersey.playerPresets[0]?.number.toString()}
            className="w-full h-full max-h-[220px]"
          />
        </div>

        {/* Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(jersey);
            }}
            className="flex-1 py-2 px-3 bg-[#0c0e12]/95 hover:bg-[#1f2533] text-white text-xs font-semibold rounded-lg border border-[#2d3648] flex items-center justify-center gap-1.5 transition-colors cursor-pointer backdrop-blur-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details & Sizes</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickCustomize(jersey);
            }}
            title="Open in Customizer Studio"
            className="p-2 bg-[#ff3b30] hover:bg-[#e03429] text-white rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Unboxed metadata: Club · Season · League */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium tracking-wide">
            <span>{jersey.club}</span>
            <span aria-hidden="true">·</span>
            <span>{jersey.season}</span>
            <span aria-hidden="true">·</span>
            <span>{jersey.type}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelect(jersey)}
            className="text-sm font-semibold text-white mt-1 leading-snug line-clamp-1 hover:text-[#ff3b30] cursor-pointer transition-colors"
          >
            {jersey.title}
          </h3>
        </div>

        {/* Pricing and Available Presets */}
        <div className="pt-2 border-t border-[#1c222e] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-white tabular-nums">
              ${jersey.price}
            </span>
            {jersey.originalPrice && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ${jersey.originalPrice}
              </span>
            )}
            <span className="text-[11px] text-slate-400">USD</span>
          </div>

          {/* Edition text */}
          <span className="text-[11px] text-slate-400 font-medium">
            {jersey.edition === 'Matchday Player Issue' ? 'Player Issue' : 'Stadium Fit'}
          </span>
        </div>
      </div>

    </div>
  );
};
