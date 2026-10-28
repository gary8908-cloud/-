import React from 'react';
import { ArrowRight, Calendar, Sparkles, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CoffeeCardIllustration } from './CoffeeCardIllustration';

export const Hero: React.FC = () => {
  const { setIsReservationModalOpen } = useCart();

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:py-20 border-b border-stone-800/60 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Value proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest">
              <span className="w-6 h-[1px] bg-amber-500/60" />
              <span>SPECIALTY ROASTERY & COFFEE BAR</span>
            </div>

            <h1 className="font-serif-tc text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight leading-[1.25] text-balance">
              在靜謐微光中，
              <br />
              探訪直抵靈魂的
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                純粹風土之味
              </span>
            </h1>

            <p className="text-stone-400 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              木暮珈琲堅持每週少量慢烘，嚴選衣索比亞瑰夏村、哥倫比亞厭氧蜜處理與台灣阿里山特產莊園豆。提供手沖單品咖啡探索、線上外帶自取預訂、內用席位預約與會員積分兌換禮遇。
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#coffee-menu"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-all shadow-lg shadow-amber-950/40"
              >
                <Coffee className="w-4 h-4" />
                <span>探索精品豆單</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsReservationModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700/80 hover:border-amber-500/50 font-medium text-sm transition-colors"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>線上預約席位 / 外帶</span>
              </button>
            </div>

            {/* Quiet member perks highlight */}
            <div className="pt-4 flex items-center gap-3 text-xs text-stone-400">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>新會員註冊即贈 200 點迎新積分 + 50 元折價券 · 消費每 10 元累積 1 點</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (Craft Pour-Over Aesthetic) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-stone-700/40 via-stone-800/20 to-stone-900/40 border border-stone-800 shadow-2xl">
              <div className="relative rounded-xl overflow-hidden bg-stone-950 aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center p-6">
                <CoffeeCardIllustration type="pourover" accentColor="#f59e0b" className="w-full h-full" />

                {/* Floating Sensory Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md p-4 rounded-lg border border-stone-800 text-xs">
                  <div className="flex items-center justify-between text-stone-400 mb-1">
                    <span className="font-mono text-amber-500 uppercase tracking-wider">今日主廚杯測精選</span>
                    <span className="font-mono text-stone-500">SCA 91.5 pts</span>
                  </div>
                  <div className="font-serif-tc font-semibold text-stone-100 text-sm mb-1.5">
                    衣索比亞 谷吉 瑰夏村 藝伎 G1
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-400 text-[11px] font-light">
                    <span>白茉莉花</span>
                    <span>·</span>
                    <span>香檸檬</span>
                    <span>·</span>
                    <span>白桃果汁</span>
                    <span>·</span>
                    <span>洋甘菊</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column KPI / Value Strip */}
        <div className="mt-14 pt-10 border-t border-stone-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-300">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase text-amber-500 tracking-wider">01. 嚴選產區</div>
            <div className="font-serif-tc text-base font-semibold text-stone-100">100% 莊園微批次</div>
            <p className="text-xs text-stone-400 leading-normal">直簽農場，具備完整履歷與生豆杯測 86 分以上標準</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase text-amber-500 tracking-wider">02. 慢火工藝</div>
            <div className="font-serif-tc text-base font-semibold text-stone-100">德國鑄鐵機少量烘焙</div>
            <p className="text-xs text-stone-400 leading-normal">精確曲線控溫，最大化保留原生花果酸香與清甜層次</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase text-amber-500 tracking-wider">03. 會員禮遇</div>
            <div className="font-serif-tc text-base font-semibold text-stone-100">積分賞換經典豆品</div>
            <p className="text-xs text-stone-400 leading-normal">消費自動累積點數，可兌換手作甜點、折價券與職人器具</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase text-amber-500 tracking-wider">04. 零候預約</div>
            <div className="font-serif-tc text-base font-semibold text-stone-100">線上預訂席位與自取</div>
            <p className="text-xs text-stone-400 leading-normal">自訂到店時段，咖啡師為您現磨現萃，溫熱醇香免排隊</p>
          </div>
        </div>
      </div>
    </section>
  );
};
