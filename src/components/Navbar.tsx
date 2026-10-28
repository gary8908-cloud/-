import React from 'react';
import { ShoppingBag, User, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMember } from '../context/MemberContext';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsMemberModalOpen, setIsRewardsModalOpen } = useCart();
  const { member, isLoggedIn, tierInfo } = useMember();

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single line, text element) */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-stone-100 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 group"
        >
          <span className="font-serif-tc text-2xl font-bold tracking-widest text-amber-500 group-hover:text-amber-400">
            木暮珈琲
          </span>
          <span className="hidden sm:inline-block text-xs font-mono tracking-widest text-stone-500 uppercase">
            MUGURE ROASTERS
          </span>
        </a>

        {/* Zone 2: 4–5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-400">
          <a
            href="#coffee-menu"
            className="hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 relative py-1 hover:border-b-2 hover:border-amber-500"
          >
            風味選豆
          </a>
          <a
            href="#pre-order"
            className="hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 relative py-1 hover:border-b-2 hover:border-amber-500"
          >
            預約自取
          </a>
          <a
            href="#rewards-catalog"
            className="hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 relative py-1 hover:border-b-2 hover:border-amber-500 flex items-center gap-1.5"
          >
            <span>積分兌換</span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-1 rounded">
              會員賞
            </span>
          </a>
          <a
            href="#craft-philosophy"
            className="hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 relative py-1 hover:border-b-2 hover:border-amber-500"
          >
            烘焙哲學
          </a>
        </nav>

        {/* Zone 3: 1 primary action or balanced utility */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Member points fast-access pill/button */}
          {isLoggedIn && member ? (
            <button
              onClick={() => setIsMemberModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-600/50 text-stone-300 text-xs font-medium transition-colors"
              title="查看會員中心與點數"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: tierInfo.color }}
              />
              <span className="hidden sm:inline font-mono text-amber-400 tabular-nums font-semibold">
                {member.points} pts
              </span>
              <span className="text-stone-200">{member.name}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsMemberModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-300 text-xs font-medium transition-colors"
            >
              <User className="w-3.5 h-3.5 text-stone-400" />
              <span>會員登入</span>
            </button>
          )}

          {/* Quick Rewards trigger */}
          <button
            onClick={() => setIsRewardsModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-amber-400 bg-stone-900 border border-stone-800 rounded-lg hover:border-amber-700/50 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>點數賞</span>
          </button>

          {/* Cart & Order Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center p-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium transition-colors"
            aria-label="打開預約訂單"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-stone-950 text-amber-400 border border-amber-500 text-[11px] font-mono font-bold rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
