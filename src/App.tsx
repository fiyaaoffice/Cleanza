import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { PopularProductsCarousel } from './components/PopularProductsCarousel';
import { OurStorySection } from './components/OurStorySection';
import { NewsSection } from './components/NewsSection';
import { Footer } from './components/Footer';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ShopAllPage } from './components/ShopAllPage';
import { AdminDashboard } from './components/AdminDashboard';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { OurStoryPage } from './components/OurStoryPage';
import { NewsPage } from './components/NewsPage';
import { CommunityPage } from './components/CommunityPage';
import { IngredientsPage } from './components/IngredientsPage';
import { AdminPinModal } from './components/AdminPinModal';

const AppContent: React.FC = () => {
  const { activePage, cmsConfig, toastMessage } = useStore();

  // Helper map for dynamically rendering sections in CMS order
  const sectionComponentMap: Record<string, React.ReactNode> = {
    hero: <HeroSection key="hero" />,
    categories: <CategoryShowcase key="categories" />,
    popular: <PopularProductsCarousel key="popular" />,
    ourStory: <OurStorySection key="ourStory" />,
    news: <NewsSection key="news" />
  };

  if (activePage === 'admin') {
    return (
      <div className="min-h-screen bg-[#0E2915] text-white" style={{ zoom: '95%' }}>
        <AdminDashboard />
        <AdminPinModal />
        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#239B4C] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#FFD000] text-xs font-bold flex items-center space-x-2 animate-in slide-in-from-bottom-2">
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F9F3] flex flex-col justify-between text-[#1D241B] selection:bg-[#239B4C] selection:text-white" style={{ zoom: '95%' }}>
      <Navbar />

      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {activePage === 'home' && (
              <>
                {cmsConfig.sections
                  .filter((sec) => sec.enabled && sec.id !== 'skinCounselor')
                  .sort((a, b) => a.order - b.order)
                  .map((sec) => sectionComponentMap[sec.id] || null)}
              </>
            )}

            {activePage === 'shop' && <ShopAllPage />}
            {activePage === 'product-detail' && <ProductDetailPage />}
            {activePage === 'our-story' && <OurStoryPage />}
            {activePage === 'news' && <NewsPage />}
            {activePage === 'community' && <CommunityPage />}
            {activePage === 'ingredients' && <IngredientsPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Interactive Global Modals & Drawers */}
      <CartDrawer />
      <SearchModal />
      <AdminPinModal />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 bg-[#165B2D] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#FFD000] text-xs font-bold flex items-center space-x-2"
          >
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
