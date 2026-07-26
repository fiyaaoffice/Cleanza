import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { DEFAULT_CLEANZA_LOGO } from '../data/initialData';
import { Phone, Mail, MessageSquare, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { cmsConfig, navigateTo, setIsSkinQuizOpen } = useStore();
  const { contact } = cmsConfig;

  const [waInput, setWaInput] = useState('');
  const [waSubscribed, setWaSubscribed] = useState(false);

  const handleWaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waInput.trim()) {
      setWaSubscribed(true);
      setWaInput('');
    }
  };

  return (
    <footer className="bg-[#1D231B] text-[#E5E8E2] border-t border-[#2d382a] relative">
      {/* 1. WhatsApp Newsletter Top Banner */}
      <div className="bg-[#239B4C] text-white py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#165B2D] rounded-xl border border-[#FFD000]/40 shrink-0">
              <MessageSquare className="w-5 h-5 text-[#FFD000]" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">
                Dapatkan Penawaran Khusus Cleanza Rumah Tangga & Resto
              </h3>
              <p className="text-xs text-gray-100 font-light">
                Dapatkan promo eksklusif dan informasi harga spesial langsung di WhatsApp Anda.
              </p>
            </div>
          </div>

          {!waSubscribed ? (
            <form onSubmit={handleWaSubmit} className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="tel"
                placeholder="Nomor WhatsApp (+62...)"
                value={waInput}
                onChange={(e) => setWaInput(e.target.value)}
                className="bg-[#165B2D] text-white text-xs px-4 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:border-[#FFD000] w-full md:w-60 placeholder-gray-300"
                required
              />
              <button
                type="submit"
                className="bg-[#FFD000] text-black hover:bg-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition whitespace-nowrap shrink-0 shadow-md"
              >
                GABUNG WHATSAPP
              </button>
            </form>
          ) : (
            <div className="bg-[#165B2D] text-[#FFD000] text-xs font-bold px-4 py-2 rounded-lg flex items-center space-x-2 border border-[#FFD000]/40">
              <Check className="w-4 h-4" />
              <span>Terima kasih! Penawaran spesial telah dikirim ke WhatsApp Anda.</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Intro */}
          <div className="md:col-span-1">
            <div
              onClick={() => navigateTo('home')}
              className="cursor-pointer inline-flex items-center select-none group mb-4"
              title="Cleanza"
            >
              <img
                src={cmsConfig.logoUrl || DEFAULT_CLEANZA_LOGO}
                alt="Cleanza Brand Logo"
                className="h-12 w-auto max-w-[200px] object-contain transition group-hover:scale-105"
              />
            </div>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Cairan pencuci piring konsentrat tinggi dengan kesegaran Jeruk Nipis alami & varian Lemon. Meluruhkan minyak membandel dan bau amis seketika.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-xs space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[11px] border-b border-gray-700/50 pb-1">
              Navigasi
            </h4>
            <p>
              <button onClick={() => navigateTo('our-story')} className="hover:text-white transition">
                Tentang Cleanza
              </button>
            </p>
            <p>
              <button onClick={() => navigateTo('shop')} className="hover:text-white transition">
                Katalog Produk Cleanza
              </button>
            </p>
            <p>
              <button onClick={() => navigateTo('news')} className="hover:text-white transition">
                Tips Dapur & Berita
              </button>
            </p>
            <p>
              <button onClick={() => navigateTo('community')} className="hover:text-white transition">
                Cleanza Profesional (5L)
              </button>
            </p>
            <p>
              <button onClick={() => navigateTo('ingredients')} className="hover:text-white transition">
                Formula Cleanza
              </button>
            </p>
          </div>

          {/* Contact Information */}
          <div className="text-xs space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[11px] border-b border-gray-700/50 pb-1">
              Hubungi Kami
            </h4>
            <div className="flex items-center space-x-2 text-gray-300">
              <Phone className="w-4 h-4 text-[#239B4C] shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Call Center</p>
                <p className="font-medium text-white">{contact.callCenter}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Mail className="w-4 h-4 text-[#239B4C] shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Email</p>
                <p className="font-medium text-white">{contact.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <MessageSquare className="w-4 h-4 text-[#239B4C] shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase">WhatsApp</p>
                <p className="font-medium text-white">{contact.whatsapp}</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-xs space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[11px] border-b border-gray-700/50 pb-1">
              Media Sosial
            </h4>
            <p className="hover:text-white cursor-pointer transition">Instagram @cleanza.official</p>
            <p className="hover:text-white cursor-pointer transition">TikTok @cleanza_id</p>
            <p className="hover:text-white cursor-pointer transition">Facebook Cleanza Indonesia</p>
            <p className="hover:text-white cursor-pointer transition">YouTube Cleanza Care</p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-[#121611] py-4 px-4 border-t border-gray-800 text-[11px] text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © 2026 Cleanza Indonesia. All Rights Reserved.
          </div>
        </div>
      </div>

      {/* Floating Bottom-Left Green Badge */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsSkinQuizOpen(true)}
          className="bg-[#239B4C] hover:bg-[#165B2D] text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-white/20 hover:scale-105 transition duration-300"
        >
          <span>Kalkulator Dapur Cleanza</span>
        </button>
      </div>
    </footer>
  );
};
