import React from 'react';
import { useStore } from '../context/StoreContext';
import { Leaf, ShieldCheck, Droplets, Zap } from 'lucide-react';

export const IngredientsPage: React.FC = () => {
  const { cmsConfig } = useStore();
  const { ingredientsPage } = cmsConfig;
  const ingredientsList = [
    {
      name: 'Ekstrak Jeruk Nipis Alami',
      category: 'Peluruh Lemak & Bau Amis',
      desc: 'Sari Jeruk Nipis kaya asam sitrat alami yang langsung memutus ikatan molekul minyak goreng, lemak daging, dan bau amis ikan.'
    },
    {
      name: 'Ekstrak Citrus Lemon Mediterania',
      category: 'Keharuman Segar Citrus (Coming Soon)',
      desc: 'Varian Lemon dengan aroma citrus segar membangkitkan kesegaran dapur dan memberikan kilau sempurna pada piring kaca & kristal.'
    },
    {
      name: 'Cleanza Ultra Degreaser™ Active',
      category: 'Busa Hemat & Cepat Bilas',
      desc: 'Formulasi surfaktan ramah lingkungan yang menghasilkan busa padat melimpah namun sangat mudah dibilas tanpa residu licin.'
    },
    {
      name: 'pH Balanced Hand Care Agent',
      category: 'Formula Lembut Di Tangan',
      desc: 'Dilengkapi pelembab yang menjaga kelembutan kulit tangan meski digunakan mencuci piring dan wajan berkali-kali setiap hari.'
    }
  ];

  return (
    <div className="bg-[#F2F9F3] min-h-screen py-12 text-[#1D241B]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#239B4C] mb-2 block">
          Keunggulan Formula Cleanza
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {ingredientsPage?.title || 'Bahan & Formula Unggulan Cleanza'}
        </h1>
        <p className="text-sm text-gray-600 font-light leading-relaxed max-w-2xl mb-10">
          {ingredientsPage?.description || 'Setiap tetes Cleanza diproduksi dengan konsentrat pembersih tinggi yang teruji higienis, aman untuk peralatan makan seluruh keluarga, dan lembut di tangan.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {ingredientsList.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#239B4C] bg-[#F2F9F3] px-2.5 py-1 rounded border border-[#239B4C]/20 inline-block">
                {item.category}
              </span>
              <h3 className="font-bold text-lg text-[#1D241B]">{item.name}</h3>
              <p className="text-xs text-gray-600 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
