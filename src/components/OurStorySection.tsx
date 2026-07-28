import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ShieldCheck, Leaf, Sparkles } from 'lucide-react';

export const OurStorySection: React.FC = () => {
  const { cmsConfig, navigateTo } = useStore();
  const { ourStory } = cmsConfig;

  return (
    <section className="py-20 bg-[#F2F9F3] border-b border-[#E5E8E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Text Content */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#239B4C] mb-2 block">
            Komitmen Kualitas Cleanza
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1D241B] tracking-tight leading-tight mb-4">
            {ourStory.headline}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed mb-8">
            {ourStory.subheadline}
          </p>
          <button
            onClick={() => navigateTo('our-story')}
            className="inline-flex items-center space-x-2 bg-[#239B4C] hover:bg-[#165B2D] text-white px-7 py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest transition shadow-md"
          >
            <span>{ourStory.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Media Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video max-h-[500px] border border-[#E5E8E2]">
          <img
            src={ourStory.mediaUrl}
            alt="Cleanza Quality Standard"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Overlay Features */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 text-white">
            <div className="max-w-lg">
              <span className="bg-[#239B4C] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-2 inline-block shadow">
                #CleanzaDapurBersih
              </span>
              <h3 className="text-2xl font-bold mb-1">
                Kebersihan Dapur Maksimal Tanpa Iritasi Tangan
              </h3>
              <p className="text-xs text-gray-300 font-light line-clamp-2">
                Diformulasikan khusus dengan busa melimpah, ekstrak Jeruk Nipis & Lemon segar yang meluruhkan minyak secara instan namun lembut di kulit.
              </p>
            </div>

            <div className="flex items-center space-x-6 text-xs text-gray-200">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#FFD000]" />
                <span>Teruji Higienis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-[#FFD000]" />
                <span>Ekstrak Jeruk Nipis Alami</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#FFD000]" />
                <span>Busa Hemat & Melimpah</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
