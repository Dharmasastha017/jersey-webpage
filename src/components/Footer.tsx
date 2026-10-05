import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenSizeGuide: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide, onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#090b0f] text-slate-400 border-t border-[#1d222e] text-xs">
      {/* Upper Footer: Kit Care Guide & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="text-xl font-extrabold tracking-tight text-white font-display uppercase">
              <span>CURVA</span>
              <span className="text-[#ff3b30]">KITS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier digital archive and matchday store for authentic club kits, rare retro Grails, and bespoke heat-pressed squad printing.
            </p>
            <div className="text-[11px] text-slate-400">
              London · Milan · Tokyo · Buenos Aires
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Shirt Collections
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('All')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  2024/25 Season Home Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Retro Archive')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  90s & 2000s Retro Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('International')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  World Champions & National Teams
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Premier League')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Premier League Classics
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors cursor-pointer text-[#ff3b30]"
                >
                  Fit & Sizing Measurement Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Kit Care Guidelines (Beloved by shirt collectors) */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Collector Shirt Care Rules
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>· Always wash inside-out at 30°C / cold cycle</li>
              <li>· Never use fabric softener (protects heat transfers)</li>
              <li>· Air dry on a flat hanger; never machine tumble dry</li>
              <li>· Never iron directly over vinyl names or flock badges</li>
            </ul>
          </div>

          {/* Kit Room Dispatch Newsletter */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              The Vault Drop Alerts
            </div>
            <p className="text-xs text-slate-400">
              Receive notifications for rare deadstock restocks and new season player issue drops before public release.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#131720] border border-[#262f3f] focus:border-[#ff3b30] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-bold text-white bg-[#ff3b30] hover:bg-[#e03429] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>You are on the VIP Vault list.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Lower bar */}
        <div className="mt-12 pt-6 border-t border-[#1a1f2c] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Curva Kits Archive Ltd. All rights reserved. 
          </div>
          <div className="flex items-center gap-6">
            <span>Official Licensed Apparel</span>
            <span>Worldwide DHL Tracked Express</span>
            <span>Zero Slop Football Culture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
