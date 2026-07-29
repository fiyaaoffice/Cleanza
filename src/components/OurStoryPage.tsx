import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Leaf, Sparkles, ArrowRight, Droplets } from 'lucide-react';

export const OurStoryPage: React.FC = () => {
  const { navigateTo, cmsConfig } = useStore();
  const { ourStory } = cmsConfig;

  return (
    <div className="bg-[#F2F9F3] min-h-screen py-12 text-[#1D241B]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#239B4C] mb-2 block">
          Tentang Cleanza Indonesia
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1D241B] mb-6">
          {ourStory.headline || 'Solusi Pencuci Piring Bersih Alami & Bebas Bau Amis.'}
        </h1>

        <div className="aspect-video w-full rounded-3xl overflow-hidden mb-10 shadow-xl border border-gray-200">
          <img
            src={ourStory.mediaUrl || "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&q=80&w=1200"}
            alt="Cleanza Quality"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 font-light space-y-6 leading-relaxed mb-12">
          <p>
            {ourStory.paragraph1 || ourStory.subheadline || 'Cleanza adalah brand cairan pencuci piring modern yang diformulasikan khusus dengan daya angkat lemak pekat dan pembasmi bau amis instan. Menggunakan ekstrak Jeruk Nipis alami & varian Lemon Mediterania, Cleanza menghadirkan kebersihan higienis untuk piring, gelas, dan peralatan dapur Anda.'}
          </p>
          <p>
            {ourStory.paragraph2 || 'Dengan filosofi "Bersih Maksimal, Lembut Di Tangan", Cleanza menghadirkan varian kemasan praktis rumah tangga (450ml & 1000ml) serta kemasan jeriken ekonomis Cleanza Profesional (5000ml) khusus untuk restoran, katering, dan usaha kuliner.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-[#239B4C] mb-3" />
            <h3 className="font-bold text-base mb-1">Teruji Higienis & Anti-Bakteri</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Diformulasikan secara profesional untuk membasmi kuman dan bakteri pada peralatan makan.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <Leaf className="w-8 h-8 text-[#239B4C] mb-3" />
            <h3 className="font-bold text-base mb-1">Ekstrak Jeruk Nipis & Lemon Alami</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Bahan pembersih alami berdaya kerja tinggi yang meluruhkan minyak membandel dan bau amis seketika.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <Droplets className="w-8 h-8 text-[#239B4C] mb-3" />
            <h3 className="font-bold text-base mb-1">Cleanza Ultra Degreaser™</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Busa melimpah hemat air yang cepat dibilas tanpa meninggalkan residu licin atau berbau kimia.
            </p>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gray-200">
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#239B4C] hover:bg-[#165B2D] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg transition inline-flex items-center space-x-2"
          >
            <span>JELAJAHI KATALOG CLEANZA</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
