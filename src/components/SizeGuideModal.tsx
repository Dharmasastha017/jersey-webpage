import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, AlertCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  if (!isOpen) return null;

  const measurements = [
    { size: 'XS', chestCm: '84–89', chestIn: '33–35', lengthCm: '68', lengthIn: '26.8' },
    { size: 'S', chestCm: '90–95', chestIn: '35–37', lengthCm: '70', lengthIn: '27.5' },
    { size: 'M', chestCm: '96–101', chestIn: '38–40', lengthCm: '72', lengthIn: '28.3' },
    { size: 'L', chestCm: '102–107', chestIn: '41–43', lengthCm: '74', lengthIn: '29.1' },
    { size: 'XL', chestCm: '108–114', chestIn: '44–46', lengthCm: '76', lengthIn: '30.0' },
    { size: 'XXL', chestCm: '115–122', chestIn: '47–49', lengthCm: '78', lengthIn: '30.7' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#11141c] border border-[#262e3f] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#212735] flex items-center justify-between bg-[#0e1118]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#ff3b30]" />
            <h2 className="text-base font-bold text-white font-display uppercase tracking-tight">
              Football Jersey Fit & Size Guide
            </h2>
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
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Fit Cut Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#141824] rounded-xl border border-[#222a3a]">
              <div className="text-xs font-bold text-white font-display uppercase tracking-wide">
                Stadium Replica Fit
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Standard straight cut. Designed for fan comfort, casual streetwear styling, and matchday layering. True to regular size.
              </p>
            </div>

            <div className="p-4 bg-[#141824] rounded-xl border border-[#ff3b30]/30 relative">
              <div className="text-xs font-bold text-[#ff3b30] font-display uppercase tracking-wide flex items-center justify-between">
                <span>Player Issue (Authentic)</span>
                <span className="text-[10px] bg-[#ff3b30]/20 text-[#ff3b30] px-1.5 py-0.5 rounded">Pro Spec</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Athletic aerodynamic taper cut. Hugs chest and shoulders for optimal pitch aerodynamics. <strong className="text-white">Recommendation:</strong> Size up one size if you prefer a relaxed fit.
              </p>
            </div>
          </div>

          {/* Unit Toggle & Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Official Shirt Dimensions
              </div>

              {/* Unit switcher */}
              <div className="flex items-center bg-[#161a25] p-1 rounded-lg border border-[#252c3c] text-xs">
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 font-semibold rounded transition-colors cursor-pointer ${
                    unit === 'cm' ? 'bg-[#ff3b30] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Centimeters (CM)
                </button>
                <button
                  onClick={() => setUnit('inches')}
                  className={`px-3 py-1 font-semibold rounded transition-colors cursor-pointer ${
                    unit === 'inches' ? 'bg-[#ff3b30] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Inches (IN)
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-[#212737]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#151924] text-slate-300 font-semibold border-b border-[#212737]">
                  <tr>
                    <th className="py-2.5 px-4">Size</th>
                    <th className="py-2.5 px-4">Chest ({unit.toUpperCase()})</th>
                    <th className="py-2.5 px-4">Back Length ({unit.toUpperCase()})</th>
                    <th className="py-2.5 px-4">Recommended Body Build</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2433] text-slate-300 font-mono">
                  {measurements.map((m) => (
                    <tr key={m.size} className="hover:bg-[#141823] transition-colors">
                      <td className="py-2.5 px-4 font-bold text-white font-sans">{m.size}</td>
                      <td className="py-2.5 px-4 tabular-nums">
                        {unit === 'cm' ? m.chestCm : m.chestIn}
                      </td>
                      <td className="py-2.5 px-4 tabular-nums">
                        {unit === 'cm' ? m.lengthCm : m.lengthIn}
                      </td>
                      <td className="py-2.5 px-4 text-slate-400 font-sans text-[11px]">
                        {m.size === 'XS' || m.size === 'S'
                          ? 'Slim / Lean athletic frame'
                          : m.size === 'M' || m.size === 'L'
                          ? 'Standard / Athletic muscular'
                          : 'Broad / Relaxed streetwear drape'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Measuring Instructions */}
          <div className="p-3.5 bg-[#141823] rounded-xl border border-[#212736] text-xs text-slate-400 space-y-1">
            <div className="font-semibold text-white">How to measure accurately:</div>
            <p>
              Measure around the fullest part of your chest, keeping the tape horizontal under your arms. If your chest measurement falls between two sizes, choose the smaller size for a tight athletic fit or the larger size for a relaxed matchday fit.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
