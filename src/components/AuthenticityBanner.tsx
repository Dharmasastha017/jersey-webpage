import React from 'react';
import { CUSTOM_STATION_IMAGE } from '../data/jerseys';
import { ShieldCheck, Flame, Stamp, Sparkles, RefreshCw } from 'lucide-react';

interface AuthenticityBannerProps {
  onOpenCustomizer: () => void;
}

export const AuthenticityBanner: React.FC<AuthenticityBannerProps> = ({ onOpenCustomizer }) => {
  return (
    <section className="bg-[#0e1117] border-t border-b border-[#212635] py-14 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Visual Workshop Picture */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-[#242c3c] shadow-2xl bg-[#121622] group">
              <img
                src={CUSTOM_STATION_IMAGE}
                alt="Kit room vinyl heat press machine"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1117] via-transparent to-transparent opacity-70" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0d1017]/90 backdrop-blur-md rounded-xl border border-[#242b3b]">
                <div className="text-[11px] uppercase tracking-wider text-[#ff3b30] font-bold">
                  In-House Kit Room Station
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Commercial pneumatic heat-press set at 160°C for permanent bond.
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            {/* Unboxed kicker without pill badge */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff3b30] uppercase tracking-wider">
              <span>The Curva Standard</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Authenticity Protocol</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight text-balance">
              Every badge stitched with pride. Every name pressed with precision.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We source directly from official club suppliers, verified private collectors, and European brand archives. 
              Our London and Milan kit rooms utilize licensed league vinyl typography sheets identical to the ones used 
              in the matchday tunnel.
            </p>

            {/* Quality Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#141824] rounded-xl border border-[#222b3b] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Original Relics</span>
                </div>
                <p className="text-xs text-slate-400">
                  Every 90s and 2000s shirt is authenticated by our archivists via manufacturer codes, neck tags, and embroidery density.
                </p>
              </div>

              <div className="p-4 bg-[#141824] rounded-xl border border-[#222b3b] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Stamp className="w-4 h-4 text-[#ff3b30]" />
                  <span>Official Tournament Emblems</span>
                </div>
                <p className="text-xs text-slate-400">
                  From Champions League Starballs to World Champions Gold crests, all badges are authentic flock or silicone transfer.
                </p>
              </div>

              <div className="p-4 bg-[#141824] rounded-xl border border-[#222b3b] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <RefreshCw className="w-4 h-4 text-blue-400" />
                  <span>30-Day Hassle-Free Returns</span>
                </div>
                <p className="text-xs text-slate-400">
                  If the fit isn’t perfect, exchange your unworn plain shirt within 30 days worldwide with free returns.
                </p>
              </div>

              <div className="p-4 bg-[#141824] rounded-xl border border-[#222b3b] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Matchday Dispatch</span>
                </div>
                <p className="text-xs text-slate-400">
                  All custom printed kits are completed and handed over to DHL Express couriers within 24–48 hours.
                </p>
              </div>
            </div>

            <div>
              <button
                onClick={onOpenCustomizer}
                className="px-5 py-3 text-xs font-semibold text-white bg-[#1a1f2c] hover:bg-[#252c3c] border border-[#2c3548] rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ff3b30]" />
                <span>Launch Kit Room Customizer</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
