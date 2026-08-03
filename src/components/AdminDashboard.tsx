import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductBadge, ProductCategory, NewsArticle } from '../types';
import { DEFAULT_CLEANZA_LOGO } from '../data/initialData';
import { compressImageFile } from '../utils/imageCompressor';
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
  FileImage,
  Search,
  Lock,
  CheckCircle2,
  Newspaper,
  Phone,
  Layers,
  Sparkles,
  Check,
  FolderPlus,
  Info
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    cmsConfig,
    updateCMSConfig,
    products,
    news,
    updateProduct,
    addProduct,
    deleteProduct,
    addNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
    navigateTo,
    resetCMSAndProducts,
    publishAllToCloud,
    clearCacheAndFetchFromCloud,
    lockAdmin
  } = useStore();

  const [isPublishing, setIsPublishing] = useState(false);
  const [isRefreshingCache, setIsRefreshingCache] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'overview' | 'branding' | 'descriptions' | 'hero' | 'categories' | 'products' | 'ourStory' | 'news' | 'contact' | 'sections'
  >('overview');

  // Search and Filter State for Products
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');

  // Local state for adding/editing product
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);

  // Local state for adding/editing news article
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [isAddingNewNews, setIsAddingNewNews] = useState(false);

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

  // New News Article Form State
  const [newNews, setNewNews] = useState<Partial<NewsArticle>>({
    title: '',
    category: 'Tips Dapur',
    date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Tips dan panduan praktis kebersihan dapur dengan Cleanza.',
    content: 'Tuliskan deskripsi lengkap dan panduan di sini...'
  });

  // Helper for file upload from device with automatic compression
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 900, 900, 0.75);
        if (compressed) {
          callback(compressed);
        }
      } catch (err) {
        console.error('File compression error:', err);
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result) callback(result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCategoryImgUpload = (catName: string, dataUrl: string) => {
    updateCMSConfig((prev) => ({
      ...prev,
      categoryImages: {
        ...(prev.categoryImages || {}),
        [catName]: dataUrl
      }
    }));
  };

  const handleNewsImgUpload = (articleId: string, dataUrl: string) => {
    updateCMSConfig((prev) => ({
      ...prev,
      newsImages: {
        ...(prev.newsImages || {}),
        [articleId]: dataUrl
      }
    }));
  };

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

  const handleSaveNewNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.title) return;

    const article: NewsArticle = {
      id: `news-${Date.now()}`,
      title: newNews.title,
      category: newNews.category || 'Tips Dapur',
      date: newNews.date || new Date().toLocaleDateString('id-ID'),
      image: newNews.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
      excerpt: newNews.excerpt || '',
      content: newNews.content || ''
    };

    addNewsArticle(article);
    setIsAddingNewNews(false);
  };

  const toggleSection = (id: string) => {
    updateCMSConfig((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    }));
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const menuItems = [
    { id: 'overview', label: 'Ringkasan & Stats', icon: Sparkles, badge: null },
    { id: 'branding', label: 'Logo, Favicon & Banner', icon: Globe, badge: 'Favicon' },
    { id: 'descriptions', label: 'Custom Deskripsi Teks', icon: Type, badge: 'Full Text' },
    { id: 'hero', label: 'Hero Banner Beranda', icon: Droplets, badge: 'Media' },
    { id: 'categories', label: 'Pilihan Kemasan', icon: Layers, badge: 'Card 1:1' },
    { id: 'products', label: 'Katalog Produk', icon: Package, badge: `${products.length}` },
    { id: 'ourStory', label: 'Our Story & Kualitas', icon: Type, badge: 'Teknologi' },
    { id: 'news', label: 'Kabar & Tips Cleanza', icon: Newspaper, badge: `${news.length}` },
    { id: 'contact', label: 'Kontak & Footer', icon: Phone, badge: 'Call Center' },
    { id: 'sections', label: 'Tata Letak Section', icon: Layout, badge: 'Visibility' }
  ] as const;

  return (
    <div className="bg-[#121711] min-h-screen text-white pb-20 font-sans selection:bg-[#239B4C] selection:text-white">
      {/* Top Admin Navigation Header */}
      <div className="bg-[#1A2219] border-b border-[#2E3B2B] sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigateTo('home')}
                className="p-2 bg-[#239B4C]/20 hover:bg-[#239B4C] text-white rounded-xl transition flex items-center space-x-1.5 text-xs font-bold border border-[#239B4C]/40"
              >
                <ArrowLeft className="w-4 h-4 text-[#FFD000]" />
                <span className="hidden sm:inline">Ke Live Website</span>
              </button>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                    Cleanza CMS Panel
                  </span>
                  <span className="bg-[#FFD000] text-black text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Dynamic Admin
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 hidden sm:block">
                  Kelola teks, gambar, produk, dan tampilan website Cleanza secara langsung.
                </p>
              </div>
            </div>

            <button
              onClick={lockAdmin}
              className="md:hidden p-2 bg-red-900/30 text-red-300 rounded-lg text-xs font-bold border border-red-700/40"
              title="Kunci Akses Admin"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={async () => {
                setIsPublishing(true);
                await publishAllToCloud();
                setIsPublishing(false);
              }}
              disabled={isPublishing || isRefreshingCache}
              className="bg-[#239B4C] hover:bg-[#1C843F] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border border-[#FFD000]/40 shadow-lg disabled:opacity-50"
              title="Publish & Sync semua perubahan ke Cloud Firestore agar dapat dilihat di perangkat teman / perangkat lain"
            >
              <UploadCloud className={`w-4 h-4 text-[#FFD000] ${isPublishing ? 'animate-bounce' : ''}`} />
              <span>{isPublishing ? 'Memproses Sync...' : 'Publish Ke Cloud'}</span>
            </button>

            <button
              onClick={async () => {
                setIsRefreshingCache(true);
                await clearCacheAndFetchFromCloud();
                setIsRefreshingCache(false);
              }}
              disabled={isRefreshingCache || isPublishing}
              className="bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border border-blue-400/40 shadow-lg disabled:opacity-50"
              title="Hapus cache browser lokal & ambil data terbaru dari Cloud Firestore"
            >
              <RotateCcw className={`w-3.5 h-3.5 text-blue-200 ${isRefreshingCache ? 'animate-spin' : ''}`} />
              <span>{isRefreshingCache ? 'Refetch Cloud...' : 'Clear Cache & Refresh'}</span>
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="bg-gray-800 hover:bg-gray-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border border-gray-600 shadow-md"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Pratinjau Website</span>
            </button>
            <button
              onClick={resetCMSAndProducts}
              className="bg-red-950/50 hover:bg-red-800 text-red-200 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border border-red-800/60"
              title="Reset semua data ke konfigurasi awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Default</span>
            </button>
            <button
              onClick={lockAdmin}
              className="hidden md:flex bg-[#2E3B2B] hover:bg-red-900/60 text-gray-300 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition items-center space-x-1 border border-gray-700"
              title="Kunci Panel Admin"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Kunci</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Menu Navigation */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-[#192118] p-3.5 rounded-2xl border border-[#2E3B2B] shadow-lg sticky top-20">
              <p className="text-[10px] font-bold text-[#FFD000] uppercase tracking-wider px-3 mb-2">
                Kategori Kustomisasi
              </p>
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const IconComp = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as typeof activeTab)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                        isActive
                          ? 'bg-[#239B4C] text-white border border-[#FFD000]/40 shadow-md translate-x-1'
                          : 'text-gray-300 hover:bg-[#253023] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FFD000]' : 'text-[#239B4C]'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold shrink-0 ${
                            isActive ? 'bg-[#FFD000] text-black' : 'bg-[#253023] text-gray-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Dynamic Panel Body */}
          <div className="lg:col-span-9 space-y-6">
            {/* TAB 1: OVERVIEW DASHBOARD */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-gradient-to-r from-[#192118] to-[#1F2C1E] p-6 rounded-2xl border border-[#2E3B2B] shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#FFD000]" />
                        <span>Selamat Datang di Admin Panel Cleanza</span>
                      </h2>
                      <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
                        Pusat kendali CMS serbaguna. Ubah teks pengumuman, logo brand, background video/gambar hero banner, gambar kategori 1:1, katalog produk, dan artikel berita dengan pembaruan seketika.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick System Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#192118] p-5 rounded-2xl border border-[#2E3B2B] flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 font-semibold">Total Produk Cleanza</p>
                      <h3 className="text-2xl font-black text-[#FFD000] mt-1">{products.length} Items</h3>
                      <p className="text-[10px] text-gray-400 mt-1">Kemasan Rumah Tangga & 5L</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#239B4C]/20 border border-[#239B4C]/40 flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#239B4C]" />
                    </div>
                  </div>

                  <div className="bg-[#192118] p-5 rounded-2xl border border-[#2E3B2B] flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 font-semibold">Artikel Kabar & Tips</p>
                      <h3 className="text-2xl font-black text-white mt-1">{news.length} Artikel</h3>
                      <p className="text-[10px] text-gray-400 mt-1">Tips Kebersihan Dapur</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#FFD000]/20 border border-[#FFD000]/40 flex items-center justify-center">
                      <Newspaper className="w-6 h-6 text-[#FFD000]" />
                    </div>
                  </div>

                  <div className="bg-[#192118] p-5 rounded-2xl border border-[#2E3B2B] flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 font-semibold">Section Aktif Beranda</p>
                      <h3 className="text-2xl font-black text-[#239B4C] mt-1">
                        {cmsConfig.sections.filter((s) => s.enabled).length} / {cmsConfig.sections.length} Active
                      </h3>
                      <p className="text-[10px] text-gray-400 mt-1">Sesuai Toggle Visibilitas</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#239B4C]/20 border border-[#239B4C]/40 flex items-center justify-center">
                      <Layout className="w-6 h-6 text-[#239B4C]" />
                    </div>
                  </div>
                </div>

                {/* Quick Navigation Action Cards */}
                <div className="bg-[#192118] p-6 rounded-2xl border border-[#2E3B2B] space-y-4">
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#239B4C]" />
                    <span>Aksi Cepat Kustomisasi Website Cleanza</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      onClick={() => setActiveTab('branding')}
                      className="p-4 bg-[#141A13] hover:bg-[#253023] rounded-xl border border-[#2E3B2B] text-left transition space-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white group-hover:text-[#FFD000]">
                          1. Ubah Logo Brand & Ticker Promo
                        </span>
                        <Globe className="w-4 h-4 text-[#239B4C]" />
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Upload file logo brand Cleanza dari device dan sesuaikan running text pengumuman di bagian paling atas website.
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab('categories')}
                      className="p-4 bg-[#141A13] hover:bg-[#253023] rounded-xl border border-[#2E3B2B] text-left transition space-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white group-hover:text-[#FFD000]">
                          2. Upload Gambar Kategori (1:1 Square)
                        </span>
                        <ImageIcon className="w-4 h-4 text-[#239B4C]" />
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Upload gambar sampul kategori (Rumah Tangga, Profesional, Varian Lemon) langsung dengan format rasio 1:1 presisi.
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab('products')}
                      className="p-4 bg-[#141A13] hover:bg-[#253023] rounded-xl border border-[#2E3B2B] text-left transition space-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white group-hover:text-[#FFD000]">
                          3. Tambah atau Edit Katalog Produk
                        </span>
                        <Package className="w-4 h-4 text-[#239B4C]" />
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Kelola varian ukuran (450ml, 1000ml, 5000ml), harga, deskripsi, serta foto kemasan produk Cleanza.
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab('hero')}
                      className="p-4 bg-[#141A13] hover:bg-[#253023] rounded-xl border border-[#2E3B2B] text-left transition space-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white group-hover:text-[#FFD000]">
                          4. Ganti Background Hero Video / Image
                        </span>
                        <Video className="w-4 h-4 text-[#239B4C]" />
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Upload video MP4 atau gambar latar belakang hero banner beranda beserta judul utama tagline.
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: BRANDING & ANNOUNCEMENT BAR */}
            {activeTab === 'branding' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Logo Upload Card */}
                <div className="bg-[#192118] rounded-2xl p-6 border-2 border-[#239B4C]/50 shadow-xl space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <FileImage className="w-5 h-5 text-[#FFD000]" />
                      <span>Logo Utama Brand Cleanza</span>
                    </h3>
                    <span className="bg-[#239B4C]/20 text-[#FFD000] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border border-[#239B4C]/40">
                      Header & Footer Logo
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Upload gambar logo brand Cleanza dari komputer atau ponsel Anda. Gambar ini akan tampil di bagian Header dan Footer seluruh halaman website.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#141A13] p-5 rounded-xl border border-[#2E3B2B]">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 mb-2">Pratinjau Logo Aktif:</p>
                      <div className="bg-[#1D241B] p-4 rounded-xl border border-[#3E4E3B] flex items-center justify-center min-h-[100px]">
                        <img
                          src={cmsConfig.logoUrl || DEFAULT_CLEANZA_LOGO}
                          alt="Current Brand Logo"
                          className="h-12 w-auto max-w-[240px] object-contain"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-gray-300">Pilih File Logo dari Device Anda:</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="cursor-pointer bg-[#239B4C] hover:bg-[#165B2D] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-md">
                          <UploadCloud className="w-4 h-4 text-[#FFD000]" />
                          <span>Upload File Logo</span>
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
                          className="bg-[#2E3B2B] hover:bg-gray-700 text-gray-300 hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold transition"
                        >
                          Reset Logo Default
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Format disarankan: PNG Transparan atau SVG (Maksimal 5MB).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Favicon Upload Card */}
                <div className="bg-[#192118] rounded-2xl p-6 border-2 border-[#239B4C]/50 shadow-xl space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#FFD000]" />
                      <span>Favicon Website (Ikon Tab Browser)</span>
                    </h3>
                    <span className="bg-[#FFD000]/20 text-[#FFD000] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border border-[#FFD000]/40">
                      Browser Favicon
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Upload file favicon kustom (PNG, SVG, ICO) dari perangkat Anda. Favicon ini akan tampil langsung pada tab browser saat dibuka di semua perangkat teman atau pelanggan Anda.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#141A13] p-5 rounded-xl border border-[#2E3B2B]">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 mb-2">Pratinjau Favicon Aktif:</p>
                      <div className="bg-[#1D241B] p-4 rounded-xl border border-[#3E4E3B] flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-white p-1.5 flex items-center justify-center border border-gray-300 shrink-0 shadow">
                          <img
                            src={cmsConfig.faviconUrl || cmsConfig.logoUrl || DEFAULT_CLEANZA_LOGO}
                            alt="Favicon Preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Tab Browser Cleanza</p>
                          <p className="text-[10px] text-gray-400 truncate max-w-[180px]">
                            {cmsConfig.faviconUrl ? 'Favicon Kustom Aktif' : 'Default Logo Favicon'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-gray-300">Pilih File Favicon dari Perangkat Anda:</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="cursor-pointer bg-[#239B4C] hover:bg-[#165B2D] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-md">
                          <UploadCloud className="w-4 h-4 text-[#FFD000]" />
                          <span>Upload File Favicon</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, (dataUrl) =>
                                updateCMSConfig((prev) => ({ ...prev, faviconUrl: dataUrl }))
                              )
                            }
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() =>
                            updateCMSConfig((prev) => ({ ...prev, faviconUrl: DEFAULT_CLEANZA_LOGO }))
                          }
                          className="bg-[#2E3B2B] hover:bg-gray-700 text-gray-300 hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold transition"
                        >
                          Reset Favicon
                        </button>
                      </div>

                      <div className="mt-2">
                        <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                          Atau URL Gambar Favicon Langsung:
                        </label>
                        <input
                          type="url"
                          value={cmsConfig.faviconUrl || ''}
                          onChange={(e) =>
                            updateCMSConfig((prev) => ({ ...prev, faviconUrl: e.target.value }))
                          }
                          placeholder="https://example.com/favicon.png"
                          className="w-full bg-[#1D241B] border border-[#3E4E3B] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#239B4C]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Announcement Bar Promo Ticker */}
                <div className="bg-[#192118] rounded-2xl p-6 border border-[#2E3B2B] space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#239B4C]" />
                    <span>Top Announcement Ticker Bar (Teks Promo Atas)</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Teks pengumuman berjalan di bilah teratas seluruh halaman website.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Pengumuman Teks (Bahasa Indonesia)
                      </label>
                      <input
                        type="text"
                        value={cmsConfig.promoTextId}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMSConfig((prev) => ({ ...prev, promoTextId: val, promoText: val }));
                        }}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#239B4C]"
                        placeholder="Contoh: PROMO CLEANZA! Gratis Ongkir & Diskon Kebutuhan Dapur..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Announcement Text (English Version)
                      </label>
                      <input
                        type="text"
                        value={cmsConfig.promoText}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMSConfig((prev) => ({ ...prev, promoText: val }));
                        }}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#239B4C]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CUSTOM DESKRIPSI TEKS HALAMAN */}
            {activeTab === 'descriptions' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-[#192118] rounded-2xl p-6 border-2 border-[#239B4C]/50 shadow-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Type className="w-5 h-5 text-[#FFD000]" />
                      <span>Custom Teks & Deskripsi Seluruh Halaman Website</span>
                    </h3>
                    <span className="bg-[#239B4C]/20 text-[#FFD000] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border border-[#239B4C]/40">
                      Pusat Pengaturan Deskripsi
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Ubah seluruh teks judul, subjudul, dan deskripsi penjelasan di semua halaman website Cleanza secara terpusat. Perubahan langsung tersimpan dan disinkronkan ke seluruh perangkat pelanggan.
                  </p>
                </div>

                {/* 1. Hero Section Texts */}
                <div className="bg-[#192118] rounded-2xl p-6 border border-[#2E3B2B] space-y-4">
                  <h4 className="text-sm font-bold text-[#FFD000] uppercase tracking-wider border-b border-[#2E3B2B] pb-2">
                    1. Teks Hero Banner (Beranda Utama)
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Judul Utama Tagline Hero
                      </label>
                      <input
                        type="text"
                        value={cmsConfig.hero.tagline}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMSConfig((prev) => ({ ...prev, hero: { ...prev.hero, tagline: val } }));
                        }}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#239B4C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Deskripsi / Subteks Penjelas Hero
                      </label>
                      <textarea
                        rows={2}
                        value={cmsConfig.hero.subtext}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMSConfig((prev) => ({ ...prev, hero: { ...prev.hero, subtext: val } }));
                        }}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#239B4C]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Pilihan Kemasan & Unggulan */}
                <div className="bg-[#192118] rounded-2xl p-6 border border-[#2E3B2B] space-y-4">
                  <h4 className="text-sm font-bold text-[#FFD000] uppercase tracking-wider border-b border-[#2E3B2B] pb-2">
                    2. Section Pilihan Kemasan & Produk Unggulan
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3 bg-[#141A13] p-4 rounded-xl border border-[#2E3B2B]">
                      <h5 className="text-xs font-bold text-[#239B4C] uppercase">Category Showcase</h5>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Judul Section Kemasan</label>
                        <input
                          type="text"
                          value={cmsConfig.categoryShowcase?.headline || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCMSConfig((prev) => ({
                              ...prev,
                              categoryShowcase: { ...(prev.categoryShowcase || { headline: '', description: '' }), headline: val }
                            }));
                          }}
                          className="w-full bg-[#1D241B] border border-[#3E4E3B] rounded-lg p-2.5 text-xs text-white"
                          placeholder="Pilihan Kemasan Cleanza Pencuci Piring"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Deskripsi Section Kemasan</label>
                        <textarea
                          rows={2}
                          value={cmsConfig.categoryShowcase?.description || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCMSConfig((prev) => ({
                              ...prev,
                              categoryShowcase: { ...(prev.categoryShowcase || { headline: '', description: '' }), description: val }
                            }));
                          }}
                          className="w-full bg-[#1D241B] border border-[#3E4E3B] rounded-lg p-2.5 text-xs text-white"
                          placeholder="Tersedia ukuran konsumsi harian keluarga hingga ukuran ekonomis 5000ml..."
                        />
                      </div>
                    </div>

                    <div className="space-y-3 bg-[#141A13] p-4 rounded-xl border border-[#2E3B2B]">
                      <h5 className="text-xs font-bold text-[#239B4C] uppercase">Popular Showcase</h5>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Judul Section Produk Unggulan</label>
                        <input
                          type="text"
                          value={cmsConfig.popularSection?.headline || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCMSConfig((prev) => ({
                              ...prev,
                              popularSection: { ...(prev.popularSection || { headline: '', description: '' }), headline: val }
                            }));
                          }}
                          className="w-full bg-[#1D241B] border border-[#3E4E3B] rounded-lg p-2.5 text-xs text-white"
                          placeholder="Produk Unggulan Cleanza"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Deskripsi Section Unggulan</label>
                        <textarea
                          rows={2}
                          value={cmsConfig.popularSection?.description || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCMSConfig((prev) => ({
                              ...prev,
                              popularSection: { ...(prev.popularSection || { headline: '', description: '' }), description: val }
                            }));
                          }}
                          className="w-full bg-[#1D241B] border border-[#3E4E3B] rounded-lg p-2.5 text-xs text-white"
                          placeholder="Kemasan terfavorit dengan daya bersih ekstra meluruhkan lemak membandel."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Our Story & Paragraphs */}
                <div className="bg-[#192118] rounded-2xl p-6 border border-[#2E3B2B] space-y-4">
                  <h4 className="text-sm font-bold text-[#FFD000] uppercase tracking-wider border-b border-[#2E3B2B] pb-2">
                    3. Deskripsi Halaman "Our Story & Tentang Cleanza"
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Judul Utama Story</label>
                      <input
                        type="text"
                        value={cmsConfig.ourStory.headline}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMSConfig((prev) => ({ ...prev, ourStory: { ...prev.ourStory, headline: val } }));
                        }}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Paragraf 1 Story</label>
                      <textarea
                        rows={3}
                        value={cmsConfig.ourStory.paragraph1 || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMSConfig((prev) => ({ ...prev, ourStory: { ...prev.ourStory, paragraph1: val } }));
                        }}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white"
                        placeholder="Cleanza adalah brand cairan pencuci piring modern..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Paragraf 2 Story</label>
                      <textarea
                        rows={3}
                        value={cmsConfig.ourStory.paragraph2 || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMSConfig((prev) => ({ ...prev, ourStory: { ...prev.ourStory, paragraph2: val } }));
                        }}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white"
                        placeholder="Dengan filosofi 'Bersih Maksimal, Lembut Di Tangan'..."
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Page Specific Header Descriptions */}
                <div className="bg-[#192118] rounded-2xl p-6 border border-[#2E3B2B] space-y-4">
                  <h4 className="text-sm font-bold text-[#FFD000] uppercase tracking-wider border-b border-[#2E3B2B] pb-2">
                    4. Teks & Deskripsi Header Halaman Lainnya
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Shop All Page */}
                    <div className="bg-[#141A13] p-4 rounded-xl border border-[#2E3B2B] space-y-2">
                      <h5 className="text-xs font-bold text-white uppercase">Halaman Katalog Shop</h5>
                      <div>
                        <label className="block text-[10px] text-gray-400">Judul Katalog</label>
                        <input
                          type="text"
                          value={cmsConfig.shopPage?.title || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCMSConfig((prev) => ({
                              ...prev,
                              shopPage: { ...(prev.shopPage || { title: '', description: '' }), title: val }
                            }));
                          }}
                          className="w-full bg-[#1D241B] border border-[#3E4E3B] rounded-lg p-2 text-xs text-white"
                          placeholder="Cairan Pencuci Piring Cleanza"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400">Deskripsi Katalog</label>
                        <textarea
                          rows={2}
                          value={cmsConfig.shopPage?.description || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCMSConfig((prev) => ({
                              ...prev,
                              shopPage: { ...(prev.shopPage || { title: '', description: '' }), description: val }
                            }));
                          }}
                          className="w-full bg-[#1D241B] border border-[#3E4E3B] rounded-lg p-2 text-xs text-white"
                          placeholder="Temukan varian kemasan rumah tangga..."
                        />
                      </div>
                    </div>

                    {/* Ingredients Page */}
                    <div className="bg-[#141A13] p-4 rounded-xl border border-[#2E3B2B] space-y-2">
                      <h5 className="text-xs font-bold text-white uppercase">Halaman Formula</h5>
                      <div>
                        <label className="block text-[10px] text-gray-400">Judul Halaman Formula</label>
                        <input
                          type="text"
                          value={cmsConfig.ingredientsPage?.title || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCMSConfig((prev) => ({
                              ...prev,
                              ingredientsPage: { ...(prev.ingredientsPage || { title: '', description: '' }), title: val }
                            }));
                          }}
                          className="w-full bg-[#1D241B] border border-[#3E4E3B] rounded-lg p-2 text-xs text-white"
                          placeholder="Bahan & Formula Unggulan Cleanza"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400">Deskripsi Formula</label>
                        <textarea
                          rows={2}
                          value={cmsConfig.ingredientsPage?.description || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCMSConfig((prev) => ({
                              ...prev,
                              ingredientsPage: { ...(prev.ingredientsPage || { title: '', description: '' }), description: val }
                            }));
                          }}
                          className="w-full bg-[#1D241B] border border-[#3E4E3B] rounded-lg p-2 text-xs text-white"
                          placeholder="Setiap tetes Cleanza diproduksi dengan konsentrat..."
                        />
                      </div>
                    </div>

                    {/* Community / Professional 5L */}
                    <div className="bg-[#141A13] p-4 rounded-xl border border-[#2E3B2B] space-y-2">
                      <h5 className="text-xs font-bold text-white uppercase">Cleanza 5L Resto</h5>
                      <div>
                        <label className="block text-[10px] text-gray-400">Judul Mitra 5L</label>
                        <input
                          type="text"
                          value={cmsConfig.communityPage?.title || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCMSConfig((prev) => ({
                              ...prev,
                              communityPage: { ...(prev.communityPage || { title: '', description: '' }), title: val }
                            }));
                          }}
                          className="w-full bg-[#1D241B] border border-[#3E4E3B] rounded-lg p-2 text-xs text-white"
                          placeholder="Mitra Kebersihan Usaha Kuliner & Restoran"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400">Deskripsi Mitra 5L</label>
                        <textarea
                          rows={2}
                          value={cmsConfig.communityPage?.description || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCMSConfig((prev) => ({
                              ...prev,
                              communityPage: { ...(prev.communityPage || { title: '', description: '' }), description: val }
                            }));
                          }}
                          className="w-full bg-[#1D241B] border border-[#3E4E3B] rounded-lg p-2 text-xs text-white"
                          placeholder="Solusi ekonomis pencuci piring jeriken 5000ml..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Footer & Contact Description */}
                <div className="bg-[#192118] rounded-2xl p-6 border border-[#2E3B2B] space-y-4">
                  <h4 className="text-sm font-bold text-[#FFD000] uppercase tracking-wider border-b border-[#2E3B2B] pb-2">
                    5. Deskripsi Footer & Informasi Hak Cipta
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Deskripsi Singkat Footer</label>
                      <textarea
                        rows={3}
                        value={cmsConfig.contact.footerDescription || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMSConfig((prev) => ({ ...prev, contact: { ...prev.contact, footerDescription: val } }));
                        }}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white"
                        placeholder="Cairan pencuci piring konsentrat tinggi dengan kesegaran Jeruk Nipis..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Teks Hak Cipta / Copyright</label>
                      <input
                        type="text"
                        value={cmsConfig.contact.copyright || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMSConfig((prev) => ({ ...prev, contact: { ...prev.contact, copyright: val } }));
                        }}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white mb-2"
                        placeholder="© 2026 Cleanza Indonesia. All Rights Reserved."
                      />
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Alamat Kantor / Pabrik</label>
                      <input
                        type="text"
                        value={cmsConfig.contact.address || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMSConfig((prev) => ({ ...prev, contact: { ...prev.contact, address: val } }));
                        }}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white"
                        placeholder="Jl. Kebersihan Raya No. 88, Jakarta..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: HERO BANNER SECTION */}
            {activeTab === 'hero' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-[#192118] rounded-2xl p-6 border border-[#2E3B2B] space-y-5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-[#239B4C]" />
                    <span>Teks & Konten Hero Banner Beranda</span>
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Judul Utama / Tagline
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
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#239B4C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Subjudul / Deskripsi Pendukung
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
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#239B4C]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          Badge Teks Melayang
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
                          className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          Tombol Utama (CTA 1)
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
                          className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          Tombol Kedua (CTA 2)
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
                          className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Hero Media */}
                <div className="bg-[#192118] rounded-2xl p-6 border border-[#2E3B2B] space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Video className="w-5 h-5 text-[#239B4C]" />
                    <span>Latar Belakang Hero (Gambar / Video)</span>
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-300 mb-2">Tipe Media Latar Belakang:</p>
                      <div className="flex space-x-6">
                        <label className="inline-flex items-center space-x-2 cursor-pointer text-xs font-bold text-white">
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
                            className="text-[#239B4C] focus:ring-[#239B4C]"
                          />
                          <span>Background Gambar</span>
                        </label>
                        <label className="inline-flex items-center space-x-2 cursor-pointer text-xs font-bold text-white">
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
                            className="text-[#239B4C] focus:ring-[#239B4C]"
                          />
                          <span>Background Video (MP4)</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 bg-[#141A13] p-4 rounded-xl border border-[#2E3B2B]">
                      <div className="w-32 h-20 rounded-lg overflow-hidden bg-black shrink-0 relative">
                        {cmsConfig.hero.mediaType === 'video' ? (
                          <video src={cmsConfig.hero.mediaUrl} className="w-full h-full object-cover" autoPlay loop muted />
                        ) : (
                          <img src={cmsConfig.hero.mediaUrl} alt="Hero" className="w-full h-full object-cover" />
                        )}
                      </div>

                      <div className="flex-1 w-full space-y-2">
                        <p className="text-xs font-semibold text-gray-300">Upload Media Hero dari Perangkat Anda:</p>
                        <label className="cursor-pointer bg-[#239B4C] hover:bg-[#165B2D] text-white px-4 py-2 rounded-xl text-xs font-bold transition inline-flex items-center space-x-2">
                          <Upload className="w-4 h-4 text-[#FFD000]" />
                          <span>Pilih File Gambar / Video Hero</span>
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
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CATEGORY SHOWCASE MANAGEMENT */}
            {activeTab === 'categories' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-[#192118] rounded-2xl p-6 border-2 border-[#239B4C]/50 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-[#239B4C]" />
                        <span>Pilihan Kemasan Cleanza Pencuci Piring (Custom Deskripsi & Gambar)</span>
                      </h3>
                      <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                        Kelola judul section, gambar sampul (rasio 1:1), serta tambah dan ubah deskripsi penjelasan untuk setiap varian kemasan pencuci piring.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newCatItem = {
                          id: `cat-${Date.now()}`,
                          name: 'Varian Kemasan Baru',
                          titleIndo: 'Deskripsi penjelasan varian kemasan Cleanza baru...',
                          image: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&q=80&w=600',
                          count: 'Produk Baru'
                        };
                        const currentItems = cmsConfig.categoryShowcase?.items && cmsConfig.categoryShowcase.items.length > 0
                          ? cmsConfig.categoryShowcase.items
                          : [
                              {
                                id: 'cat-1',
                                name: 'Kemasan Rumah Tangga',
                                titleIndo: 'Refill 450ml & Botol 1000ml - Solusi praktis cuci piring harian keluarga dengan formula ekstrak jeruk nipis alami yang lembut di tangan.',
                                image: cmsConfig.categoryImages?.['Kemasan Rumah Tangga'] || 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&q=80&w=600',
                                count: '2 Produk'
                              },
                              {
                                id: 'cat-2',
                                name: 'Cleanza Profesional',
                                titleIndo: 'Jeriken 5000ml (5 Liter) - Pilihan hemat resto & katering berdaya angkat lemak pekat instan untuk usaha kuliner.',
                                image: cmsConfig.categoryImages?.['Cleanza Profesional'] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
                                count: '1 Produk'
                              },
                              {
                                id: 'cat-3',
                                name: 'Varian Lemon',
                                titleIndo: 'Ekstra Citrus Lemon - Keharuman lemon segar mediterania pembasmi bau amis ikan & minyak membandel.',
                                image: cmsConfig.categoryImages?.['Varian Lemon'] || 'https://images.unsplash.com/photo-1534531141161-e41d133a4be3?auto=format&fit=crop&q=80&w=600',
                                count: 'Coming Soon'
                              }
                            ];
                        updateCMSConfig((prev) => ({
                          ...prev,
                          categoryShowcase: {
                            headline: prev.categoryShowcase?.headline || 'Pilihan Kemasan Cleanza Pencuci Piring',
                            description: prev.categoryShowcase?.description || 'Tersedia ukuran konsumsi harian keluarga hingga ukuran ekonomis 5000ml untuk usaha kuliner.',
                            items: [...currentItems, newCatItem]
                          }
                        }));
                      }}
                      className="bg-[#239B4C] hover:bg-[#165B2D] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition flex items-center space-x-2 shrink-0 border border-[#FFD000]/30"
                    >
                      <Plus className="w-4 h-4 text-[#FFD000]" />
                      <span>+ Tambah Kemasan Baru</span>
                    </button>
                  </div>

                  {/* Section Title & Subtitle */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#141A13] p-4 rounded-xl border border-[#2E3B2B]">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Judul Utama Section Kemasan
                      </label>
                      <input
                        type="text"
                        value={cmsConfig.categoryShowcase?.headline || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMSConfig((prev) => ({
                            ...prev,
                            categoryShowcase: {
                              ...(prev.categoryShowcase || { headline: '', description: '' }),
                              headline: val
                            }
                          }));
                        }}
                        className="w-full bg-[#1D241B] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#239B4C]"
                        placeholder="Pilihan Kemasan Cleanza Pencuci Piring"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Deskripsi Singkat Section Kemasan
                      </label>
                      <input
                        type="text"
                        value={cmsConfig.categoryShowcase?.description || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMSConfig((prev) => ({
                            ...prev,
                            categoryShowcase: {
                              ...(prev.categoryShowcase || { headline: '', description: '' }),
                              description: val
                            }
                          }));
                        }}
                        className="w-full bg-[#1D241B] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#239B4C]"
                        placeholder="Tersedia ukuran konsumsi harian keluarga hingga ukuran ekonomis 5000ml..."
                      />
                    </div>
                  </div>
                </div>

                {/* Items Grid */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#FFD000] uppercase tracking-wider flex items-center justify-between border-b border-[#2E3B2B] pb-2">
                    <span>Daftar Kartu Kemasan ({ (cmsConfig.categoryShowcase?.items && cmsConfig.categoryShowcase.items.length > 0) ? cmsConfig.categoryShowcase.items.length : 3 } Kemasan)</span>
                    <span className="text-xs text-gray-400 font-normal">Edit gambar, nama, dan deskripsi penjelasan</span>
                  </h4>

                  {(() => {
                    const currentItems = (cmsConfig.categoryShowcase?.items && cmsConfig.categoryShowcase.items.length > 0)
                      ? cmsConfig.categoryShowcase.items
                      : [
                          {
                            id: 'cat-1',
                            name: 'Kemasan Rumah Tangga',
                            titleIndo: 'Refill 450ml & Botol 1000ml - Solusi praktis cuci piring harian keluarga dengan formula ekstrak jeruk nipis alami yang lembut di tangan.',
                            image: cmsConfig.categoryImages?.['Kemasan Rumah Tangga'] || 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&q=80&w=600',
                            count: '2 Produk'
                          },
                          {
                            id: 'cat-2',
                            name: 'Cleanza Profesional',
                            titleIndo: 'Jeriken 5000ml (5 Liter) - Pilihan hemat resto & katering berdaya angkat lemak pekat instan untuk usaha kuliner.',
                            image: cmsConfig.categoryImages?.['Cleanza Profesional'] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
                            count: '1 Produk'
                          },
                          {
                            id: 'cat-3',
                            name: 'Varian Lemon',
                            titleIndo: 'Ekstra Citrus Lemon - Keharuman lemon segar mediterania pembasmi bau amis ikan & minyak membandel.',
                            image: cmsConfig.categoryImages?.['Varian Lemon'] || 'https://images.unsplash.com/photo-1534531141161-e41d133a4be3?auto=format&fit=crop&q=80&w=600',
                            count: 'Coming Soon'
                          }
                        ];

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentItems.map((item, index) => (
                          <div
                            key={item.id || index}
                            className="bg-[#192118] p-5 rounded-2xl border border-[#2E3B2B] hover:border-[#239B4C] transition flex flex-col justify-between space-y-4 relative group"
                          >
                            {/* Top row image & delete button */}
                            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black border border-[#2E3B2B]">
                              <img
                                src={cmsConfig.categoryImages?.[item.name] || item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute top-2 left-2 bg-black/80 text-[#FFD000] text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {item.count || 'Produk'}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = currentItems.filter((_, i) => i !== index);
                                  updateCMSConfig((prev) => ({
                                    ...prev,
                                    categoryShowcase: {
                                      headline: prev.categoryShowcase?.headline || 'Pilihan Kemasan Cleanza Pencuci Piring',
                                      description: prev.categoryShowcase?.description || 'Tersedia ukuran konsumsi harian keluarga...',
                                      items: updated
                                    }
                                  }));
                                }}
                                className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-700 text-white p-1.5 rounded-lg text-xs transition"
                                title="Hapus Kemasan Ini"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                                  Nama Kemasan / Varian
                                </label>
                                <input
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const updated = [...currentItems];
                                    updated[index] = { ...updated[index], name: val };
                                    updateCMSConfig((prev) => ({
                                      ...prev,
                                      categoryShowcase: {
                                        headline: prev.categoryShowcase?.headline || 'Pilihan Kemasan Cleanza Pencuci Piring',
                                        description: prev.categoryShowcase?.description || '',
                                        items: updated
                                      }
                                    }));
                                  }}
                                  className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                                  Deskripsi Penjelas Kemasan (Bisa Dicustom & Ditambah)
                                </label>
                                <textarea
                                  rows={3}
                                  value={item.titleIndo}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const updated = [...currentItems];
                                    updated[index] = { ...updated[index], titleIndo: val };
                                    updateCMSConfig((prev) => ({
                                      ...prev,
                                      categoryShowcase: {
                                        headline: prev.categoryShowcase?.headline || 'Pilihan Kemasan Cleanza Pencuci Piring',
                                        description: prev.categoryShowcase?.description || '',
                                        items: updated
                                      }
                                    }));
                                  }}
                                  className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                                  placeholder="Tulis deskripsi rinci kemasan produk di sini..."
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                                  Badge Label Jumlah (misal: "2 Produk", "Jeriken 5L")
                                </label>
                                <input
                                  type="text"
                                  value={item.count || ''}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const updated = [...currentItems];
                                    updated[index] = { ...updated[index], count: val };
                                    updateCMSConfig((prev) => ({
                                      ...prev,
                                      categoryShowcase: {
                                        headline: prev.categoryShowcase?.headline || 'Pilihan Kemasan Cleanza Pencuci Piring',
                                        description: prev.categoryShowcase?.description || '',
                                        items: updated
                                      }
                                    }));
                                  }}
                                  className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                                />
                              </div>

                              <div>
                                <label className="cursor-pointer bg-[#239B4C] hover:bg-[#165B2D] text-white w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2">
                                  <Upload className="w-4 h-4 text-[#FFD000]" />
                                  <span>Upload Gambar 1:1</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleFileUpload(e, (dataUrl) => {
                                        handleCategoryImgUpload(item.name, dataUrl);
                                        const updated = [...currentItems];
                                        updated[index] = { ...updated[index], image: dataUrl };
                                        updateCMSConfig((prev) => ({
                                          ...prev,
                                          categoryShowcase: {
                                            headline: prev.categoryShowcase?.headline || 'Pilihan Kemasan Cleanza Pencuci Piring',
                                            description: prev.categoryShowcase?.description || '',
                                            items: updated
                                          }
                                        }));
                                      })
                                    }
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* TAB 5: PRODUCTS CATALOG MANAGEMENT */}
            {activeTab === 'products' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Header Actions & Filter */}
                <div className="bg-[#192118] p-5 rounded-2xl border border-[#2E3B2B] space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Package className="w-5 h-5 text-[#239B4C]" />
                        <span>Katalog Produk Cleanza ({products.length} Items)</span>
                      </h3>
                      <p className="text-xs text-gray-400">
                        Tambah varian produk baru, edit harga, badge, deskripsi, atau ubah gambar produk.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingNewProduct(true)}
                      className="bg-[#239B4C] hover:bg-[#1C843F] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition flex items-center space-x-2 border border-[#FFD000]/30 shrink-0"
                    >
                      <Plus className="w-4 h-4 text-[#FFD000]" />
                      <span>Tambah Produk Baru</span>
                    </button>
                  </div>

                  {/* Search and Category Filter */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        placeholder="Cari nama produk..."
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#239B4C]"
                      />
                    </div>
                    <div>
                      <select
                        value={productCategoryFilter}
                        onChange={(e) => setProductCategoryFilter(e.target.value)}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#239B4C]"
                      >
                        <option value="All">Semua Kategori Produk</option>
                        <option value="Kemasan Rumah Tangga">Kemasan Rumah Tangga</option>
                        <option value="Cleanza Profesional">Cleanza Profesional</option>
                        <option value="Varian Lemon">Varian Lemon</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Form to Add New Product */}
                {isAddingNewProduct && (
                  <form
                    onSubmit={handleSaveNewProduct}
                    className="bg-[#192118] p-6 rounded-2xl border-2 border-[#239B4C] space-y-4 animate-in zoom-in-95 shadow-2xl"
                  >
                    <div className="flex items-center justify-between border-b border-[#2E3B2B] pb-3">
                      <h4 className="font-bold text-sm text-[#FFD000] uppercase tracking-wider flex items-center gap-2">
                        <FolderPlus className="w-4 h-4" />
                        <span>Formulir Tambah Produk Cleanza Baru</span>
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
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Nama Produk
                        </label>
                        <input
                          type="text"
                          value={newProd.name}
                          onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                          required
                          placeholder="e.g. Cleanza Jeruk Nipis 450ml"
                          className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Kategori
                        </label>
                        <select
                          value={newProd.category}
                          onChange={(e) => setNewProd({ ...newProd, category: e.target.value as ProductCategory })}
                          className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                        >
                          <option value="Kemasan Rumah Tangga">Kemasan Rumah Tangga</option>
                          <option value="Cleanza Profesional">Cleanza Profesional</option>
                          <option value="Varian Lemon">Varian Lemon</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Harga (Rp)
                        </label>
                        <input
                          type="number"
                          value={newProd.price}
                          onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                          required
                          className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Ukuran / Volume
                        </label>
                        <input
                          type="text"
                          value={newProd.volume}
                          onChange={(e) => setNewProd({ ...newProd, volume: e.target.value })}
                          placeholder="e.g. 450ml / 1000ml / 5000ml"
                          className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Badge Label
                        </label>
                        <select
                          value={newProd.badge || ''}
                          onChange={(e) => setNewProd({ ...newProd, badge: (e.target.value as ProductBadge) || null })}
                          className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                        >
                          <option value="">Tidak ada Badge</option>
                          <option value="NEW PRODUCT">NEW PRODUCT</option>
                          <option value="BEST SELLER">BEST SELLER</option>
                          <option value="COMING SOON">COMING SOON</option>
                          <option value="LIMITED">LIMITED</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Upload Foto Kemasan Produk
                        </label>
                        <label className="cursor-pointer bg-[#239B4C] hover:bg-[#165B2D] text-white w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2">
                          <Upload className="w-3.5 h-3.5 text-[#FFD000]" />
                          <span>Pilih Foto dari Device</span>
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

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Deskripsi Singkat Produk
                      </label>
                      <textarea
                        rows={2}
                        value={newProd.description}
                        onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="submit"
                        className="bg-[#239B4C] hover:bg-[#165B2D] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-md border border-[#FFD000]/30"
                      >
                        Simpan Produk
                      </button>
                    </div>
                  </form>
                )}

                {/* Product List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-[#192118] p-4 rounded-xl border border-[#2E3B2B] flex items-center justify-between gap-4 hover:border-[#239B4C] transition"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-14 h-14 object-contain rounded-lg bg-[#141A13] p-1 shrink-0 border border-[#2E3B2B]"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-[#FFD000] uppercase block truncate">
                            {p.category} • {p.volume}
                          </span>
                          <h4 className="font-bold text-xs text-white truncate">
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
                          className="p-2 bg-white/10 hover:bg-[#239B4C] text-white rounded-lg text-xs transition"
                          title="Edit Detail Produk"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-2 bg-red-900/40 hover:bg-red-800 text-red-200 rounded-lg text-xs transition"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Edit Product Modal */}
                {editingProduct && (
                  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#192118] border-2 border-[#239B4C] p-6 rounded-2xl max-w-xl w-full space-y-4 max-h-[90vh] overflow-y-auto">
                      <div className="flex items-center justify-between border-b border-[#2E3B2B] pb-3">
                        <h4 className="font-bold text-sm text-[#FFD000] uppercase tracking-wider">
                          Edit Produk: {editingProduct.name}
                        </h4>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          Tutup
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Nama Produk</label>
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, name: e.target.value })
                          }
                          className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
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
                            className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
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
                            className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                          >
                            <option value="Kemasan Rumah Tangga">Kemasan Rumah Tangga</option>
                            <option value="Cleanza Profesional">Cleanza Profesional</option>
                            <option value="Varian Lemon">Varian Lemon</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-300 mb-1">Ukuran / Volume</label>
                          <input
                            type="text"
                            value={editingProduct.volume || ''}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, volume: e.target.value })
                            }
                            placeholder="e.g. 450ml"
                            className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-300 mb-1">Badge Label</label>
                          <select
                            value={editingProduct.badge || ''}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                badge: (e.target.value as ProductBadge) || null
                              })
                            }
                            className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                          >
                            <option value="">Tidak ada Badge</option>
                            <option value="NEW PRODUCT">NEW PRODUCT</option>
                            <option value="BEST SELLER">BEST SELLER</option>
                            <option value="COMING SOON">COMING SOON</option>
                            <option value="LIMITED">LIMITED</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Deskripsi Produk (Custom)</label>
                        <textarea
                          rows={4}
                          value={editingProduct.description || ''}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, description: e.target.value })
                          }
                          placeholder="Tuliskan deskripsi lengkap produk yang dapat dicustom..."
                          className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Upload Foto Kemasan Produk</label>
                        <div className="flex gap-3 items-center">
                          <img
                            src={editingProduct.image}
                            alt="Preview"
                            className="w-12 h-12 object-contain bg-[#141A13] p-1 rounded-xl border border-[#3E4E3B] shrink-0"
                          />
                          <label className="cursor-pointer bg-[#239B4C] hover:bg-[#165B2D] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2">
                            <Upload className="w-3.5 h-3.5 text-[#FFD000]" />
                            <span>Pilih Foto Baru dari Device</span>
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

                      <div className="flex justify-end space-x-2 pt-3 border-t border-[#2E3B2B]">
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="bg-gray-700 text-white px-4 py-2 rounded-xl text-xs"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            updateProduct(editingProduct);
                            setEditingProduct(null);
                          }}
                          className="bg-[#239B4C] hover:bg-[#165B2D] text-white font-bold px-5 py-2 rounded-xl text-xs border border-[#FFD000]/30"
                        >
                          Simpan Perubahan
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: OUR STORY & BRAND TECHNOLOGY */}
            {activeTab === 'ourStory' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-[#192118] rounded-2xl p-6 border border-[#2E3B2B] space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Type className="w-5 h-5 text-[#239B4C]" />
                    <span>Konten Section "Our Story & Cleanza Quality"</span>
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Judul Story
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
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Subjudul / Penjelasan Keunggulan Cleanza
                      </label>
                      <textarea
                        rows={3}
                        value={cmsConfig.ourStory.subheadline}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMSConfig((prev) => ({
                            ...prev,
                            ourStory: { ...prev.ourStory, subheadline: val }
                          }));
                        }}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#141A13] p-4 rounded-xl border border-[#2E3B2B]">
                      <div className="w-28 h-20 rounded-xl overflow-hidden bg-black shrink-0 relative">
                        <img src={cmsConfig.ourStory.mediaUrl} alt="Our Story" className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 w-full space-y-2">
                        <p className="text-xs font-semibold text-gray-300">Upload Gambar Story dari Device:</p>
                        <label className="cursor-pointer bg-[#239B4C] hover:bg-[#165B2D] text-white px-4 py-2 rounded-xl text-xs font-bold transition inline-flex items-center space-x-2">
                          <Upload className="w-4 h-4 text-[#FFD000]" />
                          <span>Pilih Gambar dari Device</span>
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
                </div>
              </div>
            )}

            {/* TAB 7: KABAR & TIPS NEWS ARTICLES */}
            {activeTab === 'news' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-[#192118] p-5 rounded-2xl border border-[#2E3B2B] flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Newspaper className="w-5 h-5 text-[#FFD000]" />
                      <span>Manajemen Artikel Kabar & Tips Cleanza ({news.length})</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Tambah, edit judul, ringkasan, atau upload gambar artikel tips kebersihan dapur.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddingNewNews(true)}
                    className="bg-[#239B4C] hover:bg-[#1C843F] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition flex items-center space-x-2 border border-[#FFD000]/30 shrink-0"
                  >
                    <Plus className="w-4 h-4 text-[#FFD000]" />
                    <span>Tambah Artikel Baru</span>
                  </button>
                </div>

                {/* Form to Add New Article */}
                {isAddingNewNews && (
                  <form
                    onSubmit={handleSaveNewNews}
                    className="bg-[#192118] p-6 rounded-2xl border-2 border-[#239B4C] space-y-4 animate-in zoom-in-95 shadow-xl"
                  >
                    <div className="flex items-center justify-between border-b border-[#2E3B2B] pb-3">
                      <h4 className="font-bold text-sm text-[#FFD000] uppercase tracking-wider">
                        Formulir Artikel Baru
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsAddingNewNews(false)}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        Batal
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Judul Artikel
                      </label>
                      <input
                        type="text"
                        value={newNews.title}
                        onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                        required
                        placeholder="Contoh: Tips Efektif Hilangkan Lemak Pada Wadah Plastik"
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Kategori</label>
                        <input
                          type="text"
                          value={newNews.category}
                          onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                          className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Upload Gambar Sampul</label>
                        <label className="cursor-pointer bg-[#239B4C] hover:bg-[#165B2D] text-white w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2">
                          <Upload className="w-3.5 h-3.5 text-[#FFD000]" />
                          <span>Pilih Gambar dari Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, (dataUrl) =>
                                setNewNews((prev) => ({ ...prev, image: dataUrl }))
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Ringkasan / Excerpt</label>
                      <textarea
                        rows={2}
                        value={newNews.excerpt}
                        onChange={(e) => setNewNews({ ...newNews, excerpt: e.target.value })}
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="bg-[#239B4C] hover:bg-[#165B2D] text-white font-bold text-xs uppercase px-6 py-2.5 rounded-xl shadow-md border border-[#FFD000]/30"
                      >
                        Simpan Artikel
                      </button>
                    </div>
                  </form>
                )}

                {/* News Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {news.map((item) => {
                    const currentImg = cmsConfig.newsImages?.[item.id] || item.image;
                    return (
                      <div key={item.id} className="bg-[#192118] p-4 rounded-xl border border-[#2E3B2B] flex flex-col justify-between space-y-3">
                        <div className="space-y-2">
                          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black relative border border-[#2E3B2B]">
                            <img src={currentImg} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px] font-bold text-[#FFD000] uppercase block">{item.category} • {item.date}</span>
                          <h4 className="font-bold text-xs text-white line-clamp-2">{item.title}</h4>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-[#2E3B2B]">
                          <label className="cursor-pointer bg-[#239B4C] hover:bg-[#165B2D] text-white w-full py-2 px-3 rounded-xl text-[11px] font-bold transition flex items-center justify-center space-x-1.5">
                            <Upload className="w-3.5 h-3.5 text-[#FFD000]" />
                            <span>Upload Gambar Artikel</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (dataUrl) =>
                                  handleNewsImgUpload(item.id, dataUrl)
                                )
                              }
                            />
                          </label>

                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingNews(item)}
                              className="flex-1 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => deleteNewsArticle(item.id)}
                              className="py-1.5 px-3 bg-red-900/40 hover:bg-red-800 text-red-200 rounded-lg text-xs font-semibold transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Edit News Article Modal */}
                {editingNews && (
                  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#192118] border-2 border-[#239B4C] p-6 rounded-2xl max-w-lg w-full space-y-4">
                      <div className="flex items-center justify-between border-b border-[#2E3B2B] pb-3">
                        <h4 className="font-bold text-sm text-[#FFD000] uppercase tracking-wider">
                          Edit Artikel Kebersihan
                        </h4>
                        <button
                          onClick={() => setEditingNews(null)}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          Tutup
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Judul Artikel</label>
                        <input
                          type="text"
                          value={editingNews.title}
                          onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                          className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Ringkasan</label>
                        <textarea
                          rows={2}
                          value={editingNews.excerpt}
                          onChange={(e) => setEditingNews({ ...editingNews, excerpt: e.target.value })}
                          className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>

                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingNews(null)}
                          className="bg-gray-700 text-white px-4 py-2 rounded-xl text-xs"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            updateNewsArticle(editingNews);
                            setEditingNews(null);
                          }}
                          className="bg-[#239B4C] hover:bg-[#165B2D] text-white font-bold px-5 py-2 rounded-xl text-xs"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 8: CONTACT & FOOTER */}
            {activeTab === 'contact' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-[#192118] rounded-2xl p-6 border border-[#2E3B2B] space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#239B4C]" />
                    <span>Informasi Kontak & Layanan Pelanggan Footer</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Nomor Call Center
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
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Alamat Email Layanan
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
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Nomor Official WhatsApp
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
                        className="w-full bg-[#141A13] border border-[#3E4E3B] rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 9: LAYOUT & VISIBILITY */}
            {activeTab === 'sections' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-[#192118] rounded-2xl p-6 border border-[#2E3B2B] space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layout className="w-5 h-5 text-[#239B4C]" />
                    <span>Visibilitas & Toggle Section Landing Page</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Aktifkan atau sembunyikan section tertentu dari beranda website secara instan.
                  </p>

                  <div className="space-y-3">
                    {cmsConfig.sections.map((sec) => (
                      <div
                        key={sec.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-[#141A13] border border-[#2E3B2B] hover:border-[#239B4C] transition"
                      >
                        <div>
                          <h4 className="font-bold text-xs text-white">{sec.name}</h4>
                          <p className="text-[10px] text-gray-400">Section ID: #{sec.id}</p>
                        </div>

                        <button
                          onClick={() => toggleSection(sec.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                            sec.enabled
                              ? 'bg-[#239B4C] text-[#FFD000] border border-[#FFD000]/30 shadow-md'
                              : 'bg-gray-800 text-gray-500'
                          }`}
                        >
                          <Check className={`w-3.5 h-3.5 ${sec.enabled ? 'opacity-100' : 'opacity-0'}`} />
                          <span>{sec.enabled ? 'TAMPIL (AKTIF)' : 'DISEMBUNYIKAN'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Default Catalog Layout Mode */}
                <div className="bg-[#192118] rounded-2xl p-6 border border-[#2E3B2B] space-y-3">
                  <h3 className="text-base font-bold text-white">Default Format Tampilan Katalog Produk</h3>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => updateCMSConfig((prev) => ({ ...prev, layoutMode: 'grid' }))}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition ${
                        cmsConfig.layoutMode === 'grid'
                          ? 'bg-[#239B4C] text-[#FFD000] border-[#FFD000]'
                          : 'bg-[#141A13] text-gray-400 border-gray-700'
                      }`}
                    >
                      Grid Layout Mode
                    </button>
                    <button
                      onClick={() => updateCMSConfig((prev) => ({ ...prev, layoutMode: 'list' }))}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition ${
                        cmsConfig.layoutMode === 'list'
                          ? 'bg-[#239B4C] text-[#FFD000] border-[#FFD000]'
                          : 'bg-[#141A13] text-gray-400 border-gray-700'
                      }`}
                    >
                      List Layout Mode
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
