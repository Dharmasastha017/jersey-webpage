import React from 'react';
import { HERO_IMAGE } from '../data/jerseys';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Globe } from 'lucide-react';

interface HeroProps {
  onScrollToCatalog: () => void;
  onOpenCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCatalog, onOpenCustomizer }) => {
  return (
    <section className="relative overflow-hidden bg-[#0c0e12] border-b border-[#212631]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Clean unboxed editorial kicker without pill badge */}
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase font-semibold text-[#ff3b30]">
              <span>Official Matchday Issue</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">1990–2025 Vault Archive</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Vinyl Print Studio</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.1] text-balance">
              The sacred thread of football history, tailored to your name.
            </h1>

            {/* Body prose */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              From 1990s cult tournament grails to elite 2024/25 player-issue kits. 
              Every shirt is 100% authentic, accompanied by official league heat-press 
              lettering and tournament victory badges.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onScrollToCatalog}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#ff3b30] hover:bg-[#e03429] rounded-lg transition-all duration-150 inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#ff3b30]/20"
              >
                <span>Browse The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCustomizer}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#1a1f2c] hover:bg-[#252c3e] border border-[#2e374a] rounded-lg transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#ff3b30]" />
                <span>Customize Your Kit</span>
              </button>
            </div>

            {/* Claim-to-Proof Adjacency with quantitative precision */}
            <div className="pt-6 border-t border-[#1e232d] grid grid-cols-3 gap-4 sm:gap-6 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-display tabular-nums">
                  100%
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Verified Official & Certified Vault Relics
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-display tabular-nums">
                  24h
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Kit Room Printing & Dispatch Guarantee
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-display tabular-nums">
                  50+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Official League & European Badges
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Studio Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#252c3b] shadow-2xl bg-[#141821] group">
              <img
                src={HERO_IMAGE}
                alt="Authentic football shirts displayed in showroom"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  // Fallback container if local image fails
                  e.currentTarget.style.display = 'none';
                }}
              />
              
              {/* Subtle gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent opacity-80" />

              {/* Inset live tag overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0f1219]/90 backdrop-blur-md border border-[#252c3c] flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Spotlight Drop</div>
                  <div className="text-sm font-bold text-white font-display">Real Madrid 24/25 & 1999 Treble Archive</div>
                </div>
                <button
                  onClick={onScrollToCatalog}
                  className="text-xs font-semibold text-[#ff3b30] hover:text-white transition-colors cursor-pointer"
                >
                  View Drop →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
