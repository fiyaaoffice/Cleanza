import React from 'react';
import { useStore } from '../context/StoreContext';
import { Building2, Utensils, Award, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="bg-[#F2F9F3] min-h-screen py-12 text-[#1D241B]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#239B4C] mb-2 block">
            Cleanza Profesional (5000ml / 5L)
          </span>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Mitra Kebersihan Usaha Kuliner & Restoran
          </h1>
          <p className="text-sm text-gray-600 font-light leading-relaxed">
            Solusi ekonomis pencuci piring jeriken 5000ml berdaya angkat minyak tinggi untuk katering, kafe, rumah makan, hotel, dan instansi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
            <Utensils className="w-8 h-8 text-[#239B4C] mx-auto mb-3" />
            <h3 className="font-bold text-base mb-1">Daya Peluruh Minyak Pekat</h3>
            <p className="text-xs text-gray-500 font-light">Meluruhkan bekas gulai, minyak goreng, dan panggangan usaha kuliner dengan cepat.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
            <Building2 className="w-8 h-8 text-[#239B4C] mx-auto mb-3" />
            <h3 className="font-bold text-base mb-1">Kemasan Jeriken 5 Liter Hemat</h3>
            <p className="text-xs text-gray-500 font-light">Harga eceran & grosir paling efisien untuk operasional harian dapur komersial.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
            <Award className="w-8 h-8 text-[#239B4C] mx-auto mb-3" />
            <h3 className="font-bold text-base mb-1">Kandungan Higienis Alami</h3>
            <p className="text-xs text-gray-500 font-light">Ekstrak Jeruk Nipis alami, tidak meninggalkan bau busa kimia pada piring pelanggan.</p>
          </div>
        </div>

        <div className="bg-[#0E2915] text-white rounded-3xl p-8 text-center max-w-2xl mx-auto border border-[#239B4C]/40 shadow-xl">
          <ShieldCheck className="w-10 h-10 text-[#FFD000] mx-auto mb-3" />
          <h3 className="text-2xl font-bold mb-2">Pesan Cleanza Profesional 5000ml</h3>
          <p className="text-xs text-gray-200 font-light mb-6">
            Dapatkan penawaran harga grosir khusus pengadaan restoran, katering, dan distributor daerah.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('shop')}
              className="bg-[#239B4C] hover:bg-[#165B2D] text-white hover:text-[#FFD000] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg inline-flex items-center space-x-2 transition shadow-md"
            >
              <span>PESAN CLEANZA 5L SEKARANG</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20Cleanza,%20saya%20tertarik%20pemesanan%20Cleanza%20Profesional%205L"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg inline-flex items-center space-x-2 border border-white/20 transition"
            >
              <PhoneCall className="w-4 h-4 text-[#FFD000]" />
              <span>KONSULTASI GROSIR WA</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
