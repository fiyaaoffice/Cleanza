import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductBadge, ProductCategory } from '../types';
import { DEFAULT_CLEANZA_LOGO } from '../data/initialData';
import {
  Layout,
  Type,
  Image as ImageIcon,
  Package,
  Eye,
  RotateCcw,
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
  Video,
  Globe,
  Droplets,
  Upload,
  UploadCloud,
  FileImage
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    cmsConfig,
    updateCMSConfig,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    navigateTo,
    resetCMSAndProducts
  } = useStore();

  const [activeTab, setActiveTab] = useState<'sections' | 'copywriting' | 'media' | 'products'>('media');

  // File Upload Helper to convert local device images to Data URLs
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          callback(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Local state for editing product
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);

  // New Product Form State
  const [newProd, setNewProd] = useState<Partial<Product>>({
    name: '',
    category: 'Kemasan Rumah Tangga',
    volume: '450ml',
    price: 12000,
    formattedPrice: 'Rp12.000',
    badge: 'NEW PRODUCT',
    image: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&q=80&w=800',
    description: 'Cairan pencuci piring Cleanza dengan ekstrak Jeruk Nipis alami.',
    howToUse: 'Tuangkan secukupnya pada spons basah, remas hingga berbusa, lalu usapkan pada piring.',
    ingredients: 'Ekstrak Jeruk Nipis Alami, Cleanza Ultra Degreaser Agent, Aqua.',
    rating: 5.0,
    reviewsCount: 25
  });

  const handleSaveNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name) return;

    const created: Product = {
      id: `prod-${Date.now()}`,
      slug: (newProd.name || 'product').toLowerCase().replace(/\s+/g, '-'),
      name: newProd.name || 'Produk Cleanza Baru',
      category: (newProd.category as ProductCategory) || 'Kemasan Rumah Tangga',
      volume: newProd.volume || '450ml',
      price: Number(newProd.price) || 12000,
      formattedPrice: `Rp${(Number(newProd.price) || 12000).toLocaleString('id-ID')}`,
      rating: newProd.rating || 5.0,
      reviewsCount: newProd.reviewsCount || 1,
      badge: (newProd.badge as ProductBadge) || null,
      image: newProd.image || 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&q=80&w=800',
      description: newProd.description || '',
      howToUse: newProd.howToUse || '',
      ingredients: newProd.ingredients || '',
      claims: ['Teruji Higienis', 'Ekstrak Alami', 'Busa Melimpah']
    };

    addProduct(created);
    setIsAddingNewProduct(false);
  };

  const toggleSection = (id: string) => {
    updateCMSConfig((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    }));
  };

  return (
    <div className="bg-[#151B14] min-h-screen text-white pb-20 font-sans">
      {/* Admin Top Header Bar */}
      <div className="bg-[#1F271D] border-b border-[#2E3B2B] sticky top-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateTo('home')}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition flex items-center space-x-1 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali ke Live Website</span>
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white">
                Cleanza Dynamic Live CMS
              </span>
              <span className="bg-[#A2DB38] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Admin Panel
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Perubahan di dashboard ini langsung ter-render secara dinamis di seluruh halaman website Cleanza.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigateTo('home')}
            className="bg-[#3d4d38] hover:bg-[#A2DB38] hover:text-black text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1 border border-[#A2DB38]/30"
          >
            <Eye className="w-4 h-4" />
            <span>Pratinjau Live Website</span>
          </button>
          <button
            onClick={resetCMSAndProducts}
            className="bg-red-900/40 hover:bg-red-800 text-red-200 px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1 border border-red-700/50"
            title="Reset semua perubahan ke data default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Default</span>
          </button>
        </div>
      </div>

      {/* Main Admin Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-[#2E3B2B] pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('copywriting')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'copywriting'
                ? 'bg-[#3d4d38] text-white border border-[#A2DB38]/50 shadow-lg'
                : 'bg-[#1F271D] text-gray-400 hover:text-white'
            }`}
          >
            <Type className="w-4 h-4 text-[#A2DB38]" />
            <span>Copywriting Manager (Teks)</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'media'
                ? 'bg-[#3d4d38] text-white border border-[#A2DB38]/50 shadow-lg'
                : 'bg-[#1F271D] text-gray-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#A2DB38]" />
            <span>Media & Video Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('sections')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'sections'
                ? 'bg-[#3d4d38] text-white border border-[#A2DB38]/50 shadow-lg'
                : 'bg-[#1F271D] text-gray-400 hover:text-white'
            }`}
          >
            <Layout className="w-4 h-4 text-[#A2DB38]" />
            <span>Layout & Visibility Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-[#3d4d38] text-white border border-[#A2DB38]/50 shadow-lg'
                : 'bg-[#1F271D] text-gray-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4 text-[#A2DB38]" />
            <span>Manajemen Produk & Katalog ({products.length})</span>
          </button>
        </div>

        {/* TAB 1: COPYWRITING MANAGER */}
        {activeTab === 'copywriting' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="bg-[#1F271D] rounded-2xl p-6 border border-[#2E3B2B]">
              <h3 className="text-lg font-bold text-white mb-1 flex items-center space-x-2">
                <Globe className="w-5 h-5 text-[#A2DB38]" />
                <span>1. Top Promo Ticker (Announcement Bar)</span>
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Teks berjalan di bagian paling atas seluruh halaman website.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Promo Text (Bahasa Indonesia)
                  </label>
                  <input
                    type="text"
                    value={cmsConfig.promoTextId}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCMSConfig((prev) => ({ ...prev, promoTextId: val }));
                    }}
                    className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Promo Text (English Version)
                  </label>
                  <input
                    type="text"
                    value={cmsConfig.promoText}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCMSConfig((prev) => ({ ...prev, promoText: val }));
                    }}
                    className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                  />
                </div>
              </div>
            </div>

            {/* Hero Copywriting */}
            <div className="bg-[#1F271D] rounded-2xl p-6 border border-[#2E3B2B]">
              <h3 className="text-lg font-bold text-white mb-1 flex items-center space-x-2">
                <Droplets className="w-5 h-5 text-[#A2DB38]" />
                <span>2. Landing Page Hero Banner Copywriting</span>
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Ubah judul utama, deskripsi, dan tombol aksi di halaman beranda.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Hero Main Tagline / Headline
                  </label>
                  <input
                    type="text"
                    value={cmsConfig.hero.tagline}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCMSConfig((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, tagline: val }
                      }));
                    }}
                    className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Hero Subtitle / Description
                  </label>
                  <textarea
                    rows={2}
                    value={cmsConfig.hero.subtext}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCMSConfig((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, subtext: val }
                      }));
                    }}
                    className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Floating Badge Text
                    </label>
                    <input
                      type="text"
                      value={cmsConfig.hero.badgeText}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMSConfig((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, badgeText: val }
                        }));
                      }}
                      className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Primary CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={cmsConfig.hero.primaryCtaText}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMSConfig((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, primaryCtaText: val }
                        }));
                      }}
                      className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Secondary CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={cmsConfig.hero.secondaryCtaText}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMSConfig((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, secondaryCtaText: val }
                        }));
                      }}
                      className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Our Story Copywriting */}
            <div className="bg-[#1F271D] rounded-2xl p-6 border border-[#2E3B2B]">
              <h3 className="text-lg font-bold text-white mb-1">
                3. Section "Our Story & Cleanza Quality"
              </h3>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Story Headline
                  </label>
                  <input
                    type="text"
                    value={cmsConfig.ourStory.headline}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCMSConfig((prev) => ({
                        ...prev,
                        ourStory: { ...prev.ourStory, headline: val }
                      }));
                    }}
                    className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Story Subheadline
                  </label>
                  <textarea
                    rows={2}
                    value={cmsConfig.ourStory.subheadline}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCMSConfig((prev) => ({
                        ...prev,
                        ourStory: { ...prev.ourStory, subheadline: val }
                      }));
                    }}
                    className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                  />
                </div>
              </div>
            </div>

            {/* Footer Contact Details */}
            <div className="bg-[#1F271D] rounded-2xl p-6 border border-[#2E3B2B]">
              <h3 className="text-lg font-bold text-white mb-1">
                4. Informasi Kontak Footer
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Call Center Phone Number
                  </label>
                  <input
                    type="text"
                    value={cmsConfig.contact.callCenter}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCMSConfig((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, callCenter: val }
                      }));
                    }}
                    className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Contact Email Address
                  </label>
                  <input
                    type="text"
                    value={cmsConfig.contact.email}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCMSConfig((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, email: val }
                      }));
                    }}
                    className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Official WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={cmsConfig.contact.whatsapp}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCMSConfig((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, whatsapp: val }
                      }));
                    }}
                    className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEDIA & VIDEO MANAGER */}
        {activeTab === 'media' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Website Brand Logo Upload Section */}
            <div className="bg-[#1F271D] rounded-2xl p-6 border-2 border-[#A2DB38]/50 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <FileImage className="w-5 h-5 text-[#A2DB38]" />
                  <span>1. Logo Website Brand (Gambar Tanpa Teks)</span>
                </h3>
                <span className="bg-[#A2DB38]/20 text-[#A2DB38] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border border-[#A2DB38]/40">
                  Brand Logo
                </span>
              </div>
              <p className="text-xs text-gray-300 mb-6">
                Upload file gambar logo brand Cleanza dari perangkat Anda. Website akan secara otomatis menampilkan gambar logo ini dan menghilangkan teks tulisan "Cleanza" di Header & Footer.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#151B14] p-5 rounded-xl border border-[#2E3B2B]">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Pratinjau Logo Brand Saat Ini:
                  </label>
                  <div className="bg-[#1D241B] p-4 rounded-xl border border-[#3E4E3B] flex items-center justify-center min-h-[90px]">
                    <img
                      src={cmsConfig.logoUrl || DEFAULT_CLEANZA_LOGO}
                      alt="Current Brand Logo"
                      className="h-12 w-auto max-w-[240px] object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-gray-300">
                    Pilih File Gambar Logo dari Device:
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="cursor-pointer bg-[#A2DB38] hover:bg-[#8ece28] text-black px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-md">
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload Logo dari Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (dataUrl) =>
                            updateCMSConfig((prev) => ({ ...prev, logoUrl: dataUrl }))
                          )
                        }
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        updateCMSConfig((prev) => ({ ...prev, logoUrl: DEFAULT_CLEANZA_LOGO }))
                      }
                      className="bg-[#2E3B2B] hover:bg-[#3d4d38] text-gray-300 hover:text-white px-3 py-2.5 rounded-xl text-xs font-medium transition"
                    >
                      Reset Logo Default
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Format disarankan: PNG, SVG, atau JPG transparan (Maks. 5MB).
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Background Media Manager */}
            <div className="bg-[#1F271D] rounded-2xl p-6 border border-[#2E3B2B]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
                <Video className="w-5 h-5 text-[#A2DB38]" />
                <span>2. Hero Background Media Manager</span>
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Atur URL gambar/video latar belakang atau upload file media langsung dari perangkat Anda.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Tipe Media Latar Belakang
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center space-x-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="mediaType"
                        checked={cmsConfig.hero.mediaType === 'image'}
                        onChange={() =>
                          updateCMSConfig((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, mediaType: 'image' }
                          }))
                        }
                        className="text-[#A2DB38] focus:ring-[#A2DB38]"
                      />
                      <span>Background Image</span>
                    </label>
                    <label className="inline-flex items-center space-x-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="mediaType"
                        checked={cmsConfig.hero.mediaType === 'video'}
                        onChange={() =>
                          updateCMSConfig((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, mediaType: 'video' }
                          }))
                        }
                        className="text-[#A2DB38] focus:ring-[#A2DB38]"
                      />
                      <span>Background Video (MP4)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Media Asset (URL atau Upload dari Perangkat)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={cmsConfig.hero.mediaUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMSConfig((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, mediaUrl: val }
                        }));
                      }}
                      placeholder="https://images.unsplash.com/... atau data:image/..."
                      className="flex-1 bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                    />
                    <label className="cursor-pointer bg-[#3d4d38] hover:bg-[#A2DB38] hover:text-black text-white px-4 py-3 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 shrink-0 border border-[#A2DB38]/30">
                      <Upload className="w-4 h-4" />
                      <span>Upload dari Device</span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (dataUrl) =>
                            updateCMSConfig((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, mediaUrl: dataUrl }
                            }))
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                {/* Live Preview of Media */}
                <div className="mt-4 p-4 rounded-xl bg-[#151B14] border border-gray-800">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Pratinjau Media Hero saat ini
                  </span>
                  <div className="aspect-video max-h-48 rounded-lg overflow-hidden relative bg-black">
                    {cmsConfig.hero.mediaType === 'video' ? (
                      <video src={cmsConfig.hero.mediaUrl} autoPlay loop muted className="w-full h-full object-cover" />
                    ) : (
                      <img src={cmsConfig.hero.mediaUrl} alt="Hero Media Preview" className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Our Story Banner Media */}
            <div className="bg-[#1F271D] rounded-2xl p-6 border border-[#2E3B2B]">
              <h3 className="text-lg font-bold text-white mb-2">
                3. Our Story Banner Image Asset
              </h3>
              <p className="text-xs text-gray-400 mb-3">
                Ubah gambar banner cerita Cleanza dengan memasukkan URL atau mengunggah langsung file dari perangkat Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={cmsConfig.ourStory.mediaUrl}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateCMSConfig((prev) => ({
                      ...prev,
                      ourStory: { ...prev.ourStory, mediaUrl: val }
                    }));
                  }}
                  className="flex-1 bg-[#151B14] border border-[#3E4E3B] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#A2DB38]"
                />
                <label className="cursor-pointer bg-[#3d4d38] hover:bg-[#A2DB38] hover:text-black text-white px-4 py-3 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 shrink-0 border border-[#A2DB38]/30">
                  <Upload className="w-4 h-4" />
                  <span>Upload dari Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(e, (dataUrl) =>
                        updateCMSConfig((prev) => ({
                          ...prev,
                          ourStory: { ...prev.ourStory, mediaUrl: dataUrl }
                        }))
                      )
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SECTIONS & VISIBILITY MANAGER */}
        {activeTab === 'sections' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-[#1F271D] rounded-2xl p-6 border border-[#2E3B2B]">
              <h3 className="text-lg font-bold text-white mb-1">
                Toggle Visibilitas Section Landing Page
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Aktifkan atau sembunyikan section tertentu dari halaman utama landing page secara instan.
              </p>

              <div className="space-y-3">
                {cmsConfig.sections.map((sec) => (
                  <div
                    key={sec.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-[#151B14] border border-[#2E3B2B] hover:border-[#3d4d38] transition"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-white">{sec.name}</h4>
                      <p className="text-[11px] text-gray-400">ID Section: #{sec.id}</p>
                    </div>

                    <button
                      onClick={() => toggleSection(sec.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-2 ${
                        sec.enabled
                          ? 'bg-[#3d4d38] text-[#A2DB38] border border-[#A2DB38]/30'
                          : 'bg-gray-800 text-gray-500'
                      }`}
                    >
                      <span>{sec.enabled ? 'TAMPIL (ACTIVE)' : 'DISEMBUNYIKAN'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Layout Mode Grid vs List */}
            <div className="bg-[#1F271D] rounded-2xl p-6 border border-[#2E3B2B]">
              <h3 className="text-lg font-bold text-white mb-1">
                Default Mode Tampilan Katalog Produk
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Pilih format tampilan default katalog di Shop All page.
              </p>

              <div className="flex space-x-4">
                <button
                  onClick={() =>
                    updateCMSConfig((prev) => ({ ...prev, layoutMode: 'grid' }))
                  }
                  className={`px-6 py-3 rounded-xl text-xs font-bold border transition ${
                    cmsConfig.layoutMode === 'grid'
                      ? 'bg-[#3d4d38] text-[#A2DB38] border-[#A2DB38]'
                      : 'bg-[#151B14] text-gray-400 border-gray-700'
                  }`}
                >
                  Grid Layout Mode
                </button>
                <button
                  onClick={() =>
                    updateCMSConfig((prev) => ({ ...prev, layoutMode: 'list' }))
                  }
                  className={`px-6 py-3 rounded-xl text-xs font-bold border transition ${
                    cmsConfig.layoutMode === 'list'
                      ? 'bg-[#3d4d38] text-[#A2DB38] border-[#A2DB38]'
                      : 'bg-[#151B14] text-gray-400 border-gray-700'
                  }`}
                >
                  List Layout Mode
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCT CATALOG CMS MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header with Add Product button */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Katalog Produk Cleanza ({products.length} Items)
                </h3>
                <p className="text-xs text-gray-400">
                  Tambah, edit harga, nama, kategori, atau hapus produk secara dinamis.
                </p>
              </div>

              <button
                onClick={() => setIsAddingNewProduct(true)}
                className="bg-[#A2DB38] hover:bg-[#8ece28] text-black font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Produk Baru</span>
              </button>
            </div>

            {/* Modal or Form to Add New Product */}
            {isAddingNewProduct && (
              <form
                onSubmit={handleSaveNewProduct}
                className="bg-[#1F271D] p-6 rounded-2xl border-2 border-[#A2DB38] space-y-4 animate-in zoom-in-95"
              >
                <div className="flex items-center justify-between border-b border-[#2E3B2B] pb-3">
                  <h4 className="font-bold text-base text-[#A2DB38] uppercase tracking-wider">
                    Formulir Tambah Produk Cleanza
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsAddingNewProduct(false)}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Batal
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Nama Produk
                    </label>
                    <input
                      type="text"
                      value={newProd.name}
                      onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                      required
                      placeholder="e.g. Cleanza Jeruk Nipis 450ml"
                      className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Kategori
                    </label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value as ProductCategory })}
                      className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-2.5 text-xs text-white"
                    >
                      <option value="Kemasan Rumah Tangga">Kemasan Rumah Tangga</option>
                      <option value="Cleanza Profesional">Cleanza Profesional</option>
                      <option value="Varian Lemon">Varian Lemon</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Harga (Rp)
                    </label>
                    <input
                      type="number"
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                      required
                      className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Ukuran / Volume
                    </label>
                    <input
                      type="text"
                      value={newProd.volume}
                      onChange={(e) => setNewProd({ ...newProd, volume: e.target.value })}
                      placeholder="e.g. 450ml / 1000ml / 5000ml"
                      className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Badge
                    </label>
                    <select
                      value={newProd.badge || ''}
                      onChange={(e) => setNewProd({ ...newProd, badge: (e.target.value as ProductBadge) || null })}
                      className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-2.5 text-xs text-white"
                    >
                      <option value="">Tidak ada Badge</option>
                      <option value="NEW PRODUCT">NEW PRODUCT</option>
                      <option value="BEST SELLER">BEST SELLER</option>
                      <option value="COMING SOON">COMING SOON</option>
                      <option value="LIMITED">LIMITED</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Gambar Produk (URL / Upload Device)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newProd.image}
                        onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                        placeholder="URL atau Upload dari Device"
                        className="flex-1 bg-[#151B14] border border-[#3E4E3B] rounded-lg p-2.5 text-xs text-white"
                      />
                      <label className="cursor-pointer bg-[#3d4d38] hover:bg-[#A2DB38] hover:text-black text-white px-3 py-2.5 rounded-lg text-xs font-bold transition flex items-center space-x-1 shrink-0 border border-[#A2DB38]/30">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (dataUrl) =>
                              setNewProd((prev) => ({ ...prev, image: dataUrl }))
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Deskripsi Singkat
                  </label>
                  <textarea
                    rows={2}
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    className="w-full bg-[#151B14] border border-[#3E4E3B] rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="submit"
                    className="bg-[#A2DB38] text-black font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-md"
                  >
                    Simpan Produk
                  </button>
                </div>
              </form>
            )}

            {/* List of Products for editing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#1F271D] p-4 rounded-xl border border-[#2E3B2B] flex items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-contain rounded-lg bg-[#151B14] p-1 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-[#A2DB38] uppercase">
                        {p.category} • {p.volume}
                      </span>
                      <h4 className="font-bold text-sm text-white line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-xs text-gray-300 font-semibold mt-0.5">
                        {p.formattedPrice}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs"
                      title="Edit Produk"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="p-2 bg-red-900/40 hover:bg-red-800 text-red-200 rounded-lg text-xs"
                      title="Hapus Produk"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Edit Modal */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#1F271D] border border-[#A2DB38]/50 p-6 rounded-2xl max-w-xl w-full space-y-4">
                  <h4 className="font-bold text-base text-[#A2DB38]">
                    Edit Produk: {editingProduct.name}
                  </h4>

                  <div>
                    <label className="block text-xs text-gray-300 mb-1">Nama Produk</label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                      className="w-full bg-[#151B14] border border-[#3E4E3B] rounded p-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Harga (Rp)</label>
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setEditingProduct({
                            ...editingProduct,
                            price: val,
                            formattedPrice: `Rp${val.toLocaleString('id-ID')}`
                          });
                        }}
                        className="w-full bg-[#151B14] border border-[#3E4E3B] rounded p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Kategori</label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            category: e.target.value as ProductCategory
                          })
                        }
                        className="w-full bg-[#151B14] border border-[#3E4E3B] rounded p-2 text-xs text-white"
                      >
                        <option value="Kemasan Rumah Tangga">Kemasan Rumah Tangga</option>
                        <option value="Cleanza Profesional">Cleanza Profesional</option>
                        <option value="Varian Lemon">Varian Lemon</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 mb-1">Badge</label>
                    <select
                      value={editingProduct.badge || ''}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          badge: (e.target.value as ProductBadge) || null
                        })
                      }
                      className="w-full bg-[#151B14] border border-[#3E4E3B] rounded p-2 text-xs text-white"
                    >
                      <option value="">Tidak ada Badge</option>
                      <option value="NEW PRODUCT">NEW PRODUCT</option>
                      <option value="BEST SELLER">BEST SELLER</option>
                      <option value="COMING SOON">COMING SOON</option>
                      <option value="LIMITED">LIMITED</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 mb-1">
                      Gambar Produk (URL / Upload Device)
                    </label>
                    <div className="flex gap-2 items-center">
                      <img
                        src={editingProduct.image}
                        alt="Preview"
                        className="w-9 h-9 object-contain bg-[#151B14] p-1 rounded border border-[#3E4E3B] shrink-0"
                      />
                      <input
                        type="text"
                        value={editingProduct.image}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, image: e.target.value })
                        }
                        className="flex-1 bg-[#151B14] border border-[#3E4E3B] rounded p-2 text-xs text-white"
                      />
                      <label className="cursor-pointer bg-[#3d4d38] hover:bg-[#A2DB38] hover:text-black text-white px-3 py-2 rounded text-xs font-bold transition flex items-center space-x-1 shrink-0 border border-[#A2DB38]/30">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (dataUrl) =>
                              setEditingProduct((prev) => (prev ? { ...prev, image: dataUrl } : null))
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="bg-gray-700 text-white px-4 py-2 rounded text-xs"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateProduct(editingProduct);
                        setEditingProduct(null);
                      }}
                      className="bg-[#A2DB38] text-black font-bold px-5 py-2 rounded text-xs"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
