import React from 'react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { setIsMemberModalOpen, setIsRewardsModalOpen } = useCart();

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-stone-800/80">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <span className="font-serif-tc text-xl font-bold text-stone-100 tracking-wider">
              木暮珈琲 MUGURE COFFEE
            </span>
            <p className="text-stone-400 max-w-sm leading-relaxed font-light">
              自 2022 年創立於台北青田街，專注於世界產區精品咖啡豆微批次烘焙、感官杯測體驗與慢生活咖啡美學。
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-mono uppercase text-amber-500 font-semibold tracking-wider text-[11px]">
              EXPLORE
            </div>
            <ul className="space-y-1.5">
              <li>
                <a href="#coffee-menu" className="hover:text-stone-100 transition-colors">
                  產區風味豆單
                </a>
              </li>
              <li>
                <a href="#pre-order" className="hover:text-stone-100 transition-colors">
                  線上預訂與外帶自取
                </a>
              </li>
              <li>
                <a href="#craft-philosophy" className="hover:text-stone-100 transition-colors">
                  烘焙工藝與青田總店
                </a>
              </li>
            </ul>
          </div>

          {/* Member & Privileges */}
          <div className="md:col-span-4 space-y-2">
            <div className="font-mono uppercase text-amber-500 font-semibold tracking-wider text-[11px]">
              MEMBERSHIP & REWARDS
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setIsMemberModalOpen(true)}
                  className="hover:text-stone-100 transition-colors text-left"
                >
                  會員專屬護照與電子票夾
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsRewardsModalOpen(true)}
                  className="hover:text-stone-100 transition-colors text-left"
                >
                  積分賞兌換所 (消費每10元積1點)
                </button>
              </li>
              <li>
                <span className="text-stone-500">
                  門市客服專線：(02) 2391-8840 (09:00 - 19:30)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} 木暮珈琲 MUGURE ROASTERS. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Specialty Coffee Association Member</span>
            <span>·</span>
            <span>Made with Artisanal Passion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
