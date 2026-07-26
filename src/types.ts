export type ProductCategory = 'Cairan Pencuci Piring' | 'Kemasan Rumah Tangga' | 'Cleanza Profesional' | 'Varian Lemon';

export type ProductBadge = 'NEW PRODUCT' | 'BEST SELLER' | 'COMING SOON' | null;

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  volume: string;
  price: number;
  formattedPrice: string;
  rating: number;
  reviewsCount: number;
  badge: ProductBadge;
  image: string;
  galleryImages?: string[];
  description: string;
  howToUse: string;
  ingredients: string;
  benefits?: string[];
  claims?: string[];
  concern?: string; // e.g. 'Minyak Membandel', 'Bau Amis', 'Lemak Dapur', 'Usaha Resto'
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  image: string;
  category: string;
  excerpt: string;
  content?: string;
}

export interface CMSSectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

export interface CMSConfig {
  layoutMode: 'grid' | 'list';
  logoUrl?: string;
  promoText: string;
  promoTextId: string;
  hero: {
    tagline: string;
    subtext: string;
    badgeText: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    mediaType: 'image' | 'video';
    mediaUrl: string;
  };
  ourStory: {
    headline: string;
    subheadline: string;
    mediaUrl: string;
    ctaText: string;
  };
  skinCounselor: {
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  contact: {
    callCenter: string;
    email: string;
    whatsapp: string;
  };
  sections: CMSSectionConfig[];
}

export type PageView = 'home' | 'shop' | 'product-detail' | 'our-story' | 'news' | 'community' | 'ingredients' | 'admin';
