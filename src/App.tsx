import React from 'react';
import { MemberProvider } from './context/MemberContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoffeeExplorer } from './components/CoffeeExplorer';
import { PreOrderSystem } from './components/PreOrderSystem';
import { RewardsStore } from './components/RewardsStore';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';
import { CoffeeDetailModal } from './components/CoffeeDetailModal';
import { MemberModal } from './components/MemberModal';
import { CartDrawer } from './components/CartDrawer';

const AppContent: React.FC = () => {
  const { selectedCoffeeForDetail, setSelectedCoffeeForDetail } = useCart();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Bar navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <CoffeeExplorer />
        <PreOrderSystem />
        <RewardsStore />
        <StorySection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over & Modals */}
      <CartDrawer />
      <MemberModal />
      <CoffeeDetailModal
        coffee={selectedCoffeeForDetail}
        onClose={() => setSelectedCoffeeForDetail(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <MemberProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </MemberProvider>
  );
}
