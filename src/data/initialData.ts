import { Product, NewsArticle, CMSConfig } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'cleanza-jeruk-nipis-450ml',
    slug: 'cleanza-cairan-pencuci-piring-jeruk-nipis-450ml',
    name: 'Cleanza Cairan Pencuci Piring Jeruk Nipis 450ml',
    category: 'Kemasan Rumah Tangga',
    volume: '450ml',
    price: 11500,
    formattedPrice: 'Rp11.500',
    rating: 4.9,
    reviewsCount: 428,
    badge: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Cleanza cairan pencuci piring konsentrat tinggi dengan formula ekstra Jeruk Nipis. Mampu meluruhkan lemak membandel dan menghilangkan bau amis telur serta ikan secara instan, membuat piring dan gelas bersih mengkilap tanpa menyisakan residu licin.',
    howToUse: 'Tuangkan 1 sendok teh Cleanza ke dalam mangkuk berisi 1/2 gelas air. Remas spons hingga berbusa melimpah, lalu usapkan pada peralatan makan dan masak. Bilas hingga bersih sempurna.',
    ingredients: 'Sodium Lauryl Ether Sulfate, Linear Alkylbenzene Sulfonate, Real Lime Extract (Ekstrak Jeruk Nipis Alami), Anti-Bacterial Agent, Plant-Based Glycerin, Fragrance, Aqua.',
    benefits: [
      'Ekstra konsentrat: Hemat pemakaian, busa melimpah meluruhkan lemak dengan cepat',
      'Ekstrak Jeruk Nipis Alami yang ampuh meredam bau amis ikan, telur, dan bumbu pekat',
      'Lembut di kulit tangan dan bersertifikasi aman untuk perlengkapan makan keluarga',
      'Mudah dibilas tanpa meninggalkan lapisan licin atau aroma sabun yang menempel'
    ],
    claims: [
      'Kekuatan Ekstra Meluruhkan Lemak',
      'Ekstrak Alami Jeruk Nipis Fresh',
      'Lembut & Aman di Tangan'
    ],
    concern: 'Minyak Membandel',
    isFeatured: true
  },
  {
    id: 'cleanza-jeruk-nipis-1000ml',
    slug: 'cleanza-cairan-pencuci-piring-jeruk-nipis-1000ml',
    name: 'Cleanza Cairan Pencuci Piring Jeruk Nipis 1000ml (1 Liter)',
    category: 'Kemasan Rumah Tangga',
    volume: '1000ml',
    price: 22500,
    formattedPrice: 'Rp22.500',
    rating: 5.0,
    reviewsCount: 890,
    badge: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Kemasan Refill Pouch 1 Liter (1000ml) pilihan paling ekonomis untuk kebutuhan harian keluarga. Formula hemat konsentrat Jeruk Nipis berbusa tebal yang efektif membasmi kuman dan lemak peralatan dapur.',
    howToUse: 'Gunakan langsung atau tuangkan ke dalam botol dispenser Cleanza Anda. Cukup beberapa tetes untuk tumpukan piring kotor.',
    ingredients: 'Active Anionic Surfactants, Natural Citrus Aurantifolia (Lime) Juice Extract, Anti-grease Complex, Purified Water.',
    benefits: [
      'Kemasan isi ulang 1 Liter lebih hemat & ramah lingkungan',
      'Daya bersih 5x lebih cepat dibanding sabun cuci piring biasa',
      'Formula kesegaran alami Jeruk Nipis tahan lama'
    ],
    claims: [
      'Kemasan Hemat 1 Liter',
      'Formulasi Ultra Degreaser',
      'Busa Melimpah & Nyaman'
    ],
    concern: 'Lemak Dapur',
    isFeatured: true
  },
  {
    id: 'cleanza-profesional-jeruk-nipis-5000ml',
    slug: 'cleanza-profesional-cairan-pencuci-piring-jeruk-nipis-5000ml',
    name: 'Cleanza Profesional Jeruk Nipis 5000ml (5 Liter)',
    category: 'Cleanza Profesional',
    volume: '5000ml',
    price: 79000,
    formattedPrice: 'Rp79.000',
    rating: 4.9,
    reviewsCount: 312,
    badge: 'NEW PRODUCT',
    image: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Cleanza Profesional kemasan galon jerigen 5 Liter (5000ml) dirancang khusus untuk kebutuhan bisnis kuliner, restoran, katering, kafe, dan hotel. Memberikan efisiensi biaya tertinggi dengan kualitas kebersihan bersertifikat.',
    howToUse: 'Encerkan Cleanza Profesional dengan air sesuai skala kebutuhan cuci dapur komersial. 1 Jerigen dapat digunakan hingga ribuan piring.',
    ingredients: 'Concentrated Anionic & Non-ionic Surfactants, Industrial Grade Anti-Grease Solvents, Lime Essence, Water Softener, Antibacterial Agent.',
    benefits: [
      'Khusus segmen bisnis kuliner & dapur profesional (Resto, Catering, Hotel)',
      'Konsentrasi tinggi yang dapat diencerkan hingga rasio 1:5 dengan air',
      'Menghilangkan lemak minyak goreng dan bumbu rempah pekat secara masif'
    ],
    claims: [
      'Standard Higienis Restoran',
      'Jerigen 5 Liter Ekonomis',
      'Khusus Usaha Kuliner'
    ],
    concern: 'Usaha Resto',
    isFeatured: true
  },
  {
    id: 'cleanza-lemon-450ml',
    slug: 'cleanza-cairan-pencuci-piring-lemon-450ml',
    name: 'Cleanza Cairan Pencuci Piring Lemon 450ml [Coming Soon]',
    category: 'Varian Lemon',
    volume: '450ml',
    price: 12000,
    formattedPrice: 'Rp12.000',
    rating: 5.0,
    reviewsCount: 0,
    badge: 'COMING SOON',
    image: 'https://images.unsplash.com/photo-1534531141161-e41d133a8bfd?auto=format&fit=crop&q=80&w=800',
    description: 'Varian baru Cleanza Lemon dengan kesegaran ekstrak lemon Mediterania. Segera hadir untuk memberikan pilihan aroma citrus yang menyegarkan dan meluruhkan lemak minyak dengan bersih cemerlang.',
    howToUse: 'Dapatkan segera saat peluncuran resmi Cleanza Lemon.',
    ingredients: 'Aqua, Sodium Laureth Sulfate, Lemon Zest Natural Extract, Anti-bacterial Formula, Soft Touch Skin Care Component.',
    claims: [
      'Coming Soon Lemon Freshness',
      'Ekstra Power Degreaser',
      'Aroma Citrus Menyegarkan'
    ],
    concern: 'Bau Amis'
  },
  {
    id: 'cleanza-lemon-1000ml',
    slug: 'cleanza-cairan-pencuci-piring-lemon-1000ml',
    name: 'Cleanza Cairan Pencuci Piring Lemon 1000ml (1 Liter) [Coming Soon]',
    category: 'Varian Lemon',
    volume: '1000ml',
    price: 23000,
    formattedPrice: 'Rp23.000',
    rating: 5.0,
    reviewsCount: 0,
    badge: 'COMING SOON',
    image: 'https://images.unsplash.com/photo-1590502160462-231a478330d4?auto=format&fit=crop&q=80&w=800',
    description: 'Varian Cleanza Lemon kemasan hemat 1 Liter (1000ml). Segera hadir dalam kemasan pouch refill berkualitas.',
    howToUse: 'Segera hadir di toko resmi Cleanza.',
    ingredients: 'Pure Lemon Extract, Concentrated Surfactant Blend, Purified Water.',
    claims: [
      'Refill 1 Liter Lemon',
      'Aroma Segar Anti Bau Amis',
      'Coming Soon'
    ],
    concern: 'Bau Amis'
  },
  {
    id: 'cleanza-profesional-lemon-5000ml',
    slug: 'cleanza-profesional-cairan-pencuci-piring-lemon-5000ml',
    name: 'Cleanza Profesional Lemon 5000ml (5 Liter) [Coming Soon]',
    category: 'Cleanza Profesional',
    volume: '5000ml',
    price: 82000,
    formattedPrice: 'Rp82.000',
    rating: 5.0,
    reviewsCount: 0,
    badge: 'COMING SOON',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&q=80&w=800',
    description: 'Cleanza Profesional varian Lemon kemasan galon 5 Liter untuk kebutuhan bisnis kuliner dan dapur besar.',
    howToUse: 'Segera hadir untuk skala profesional dan bisnis Anda.',
    ingredients: 'Industrial Concentrated Lemon Degreaser, Active Surfactants.',
    claims: [
      'Cleanza Profesional 5L',
      'Aroma Lemon Menyegarkan',
      'Coming Soon'
    ],
    concern: 'Usaha Resto'
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Tips Efektif Hilangkan Lemak & Bau Amis Membandel pada Wadah Plastik',
    date: 'Mei 14, 2026',
    category: 'Tips Dapur',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Wadah plastik sering menyerap bau amis dan minyak bumbu. Simak trik mudah mencuci piring dengan Cleanza Jeruk Nipis.',
    content: 'Minyak gulai dan aroma amis ikan pada wadah makanan plastik sering sulit hilang. Dengan menggunakan Cleanza Jeruk Nipis konsentrat tinggi, lemak terangkat seketika tanpa perlu menggosok berulang kali.'
  },
  {
    id: 'news-2',
    title: 'Solusi Hemat Dapur Usaha Restoran: Mengapa Memilih Cleanza Profesional 5L?',
    date: 'April 20, 2026',
    category: 'Bisnis & Resto',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Pelajari bagaimana Cleanza Profesional Jerigen 5 Liter membantu efisiensi operasional dapur bisnis Anda.',
    content: 'Kecepatan dan kebersihan adalah kunci dapur bisnis kuliner. Cleanza Profesional 5000ml diformulasikan khusus agar mampu menangani ribuan peralatan makan dengan biaya per cuci yang sangat ekonomis.'
  },
  {
    id: 'news-3',
    title: 'Peluncuran Varian Baru: Cleanza Lemon Segera Hadir di Seluruh Indonesia',
    date: 'Maret 10, 2026',
    category: 'Inovasi Produk',
    image: 'https://images.unsplash.com/photo-1534531141161-e41d133a8bfd?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Cleanza siap menghadirkan kesegaran Lemon Mediterania dengan teknologi pembersih busa melimpah.',
    content: 'Menjawab permintaan konsumen, Cleanza mengumumkan ketersediaan varian Lemon dalam ukuran 450ml, 1000ml, dan 5000ml Cleanza Profesional.'
  }
];

export const DEFAULT_CLEANZA_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 120" width="300" height="120"><defs><linearGradient id="czGreenGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%232CA052" /><stop offset="50%" stop-color="%23239B4C" /><stop offset="100%" stop-color="%231C843F" /></linearGradient><linearGradient id="czYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FFE500" /><stop offset="100%" stop-color="%23FF9900" /></linearGradient></defs><path d="M 30,15 C 100,28 200,28 270,15 C 290,15 295,30 295,60 C 295,90 285,108 260,110 C 180,95 120,95 40,110 C 15,108 5,90 5,60 C 5,30 10,15 30,15 Z" fill="url(%23czGreenGrad)" /><g transform="translate(22, 68)"><text font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="52" fill="%23FFFFFF" letter-spacing="-1">Clean</text><text x="142" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="52" fill="%23FFD000" letter-spacing="-1">za</text></g><path d="M 35,74 Q 150,102 260,72 Q 150,92 35,74 Z" fill="%23FFFFFF" /><path d="M 190,105 Q 260,88 290,75 C 298,82 290,102 265,106 Z" fill="url(%23czYellowGrad)" /></svg>`;

export const DEFAULT_CMS_CONFIG: CMSConfig = {
  layoutMode: 'grid',
  logoUrl: DEFAULT_CLEANZA_LOGO,
  promoText: 'PROMO CLEANZA! Gratis Ongkir & Diskon Kebutuhan Dapur Rumah & Resto',
  promoTextId: 'PROMO CLEANZA! Gratis Ongkir & Diskon Kebutuhan Dapur Rumah & Resto',
  hero: {
    tagline: 'Bersih Mengkilap, Bebas Lemak & Bau Amis Seketika',
    subtext: 'Cleanza hadir dengan formulasi cairan pencuci piring konsentrat tinggi. Varian Jeruk Nipis segar dan Lemon coming soon dalam ukuran 450ml, 1000ml, hingga 5000ml Cleanza Profesional.',
    badgeText: 'FORMULA ULTRA DEGREASER - LEMBUT DI TANGAN',
    primaryCtaText: 'LIHAT PRODUK CLEANZA',
    secondaryCtaText: 'CLEANZA PROFESIONAL (5L)',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&q=80&w=1600'
  },
  ourStory: {
    headline: 'Keberkahan Kebersihan Dapur Keluarga & Usaha Anda',
    subheadline: 'Dibuat dari ekstrak bahan alami terpilih untuk memberikan hasil cuci paling higienis, hemat, dan nyaman digunakan setiap hari.',
    mediaUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1200',
    ctaText: 'PELAJARI FORMULA CLEANZA'
  },
  skinCounselor: {
    headline: 'Kalkulator Kebutuhan Cleanza Dapur Anda',
    subheadline: 'Hitung estimasi kebutuhan cairan pencuci piring harian untuk rumah tangga atau usaha kuliner Anda.',
    ctaText: 'HITUNG KEBUTUHAN CUCI'
  },
  contact: {
    callCenter: '+62 812 3456 7890',
    email: 'info@cleanza.co.id',
    whatsapp: '+62 812 3456 7890'
  },
  sections: [
    { id: 'hero', name: 'Hero Section', enabled: true, order: 1 },
    { id: 'categories', name: 'Category Showcase', enabled: true, order: 2 },
    { id: 'popular', name: 'Popular Product Spotlight', enabled: true, order: 3 },
    { id: 'ourStory', name: 'Our Story & Technology', enabled: true, order: 4 },
    { id: 'news', name: 'Kabar & Tips Cleanza', enabled: true, order: 5 }
  ]
};
