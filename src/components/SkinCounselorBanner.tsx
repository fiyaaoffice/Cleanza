import React from 'react';
import { useStore } from '../context/StoreContext';
import { Droplets, Calculator, ChevronRight } from 'lucide-react';

export const SkinCounselorBanner: React.FC = () => {
  const { cmsConfig, setIsSkinQuizOpen } = useStore();
  const { skinCounselor } = cmsConfig;

  return (
    <section className="py-16 bg-[#122A19] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-[#165B2D] via-[#124222] to-[#0E3219] rounded-3xl p-8 sm:p-12 border border-[#239B4C]/40 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#239B4C]/20 rounded-full blur-3xl -z-0 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-[#239B4C] px-3 py-1 rounded-full text-[11px] font-bold text-[#FFD000] uppercase tracking-wider mb-4 border border-[#FFD000]/30">
              <span>Cleanza Kitchen Advisor</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              {skinCounselor.headline}
            </h2>

            <p className="text-sm text-gray-200 font-light leading-relaxed max-w-xl">
              {skinCounselor.subheadline}
            </p>
          </div>

          {/* Action Button */}
          <div className="relative z-10 shrink-0">
            <button
              onClick={() => setIsSkinQuizOpen(true)}
              className="bg-[#FFD000] hover:bg-white text-black px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition shadow-lg flex items-center space-x-2 group border border-black/10"
            >
              <Calculator className="w-4 h-4 text-black group-hover:rotate-12 transition duration-300" />
              <span>{skinCounselor.ctaText}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
