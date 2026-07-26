import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CMSConfig, PageView, NewsArticle } from '../types';
import { INITIAL_PRODUCTS, INITIAL_NEWS, DEFAULT_CMS_CONFIG } from '../data/initialData';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';

interface StoreContextType {
  products: Product[];
  news: NewsArticle[];
  cmsConfig: CMSConfig;
  cart: CartItem[];
  activePage: PageView;
  selectedProductSlug: string;
  selectedCategory: string;
  language: 'ID' | 'EN';
  searchQuery: string;
  isSearchOpen: boolean;
  isCartOpen: boolean;
  isSkinQuizOpen: boolean;
  isPinModalOpen: boolean;
  isAdminAuthenticated: boolean;
  toastMessage: string | null;
  adminClicks: number;
  
  // Actions
  navigateTo: (page: PageView, productSlug?: string) => void;
  setSelectedCategory: (cat: string) => void;
  updateCMSConfig: (updater: (prev: CMSConfig) => CMSConfig) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setLanguage: (lang: 'ID' | 'EN') => void;
  setSearchQuery: (query: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSkinQuizOpen: (open: boolean) => void;
  setIsPinModalOpen: (open: boolean) => void;
  verifyAdminPin: (pin: string) => boolean;
  handleLogoClickAdmin: () => void;
  resetCMSAndProducts: () => void;
  showToast: (msg: string) => void;
  lockAdmin: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage if present
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('cleanza_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cmsConfig, setCmsConfig] = useState<CMSConfig>(() => {
    try {
      const saved = localStorage.getItem('cleanza_cms_config');
      return saved ? JSON.parse(saved) : DEFAULT_CMS_CONFIG;
    } catch {
      return DEFAULT_CMS_CONFIG;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cleanza_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [news] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('cleanza-cairan-pencuci-piring-jeruk-nipis-450ml');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [language, setLanguageState] = useState<'ID' | 'EN'>('ID');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSkinQuizOpen, setIsSkinQuizOpen] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [adminClicks, setAdminClicks] = useState<number>(0);

  // Sync to Firestore & local storage
  useEffect(() => {
    // 1. Subscribe to CMS Config document
    const cmsDocRef = doc(db, 'cmsConfig', 'defaultConfig');
    const unsubCms = onSnapshot(
      cmsDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as CMSConfig;
          setCmsConfig(data);
        } else {
          // Initialize in Firestore if empty
          setDoc(cmsDocRef, DEFAULT_CMS_CONFIG).catch((err) =>
            console.error('Failed to init Firestore CMS config', err)
          );
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'cmsConfig/defaultConfig');
      }
    );

    // 2. Subscribe to Products collection
    const productsColRef = collection(db, 'products');
    const unsubProducts = onSnapshot(
      productsColRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedProducts = snapshot.docs.map((docSnap) => docSnap.data() as Product);
          setProducts(loadedProducts);
        } else {
          // Seed initial products to Firestore
          INITIAL_PRODUCTS.forEach((prod) => {
            setDoc(doc(db, 'products', prod.id), prod).catch((err) =>
              console.error('Failed seeding product to Firestore', err)
            );
          });
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'products');
      }
    );

    return () => {
      unsubCms();
      unsubProducts();
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cleanza_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('cleanza_cms_config', JSON.stringify(cmsConfig));
    } catch (e) {
      console.error('Failed to save CMS config to localStorage', e);
    }
  }, [cmsConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('cleanza_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const verifyAdminPin = (inputPin: string): boolean => {
    // PIN admin = 357357 (Strictly kept in verification logic)
    if (inputPin.trim() === '357357') {
      setIsAdminAuthenticated(true);
      setActivePage('admin');
      showToast('Dashboard Admin Cleanza Terbuka!');
      return true;
    }
    return false;
  };

  const lockAdmin = () => {
    setIsAdminAuthenticated(false);
    setActivePage('home');
    showToast('Sesi Admin Ditutup.');
  };

  // Secret admin hotkey (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminAuthenticated) {
          setActivePage('admin');
        } else {
          setIsPinModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated]);

  const handleLogoClickAdmin = () => {
    if (isAdminAuthenticated) {
      setActivePage('admin');
      showToast('Welcome Admin Cleanza!');
    } else {
      setIsPinModalOpen(true);
    }
  };

  const navigateTo = (page: PageView, productSlug?: string) => {
    if (page === 'admin' && !isAdminAuthenticated) {
      setIsPinModalOpen(true);
      return;
    }
    setActivePage(page);
    if (productSlug) {
      setSelectedProductSlug(productSlug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateCMSConfig = (updater: (prev: CMSConfig) => CMSConfig) => {
    setCmsConfig((prev) => {
      const updated = updater(prev);
      setDoc(doc(db, 'cmsConfig', 'defaultConfig'), updated).catch((error) =>
        handleFirestoreError(error, OperationType.WRITE, 'cmsConfig/defaultConfig')
      );
      return updated;
    });
    showToast('Konfigurasi CMS Berhasil Diperbarui!');
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setDoc(doc(db, 'products', updatedProduct.id), updatedProduct).catch((error) =>
      handleFirestoreError(error, OperationType.WRITE, `products/${updatedProduct.id}`)
    );
    showToast(`Produk "${updatedProduct.name}" berhasil diperbarui!`);
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setDoc(doc(db, 'products', newProduct.id), newProduct).catch((error) =>
      handleFirestoreError(error, OperationType.WRITE, `products/${newProduct.id}`)
    );
    showToast(`Produk baru "${newProduct.name}" berhasil ditambahkan!`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    deleteDoc(doc(db, 'products', id)).catch((error) =>
      handleFirestoreError(error, OperationType.DELETE, `products/${id}`)
    );
    showToast('Produk berhasil dihapus!');
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`${product.name} dimasukkan ke keranjang!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Produk dihapus dari keranjang');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const setLanguage = (lang: 'ID' | 'EN') => {
    setLanguageState(lang);
    showToast(`Bahasa diubah ke ${lang === 'ID' ? 'Bahasa Indonesia' : 'English'}`);
  };

  const resetCMSAndProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    setCmsConfig(DEFAULT_CMS_CONFIG);
    localStorage.removeItem('cleanza_products');
    localStorage.removeItem('cleanza_cms_config');
    showToast('Data CMS & Katalog Cleanza telah direset!');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        news,
        cmsConfig,
        cart,
        activePage,
        selectedProductSlug,
        selectedCategory,
        language,
        searchQuery,
        isSearchOpen,
        isCartOpen,
        isSkinQuizOpen,
        isPinModalOpen,
        isAdminAuthenticated,
        toastMessage,
        adminClicks,
        navigateTo,
        setSelectedCategory,
        updateCMSConfig,
        updateProduct,
        addProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        setLanguage,
        setSearchQuery,
        setIsSearchOpen,
        setIsCartOpen,
        setIsSkinQuizOpen,
        setIsPinModalOpen,
        verifyAdminPin,
        handleLogoClickAdmin,
        resetCMSAndProducts,
        showToast,
        lockAdmin,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
